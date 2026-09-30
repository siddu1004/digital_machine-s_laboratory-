"""
Canonical Electrical Machines Physics Base Module.
Defines foundational electromechanical formulas, units, and base classes.
All calculations follow IEEE/IEC conventions and standard SI units.
"""

import numpy as np
from abc import ABC, abstractmethod
from typing import Dict, Any

class MachinePhysicsModel(ABC):
    """Abstract base class for all electrical machine physics models."""
    
    def __init__(self, name: str):
        self.name = name

    @abstractmethod
    def calculate(self, inputs: Dict[str, Any], params: Dict[str, Any]) -> Dict[str, Any]:
        """Compute electrical, mechanical, and thermal state from inputs and parameters."""
        pass

    @abstractmethod
    def get_validity_range(self) -> Dict[str, Any]:
        """Return acceptable engineering bounds for inputs and parameters."""
        pass

# Standard Electromechanical Relations
def angular_velocity(rpm: float) -> float:
    """Convert speed from RPM to mechanical radians per second: omega = 2*pi*N / 60."""
    return (2.0 * np.pi * rpm) / 60.0

def synchronous_speed(frequency_hz: float, poles: int) -> float:
    """Synchronous speed Ns = 120 * f / P (RPM)."""
    if poles <= 0:
        raise ValueError("Number of poles must be a positive even integer.")
    return (120.0 * frequency_hz) / float(poles)

def slip_ratio(synchronous_rpm: float, actual_rpm: float) -> float:
    """Compute per-unit slip: s = (Ns - N) / Ns."""
    if synchronous_rpm <= 0:
        return 0.0
    return (synchronous_rpm - actual_rpm) / synchronous_rpm

def three_phase_apparent_power(v_line: float, i_line: float) -> float:
    """S = sqrt(3) * V_line * I_line (VA)."""
    return np.sqrt(3.0) * float(v_line) * float(i_line)

def three_phase_active_power(v_line: float, i_line: float, power_factor: float) -> float:
    """P = sqrt(3) * V_line * I_line * cos(phi) (Watts)."""
    return np.sqrt(3.0) * float(v_line) * float(i_line) * float(power_factor)

def three_phase_reactive_power(v_line: float, i_line: float, power_factor: float) -> float:
    """Q = sqrt(3) * V_line * I_line * sin(phi) (VAr)."""
    sin_phi = np.sqrt(max(0.0, 1.0 - power_factor**2))
    return np.sqrt(3.0) * float(v_line) * float(i_line) * sin_phi

def mechanical_power(torque_nm: float, speed_rpm: float) -> float:
    """P_mech = Torque * omega (Watts)."""
    omega = angular_velocity(speed_rpm)
    return float(torque_nm) * omega
