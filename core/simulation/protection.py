"""
Fault Injection and Electrical Machine Protection System.
Simulates 12 controllable engineering faults, assesses trip limits,
and generates formal protection trip records and event sequences.
"""

import time
from typing import Dict, Any, List, Optional, Tuple

class ProtectionSystem:
    def __init__(self, limits: Optional[Dict[str, Any]] = None):
        self.limits = limits or {
            "max_voltage": 460.0,
            "min_voltage": 350.0,
            "overload_current_threshold": 9.5,
            "instant_short_circuit_current": 25.0,
            "max_temp_c": 125.0,
            "max_speed_rpm": 1650.0
        }
        self.active_faults: Dict[str, Any] = {}
        self.incident_history: List[Dict[str, Any]] = []
        self.tripped = False
        self.trip_reason = ""

    def inject_fault(self, fault_type: str, severity: float = 1.0) -> bool:
        """
        Inject one of the 12 controllable faults:
        overvoltage, undervoltage, overload, phase_loss, voltage_imbalance,
        frequency_deviation, locked_rotor, bearing_friction, cooling_failure,
        excessive_temperature, short_circuit, sensor_failure.
        """
        valid_faults = [
            "overvoltage", "undervoltage", "overload", "phase_loss",
            "voltage_imbalance", "frequency_deviation", "locked_rotor",
            "bearing_friction", "cooling_failure", "excessive_temperature",
            "short_circuit", "sensor_failure"
        ]
        if fault_type not in valid_faults:
            return False

        self.active_faults[fault_type] = {
            "active": True,
            "severity": float(severity),
            "injected_at": time.time()
        }
        return True

    def clear_fault(self, fault_type: str) -> bool:
        if fault_type in self.active_faults:
            del self.active_faults[fault_type]
            return True
        return False

    def clear_all_faults(self):
        self.active_faults.clear()
        self.tripped = False
        self.trip_reason = ""

    def evaluate_protection(self, telemetry: Dict[str, Any], machine_id: str = "machine") -> Tuple[bool, Optional[str], Optional[Dict[str, Any]]]:
        """
        Evaluates protection thresholds against instantaneous telemetry.
        Returns: (is_tripped, trip_reason, incident_record)
        """
        v_line = telemetry.get("v_line", 415.0)
        i_line = telemetry.get("i_line", 0.0)
        temp_c = telemetry.get("winding_temp_c", telemetry.get("steady_state_temp", 25.0))
        speed = telemetry.get("speed_rpm", 0.0)

        incident = None

        state = telemetry.get("state", "OFF")
        if state in ["OFF", "EMERGENCY_STOP", "FAULT"]:
            return False, None, None

        # 1. Instantaneous Short Circuit (> 4x rated or explicit fault)
        instant_sc_limit = float(self.limits.get("instant_short_circuit_current", max(40.0, float(self.limits.get("max_current", 12.0)) * 3.5)))
        if i_line >= instant_sc_limit or "short_circuit" in self.active_faults:
            self.tripped = True
            self.trip_reason = f"INSTANTANEOUS OVERCURRENT / SHORT CIRCUIT (I = {i_line:.1f} A >= {instant_sc_limit:.1f} A)"
            incident = self._log_incident(machine_id, "Short Circuit / Overcurrent", i_line, instant_sc_limit, "TRIP")
            return True, self.trip_reason, incident

        # 2. Thermal Overload
        max_temp = float(self.limits.get("max_temp_c", 125.0))
        if temp_c >= max_temp or "excessive_temperature" in self.active_faults:
            self.tripped = True
            self.trip_reason = f"THERMAL OVERLOAD TRIP: Winding Temp {temp_c:.1f} °C exceeded rating {max_temp:.1f} °C"
            incident = self._log_incident(machine_id, "Thermal Overload", temp_c, max_temp, "TRIP")
            return True, self.trip_reason, incident

        # 3. Continuous Overcurrent / Overload (immune to normal startup inrush < 5.0 seconds)
        is_starting = (state == "STARTING" and float(telemetry.get("acceleration_time_s", 0.0)) < 5.0)
        overload_threshold = float(self.limits.get("overload_trip_current", self.limits.get("max_primary_current", self.limits.get("overload_current_threshold", 9.5))))
        if "overload" in self.active_faults or (not is_starting and i_line >= overload_threshold):
            self.tripped = True
            self.trip_reason = f"OVERLOAD TRIP: Current {i_line:.2f} A sustained above limit {overload_threshold:.1f} A"
            incident = self._log_incident(machine_id, "Overload Current", i_line, overload_threshold, "TRIP")
            return True, self.trip_reason, incident

        # 4. Overvoltage
        max_v = float(self.limits.get("max_voltage", 460.0))
        if v_line >= max_v or "overvoltage" in self.active_faults:
            self.tripped = True
            self.trip_reason = f"OVERVOLTAGE TRIP: Voltage {v_line:.1f} V exceeded limit {max_v:.1f} V"
            incident = self._log_incident(machine_id, "Overvoltage", v_line, max_v, "TRIP")
            return True, self.trip_reason, incident

        # 5. Undervoltage (active only when energized and voltage sags severely below rating)
        min_v = float(self.limits.get("min_voltage", 180.0 if v_line < 300.0 else 340.0))
        if v_line > 10.0 and (v_line <= min_v or "undervoltage" in self.active_faults):
            self.tripped = True
            self.trip_reason = f"UNDERVOLTAGE TRIP: Line Voltage {v_line:.1f} V below minimum threshold {min_v:.1f} V"
            incident = self._log_incident(machine_id, "Undervoltage", v_line, min_v, "TRIP")
            return True, self.trip_reason, incident

        # 6. Locked Rotor
        if "locked_rotor" in self.active_faults and speed < 10.0 and i_line > 2.0:
            self.tripped = True
            self.trip_reason = "LOCKED ROTOR TRIP: Rotor stationary under excitation, high locked-rotor current"
            incident = self._log_incident(machine_id, "Locked Rotor", speed, 0.0, "TRIP")
            return True, self.trip_reason, incident

        return False, None, None

    def _log_incident(self, machine_id: str, fault_name: str, measured: float, threshold: float, action: str) -> Dict[str, Any]:
        record = {
            "timestamp": time.time(),
            "machine": machine_id,
            "fault": fault_name,
            "measured_value": round(float(measured), 2),
            "threshold": round(float(threshold), 2) if threshold else 0.0,
            "trip_state": action,
            "operator_action": "Inspect machine, rectify overload/wiring, press Reset Protection"
        }
        self.incident_history.append(record)
        if len(self.incident_history) > 100:
            self.incident_history.pop(0)
        return record

    def get_incident_history(self) -> List[Dict[str, Any]]:
        return list(self.incident_history)
