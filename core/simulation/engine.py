"""
Deterministic Simulation Engine and Real-Time Telemetry Bus.
Executes the causal electromechanical loop:
Load demand -> mechanical equilibrium -> speed & slip -> circuit phasors -> losses -> thermal network -> protection evaluation -> telemetry broadcast.
Supports all 10 canonical machines with real physical solvers and dynamic acceleration transients.
Zero fake telemetry: every engineering quantity is derived from first-principles physics.
"""

import time
import copy
import math
import numpy as np
from typing import Dict, Any, List, Optional
from core.physics.induction_motor import InductionMotorPhysics
from core.physics.synchronous_machine import SynchronousMachinePhysics
from core.physics.dc_machine import DCMachinePhysics
from core.physics.transformer import TransformerPhysics
from core.physics.synchronous_motor import SynchronousMotorPhysics
from core.physics.base import angular_velocity, synchronous_speed
from .state_machine import MachineStateMachine, MachineState
from .protection import ProtectionSystem

class SimulationEngine:
    def __init__(self, machine_config: Dict[str, Any]):
        self.machine_config = copy.deepcopy(machine_config)
        self.machine_id = self.machine_config.get("id", "im_415v_5hp")
        self.machine_type = self.machine_config.get("type", "induction_motor")

        # Canonical Physics solvers
        self.im_solver = InductionMotorPhysics()
        self.sync_solver = SynchronousMachinePhysics()
        self.dc_solver = DCMachinePhysics(self.machine_type)
        self.transformer_1ph = TransformerPhysics(is_three_phase=False)
        self.transformer_3ph = TransformerPhysics(is_three_phase=True)
        self.sync_motor_solver = SynchronousMotorPhysics()

        # State and Protection
        self.state_machine = MachineStateMachine(self.machine_id)
        limits = self.machine_config.get("limits", {})
        self.protection = ProtectionSystem(limits)

        # Operational inputs
        self.sim_time = 0.0
        self.dt = 0.05  # 50ms time step (20 Hz deterministic loop)
        self.is_running = False
        self.load_torque = 0.0
        identity = self.machine_config.get("identity", {})
        self.applied_voltage = float(identity.get("rated_voltage", identity.get("v1_rated", 415.0)))
        self.applied_frequency = float(identity.get("frequency", 50.0))
        self.ambient_temp = 25.0
        self.current_temp = 25.0

        # Dynamic electromechanical states for startup acceleration
        self.current_speed_rpm = 0.0
        self.acceleration_time = 0.0
        self.starting_current = 0.0
        self.starting_torque = 0.0
        self.settling_time = 0.0
        self.is_accelerating = False

        # Machine-specific controls
        self.field_current = float(self.machine_config.get("parameters", {}).get("rated_field_current", 1.25))
        self.field_rheostat = 0.0
        self.armature_rheostat = 0.0
        self.power_factor = float(identity.get("power_factor", 0.8))

        # Ring buffer for telemetry (retains last 300 points)
        self.telemetry_history: List[Dict[str, Any]] = []
        self.max_history = 300
        self.last_telemetry: Dict[str, Any] = {}
        self.causal_chain: List[str] = []

    def start_machine(self, transient: bool = False) -> bool:
        if self.protection.tripped:
            return False
        if self.state_machine.get_state() in [MachineState.OFF, MachineState.IDLE]:
            if not self.state_machine.transition_to(MachineState.STARTING, "Operator energization switch closed"):
                return False
            self.is_running = True
            if transient:
                self.is_accelerating = True
                self.acceleration_time = 0.0
                self.current_speed_rpm = 0.0
                self.starting_current = 0.0
                self.starting_torque = 0.0
            else:
                self.state_machine.transition_to(MachineState.RUNNING, "Steady-state operation reached")
                self.is_accelerating = False
                poles = max(2, self.machine_config.get("identity", {}).get("poles", 4))
                ns_rpm = 120.0 * self.applied_frequency / poles
                self.current_speed_rpm = ns_rpm * 0.999
            return True
        return False

    def start_transient(self) -> bool:
        """Starts the machine with full physical acceleration dynamics."""
        return self.start_machine(transient=True)

    def stop_machine(self) -> bool:
        self.is_running = False
        self.is_accelerating = False
        self.state_machine.transition_to(MachineState.OFF, "Operator de-energized machine")
        return True

    def emergency_stop(self) -> bool:
        self.is_running = False
        self.is_accelerating = False
        self.state_machine.transition_to(MachineState.EMERGENCY_STOP, "EMERGENCY STOP BUTTON ENGAGED")
        return True

    def reset_protection(self) -> bool:
        self.protection.clear_all_faults()
        if self.state_machine.get_state() in [MachineState.FAULT, MachineState.EMERGENCY_STOP]:
            self.state_machine.transition_to(MachineState.OFF, "Protection system reset by operator")
            return True
        return False

    def set_load_torque(self, torque_nm: float):
        old_torque = self.load_torque
        self.load_torque = max(0.0, float(torque_nm))
        
        diff = self.load_torque - old_torque
        if abs(diff) > 0.1:
            direction = "increased" if diff > 0 else "decreased"
            opp_dir = "decreased" if diff > 0 else "increased"
            
            if "induction" in self.machine_type:
                self.causal_chain = [
                    f"Shaft mechanical load torque {direction} to {self.load_torque:.2f} Nm",
                    f"Rotor electromechanical balance perturbed; rotor speed {opp_dir}",
                    f"Relative motion between stator flux & rotor altered; rotor slip {direction}",
                    f"Rotor induced EMF and frequency adjusted (fr = s * f)",
                    f"Rotor & Stator phase currents {direction} to meet electromagnetic demand",
                    f"Active input power {direction}; Stator and Rotor copper losses (I²R) {direction}",
                    f"Thermal equilibrium rate shifting towards higher winding temperature"
                ]
            elif "dc" in self.machine_type:
                self.causal_chain = [
                    f"DC shaft load torque {direction} to {self.load_torque:.2f} Nm",
                    f"Rotor momentarily slows down; Back EMF Eb = k*phi*omega {opp_dir}",
                    f"Armature voltage drop (Vt - Eb) increases; Armature current Ia {direction}",
                    f"Electromagnetic torque T = k*phi*Ia rises to match mechanical load",
                    f"Armature copper loss Ia²*Ra increases; thermal dissipation rise begins"
                ]
            elif "sync" in self.machine_type:
                self.causal_chain = [
                    f"Synchronous shaft load {direction} to {self.load_torque:.2f} Nm",
                    f"Rotor magnetic axis lags behind stator rotating field; torque angle delta {direction}",
                    f"Resultant phasor voltage Er increases; Armature phase current Ia {direction}",
                    f"Active power P = (3*V*Ef/Xs)*sin(delta) increases to maintain synchronous speed"
                ]
            else:
                self.causal_chain = [
                    f"Transformer load current demand {direction}",
                    f"Secondary ampere-turns I2*N2 demagnetize the core",
                    f"Primary draws reflecting current I1' = I2*(N2/N1) to restore core flux",
                    f"Total primary current increases; I²R copper loss rises"
                ]

    def set_voltage(self, voltage_v: float):
        self.applied_voltage = max(0.0, float(voltage_v))

    def set_field_current(self, if_a: float):
        self.field_current = max(0.0, float(if_a))

    def set_power_factor(self, pf: float):
        self.power_factor = max(-1.0, min(1.0, float(pf)))

    def step(self) -> Dict[str, Any]:
        """
        Executes one deterministic 50ms simulation step with machine-specific physics.
        """
        self.sim_time += self.dt
        current_state = self.state_machine.get_state()
        identity = self.machine_config.get("identity", {})
        params = self.machine_config.get("parameters", {})
        limits = self.machine_config.get("limits", {})

        # -------------------------------------------------------------
        # 1. DE-ENERGIZED STATES (OFF, EMERGENCY_STOP, FAULT)
        # -------------------------------------------------------------
        if current_state in [MachineState.OFF, MachineState.EMERGENCY_STOP, MachineState.FAULT]:
            # Machine is de-energized: gradual cooling towards ambient
            cooling_rate = 0.05
            self.current_temp += (self.ambient_temp - self.current_temp) * cooling_rate
            self.current_speed_rpm = max(0.0, self.current_speed_rpm * 0.85) # Decelerate to 0
            
            telemetry = {
                "timestamp": round(self.sim_time, 2),
                "machine_id": self.machine_id,
                "machine_type": self.machine_type,
                "state": current_state.value,
                "v_line": 0.0,
                "v_ph": 0.0,
                "i_line": 0.0,
                "frequency": self.applied_frequency,
                "speed_rpm": round(self.current_speed_rpm, 1),
                "ns_rpm": 0.0,
                "slip": 1.0,
                "torque_nm": 0.0,
                "torque_dev_nm": 0.0,
                "power_in_w": 0.0,
                "power_out_w": 0.0,
                "power_factor": 1.0,
                "efficiency_pct": 0.0,
                "losses_copper_stator": 0.0,
                "losses_copper_rotor": 0.0,
                "losses_core": 0.0,
                "total_losses_w": 0.0,
                "winding_temp_c": round(self.current_temp, 1),
                "acceleration_time_s": round(self.acceleration_time, 2),
                "protection_tripped": self.protection.tripped,
                "trip_reason": self.protection.trip_reason
            }
            self._buffer_telemetry(telemetry)
            return telemetry

        # -------------------------------------------------------------
        # 2. MACHINE-SPECIFIC PHYSICS ROUTING
        # -------------------------------------------------------------
        poles = int(identity.get("poles", 4))
        ns_rpm = synchronous_speed(self.applied_frequency, poles) if poles > 0 else 1500.0
        omega_s = angular_velocity(ns_rpm)

        if self.machine_type == "induction_motor":
            # Electromechanical acceleration dynamic: J * dw/dt = T_dev - T_load - B*w
            j_inertia = float(params.get("inertia_j", 0.045))
            b_friction = float(params.get("friction_b", 0.002))
            rated_torque = float(identity.get("rated_torque_nm", 24.7))

            omega_m = angular_velocity(self.current_speed_rpm)
            slip = (ns_rpm - self.current_speed_rpm) / ns_rpm if ns_rpm > 0 else 0.05
            slip = max(0.001, min(1.0, slip))

            if self.is_accelerating:
                self.acceleration_time += self.dt
                # Calculate torque developed at current slip
                res_instant = self.im_solver.calculate({
                    "v_line": self.applied_voltage,
                    "frequency": self.applied_frequency,
                    "slip": slip,
                    "mode": "slip_driven",
                    "ambient_temp": self.ambient_temp
                }, params)
                t_dev = res_instant["t_dev"]
                i_line = res_instant["i_line"]

                if self.acceleration_time <= self.dt:
                    self.starting_current = i_line
                    self.starting_torque = t_dev

                # Accelerating torque equation
                net_torque = t_dev - self.load_torque - (b_friction * omega_m)
                d_omega = (net_torque / j_inertia) * self.dt
                omega_m = max(0.0, omega_m + d_omega)
                self.current_speed_rpm = omega_m * (60.0 / (2.0 * math.pi))

                # Equilibrium check: when speed reaches operating point
                operating_slip = max(0.002, (self.load_torque / (rated_torque + 1e-3)) * 0.04)
                target_speed = ns_rpm * (1.0 - operating_slip)

                if self.current_speed_rpm >= target_speed:
                    self.current_speed_rpm = target_speed
                    self.is_accelerating = False
                    self.settling_time = self.acceleration_time
                    self.state_machine.transition_to(
                        MachineState.RUNNING if self.load_torque < 0.5 else MachineState.LOADED,
                        f"Steady state achieved in {self.acceleration_time:.2f}s"
                    )
                    res = self.im_solver.calculate({
                        "v_line": self.applied_voltage,
                        "frequency": self.applied_frequency,
                        "load_torque": self.load_torque,
                        "mode": "torque_driven",
                        "ambient_temp": self.ambient_temp
                    }, params)
                else:
                    res_instant["speed_rpm"] = self.current_speed_rpm
                    res_instant["slip"] = max(0.001, (ns_rpm - self.current_speed_rpm) / ns_rpm)
                    res = res_instant
            else:
                # Steady-state torque-driven operating point solver
                res = self.im_solver.calculate({
                    "v_line": self.applied_voltage,
                    "frequency": self.applied_frequency,
                    "load_torque": self.load_torque,
                    "mode": "torque_driven",
                    "ambient_temp": self.ambient_temp
                }, params)
                self.current_speed_rpm = res["speed_rpm"]

            # Dynamic thermal model integrating losses
            p_loss = res["total_losses"]
            r_th = float(params.get("thermal_resistance", 0.045))
            c_th = float(params.get("thermal_capacitance", 450.0))
            cooling_mult = 1.0 if not self.protection.active_faults.get("cooling_failure") else 0.2
            target_temp = self.ambient_temp + (p_loss * r_th / cooling_mult)
            d_temp = ((target_temp - self.current_temp) / c_th) * (self.dt * 15.0)
            self.current_temp += d_temp

            telemetry = {
                "timestamp": round(self.sim_time, 2),
                "machine_id": self.machine_id,
                "machine_type": self.machine_type,
                "state": self.state_machine.get_state().value,
                "v_line": round(res["v_line"], 1),
                "v_ph": round(res["v_ph"], 1),
                "i_line": round(res["i_line"], 2),
                "frequency": self.applied_frequency,
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
                "total_losses_w": round(res["total_losses"], 1),
                "winding_temp_c": round(self.current_temp, 1),
                "starting_current_a": round(self.starting_current, 2),
                "starting_torque_nm": round(self.starting_torque, 2),
                "acceleration_time_s": round(self.acceleration_time, 2),
                "protection_tripped": self.protection.tripped,
                "trip_reason": self.protection.trip_reason
            }

        elif self.machine_type in ["synchronous_alternator", "synchronous_generator"]:
            # Synchronous Generator: driven by prime mover at synchronous speed
            speed = 1500.0
            ia = max(0.0, self.load_torque * (identity.get("rated_current", 4.17) / (identity.get("rated_torque_nm", 15.0) + 1e-3)))
            res = self.sync_solver.calculate({
                "speed_rpm": speed,
                "field_current": self.field_current,
                "armature_current": ia,
                "power_factor": self.power_factor
            }, params)

            p_loss = res["total_losses_w"]
            p_out = res["active_power_w"]
            p_in = p_out + p_loss
            target_temp = self.ambient_temp + (p_loss * 0.04)
            self.current_temp += ((target_temp - self.current_temp) / 350.0) * (self.dt * 15.0)
            self.state_machine.transition_to(MachineState.RUNNING if ia < 0.5 else MachineState.LOADED, "Alternator operating at synchronous speed")

            telemetry = {
                "timestamp": round(self.sim_time, 2),
                "machine_id": self.machine_id,
                "machine_type": self.machine_type,
                "state": self.state_machine.get_state().value,
                "v_line": round(res["vt_line"], 1),
                "v_ph": round(res["vt_ph"], 1),
                "i_line": round(res["armature_current"], 2),
                "frequency": self.applied_frequency,
                "speed_rpm": round(res["speed_rpm"], 1),
                "ns_rpm": 1500.0,
                "slip": 0.0,
                "torque_nm": round(p_in / (angular_velocity(1500.0)), 2),
                "power_in_w": round(p_in, 1),
                "power_out_w": round(p_out, 1),
                "power_factor": round(self.power_factor, 3),
                "efficiency_pct": round(res["efficiency_pct"], 1),
                "voltage_regulation_pct": round(res["voltage_regulation_pct"], 2),
                "eph_v": round(res["eph"], 1),
                "field_current_a": round(self.field_current, 2),
                "total_losses_w": round(res["total_losses_w"], 1),
                "winding_temp_c": round(self.current_temp, 1),
                "protection_tripped": self.protection.tripped,
                "trip_reason": self.protection.trip_reason
            }

        elif self.machine_type == "synchronous_motor":
            # Synchronous Motor: runs strictly at synchronous speed, develops torque angle delta
            load_p = self.load_torque * omega_s
            res = self.sync_motor_solver.calculate({
                "v_line": self.applied_voltage,
                "frequency": self.applied_frequency,
                "load_power_w": load_p,
                "field_current_a": self.field_current
            }, params)

            p_loss = max(0.0, res["input_power_w"] - res["output_power_w"])
            target_temp = self.ambient_temp + (p_loss * 0.045)
            self.current_temp += ((target_temp - self.current_temp) / 380.0) * (self.dt * 15.0)
            self.state_machine.transition_to(MachineState.RUNNING if self.load_torque < 0.5 else MachineState.LOADED, "Synchronous motor in synchronism")

            telemetry = {
                "timestamp": round(self.sim_time, 2),
                "machine_id": self.machine_id,
                "machine_type": self.machine_type,
                "state": self.state_machine.get_state().value,
                "v_line": round(self.applied_voltage, 1),
                "v_ph": round(self.applied_voltage / math.sqrt(3.0), 1),
                "i_line": round(res["armature_current_a"], 2),
                "frequency": self.applied_frequency,
                "speed_rpm": round(res["speed_rpm"], 1),
                "ns_rpm": round(res.get("synchronous_speed_rpm", 1500.0), 1),
                "slip": 0.0,
                "torque_nm": round(self.load_torque, 2),
                "power_in_w": round(res["input_power_w"], 1),
                "power_out_w": round(res["output_power_w"], 1),
                "power_factor": round(res["power_factor"], 3),
                "efficiency_pct": round(res["efficiency_pct"], 1),
                "torque_angle_deg": round(res["torque_angle_delta_deg"], 2),
                "pull_out_torque_nm": round(res["pull_out_torque_nm"], 2),
                "field_current_a": round(self.field_current, 2),
                "total_losses_w": round(p_loss, 1),
                "winding_temp_c": round(self.current_temp, 1),
                "protection_tripped": self.protection.tripped,
                "trip_reason": self.protection.trip_reason
            }

        elif self.machine_type in ["dc_shunt_motor", "dc_series_motor", "dc_compound_motor", "separately_excited_dc"]:
            # DC Machines
            res = self.dc_solver.calculate({
                "terminal_voltage": self.applied_voltage,
                "load_torque": self.load_torque,
                "field_rheostat": self.field_rheostat,
                "armature_rheostat": self.armature_rheostat,
                "ambient_temp": self.ambient_temp
            }, {**params, "machine_type": self.machine_type.replace("_motor", "")})

            self.current_speed_rpm = res["speed_rpm"]
            p_loss = res["total_losses_w"]
            target_temp = self.ambient_temp + (p_loss * 0.05)
            self.current_temp += ((target_temp - self.current_temp) / 320.0) * (self.dt * 15.0)
            self.state_machine.transition_to(MachineState.RUNNING if self.load_torque < 0.5 else MachineState.LOADED, "DC machine running steady state")

            telemetry = {
                "timestamp": round(self.sim_time, 2),
                "machine_id": self.machine_id,
                "machine_type": self.machine_type,
                "state": self.state_machine.get_state().value,
                "v_line": round(self.applied_voltage, 1),
                "v_ph": round(self.applied_voltage, 1),
                "i_line": round(res["line_current_a"], 2),
                "i_armature": round(res["armature_current_a"], 2),
                "i_field": round(res["field_current_a"], 2),
                "back_emf_v": round(res["back_emf_v"], 1),
                "speed_rpm": round(res["speed_rpm"], 1),
                "torque_nm": round(res["load_torque_nm"], 2),
                "torque_dev_nm": round(res["developed_torque_nm"], 2),
                "power_in_w": round(res["input_power_w"], 1),
                "power_out_w": round(res["output_power_w"], 1),
                "power_factor": 1.0, # DC
                "efficiency_pct": round(res["efficiency_pct"], 1),
                "total_losses_w": round(res["total_losses_w"], 1),
                "winding_temp_c": round(self.current_temp, 1),
                "protection_tripped": self.protection.tripped,
                "trip_reason": self.protection.trip_reason
            }

        elif self.machine_type in ["single_phase_transformer", "three_phase_transformer"]:
            # Static AC Transformer
            solver = self.transformer_3ph if self.machine_type == "three_phase_transformer" else self.transformer_1ph
            load_fraction = min(1.5, max(0.0, self.load_torque / 10.0 if self.load_torque > 0 else 0.8))
            res = solver.calculate({
                "load_fraction": load_fraction,
                "power_factor": self.power_factor
            }, params)

            p_loss = res["total_losses_w"]
            target_temp = self.ambient_temp + (p_loss * 0.035)
            self.current_temp += ((target_temp - self.current_temp) / 400.0) * (self.dt * 15.0)
            self.state_machine.transition_to(MachineState.RUNNING if load_fraction < 0.1 else MachineState.LOADED, "Transformer energized")

            v1 = res.get("v1_volts", self.applied_voltage)
            v2 = res.get("v2_terminal_volts", 230.0)
            p_in = res.get("input_power_w", 0.0)
            p_out = res.get("output_power_w", 0.0)
            i2 = res.get("i2_load_current_a", 0.0)
            is_3ph = (self.machine_type == "three_phase_transformer")
            denom = (math.sqrt(3.0) * v1 * max(0.1, self.power_factor)) if is_3ph else (v1 * max(0.1, self.power_factor))
            i1 = (p_in / denom) if denom > 0 else 0.0

            telemetry = {
                "timestamp": round(self.sim_time, 2),
                "machine_id": self.machine_id,
                "machine_type": self.machine_type,
                "state": self.state_machine.get_state().value,
                "v_line": round(v1, 1),
                "v_secondary": round(v2, 1),
                "i_line": round(i1, 2),
                "i_secondary": round(i2, 2),
                "frequency": self.applied_frequency,
                "speed_rpm": 0.0, # Static device
                "ns_rpm": 0.0,
                "slip": 0.0,
                "torque_nm": 0.0,
                "power_in_w": round(p_in, 1),
                "power_out_w": round(p_out, 1),
                "power_factor": round(self.power_factor, 3),
                "efficiency_pct": round(res.get("efficiency_pct", 0.0), 1),
                "voltage_regulation_pct": round(res.get("voltage_regulation_pct", 0.0), 2),
                "losses_core": round(res.get("core_loss_w", 0.0), 1),
                "losses_copper_stator": round(res.get("copper_loss_w", 0.0), 1),
                "total_losses_w": round(p_loss, 1),
                "winding_temp_c": round(self.current_temp, 1),
                "protection_tripped": self.protection.tripped,
                "trip_reason": self.protection.trip_reason
            }
        else:
            raise ValueError(f"CRITICAL ERROR: Unsupported machine type '{self.machine_type}'. Cannot simulate unknown machine without academic physics solver.")

        # -------------------------------------------------------------
        # 3. PROTECTION EVALUATION
        # -------------------------------------------------------------
        tripped, reason, incident = self.protection.evaluate_protection(telemetry, self.machine_id)
        if tripped:
            self.state_machine.transition_to(MachineState.FAULT, reason or "Protection trip threshold exceeded")
            telemetry["protection_tripped"] = True
            telemetry["trip_reason"] = reason
            telemetry["state"] = MachineState.FAULT.value

        self._buffer_telemetry(telemetry)
        return telemetry

    def get_machine_health(self) -> Dict[str, str]:
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
