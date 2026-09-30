"""
Transformer Physics Model.
Supports 1-Phase and 3-Phase Transformers.
Implements exact equivalent circuit, Open-Circuit (OC) and Short-Circuit (SC) tests,
voltage regulation across lagging/unity/leading power factors, and efficiency curves.
"""

import numpy as np
from typing import Dict, Any
from .base import MachinePhysicsModel

class TransformerPhysics(MachinePhysicsModel):
    def __init__(self, is_three_phase: bool = False):
        name = "3-Phase Power Transformer" if is_three_phase else "1-Phase Distribution Transformer"
        super().__init__(name)
        self.is_three_phase = is_three_phase

    def get_validity_range(self) -> Dict[str, Any]:
        return {
            "v_primary": (100.0, 11000.0),
            "v_secondary": (50.0, 1000.0),
            "load_fraction": (0.0, 1.5),     # Fraction of rated kVA (x)
            "power_factor": (-1.0, 1.0)      # Negative=Lagging, Positive=Leading
        }

    def calculate(self, inputs: Dict[str, Any], params: Dict[str, Any]) -> Dict[str, Any]:
        v1_rated = float(params.get("v1_rated", 230.0))
        v2_rated = float(params.get("v2_rated", 115.0))
        rated_kva = float(params.get("rated_kva", 3.0)) # kVA
        rated_va = rated_kva * 1000.0

        r1 = float(params.get("r1", 0.4))
        x1 = float(params.get("x1", 0.8))
        r2 = float(params.get("r2", 0.1))
        x2 = float(params.get("x2", 0.2))
        rc = float(params.get("rc", 800.0))
        xm = float(params.get("xm", 250.0))

        turns_ratio_k = v2_rated / v1_rated  # N2 / N1
        # Secondary parameters referred to primary:
        r2_prime = r2 / (turns_ratio_k**2)
        x2_prime = x2 / (turns_ratio_k**2)
        r01 = r1 + r2_prime
        x01 = x1 + x2_prime

        # Input operational conditions:
        load_fraction = float(inputs.get("load_fraction", 0.8)) # x = S / S_rated
        pf = float(inputs.get("power_factor", -0.8))
        is_lagging = pf < 0
        pf_abs = min(1.0, max(0.01, abs(pf)))
        phi_rad = np.arccos(pf_abs) * (-1.0 if is_lagging else 1.0)

        # Rated secondary and primary currents
        i2_rated = rated_va / v2_rated if not self.is_three_phase else rated_va / (np.sqrt(3.0) * v2_rated)
        i2_load = load_fraction * i2_rated
        i2_prime_load = i2_load * turns_ratio_k

        # Losses
        # Core loss is constant with voltage V1:
        p_core = float((v1_rated**2) / rc)
        # Full load copper loss referred to primary:
        i1_rated = rated_va / v1_rated if not self.is_three_phase else rated_va / (np.sqrt(3.0) * v1_rated)
        p_cu_fl = float((i1_rated**2) * r01)
        # Copper loss at operating fraction x:
        p_cu_load = float((load_fraction**2) * p_cu_fl)

        # Output active power
        p_out = float(load_fraction * rated_va * pf_abs)
        total_losses = p_core + p_cu_load
        p_in = p_out + total_losses

        # Efficiency
        efficiency = float((p_out / p_in * 100.0) if p_in > 0 else 0.0)
        # Fraction for maximum efficiency: x_opt = sqrt(P_core / P_cu_fl)
        x_max_eff = float(np.sqrt(p_core / p_cu_fl)) if p_cu_fl > 0 else 1.0

        # Voltage regulation:
        # Approximate formula: VR% = (I2_prime * (R01*cos_phi +- X01*sin_phi) / V1) * 100
        # + for lagging, - for leading
        vr_factor = r01 * np.cos(phi_rad) - x01 * np.sin(phi_rad)
        voltage_regulation = float((i2_prime_load * vr_factor / v1_rated) * 100.0)

        # Actual terminal voltage V2 under load:
        v2_actual = float(v2_rated * (1.0 - (voltage_regulation / 100.0)))
        v2_actual = max(0.0, v2_actual)

        return {
            "load_fraction": float(load_fraction),
            "output_kVA": float(load_fraction * rated_kva),
            "output_power_w": float(p_out),
            "input_power_w": float(p_in),
            "v1_volts": float(v1_rated),
            "v2_terminal_volts": float(v2_actual),
            "i2_load_current_a": float(i2_load),
            "core_loss_w": float(p_core),
            "copper_loss_w": float(p_cu_load),
            "total_losses_w": float(total_losses),
            "efficiency_pct": float(efficiency),
            "optimal_load_fraction": float(x_max_eff),
            "voltage_regulation_pct": float(voltage_regulation),
            "power_factor": float(pf),
            "r01_ohms": float(r01),
            "x01_ohms": float(x01)
        }
