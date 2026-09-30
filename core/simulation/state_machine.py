"""
Machine Digital Twin State Machine.
Implements the canonical lifecycle states:
OFF -> IDLE -> STARTING -> RUNNING -> LOADED -> OVERLOADED -> FAULT -> EMERGENCY_STOP -> COOLING.
Provides safe transitions, transition guards, and history logging.
"""

from enum import Enum
import time
from typing import Dict, Any, List, Optional

class MachineState(str, Enum):
    OFF = "OFF"
    IDLE = "IDLE"
    STARTING = "STARTING"
    RUNNING = "RUNNING"
    LOADED = "LOADED"
    OVERLOADED = "OVERLOADED"
    FAULT = "FAULT"
    EMERGENCY_STOP = "EMERGENCY_STOP"
    COOLING = "COOLING"

class MachineStateMachine:
    def __init__(self, machine_id: str):
        self.machine_id = machine_id
        self.current_state = MachineState.OFF
        self.transition_history: List[Dict[str, Any]] = []
        self._record_transition(None, MachineState.OFF, "Initial initialization")

    def _record_transition(self, from_state: Optional[MachineState], to_state: MachineState, reason: str):
        event = {
            "timestamp": time.time(),
            "machine_id": self.machine_id,
            "from_state": from_state.value if from_state else None,
            "to_state": to_state.value,
            "reason": reason
        }
        self.transition_history.append(event)
        # Cap history to prevent memory leak
        if len(self.transition_history) > 200:
            self.transition_history.pop(0)

    def transition_to(self, target_state: MachineState, reason: str = "") -> bool:
        """Attempt a state transition adhering to valid physical transitions."""
        current = self.current_state

        # Immediate emergency stop is always allowed from any state
        if target_state == MachineState.EMERGENCY_STOP:
            self.current_state = MachineState.EMERGENCY_STOP
            self._record_transition(current, MachineState.EMERGENCY_STOP, f"E-STOP: {reason}")
            return True

        # Fault transition is allowed from any active state
        if target_state == MachineState.FAULT:
            self.current_state = MachineState.FAULT
            self._record_transition(current, MachineState.FAULT, f"Protection Trip: {reason}")
            return True

        valid_transitions = {
            MachineState.OFF: [MachineState.IDLE, MachineState.STARTING],
            MachineState.IDLE: [MachineState.STARTING, MachineState.OFF],
            MachineState.STARTING: [MachineState.RUNNING, MachineState.OFF, MachineState.FAULT],
            MachineState.RUNNING: [MachineState.LOADED, MachineState.IDLE, MachineState.OFF, MachineState.COOLING],
            MachineState.LOADED: [MachineState.RUNNING, MachineState.OVERLOADED, MachineState.OFF],
            MachineState.OVERLOADED: [MachineState.LOADED, MachineState.FAULT, MachineState.OFF],
            MachineState.FAULT: [MachineState.COOLING, MachineState.OFF],
            MachineState.EMERGENCY_STOP: [MachineState.OFF, MachineState.COOLING],
            MachineState.COOLING: [MachineState.OFF, MachineState.IDLE]
        }

        if target_state in valid_transitions.get(current, []):
            self.current_state = target_state
            self._record_transition(current, target_state, reason)
            return True
        else:
            return False

    def get_state(self) -> MachineState:
        return self.current_state

    def get_history(self) -> List[Dict[str, Any]]:
        return list(self.transition_history)
