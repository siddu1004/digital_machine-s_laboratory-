"""
Induction Motor Physics Model.
Implements the exact IEEE per-phase equivalent circuit, electromechanical torque,
power flow breakdown, thermal dynamics, and operating point equilibrium solver.
"""

import numpy as np
from typing import Dict, Any
from .base import (
    MachinePhysicsModel,
    angular_velocity,
    synchronous_speed,
    slip_ratio
)

class InductionMotorPhysics(MachinePhysicsModel):
    def __init__(self):
        super().__init__("3-Phase Squirrel-Cage Induction Motor")

    def get_validity_range(self) -> Dict[str, Any]:
        return {
            "v_line": (50.0, 1000.0),       # Volts
            "frequency": (10.0, 120.0),      # Hertz
            "poles": [2, 4, 6, 8, 10, 12],
            "r1": (0.05, 20.0),             # Ohms
            "r2_prime": (0.05, 20.0),       # Ohms
            "x1": (0.1, 50.0),              # Ohms
            "x2_prime": (0.1, 50.0),        # Ohms
            "xm": (5.0, 500.0),             # Ohms
            "rc": (50.0, 5000.0),           # Ohms
            "p_rot": (0.0, 2000.0),         # Watts
            "ambient_temp": (-20.0, 70.0)   # Deg C
        }

    def solve_circuit(
        self,
        v_line: float,
        frequency: float,
        slip: float,
        r1: float,
        x1: float,
        rc: float,
        xm: float,
        r2_prime: float,
        x2_prime: float,
        p_rot: float,
        poles: int = 4,
        ambient_temp: float = 25.0
    ) -> Dict[str, Any]:
        """
        Solves the per-phase equivalent circuit using exact complex phasor algebra.
        """
        # Electrical & mechanical speeds
        v_ph = float(v_line) / np.sqrt(3.0)
        ns_rpm = synchronous_speed(frequency, poles)
        omega_s = angular_velocity(ns_rpm)
        
        # Enforce physical boundary on slip
        s = float(slip)
        # Avoid zero division when slip is identically zero
        effective_slip = s if abs(s) > 1e-7 else 1e-7
        
        speed_rpm = (1.0 - s) * ns_rpm
        omega_m = angular_velocity(speed_rpm) if speed_rpm > 0 else 0.0

        # Impedances
        z1 = complex(r1, x1)
        ym = (1.0 / rc) + (1.0 / (1j * xm))
        zm = 1.0 / ym

        z2 = complex(r2_prime / effective_slip, x2_prime)
        zp = (zm * z2) / (zm + z2)
        zin = z1 + zp

        zin_mag = abs(zin)
        if zin_mag <= 0:
            zin_mag = 1e-6

        # Stator Phase Current
        i1 = v_ph / zin
        i1_mag = abs(i1)
        i1_angle_rad = np.angle(i1)

        # Power factor
        pf = float(np.cos(i1_angle_rad))
        # Total active input power across 3 phases
        p_in = float(3.0 * np.real(v_ph * np.conj(i1)))
        s_in = float(np.sqrt(3.0) * v_line * i1_mag)
        q_in = float(np.sqrt(max(0.0, s_in**2 - p_in**2)))

        # Air-gap EMF and Rotor current
        e1 = v_ph - i1 * z1
        e1_mag = abs(e1)

        i2_prime = e1 / z2
        i2_prime_mag = abs(i2_prime)

        # Loss and power balance components
        p_s_cu = float(3.0 * (i1_mag**2) * r1)
        p_core = float(3.0 * (e1_mag**2) / rc)
        p_ag = float(3.0 * (i2_prime_mag**2) * (r2_prime / effective_slip))
        p_r_cu = float(effective_slip * p_ag)
        p_conv = float((1.0 - effective_slip) * p_ag)

        p_out = float(max(0.0, p_conv - p_rot))
        t_dev = float(p_ag / omega_s) if omega_s > 0 else 0.0
        t_shaft = float(p_out / omega_m) if omega_m > 0 else 0.0

        efficiency = float((p_out / p_in * 100.0) if p_in > 0 else 0.0)
        # Cap efficiency at physical 100%
        efficiency = min(100.0, max(0.0, efficiency))

        # Thermal calculation (lumped thermal capacitance model)
        total_losses = p_s_cu + p_core + p_r_cu + p_rot
        thermal_resistance = 0.045  # °C/W
        steady_state_temp = ambient_temp + (total_losses * thermal_resistance)

        return {
            "ns_rpm": float(ns_rpm),
            "speed_rpm": float(speed_rpm),
            "slip": float(s),
            "v_line": float(v_line),
            "v_ph": float(v_ph),
            "i_line": float(i1_mag),
            "i1_mag": float(i1_mag),
            "i2_prime_mag": float(i2_prime_mag),
            "e1_mag": float(e1_mag),
            "pf": float(pf),
            "p_in": float(p_in),
            "s_in": float(s_in),
            "q_in": float(q_in),
            "p_s_cu": float(p_s_cu),
            "p_core": float(p_core),
            "p_ag": float(p_ag),
            "p_r_cu": float(p_r_cu),
            "p_conv": float(p_conv),
            "p_out": float(p_out),
            "t_dev": float(t_dev),
            "t_shaft": float(t_shaft),
            "efficiency": float(efficiency),
            "total_losses": float(total_losses),
            "steady_state_temp": float(steady_state_temp),
            "ambient_temp": float(ambient_temp)
        }

    def find_operating_point_for_torque(
        self,
        target_torque: float,
        v_line: float,
        frequency: float,
        r1: float,
        x1: float,
        rc: float,
        xm: float,
        r2_prime: float,
        x2_prime: float,
        p_rot: float,
        poles: int = 4,
        ambient_temp: float = 25.0
    ) -> Dict[str, Any]:
        """
        Solves for the stable operating slip where motor developed torque equals target load torque.
        Uses bisection over the normal stable motoring region s in [0.0, 0.25].
        """
        if target_torque <= 0:
            return self.solve_circuit(v_line, frequency, 0.001, r1, x1, rc, xm, r2_prime, x2_prime, p_rot, poles, ambient_temp)

        low_s = 0.0001
        high_s = 0.35
        best_res = None

        for _ in range(30):
            mid_s = 0.5 * (low_s + high_s)
            res = self.solve_circuit(v_line, frequency, mid_s, r1, x1, rc, xm, r2_prime, x2_prime, p_rot, poles, ambient_temp)
            best_res = res
            diff = res["t_shaft"] - target_torque

            if abs(diff) < 0.01:
                break
            if diff < 0:
                # Torque is insufficient, need higher slip
                low_s = mid_s
            else:
                high_s = mid_s

        return best_res

    def calculate(self, inputs: Dict[str, Any], params: Dict[str, Any]) -> Dict[str, Any]:
        v_line = inputs.get("v_line", 415.0)
        frequency = inputs.get("frequency", 50.0)
        poles = int(params.get("poles", 4))
        ambient_temp = inputs.get("ambient_temp", 25.0)

        r1 = params.get("r1", 1.5)
        x1 = params.get("x1", 3.5)
        rc = params.get("rc", 500.0)
        xm = params.get("xm", 80.0)
        r2_prime = params.get("r2_prime", 1.8)
        x2_prime = params.get("x2_prime", 3.5)
        p_rot = params.get("p_rot", 100.0)

        # If load_torque is given, find equilibrium; else use explicit slip
        if "load_torque" in inputs and inputs.get("mode") == "torque_driven":
            return self.find_operating_point_for_torque(
                inputs["load_torque"], v_line, frequency, r1, x1, rc, xm, r2_prime, x2_prime, p_rot, poles, ambient_temp
            )
        else:
            slip = inputs.get("slip", 0.04)
            return self.solve_circuit(
                v_line, frequency, slip, r1, x1, rc, xm, r2_prime, x2_prime, p_rot, poles, ambient_temp
            )
