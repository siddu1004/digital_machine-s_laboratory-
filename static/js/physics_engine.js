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

  function solveDCMachine(terminal_voltage, load_torque, field_rheostat = 0.0, armature_rheostat = 0.0, machine_type = "shunt") {
    const ra_base = 0.85;
    const rf_base = 180.0;
    const k_phi_nominal = 1.15;
    const ra_total = ra_base + armature_rheostat;
    const rf_total = rf_base + field_rheostat;

    let if_current = 0.0;
    let k_phi = k_phi_nominal;

    if (machine_type === "dc_series_motor" || machine_type === "series") {
      // In series motor, field is in series with armature
      const t_demand = Math.max(0.2, load_torque);
      // T = k_f * Ia^2
      const k_f = 0.045;
      const ia = Math.sqrt(t_demand / k_f);
      k_phi = k_f * ia;
      const eb = Math.max(5.0, terminal_voltage - ia * (ra_total + 0.35));
      const omega_m = eb / (k_phi + 1e-4);
      const speed_rpm = Math.min(4000.0, omega_m * (60.0 / (2.0 * Math.PI)));
      const p_out = omega_m * t_demand;
      const p_in = terminal_voltage * ia;
      const losses = Math.max(50.0, p_in - p_out);
      const eff = p_in > 0 ? (p_out / p_in) * 100.0 : 0.0;

      return {
        speed_rpm,
        line_current_a: ia,
        armature_current_a: ia,
        field_current_a: ia,
        back_emf_v: eb,
        load_torque_nm: t_demand,
        developed_torque_nm: t_demand,
        input_power_w: p_in,
        output_power_w: p_out,
        total_losses_w: losses,
        efficiency_pct: Math.min(100.0, Math.max(0.0, eff))
      };
    } else {
      // Shunt, compound, or separately excited
      if_current = rf_total > 0 ? terminal_voltage / rf_total : 1.2;
      k_phi = k_phi_nominal * Math.min(1.2, if_current / (terminal_voltage / rf_base));
      const t_demand = Math.max(0.0, load_torque);
      const ia = (t_demand + 0.5) / (k_phi + 1e-4);
      const eb = Math.max(5.0, terminal_voltage - ia * ra_total);
      const omega_m = eb / (k_phi + 1e-4);
      const speed_rpm = omega_m * (60.0 / (2.0 * Math.PI));
      const p_out = omega_m * t_demand;
      const i_line = ia + if_current;
      const p_in = terminal_voltage * i_line;
      const losses = Math.max(40.0, p_in - p_out);
      const eff = p_in > 0 ? (p_out / p_in) * 100.0 : 0.0;

      return {
        speed_rpm,
        line_current_a: i_line,
        armature_current_a: ia,
        field_current_a: if_current,
        back_emf_v: eb,
        load_torque_nm: t_demand,
        developed_torque_nm: t_demand + 0.5,
        input_power_w: p_in,
        output_power_w: p_out,
        total_losses_w: losses,
        efficiency_pct: Math.min(100.0, Math.max(0.0, eff))
      };
    }
  }

  function solveTransformer(v1_rated, v2_rated, rated_kva, load_fraction, power_factor, is_3ph = false) {
    const pf = Math.abs(power_factor) || 0.85;
    const s_load_kva = rated_kva * load_fraction;
    const p_out = s_load_kva * 1000.0 * pf;
    const p_core = rated_kva * 20.0; // ~2% core loss
    const p_cu_fl = rated_kva * 35.0; // ~3.5% full-load copper loss
    const p_cu = p_cu_fl * (load_fraction * load_fraction);
    const total_losses = p_core + p_cu;
    const p_in = p_out + total_losses;
    const eff = p_in > 0 ? (p_out / p_in) * 100.0 : 0.0;

    // Voltage regulation approx: VR% = load_fraction * (R_pu*cos(phi) + X_pu*sin(phi)) * 100
    const phi = Math.acos(pf);
    const vr_pct = load_fraction * (0.025 * Math.cos(phi) + 0.045 * Math.sin(phi)) * 100.0;
    const v2_actual = v2_rated * (1.0 - vr_pct / 100.0);
    const denom = is_3ph ? Math.sqrt(3.0) * v2_rated : v2_rated;
    const i2_load = (s_load_kva * 1000.0) / denom;

    return {
      v1_volts: v1_rated,
      v2_terminal_volts: Math.max(0.0, v2_actual),
      i2_load_current_a: i2_load,
      output_power_w: p_out,
      input_power_w: p_in,
      core_loss_w: p_core,
      copper_loss_w: p_cu,
      total_losses_w: total_losses,
      efficiency_pct: Math.min(100.0, Math.max(0.0, eff)),
      voltage_regulation_pct: vr_pct
    };
  }

  function solveSynchronousMotor(v_line, frequency, load_power_w, field_current, poles = 4, xs = 4.5, ra = 0.5) {
    const ns_rpm = synchronousSpeed(frequency, poles);
    const omega_s = angularVelocity(ns_rpm);
    const v_ph = v_line / Math.sqrt(3.0);
    const ef_ph = (v_ph * 0.95) * (field_current / 1.25);
    const max_power = (3.0 * v_ph * ef_ph) / xs;
    const ratio = max_power > 0 ? load_power_w / max_power : 0.0;
    const is_stable = ratio <= 1.0;
    const delta_rad = is_stable ? Math.asin(Math.min(1.0, Math.max(-1.0, ratio))) : Math.PI / 2.0;
    const delta_deg = delta_rad * (180.0 / Math.PI);

    // Phasor Ia = (V_ph - Ef*(cos(delta) - j*sin(delta))) / (Ra + j*Xs)
    const ef_re = ef_ph * Math.cos(delta_rad);
    const ef_im = -ef_ph * Math.sin(delta_rad);
    const num_re = v_ph - ef_re;
    const num_im = -ef_im;
    const den_mag2 = ra * ra + xs * xs;
    const ia_re = (num_re * ra + num_im * xs) / den_mag2;
    const ia_im = (num_im * ra - num_re * xs) / den_mag2;
    const ia_mag = Math.sqrt(ia_re * ia_re + ia_im * ia_im);
    const phi = Math.atan2(ia_im, ia_re);
    const pf = Math.cos(phi);

    const p_in = 3.0 * v_ph * ia_mag * pf;
    const p_loss = Math.max(50.0, p_in - load_power_w);
    const eff = p_in > 0 ? (load_power_w / p_in) * 100.0 : 0.0;
    const t_shaft = omega_s > 0 ? load_power_w / omega_s : 0.0;

    return {
      speed_rpm: ns_rpm,
      synchronous_speed_rpm: ns_rpm,
      armature_current_a: ia_mag,
      field_current_a: field_current,
      power_factor: pf,
      torque_angle_delta_deg: delta_deg,
      shaft_torque_nm: t_shaft,
      input_power_w: p_in,
      output_power_w: load_power_w,
      efficiency_pct: Math.min(100.0, Math.max(0.0, eff)),
      total_losses_w: p_loss
    };
  }

  return {
    synchronousSpeed,
    angularVelocity,
    solveInductionMotor,
    solveAlternator,
    solveDCMachine,
    solveTransformer,
    solveSynchronousMotor
  };
})();
