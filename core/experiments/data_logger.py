"""
Experiment Data Logging and Observation Management Module.
Maintains structured measurement tables, frozen configuration snapshots,
record editing/undo, CSV and JSON export, and full experiment replayability.
"""

import time
import json
import csv
import io
import copy
from typing import Dict, Any, List, Optional

class ExperimentDataLogger:
    def __init__(self, experiment_id: str, machine_config: Dict[str, Any], student_name: str = "Student"):
        self.experiment_id = experiment_id
        # Freeze machine configuration snapshot so future modifications to presets do not alter past lab runs!
        self.machine_config_snapshot = copy.deepcopy(machine_config)
        self.student_name = student_name
        self.run_id = f"RUN-{experiment_id}-{int(time.time())}"
        self.start_time = time.time()
        self.observations: List[Dict[str, Any]] = []
        self._history_stack: List[List[Dict[str, Any]]] = []

    def record_observation(self, readings: Dict[str, Any]) -> Dict[str, Any]:
        """Saves a structured measurement row with timestamp and snapshot reference."""
        # Save snapshot for undo
        self._history_stack.append(copy.deepcopy(self.observations))
        if len(self._history_stack) > 50:
            self._history_stack.pop(0)

        record = {
            "index": len(self.observations) + 1,
            "timestamp": time.time(),
            "time_str": time.strftime("%H:%M:%S", time.localtime()),
            **readings
        }
        self.observations.append(record)
        return record

    def edit_observation(self, index: int, updated_readings: Dict[str, Any]) -> bool:
        if 1 <= index <= len(self.observations):
            self._history_stack.append(copy.deepcopy(self.observations))
            self.observations[index - 1].update(updated_readings)
            return True
        return False

    def delete_observation(self, index: int) -> bool:
        if 1 <= index <= len(self.observations):
            self._history_stack.append(copy.deepcopy(self.observations))
            self.observations.pop(index - 1)
            # Re-index
            for i, obs in enumerate(self.observations):
                obs["index"] = i + 1
            return True
        return False

    def undo(self) -> bool:
        if self._history_stack:
            self.observations = self._history_stack.pop()
            return True
        return False

    def clear(self):
        if self.observations:
            self._history_stack.append(copy.deepcopy(self.observations))
            self.observations = []

    def export_csv(self) -> str:
        """Exports observations table to RFC 4180 compliant CSV string."""
        if not self.observations:
            return ""

        output = io.StringIO()
        # Find all field names
        keys = list(self.observations[0].keys())
        writer = csv.DictWriter(output, fieldnames=keys)
        writer.writeheader()
        for row in self.observations:
            writer.writerow(row)
        return output.getvalue()

    def export_json(self) -> str:
        """Exports complete experiment run with frozen configuration snapshot."""
        run_data = {
            "run_id": self.run_id,
            "experiment_id": self.experiment_id,
            "student_name": self.student_name,
            "start_time": self.start_time,
            "end_time": time.time(),
            "machine_config_snapshot": self.machine_config_snapshot,
            "observation_count": len(self.observations),
            "observations": self.observations
        }
        return json.dumps(run_data, indent=2)

    def get_observations(self) -> List[Dict[str, Any]]:
        return list(self.observations)
