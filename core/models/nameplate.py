"""
Machine Nameplate and Configuration Manager.
Validates nameplate edits, checks bounds, recalculates dependent engineering ratings,
and provides serialization / export / import capabilities.
"""

import json
import os
import copy
from typing import Dict, Any, Tuple, Optional

LIBRARY_PATH = os.path.join(os.path.dirname(__file__), "machine_library.json")

class NameplateManager:
    def __init__(self, library_path: str = LIBRARY_PATH):
        self.library_path = library_path
        self._machines: Dict[str, Dict[str, Any]] = {}
        self.load_library()

    def load_library(self):
        if os.path.exists(self.library_path):
            with open(self.library_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                for m in data.get("machines", []):
                    self._machines[m["id"]] = copy.deepcopy(m)

    def get_all_machines(self) -> Dict[str, Dict[str, Any]]:
        return copy.deepcopy(self._machines)

    def get_machine(self, machine_id: str) -> Optional[Dict[str, Any]]:
        m = self._machines.get(machine_id)
        return copy.deepcopy(m) if m else None

    def validate_and_update(self, machine_id: str, new_config: Dict[str, Any]) -> Tuple[bool, str, Dict[str, Any]]:
        """
        Validates the edited machine configuration and propagates changes.
        """
        target = self._machines.get(machine_id)
        if not target:
            return False, f"Machine ID '{machine_id}' not found.", {}

        identity = new_config.get("identity", {})
        parameters = new_config.get("parameters", {})
        limits = new_config.get("limits", {})

        # Validation rules
        voltage = float(identity.get("rated_voltage", 415.0))
        if voltage <= 0:
            return False, "Rated voltage must be positive.", {}

        speed = float(identity.get("rated_speed_rpm", 1500.0))
        if speed <= 0:
            return False, "Rated speed must be positive.", {}

        power_kw = float(identity.get("rated_power_kw", 3.73))
        if power_kw <= 0:
            return False, "Rated power must be positive.", {}

        # Re-derive rated torque: T = (P_watts) / (2 * pi * N / 60)
        omega = (2.0 * 3.14159265 * speed) / 60.0
        derived_torque = (power_kw * 1000.0) / omega
        identity["rated_torque_nm"] = round(derived_torque, 2)
        identity["rated_power_hp"] = round(power_kw * 1.34102, 2)

        # Merge updates
        updated_machine = copy.deepcopy(target)
        updated_machine["identity"].update(identity)
        updated_machine["parameters"].update(parameters)
        updated_machine["limits"].update(limits)
        if "name" in new_config:
            updated_machine["name"] = new_config["name"]

        # Cache in memory
        self._machines[machine_id] = updated_machine
        return True, "Nameplate updated and propagated successfully.", updated_machine

    def export_json(self, machine_id: str) -> str:
        m = self.get_machine(machine_id)
        return json.dumps(m, indent=2) if m else "{}"

    def import_json(self, json_str: str) -> Tuple[bool, str, Optional[Dict[str, Any]]]:
        try:
            data = json.loads(json_str)
            m_id = data.get("id")
            if not m_id:
                return False, "Machine configuration missing 'id'.", None
            self._machines[m_id] = data
            return True, f"Machine '{m_id}' imported successfully.", data
        except Exception as e:
            return False, f"Invalid JSON format: {str(e)}", None
