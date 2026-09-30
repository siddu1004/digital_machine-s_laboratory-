"""
DC Machines Physics Model.
Supports DC Shunt, DC Series, Compound, and Separately Excited DC Motors/Generators.
Calculates back EMF, electromechanical torque, non-linear field flux, speed regulation,
and energy efficiency.
"""

import numpy as np
from typing import Dict, Any
from .base import MachinePhysicsModel, angular_velocity

class DCMachinePhysics(MachinePhysicsModel):
    def __init__(self, machine_type: str = "dc_shunt"):
        super().__init__(f"DC Machine ({machine_type})")
        self.machine_type = machine_type

    def get_validity_range(self) -> Dict[str, Any]:
        return {
            "terminal_voltage": (10.0, 600.0), # Volts
            "load_torque": (0.0, 100.0),        # Nm
            "ra": (0.05, 5.0),                  # Armature resistance
            "rf": (50.0, 500.0),                # Shunt field resistance
            "rse": (0.02, 1.0),                 # Series field resistance
            "field_rheostat": (0.0, 250.0)      # External field control
        }

    def calculate(self, inputs: Dict[str, Any], params: Dict[str, Any]) -> Dict[str, Any]:
        vt = float(inputs.get("terminal_voltage", 220.0))
        load_torque = float(inputs.get("load_torque", 10.0)) # Nm
        field_rheo = float(inputs.get("field_rheostat", 0.0))
        armature_rheo = float(inputs.get("armature_rheostat", 0.0))
        ambient_temp = float(inputs.get("ambient_temp", 25.0))

        ra = float(params.get("ra", 0.8)) + armature_rheo
        rf_base = float(params.get("rf", 180.0))
        rf_total = rf_base + field_rheo
        rse = float(params.get("rse", 0.15))
        k_phi_base = float(params.get("k_phi_base", 1.25))
        p_rot = float(params.get("p_rot", 80.0))
        brush_drop = float(params.get("brush_drop", 2.0))

        m_type = params.get("machine_type", self.machine_type)

        if m_type == "dc_shunt":
            i_field = vt / rf_total if rf_total > 0 else 0.0
            # Field flux with magnetic saturation
            flux_pu = np.tanh(i_field / (vt / rf_base))
            k_phi = k_phi_base * max(0.05, flux_pu)

            # Torque equation: T_dev = k_phi * Ia => Ia = (load_torque + T_rot) / k_phi
            # Initial guess for rotational torque:
            t_rot = p_rot / angular_velocity(1500.0)
            t_total_needed = load_torque + t_rot
            i_a = t_total_needed / k_phi
            
            # Back EMF: Eb = Vt - Ia * Ra - brush_drop
            eb = vt - (i_a * ra) - brush_drop
            eb = max(0.0, eb)

            # Speed: omega_m = Eb / k_phi
            omega_m = eb / k_phi
            speed_rpm = float((omega_m * 60.0) / (2.0 * np.pi))

            i_line = i_a + i_field

        elif m_type == "dc_series":
            # In series motor, Ia = I_field = I_line, and flux is proportional to Ia
            # T_dev = k_series * Ia^2
            k_series = float(params.get("k_series", 0.045))
            t_total = max(0.1, load_torque + 0.5)
            # Ia = sqrt(T / k_series)
            i_a = np.sqrt(t_total / k_series)
            i_field = i_a
            i_line = i_a

            total_r = ra + rse
            eb = vt - (i_a * total_r) - brush_drop
            eb = max(0.0, eb)

            # Field flux is proportional to Ia
            k_phi = np.sqrt(k_series * t_total)
            omega_m = eb / k_phi if k_phi > 0 else 0.0
            # Physical safety limit on series runaway
            speed_rpm = min(4000.0, float((omega_m * 60.0) / (2.0 * np.pi)))

        else: # Separately excited
            v_field = float(inputs.get("v_field", 220.0))
            i_field = v_field / rf_total if rf_total > 0 else 0.0
            flux_pu = np.tanh(i_field / 1.0)
            k_phi = k_phi_base * max(0.05, flux_pu)

            t_total_needed = load_torque + (p_rot / max(1.0, angular_velocity(1500.0)))
            i_a = t_total_needed / k_phi
            eb = vt - (i_a * ra) - brush_drop
            eb = max(0.0, eb)
            omega_m = eb / k_phi
            speed_rpm = float((omega_m * 60.0) / (2.0 * np.pi))
            i_line = i_a

        # Power flow
        p_in = float(vt * i_line)
        p_mech_dev = float(eb * i_a)
        p_out = float(max(0.0, load_torque * omega_m))
        p_cu_armature = float((i_a**2) * ra)
        p_cu_field = float((i_field**2) * rf_total) if m_type != "dc_series" else float((i_a**2) * rse)
        total_losses = p_cu_armature + p_cu_field + p_rot + (i_a * brush_drop)

        efficiency = float((p_out / p_in * 100.0) if p_in > 0 else 0.0)
        efficiency = min(100.0, max(0.0, efficiency))

        winding_temp = ambient_temp + (total_losses * 0.05)

        return {
            "terminal_voltage_v": float(vt),
            "speed_rpm": float(speed_rpm),
            "back_emf_v": float(eb),
            "armature_current_a": float(i_a),
            "field_current_a": float(i_field),
            "line_current_a": float(i_line),
            "load_torque_nm": float(load_torque),
            "developed_torque_nm": float(t_total_needed if m_type != "dc_series" else t_total),
            "input_power_w": float(p_in),
            "output_power_w": float(p_out),
            "armature_cu_loss_w": float(p_cu_armature),
            "field_cu_loss_w": float(p_cu_field),
            "total_losses_w": float(total_losses),
            "efficiency_pct": float(efficiency),
            "winding_temp_c": float(winding_temp)
        }
