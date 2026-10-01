/**
 * Semester-5 3D Virtual Laboratory Builder
 * SOLE SOURCE OF TRUTH: machineslabmaterials-sem-5
 * Renders exact physical laboratory apparatus, couplings, wiring, switches, and load banks for all 7 experiments.
 * Provides interactive component inspection on click & hover.
 */

window.Sem5Lab3D = (function() {

  function createComponentInspectionData(name, category, purpose, explanation, getValuesFn) {
    return {
      name,
      category,
      purpose,
      explanation,
      getValues: getValuesFn || (() => ({}))
    };
  }

  // Builder for 3-Phase Variac (Autotransformer)
  function buildVariac(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    // Variac Base
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.52, 0.15, 32),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 })
    );
    base.position.y = 0.075;
    group.add(base);

    // Toroidal Core Casing with ventilation grilles
    const casing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.48, 0.6, 32),
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7, roughness: 0.2 })
    );
    casing.position.y = 0.45;
    group.add(casing);

    // Rotary Dial Knob on Top
    const knob = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.22, 0.12, 24),
      new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.9, roughness: 0.1 })
    );
    knob.position.y = 0.81;
    group.add(knob);

    // Pointer Needle
    const needle = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.02, 0.22),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    needle.position.set(0, 0.88, 0.08);
    group.add(needle);

    // Label Plate
    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.1, 0.02),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.5 })
    );
    plate.position.set(0, 0.5, 0.49);
    group.add(plate);

    group.userData = createComponentInspectionData(
      "3-Phase Auto Transformer / Variac (0-470V, 15A)",
      "Power Source & Voltage Control",
      "Supplies continuously variable, smoothly adjustable 3-phase AC voltage from 0 to 470V without step interruptions.",
      "Uses a toroidal copper winding wound over a high-permeability silicon steel core. A carbon brush moves over exposed turns to provide exact voltage regulation for no-load and starting tests.",
      (state) => ({ "Output Voltage": `${state.voltage || 415} V`, "Capacity": "15 A RMS", "Frequency": "50 Hz" })
    );

    return group;
  }

  // Builder for Rotor Locking Clamp (Exp 2)
  function buildRotorLockClamp(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    const bar1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 1.4, 0.08),
      new THREE.MeshStandardMaterial({ color: 0xb91c1c, metalness: 0.8, roughness: 0.2 })
    );
    bar1.position.set(-0.15, 0.7, 0);
    group.add(bar1);

    const bar2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 1.4, 0.08),
      new THREE.MeshStandardMaterial({ color: 0xb91c1c, metalness: 0.8, roughness: 0.2 })
    );
    bar2.position.set(0.15, 0.7, 0);
    group.add(bar2);

    const clampBolt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.5, 16),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 })
    );
    clampBolt.rotation.z = Math.PI / 2;
    clampBolt.position.set(0, 1.2, 0);
    group.add(clampBolt);

    group.userData = createComponentInspectionData(
      "Mechanical Rotor Locking Clamp",
      "Safety & Test Apparatus",
      "Locks the motor shaft completely stationary so slip s = 1.0 during Blocked Rotor Test.",
      "Prevents rotor acceleration while low voltage circulates rated current (4.7A). Ensures short-circuit test data accurately measures series leakage impedance (R01, X01).",
      () => ({ "Status": "LOCKED (s = 1.0)", "Rotor Speed": "0 RPM", "Torque Rating": "Up to 50 Nm" })
    );

    return group;
  }

  // Builder for External Rotor Rheostat Box (Exp 3)
  function buildRotorRheostatBox(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    // Metal Casing with cooling slats
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.9, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 })
    );
    box.position.y = 0.45;
    group.add(box);

    // 3 Slider Handles
    for (let i = 0; i < 3; i++) {
      const track = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.02, 0.5),
        new THREE.MeshBasicMaterial({ color: 0x64748b })
      );
      track.position.set(-0.35 + i * 0.35, 0.91, 0);
      group.add(track);

      const handle = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.12, 0.08),
        new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.9 })
      );
      handle.position.set(-0.35 + i * 0.35, 0.96, 0.05);
      group.add(handle);
    }

    group.userData = createComponentInspectionData(
      "3-Phase External Rotor Resistance Rheostat Bank (0-120Ω)",
      "Speed & Torque Control",
      "Adds variable resistance into the wound rotor circuit via slip rings to vary motor speed and starting torque.",
      "Increasing rotor resistance shifts the maximum torque point toward higher slip without decreasing maximum torque magnitude, allowing controlled speed reduction down to 507 RPM.",
      (state) => ({ "R_ext Setting": `${state.r_ext || 31.43} Ω`, "Max Dissipation": "3 kW", "Connection": "Balanced Star" })
    );

    return group;
  }

  // Builder for 3-Phase Resistive Lamp Load Bank (Exp 5)
  function buildLampLoadBank(x, y, z, activeCurrent) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    // Frame
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.4, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 })
    );
    frame.position.y = 0.7;
    group.add(frame);

    // Array of 3x3 Bulbs
    const current = activeCurrent || 0;
    const glowIntensity = Math.min(1.0, current / 6.8);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.2 + glowIntensity * 1.8,
      roughness: 0.1
    });

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const socket = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 0.06, 16),
          new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9 })
        );
        socket.position.set(-0.5 + c * 0.5, 0.4 + r * 0.35, 0.26);
        socket.rotation.x = Math.PI / 2;
        group.add(socket);

        const bulb = new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 16, 16),
          bulbMat
        );
        bulb.position.set(-0.5 + c * 0.5, 0.4 + r * 0.35, 0.36);
        group.add(bulb);
      }
    }

    group.userData = createComponentInspectionData(
      "3-Phase Balanced Resistive Lamp Load Bank",
      "Electrical Load Dissipation",
      "Applies balanced unity power factor (cos φ = 1.0) electrical load on alternator output terminals.",
      "Each branch consists of high-temperature incandescent elements switched in balanced steps (0 to 6.8A) to evaluate alternator terminal voltage droop and regulation under load.",
      (state) => ({ "Load Current IL": `${state.il || 0} A`, "Power Factor": "1.00 (UPF)", "Active Power": `${state.p0 || 0} W` })
    );

    return group;
  }

  // Builder for ZPF Pure Inductive Reactor Bank (Exp 7)
  function buildZpfReactorBank(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    // Base Frame
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.2, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 })
    );
    base.position.y = 0.1;
    group.add(base);

    // 3 Laminated Iron Core Columns with Heavy Coils
    for (let i = 0; i < 3; i++) {
      const core = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.9, 0.25),
        new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.2 })
      );
      core.position.set(-0.45 + i * 0.45, 0.65, 0);
      group.add(core);

      const coil = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.7, 24),
        new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.8, roughness: 0.3 })
      );
      coil.position.set(-0.45 + i * 0.45, 0.65, 0);
      group.add(coil);
    }

    group.userData = createComponentInspectionData(
      "3-Phase Pure Inductive (ZPF) Reactor Load Bank",
      "Zero Power Factor Testing",
      "Draws rated lagging current at zero power factor (cos φ = 0 lagging) for Potier Triangle construction.",
      "Provides purely inductive loading where current lags voltage by exactly 90 degrees. Direct demagnetizing armature reaction allows separation of Potier leakage reactance (PQ = I*XL) from field MMF (MQ = If1).",
      () => ({ "Rated Current": "6.9 A Lagging", "Power Factor": "0.00 Lagging", "Core Type": "Laminated Iron Core with Airgap Adjustment" })
    );

    return group;
  }

  // Builder for Infinite Bus Bar & 3 Synchronizing Lamps (Exp 8)
  function buildInfiniteBusSynchronizingPanel(x, y, z, beatFreq) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    // Overhead Bus Panel Frame
    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 1.2, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 })
    );
    panel.position.y = 1.0;
    group.add(panel);

    // 3 Infinite Bus Copper Bars (R, Y, B)
    const colors = [0xef4444, 0xfacc15, 0x3b82f6];
    for (let i = 0; i < 3; i++) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.04, 0.04),
        new THREE.MeshStandardMaterial({ color: colors[i], metalness: 0.95 })
      );
      bar.position.set(0, 1.4 - i * 0.12, 0.08);
      group.add(bar);
    }

    // 3 Synchronizing Lamps (Dark Lamp Method)
    const lampGroup = new THREE.Group();
    lampGroup.position.set(0, 0.95, 0.12);
    group.add(lampGroup);

    const lampMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.8,
      roughness: 0.1
    });

    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
      const lx = Math.cos(angle) * 0.25;
      const ly = Math.sin(angle) * 0.25;

      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), lampMat);
      bulb.position.set(lx, ly, 0);
      lampGroup.add(bulb);
    }

    // TPST Synchronizing Circuit Breaker Switch Handle
    const switchBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.25, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x1e293b })
    );
    switchBase.position.set(0, 0.55, 0.1);
    group.add(switchBase);

    const switchLever = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.25, 12),
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.9 })
    );
    switchLever.position.set(0, 0.55, 0.18);
    switchLever.rotation.x = Math.PI / 4;
    group.add(switchLever);

    group.userData = createComponentInspectionData(
      "3-Phase Infinite Busbar & Synchronizing Panel (TPST Breaker)",
      "Grid Interconnection & Paralleling",
      "Enables safe synchronization of incoming alternator with infinite power grid using Dark Lamp Method.",
      "The 3 lamps pulse together when phase sequence is correct. When beat frequency is very low and lamps are fully DARK, alternator is in exact phase coherence with grid and TPST breaker is closed.",
      (state) => ({ "Grid Voltage": "415 V RMS", "Grid Frequency": "50.00 Hz", "Beat Frequency": `${(state.beat || 0.1).toFixed(2)} Hz`, "Switch": "TPST Interlocked" })
    );

    return { group, lampMat };
  }

  // Builder for DC Shunt Motor Prime Mover
  function buildDcPrimeMover(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    // Bedplate Base
    const bed = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.1, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85 })
    );
    bed.position.y = 0.05;
    group.add(bed);

    // Motor Stator Frame (Green/Dark Slate)
    const frame = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.75, 1.4, 32),
      new THREE.MeshStandardMaterial({ color: 0x065f46, metalness: 0.85, roughness: 0.25 })
    );
    frame.rotation.x = Math.PI / 2;
    frame.position.y = 0.85;
    group.add(frame);

    // Terminal Box
    const tbox = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.3, 0.35),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 })
    );
    tbox.position.set(0, 1.7, 0);
    group.add(tbox);

    // Commutator Cover End
    const endCover = new THREE.Mesh(
      new THREE.CylinderGeometry(0.72, 0.72, 0.25, 24),
      new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.7 })
    );
    endCover.rotation.x = Math.PI / 2;
    endCover.position.set(0, 0.85, -0.8);
    group.add(endCover);

    // Drive Shaft
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 2.4, 24),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95 })
    );
    shaft.rotation.x = Math.PI / 2;
    shaft.position.y = 0.85;
    group.add(shaft);

    group.userData = createComponentInspectionData(
      "DC Shunt Motor Prime Mover (220V, 19A, 1500 RPM, 5 HP / 3.68 kW)",
      "Mechanical Prime Mover",
      "Drives the alternator / generator at synchronous speed (1500 RPM) with smooth armature and field rheostatic speed control.",
      "Operates from 220V DC mains via a 3-point starter. Field flux weakening allows precise speed trimming for frequency synchronization and super-synchronous generator testing.",
      (state) => ({ "Armature Voltage": "220 V DC", "Current": "19.0 A Max", "Speed": `${state.speed || 1500} RPM`, "Power": "5.0 HP (3.68 kW)" })
    );

    return group;
  }

  // Builder for Flexible Shaft Coupling
  function buildCoupling(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    const hub1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.18, 24),
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9 })
    );
    hub1.rotation.x = Math.PI / 2;
    hub1.position.z = -0.1;
    group.add(hub1);

    const rubberElement = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.08, 24),
      new THREE.MeshBasicMaterial({ color: 0x0f172a })
    );
    rubberElement.rotation.x = Math.PI / 2;
    group.add(rubberElement);

    const hub2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.18, 24),
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9 })
    );
    hub2.rotation.x = Math.PI / 2;
    hub2.position.z = 0.1;
    group.add(hub2);

    group.userData = createComponentInspectionData(
      "Flexible Sleeve Shaft Coupling",
      "Mechanical Power Transmission",
      "Transmits mechanical shaft torque between the DC prime mover and alternator/generator while damping torsional vibrations.",
      "Compensates for minor axial and radial shaft misalignments, ensuring smooth power transfer up to rated 5 HP capacity.",
      (state) => ({ "Torque Transmitted": `${state.torque || 14.6} Nm`, "Alignment": "Precision Coaxial", "Max Speed": "3000 RPM" })
    );

    return group;
  }

  // Builder for 3-Phase Induction Motor
  function buildInductionMotor(x, y, z, options = {}) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    // Bedplate
    const bedplate = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.1, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 })
    );
    bedplate.position.y = 0.05;
    group.add(bedplate);

    // Stator Casing (Industrial Blue)
    const statorMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.85,
      roughness: 0.25
    });
    const casing = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 1.4, 32), statorMat);
    casing.rotation.x = Math.PI / 2;
    casing.position.y = 0.85;
    group.add(casing);

    // Cooling Fins
    for (let i = 0; i < 7; i++) {
      const fin = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.04, 32), statorMat);
      fin.position.set(0, 0.85, -0.45 + i * 0.15);
      fin.rotation.x = Math.PI / 2;
      group.add(fin);
    }

    // Terminal Box
    const tbox = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.3, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9 })
    );
    tbox.position.set(0, 1.65, 0);
    group.add(tbox);

    // Fan Cowl (Non-Drive End)
    const cowl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.74, 0.74, 0.25, 24),
      new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.7 })
    );
    cowl.rotation.x = Math.PI / 2;
    cowl.position.set(0, 0.85, -0.8);
    group.add(cowl);

    // Rotating Shaft
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 2.4, 24),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95 })
    );
    shaft.rotation.x = Math.PI / 2;
    shaft.position.y = 0.85;
    group.add(shaft);

    // Rotor Core Group
    const rotorGroup = new THREE.Group();
    rotorGroup.position.set(0, 0.85, 0);
    group.add(rotorGroup);

    const rotorCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 1.0, 24),
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85 })
    );
    rotorCore.rotation.x = Math.PI / 2;
    rotorGroup.add(rotorCore);

    // Squirrel cage bars or slip rings
    if (options.isSlipRing) {
      for (let r = 0; r < 3; r++) {
        const ring = new THREE.Mesh(
          new THREE.CylinderGeometry(0.18, 0.18, 0.08, 16),
          new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.9 })
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.z = -0.65 + r * 0.12;
        rotorGroup.add(ring);
      }
    } else {
      for (let b = 0; b < 10; b++) {
        const ang = (b / 10) * Math.PI * 2;
        const bar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.025, 1.05, 8),
          new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 })
        );
        bar.position.set(Math.cos(ang) * 0.48, Math.sin(ang) * 0.48, 0);
        bar.rotation.x = Math.PI / 2;
        rotorGroup.add(bar);
      }
    }

    group.userData = createComponentInspectionData(
      options.isSlipRing 
        ? "3-Phase Slip-Ring Induction Motor (415V, 4.5A, 1440 RPM, 3 HP)"
        : "3-Phase Squirrel Cage Induction Motor (415V, 4.5A, 1440 RPM, 2.2 kW / 3 HP)",
      "AC Induction Motor",
      "Converts 3-phase electrical power into mechanical torque via electromagnetic induction.",
      "The 3-phase stator creates a smoothly rotating magnetic field at synchronous speed (1500 RPM). Rotor induced currents produce electromagnetic torque to drive mechanical loads.",
      (state) => ({
        "Supply Voltage": `${state.voltage || 415} V`,
        "Stator Current": `${state.current || 4.2} A`,
        "Operating Speed": `${state.speed || 1440} RPM`,
        "Slip": `${((state.slip || 0.04) * 100).toFixed(2)} %`,
        "Torque": `${state.torque || 14.6} Nm`
      })
    );

    return { group, shaft, rotorGroup };
  }

  // Builder for 3-Phase Alternator (Synchronous Generator)
  function buildAlternator(x, y, z, options = {}) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    // Bedplate
    const bedplate = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.1, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 })
    );
    bedplate.position.y = 0.05;
    group.add(bedplate);

    // Stator Casing (Industrial Amber / Copper)
    const statorMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.85,
      roughness: 0.25
    });
    const casing = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 1.4, 32), statorMat);
    casing.rotation.x = Math.PI / 2;
    casing.position.y = 0.85;
    group.add(casing);

    // Terminal Box (Armature R-Y-B & Field F1-F2)
    const tbox = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.3, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 })
    );
    tbox.position.set(0, 1.65, 0);
    group.add(tbox);

    // Rotating Shaft
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 2.4, 24),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95 })
    );
    shaft.rotation.x = Math.PI / 2;
    shaft.position.y = 0.85;
    group.add(shaft);

    // Rotor Core Group (Salient Poles)
    const rotorGroup = new THREE.Group();
    rotorGroup.position.set(0, 0.85, 0);
    group.add(rotorGroup);

    // 4 Projecting Poles
    for (let p = 0; p < 4; p++) {
      const poleHolder = new THREE.Group();
      poleHolder.rotation.z = (p / 4) * Math.PI * 2;
      const pole = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.35, 1.0),
        new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 })
      );
      pole.position.y = 0.38;
      poleHolder.add(pole);

      const coil = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.1, 1.02),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 })
      );
      coil.position.y = 0.34;
      poleHolder.add(coil);
      rotorGroup.add(poleHolder);
    }

    // Slip Rings & Brush Assembly
    for (let r = 0; r < 2; r++) {
      const ring = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 0.09, 16),
        new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.9 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.z = -0.65 + r * 0.15;
      rotorGroup.add(ring);
    }

    group.userData = createComponentInspectionData(
      "3-Phase Salient Pole Synchronous Alternator (3.5 kVA, 415V, 4.3A-6.9A, 1500 RPM)",
      "Synchronous AC Generator",
      "Converts mechanical prime mover input into 3-phase sinusoidal AC electrical power.",
      "DC excitation current in the rotating field poles sets up magnetic flux. Rotating at synchronous speed (1500 RPM) induces 50 Hz balanced EMF across armature windings according to Faraday's law.",
      (state) => ({
        "Terminal Voltage": `${state.voltage || 415} V`,
        "Armature Current": `${state.current || 4.3} A`,
        "Field Current (If)": `${state.if_val || 1.05} A`,
        "Frequency": `${state.freq || 50.0} Hz`,
        "Power Factor": `${state.pf || 0.85}`
      })
    );

    return { group, shaft, rotorGroup };
  }

  // Builder for Benchtop Digital Meter Console
  function buildMeterConsole(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    const rack = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.8, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 })
    );
    rack.position.y = 0.4;
    group.add(rack);

    // 3 LED Digital Meter Displays (V, A, W)
    const meterColors = [0xef4444, 0x10b981, 0x3b82f6];
    for (let m = 0; m < 3; m++) {
      const screen = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.22, 0.02),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
      );
      screen.position.set(-0.48 + m * 0.48, 0.45, 0.21);
      group.add(screen);

      const led = new THREE.Mesh(
        new THREE.BoxGeometry(0.36, 0.16, 0.01),
        new THREE.MeshBasicMaterial({ color: meterColors[m] })
      );
      led.position.set(-0.48 + m * 0.48, 0.45, 0.22);
      group.add(led);
    }

    group.userData = createComponentInspectionData(
      "Precision Digital Metering Console (Voltmeter, Ammeter, Wattmeters)",
      "Electrical Measurement Instrumentation",
      "Measures 3-phase true RMS line voltage, phase currents, active power, and power factor with 0.2% lab accuracy.",
      "Integrates micro-controller sampling and Hall-effect transducers to capture non-sinusoidal waveforms, harmonic distortion, and reactive power components simultaneously.",
      (state) => ({ "Line Voltage": `${state.voltage || 415} V`, "Line Current": `${state.current || 4.3} A`, "Active Power": `${state.power || 2500} W` })
    );

    return group;
  }

  // Top-Level Physical Apparatus Assembly for Selected Experiment
  function buildSetupForExperiment(expId, options = {}) {
    const root = new THREE.Group();
    const rotatingObjects = [];

    // Common Lab Bench Surface
    const bench = new THREE.Mesh(
      new THREE.BoxGeometry(8.0, 0.2, 5.0),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 })
    );
    bench.position.set(0, -0.1, 0);
    root.add(bench);

    if (expId === 'exp2') {
      // EXP 2: No-Load & Blocked Rotor Test
      // Setup: 3-Phase Induction Motor + 3-Phase Variac + Rotor Locking Clamp + Meter Console
      const motor = buildInductionMotor(0.4, 0, 0, { isSlipRing: false });
      root.add(motor.group);
      rotatingObjects.push(motor.shaft, motor.rotorGroup);

      const variac = buildVariac(-1.8, 0, 0.8);
      root.add(variac);

      const lockClamp = buildRotorLockClamp(1.5, 0, 0);
      root.add(lockClamp);

      const console = buildMeterConsole(-1.2, 0, -1.4);
      root.add(console);

    } else if (expId === 'exp3') {
      // EXP 3: Speed Control of 3-Phase Induction Motor
      // Setup: Slip Ring Motor + Variac + Rotor Rheostat Box + Meter Console
      const motor = buildInductionMotor(0.3, 0, 0, { isSlipRing: true });
      root.add(motor.group);
      rotatingObjects.push(motor.shaft, motor.rotorGroup);

      const variac = buildVariac(-1.8, 0, 0.8);
      root.add(variac);

      const rheostat = buildRotorRheostatBox(1.8, 0, 0.6);
      root.add(rheostat);

      const console = buildMeterConsole(-1.2, 0, -1.4);
      root.add(console);

    } else if (expId === 'exp5') {
      // EXP 5: Alternator Load Test
      // Setup: DC Prime Mover + Coupling + 3-Phase Alternator + Lamp Load Bank + Meter Console
      const dcMotor = buildDcPrimeMover(-1.6, 0, 0);
      root.add(dcMotor);

      const coupling = buildCoupling(0, 0.85, 0);
      root.add(coupling);

      const alternator = buildAlternator(1.6, 0, 0);
      root.add(alternator.group);
      rotatingObjects.push(alternator.shaft, alternator.rotorGroup);

      const loadBank = buildLampLoadBank(2.2, 0, 1.4);
      root.add(loadBank);

      const console = buildMeterConsole(-1.4, 0, -1.4);
      root.add(console);

    } else if (expId === 'exp6_a') {
      // EXP 6A: Alternator EMF/MMF Regulation (OCC & SCC)
      // Setup: DC Prime Mover + Coupling + Alternator + Variac/Rheostat + Meter Console
      const dcMotor = buildDcPrimeMover(-1.6, 0, 0);
      root.add(dcMotor);

      const coupling = buildCoupling(0, 0.85, 0);
      root.add(coupling);

      const alternator = buildAlternator(1.6, 0, 0);
      root.add(alternator.group);
      rotatingObjects.push(alternator.shaft, alternator.rotorGroup);

      const variac = buildVariac(-2.2, 0, 1.2);
      root.add(variac);

      const console = buildMeterConsole(0.0, 0, -1.5);
      root.add(console);

    } else if (expId === 'exp6_b') {
      // EXP 6B: Induction Generator Load Test
      // Setup: DC Prime Mover + Coupling + Induction Generator + Capacitor Bank / Lamp Load + Console
      const dcMotor = buildDcPrimeMover(-1.6, 0, 0);
      root.add(dcMotor);

      const coupling = buildCoupling(0, 0.85, 0);
      root.add(coupling);

      const indGen = buildInductionMotor(1.6, 0, 0, { isSlipRing: false });
      root.add(indGen.group);
      rotatingObjects.push(indGen.shaft, indGen.rotorGroup);

      const loadBank = buildLampLoadBank(2.2, 0, 1.4);
      root.add(loadBank);

      const console = buildMeterConsole(-1.4, 0, -1.4);
      root.add(console);

    } else if (expId === 'exp7') {
      // EXP 7: Alternator ZPF / Potier Method
      // Setup: DC Prime Mover + Coupling + Alternator + ZPF Inductive Reactor Bank + Console
      const dcMotor = buildDcPrimeMover(-1.6, 0, 0);
      root.add(dcMotor);

      const coupling = buildCoupling(0, 0.85, 0);
      root.add(coupling);

      const alternator = buildAlternator(1.6, 0, 0);
      root.add(alternator.group);
      rotatingObjects.push(alternator.shaft, alternator.rotorGroup);

      const zpfBank = buildZpfReactorBank(2.2, 0, 1.4);
      root.add(zpfBank);

      const console = buildMeterConsole(-1.4, 0, -1.4);
      root.add(console);

    } else if (expId === 'exp8') {
      // EXP 8: Alternator on Infinite Bus & Synchronization
      // Setup: DC Prime Mover + Coupling + Alternator + Infinite Bus & Dark Lamps Panel + Console
      const dcMotor = buildDcPrimeMover(-1.6, 0, 0);
      root.add(dcMotor);

      const coupling = buildCoupling(0, 0.85, 0);
      root.add(coupling);

      const alternator = buildAlternator(1.6, 0, 0);
      root.add(alternator.group);
      rotatingObjects.push(alternator.shaft, alternator.rotorGroup);

      const synchPanel = buildInfiniteBusSynchronizingPanel(2.4, 0, 0.8);
      root.add(synchPanel);

      const console = buildMeterConsole(-1.4, 0, -1.4);
      root.add(console);
    }

    return { root, rotatingObjects };
  }

  return {
    createComponentInspectionData,
    buildVariac,
    buildRotorLockClamp,
    buildRotorRheostatBox,
    buildLampLoadBank,
    buildZpfReactorBank,
    buildInfiniteBusSynchronizingPanel,
    buildDcPrimeMover,
    buildCoupling,
    buildInductionMotor,
    buildAlternator,
    buildMeterConsole,
    buildSetupForExperiment
  };
})();
