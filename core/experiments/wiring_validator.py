"""
Virtual Wiring and Setup Validation Module.
Checks electrical circuit topology, validates instrument connections,
and gives clear, informative pedagogical feedback rather than silent button disabling.
"""

from typing import Dict, Any, List, Tuple

class WiringValidator:
    def __init__(self):
        pass

    def validate_setup(
        self,
        machine_config: Dict[str, Any],
        source_config: Dict[str, Any],
        instruments_connected: List[str],
        wiring_switches: Dict[str, bool]
    ) -> Tuple[bool, List[str], List[str]]:
        """
        Validates electrical configuration before allowing machine startup.
        Returns: (is_valid, errors_list, warnings_list)
        """
        errors = []
        warnings = []

        m_id = machine_config.get("id", "")
        m_type = machine_config.get("type", "induction_motor")
        identity = machine_config.get("identity", {})
        rated_voltage = float(identity.get("rated_voltage", 415.0))
        rated_current = float(identity.get("rated_current", 7.5))

        source_v = float(source_config.get("voltage", 415.0))
        source_phase = int(source_config.get("phase", 3))
        phase_seq = source_config.get("phase_sequence", "RYB")

        # 1. Voltage Source Compatibility
        if source_v > rated_voltage * 1.15:
            errors.append(
                f"Voltage source ({source_v:.1f} V) exceeds machine rated voltage ({rated_voltage:.1f} V) by more than 15%. Risk of stator winding insulation breakdown!"
            )
        elif source_v < rated_voltage * 0.5 and source_v > 0:
            warnings.append(
                f"Source voltage ({source_v:.1f} V) is significantly below rated voltage ({rated_voltage:.1f} V). Machine may fail to develop sufficient breakaway starting torque."
            )

        # 2. Phase sequence and phase count
        expected_phase = int(identity.get("phase", 3))
        if source_phase != expected_phase:
            errors.append(
                f"Phase count mismatch: Machine requires {expected_phase}-phase supply, but connected source is {source_phase}-phase."
            )

        if expected_phase == 3 and phase_seq not in ["RYB", "ABC", "123"]:
            errors.append(
                f"Invalid phase sequence '{phase_seq}'. Phase sequence must be standard positive sequence (RYB) for clockwise rotating magnetic field."
            )

        # 3. Main Circuit Breaker / Switch
        if not wiring_switches.get("main_breaker", False):
            errors.append(
                "Current path is incomplete: Main 3-pole circuit breaker (MCB) is OPEN. Energize the breaker to supply power."
            )

        # 4. Alternator / DC Machine Excitation
        if m_type == "synchronous_alternator":
            if not wiring_switches.get("dc_field_switch", False):
                errors.append(
                    "Machine cannot generate terminal EMF: Required DC field excitation circuit is DISCONNECTED. Close the exciter switch."
                )
        elif m_type == "dc_shunt_motor":
            if not wiring_switches.get("field_circuit", True):
                errors.append(
                    "CRITICAL SAFETY WARNING: DC Shunt field circuit is OPEN! Starting a DC motor with open field causes dangerous uncontrolled speed runaway."
                )

        # 5. Instrumentation Checks
        if "ammeter" not in instruments_connected:
            warnings.append(
                "Ammeter not connected in series with stator line. Stator current will not be directly observable."
            )
        if "voltmeter" not in instruments_connected:
            warnings.append(
                "Voltmeter not connected across supply terminals. Terminal voltage measurement is unavailable."
            )

        is_valid = len(errors) == 0
        return is_valid, errors, warnings
