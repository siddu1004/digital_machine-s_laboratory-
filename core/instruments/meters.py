"""
Virtual Instrumentation Module.
Every virtual instrument reads strictly from the active telemetry bus.
Simulates realistic instrument ranges, resolution, and instantaneous waveform sampling for oscilloscope.
"""

import numpy as np
from typing import Dict, Any, List

class VirtualInstruments:
    def __init__(self):
        self.energy_wh = 0.0
        self.last_timestamp = 0.0

    def update_energy(self, power_w: float, dt_seconds: float):
        self.energy_wh += (power_w * (dt_seconds / 3600.0))

    def read_all(self, telemetry: Dict[str, Any]) -> Dict[str, Any]:
        """
        Reads from current machine telemetry and returns standard laboratory instrument measurements.
        """
        v_line = telemetry.get("v_line", 0.0)
        i_line = telemetry.get("i_line", 0.0)
        p_w = telemetry.get("power_in_w", 0.0)
        pf = telemetry.get("power_factor", 1.0)
        speed = telemetry.get("speed_rpm", 0.0)
        torque = telemetry.get("torque_nm", 0.0)
        temp_c = telemetry.get("winding_temp_c", 25.0)

        # Update integrated energy
        self.update_energy(p_w, 0.05)

        # Multimeter
        dmm = {
            "mode": "AC RMS",
            "voltage_v": round(v_line, 2),
            "current_a": round(i_line, 2),
            "frequency_hz": 50.0 if v_line > 10.0 else 0.0
        }

        # 3-Phase Power Meter (Two-Wattmeter method representation: W1 + W2 = P)
        s_va = np.sqrt(3.0) * v_line * i_line
        p_kw = p_w / 1000.0
        q_kvar = (np.sqrt(max(0.0, s_va**2 - p_w**2))) / 1000.0
        s_kva = s_va / 1000.0

        # Two-wattmeter breakdown: P = W1 + W2, tan(phi) = sqrt(3)*(W1 - W2)/(W1 + W2)
        phi_rad = np.arccos(min(1.0, max(0.0, pf)))
        w1_w = (v_line * i_line / np.sqrt(3.0)) * np.cos(np.radians(30.0) - phi_rad)
        w2_w = (v_line * i_line / np.sqrt(3.0)) * np.cos(np.radians(30.0) + phi_rad)

        power_meter = {
            "voltage_line_v": round(v_line, 1),
            "current_line_a": round(i_line, 2),
            "active_power_kw": round(p_kw, 3),
            "reactive_power_kvar": round(q_kvar, 3),
            "apparent_power_kva": round(s_kva, 3),
            "power_factor": round(pf, 3),
            "w1_watts": round(w1_w, 1),
            "w2_watts": round(w2_w, 1)
        }

        # Tachometer & Torque
        tachometer = {
            "speed_rpm": round(speed, 1),
            "angular_speed_rad_s": round((2.0 * np.pi * speed) / 60.0, 2)
        }
        torque_meter = {
            "shaft_torque_nm": round(torque, 2)
        }

        # Energy Meter
        energy_meter = {
            "energy_wh": round(self.energy_wh, 2),
            "energy_kwh": round(self.energy_wh / 1000.0, 4)
        }

        # Thermal Sensor
        temp_sensor = {
            "winding_temperature_c": round(temp_c, 1),
            "status": "NORMAL" if temp_c < 100.0 else "HIGH" if temp_c < 125.0 else "TRIP"
        }

        return {
            "dmm": dmm,
            "power_meter": power_meter,
            "tachometer": tachometer,
            "torque_meter": torque_meter,
            "energy_meter": energy_meter,
            "temperature_sensor": temp_sensor
        }

    def sample_oscilloscope_waveforms(self, telemetry: Dict[str, Any], num_samples: int = 100) -> Dict[str, Any]:
        """
        Samples sinusoidal phase voltage and current waveforms based strictly on telemetry parameters.
        """
        v_rms = telemetry.get("v_line", 415.0) / np.sqrt(3.0)
        i_rms = telemetry.get("i_line", 5.0)
        pf = telemetry.get("power_factor", 0.85)
        phi = np.arccos(min(1.0, max(-1.0, pf)))

        v_peak = v_rms * np.sqrt(2.0)
        i_peak = i_rms * np.sqrt(2.0)
        f = 50.0  # Hz
        t = np.linspace(0, 0.04, num_samples)  # 2 full cycles at 50Hz (40ms)

        # 3-Phase voltages
        va = (v_peak * np.sin(2 * np.pi * f * t)).tolist()
        vb = (v_peak * np.sin(2 * np.pi * f * t - (2 * np.pi / 3))).tolist()
        vc = (v_peak * np.sin(2 * np.pi * f * t + (2 * np.pi / 3))).tolist()

        # Phase currents lagging by phi
        ia = (i_peak * np.sin(2 * np.pi * f * t - phi)).tolist()
        ib = (i_peak * np.sin(2 * np.pi * f * t - (2 * np.pi / 3) - phi)).tolist()
        ic = (i_peak * np.sin(2 * np.pi * f * t + (2 * np.pi / 3) - phi)).tolist()

        return {
            "time_axis_ms": [round(x * 1000.0, 2) for x in t],
            "va": [round(x, 1) for x in va],
            "vb": [round(x, 1) for x in vb],
            "vc": [round(x, 1) for x in vc],
            "ia": [round(x, 2) for x in ia],
            "ib": [round(x, 2) for x in ib],
            "ic": [round(x, 2) for x in ic],
            "phase_angle_deg": round(float(np.degrees(phi)), 1)
        }
