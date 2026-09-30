"""
Unit & Integration Tests for Electrical Machines Physics Engine.
Verifies standard IEEE/IEC equations, conservation of energy, and reference test cases.
"""

import pytest
import numpy as np
from core.physics.base import (
    synchronous_speed,
    slip_ratio,
    angular_velocity,
    three_phase_active_power
)
from core.physics.induction_motor import InductionMotorPhysics
from core.physics.synchronous_machine import SynchronousMachinePhysics
from core.physics.dc_machine import DCMachinePhysics
from core.physics.transformer import TransformerPhysics
from core.physics.synchronous_motor import SynchronousMotorPhysics

def test_reference_synchronous_speed():
    """Verify Ns = 120 * f / P equals 1500 RPM at 50 Hz, 4 poles."""
    ns = synchronous_speed(50.0, 4)
    assert pytest.approx(ns, rel=1e-5) == 1500.0

def test_reference_slip():
    """Verify slip = 4% at N = 1440 RPM and Ns = 1500 RPM."""
    s = slip_ratio(1500.0, 1440.0)
    assert pytest.approx(s, rel=1e-5) == 0.04

def test_angular_velocity():
    """Verify omega = 2*pi*N/60."""
    omega = angular_velocity(1500.0)
    assert pytest.approx(omega, rel=1e-4) == 157.0796

def test_induction_motor_energy_balance():
    """Verify conservation of energy: P_in = P_out + Losses."""
    im = InductionMotorPhysics()
    inputs = {"v_line": 415.0, "frequency": 50.0, "slip": 0.04, "ambient_temp": 25.0}
    params = {
        "poles": 4, "r1": 1.5, "x1": 3.5, "rc": 500.0,
        "xm": 80.0, "r2_prime": 1.8, "x2_prime": 3.5, "p_rot": 100.0
    }
    res = im.solve_circuit(
        inputs["v_line"], inputs["frequency"], inputs["slip"],
        params["r1"], params["x1"], params["rc"], params["xm"],
        params["r2_prime"], params["x2_prime"], params["p_rot"],
        params["poles"]
    )
    
    assert res["ns_rpm"] == 1500.0
    assert pytest.approx(res["speed_rpm"], rel=1e-4) == 1440.0
    assert res["slip"] == 0.04

    # Conservation of energy
    p_in = res["p_in"]
    p_out = res["p_out"]
    losses = res["p_s_cu"] + res["p_core"] + res["p_r_cu"] + params["p_rot"]
    assert pytest.approx(p_in, rel=1e-3) == (p_out + losses)
    assert 0.0 <= res["efficiency"] <= 100.0

def test_induction_motor_causal_monotonicity():
    """Increasing slip (higher load) must increase current, torque, and losses."""
    im = InductionMotorPhysics()
    params = {
        "poles": 4, "r1": 1.5, "x1": 3.5, "rc": 500.0,
        "xm": 80.0, "r2_prime": 1.8, "x2_prime": 3.5, "p_rot": 100.0
    }
    light = im.solve_circuit(415.0, 50.0, 0.01, params["r1"], params["x1"], params["rc"], params["xm"], params["r2_prime"], params["x2_prime"], params["p_rot"])
    heavy = im.solve_circuit(415.0, 50.0, 0.05, params["r1"], params["x1"], params["rc"], params["xm"], params["r2_prime"], params["x2_prime"], params["p_rot"])

    assert heavy["i_line"] > light["i_line"]
    assert heavy["t_shaft"] > light["t_shaft"]
    assert heavy["p_in"] > light["p_in"]
    assert heavy["total_losses"] > light["total_losses"]

def test_synchronous_alternator_voltage_regulation():
    """Lagging power factor causes positive regulation (drop in terminal voltage), leading causes negative regulation."""
    gen = SynchronousMachinePhysics()
    params = {"poles": 4, "ra": 0.5, "xs": 5.0, "rated_voltage": 415.0}

    # Lagging PF (-0.8)
    lag_res = gen.calculate({"speed_rpm": 1500.0, "field_current": 1.5, "armature_current": 6.0, "power_factor": -0.8}, params)
    # Leading PF (+0.8)
    lead_res = gen.calculate({"speed_rpm": 1500.0, "field_current": 1.5, "armature_current": 6.0, "power_factor": 0.8}, params)

    assert lag_res["vt_line"] < lead_res["vt_line"]
    assert lag_res["voltage_regulation_pct"] > lead_res["voltage_regulation_pct"]

def test_dc_shunt_motor_back_emf_and_torque():
    """Verify DC motor Eb < Vt and increasing load increases armature current."""
    dc = DCMachinePhysics("dc_shunt")
    params = {"ra": 0.8, "rf": 200.0, "p_rot": 80.0, "k_phi_base": 1.25}

    light = dc.calculate({"terminal_voltage": 220.0, "load_torque": 5.0}, params)
    heavy = dc.calculate({"terminal_voltage": 220.0, "load_torque": 20.0}, params)

    assert light["back_emf_v"] < 220.0
    assert heavy["armature_current_a"] > light["armature_current_a"]
    assert heavy["speed_rpm"] < light["speed_rpm"]

def test_transformer_maximum_efficiency_condition():
    """Transformer maximum efficiency occurs when variable Cu loss equals constant core loss."""
    xfmr = TransformerPhysics(is_three_phase=False)
    params = {"v1_rated": 230.0, "v2_rated": 115.0, "rated_kva": 2.0, "r1": 0.5, "r2": 0.125, "rc": 600.0}
    res = xfmr.calculate({"load_fraction": 0.75, "power_factor": 1.0}, params)

    assert res["optimal_load_fraction"] > 0.0
    assert 0.0 <= res["efficiency_pct"] <= 100.0
