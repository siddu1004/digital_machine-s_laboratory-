"""
Virtual Lab Experiment Framework.
Contains 12 comprehensive electrical machine experiments with aim, apparatus,
theoretical principles, wiring setup rules, step-by-step procedures,
observation schemas, and analysis formulas.
"""

from typing import Dict, Any, List

EXPERIMENTS_REGISTRY: Dict[str, Dict[str, Any]] = {
    "exp_im_load_test": {
        "id": "exp_im_load_test",
        "title": "Brake Load Test on 3-Phase Squirrel-Cage Induction Motor",
        "machine_type": "induction_motor",
        "aim": "To conduct load test on a 3-phase squirrel cage induction motor and determine its performance characteristics (efficiency, power factor, torque, slip, and speed vs output power).",
        "apparatus": [
            "3-Phase Squirrel Cage Induction Motor (415V, 5HP, 1440 RPM)",
            "3-Phase 415V, 50Hz AC Power Supply with 3-pole MCB",
            "3-Phase Variac / Auto-transformer (0-470V, 15A)",
            "Digital Multimeter (0-600V AC RMS)",
            "Digital Ammeter (0-15A AC RMS)",
            "3-Phase Power Meter (or Two-Wattmeter System: 500V, 10A, UPF/LPF)",
            "Digital Non-contact Tachometer (0-2000 RPM)",
            "Mechanical Brake Drum with Spring Balance Dynamometer (S1, S2 in kg)"
        ],
        "theory": (
            "The direct load test is performed by applying mechanical brake torque to the motor pulley. "
            "As the mechanical shaft load increases, the motor slows down slightly (speed drops), which increases the slip s = (Ns - N)/Ns. "
            "The increased slip induces higher rotor EMF and higher rotor current at rotor frequency fr = s*f. "
            "To balance this, stator draws higher line current from the mains. "
            "Electromagnetic torque T_dev = P_ag / omega_s balances shaft load torque T_shaft + rotational losses. "
            "Shaft output power is P_out = 2*pi*N*T / 60. Efficiency is eta = (P_out / P_in) * 100%."
        ),
        "equations": [
            r"N_s = \frac{120 \times f}{P} \text{ RPM}",
            r"s = \frac{N_s - N}{N_s}",
            r"T_{\text{shaft}} = (S_1 - S_2) \times 9.81 \times R_{\text{drum}} \text{ N}\cdot\text{m}",
            r"P_{\text{out}} = \frac{2 \pi N T}{60} \text{ W}",
            r"P_{\text{in}} = \sqrt{3} V_L I_L \cos\phi \text{ W}",
            r"\eta = \frac{P_{\text{out}}}{P_{\text{in}}} \times 100\%"
        ],
        "procedure_steps": [
            "Step 1: Check mechanical brake drum; ensure belt is loose and drum turns freely without initial friction.",
            "Step 2: Connect the motor terminals (U1, V1, W1) through 3-phase power meter and ammeter to the 3-phase AC supply.",
            "Step 3: Switch ON the 3-phase main circuit breaker. Bring supply voltage to rated 415V using the variac.",
            "Step 4: Start the motor under NO-LOAD condition. Record no-load speed (N0), line current (I0), and no-load power (P0).",
            "Step 5: Gradually tighten the brake belt in progressive steps. At each load step, record: Line Voltage (V), Line Current (I), Input Power (W1, W2 or Pin), Spring balances (S1, S2), and Rotor Speed (N).",
            "Step 6: Maintain cooling water flow in brake drum pulley if testing high load steps to avoid overheating.",
            "Step 7: Do not exceed the motor's rated current (7.5A). After recording full load data, gradually loosen the brake belt.",
            "Step 8: Turn OFF the supply breaker and inspect all readings."
        ],
        "observation_columns": [
            {"key": "v_line", "label": "V_line", "unit": "V"},
            {"key": "i_line", "label": "I_line", "unit": "A"},
            {"key": "p_in", "label": "P_in", "unit": "W"},
            {"key": "speed", "label": "Speed (N)", "unit": "RPM"},
            {"key": "s1", "label": "Spring S1", "unit": "kg"},
            {"key": "s2", "label": "Spring S2", "unit": "kg"},
            {"key": "torque", "label": "Torque (T)", "unit": "Nm"},
            {"key": "p_out", "label": "P_out", "unit": "W"},
            {"key": "efficiency", "label": "Efficiency (η)", "unit": "%"},
            {"key": "slip", "label": "Slip (s)", "unit": "pu"},
            {"key": "pf", "label": "Power Factor", "unit": ""}
        ],
        "viva_topics": [
            "Why does slip increase when load is applied?",
            "What constitutes the no-load losses in an induction motor?",
            "Why is the power factor very low at no load (around 0.1 to 0.2)?",
            "What is the physical meaning of air-gap power P_ag?"
        ]
    },
    "exp_im_no_load": {
        "id": "exp_im_no_load",
        "title": "No-Load (Open Shaft) Test on 3-Phase Induction Motor",
        "machine_type": "induction_motor",
        "aim": "To perform no-load test on a 3-phase induction motor to determine no-load losses (core loss and friction/windage loss) and magnetizing branch parameters (Rc and Xm).",
        "apparatus": ["3-Phase Induction Motor", "3-Phase Variac", "Ammeter", "Voltmeter", "Two LPF Wattmeters", "Tachometer"],
        "theory": "At no load, slip is negligible (s ~ 0.001), hence the rotor branch impedance R2'/s approaches infinity and draws negligible current. The input current consists almost entirely of core loss current Ic and magnetizing current Im.",
        "procedure_steps": [
            "Connect motor with no mechanical load coupled to shaft.",
            "Apply rated 415V line voltage at 50Hz.",
            "Record V0, I0, W0, and N0."
        ],
        "observation_columns": [
            {"key": "v_line", "label": "V0", "unit": "V"},
            {"key": "i_line", "label": "I0", "unit": "A"},
            {"key": "p_in", "label": "W0", "unit": "W"},
            {"key": "speed", "label": "N0", "unit": "RPM"}
        ]
    },
    "exp_im_blocked_rotor": {
        "id": "exp_im_blocked_rotor",
        "title": "Blocked Rotor (Short Circuit) Test on 3-Phase Induction Motor",
        "machine_type": "induction_motor",
        "aim": "To determine equivalent series resistance (R01), leakage reactance (X01), and full-load copper losses by mechanically locking the rotor (s = 1.0).",
        "apparatus": ["3-Phase Induction Motor with Rotor Locking Clamp", "3-Phase Variac", "Ammeter", "Voltmeter", "Wattmeters"],
        "theory": "With rotor locked, s = 1. A reduced voltage is applied to circulate rated stator current. Core loss is negligible because applied voltage is small.",
        "procedure_steps": [
            "Clamp rotor securely so it cannot rotate.",
            "Starting from 0V, gradually increase variac voltage until line current reaches rated current (7.5A).",
            "Quickly record V_sc, I_sc, and P_sc to prevent winding overheating."
        ],
        "observation_columns": [
            {"key": "v_line", "label": "V_sc", "unit": "V"},
            {"key": "i_line", "label": "I_sc", "unit": "A"},
            {"key": "p_in", "label": "P_sc", "unit": "W"}
        ]
    },
    "exp_alt_load_test": {
        "id": "exp_alt_load_test",
        "title": "Load Test & Voltage Regulation of 3-Phase Alternator",
        "machine_type": "synchronous_alternator",
        "aim": "To determine the load characteristics and percentage voltage regulation of a 3-phase alternator under unity, lagging, and leading power factor loads.",
        "apparatus": ["Synchronous Generator coupled to DC Motor prime mover", "DC Excitation Unit (0-220V)", "3-Phase R-L-C Load Bank", "Multimeter", "Power Meter"],
        "theory": "Terminal voltage Vt varies with load current Ia and power factor due to armature resistance drop Ia*Ra, leakage reactance drop Ia*Xl, and armature reaction demagnetization/magnetization.",
        "procedure_steps": [
            "Run prime mover to bring alternator to synchronous speed (1500 RPM for 4 poles, 50Hz).",
            "Adjust DC field current until open circuit terminal voltage equals rated 415V.",
            "Gradually apply electrical load on alternator output terminals while maintaining rated speed.",
            "Record terminal voltage, armature current, power factor, and active/reactive power at each step."
        ],
        "observation_columns": [
            {"key": "armature_current", "label": "Ia", "unit": "A"},
            {"key": "terminal_voltage", "label": "Vt (Line)", "unit": "V"},
            {"key": "power_factor", "label": "PF", "unit": ""},
            {"key": "active_power", "label": "P", "unit": "W"},
            {"key": "voltage_regulation", "label": "VR", "unit": "%"}
        ]
    },
    "exp_dc_shunt_load": {
        "id": "exp_dc_shunt_load",
        "title": "Load Characteristics of DC Shunt Motor",
        "machine_type": "dc_shunt_motor",
        "aim": "To determine speed-armature current, torque-armature current, and speed-torque characteristics of a DC shunt motor.",
        "apparatus": ["DC Shunt Motor (220V, 3HP)", "3-Point Starter", "Field Rheostat", "Ammeter", "Voltmeter", "Brake Drum Dynamometer"],
        "theory": "Speed N = (Vt - Ia*Ra) / (k*phi). Since field flux phi is virtually constant, speed drops only slightly with load due to armature resistance drop Ia*Ra.",
        "procedure_steps": [
            "Connect DC shunt motor with 3-point starter and field rheostat set to minimum resistance position.",
            "Switch ON 220V DC supply and start motor using 3-point starter handle.",
            "Adjust field rheostat to set no-load speed to rated 1500 RPM.",
            "Gradually apply mechanical brake load in steps up to rated current, recording V, Ia, N, and Spring balances S1, S2."
        ],
        "observation_columns": [
            {"key": "line_current", "label": "I_line", "unit": "A"},
            {"key": "armature_current", "label": "I_a", "unit": "A"},
            {"key": "speed", "label": "Speed (N)", "unit": "RPM"},
            {"key": "torque", "label": "Torque (T)", "unit": "Nm"},
            {"key": "efficiency", "label": "Efficiency", "unit": "%"}
        ]
    },
    "exp_transformer_oc_sc": {
        "id": "exp_transformer_oc_sc",
        "title": "Open Circuit & Short Circuit Tests on Single Phase Transformer",
        "machine_type": "single_phase_transformer",
        "aim": "To determine equivalent circuit parameters, predetermine efficiency and voltage regulation at various loads and power factors without actual loading.",
        "apparatus": ["1-Phase Transformer (230V/115V, 3kVA)", "Variac (0-270V)", "Voltmeters", "Ammeters", "LPF & UPF Wattmeters"],
        "theory": "OC test on LV side yields core loss Rc and Xm. SC test on HV side with LV shorted yields equivalent series resistance R01 and leakage reactance X01.",
        "equations": [
            r"R_c = \frac{V_0^2}{W_0}",
            r"X_m = \frac{V_0^2}{Q_0} = \frac{V_0}{I_m}",
            r"R_{01} = \frac{W_{sc}}{I_{sc}^2}",
            r"Z_{01} = \frac{V_{sc}}{I_{sc}}, \quad X_{01} = \sqrt{Z_{01}^2 - R_{01}^2}"
        ],
        "procedure_steps": [
            "Perform OC test: Keep HV winding open, apply rated 115V to LV winding, measure V0, I0, W0.",
            "Perform SC test: Dead short LV winding, apply low voltage to HV winding to circulate rated current, record Vsc, Isc, Wsc."
        ],
        "observation_columns": [
            {"key": "test_type", "label": "Test", "unit": ""},
            {"key": "voltage", "label": "Voltage", "unit": "V"},
            {"key": "current", "label": "Current", "unit": "A"},
            {"key": "power", "label": "Power", "unit": "W"}
        ],
        "viva_topics": [
            "Why is the OC test performed on the LV side?",
            "Why is copper loss negligible during the OC test?",
            "What is the significance of LPF wattmeter in OC test?"
        ]
    },
    "exp_im_speed_control": {
        "id": "exp_im_speed_control",
        "title": "Speed Control of 3-Phase Induction Motor (V/f Control & Stator Voltage)",
        "machine_type": "induction_motor",
        "aim": "To investigate speed control characteristics of a 3-phase induction motor by variable voltage variable frequency (V/f) control and stator voltage control.",
        "apparatus": ["3-Phase Induction Motor", "Variable Frequency Drive (VFD) Inverter", "3-Phase Variac", "Digital Tachometer", "Power Analyzer"],
        "theory": "Synchronous speed Ns = 120f/P depends directly on supply frequency f. By maintaining a constant V/f ratio, maximum torque is kept constant while operating speed is controlled smoothly over a wide range without magnetic core saturation.",
        "equations": [
            r"N_s = \frac{120 \times f}{P}",
            r"\Phi_{\text{airgap}} \propto \frac{V}{f} \approx \text{constant}",
            r"T_{\text{max}} \propto \left(\frac{V}{f}\right)^2 \approx \text{constant}"
        ],
        "procedure_steps": [
            "Connect the induction motor to the variable frequency AC source.",
            "Vary supply frequency in steps from 20 Hz to 60 Hz while adjusting voltage proportionally to keep V/f constant (8.3 V/Hz).",
            "At each frequency step, measure motor shaft speed, line voltage, current, and starting torque.",
            "Plot speed vs frequency and torque vs speed curves."
        ],
        "observation_columns": [
            {"key": "frequency", "label": "Frequency (f)", "unit": "Hz"},
            {"key": "v_line", "label": "Voltage (V)", "unit": "V"},
            {"key": "v_f_ratio", "label": "V/f Ratio", "unit": "V/Hz"},
            {"key": "speed", "label": "Speed (N)", "unit": "RPM"},
            {"key": "i_line", "label": "Current (I)", "unit": "A"}
        ],
        "viva_topics": [
            "Why must V/f ratio be maintained constant below base frequency?",
            "What happens to core flux if frequency is reduced without lowering voltage?",
            "Why is stator resistance compensation boost required at very low frequencies?"
        ]
    },
    "exp_alt_synchronization": {
        "id": "exp_alt_synchronization",
        "title": "Synchronization of Alternator with Infinite Bus (Three-Lamp & Synchroscope)",
        "machine_type": "synchronous_alternator",
        "aim": "To synchronize an incoming 3-phase alternator with the infinite busbar using dark lamp, bright lamp, and synchroscope methods.",
        "apparatus": ["3-Phase Alternator with DC Prime Mover", "Synchronizing Switch", "Three Synchronizing Lamps", "Synchroscope", "Dual Voltmeter", "Dual Frequency Meter"],
        "theory": "For safe paralleling without circulating transient currents, five conditions must be satisfied: identical terminal voltage magnitudes, identical frequencies, identical phase sequence, zero phase angle displacement, and matching waveform shapes.",
        "equations": [
            r"V_{\text{incoming}} = V_{\text{bus}}",
            r"f_{\text{incoming}} = f_{\text{bus}} \pm 0.1 \text{ Hz}",
            r"\Delta \theta = 0^\circ"
        ],
        "procedure_steps": [
            "Drive alternator to rated speed (1500 RPM) using prime mover.",
            "Adjust DC field rheostat until alternator line voltage exactly matches infinite busbar voltage.",
            "Observe the synchronization lamps. In dark lamp connection, lamps flicker simultaneously if phase sequence is identical.",
            "Adjust prime mover speed fine trim until flicker rate becomes very slow (< 1 cycle per 5 seconds).",
            "Close synchronizing switch exactly at the instant when the top lamp is dark (or synchroscope pointer points to 12 o'clock)."
        ],
        "observation_columns": [
            {"key": "v_bus", "label": "V_bus", "unit": "V"},
            {"key": "v_alt", "label": "V_alt", "unit": "V"},
            {"key": "f_bus", "label": "f_bus", "unit": "Hz"},
            {"key": "f_alt", "label": "f_alt", "unit": "Hz"},
            {"key": "phase_angle", "label": "Phase Diff (Δθ)", "unit": "deg"},
            {"key": "status", "label": "Lamp State", "unit": ""}
        ],
        "viva_topics": [
            "What happens if the synchronizing switch is closed when the phase angle difference is 180 degrees?",
            "How does the synchroscope indicate whether the incoming alternator is running faster or slower?",
            "What is synchronizing power and synchronizing torque?"
        ]
    },
    "exp_dc_shunt_speed_control": {
        "id": "exp_dc_shunt_speed_control",
        "title": "Speed Control of DC Shunt Motor (Armature Voltage & Field Flux Control)",
        "machine_type": "dc_shunt_motor",
        "aim": "To control the speed of a DC shunt motor below rated speed by armature voltage control and above rated speed by field flux weakening.",
        "apparatus": ["DC Shunt Motor (220V, 3HP)", "Armature Rheostat", "Field Rheostat", "Digital Tachometer", "Ammeters", "Voltmeter"],
        "theory": "Motor speed is governed by N = (Vt - Ia*Ra) / (k*phi). By introducing external resistance in the armature circuit (or varying armature voltage), speed is varied below base speed. By introducing resistance in field circuit, flux phi decreases, driving speed above base speed (flux weakening mode).",
        "equations": [
            r"N = \frac{V_t - I_a(R_a + R_{\text{ext}})}{k \Phi}",
            r"\text{Armature control: } N < N_{\text{rated}} \quad (\text{Constant Torque drive})",
            r"\text{Field control: } N > N_{\text{rated}} \quad (\text{Constant Power drive})"
        ],
        "procedure_steps": [
            "Connect the DC shunt motor with armature and field rheostats.",
            "Part A (Armature Control): Keep field current at rated maximum. Vary armature resistance from max to min, recording armature voltage and speed.",
            "Part B (Field Weakening): Keep armature voltage at rated 220V. Increase field rheostat resistance to decrease field current from rated down to safe limit, recording speed vs If."
        ],
        "observation_columns": [
            {"key": "control_mode", "label": "Mode", "unit": ""},
            {"key": "armature_voltage", "label": "V_arm", "unit": "V"},
            {"key": "field_current", "label": "I_field", "unit": "A"},
            {"key": "speed", "label": "Speed (N)", "unit": "RPM"},
            {"key": "armature_current", "label": "I_arm", "unit": "A"}
        ],
        "viva_topics": [
            "Why is field control suitable for constant-power applications?",
            "What is the danger of opening the field circuit of a running DC shunt motor?",
            "Why can armature rheostatic control only achieve speeds below rated speed?"
        ]
    },
    "exp_sync_motor_v_curves": {
        "id": "exp_sync_motor_v_curves",
        "title": "V-Curves and Inverted V-Curves of Synchronous Motor",
        "machine_type": "synchronous_motor",
        "aim": "To determine the V-curves (armature current vs field current) and inverted V-curves (power factor vs field current) of a 3-phase synchronous motor at no-load and full-load.",
        "apparatus": ["3-Phase Synchronous Motor (415V, 5HP)", "DC Field Excitation Supply (0-220V, 5A)", "3-Phase Power Factor Meter", "AC Ammeter", "DC Ammeter"],
        "theory": "A synchronous motor operates at constant synchronous speed Ns = 120f/P regardless of load up to pull-out torque. Varying the DC field excitation changes the generated back EMF Ef. At under-excitation, Ef*cos(delta) < V_ph, causing the motor to draw lagging current (acts like an inductor). At normal excitation, PF = 1.0 (minimum Ia). At over-excitation, Ef*cos(delta) > V_ph, drawing leading current (acts like a synchronous condenser).",
        "equations": [
            r"\mathbf{V}_{\text{ph}} = \mathbf{E}_f + \mathbf{I}_a (R_a + jX_s)",
            r"P_{\text{in}} = \frac{3 V_{\text{ph}} E_f}{X_s} \sin\delta",
            r"\text{Unity PF at: } E_f \cos\delta = V_{\text{ph}} - I_a R_a"
        ],
        "procedure_steps": [
            "Start synchronous motor using damper windings / auxiliary starter and bring into synchronism at no-load.",
            "Vary DC field excitation current from minimum excitation (under-excited) up to maximum permissible field current (over-excited).",
            "At each field current step, record Armature Current (Ia), Field Current (If), and Power Factor (cos phi).",
            "Repeat the procedure under 50% rated mechanical shaft load.",
            "Plot Ia vs If (V-curve) and cos phi vs If (Inverted V-curve)."
        ],
        "observation_columns": [
            {"key": "field_current", "label": "I_field (If)", "unit": "A"},
            {"key": "armature_current", "label": "I_armature (Ia)", "unit": "A"},
            {"key": "power_factor", "label": "Power Factor (cos φ)", "unit": ""},
            {"key": "pf_mode", "label": "PF Mode", "unit": ""},
            {"key": "active_power", "label": "P_in", "unit": "W"}
        ],
        "viva_topics": [
            "Why does armature current reach a minimum at unity power factor?",
            "What is a synchronous condenser and where is it used in utility power grids?",
            "What determines the pull-out torque of a synchronous motor?"
        ]
    },
    "exp_transformer_load_test": {
        "id": "exp_transformer_load_test",
        "title": "Direct Load Test on Single-Phase Transformer for Efficiency & Regulation",
        "machine_type": "single_phase_transformer",
        "aim": "To conduct direct load test on a single-phase transformer and determine its efficiency and voltage regulation from no-load to 125% full load.",
        "apparatus": ["1-Phase Transformer (230V/115V, 3kVA)", "Single-Phase Load Bank (Resistive & Inductive)", "Digital Ammeters", "Digital Voltmeters", "Digital Wattmeters"],
        "theory": "Direct loading subjects the transformer to simultaneous core and copper losses under actual operating conditions. As secondary load current I2 increases, secondary terminal voltage V2 decreases for lagging loads due to internal resistance and leakage reactance voltage drops. Efficiency eta = (P_out / P_in) * 100%.",
        "equations": [
            r"\text{Efficiency } \eta = \frac{V_2 I_2 \cos\phi_2}{W_1} \times 100\%",
            r"\text{Voltage Regulation } \% = \frac{V_{2,\text{no-load}} - V_{2,\text{load}}}{V_{2,\text{no-load}}} \times 100\%"
        ],
        "procedure_steps": [
            "Connect primary winding to 230V AC mains through input voltmeter, ammeter, and wattmeter.",
            "Connect secondary winding to load bank through output voltmeter, ammeter, and wattmeter.",
            "Energize transformer with load switch OPEN; record no-load primary and secondary voltages.",
            "Increase load current in regular steps up to 125% rated current. At each step, record V1, I1, W1, V2, I2, and W2.",
            "Plot efficiency vs output power and secondary voltage vs load current."
        ],
        "observation_columns": [
            {"key": "v1_primary", "label": "V1", "unit": "V"},
            {"key": "i1_primary", "label": "I1", "unit": "A"},
            {"key": "p1_input", "label": "W1 (P_in)", "unit": "W"},
            {"key": "v2_secondary", "label": "V2", "unit": "V"},
            {"key": "i2_secondary", "label": "I2", "unit": "A"},
            {"key": "p2_output", "label": "W2 (P_out)", "unit": "W"},
            {"key": "efficiency", "label": "Efficiency (η)", "unit": "%"},
            {"key": "regulation", "label": "Voltage Reg", "unit": "%"}
        ],
        "viva_topics": [
            "At what condition is the efficiency of a transformer maximum?",
            "Why is direct load test limited to small transformers in practice?",
            "How does load power factor affect voltage regulation?"
        ]
    },
    "exp_3ph_transformer_vector_parallel": {
        "id": "exp_3ph_transformer_vector_parallel",
        "title": "Vector Group Identification & Parallel Operation of 3-Phase Transformers",
        "machine_type": "three_phase_transformer",
        "aim": "To verify vector group connection (Dyn11, Ynd1) and demonstrate load sharing during parallel operation of two 3-phase transformers.",
        "apparatus": ["Two 3-Phase Transformers (415V/230V, 10kVA)", "3-Phase Load Bank", "AC Voltmeters", "Phase Angle Meter", "Synchronization Switch"],
        "theory": "Parallel operation requires equal voltage ratios, identical vector group phase shift (e.g. both Dyn11), identical phase sequence, and per-unit impedances inversely proportional to kVA ratings to ensure proportional load sharing without circulating currents.",
        "equations": [
            r"\frac{S_{A}}{S_{B}} = \frac{Z_{B}}{Z_{A}}",
            r"I_{\text{circulating}} = \frac{E_A - E_B}{Z_A + Z_B}"
        ],
        "procedure_steps": [
            "Verify polarity and vector group phase shift of each transformer using voltmeter method.",
            "Connect primaries of both transformers to 415V 3-phase AC supply in parallel.",
            "Connect secondaries with one terminal common. Measure potential difference across remaining terminal pairs to verify zero voltage before paralleling.",
            "Close paralleling switch and apply 3-phase balanced load.",
            "Measure load currents I_total, I_A, I_B, and terminal voltage to evaluate proportional load sharing."
        ],
        "observation_columns": [
            {"key": "v_bus", "label": "V_bus", "unit": "V"},
            {"key": "i_load", "label": "I_total", "unit": "A"},
            {"key": "i_trafo_a", "label": "I_Trafo_A", "unit": "A"},
            {"key": "i_trafo_b", "label": "I_Trafo_B", "unit": "A"},
            {"key": "circulating_current", "label": "I_circ", "unit": "A"}
        ],
        "viva_topics": [
            "What are the mandatory conditions for parallel operation of three-phase transformers?",
            "Can a Dyn11 transformer be operated in parallel with a Yd1 transformer?",
            "What is the consequence of unequal per-unit impedances in parallel transformers?"
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
