"""
Unit & Integration Tests for Simulation Engine, State Machine, and Protection System.
Verifies the canonical lifecycle, causal reactions, and fault trip sequences.
"""

import pytest
from core.simulation.state_machine import MachineStateMachine, MachineState
from core.simulation.protection import ProtectionSystem
from core.simulation.engine import SimulationEngine
from core.models.nameplate import NameplateManager

def test_state_machine_valid_transitions():
    sm = MachineStateMachine("test_im")
    assert sm.get_state() == MachineState.OFF

    assert sm.transition_to(MachineState.STARTING, "Starting motor")
    assert sm.get_state() == MachineState.STARTING

    assert sm.transition_to(MachineState.RUNNING, "Reached rated speed")
    assert sm.get_state() == MachineState.RUNNING

    assert sm.transition_to(MachineState.LOADED, "Applied shaft load")
    assert sm.get_state() == MachineState.LOADED

    assert sm.transition_to(MachineState.OVERLOADED, "Exceeded rated torque")
    assert sm.get_state() == MachineState.OVERLOADED

def test_state_machine_invalid_transition_rejected():
    sm = MachineStateMachine("test_im")
    # Cannot jump directly from OFF to LOADED without starting/running
    assert not sm.transition_to(MachineState.LOADED, "Direct invalid jump")
    assert sm.get_state() == MachineState.OFF

def test_emergency_stop_from_any_state():
    sm = MachineStateMachine("test_im")
    sm.transition_to(MachineState.STARTING, "Start")
    # Immediate e-stop must always succeed
    assert sm.transition_to(MachineState.EMERGENCY_STOP, "E-Stop pressed")
    assert sm.get_state() == MachineState.EMERGENCY_STOP

def test_simulation_causal_feedback():
    mgr = NameplateManager()
    m_config = mgr.get_machine("im_415v_5hp")
    sim = SimulationEngine(m_config)

    sim.start_machine()
    # At zero load
    telem_noload = sim.step()
    speed_noload = telem_noload["speed_rpm"]

    # Apply 15 Nm mechanical load
    sim.set_load_torque(15.0)
    for _ in range(5):
        telem_loaded = sim.step()

    # Causal validation: speed must drop, slip must rise, current must rise
    assert telem_loaded["speed_rpm"] < speed_noload
    assert telem_loaded["slip"] > telem_noload["slip"]
    assert telem_loaded["i_line"] > telem_noload["i_line"]
    assert telem_loaded["power_in_w"] > telem_noload["power_in_w"]

    # Verify educational causal chain is generated
    causal = sim.get_causal_chain()
    assert len(causal) > 0

def test_protection_overload_trip():
    mgr = NameplateManager()
    m_config = mgr.get_machine("im_415v_5hp")
    sim = SimulationEngine(m_config)
    sim.start_machine()

    # Inject overload fault
    sim.protection.inject_fault("overload")
    sim.step()

    # Protection must trip and machine state must transition to FAULT
    assert sim.protection.tripped
    assert sim.state_machine.get_state() == MachineState.FAULT
    assert len(sim.protection.get_incident_history()) > 0
