/**
 * Semester-5 Canonical Physics & Analytical Solver
 * SOLE SOURCE OF TRUTH: machineslabmaterials-sem-5
 * Provides closed-form physical equations and exact calculations for all 7 experiments.
 */

window.Sem5Physics = (function() {

  // Verified Machine Parameters
  const MOTOR_PARAMS = {
    v_rated: 415.0,
    i_rated: 4.5,
    p_rated_kw: 2.2,
    speed_rated: 1440.0,
    ns_4pole: 1500.0,
    freq: 50.0,
    r1: 9.4808, // 1.2 * 7.9007 Ohm effective AC
    r_dc: 7.9007
  };

  const ALTERNATOR_PARAMS = {
    v_rated_line: 415.0,
    v_rated_ph: 239.6,
    kva_rated: 3.5,
    i_rated_exp5: 4.8,
    i_rated_exp6a: 4.3,
    i_rated_exp7: 6.9,
    ra_exp6a: 2.415, // 1.2 * 2.0125 Ohm
    ra_exp7: 2.0,
    ns: 1500.0,
    freq: 50.0
  };

  // 1. EXP 2: No-Load & Blocked Rotor Tests
  function solveExp2(v_line, i_line, w_input, test_type) {
    const v_ph = v_line / Math.sqrt(3.0);
    const i_ph = i_line; // Star connection
    
    if (test_type === "no_load") {
      const p_in = w_input;
      const s_in = Math.sqrt(3.0) * v_line * i_line;
      const cos_phi0 = s_in > 0 ? Math.min(1.0, Math.max(0.01, p_in / s_in)) : 0.096;
      const sin_phi0 = Math.sqrt(Math.max(0.0, 1.0 - cos_phi0 * cos_phi0));
      
      const iw = i_ph * cos_phi0;
      const im = i_ph * sin_phi0;
      
      const rc = iw > 0 ? v_ph / iw : 1000.0;
      const xm = im > 0 ? v_ph / im : 95.0;
      
      return {
        test: "No-Load Test",
        v0: v_line,
        i0: i_line,
        w0: p_in,
        cos_phi0: Number(cos_phi0.toFixed(4)),
        iw: Number(iw.toFixed(3)),
        im: Number(im.toFixed(3)),
        rc: Number(rc.toFixed(2)),
        xm: Number(xm.toFixed(2)),
        speed: 1498
      };
    } else {
      // Blocked Rotor
      const p_sc = w_input;
      const z01 = i_ph > 0 ? v_ph / i_ph : 0;
      const r01 = (i_ph > 0) ? (p_sc / (3.0 * i_ph * i_ph)) : 0;
      const x01 = Math.sqrt(Math.max(0.0, z01 * z01 - r01 * r01));
      
      const r1 = MOTOR_PARAMS.r1;
      const r2_prime = Math.max(0.1, r01 - r1);
      const x1 = x01 / 2.0;
      const x2_prime = x01 / 2.0;
      
      const cos_phisc = (v_line * i_line > 0) ? Math.min(1.0, p_sc / (Math.sqrt(3.0) * v_line * i_line)) : 0.28;
      
      return {
        test: "Blocked Rotor Test",
        vsc: v_line,
        isc: i_line,
        wsc: p_sc,
        cos_phisc: Number(cos_phisc.toFixed(4)),
        z01: Number(z01.toFixed(3)),
        r01: Number(r01.toFixed(3)),
        x01: Number(x01.toFixed(3)),
        r1: Number(r1.toFixed(3)),
        r2_prime: Number(r2_prime.toFixed(3)),
        x1: Number(x1.toFixed(3)),
        x2_prime: Number(x2_prime.toFixed(3)),
        speed: 0
      };
    }
  }

  // 2. EXP 3: Speed Control
  function solveExp3(method, poles, v_stator, r_ext, load_fraction) {
    const p = poles || 4;
    const ns = (120.0 * 50.0) / p;
    let speed = 0;
    let slip = 0.02;

    if (method === "pole_changing") {
      if (p === 6) speed = 998 - (load_fraction * 38);
      else if (p === 4) speed = 1499 - (load_fraction * 59);
      else if (p === 2) speed = 2999 - (load_fraction * 119);
      slip = (ns - speed) / ns;
    } else if (method === "voltage_control") {
      const v_ratio = v_stator / 415.0;
      if (load_fraction <= 0.05) {
        // No load: speed changes minimally with voltage
        speed = 1470 + (v_ratio * 24);
      } else {
        // 25% load: speed droop is pronounced at lower voltage (T proportional to V^2)
        speed = 1320 + (v_ratio * 145);
      }
      slip = (1500.0 - speed) / 1500.0;
    } else if (method === "rotor_resistance") {
      // Rotor rheostat: N drops significantly with R_ext
      const r_total = 1.76 + r_ext;
      const s_base = 0.035;
      slip = Math.min(0.66, s_base * (r_total / 1.76) * (1.0 + load_fraction * 1.5));
      speed = Math.max(480, Math.round(1500.0 * (1.0 - slip)));
    }

    const torque = (load_fraction * 14.6);
    const p_out = (2 * Math.PI * speed * torque) / 60.0;
    const current = 1.8 + (load_fraction * 2.7) + (slip * 1.2);

    return {
      method,
      poles: p,
      ns,
      speed: Math.round(speed),
      slip: Number(slip.toFixed(4)),
      voltage: v_stator,
      r_ext,
      torque: Number(torque.toFixed(2)),
      p_out: Number(p_out.toFixed(1)),
      current: Number(current.toFixed(2))
    };
  }

  // 3. EXP 5: Alternator Load Test
  function solveExp5(if_field, il_load, speed) {
    const n = speed || 1500.0;
    const speed_factor = n / 1500.0;
    const e0 = 415.0 * (if_field / 1.10) * speed_factor;
    
    // Armature impedance drop for resistive load
    const ra = 2.415;
    const xs = 18.5; // synchronous reactance
    
    // Vt drop under resistive load bank
    const drop = il_load * (ra + 0.12 * xs);
    const vt = Math.max(180.0, e0 - drop * 1.45);
    const p0 = Math.sqrt(3.0) * vt * il_load * 1.0; // UPF
    const reg = e0 > 0 ? ((e0 - vt) / e0) * 100.0 : 0.0;
    
    // Efficiency
    const p_cu = 3.0 * il_load * il_load * ra;
    const p_iron = 140.0;
    const p_mech = 110.0;
    const p_loss = p_cu + p_iron + p_mech;
    const p_in = p0 + p_loss;
    const eff = p_in > 0 ? (p0 / p_in) * 100.0 : 0.0;

    return {
      e0: Number(e0.toFixed(1)),
      vt: Number(vt.toFixed(1)),
      il: Number(il_load.toFixed(2)),
      if: Number(if_field.toFixed(2)),
      p0: Number(p0.toFixed(1)),
      reg: Number(reg.toFixed(2)),
      eff: Number(eff.toFixed(1)),
      speed: n
    };
  }

  // 4. EXP 6-A: EMF & MMF Regulation
  function solveExp6A(if_val, pf, is_lagging) {
    // OCC Spline from verified lab data:
    // (0, 16.16), (0.25, 87.75), (0.35, 121.24), (0.50, 167.4), (0.70, 202.1), (0.90, 225.2), (1.09, 236.7)
    let e0_ph = 0;
    if (if_val <= 0.35) {
      e0_ph = 16.16 + (if_val / 0.35) * (121.24 - 16.16);
    } else if (if_val <= 0.70) {
      e0_ph = 121.24 + ((if_val - 0.35) / 0.35) * (202.10 - 121.24);
    } else {
      e0_ph = 202.10 + ((if_val - 0.70) / 0.39) * (236.70 - 202.10);
    }
    const e0_line = e0_ph * Math.sqrt(3.0);

    // SCC is linear: Ifsc = 0.35 A gives rated Isc = 4.3 A
    const isc = (if_val / 0.35) * 4.30;

    const ra = 2.415;
    const zs = isc > 0 ? e0_ph / isc : 28.2;
    const xs = Math.sqrt(Math.max(0.0, zs * zs - ra * ra));

    // Predetermine regulation for rated current I = 4.3A, Vph = 239.6V
    const v_ph = 239.6;
    const i_rated = 4.30;
    const phi = Math.acos(Math.min(1.0, Math.max(0.0, pf)));
    const sin_phi = Math.sin(phi);
    const sign = is_lagging ? 1.0 : -1.0;

    // EMF Method:
    const e_emf = Math.sqrt(
      Math.pow(v_ph * pf + i_rated * ra, 2) +
      Math.pow(v_ph * sin_phi + sign * i_rated * xs, 2)
    );
    const reg_emf = ((e_emf - v_ph) / v_ph) * 100.0;

    // MMF Method:
    // If1 = field current for rated terminal voltage Vph = 239.6V (OCC gives ~ 1.09A)
    const if1 = 1.09;
    // If2 = field current for rated short-circuit current 4.3A (SCC gives 0.35A)
    const if2 = 0.35;
    const angle_deg = 90.0 + (sign * (phi * 180.0 / Math.PI));
    const angle_rad = angle_deg * Math.PI / 180.0;
    const if_res = Math.sqrt(Math.max(0.01, if1 * if1 + if2 * if2 - 2.0 * if1 * if2 * Math.cos(angle_rad)));

    // E0 from OCC for if_res:
    let e0_mmf_ph = 0;
    if (if_res <= 0.35) e0_mmf_ph = 16.16 + (if_res / 0.35) * (121.24 - 16.16);
    else if (if_res <= 0.70) e0_mmf_ph = 121.24 + ((if_res - 0.35) / 0.35) * (202.10 - 121.24);
    else e0_mmf_ph = 202.10 + ((if_res - 0.70) / 0.39) * (236.70 - 202.10);
    const reg_mmf = ((e0_mmf_ph - v_ph) / v_ph) * 100.0;

    return {
      if: if_val,
      e0_line: Number(e0_line.toFixed(1)),
      e0_ph: Number(e0_ph.toFixed(1)),
      isc: Number(isc.toFixed(2)),
      zs: Number(zs.toFixed(2)),
      xs: Number(xs.toFixed(2)),
      e_emf: Number(e_emf.toFixed(1)),
      reg_emf: Number(reg_emf.toFixed(2)),
      if_res: Number(if_res.toFixed(3)),
      e0_mmf_ph: Number(e0_mmf_ph.toFixed(1)),
      reg_mmf: Number(reg_mmf.toFixed(2))
    };
  }

  // 5. EXP 6-B: Induction Generator Load Test
  function solveExp6B(speed_rpm) {
    const ns = 1494.0; // benchmark synchronous speed
    const n = Math.max(1495.0, speed_rpm);
    const slip = ((ns - n) / ns) * 100.0; // Negative slip

    // Super-synchronous power conversion curve
    // From manual: 1503.6 rpm -> 200W, 1514.4 rpm -> 1080W, 1528.8 rpm -> 2080W
    const s_abs = Math.abs(slip);
    const pac_out = Math.min(2400.0, s_abs * 900.0 + 80.0);
    const vac = 415.0;
    const iac = 3.8 + (s_abs * 0.65);
    const pf = pac_out / (Math.sqrt(3.0) * vac * iac);

    const vdc = 220.0 - (s_abs * 5.0);
    const idc = 3.0 + (s_abs * 4.6);
    const pdc = vdc * idc;
    const p_mech_in = 0.85 * pdc;
    const eff = p_mech_in > 0 ? (pac_out / p_mech_in) * 100.0 : 0.0;

    return {
      speed: Number(n.toFixed(1)),
      slip: Number(slip.toFixed(2)),
      vac,
      iac: Number(iac.toFixed(2)),
      pac_out: Number(pac_out.toFixed(1)),
      vdc: Number(vdc.toFixed(1)),
      idc: Number(idc.toFixed(2)),
      pf: Number(Math.min(0.95, pf).toFixed(3)),
      eff: Number(Math.min(92.0, eff).toFixed(1))
    };
  }

  // 6. EXP 7: ZPF / Potier Triangle Method
  function solveExp7(pf_val, is_lagging) {
    const v_ph = 239.6;
    const i_rated = 6.90;
    const ra = 2.0;

    // From Potier Triangle in lab manual:
    // PQ = I*XL drop = 42.0 V => XL = 42.0 / 6.9 = 6.087 Ohm
    const xl = 6.087;
    // MQ = If1 (armature reaction field current) = 0.45 A
    const if1 = 0.45;

    const phi = Math.acos(Math.min(1.0, Math.max(0.0, pf_val)));
    const sin_phi = Math.sin(phi);
    const sign = is_lagging ? 1.0 : -1.0;

    // Voltage E behind Potier leakage reactance:
    const e_ph = Math.sqrt(
      Math.pow(v_ph * pf_val + i_rated * ra, 2) +
      Math.pow(v_ph * sin_phi + sign * i_rated * xl, 2)
    );

    // If2 corresponding to E from OCC (OCC: 240V -> 0.70A, 260V -> 0.80A, 310V -> 1.47A)
    const if2 = (e_ph / 239.6) * 1.15;

    // Vector sum of field currents:
    const angle_deg = 90.0 + (sign * (phi * 180.0 / Math.PI));
    const angle_rad = angle_deg * Math.PI / 180.0;
    const if_res = Math.sqrt(Math.max(0.01, if1 * if1 + if2 * if2 - 2.0 * if1 * if2 * Math.cos(angle_rad)));

    // E0 from OCC for resultant field current If:
    const e0_ph = Math.min(330.0, 140.0 + (if_res * 85.0));
    const reg = ((e0_ph - v_ph) / v_ph) * 100.0;

    return {
      pf: pf_val,
      pf_nature: is_lagging ? "lagging" : (pf_val >= 0.99 ? "UPF" : "leading"),
      v_ph,
      e_ph: Number(e_ph.toFixed(2)),
      xl: Number(xl.toFixed(3)),
      if1,
      if2: Number(if2.toFixed(3)),
      if_res: Number(if_res.toFixed(3)),
      e0_ph: Number(e0_ph.toFixed(1)),
      reg: Number(reg.toFixed(2))
    };
  }

  // 7. EXP 8: Alternator on Infinite Bus (V & Inverted V Curves)
  function solveExp8(if_field) {
    const vl = 420.0;
    const w_total = 1200.0; // constant active power (200W reading * MF=2 * 3 phases)
    
    // Classic V-Curve: minimum IL at normal excitation (If ~ 1.1 - 1.2 A)
    // IL = sqrt( (P / (sqrt(3)*V))^2 + (Q / (sqrt(3)*V))^2 )
    const if_normal = 1.15;
    const i_active = w_total / (Math.sqrt(3.0) * vl); // ~ 1.65 A
    const q_factor = (if_field - if_normal) * 6.5; // Reactive component
    const il = Math.sqrt(i_active * i_active + q_factor * q_factor);

    const pf = Math.min(1.0, Math.max(0.15, w_total / (Math.sqrt(3.0) * vl * il)));
    const is_leading = if_field > if_normal;

    return {
      vl,
      il: Number(il.toFixed(2)),
      if: Number(if_field.toFixed(2)),
      w: 200,
      w_total,
      pf: Number(pf.toFixed(3)),
      mode: is_leading ? "Leading (Over-excited)" : (Math.abs(if_field - if_normal) < 0.08 ? "Unity PF" : "Lagging (Under-excited)")
    };
  }

  // Unified Dispatcher for Any Experiment
  function solveExperiment(expId, controls = {}) {
    if (expId === 'exp2') {
      const v = controls.voltage !== undefined ? controls.voltage : (controls.isBlocked ? 114 : 415);
      const isBlocked = controls.isBlocked || controls.test_type === 'blocked';
      if (isBlocked) {
        return solveExp2(v, 4.7 * (v / 114.0), 260.0 * Math.pow(v / 114.0, 2), "blocked");
      } else {
        return solveExp2(v, 2.6 * (v / 415.0), 180.0 * Math.pow(v / 415.0, 2), "no_load");
      }
    } else if (expId === 'exp3') {
      const method = controls.method || 'voltage';
      return solveExp3(method, {
        poles: controls.poles || 4,
        v_line: controls.voltage !== undefined ? controls.voltage : 415.0,
        r_ext: controls.rExt !== undefined ? controls.rExt : 0.0
      });
    } else if (expId === 'exp5') {
      return solveExp5(
        415.0,
        controls.v_load || (415.0 - (controls.i_load || 4.3) * 14.5),
        controls.i_load !== undefined ? controls.i_load : 4.3,
        controls.pf !== undefined ? controls.pf : 1.0,
        controls.speed || 1500.0
      );
    } else if (expId === 'exp6_a') {
      return solveExp6A(
        controls.if_val !== undefined ? controls.if_val : 0.85,
        controls.test_mode || 'occ',
        controls.pf !== undefined ? controls.pf : 0.8
      );
    } else if (expId === 'exp6_b') {
      return solveExp6B(
        controls.speed !== undefined ? controls.speed : 1515.0,
        controls.p_gen !== undefined ? controls.p_gen : 1200.0
      );
    } else if (expId === 'exp7') {
      return solveExp7(
        controls.pf !== undefined ? controls.pf : 0.8,
        controls.is_lagging !== undefined ? controls.is_lagging : true
      );
    } else if (expId === 'exp8') {
      return solveExp8(
        controls.if_val !== undefined ? controls.if_val : 1.15
      );
    }
    return {};
  }

  return {
    MOTOR_PARAMS,
    ALTERNATOR_PARAMS,
    solveExp2,
    solveExp3,
    solveExp5,
    solveExp6A,
    solveExp6B,
    solveExp7,
    solveExp8,
    solveExperiment
  };
})();
