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
        "procedure_steps": [
            "Perform OC test: Keep HV winding open, apply rated 115V to LV winding, measure V0, I0, W0.",
            "Perform SC test: Dead short LV winding, apply low voltage to HV winding to circulate rated current, record Vsc, Isc, Wsc."
        ],
        "observation_columns": [
            {"key": "test_type", "label": "Test", "unit": ""},
            {"key": "voltage", "label": "Voltage", "unit": "V"},
            {"key": "current", "label": "Current", "unit": "A"},
            {"key": "power", "label": "Power", "unit": "W"}
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
