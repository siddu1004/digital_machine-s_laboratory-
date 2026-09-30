"""
Viva Voce Examination and Oral Assessment Bank.
Contains categorized questions (Basic, Intermediate, Advanced) with comprehensive
academic explanations for all machine types and laboratory experiments.
"""

from typing import Dict, Any, List

VIVA_QUESTION_BANK: Dict[str, List[Dict[str, Any]]] = {
    "induction_motor": [
        {
            "id": "im_q1",
            "tier": "Basic",
            "question": "Why does an induction motor never run at synchronous speed (Ns)?",
            "answer": "If the rotor were to rotate at synchronous speed, there would be zero relative velocity between the rotating stator magnetic field and the rotor conductors. Consequently, by Faraday's law of electromagnetic induction, no EMF and no current would be induced in the rotor. Without rotor current, no electromagnetic torque (T = B*I*L) is developed to sustain rotation against friction.",
            "key_concept": "Relative motion and slip"
        },
        {
            "id": "im_q2",
            "tier": "Basic",
            "question": "What is the physical meaning of slip (s) in an induction motor?",
            "answer": "Slip represents the normalized relative speed between the rotating stator magnetic field (Ns) and the rotor mechanical speed (N), expressed as s = (Ns - N)/Ns. It directly determines the induced rotor frequency (fr = s*f) and the magnitude of rotor current.",
            "key_concept": "Slip formula and rotor frequency"
        },
        {
            "id": "im_q3",
            "tier": "Intermediate",
            "question": "Why is the power factor of an induction motor very low (0.1 to 0.2) on no-load?",
            "answer": "On no-load, the active power drawn by the motor is only sufficient to cover core loss and mechanical friction. However, the presence of the air gap requires a significant magnetizing current (Im) to establish the working magnetic flux. Since Im lags the applied voltage by 90 degrees and dominates the small core loss current (Ic), the overall stator current is largely reactive, leading to a very poor lagging power factor.",
            "key_concept": "Air gap reluctance and magnetizing reactive current"
        },
        {
            "id": "im_q4",
            "tier": "Intermediate",
            "question": "Explain the relationship between air-gap power (P_ag), rotor copper loss (P_r_cu), and developed mechanical power (P_conv).",
            "answer": "The total power transferred across the air gap from stator to rotor satisfies the fundamental ratio: P_ag : P_r_cu : P_conv = 1 : s : (1 - s). Thus, a fraction s of air-gap power is dissipated as Joule heating in the rotor resistance (P_r_cu = s * P_ag), while the remaining fraction (1 - s) is converted into developed mechanical power.",
            "key_concept": "Power flow ratios in induction machines"
        },
        {
            "id": "im_q5",
            "tier": "Advanced",
            "question": "What happens during a Blocked Rotor Test, and why can core loss be neglected during this test?",
            "answer": "In the blocked rotor test, the rotor is mechanically held stationary (s = 1.0). A reduced voltage (typically 10-20% of rated voltage) is applied to circulate rated full-load stator current. Because magnetic core losses (eddy current and hysteresis) are proportional to V^2 (or flux density B^2), and applied voltage is greatly reduced, core losses become infinitesimal (less than 1-2% of full load losses) and are safely neglected.",
            "key_concept": "Reduced voltage testing and square-law core loss dependence"
        }
    ],
    "synchronous_machine": [
        {
            "id": "sg_q1",
            "tier": "Basic",
            "question": "What is the relationship between frequency, number of poles, and synchronous speed in an alternator?",
            "answer": "The relationship is f = (P * N) / 120, or Ns = 120 * f / P. For a 4-pole alternator operating at 50 Hz, the shaft speed must be strictly 1500 RPM.",
            "key_concept": "Synchronous frequency relation"
        },
        {
            "id": "sg_q2",
            "tier": "Intermediate",
            "question": "Why does the terminal voltage of an alternator drop significantly under lagging power factor load, but may increase under leading power factor load?",
            "answer": "Under lagging power factor (inductive loads), the armature reaction flux is directly demagnetizing, which opposes and weakens the main rotor field flux, causing a substantial voltage drop. Conversely, under leading power factor (capacitive loads), the armature reaction is magnetizing, augmenting the rotor flux and causing the terminal voltage to rise (negative voltage regulation).",
            "key_concept": "Armature reaction under reactive loading"
        },
        {
            "id": "sg_q3",
            "tier": "Advanced",
            "question": "What is Synchronous Impedance (Zs), and why does the Synchronous Impedance (EMF) method give a pessimistic value of voltage regulation?",
            "answer": "Synchronous impedance is Zs = sqrt(Ra^2 + Xs^2), where Xs combines leakage reactance and equivalent fictitious reactance representing armature reaction. The EMF method is considered pessimistic because Xs is evaluated from the unsaturated region of the Open Circuit Characteristic (OCC), where the iron has high permeability. Under actual operating conditions, magnetic saturation reduces the effective armature reaction effect.",
            "key_concept": "Pessimistic voltage regulation and magnetic saturation"
        }
    ]
}

class VivaExaminer:
    def __init__(self):
        self.bank = VIVA_QUESTION_BANK

    def get_questions_for_machine(self, machine_type: str, tier: str = "All") -> List[Dict[str, Any]]:
        # Map machine type to bank category
        category = "induction_motor"
        if "sync" in machine_type or "alt" in machine_type:
            category = "synchronous_machine"

        questions = self.bank.get(category, self.bank["induction_motor"])
        if tier != "All":
            questions = [q for q in questions if q["tier"].lower() == tier.lower()]
        return questions
