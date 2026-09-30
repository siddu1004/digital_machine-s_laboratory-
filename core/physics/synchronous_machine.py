"""
Synchronous Machine / Alternator Physics Model.
Implements the exact phasor relationship, voltage regulation, power-angle (delta) equation,
capability curves, and active/reactive power flow under variable excitation and power factor.
"""

import numpy as np
from typing import Dict, Any
from .base import MachinePhysicsModel, angular_velocity, synchronous_speed

class SynchronousMachinePhysics(MachinePhysicsModel):
    def __init__(self):
        super().__init__("3-Phase Synchronous Generator / Alternator")

    def get_validity_range(self) -> Dict[str, Any]:
        return {
            "speed_rpm": (500.0, 3600.0),
            "field_current": (0.0, 10.0),    # Amperes
            "armature_current": (0.0, 50.0), # Amperes
            "power_factor": (-1.0, 1.0),     # Negative=Lagging, Positive=Leading
            "ra": (0.05, 5.0),               # Ohms
            "xs": (0.5, 30.0),               # Ohms
            "poles": [2, 4, 6, 8]
        }

    def calculate(self, inputs: Dict[str, Any], params: Dict[str, Any]) -> Dict[str, Any]:
        speed_rpm = float(inputs.get("speed_rpm", 1500.0))
        field_current = float(inputs.get("field_current", 1.2))  # Amperes (If)
        armature_current = float(inputs.get("armature_current", 5.0))  # Amperes (Ia)
        power_factor = float(inputs.get("power_factor", -0.8))  # Negative = lagging, positive = leading
        ambient_temp = float(inputs.get("ambient_temp", 25.0))

        poles = int(params.get("poles", 4))
        ra = float(params.get("ra", 0.6))
        xs = float(params.get("xs", 4.8))
        rated_voltage_line = float(params.get("rated_voltage", 415.0))
        core_friction_loss = float(params.get("rot_loss", 250.0))

        # Synchronous frequency: f = (P * N) / 120
        frequency = (poles * speed_rpm) / 120.0

        # Open-circuit generated EMF per phase (incorporating non-linear magnetic saturation)
        # S-curve: Eph = k * (speed / N_rated) * tanh(c * If)
        base_emf_ph = (rated_voltage_line / np.sqrt(3.0))
        # Non-linear saturation curve:
        eph = base_emf_ph * (speed_rpm / 1500.0) * (2.0 * np.tanh(field_current / 1.5))
        eph_line = eph * np.sqrt(3.0)

        # Power factor angle
        is_lagging = power_factor < 0
        pf_abs = min(1.0, max(0.01, abs(power_factor)))
        phi = np.arccos(pf_abs)

        # In an alternator:
        # Eph^2 = (Vt + Ia*Ra*cos_phi +- Ia*Xs*sin_phi)^2 + (Ia*Xs*cos_phi -+ Ia*Ra*sin_phi)^2
        # where + is for lagging and - is for leading
        sign = 1.0 if is_lagging else -1.0
        
        # Vt^2 + 2*Vt*Ia*(Ra*cos_phi + sign*Xs*sin_phi) + Ia^2*(Ra^2 + Xs^2) - Eph^2 = 0
        b_term = 2.0 * armature_current * (ra * np.cos(phi) + sign * xs * np.sin(phi))
        c_term = (armature_current**2) * (ra**2 + xs**2) - (eph**2)
        discriminant = (b_term**2) - (4.0 * c_term)

        if discriminant >= 0:
            vt_ph = float((-b_term + np.sqrt(discriminant)) / 2.0)
            vt_ph = max(5.0, vt_ph)
        else:
            vt_ph = 5.0  # Collapsed voltage

        vt_line = float(vt_ph * np.sqrt(3.0))

        # Voltage regulation: VR = ((Eph - Vt_ph) / Vt_ph) * 100%
        voltage_regulation = float(((eph - vt_ph) / vt_ph) * 100.0) if vt_ph > 0 else 0.0

        # Power angle delta
        sin_delta = (armature_current * (xs * np.cos(phi) - sign * ra * np.sin(phi))) / eph if eph > 0 else 0.0
        sin_delta = min(1.0, max(-1.0, sin_delta))
        delta_deg = float(np.degrees(np.arcsin(sin_delta)))

        # Power calculations (3-phase)
        active_power = float(3.0 * vt_ph * armature_current * np.cos(phi))
        reactive_power = float(3.0 * vt_ph * armature_current * np.sin(phi) * (1.0 if is_lagging else -1.0))
        apparent_power = float(3.0 * vt_ph * armature_current)

        # Losses and efficiency
        armature_cu_loss = float(3.0 * (armature_current**2) * ra)
        field_cu_loss = float(field_current * 110.0) # Assuming 110V DC exciter source
        total_losses = armature_cu_loss + field_cu_loss + core_friction_loss

        efficiency = float((active_power / (active_power + total_losses) * 100.0) if (active_power + total_losses) > 0 else 0.0)
        efficiency = min(100.0, max(0.0, efficiency))

        winding_temp = ambient_temp + (total_losses * 0.05)

        return {
            "frequency_hz": float(frequency),
            "speed_rpm": float(speed_rpm),
            "eph": float(eph),
            "eph_line": float(eph_line),
            "vt_ph": float(vt_ph),
            "vt_line": float(vt_line),
            "armature_current": float(armature_current),
            "field_current": float(field_current),
            "power_factor": float(power_factor),
            "pf_abs": float(pf_abs),
            "power_factor_type": "Lagging" if is_lagging else "Leading" if power_factor > 0 else "Unity",
            "voltage_regulation_pct": float(voltage_regulation),
            "power_angle_delta_deg": float(delta_deg),
            "active_power_w": float(active_power),
            "reactive_power_var": float(reactive_power),
            "apparent_power_va": float(apparent_power),
            "armature_cu_loss_w": float(armature_cu_loss),
            "field_cu_loss_w": float(field_cu_loss),
            "total_losses_w": float(total_losses),
            "efficiency_pct": float(efficiency),
            "winding_temp_c": float(winding_temp)
        }
