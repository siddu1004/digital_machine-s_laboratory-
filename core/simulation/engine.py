"""
Deterministic Simulation Engine and Real-Time Telemetry Bus.
Executes the causal electromechanical loop:
Load demand -> mechanical equilibrium -> speed & slip -> circuit phasors -> losses -> thermal network -> protection evaluation -> telemetry broadcast.
"""

import time
import copy
from typing import Dict, Any, List, Optional
from core.physics.induction_motor import InductionMotorPhysics
from core.physics.synchronous_machine import SynchronousMachinePhysics
from core.physics.dc_machine import DCMachinePhysics
from core.physics.transformer import TransformerPhysics
from core.physics.synchronous_motor import SynchronousMotorPhysics
from .state_machine import MachineStateMachine, MachineState
from .protection import ProtectionSystem

class SimulationEngine:
    def __init__(self, machine_config: Dict[str, Any]):
        self.machine_config = copy.deepcopy(machine_config)
        self.machine_id = self.machine_config.get("id", "machine_default")
        self.machine_type = self.machine_config.get("type", "induction_motor")

        # Physics solvers
        self.im_solver = InductionMotorPhysics()
        self.sync_solver = SynchronousMachinePhysics()
        self.dc_solver = DCMachinePhysics()
        self.transformer_solver = TransformerPhysics()
        self.sync_motor_solver = SynchronousMotorPhysics()

        # State and Protection
        self.state_machine = MachineStateMachine(self.machine_id)
        limits = self.machine_config.get("limits", {})
        self.protection = ProtectionSystem(limits)

        # Operational state
        self.sim_time = 0.0
        self.dt = 0.05  # 50ms time step
        self.is_running = False
        self.load_torque = 0.0
        self.applied_voltage = float(self.machine_config.get("identity", {}).get("rated_voltage", 415.0))
        self.applied_frequency = float(self.machine_config.get("identity", {}).get("frequency", 50.0))
        self.ambient_temp = 25.0
        self.current_temp = 25.0

        # Ring buffer for telemetry (retains last 300 points)
        self.telemetry_history: List[Dict[str, Any]] = []
        self.max_history = 300
        self.last_telemetry: Dict[str, Any] = {}
        self.causal_chain: List[str] = []

    def start_machine(self) -> bool:
        if self.protection.tripped:
            return False
        if self.state_machine.get_state() == MachineState.OFF:
            self.state_machine.transition_to(MachineState.STARTING, "Operator started machine")
            self.is_running = True
            # Simulate initial acceleration to idle
            self.state_machine.transition_to(MachineState.RUNNING, "Reached steady state speed")
            return True
        return False

    def stop_machine(self) -> bool:
        self.is_running = False
        self.state_machine.transition_to(MachineState.OFF, "Operator stopped machine")
        return True

    def emergency_stop(self) -> bool:
        self.is_running = False
        self.state_machine.transition_to(MachineState.EMERGENCY_STOP, "EMERGENCY STOP BUTTON ENGAGED")
        return True

    def reset_protection(self) -> bool:
        self.protection.clear_all_faults()
        if self.state_machine.get_state() in [MachineState.FAULT, MachineState.EMERGENCY_STOP]:
            self.state_machine.transition_to(MachineState.OFF, "Protection reset by operator")
            return True
        return False

    def set_load_torque(self, torque_nm: float):
        old_torque = self.load_torque
        self.load_torque = max(0.0, float(torque_nm))
        
        # Build educational causal chain explanation
        diff = self.load_torque - old_torque
        if abs(diff) > 0.1:
            direction = "increased" if diff > 0 else "decreased"
            opp_dir = "decreased" if diff > 0 else "increased"
            self.causal_chain = [
                f"Shaft mechanical load torque {direction} to {self.load_torque:.2f} Nm",
                f"Rotor electromechanical balance perturbed; rotor speed {opp_dir}",
                f"Relative motion between stator flux & rotor altered; rotor slip {direction}",
                f"Rotor induced EMF and frequency adjusted (fr = s * f)",
                f"Rotor & Stator phase currents {direction} to meet electromagnetic demand",
                f"Active input power {direction}; Stator and Rotor copper losses (I²R) {direction}",
                f"Thermal equilibrium rate shifting towards higher winding temperature"
            ]

    def set_voltage(self, voltage_v: float):
        self.applied_voltage = max(0.0, float(voltage_v))

    def step(self) -> Dict[str, Any]:
        """
        Executes one deterministic simulation step.
        """
        self.sim_time += self.dt
        current_state = self.state_machine.get_state()

        if current_state in [MachineState.OFF, MachineState.EMERGENCY_STOP, MachineState.FAULT]:
            # Machine is de-energized; gradual thermal cooling to ambient
            cooling_rate = 0.05
            self.current_temp += (self.ambient_temp - self.current_temp) * cooling_rate
            telemetry = {
                "timestamp": self.sim_time,
                "machine_id": self.machine_id,
                "machine_type": self.machine_type,
                "state": current_state.value,
                "v_line": 0.0,
                "i_line": 0.0,
                "speed_rpm": 0.0,
                "slip": 0.0,
                "torque_nm": 0.0,
                "power_in_w": 0.0,
                "power_out_w": 0.0,
                "power_factor": 1.0,
                "efficiency_pct": 0.0,
                "winding_temp_c": round(self.current_temp, 1),
                "protection_tripped": self.protection.tripped,
                "trip_reason": self.protection.trip_reason
            }
            self._buffer_telemetry(telemetry)
            return telemetry

        # Update machine state based on load level
        rated_t = self.machine_config.get("identity", {}).get("rated_torque_nm", 25.0)
        if self.load_torque > rated_t * 1.15:
            if current_state != MachineState.OVERLOADED:
                self.state_machine.transition_to(MachineState.OVERLOADED, "Torque exceeds 115% rated limit")
        elif self.load_torque > 0.5:
            if current_state != MachineState.LOADED:
                self.state_machine.transition_to(MachineState.LOADED, "Mechanical load applied")
        else:
            if current_state != MachineState.RUNNING:
                self.state_machine.transition_to(MachineState.RUNNING, "Running at no-load")

        # Execute machine-specific physics
        params = self.machine_config.get("parameters", {})
        if self.machine_type == "induction_motor":
            inputs = {
                "v_line": self.applied_voltage,
                "frequency": self.applied_frequency,
                "load_torque": self.load_torque,
                "mode": "torque_driven",
                "ambient_temp": self.ambient_temp
            }
            res = self.im_solver.calculate(inputs, params)
            # Dynamic thermal model integrating losses
            p_loss = res["total_losses"]
            r_th = params.get("thermal_resistance", 0.045)
            c_th = params.get("thermal_capacitance", 450.0)
            target_temp = self.ambient_temp + (p_loss * r_th)
            d_temp = ((target_temp - self.current_temp) / c_th) * (self.dt * 15.0)
            self.current_temp += d_temp

            telemetry = {
                "timestamp": self.sim_time,
                "machine_id": self.machine_id,
                "machine_type": self.machine_type,
                "state": self.state_machine.get_state().value,
                "v_line": round(res["v_line"], 1),
                "v_ph": round(res["v_ph"], 1),
                "i_line": round(res["i_line"], 2),
                "speed_rpm": round(res["speed_rpm"], 1),
                "ns_rpm": round(res["ns_rpm"], 1),
                "slip": round(res["slip"], 4),
                "torque_nm": round(res["t_shaft"], 2),
                "torque_dev_nm": round(res["t_dev"], 2),
                "power_in_w": round(res["p_in"], 1),
                "power_out_w": round(res["p_out"], 1),
                "power_factor": round(res["pf"], 3),
                "efficiency_pct": round(res["efficiency"], 1),
                "losses_copper_stator": round(res["p_s_cu"], 1),
                "losses_copper_rotor": round(res["p_r_cu"], 1),
                "losses_core": round(res["p_core"], 1),
                "winding_temp_c": round(self.current_temp, 1),
                "protection_tripped": self.protection.tripped,
                "trip_reason": self.protection.trip_reason
            }
        else:
            # Fallback or Alternator / DC / Transformer
            telemetry = {
                "timestamp": self.sim_time,
                "machine_id": self.machine_id,
                "machine_type": self.machine_type,
                "state": self.state_machine.get_state().value,
                "v_line": round(self.applied_voltage, 1),
                "i_line": 5.0,
                "speed_rpm": 1500.0,
                "slip": 0.0,
                "torque_nm": round(self.load_torque, 2),
                "power_in_w": 2000.0,
                "power_out_w": 1800.0,
                "power_factor": 0.85,
                "efficiency_pct": 90.0,
                "winding_temp_c": round(self.current_temp, 1),
                "protection_tripped": self.protection.tripped,
                "trip_reason": self.protection.trip_reason
            }

        # Protection evaluation
        tripped, reason, incident = self.protection.evaluate_protection(telemetry, self.machine_id)
        if tripped:
            self.state_machine.transition_to(MachineState.FAULT, reason or "Trip")
            telemetry["protection_tripped"] = True
            telemetry["trip_reason"] = reason
            telemetry["state"] = MachineState.FAULT.value

        self._buffer_telemetry(telemetry)
        return telemetry

    def get_machine_health(self) -> Dict[str, str]:
        """Returns the real physical health indicators."""
        limits = self.machine_config.get("limits", {})
        temp = self.current_temp
        max_t = limits.get("max_temp_c", 125.0)

        thermal_health = "NORMAL"
        if temp > max_t:
            thermal_health = "CRITICAL"
        elif temp > max_t * 0.85:
            thermal_health = "WARNING"

        electrical_health = "NORMAL"
        if self.protection.tripped:
            electrical_health = "FAULT"
        elif self.last_telemetry.get("i_line", 0.0) > limits.get("overload_trip_current", 9.5) * 0.9:
            electrical_health = "WARNING"

        return {
            "electrical": electrical_health,
            "thermal": thermal_health,
            "mechanical": "NORMAL" if not self.protection.active_faults.get("bearing_friction") else "WARNING",
            "protection": "TRIPPED" if self.protection.tripped else "ARMED",
            "sensor": "NORMAL" if not self.protection.active_faults.get("sensor_failure") else "FAULT"
        }

    def _buffer_telemetry(self, item: Dict[str, Any]):
        self.last_telemetry = item
        self.telemetry_history.append(item)
        if len(self.telemetry_history) > self.max_history:
            self.telemetry_history.pop(0)

    def get_telemetry_history(self) -> List[Dict[str, Any]]:
        return list(self.telemetry_history)

    def get_causal_chain(self) -> List[str]:
        return list(self.causal_chain)
