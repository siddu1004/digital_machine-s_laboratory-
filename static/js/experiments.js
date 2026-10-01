/**
 * Electrical Machines Digital Twin — Client-Side Experiments & Laboratory Manager
 * SOLE SOURCE OF TRUTH: machineslabmaterials-sem-5
 * Exact Semester-5 Laboratory Experiments:
 * 1. EXP 2: No Load and Blocked Rotor Tests on 3-Phase Squirrel Cage Induction Motor
 * 2. EXP 3: Speed Control of 3-Phase Induction Motor (Pole Changing, Stator Voltage, Rotor Resistance)
 * 3. EXP 5: Load Test on Three-Phase Alternator
 * 4. EXP 6-A: Regulation of Alternator by EMF and MMF Methods
 * 5. EXP 6-B: Load Test on Induction Generator
 * 6. EXP 7: Regulation of Alternator by ZPF (Potier Triangle) Method
 * 7. EXP 8: Alternator on Infinite Bus Bar (V and Inverted V Curves)
 */

window.LabExperiments = (function() {
  const EXPERIMENTS = [
    {
      id: "exp2",
      number: "EXP 2",
      title: "No Load and Blocked Rotor Tests on 3-Phase Squirrel Cage Induction Motor",
      machineType: "induction_motor",
      ratings: {
        machine: "3-Phase Squirrel Cage Induction Motor",
        voltage: "415 V",
        current: "4.5 A",
        power: "2.2 kW (3 HP)",
        speed: "1440 RPM",
        frequency: "50 Hz",
        connection: "Delta/Star",
        insulation: "Class B"
      },
      aim: "1. To conduct no-load test and blocked rotor test on the given 3-phase cage induction motor and obtain equivalent circuit parameters.\n2. Using equivalent circuit, calculate current, power factor, torque, output power, and efficiency at any given slip.\n3. Calculate slip for maximum power and maximum torque.\n4. Draw the circle diagram of the 3-phase induction motor from test data.",
      apparatus: [
        "3-Phase Squirrel Cage Induction Motor (415V, 4.5A, 2.2kW, 1440 RPM)",
        "3-Phase Auto Transformer / Variac (0-470V, 15A)",
        "AC Voltmeter (0-600V MI)",
        "AC Ammeter (0-10A MI)",
        "Wattmeters (500V, 5/10A, LPF & UPF)",
        "Digital Tachometer (0-3000 RPM)",
        "DC Power Supply & Regulated Rheostat for Stator Resistance Measurement",
        "Mechanical Rotor Locking Clamp"
      ],
      theory: "No-Load Test: At rated voltage (415V) without shaft load, slip is negligible (s ~ 0.0013). Rotor impedance approaches infinity. Motor draws no-load current I0 at low lagging power factor cos(phi0). Measures core loss (iron loss) and friction/windage loss.\nBlocked Rotor Test: Rotor is clamped stationary (s = 1.0). Low voltage (Vsc) circulates rated current (4.5A-4.7A). Core loss is negligible. Measures equivalent series resistance R01 and leakage reactance X01.",
      equations: [
        "No-Load Power Factor: cos(phi0) = W0 / (sqrt(3) * V0 * I0)",
        "No-Load Active Current: Iw = I0 * cos(phi0), Magnetizing Current: Im = I0 * sin(phi0)",
        "Equivalent Core Resistance: R0 = V0_ph / Iw, Magnetizing Reactance: X0 = V0_ph / Im",
        "Short-Circuit Resistance: R01 = Wsc / (3 * Isc_ph^2)",
        "Short-Circuit Impedance: Z01 = Vsc_ph / Isc_ph, Leakage Reactance: X01 = sqrt(Z01^2 - R01^2)",
        "Stator Resistance: R1 (from DC test multiplied by 1.2 for skin effect), Rotor Resistance referred to stator: R2' = R01 - R1",
        "Stator & Rotor Leakage Reactance: X1 = X2' = X01 / 2"
      ],
      procedure: [
        "1. NO-LOAD TEST: Connect motor with rotor uncoupled. Set variac to 0V. Switch ON 3-phase 415V 50Hz supply.",
        "2. Gradually increase variac to rated 415V. Record no-load voltage V0, no-load current I0, power W0, and speed N0.",
        "3. Reduce variac to zero and switch OFF supply.",
        "4. BLOCKED ROTOR TEST: Firmly clamp motor rotor shaft so it cannot rotate (s = 1.0).",
        "5. Set variac to 0V. Switch ON supply and carefully increase voltage until line current reaches rated current (4.7A).",
        "6. Immediately record Vsc, Isc, and Wsc to prevent winding overheating. Turn variac to zero and switch OFF supply.",
        "7. STATOR RESISTANCE TEST: Apply DC supply across stator terminals, measure V_dc and I_dc at multiple values, find R_dc, and calculate effective AC resistance R1 = 1.2 * R_dc."
      ],
      observationColumns: [
        { key: "test", label: "Test Type", unit: "" },
        { key: "voltage", label: "Voltage (V)", unit: "V" },
        { key: "current", label: "Current (A)", unit: "A" },
        { key: "power", label: "Power (W)", unit: "W" },
        { key: "speed", label: "Speed (RPM)", unit: "RPM" },
        { key: "pf", label: "Power Factor", unit: "" }
      ],
      verifiedObservations: [
        { test: "No-Load Test (MF=4)", voltage: 415.0, current: 2.60, power: 180.0, speed: 1498, pf: 0.096 },
        { test: "Blocked Rotor Test (MF=1)", voltage: 114.0, current: 4.70, power: 260.0, speed: 0, pf: 0.280 },
        { test: "DC Stator Resistance (Mean)", voltage: 20.0, current: 2.50, power: 50.0, speed: 0, pf: 1.0, r_dc: 7.9007, r_eff: 9.4808 }
      ],
      graphs: [
        "Circle Diagram of Induction Motor (Semi-circle locus from No-Load and Blocked Rotor points)",
        "Equivalent Circuit Parameter Network: R1, X1, R2', X2', Rc, Xm",
        "Torque vs Slip Characteristic Curve derived from circle diagram",
        "Efficiency vs Output Power Curve"
      ]
    },
    {
      id: "exp3",
      number: "EXP 3",
      title: "Speed Control of 3-Phase Induction Motor",
      machineType: "slip_ring_induction_motor",
      ratings: {
        machine: "3-Phase Slip Ring Induction Motor with Pole Changing & Stator Tappings",
        voltage: "415 V",
        current: "4.5 A",
        frequency: "50 Hz",
        poles: "2 / 4 / 6 Poles",
        rotor: "Wound Rotor with Slip Rings & External Rheostat Bank"
      },
      aim: "1. To control the speed of the 3-phase induction motor by pole changing method (2, 4, 6 poles).\n2. To control speed by changing external rotor resistance and plot speed variation with rotor resistance.\n3. To control speed by varying stator input voltage at no-load and 25% full-load.",
      apparatus: [
        "3-Phase Slip Ring Induction Motor with Pole-Changing Tappings",
        "3-Phase Auto Transformer / Variac (0-470V, 15A)",
        "3-Phase External Rotor Resistance Rheostat Bank (0-120 Ohm)",
        "AC Voltmeter (0-600V)",
        "AC Ammeter (0-10A)",
        "Digital Tachometer (0-3000 RPM)",
        "Brake Dynamometer (for 25% load testing)"
      ],
      theory: "Synchronous speed is Ns = 120*f / P. Changing stator pole connections changes Ns (2 poles -> 3000 RPM, 4 poles -> 1500 RPM, 6 poles -> 1000 RPM).\nRotor Resistance Control: Inserting external resistance R_ext into rotor circuit increases total rotor resistance R2 + R_ext. Maximum torque remains constant but occurs at higher slip s_max = (R2 + R_ext) / X2, reducing motor speed under load.\nStator Voltage Control: Developed torque is proportional to V^2 (T proportional to V^2). Reducing voltage at a given load torque forces the motor to operate at higher slip, reducing speed.",
      equations: [
        "Synchronous Speed: Ns = (120 * f) / P RPM",
        "Operating Speed: N = Ns * (1 - s) RPM",
        "Torque Equation: T = (3 / omega_s) * [V^2 * (R2 + R_ext) / s] / [ (R1 + (R2 + R_ext)/s)^2 + (X1 + X2)^2 ]",
        "Slip for Maximum Torque: s_mT = (R2 + R_ext) / sqrt(R1^2 + (X1 + X2)^2)",
        "External Rotor Resistance: R_ext = Vr / Ir Ohm"
      ],
      procedure: [
        "METHOD 1 (Pole Changing): Connect stator terminals for 6-pole, apply 415V via variac, record speed (998 RPM). Repeat for 4-pole (1499 RPM) and 2-pole (2999 RPM).",
        "METHOD 2 (Stator Voltage Control): With motor uncoupled, apply 20% (83V), 40% (166V), 60% (249V), 80% (332V), and 100% (415V). Record no-load speed. Apply 25% brake load and repeat.",
        "METHOD 3 (Rotor Rheostat Control): Start slip ring motor with rotor rheostat at minimum resistance. Gradually increase external rotor resistance in steps. At each step, record rotor voltage Vr, rotor current Ir, external resistance R = Vr/Ir, and motor speed N."
      ],
      observationColumns: [
        { key: "method", label: "Method / Step", unit: "" },
        { key: "voltage", label: "Stator V", unit: "V" },
        { key: "poles", label: "Poles", unit: "P" },
        { key: "r_ext", label: "R_ext", unit: "Ω" },
        { key: "speed_noload", label: "Speed No-Load", unit: "RPM" },
        { key: "speed_loaded", label: "Speed 25% Load", unit: "RPM" }
      ],
      verifiedObservations: [
        { method: "Pole Changing (6-Pole)", voltage: 415, poles: 6, r_ext: 0, speed_noload: 998, speed_loaded: 960 },
        { method: "Pole Changing (4-Pole)", voltage: 415, poles: 4, r_ext: 0, speed_noload: 1499, speed_loaded: 1440 },
        { method: "Pole Changing (2-Pole)", voltage: 415, poles: 2, r_ext: 0, speed_noload: 2999, speed_loaded: 2880 },
        { method: "Voltage 20% (83V)", voltage: 83, poles: 4, r_ext: 0, speed_noload: 1470, speed_loaded: 1320 },
        { method: "Voltage 40% (166V)", voltage: 166, poles: 4, r_ext: 0, speed_noload: 1486, speed_loaded: 1365 },
        { method: "Voltage 60% (249V)", voltage: 249, poles: 4, r_ext: 0, speed_noload: 1491, speed_loaded: 1400 },
        { method: "Voltage 80% (332V)", voltage: 332, poles: 4, r_ext: 0, speed_noload: 1493, speed_loaded: 1447 },
        { method: "Voltage 100% (415V)", voltage: 415, poles: 4, r_ext: 0, speed_noload: 1494, speed_loaded: 1465 },
        { method: "Rotor Rheostat R=31.43Ω", voltage: 415, poles: 4, r_ext: 31.43, speed_noload: 1494, speed_loaded: 1296 },
        { method: "Rotor Rheostat R=41.05Ω", voltage: 415, poles: 4, r_ext: 41.05, speed_noload: 1494, speed_loaded: 1135 },
        { method: "Rotor Rheostat R=60.00Ω", voltage: 415, poles: 4, r_ext: 60.00, speed_noload: 1494, speed_loaded: 954 },
        { method: "Rotor Rheostat R=116.84Ω", voltage: 415, poles: 4, r_ext: 116.84, speed_noload: 1494, speed_loaded: 507 }
      ],
      graphs: [
        "Speed vs Stator Voltage (No-Load and 25% Load curves)",
        "Speed vs External Rotor Resistance R_ext",
        "Torque vs Speed Characteristics for various rotor resistance settings"
      ]
    },
    {
      id: "exp5",
      number: "EXP 5",
      title: "Load Test on Three-Phase Alternator",
      machineType: "synchronous_alternator",
      ratings: {
        alternator: "3-Phase Synchronous Generator (3.5 kVA, 415 V Star, 4.8 A rated, 1500 RPM, 50 Hz)",
        primeMover: "DC Shunt Motor (220 V, 19 A, 1500 RPM, 5 HP / 3.68 kW)",
        excitation: "0-220 V DC Variable Field Supply, If = 0-2.0 A"
      },
      aim: "To conduct load test on a 3-phase alternator and determine its percentage voltage regulation and efficiency characteristics under varying electrical load current.",
      apparatus: [
        "3-Phase Synchronous Alternator coupled to DC Shunt Motor Prime Mover",
        "3-Phase Balanced Resistive Lamp Load Bank (0-10A per phase)",
        "3-Point Starter for DC Motor",
        "DC Motor Field Rheostat (300 Ohm, 1.5A)",
        "Alternator Field Rheostat (300 Ohm, 1.5A)",
        "AC Voltmeter (0-600V MI)",
        "AC Ammeter (0-10A MI)",
        "DC Ammeter (0-2A MC for field)",
        "Digital Tachometer (0-2000 RPM)"
      ],
      theory: "When load is connected to an alternator, terminal voltage Vt changes due to: 1. Armature resistance voltage drop Ia*Ra, 2. Armature leakage reactance voltage drop Ia*Xl, and 3. Armature reaction (cross-magnetizing and demagnetizing at lagging/unity PF). For a unity power factor resistive load, Vt drops moderately with load current. Percentage Voltage Regulation is defined as: % Reg = [(E0 - Vt) / E0] * 100% where E0 is no-load terminal voltage at rated speed and rated excitation.",
      equations: [
        "Generated Output Power: P0 = sqrt(3) * Vt * IL * cos(phi) Watts (cos(phi) = 1.0 for resistive load)",
        "Percentage Voltage Regulation: % Reg = [(E0 - Vt) / E0] * 100%",
        "Synchronous Speed: Ns = (120 * f) / P = (120 * 50) / 4 = 1500 RPM"
      ],
      procedure: [
        "1. Make connections as shown in circuit diagram. Keep prime mover field rheostat in minimum position and alternator field rheostat in maximum resistance position.",
        "2. Switch ON 220V DC supply and start DC prime mover using 3-point starter. Adjust speed strictly to 1500 RPM rated synchronous speed.",
        "3. Switch ON DC field excitation of alternator. Gradually adjust alternator field rheostat until terminal voltage reaches rated no-load voltage E0 = 415V.",
        "4. Note down no-load readings (IL = 0, Vt = 415V, If = 1.1A, P0 = 0, Reg = 0%).",
        "5. Switch on balanced 3-phase load bank in steps (IL = 1.0A, 2.0A, 2.8A, 3.4A, 4.2A, 4.8A, 5.3A, 5.8A, 6.3A, 6.8A).",
        "6. At each step, ensure speed is maintained at 1500 RPM. Record Field Current If, Line Voltage Vt, Load Current IL, and calculate Output Power P0 and % Regulation.",
        "7. After recording full-load data, switch off all load switches, reduce field excitation, and stop the prime mover."
      ],
      observationColumns: [
        { key: "sno", label: "S.No", unit: "" },
        { key: "if", label: "Field Current If", unit: "A" },
        { key: "vt", label: "Line Voltage Vt", unit: "V" },
        { key: "il", label: "Load Current IL", unit: "A" },
        { key: "p0", label: "Output Power P0", unit: "W" },
        { key: "reg", label: "Voltage Regulation", unit: "%" }
      ],
      verifiedObservations: [
        { sno: 1, if: 1.10, vt: 415, il: 0.0, p0: 0.0, reg: 0.0 },
        { sno: 2, if: 1.10, vt: 410, il: 1.0, p0: 710.14, reg: 1.20 },
        { sno: 3, if: 1.06, vt: 400, il: 2.0, p0: 1385.64, reg: 3.61 },
        { sno: 4, if: 1.05, vt: 390, il: 2.8, p0: 1891.40, reg: 6.02 },
        { sno: 5, if: 1.05, vt: 375, il: 3.4, p0: 2208.36, reg: 9.64 },
        { sno: 6, if: 1.05, vt: 360, il: 4.2, p0: 2618.86, reg: 13.25 },
        { sno: 7, if: 1.05, vt: 350, il: 4.3, p0: 2606.73, reg: 15.66 },
        { sno: 8, if: 1.04, vt: 340, il: 4.8, p0: 2826.70, reg: 18.07 },
        { sno: 9, if: 1.04, vt: 325, il: 5.3, p0: 2983.46, reg: 21.68 },
        { sno: 10, if: 1.04, vt: 310, il: 5.8, p0: 3114.23, reg: 25.30 },
        { sno: 11, if: 1.04, vt: 290, il: 6.3, p0: 3164.45, reg: 30.12 },
        { sno: 12, if: 1.04, vt: 270, il: 6.8, p0: 3180.04, reg: 34.94 }
      ],
      graphs: [
        "Terminal Line Voltage Vt vs Load Current IL (Drooping load characteristic)",
        "Percentage Voltage Regulation % Reg vs Load Current IL"
      ]
    },
    {
      id: "exp6_a",
      number: "EXP 6-A",
      title: "Regulation of Alternator by EMF and MMF Methods",
      machineType: "synchronous_alternator",
      ratings: {
        alternator: "3-Phase Synchronous Generator (415 V Star, 4.3 A rated, 1500 RPM, 50 Hz, Ra = 2.415 Ohm/ph)",
        primeMover: "DC Shunt Motor (220 V, 19 A, 1500 RPM, 5 HP)"
      },
      aim: "To predetermine the voltage regulation of a 3-phase non-salient pole alternator for various power factors (lagging, unity, leading) using EMF (Synchronous Impedance) and MMF (Ampere-Turn) methods by conducting OCC and SCC tests.",
      apparatus: [
        "3-Phase Alternator coupled with DC Shunt Motor Prime Mover",
        "DC Power Supply & 3-Point Starter",
        "Field Rheostats for Prime Mover and Alternator (300 Ohm, 1.5A)",
        "AC Voltmeter (0-600V MI)",
        "AC Ammeter (0-10A MI)",
        "DC Ammeters (0-2A MC for field)",
        "Digital Tachometer (0-2000 RPM)",
        "Low Voltage DC Source for Armature Resistance Measurement"
      ],
      theory: "EMF Method (Pessimistic): Assumes magnetic circuit is linear. Replaces armature reaction effect by a fictitious reactance drop Ia*Xa. Synchronous impedance Zs = E0_ph / Isc_ph at same field current. Predicts higher regulation than actual.\nMMF Method (Optimistic): Treats all drops as field ampere-turns. Replaces armature leakage impedance drop by equivalent field current. Vectorially combines If1 (for rated terminal voltage) and If2 (field current required to circulate rated short-circuit current). Predicts lower regulation than actual.",
      equations: [
        "Effective Armature Resistance: Ra = 1.2 * Rdc = 2.415 Ohm/phase",
        "Synchronous Impedance: Zs = E0_ph / Isc_ph (at same If)",
        "Synchronous Reactance: Xs = sqrt(Zs^2 - Ra^2)",
        "EMF Generated Voltage: E0 = sqrt( (V*cos(phi) + I*Ra)^2 + (V*sin(phi) +- I*Xs)^2 ) (+ for lag, - for lead)",
        "EMF Voltage Regulation: % Reg = [(E0 - V) / V] * 100%",
        "MMF Method Resultant Field Current: If = sqrt( If1^2 + If2^2 - 2*If1*If2*cos(90 +- phi) ) (+ for lag, - for lead)",
        "From OCC, determine E0 corresponding to resultant If, then % Reg = [(E0 - V) / V] * 100%"
      ],
      procedure: [
        "1. OPEN CIRCUIT TEST (OCC): Run alternator at 1500 RPM with stator open. Increase field current If in steps from 0 to 1.09A, recording line voltage E0_line and phase voltage E0_ph.",
        "2. SHORT CIRCUIT TEST (SCC): Short stator terminals through ammeter. Run at 1500 RPM. Starting from 0A field current, gradually increase If until rated short-circuit current (4.3A) flows. Record Ifsc = 0.35A.",
        "3. STATOR RESISTANCE TEST: Apply DC supply across armature winding. Measure Vdc and Idc at multiple steps (2A, 2.5A, 3A, 3.5A). Mean Rdc = 2.0125 Ohm. Effective AC resistance Ra = 1.2 * Rdc = 2.415 Ohm/phase.",
        "4. Calculate Zs and Xs, predetermine E0 and % Reg for 0.8 lagging, 1.0 unity, and 0.8 leading power factor.",
        "5. Perform MMF vector addition to find resultant field current If and predetermine regulation."
      ],
      observationColumns: [
        { key: "if", label: "Field Current If", unit: "A" },
        { key: "e0_line", label: "OCC Line E0", unit: "V" },
        { key: "e0_ph", label: "OCC Phase E0", unit: "V" },
        { key: "isc", label: "SCC Current Isc", unit: "A" }
      ],
      verifiedObservations: [
        { if: 0.00, e0_line: 28.0, e0_ph: 16.16, isc: 0.0 },
        { if: 0.25, e0_line: 152.5, e0_ph: 87.75, isc: 3.07 },
        { if: 0.29, e0_line: 170.5, e0_ph: 98.43, isc: 3.56 },
        { if: 0.31, e0_line: 190.4, e0_ph: 109.92, isc: 3.81 },
        { if: 0.35, e0_line: 210.0, e0_ph: 121.24, isc: 4.30 },
        { if: 0.40, e0_line: 230.0, e0_ph: 132.80, isc: 4.91 },
        { if: 0.43, e0_line: 257.0, e0_ph: 148.40, isc: 5.28 },
        { if: 0.45, e0_line: 270.0, e0_ph: 155.80, isc: 5.53 },
        { if: 0.50, e0_line: 290.0, e0_ph: 167.40, isc: 6.14 },
        { if: 0.55, e0_line: 310.0, e0_ph: 178.90, isc: 6.75 },
        { if: 0.62, e0_line: 330.0, e0_ph: 190.50, isc: 7.61 },
        { if: 0.70, e0_line: 350.0, e0_ph: 202.10, isc: 8.60 },
        { if: 0.79, e0_line: 370.0, e0_ph: 213.60, isc: 9.70 },
        { if: 0.90, e0_line: 390.0, e0_ph: 225.20, isc: 11.05 },
        { if: 1.00, e0_line: 400.0, e0_ph: 230.90, isc: 12.28 },
        { if: 1.09, e0_line: 410.0, e0_ph: 236.70, isc: 13.39 }
      ],
      graphs: [
        "OCC Curve (Open Circuit Phase Voltage E0 vs Field Current If)",
        "SCC Curve (Short Circuit Line Current Isc vs Field Current If)",
        "Synchronous Impedance Zs vs Field Current If",
        "Predetermined Percentage Regulation % Reg vs Power Factor for EMF and MMF Methods"
      ]
    },
    {
      id: "exp6_b",
      number: "EXP 6-B",
      title: "Load Test on Induction Generator",
      machineType: "induction_generator",
      ratings: {
        acMachine: "3-Phase Induction Machine (415 V, 4.5 A, 1440 RPM, 2.2 kW, 50 Hz, Class B)",
        dcMachine: "DC Shunt Machine Prime Mover (220 V, 19 A, 1500 RPM, 5 HP / 3.68 kW)"
      },
      aim: "To operate a 3-phase induction machine in super-synchronous generator mode (speed N > Ns, slip s < 0) driven by prime mover, and evaluate generated electrical output power, efficiency, power factor, and speed characteristics.",
      apparatus: [
        "3-Phase Induction Machine coupled with DC Shunt Machine",
        "3-Phase 415V 50Hz AC Mains Supply with Auto Transformer / Variac",
        "220V DC Power Supply with DPST switch",
        "DC Motor Field Rheostat (300 Ohm, 1.5A)",
        "Two 3-Phase Wattmeters (500V, 10A, LPF/UPF, MF = 2)",
        "AC Voltmeter (0-600V MI) & AC Ammeter (0-10A MI)",
        "DC Voltmeter (0-300V MC) & DC Ammeter (0-20A MC)",
        "Digital Tachometer (0-2000 RPM)"
      ],
      theory: "An induction machine acts as a motor below synchronous speed (s > 0). When driven by a mechanical prime mover above synchronous speed (N > Ns = 1500 RPM), rotor slip s = (Ns - N) / Ns becomes negative. The rotor magnetic bars cut the stator rotating magnetic field in reverse relative direction. Rotor induced currents reverse, transforming mechanical shaft power into 3-phase electrical power fed back into the grid.\nThe induction generator draws reactive magnetizing VARs from the grid while exporting active electrical power.",
      equations: [
        "Rotor Slip: s = [(Ns - N) / Ns] * 100% (Negative slip indicates generator mode)",
        "DC Prime Mover Input Power: P_dc = V_dc * I_dc Watts",
        "Mechanical Power Input to Induction Generator: P_mech_in = 0.85 * P_dc Watts (assuming 85% DC motor efficiency)",
        "Generated AC Power Output: P_ac_out = (W1 + W2) * MF Watts",
        "Power Factor: pf = P_ac_out / (sqrt(3) * V_ac * I_ac)",
        "Generator Efficiency: eta = (P_ac_out / P_mech_in) * 100%"
      ],
      procedure: [
        "1. Make connections as per the circuit diagram. Set autotransformer to 0V. Switch ON AC supply and gradually increase to rated 415V to start induction machine as motor.",
        "2. Switch ON DC supply. Note connected DC voltmeter reading.",
        "3. Increase excitation of DC machine until generated DC voltage matches DC source voltage. Check polarity matching; close DPST switch to parallel DC machine.",
        "4. Reduce field excitation of DC machine so that wattmeter reads ZERO. The speed corresponding to zero power is the synchronous benchmark speed (Ns = 1494-1500 RPM).",
        "5. Increase speed in steps above 1500 RPM (super-synchronous) by weakening DC motor field. Observe wattmeter pointers reversing to indicate export power to AC grid.",
        "6. At each speed increment (1503.6 RPM to 1528.8 RPM), record: Vac, Iac, Pac_out, Vdc, Idc, and Rotor Speed N.",
        "7. Calculate DC input, AC output, power factor, negative slip, and generation efficiency.",
        "8. Return DC field rheostat to maximum, open DPST switch, reduce AC variac to zero, and switch off."
      ],
      observationColumns: [
        { key: "sno", label: "S.No", unit: "" },
        { key: "vac", label: "AC Voltage Vac", unit: "V" },
        { key: "iac", label: "AC Current Iac", unit: "A" },
        { key: "pac_out", label: "AC Power Output", unit: "W" },
        { key: "vdc", label: "DC Voltage Vdc", unit: "V" },
        { key: "idc", label: "DC Current Idc", unit: "A" },
        { key: "speed", label: "Speed N", unit: "RPM" },
        { key: "slip", label: "Slip s", unit: "%" },
        { key: "pf", label: "Power Factor", unit: "" },
        { key: "eff", label: "Efficiency", unit: "%" }
      ],
      verifiedObservations: [
        { sno: 1, vac: 415, iac: 3.95, pac_out: 200, vdc: 220, idc: 3.5, speed: 1503.6, slip: -0.64, pf: 0.070, eff: 30.5 },
        { sno: 2, vac: 415, iac: 3.95, pac_out: 280, vdc: 216, idc: 4.5, speed: 1505.5, slip: -0.77, pf: 0.099, eff: 33.9 },
        { sno: 3, vac: 415, iac: 4.10, pac_out: 560, vdc: 216, idc: 5.0, speed: 1507.0, slip: -0.87, pf: 0.190, eff: 61.0 },
        { sno: 4, vac: 415, iac: 4.20, pac_out: 720, vdc: 215, idc: 6.0, speed: 1509.6, slip: -1.04, pf: 0.239, eff: 65.6 },
        { sno: 5, vac: 415, iac: 4.40, pac_out: 890, vdc: 215, idc: 7.0, speed: 1512.0, slip: -1.20, pf: 0.282, eff: 69.6 },
        { sno: 6, vac: 415, iac: 4.50, pac_out: 1080, vdc: 214, idc: 8.0, speed: 1514.4, slip: -1.36, pf: 0.334, eff: 74.2 },
        { sno: 7, vac: 415, iac: 4.65, pac_out: 1220, vdc: 210, idc: 9.0, speed: 1516.2, slip: -1.49, pf: 0.365, eff: 76.0 },
        { sno: 8, vac: 415, iac: 4.80, pac_out: 1400, vdc: 210, idc: 10.0, speed: 1517.0, slip: -1.54, pf: 0.406, eff: 78.4 },
        { sno: 9, vac: 415, iac: 4.90, pac_out: 1560, vdc: 210, idc: 11.0, speed: 1521.0, slip: -1.81, pf: 0.443, eff: 79.5 },
        { sno: 10, vac: 415, iac: 5.00, pac_out: 1740, vdc: 210, idc: 12.0, speed: 1524.0, slip: -2.01, pf: 0.484, eff: 81.2 },
        { sno: 11, vac: 415, iac: 5.10, pac_out: 2000, vdc: 208, idc: 13.0, speed: 1527.8, slip: -2.26, pf: 0.545, eff: 87.0 },
        { sno: 12, vac: 415, iac: 5.30, pac_out: 2080, vdc: 208, idc: 14.0, speed: 1528.8, slip: -2.33, pf: 0.546, eff: 84.1 }
      ],
      graphs: [
        "Generated Power Pac_out vs Super-synchronous Speed N",
        "Electrical Efficiency vs Electrical Output Power",
        "Power Factor vs Output Power",
        "Rotor Slip vs Output Power"
      ]
    },
    {
      id: "exp7",
      number: "EXP 7",
      title: "Regulation of Alternator by ZPF (Potier Triangle) Method",
      machineType: "synchronous_alternator",
      ratings: {
        alternator: "3-Phase Synchronous Generator (415 V Star, 6.9 A rated, 1500 RPM, 50 Hz, Ra = 2.0 Ohm/phase)",
        primeMover: "DC Shunt Motor (220 V, 19 A, 1500 RPM, 5 HP)",
        zpfLoad: "3-Phase Pure Inductive Variable Reactor Load Bank"
      },
      aim: "To predetermine the voltage regulation of a 3-phase alternator using the Zero Power Factor (ZPF / Potier Triangle) method at lagging, unity, and leading power factors.",
      apparatus: [
        "3-Phase Synchronous Alternator coupled to DC Shunt Motor Prime Mover",
        "3-Phase Inductive ZPF Load Reactor Bank",
        "DC Excitation Power Supply & Rheostats (300 Ohm, 1.5A)",
        "AC Voltmeter (0-600V MI) & AC Ammeter (0-10A MI)",
        "DC Ammeter (0-3A MC for field excitation)",
        "Digital Tachometer (0-2000 RPM)"
      ],
      theory: "The Potier Triangle (ZPF) method separates the armature leakage reactance drop (IXL) from the armature reaction field MMF (If1). It is significantly more accurate than EMF and MMF methods because it takes magnetic saturation into account.\nPotier Triangle Construction:\n1. Plot OCC and ZPF curve on the same graph with common field current If on X-axis.\n2. From ZPF rated voltage point L, draw horizontal line LM equal to OL (the field current at short-circuit for rated current).\n3. From M, draw line parallel to the initial linear tangent of OCC (airgap line) to meet OCC at point P.\n4. Drop perpendicular from P onto LM meeting at Q. Triangle ΔPMN is the Potier Triangle.\n5. Vertical leg PQ represents the Potier leakage reactance drop (I * XL).\n6. Horizontal leg MQ represents field current If1 required to overcome armature reaction MMF.",
      equations: [
        "Potier Leakage Reactance Drop: PQ = I_rated * XL Volts, XL = PQ / I_rated Ohm",
        "Armature Reaction Field Current: MQ = If1 Amperes",
        "Internal Generated Voltage: E = sqrt( (V*cos(phi) + I*Ra)^2 + (V*sin(phi) +- I*XL)^2 ) (+ for lag, - for lead)",
        "From OCC, determine field current If2 corresponding to voltage E.",
        "Resultant Field Excitation: If = sqrt( If1^2 + If2^2 - 2*If1*If2*cos(90 +- phi) ) (+ for lag, - for lead)",
        "Read Open-Circuit Voltage E0 from OCC corresponding to resultant If.",
        "Percentage Voltage Regulation: % Reg = [(E0 - V) / V] * 100%"
      ],
      procedure: [
        "1. Run alternator at synchronous speed (1500 RPM). Obtain OCC by varying field current If from 0 to 0.8A, recording line voltage E0_line and phase voltage E0_ph.",
        "2. Connect pure inductive ZPF load bank. Adjust load and field current so that rated current (6.9A) flows at rated terminal voltage (415V). Record ZPF field current (If = 1.7A).",
        "3. Plot OCC and ZPF points. Construct Potier Triangle ΔPMN. Measure vertical leg PQ = I*XL and horizontal leg MQ = If1.",
        "4. Calculate internal voltage E for each power factor (0.0 to 1.0 lagging, UPF, 0.8 to 0.0 leading).",
        "5. Find If2 from OCC corresponding to E. Calculate resultant field current If and read corresponding E0 from OCC.",
        "6. Compute percentage voltage regulation for all power factor conditions."
      ],
      observationColumns: [
        { key: "pf_nature", label: "Nature of PF", unit: "" },
        { key: "pf", label: "PF", unit: "" },
        { key: "v_ph", label: "Rated Vph", unit: "V" },
        { key: "e_ph", label: "Voltage E", unit: "V" },
        { key: "if_res", label: "Resultant If", unit: "A" },
        { key: "e0_ph", label: "No-Load E0", unit: "V" },
        { key: "reg", label: "Regulation", unit: "%" }
      ],
      verifiedObservations: [
        { pf_nature: "lagging", pf: 0.0, v_ph: 239.6, e_ph: 307.40, if_res: 2.046, e0_ph: 315.0, reg: 31.40 },
        { pf_nature: "lagging", pf: 0.2, v_ph: 239.6, e_ph: 308.49, if_res: 2.036, e0_ph: 315.0, reg: 31.40 },
        { pf_nature: "lagging", pf: 0.4, v_ph: 239.6, e_ph: 307.32, if_res: 2.000, e0_ph: 315.0, reg: 31.40 },
        { pf_nature: "lagging", pf: 0.6, v_ph: 239.6, e_ph: 303.31, if_res: 1.940, e0_ph: 315.0, reg: 31.40 },
        { pf_nature: "lagging", pf: 0.8, v_ph: 239.6, e_ph: 294.70, if_res: 1.830, e0_ph: 315.0, reg: 31.40 },
        { pf_nature: "UPF", pf: 1.0, v_ph: 239.6, e_ph: 262.23, if_res: 1.470, e0_ph: 310.0, reg: 29.38 },
        { pf_nature: "leading", pf: 0.8, v_ph: 239.6, e_ph: 219.17, if_res: 0.970, e0_ph: 283.0, reg: 18.11 },
        { pf_nature: "leading", pf: 0.6, v_ph: 239.6, e_ph: 200.61, if_res: 0.740, e0_ph: 240.0, reg: 0.17 },
        { pf_nature: "leading", pf: 0.4, v_ph: 239.6, e_ph: 187.49, if_res: 0.560, e0_ph: 209.0, reg: -12.77 },
        { pf_nature: "leading", pf: 0.2, v_ph: 239.6, e_ph: 178.28, if_res: 0.430, e0_ph: 174.0, reg: -27.38 },
        { pf_nature: "leading", pf: 0.0, v_ph: 239.6, e_ph: 172.65, if_res: 0.386, e0_ph: 145.0, reg: -39.48 }
      ],
      graphs: [
        "OCC Curve with Potier Triangle ΔPMN Construction",
        "Zero Power Factor (ZPF) Saturation Curve",
        "Percentage Regulation vs Power Factor Curve (showing positive regulation for lagging PF and negative regulation for leading PF)"
      ]
    },
    {
      id: "exp8",
      number: "EXP 8",
      title: "Alternator on Infinite Bus Bar (V and Inverted V Curves)",
      machineType: "synchronous_alternator",
      ratings: {
        alternator: "3-Phase Synchronous Generator (415 V Star, 6.9 A rated, 1500 RPM, 50 Hz)",
        primeMover: "DC Shunt Motor (220 V, 19 A, 1500 RPM, 5 HP)",
        busBar: "3-Phase 415 V 50 Hz Infinite Grid Bus"
      },
      aim: "To synchronize the given 3-phase alternator with the infinite busbar using dark-lamp method, and to plot the V-curves (armature current vs field current) and inverted V-curves (power factor vs field current) at constant power output.",
      apparatus: [
        "3-Phase Synchronous Alternator coupled to DC Shunt Motor Prime Mover",
        "3-Phase Infinite Busbar Feed (415V, 50Hz)",
        "Synchronizing Switch (TPST)",
        "Three Synchronizing Lamp Sets (Dark Lamp Method)",
        "AC Voltmeter (0-600V MI) & AC Ammeter (0-10A MI)",
        "DC Ammeter (0-3A MC for alternator field)",
        "Two 3-Phase Wattmeters (500V, 5A, UPF/LPF, MF = 2)",
        "Digital Tachometer (0-2000 RPM)"
      ],
      theory: "Synchronization Conditions:\n1. Terminal voltage magnitude must equal busbar voltage (V_alt = V_bus = 415V).\n2. Frequency must equal busbar frequency (f_alt = f_bus = 50Hz).\n3. Phase sequence must match (verified when all 3 lamps brighten and darken simultaneously).\n4. Phase angle difference must be zero at the moment of switch closure (middle of dark period).\nV-Curves & Inverted V-Curves:\nOnce synchronized to infinite bus, machine speed is clamped at synchronous speed (1500 RPM). Constant prime mover throttle maintains constant active power P = sqrt(3)*VL*IL*cos(phi).\nVarying field current If alters generated EMF Ef and reactive power Q exchanged with grid:\n- Under-excitation (low If): Ef < Vbus, motor draws lagging current / alternator exports lagging VARs, power factor is low lagging.\n- Normal excitation: Ef balances Vbus, minimum armature current IL flows at Unity Power Factor (cos(phi) = 1.0).\n- Over-excitation (high If): Ef > Vbus, alternator exports reactive power, armature current rises with leading power factor.\nPlotting IL vs If produces 'V-Curve'. Plotting cos(phi) vs If produces 'Inverted V-Curve'.",
      equations: [
        "Total 3-Phase Power: W = Wattmeter reading * 3 * MF Watts = constant (200 * 2 * 3 = 1200 W)",
        "Power Factor: cos(phi) = W / (sqrt(3) * VL * IL)",
        "Reactive Power: Q = sqrt(3) * VL * IL * sin(phi) VAR",
        "Minimum Armature Current IL_min occurs at cos(phi) = 1.0 (Unity PF)"
      ],
      procedure: [
        "1. Make connections as shown in circuit diagram. Keep prime mover armature rheostat at max and field rheostat at min. Keep alternator field rheostat at max.",
        "2. Start DC prime mover using 3-point starter and adjust speed to exactly 1500 RPM.",
        "3. Energize alternator field and adjust If until alternator terminal voltage equals bus voltage (415V).",
        "4. Switch ON AC bus supply to synchronizing lamps. Observe lamp pulsations:",
        "   - If lamps flicker cyclically (one after another), phase sequence is wrong -> interchange two leads and restart.",
        "   - If all lamps brighten and darken simultaneously, phase sequence is correct!",
        "5. Adjust motor speed fine-trim until dark period is very long (> 5-10 seconds). In the middle of the dark period, CLOSE the TPST synchronizing switch.",
        "6. Adjust prime mover speed slightly until wattmeter reads one-third rated output (200W with MF=2). Maintain this constant power throughout.",
        "7. Decrease field current to minimum (under-excitation, If = 0.4-0.6A). Record VL, IL, If, Wattmeter, and calculate PF.",
        "8. Increase field current in regular steps up to 2.1A (over-excitation). Observe IL drop to minimum at UPF, then rise again with leading PF.",
        "9. Reduce field current, open TPST synchronizing switch, and shut down prime mover."
      ],
      observationColumns: [
        { key: "sno", label: "S.No", unit: "" },
        { key: "vl", label: "Line Voltage VL", unit: "V" },
        { key: "il", label: "Line Current IL", unit: "A" },
        { key: "if", label: "Field Current If", unit: "A" },
        { key: "w", label: "Wattmeter W", unit: "W" },
        { key: "pf", label: "Power Factor", unit: "" }
      ],
      verifiedObservations: [
        { sno: 1, vl: 415, il: 6.6, if: 0.40, w: 200, pf: 0.252 },
        { sno: 2, vl: 415, il: 5.8, if: 0.50, w: 200, pf: 0.287 },
        { sno: 3, vl: 415, il: 5.0, if: 0.60, w: 200, pf: 0.333 },
        { sno: 4, vl: 415, il: 4.2, if: 0.70, w: 200, pf: 0.397 },
        { sno: 5, vl: 415, il: 3.2, if: 0.80, w: 200, pf: 0.521 },
        { sno: 6, vl: 420, il: 2.6, if: 0.90, w: 200, pf: 0.634 },
        { sno: 7, vl: 420, il: 2.2, if: 1.00, w: 200, pf: 0.749 },
        { sno: 8, vl: 420, il: 2.0, if: 1.10, w: 200, pf: 0.824 },
        { sno: 9, vl: 420, il: 2.0, if: 1.20, w: 200, pf: 0.824 },
        { sno: 10, vl: 420, il: 2.3, if: 1.30, w: 200, pf: 0.717 },
        { sno: 11, vl: 420, il: 2.0, if: 1.40, w: 200, pf: 0.824 },
        { sno: 12, vl: 420, il: 3.1, if: 1.50, w: 200, pf: 0.532 },
        { sno: 13, vl: 420, il: 3.8, if: 1.60, w: 200, pf: 0.434 },
        { sno: 14, vl: 420, il: 4.4, if: 1.70, w: 200, pf: 0.374 },
        { sno: 15, vl: 420, il: 5.1, if: 1.80, w: 200, pf: 0.323 },
        { sno: 16, vl: 420, il: 5.7, if: 1.90, w: 200, pf: 0.289 },
        { sno: 17, vl: 420, il: 6.3, if: 2.00, w: 200, pf: 0.261 },
        { sno: 18, vl: 420, il: 6.9, if: 2.10, w: 200, pf: 0.239 }
      ],
      graphs: [
        "V-Curve (Armature Line Current IL vs Field Current If at constant output power)",
        "Inverted V-Curve (Power Factor cos(phi) vs Field Current If at constant output power)"
      ]
    }
  ];

  class ObservationLogger {
    constructor(expId, machineSnapshot) {
      this.expId = expId;
      this.machineSnapshot = machineSnapshot || {};
      this.observations = [];
      this.runId = 'RUN-' + Date.now();
    }

    record(reading) {
      const row = {
        index: this.observations.length + 1,
        time: new Date().toLocaleTimeString(),
        ...reading
      };
      this.observations.push(row);
      return row;
    }

    clear() {
      this.observations = [];
    }

    exportCSV() {
      if (this.observations.length === 0) return '';
      const headers = Object.keys(this.observations[0]);
      const csvRows = [headers.join(',')];
      for (const row of this.observations) {
        csvRows.push(headers.map(h => row[h]).join(','));
      }
      return csvRows.join('\n');
    }

    exportJSON() {
      return JSON.stringify({
        runId: this.runId,
        experimentId: this.expId,
        machineConfig: this.machineSnapshot,
        observations: this.observations
      }, null, 2);
    }
  }

  function validateWiring(expId, switches) {
    const errors = [];
    const warnings = [];

    if (!switches.mainBreaker) {
      errors.push('Main AC Circuit Breaker / Variac Switch is OPEN.');
    }

    if (expId === 'exp5' || expId === 'exp6_a' || expId === 'exp7' || expId === 'exp8') {
      if (!switches.primeMover) {
        errors.push('DC Prime Mover is NOT started. Alternator must be driven to rated 1500 RPM.');
      }
      if (!switches.fieldExciter) {
        errors.push('DC Field Excitation circuit is OPEN. Close field switch to establish rotor flux.');
      }
    }

    if (expId === 'exp6_b') {
      if (!switches.dcMotorCoupled) {
        errors.push('DC motor prime mover must be coupled and energized to drive induction machine super-synchronously.');
      }
      if (!switches.acGridConnected) {
        errors.push('3-Phase AC grid bus connection is disconnected.');
      }
    }

    if (expId === 'exp8') {
      if (!switches.phaseSequenceOk) {
        errors.push('CRITICAL: Phase sequence mismatch detected across lamps! Reverse two incoming lines before closing TPST switch.');
      }
      if (!switches.voltageMatched) {
        errors.push('Voltage difference between alternator and grid exceeds 5V tolerance. Adjust field excitation.');
      }
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  // Create dictionary map and aliases for client compatibility
  const EXPERIMENTS_MAP = {};
  EXPERIMENTS.forEach((exp, idx) => {
    exp.observation_table = exp.observationColumns || exp.observation_table || [];
    exp.benchmark_data = exp.verifiedObservations || exp.benchmark_data || [];
    exp.observationColumns = exp.observation_table;
    exp.verifiedObservations = exp.benchmark_data;
    EXPERIMENTS_MAP[exp.id] = exp;
    EXPERIMENTS_MAP[idx] = exp;
  });
  EXPERIMENTS_MAP.length = EXPERIMENTS.length;
  EXPERIMENTS_MAP[Symbol.iterator] = Array.prototype[Symbol.iterator].bind(EXPERIMENTS);
  EXPERIMENTS_MAP.find = Array.prototype.find.bind(EXPERIMENTS);
  EXPERIMENTS_MAP.map = Array.prototype.map.bind(EXPERIMENTS);
  EXPERIMENTS_MAP.forEach = Array.prototype.forEach.bind(EXPERIMENTS);
  EXPERIMENTS_MAP.filter = Array.prototype.filter.bind(EXPERIMENTS);

  return {
    EXPERIMENTS: EXPERIMENTS_MAP,
    EXPERIMENTS_LIST: EXPERIMENTS,
    getExperiment: (id) => EXPERIMENTS_MAP[id] || EXPERIMENTS_MAP['exp2'],
    ObservationLogger,
    validateWiring
  };
})();
