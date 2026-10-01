"""
Virtual Lab Experiment Framework.
SOLE SOURCE OF TRUTH: machineslabmaterials-sem-5
Contains ONLY the 7 verified Semester-5 electrical machine experiments:
1. EXP 2: No Load and Blocked Rotor Tests on 3-Phase Squirrel Cage Induction Motor
2. EXP 3: Speed Control of 3-Phase Induction Motor (Pole Changing, Stator Voltage, Rotor Resistance)
3. EXP 5: Load Test on Three-Phase Alternator
4. EXP 6-A: Regulation of Alternator by EMF and MMF Methods
5. EXP 6-B: Load Test on Induction Generator
6. EXP 7: Regulation of Alternator by ZPF (Potier Triangle) Method
7. EXP 8: Alternator on Infinite Bus Bar (V and Inverted V Curves)
"""

from typing import Dict, Any, List

EXPERIMENTS_REGISTRY: Dict[str, Dict[str, Any]] = {
    "exp2": {
        "id": "exp2",
        "number": "EXP 2",
        "title": "No Load and Blocked Rotor Tests on 3-Phase Squirrel Cage Induction Motor",
        "machine_type": "induction_motor",
        "ratings": {
            "voltage": 415.0,
            "current": 4.5,
            "power_kw": 2.2,
            "speed_rpm": 1440,
            "frequency_hz": 50.0,
            "phases": 3,
            "connection": "Delta",
            "insulation": "Class B"
        },
        "aim": (
            "1. To conduct no-load test and blocked rotor test on the given 3-phase cage induction motor and obtain equivalent circuit parameters.\n"
            "2. Using the equivalent circuit, calculate current, power factor, torque, output power, and efficiency at any given slip.\n"
            "3. Calculate the slip for maximum power and maximum torque.\n"
            "4. Draw the circle diagram of the 3-phase induction motor from test data."
        ),
        "apparatus": [
            "3-Phase Squirrel Cage Induction Motor (415V, 4.5A, 2.2kW, 1440 RPM)",
            "3-Phase Auto Transformer / Variac (0-470V, 15A)",
            "AC Voltmeter (0-600V MI)",
            "AC Ammeter (0-10A MI)",
            "Wattmeters (500V, 5/10A, LPF & UPF)",
            "Digital Tachometer (0-3000 RPM)",
            "DC Regulated Power Supply for Stator Resistance Measurement",
            "Mechanical Rotor Locking Clamp"
        ],
        "theory": (
            "No-load test gives no-load losses (core loss and friction/windage loss) and magnetizing branch parameters (Rc, Xm). "
            "Blocked rotor test gives equivalent series resistance R01 and leakage reactance X01 at slip s = 1.0."
        ),
        "equations": [
            r"\cos\phi_0 = \frac{W_0}{\sqrt{3} V_0 I_0}",
            r"I_w = I_0 \cos\phi_0, \quad I_m = I_0 \sin\phi_0",
            r"R_c = \frac{V_{0,\text{ph}}}{I_w}, \quad X_m = \frac{V_{0,\text{ph}}}{I_m}",
            r"R_{01} = \frac{W_{sc}}{3 I_{sc,\text{ph}}^2}, \quad Z_{01} = \frac{V_{sc,\text{ph}}}{I_{sc,\text{ph}}}",
            r"X_{01} = \sqrt{Z_{01}^2 - R_{01}^2}, \quad X_1 = X_2' = \frac{X_{01}}{2}",
            r"R_1 = 1.2 \times R_{dc}, \quad R_2' = R_{01} - R_1"
        ],
        "procedure_steps": [
            "1. NO-LOAD TEST: Set variac to 0V. Switch ON 3-phase 415V 50Hz supply. Increase variac to rated 415V.",
            "2. Record no-load voltage V0, no-load current I0, power W0, and speed N0.",
            "3. Reduce variac to zero and switch OFF supply.",
            "4. BLOCKED ROTOR TEST: Mechanically lock motor rotor using locking clamp.",
            "5. Apply low voltage and increase until line current reaches rated 4.7A. Quickly record Vsc, Isc, and Wsc.",
            "6. Turn variac to zero and switch OFF.",
            "7. Measure stator DC resistance Rdc using voltmeter-ammeter method and determine effective AC resistance R1 = 1.2 * Rdc."
        ],
        "observation_columns": [
            {"key": "test", "label": "Test Type", "unit": ""},
            {"key": "voltage", "label": "Voltage (V)", "unit": "V"},
            {"key": "current", "label": "Current (A)", "unit": "A"},
            {"key": "power", "label": "Power (W)", "unit": "W"},
            {"key": "speed", "label": "Speed (RPM)", "unit": "RPM"},
            {"key": "pf", "label": "Power Factor", "unit": ""}
        ],
        "verified_observations": [
            {"test": "No-Load Test (MF=4)", "voltage": 415.0, "current": 2.60, "power": 180.0, "speed": 1498, "pf": 0.096},
            {"test": "Blocked Rotor Test (MF=1)", "voltage": 114.0, "current": 4.70, "power": 260.0, "speed": 0, "pf": 0.280},
            {"test": "DC Stator Resistance (Mean)", "voltage": 20.0, "current": 2.50, "power": 50.0, "speed": 0, "pf": 1.0, "r_dc": 7.9007, "r_eff": 9.4808}
        ]
    },
    "exp3": {
        "id": "exp3",
        "number": "EXP 3",
        "title": "Speed Control of 3-Phase Induction Motor",
        "machine_type": "slip_ring_induction_motor",
        "ratings": {
            "voltage": 415.0,
            "current": 4.5,
            "frequency_hz": 50.0,
            "poles": [2, 4, 6],
            "rotor_type": "Slip-ring wound rotor"
        },
        "aim": (
            "1. To control the speed of the 3-phase induction motor by pole changing method (2, 4, 6 poles).\n"
            "2. To control speed by changing external rotor resistance and plot speed variation with rotor resistance.\n"
            "3. To control speed by varying stator input voltage at no-load and 25% full-load."
        ),
        "apparatus": [
            "3-Phase Slip Ring Induction Motor with Pole Changing Tappings",
            "3-Phase Auto Transformer / Variac (0-470V, 15A)",
            "3-Phase External Rotor Resistance Rheostat Bank (0-120 Ohm)",
            "AC Voltmeter (0-600V)",
            "AC Ammeter (0-10A)",
            "Digital Tachometer (0-3000 RPM)"
        ],
        "theory": (
            "Synchronous speed Ns = 120*f/P. Changing stator poles changes Ns.\n"
            "Rotor resistance control increases total rotor resistance R2 + R_ext, increasing slip for any given load torque and lowering speed.\n"
            "Stator voltage control varies developed torque with V^2; at reduced voltage, motor operates at higher slip to produce required load torque."
        ),
        "equations": [
            r"N_s = \frac{120 f}{P}",
            r"N = N_s (1 - s)",
            r"T \propto \frac{V^2 (R_2 + R_{\text{ext}})}{s}",
            r"s_{\text{max}} = \frac{R_2 + R_{\text{ext}}}{\sqrt{R_1^2 + (X_1 + X_2)^2}}"
        ],
        "procedure_steps": [
            "1. POLE CHANGING: Connect stator for 6-pole, apply 415V, record speed (998 RPM). Repeat for 4-pole (1499 RPM) and 2-pole (2999 RPM).",
            "2. STATOR VOLTAGE CONTROL: Apply 20% (83V), 40% (166V), 60% (249V), 80% (332V), 100% (415V). Record no-load speed. Apply 25% load and repeat.",
            "3. ROTOR RHEOSTAT CONTROL: Start with rotor rheostat at minimum. Increase resistance in steps (31.43Ω to 116.84Ω). Record speed (1296 to 507 RPM)."
        ],
        "observation_columns": [
            {"key": "method", "label": "Method / Step", "unit": ""},
            {"key": "voltage", "label": "Stator V", "unit": "V"},
            {"key": "poles", "label": "Poles", "unit": "P"},
            {"key": "r_ext", "label": "R_ext", "unit": "Ω"},
            {"key": "speed_noload", "label": "Speed No-Load", "unit": "RPM"},
            {"key": "speed_loaded", "label": "Speed 25% Load", "unit": "RPM"}
        ],
        "verified_observations": [
            {"method": "Pole Changing (6-Pole)", "voltage": 415, "poles": 6, "r_ext": 0, "speed_noload": 998, "speed_loaded": 960},
            {"method": "Pole Changing (4-Pole)", "voltage": 415, "poles": 4, "r_ext": 0, "speed_noload": 1499, "speed_loaded": 1440},
            {"method": "Pole Changing (2-Pole)", "voltage": 415, "poles": 2, "r_ext": 0, "speed_noload": 2999, "speed_loaded": 2880},
            {"method": "Voltage 20% (83V)", "voltage": 83, "poles": 4, "r_ext": 0, "speed_noload": 1470, "speed_loaded": 1320},
            {"method": "Voltage 40% (166V)", "voltage": 166, "poles": 4, "r_ext": 0, "speed_noload": 1486, "speed_loaded": 1365},
            {"method": "Voltage 60% (249V)", "voltage": 249, "poles": 4, "r_ext": 0, "speed_noload": 1491, "speed_loaded": 1400},
            {"method": "Voltage 80% (332V)", "voltage": 332, "poles": 4, "r_ext": 0, "speed_noload": 1493, "speed_loaded": 1447},
            {"method": "Voltage 100% (415V)", "voltage": 415, "poles": 4, "r_ext": 0, "speed_noload": 1494, "speed_loaded": 1465},
            {"method": "Rotor Rheostat R=31.43Ω", "voltage": 415, "poles": 4, "r_ext": 31.43, "speed_noload": 1494, "speed_loaded": 1296},
            {"method": "Rotor Rheostat R=41.05Ω", "voltage": 415, "poles": 4, "r_ext": 41.05, "speed_noload": 1494, "speed_loaded": 1135},
            {"method": "Rotor Rheostat R=60.00Ω", "voltage": 415, "poles": 4, "r_ext": 60.00, "speed_noload": 1494, "speed_loaded": 954},
            {"method": "Rotor Rheostat R=116.84Ω", "voltage": 415, "poles": 4, "r_ext": 116.84, "speed_noload": 1494, "speed_loaded": 507}
        ]
    },
    "exp5": {
        "id": "exp5",
        "number": "EXP 5",
        "title": "Load Test on Three-Phase Alternator",
        "machine_type": "synchronous_alternator",
        "ratings": {
            "alternator": "3.5 kVA, 415 V Star, 4.8 A rated, 1500 RPM, 50 Hz",
            "prime_mover": "DC Shunt Motor (220 V, 19 A, 1500 RPM, 5 HP / 3.68 kW)",
            "excitation": "0-220 V DC Variable Field Supply, If = 0-2.0 A"
        },
        "aim": "To conduct load test on a 3-phase alternator and determine its percentage voltage regulation and efficiency characteristics under varying electrical load current.",
        "apparatus": [
            "3-Phase Synchronous Alternator coupled to DC Shunt Motor Prime Mover",
            "3-Phase Balanced Resistive Lamp Load Bank (0-10A)",
            "DC Motor 3-Point Starter",
            "Field Rheostats (300 Ohm, 1.5A)",
            "AC Voltmeter (0-600V)",
            "AC Ammeter (0-10A)",
            "DC Field Ammeter (0-2A)",
            "Digital Tachometer (0-2000 RPM)"
        ],
        "theory": (
            "When load is drawn from an alternator, terminal voltage Vt drops due to armature resistance drop Ia*Ra, "
            "leakage reactance drop Ia*Xl, and armature reaction drop. "
            "Percentage Voltage Regulation = [(E0 - Vt) / E0] * 100%."
        ),
        "equations": [
            r"P_0 = \sqrt{3} V_t I_L \cos\phi \text{ Watts}",
            r"\% \text{Reg} = \frac{E_0 - V_t}{E_0} \times 100\%",
            r"N_s = \frac{120 f}{P} = 1500 \text{ RPM}"
        ],
        "procedure_steps": [
            "1. Start DC prime mover using 3-point starter and adjust speed to rated 1500 RPM.",
            "2. Switch ON DC excitation and adjust field rheostat until terminal voltage reaches rated no-load E0 = 415V.",
            "3. Switch on balanced 3-phase load bank in steps (IL = 1.0A to 6.8A).",
            "4. At each step, maintain speed at 1500 RPM, record If, Vt, IL, and calculate Output Power and % Regulation."
        ],
        "observation_columns": [
            {"key": "sno", "label": "S.No", "unit": ""},
            {"key": "if", "label": "Field Current If", "unit": "A"},
            {"key": "vt", "label": "Line Voltage Vt", "unit": "V"},
            {"key": "il", "label": "Load Current IL", "unit": "A"},
            {"key": "p0", "label": "Output Power P0", "unit": "W"},
            {"key": "reg", "label": "Voltage Regulation", "unit": "%"}
        ],
        "verified_observations": [
            {"sno": 1, "if": 1.10, "vt": 415, "il": 0.0, "p0": 0.0, "reg": 0.0},
            {"sno": 2, "if": 1.10, "vt": 410, "il": 1.0, "p0": 710.14, "reg": 1.20},
            {"sno": 3, "if": 1.06, "vt": 400, "il": 2.0, "p0": 1385.64, "reg": 3.61},
            {"sno": 4, "if": 1.05, "vt": 390, "il": 2.8, "p0": 1891.40, "reg": 6.02},
            {"sno": 5, "if": 1.05, "vt": 375, "il": 3.4, "p0": 2208.36, "reg": 9.64},
            {"sno": 6, "if": 1.05, "vt": 360, "il": 4.2, "p0": 2618.86, "reg": 13.25},
            {"sno": 7, "if": 1.05, "vt": 350, "il": 4.3, "p0": 2606.73, "reg": 15.66},
            {"sno": 8, "if": 1.04, "vt": 340, "il": 4.8, "p0": 2826.70, "reg": 18.07},
            {"sno": 9, "if": 1.04, "vt": 325, "il": 5.3, "p0": 2983.46, "reg": 21.68},
            {"sno": 10, "if": 1.04, "vt": 310, "il": 5.8, "p0": 3114.23, "reg": 25.30},
            {"sno": 11, "if": 1.04, "vt": 290, "il": 6.3, "p0": 3164.45, "reg": 30.12},
            {"sno": 12, "if": 1.04, "vt": 270, "il": 6.8, "p0": 3180.04, "reg": 34.94}
        ]
    },
    "exp6_a": {
        "id": "exp6_a",
        "number": "EXP 6-A",
        "title": "Regulation of Alternator by EMF and MMF Methods",
        "machine_type": "synchronous_alternator",
        "ratings": {
            "alternator": "415 V Star, 4.3 A rated, 1500 RPM, 50 Hz, Ra = 2.415 Ohm/ph",
            "prime_mover": "DC Shunt Motor (220 V, 19 A, 1500 RPM, 5 HP)"
        },
        "aim": "To predetermine the voltage regulation of a 3-phase alternator for various power factors using EMF and MMF methods by obtaining OCC and SCC curves.",
        "apparatus": [
            "3-Phase Alternator with DC Prime Mover",
            "DC Power Supply & 3-Point Starter",
            "Field Rheostats (300 Ohm, 1.5A)",
            "AC Voltmeter (0-600V MI)",
            "AC Ammeter (0-10A MI)",
            "DC Ammeters (0-2A MC)",
            "Digital Tachometer (0-2000 RPM)"
        ],
        "theory": (
            "EMF Method: Assumes linear magnetic circuit. Replaces armature reaction by fictitious reactance drop Ia*Xa. "
            "Zs = E0_ph / Isc_ph. Predicts pessimistic (higher) regulation.\n"
            "MMF Method: Combines field ampere-turns vectorially. If = sqrt(If1^2 + If2^2 - 2*If1*If2*cos(90 +- phi)). "
            "Predicts optimistic (lower) regulation."
        ),
        "equations": [
            r"R_a = 1.2 \times R_{dc} = 2.415\ \Omega/\text{phase}",
            r"Z_s = \left.\frac{E_{0,\text{ph}}}{I_{sc,\text{ph}}}\right|_{I_f = \text{const}}, \quad X_s = \sqrt{Z_s^2 - R_a^2}",
            r"E_0 = \sqrt{(V\cos\phi + I R_a)^2 + (V\sin\phi \pm I X_s)^2}",
            r"I_f = \sqrt{I_{f1}^2 + I_{f2}^2 - 2 I_{f1} I_{f2} \cos(90^\circ \pm \phi)}",
            r"\% \text{Reg} = \frac{E_0 - V}{V} \times 100\%"
        ],
        "procedure_steps": [
            "1. OCC TEST: Drive alternator at 1500 RPM with stator open. Vary field current If from 0 to 1.09A, recording line and phase voltages.",
            "2. SCC TEST: Short stator terminals through ammeter. Slowly increase If until rated 4.3A flows (Ifsc = 0.35A).",
            "3. Measure DC armature resistance and compute effective AC resistance Ra = 1.2 * Rdc = 2.415 Ohm/phase.",
            "4. Compute Zs, Xs, E0 and % Reg for EMF method; perform vector summation of If1 and If2 for MMF method."
        ],
        "observation_columns": [
            {"key": "if", "label": "Field Current If", "unit": "A"},
            {"key": "e0_line", "label": "OCC Line E0", "unit": "V"},
            {"key": "e0_ph", "label": "OCC Phase E0", "unit": "V"},
            {"key": "isc", "label": "SCC Current Isc", "unit": "A"}
        ],
        "verified_observations": [
            {"if": 0.00, "e0_line": 28.0, "e0_ph": 16.16, "isc": 0.0},
            {"if": 0.25, "e0_line": 152.5, "e0_ph": 87.75, "isc": 3.07},
            {"if": 0.29, "e0_line": 170.5, "e0_ph": 98.43, "isc": 3.56},
            {"if": 0.31, "e0_line": 190.4, "e0_ph": 109.92, "isc": 3.81},
            {"if": 0.35, "e0_line": 210.0, "e0_ph": 121.24, "isc": 4.30},
            {"if": 0.40, "e0_line": 230.0, "e0_ph": 132.80, "isc": 4.91},
            {"if": 0.43, "e0_line": 257.0, "e0_ph": 148.40, "isc": 5.28},
            {"if": 0.45, "e0_line": 270.0, "e0_ph": 155.80, "isc": 5.53},
            {"if": 0.50, "e0_line": 290.0, "e0_ph": 167.40, "isc": 6.14},
            {"if": 0.55, "e0_line": 310.0, "e0_ph": 178.90, "isc": 6.75},
            {"if": 0.62, "e0_line": 330.0, "e0_ph": 190.50, "isc": 7.61},
            {"if": 0.70, "e0_line": 350.0, "e0_ph": 202.10, "isc": 8.60},
            {"if": 0.79, "e0_line": 370.0, "e0_ph": 213.60, "isc": 9.70},
            {"if": 0.90, "e0_line": 390.0, "e0_ph": 225.20, "isc": 11.05},
            {"if": 1.00, "e0_line": 400.0, "e0_ph": 230.90, "isc": 12.28},
            {"if": 1.09, "e0_line": 410.0, "e0_ph": 236.70, "isc": 13.39}
        ]
    },
    "exp6_b": {
        "id": "exp6_b",
        "number": "EXP 6-B",
        "title": "Load Test on Induction Generator",
        "machine_type": "induction_generator",
        "ratings": {
            "ac_machine": "3-Phase Induction Machine (415 V, 4.5 A, 1440 RPM, 2.2 kW, 50 Hz, Class B)",
            "dc_machine": "DC Shunt Prime Mover (220 V, 19 A, 1500 RPM, 5 HP / 3.68 kW)"
        },
        "aim": "To operate a 3-phase induction machine in super-synchronous generator mode (N > Ns, s < 0) driven by prime mover, and determine its output power, efficiency, and power factor.",
        "apparatus": [
            "3-Phase Induction Machine coupled with DC Shunt Motor",
            "3-Phase AC Mains Supply with Auto Transformer / Variac",
            "220V DC Supply with DPST switch",
            "DC Motor Field Rheostat (300 Ohm, 1.5A)",
            "Two 3-Phase Wattmeters (500V, 10A, LPF/UPF, MF = 2)",
            "AC Voltmeter (0-600V MI) & AC Ammeter (0-10A MI)",
            "DC Voltmeter (0-300V MC) & DC Ammeter (0-20A MC)",
            "Digital Tachometer (0-2000 RPM)"
        ],
        "theory": (
            "When driven above synchronous speed (N > Ns = 1500 RPM), rotor slip s = (Ns - N)/Ns becomes negative. "
            "Mechanical shaft energy is converted into active electrical power exported to the AC grid. "
            "The induction generator draws reactive VARs from the grid for excitation."
        ),
        "equations": [
            r"s = \frac{N_s - N}{N_s} \times 100\% < 0",
            r"P_{dc} = V_{dc} \times I_{dc} \text{ W}",
            r"P_{\text{mech,in}} = 0.85 \times P_{dc} \text{ W}",
            r"P_{\text{ac,out}} = (W_1 + W_2) \times MF \text{ W}",
            r"\text{pf} = \frac{P_{\text{ac,out}}}{\sqrt{3} V_{ac} I_{ac}}",
            r"\eta = \frac{P_{\text{ac,out}}}{P_{\text{mech,in}}} \times 100\%"
        ],
        "procedure_steps": [
            "1. Start induction machine as motor on 415V AC mains. Rotate coupled DC machine.",
            "2. Match DC machine generated voltage with DC supply and close DPST switch.",
            "3. Adjust DC field excitation so wattmeter reads ZERO (synchronous benchmark Ns = 1494-1500 RPM).",
            "4. Weaken DC motor field to increase speed above 1500 RPM (1503.6 to 1528.8 RPM).",
            "5. Record Vac, Iac, Pac_out, Vdc, Idc, and Speed at each step. Calculate negative slip, power factor, and efficiency."
        ],
        "observation_columns": [
            {"key": "sno", "label": "S.No", "unit": ""},
            {"key": "vac", "label": "AC Voltage Vac", "unit": "V"},
            {"key": "iac", "label": "AC Current Iac", "unit": "A"},
            {"key": "pac_out", "label": "AC Power Output", "unit": "W"},
            {"key": "vdc", "label": "DC Voltage Vdc", "unit": "V"},
            {"key": "idc", "label": "DC Current Idc", "unit": "A"},
            {"key": "speed", "label": "Speed N", "unit": "RPM"},
            {"key": "slip", "label": "Slip s", "unit": "%"},
            {"key": "pf", "label": "Power Factor", "unit": ""},
            {"key": "eff", "label": "Efficiency", "unit": "%"}
        ],
        "verified_observations": [
            {"sno": 1, "vac": 415, "iac": 3.95, "pac_out": 200, "vdc": 220, "idc": 3.5, "speed": 1503.6, "slip": -0.64, "pf": 0.070, "eff": 30.5},
            {"sno": 2, "vac": 415, "iac": 3.95, "pac_out": 280, "vdc": 216, "idc": 4.5, "speed": 1505.5, "slip": -0.77, "pf": 0.099, "eff": 33.9},
            {"sno": 3, "vac": 415, "iac": 4.10, "pac_out": 560, "vdc": 216, "idc": 5.0, "speed": 1507.0, "slip": -0.87, "pf": 0.190, "eff": 61.0},
            {"sno": 4, "vac": 415, "iac": 4.20, "pac_out": 720, "vdc": 215, "idc": 6.0, "speed": 1509.6, "slip": -1.04, "pf": 0.239, "eff": 65.6},
            {"sno": 5, "vac": 415, "iac": 4.40, "pac_out": 890, "vdc": 215, "idc": 7.0, "speed": 1512.0, "slip": -1.20, "pf": 0.282, "eff": 69.6},
            {"sno": 6, "vac": 415, "iac": 4.50, "pac_out": 1080, "vdc": 214, "idc": 8.0, "speed": 1514.4, "slip": -1.36, "pf": 0.334, "eff": 74.2},
            {"sno": 7, "vac": 415, "iac": 4.65, "pac_out": 1220, "vdc": 210, "idc": 9.0, "speed": 1516.2, "slip": -1.49, "pf": 0.365, "eff": 76.0},
            {"sno": 8, "vac": 415, "iac": 4.80, "pac_out": 1400, "vdc": 210, "idc": 10.0, "speed": 1517.0, "slip": -1.54, "pf": 0.406, "eff": 78.4},
            {"sno": 9, "vac": 415, "iac": 4.90, "pac_out": 1560, "vdc": 210, "idc": 11.0, "speed": 1521.0, "slip": -1.81, "pf": 0.443, "eff": 79.5},
            {"sno": 10, "vac": 415, "iac": 5.00, "pac_out": 1740, "vdc": 210, "idc": 12.0, "speed": 1524.0, "slip": -2.01, "pf": 0.484, "eff": 81.2},
            {"sno": 11, "vac": 415, "iac": 5.10, "pac_out": 2000, "vdc": 208, "idc": 13.0, "speed": 1527.8, "slip": -2.26, "pf": 0.545, "eff": 87.0},
            {"sno": 12, "vac": 415, "iac": 5.30, "pac_out": 2080, "vdc": 208, "idc": 14.0, "speed": 1528.8, "slip": -2.33, "pf": 0.546, "eff": 84.1}
        ]
    },
    "exp7": {
        "id": "exp7",
        "number": "EXP 7",
        "title": "Regulation of Alternator by ZPF (Potier Triangle) Method",
        "machine_type": "synchronous_alternator",
        "ratings": {
            "alternator": "415 V Star, 6.9 A rated, 1500 RPM, 50 Hz, Ra = 2.0 Ohm/phase",
            "prime_mover": "DC Shunt Motor (220 V, 19 A, 1500 RPM, 5 HP)",
            "zpf_load": "3-Phase Inductive Reactor Load Bank"
        },
        "aim": "To predetermine the voltage regulation of a 3-phase alternator using the Zero Power Factor (ZPF / Potier Triangle) method at lagging, unity, and leading power factors.",
        "apparatus": [
            "3-Phase Synchronous Alternator coupled to DC Prime Mover",
            "3-Phase Inductive ZPF Load Reactor Bank",
            "DC Excitation Power Supply & Rheostats (300 Ohm, 1.5A)",
            "AC Voltmeter (0-600V MI) & AC Ammeter (0-10A MI)",
            "DC Field Ammeter (0-3A MC)",
            "Digital Tachometer (0-2000 RPM)"
        ],
        "theory": (
            "The Potier Triangle separates leakage reactance drop (PQ = I*XL) from armature reaction field MMF (MQ = If1). "
            "It gives accurate regulation by accounting for magnetic circuit saturation."
        ),
        "equations": [
            r"PQ = I_{\text{rated}} \times X_L, \quad X_L = \frac{PQ}{I_{\text{rated}}}",
            r"MQ = I_{f1} \quad (\text{Armature Reaction MMF})",
            r"E = \sqrt{(V\cos\phi + I R_a)^2 + (V\sin\phi \pm I X_L)^2}",
            r"I_f = \sqrt{I_{f1}^2 + I_{f2}^2 - 2 I_{f1} I_{f2} \cos(90^\circ \pm \phi)}",
            r"\% \text{Reg} = \frac{E_0 - V}{V} \times 100\%"
        ],
        "procedure_steps": [
            "1. Plot OCC curve at 1500 RPM.",
            "2. Connect pure inductive ZPF load. Adjust load and field to draw rated current (6.9A) at rated voltage (415V). Record ZPF field current (If = 1.7A).",
            "3. Construct Potier Triangle ΔPMN. Measure vertical leg PQ = I*XL and horizontal leg MQ = If1.",
            "4. Calculate internal voltage E for each power factor, find If2 from OCC, compute resultant field excitation If, read E0 from OCC, and calculate % Reg."
        ],
        "observation_columns": [
            {"key": "pf_nature", "label": "Nature of PF", "unit": ""},
            {"key": "pf", "label": "PF", "unit": ""},
            {"key": "v_ph", "label": "Rated Vph", "unit": "V"},
            {"key": "e_ph", "label": "Voltage E", "unit": "V"},
            {"key": "if_res", "label": "Resultant If", "unit": "A"},
            {"key": "e0_ph", "label": "No-Load E0", "unit": "V"},
            {"key": "reg", "label": "Regulation", "unit": "%"}
        ],
        "verified_observations": [
            {"pf_nature": "lagging", "pf": 0.0, "v_ph": 239.6, "e_ph": 307.40, "if_res": 2.046, "e0_ph": 315.0, "reg": 31.40},
            {"pf_nature": "lagging", "pf": 0.2, "v_ph": 239.6, "e_ph": 308.49, "if_res": 2.036, "e0_ph": 315.0, "reg": 31.40},
            {"pf_nature": "lagging", "pf": 0.4, "v_ph": 239.6, "e_ph": 307.32, "if_res": 2.000, "e0_ph": 315.0, "reg": 31.40},
            {"pf_nature": "lagging", "pf": 0.6, "v_ph": 239.6, "e_ph": 303.31, "if_res": 1.940, "e0_ph": 315.0, "reg": 31.40},
            {"pf_nature": "lagging", "pf": 0.8, "v_ph": 239.6, "e_ph": 294.70, "if_res": 1.830, "e0_ph": 315.0, "reg": 31.40},
            {"pf_nature": "UPF", "pf": 1.0, "v_ph": 239.6, "e_ph": 262.23, "if_res": 1.470, "e0_ph": 310.0, "reg": 29.38},
            {"pf_nature": "leading", "pf": 0.8, "v_ph": 239.6, "e_ph": 219.17, "if_res": 0.970, "e0_ph": 283.0, "reg": 18.11},
            {"pf_nature": "leading", "pf": 0.6, "v_ph": 239.6, "e_ph": 200.61, "if_res": 0.740, "e0_ph": 240.0, "reg": 0.17},
            {"pf_nature": "leading", "pf": 0.4, "v_ph": 239.6, "e_ph": 187.49, "if_res": 0.560, "e0_ph": 209.0, "reg": -12.77},
            {"pf_nature": "leading", "pf": 0.2, "v_ph": 239.6, "e_ph": 178.28, "if_res": 0.430, "e0_ph": 174.0, "reg": -27.38},
            {"pf_nature": "leading", "pf": 0.0, "v_ph": 239.6, "e_ph": 172.65, "if_res": 0.386, "e0_ph": 145.0, "reg": -39.48}
        ]
    },
    "exp8": {
        "id": "exp8",
        "number": "EXP 8",
        "title": "Alternator on Infinite Bus Bar (V and Inverted V Curves)",
        "machine_type": "synchronous_alternator",
        "ratings": {
            "alternator": "415 V Star, 6.9 A rated, 1500 RPM, 50 Hz",
            "prime_mover": "DC Shunt Motor (220 V, 19 A, 1500 RPM, 5 HP)",
            "infinite_bus": "3-Phase 415 V 50 Hz Grid Bus"
        },
        "aim": "To synchronize the given 3-phase alternator with the infinite busbar using dark-lamp method, and to plot the V-curves and inverted V-curves at constant power output.",
        "apparatus": [
            "3-Phase Alternator coupled to DC Prime Mover",
            "3-Phase Infinite Busbar (415V, 50Hz)",
            "Synchronizing Switch (TPST)",
            "Three Synchronizing Lamp Sets (Dark Lamp Method)",
            "AC Voltmeter (0-600V MI) & AC Ammeter (0-10A MI)",
            "DC Field Ammeter (0-3A MC)",
            "Two 3-Phase Wattmeters (500V, 5A, UPF/LPF, MF = 2)",
            "Digital Tachometer (0-2000 RPM)"
        ],
        "theory": (
            "Synchronization requires matching voltage, frequency, phase sequence, and zero phase difference. "
            "Once synchronized to infinite bus, machine speed is clamped at synchronous speed (1500 RPM). "
            "Varying field current If alters reactive power Q and power factor while active power P remains constant. "
            "Minimum line current occurs at unity power factor."
        ),
        "equations": [
            r"W = \text{Wattmeter} \times 3 \times MF \text{ Watts} = \text{constant}",
            r"\text{pf} = \frac{W}{\sqrt{3} V_L I_L}",
            r"Q = \sqrt{3} V_L I_L \sin\phi \text{ VAR}",
            r"I_{L,\text{min}} \text{ occurs at } \cos\phi = 1.0"
        ],
        "procedure_steps": [
            "1. Start DC prime mover and adjust speed to exactly 1500 RPM.",
            "2. Energize field until alternator terminal voltage equals bus voltage (415V).",
            "3. Verify phase sequence with synchronizing lamps (all 3 lamps brighten and darken together).",
            "4. When dark period is slow, close TPST switch in middle of dark period.",
            "5. Adjust DC throttle until wattmeter reads one-third rated output (200W, MF=2). Maintain constant power.",
            "6. Vary field current If from 0.4A to 2.1A. Record VL, IL, If, Wattmeter, and calculate power factor."
        ],
        "observation_columns": [
            {"key": "sno", "label": "S.No", "unit": ""},
            {"key": "vl", "label": "Line Voltage VL", "unit": "V"},
            {"key": "il", "label": "Line Current IL", "unit": "A"},
            {"key": "if", "label": "Field Current If", "unit": "A"},
            {"key": "w", "label": "Wattmeter W", "unit": "W"},
            {"key": "pf", "label": "Power Factor", "unit": ""}
        ],
        "verified_observations": [
            {"sno": 1, "vl": 415, "il": 6.6, "if": 0.40, "w": 200, "pf": 0.252},
            {"sno": 2, "vl": 415, "il": 5.8, "if": 0.50, "w": 200, "pf": 0.287},
            {"sno": 3, "vl": 415, "il": 5.0, "if": 0.60, "w": 200, "pf": 0.333},
            {"sno": 4, "vl": 415, "il": 4.2, "if": 0.70, "w": 200, "pf": 0.397},
            {"sno": 5, "vl": 415, "il": 3.2, "if": 0.80, "w": 200, "pf": 0.521},
            {"sno": 6, "vl": 420, "il": 2.6, "if": 0.90, "w": 200, "pf": 0.634},
            {"sno": 7, "vl": 420, "il": 2.2, "if": 1.00, "w": 200, "pf": 0.749},
            {"sno": 8, "vl": 420, "il": 2.0, "if": 1.10, "w": 200, "pf": 0.824},
            {"sno": 9, "vl": 420, "il": 2.0, "if": 1.20, "w": 200, "pf": 0.824},
            {"sno": 10, "vl": 420, "il": 2.3, "if": 1.30, "w": 200, "pf": 0.717},
            {"sno": 11, "vl": 420, "il": 2.0, "if": 1.40, "w": 200, "pf": 0.824},
            {"sno": 12, "vl": 420, "il": 3.1, "if": 1.50, "w": 200, "pf": 0.532},
            {"sno": 13, "vl": 420, "il": 3.8, "if": 1.60, "w": 200, "pf": 0.434},
            {"sno": 14, "vl": 420, "il": 4.4, "if": 1.70, "w": 200, "pf": 0.374},
            {"sno": 15, "vl": 420, "il": 5.1, "if": 1.80, "w": 200, "pf": 0.323},
            {"sno": 16, "vl": 420, "il": 5.7, "if": 1.90, "w": 200, "pf": 0.289},
            {"sno": 17, "vl": 420, "il": 6.3, "if": 2.00, "w": 200, "pf": 0.261},
            {"sno": 18, "vl": 420, "il": 6.9, "if": 2.10, "w": 200, "pf": 0.239}
        ]
    }
}

class ExperimentEngine:
    def __init__(self):
        self.experiments = EXPERIMENTS_REGISTRY

    def get_all_experiments(self) -> List[Dict[str, Any]]:
        return list(self.experiments.values())

    def get_experiment(self, exp_id: str) -> Dict[str, Any]:
        return self.experiments.get(exp_id, {})

EXPERIMENTS = EXPERIMENTS_REGISTRY

def get_experiment(exp_id: str) -> Dict[str, Any]:
    return EXPERIMENTS_REGISTRY.get(exp_id, {})

def list_experiments() -> List[Dict[str, Any]]:
    return list(EXPERIMENTS_REGISTRY.values())

