"""
Parameter Sweep and Engineering Characteristics Generator.
Executes automated parametric sweeps over load, voltage, frequency, and excitation,
computing comprehensive characteristic curves (Torque-Speed, Efficiency-Load, PF-Load, V-Curves).
"""

import numpy as np
from typing import Dict, Any, List
from core.physics.induction_motor import InductionMotorPhysics
from core.physics.synchronous_machine import SynchronousMachinePhysics

class ParameterSweepEngine:
    def __init__(self):
        self.im_solver = InductionMotorPhysics()
        self.sync_solver = SynchronousMachinePhysics()

    def sweep_induction_motor_load(
        self,
        machine_config: Dict[str, Any],
        steps: int = 15,
        max_load_fraction: float = 1.3
    ) -> Dict[str, List[float]]:
        """
        Sweeps motor load torque from 0% to max_load_fraction * rated_torque.
        Generates torque, speed, slip, current, PF, efficiency, and temperature curves.
        """
        identity = machine_config.get("identity", {})
        params = machine_config.get("parameters", {})
        rated_torque = float(identity.get("rated_torque_nm", 24.7))
        v_line = float(identity.get("rated_voltage", 415.0))
        freq = float(identity.get("frequency", 50.0))
        poles = int(identity.get("poles", 4))

        torques = np.linspace(0.0, rated_torque * max_load_fraction, steps)
        result = {
            "load_torque_nm": [],
            "speed_rpm": [],
            "slip_pct": [],
            "i_line_a": [],
            "p_in_w": [],
            "p_out_w": [],
            "efficiency_pct": [],
            "power_factor": [],
            "total_losses_w": [],
            "temp_c": []
        }

        for t in torques:
            res = self.im_solver.find_operating_point_for_torque(
                float(t), v_line, freq,
                float(params.get("r1", 1.5)),
                float(params.get("x1", 3.5)),
                float(params.get("rc", 500.0)),
                float(params.get("xm", 80.0)),
                float(params.get("r2_prime", 1.8)),
                float(params.get("x2_prime", 3.5)),
                float(params.get("p_rot", 100.0)),
                poles
            )
            result["load_torque_nm"].append(round(float(t), 2))
            result["speed_rpm"].append(round(res["speed_rpm"], 1))
            result["slip_pct"].append(round(res["slip"] * 100.0, 2))
            result["i_line_a"].append(round(res["i_line"], 2))
            result["p_in_w"].append(round(res["p_in"], 1))
            result["p_out_w"].append(round(res["p_out"], 1))
            result["efficiency_pct"].append(round(res["efficiency"], 1))
            result["power_factor"].append(round(res["pf"], 3))
            result["total_losses_w"].append(round(res["total_losses"], 1))
            result["temp_c"].append(round(res["steady_state_temp"], 1))

        return result

    def sweep_induction_motor_torque_speed_full(
        self,
        machine_config: Dict[str, Any],
        points: int = 100
    ) -> Dict[str, List[float]]:
        """
        Sweeps slip across the entire spectrum s in [0.001, 1.0] (synchronous speed down to standstill).
        Calculates the complete classic Kloss torque-speed characteristic curve.
        """
        identity = machine_config.get("identity", {})
        params = machine_config.get("parameters", {})
        v_line = float(identity.get("rated_voltage", 415.0))
        freq = float(identity.get("frequency", 50.0))
        poles = int(identity.get("poles", 4))

        slips = np.linspace(0.001, 1.0, points)
        res_data = {
            "speed_rpm": [],
            "slip": [],
            "developed_torque_nm": [],
            "stator_current_a": []
        }

        for s in slips:
            c_res = self.im_solver.solve_circuit(
                v_line, freq, float(s),
                float(params.get("r1", 1.5)),
                float(params.get("x1", 3.5)),
                float(params.get("rc", 500.0)),
                float(params.get("xm", 80.0)),
                float(params.get("r2_prime", 1.8)),
                float(params.get("x2_prime", 3.5)),
                float(params.get("p_rot", 100.0)),
                poles
            )
            res_data["speed_rpm"].append(round(c_res["speed_rpm"], 1))
            res_data["slip"].append(round(float(s), 4))
            res_data["developed_torque_nm"].append(round(c_res["t_dev"], 2))
            res_data["stator_current_a"].append(round(c_res["i_line"], 2))

        return res_data
