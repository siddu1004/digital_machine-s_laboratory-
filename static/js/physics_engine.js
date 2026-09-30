/**
 * Electrical Machines Digital Twin — Canonical Physics Engine (Client-Side)
 * Implements exact complex phasor algebra, power flow, and electromechanical dynamics
 * matching the server-side Python core.
 */

window.MachinePhysics = (function() {
  function synchronousSpeed(frequency, poles) {
    if (poles <= 0) return 0;
    return (120.0 * frequency) / poles;
  }

  function angularVelocity(rpm) {
    return (2.0 * Math.PI * rpm) / 60.0;
  }

  function solveInductionMotor(v_line, frequency, slip, r1, x1, rc, xm, r2_prime, x2_prime, p_rot, poles = 4) {
    const v_ph = v_line / Math.sqrt(3.0);
    const ns_rpm = synchronousSpeed(frequency, poles);
    const omega_s = angularVelocity(ns_rpm);

    const s = Math.abs(slip) < 1e-6 ? 1e-6 : slip;
    const speed_rpm = (1.0 - s) * ns_rpm;
    const omega_m = speed_rpm > 0 ? angularVelocity(speed_rpm) : 0.0;

    // Magnetizing branch admittance Ym = 1/rc - j*(1/xm) => Zm = 1/Ym
    const ym_re = 1.0 / rc;
    const ym_im = -1.0 / xm;
    const ym_mag2 = ym_re * ym_re + ym_im * ym_im;
    const zm_re = ym_re / ym_mag2;
    const zm_im = -ym_im / ym_mag2;

    // Rotor branch Z2' = R2'/s + j*X2'
    const z2_re = r2_prime / s;
    const z2_im = x2_prime;

    // Parallel combination Zp = (Zm * Z2') / (Zm + Z2')
    const num_re = zm_re * z2_re - zm_im * z2_im;
    const num_im = zm_re * z2_im + zm_im * z2_re;
    const den_re = zm_re + z2_re;
    const den_im = zm_im + z2_im;
    const den_mag2 = den_re * den_re + den_im * den_im;

    const zp_re = (num_re * den_re + num_im * den_im) / den_mag2;
    const zp_im = (num_im * den_re - num_re * den_im) / den_mag2;

    // Total input impedance Zin = Z1 + Zp
    const zin_re = r1 + zp_re;
    const zin_im = x1 + zp_im;
    const zin_mag = Math.sqrt(zin_re * zin_re + zin_im * zin_im);

    // Stator Current
    const i1_mag = zin_mag > 0 ? v_ph / zin_mag : 0;
    const pf = zin_mag > 0 ? zin_re / zin_mag : 1.0;
    const theta_rad = Math.acos(Math.min(1.0, Math.max(0.0, pf)));

    const p_in = 3.0 * v_ph * i1_mag * pf;
    const s_in = Math.sqrt(3.0) * v_line * i1_mag;
    const q_in = Math.sqrt(Math.max(0.0, s_in * s_in - p_in * p_in));

    // Air gap EMF: E1 = V_ph - I1 * Z1
    const i1_re = i1_mag * pf;
    const i1_im = -i1_mag * Math.sin(theta_rad);
    const drop_re = i1_re * r1 - i1_im * x1;
    const drop_im = i1_re * x1 + i1_im * r1;
    const e1_re = v_ph - drop_re;
    const e1_im = -drop_im;
    const e1_mag = Math.sqrt(e1_re * e1_re + e1_im * e1_im);

    // Rotor Current I2'
    const z2_mag = Math.sqrt(z2_re * z2_re + z2_im * z2_im);
    const i2_prime_mag = z2_mag > 0 ? e1_mag / z2_mag : 0;

    // Power Flow breakdown
    const p_s_cu = 3.0 * (i1_mag * i1_mag) * r1;
    const p_core = rc > 0 ? (3.0 * (e1_mag * e1_mag)) / rc : 0;
    const p_ag = 3.0 * (i2_prime_mag * i2_prime_mag) * (r2_prime / s);
    const p_r_cu = s * p_ag;
    const p_conv = (1.0 - s) * p_ag;
    const p_out = Math.max(0.0, p_conv - p_rot);

    const t_dev = omega_s > 0 ? p_ag / omega_s : 0;
    const t_shaft = omega_m > 0 ? p_out / omega_m : 0;

    const efficiency = p_in > 0 ? Math.min(100.0, Math.max(0.0, (p_out / p_in) * 100.0)) : 0;
    const total_losses = p_s_cu + p_core + p_r_cu + p_rot;

    return {
      ns_rpm,
      speed_rpm,
      slip: s,
      v_line,
      v_ph,
      i_line: i1_mag,
      i1_mag,
      i2_prime_mag,
      e1_mag,
      pf,
      p_in,
      s_in,
      q_in,
      p_s_cu,
      p_core,
      p_ag,
      p_r_cu,
      p_conv,
      p_out,
      t_dev,
      t_shaft,
      efficiency,
      total_losses
    };
  }

  function solveAlternator(speed_rpm, field_current, armature_current, power_factor, ra = 0.6, xs = 4.8, rated_voltage = 415.0) {
    const base_emf_ph = rated_voltage / Math.sqrt(3.0);
    const eph = base_emf_ph * (speed_rpm / 1500.0) * (2.0 * Math.tanh(field_current / 1.5));
    const is_lagging = power_factor < 0;
    const pf_abs = Math.min(1.0, Math.max(0.01, Math.abs(power_factor)));
    const phi = Math.acos(pf_abs);

    const sign = is_lagging ? 1.0 : -1.0;
    const b_term = 2.0 * armature_current * (ra * Math.cos(phi) + sign * xs * Math.sin(phi));
    const c_term = (armature_current * armature_current) * (ra * ra + xs * xs) - (eph * eph);
    const disc = b_term * b_term - 4.0 * c_term;

    const vt_ph = disc >= 0 ? Math.max(5.0, (-b_term + Math.sqrt(disc)) / 2.0) : 5.0;
    const vt_line = vt_ph * Math.sqrt(3.0);
    const vr = vt_ph > 0 ? ((eph - vt_ph) / vt_ph) * 100.0 : 0.0;

    const p_out = 3.0 * vt_ph * armature_current * Math.cos(phi);
    const q_out = 3.0 * vt_ph * armature_current * Math.sin(phi) * (is_lagging ? 1.0 : -1.0);
    const cu_loss = 3.0 * (armature_current * armature_current) * ra;
    const eff = p_out > 0 ? Math.min(100.0, (p_out / (p_out + cu_loss + 220.0)) * 100.0) : 0.0;

    return {
      speed_rpm,
      eph,
      eph_line: eph * Math.sqrt(3.0),
      vt_ph,
      vt_line,
      armature_current,
      field_current,
      power_factor: pf_abs,
      is_lagging,
      voltage_regulation_pct: vr,
      p_out,
      q_out,
      cu_loss,
      efficiency_pct: eff
    };
  }

  return {
    synchronousSpeed,
    angularVelocity,
    solveInductionMotor,
    solveAlternator
  };
})();
