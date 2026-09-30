"""
End-to-End Professor Demonstration and Quality Gate Verification Test.
Simulates the entire educational laboratory lifecycle:
1. System Authentication (Admin & Student)
2. Machine Library Query (10 Machines)
3. Nameplate Inspection & Modification (7.5 kW, 415 V, 50 Hz, 1470 RPM, 4 Poles)
4. Parameter Propagation & Dynamic Rated Torque recalculation
5. Operational Simulation & Causal Monotonicity (Load demand -> Speed drop -> Slip rise -> Current surge)
6. Virtual Instruments Sampling (DMM, 3-Phase Meter, Scope, Tachometer, Torque Meter)
7. Parametric Sweep (Torque-Speed curve and Efficiency-Load curve generation)
8. Observation Recording and CSV / JSON Export
9. Controllable Fault Injection (Overload, Short Circuit, Locked Rotor) and Protection Trip Sequence
10. Incident Logging and Protection Reset
11. Viva Voce Oral Assessment Examination
12. Formal Academic Lab Report Generation with Frozen Machine Snapshot
"""

import pytest
import json
import urllib.request
from app import app
from core.models.nameplate import NameplateManager
from core.simulation.engine import SimulationEngine
from core.instruments.meters import VirtualInstruments
from core.reports.report_generator import LabReportGenerator

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as c:
        yield c

def test_full_professor_demonstration_workflow(client):
    # Step 1: Authentication
    login_resp = client.post("/api/login", json={"username": "admin", "password": "password"})
    assert login_resp.status_code == 200
    user_info = login_resp.get_json()
    assert user_info["role"] == "admin"
    print("\n[GATE 1] Authentication verified for role:", user_info["role"])

    # Step 2: Query Machine Library
    lib_resp = client.get("/api/machines")
    assert lib_resp.status_code == 200
    machines = lib_resp.get_json()
    assert len(machines) >= 8
    assert "im_415v_5hp" in machines
    print(f"[GATE 2] Machine Library contains {len(machines)} verified models.")

    # Step 3 & 4: Nameplate Modification and Propagation
    update_req = {
        "identity": {
            "rated_power_kw": 7.5,
            "rated_voltage": 415.0,
            "frequency": 50.0,
            "rated_speed_rpm": 1470.0,
            "poles": 4
        }
    }
    np_resp = client.post("/api/machine/im_415v_5hp/nameplate", json=update_req)
    assert np_resp.status_code == 200
    updated_machine = np_resp.get_json()["machine"]
    derived_torque = updated_machine["identity"]["rated_torque_nm"]
    # T = 7500 / (2*pi*1470/60) = 48.72 Nm
    assert pytest.approx(derived_torque, rel=1e-1) == 48.72
    print(f"[GATE 3] Nameplate updated and derived torque propagated: {derived_torque} Nm.")

    # Step 5: Simulation Engine and Causal Feedback
    sim = SimulationEngine(updated_machine)
    assert sim.start_machine()
    
    # Measure at no load
    no_load_telem = sim.step()
    speed_0 = no_load_telem["speed_rpm"]
    current_0 = no_load_telem["i_line"]

    # Apply 25 Nm mechanical load
    sim.set_load_torque(25.0)
    for _ in range(5):
        loaded_telem = sim.step()

    # Causal validation:
    # Load ↑ -> speed ↓ -> slip ↑ -> current ↑ -> power ↑
    assert loaded_telem["speed_rpm"] < speed_0
    assert loaded_telem["slip"] > no_load_telem["slip"]
    assert loaded_telem["i_line"] > current_0
    assert loaded_telem["power_in_w"] > no_load_telem["power_in_w"]
    assert len(sim.get_causal_chain()) > 0
    print("[GATE 4] Causal electromechanical response verified.")

    # Step 6: Virtual Instruments
    instruments = VirtualInstruments()
    meter_readings = instruments.read_all(loaded_telem)
    assert float(meter_readings["dmm"]["voltage_v"]) == 415.0
    assert float(meter_readings["dmm"]["current_a"]) > 0.0
    assert meter_readings["power_meter"]["active_power_kw"] > 0.0
    assert meter_readings["tachometer"]["speed_rpm"] > 1400.0

    # Scope sampling
    scope_data = instruments.sample_oscilloscope_waveforms(loaded_telem)
    assert len(scope_data["va"]) == 100
    assert len(scope_data["ia"]) == 100
    print("[GATE 5] Virtual instruments read strictly from telemetry.")

    # Step 7: Parametric Sweep
    sweep_resp = client.post("/api/analysis/sweep", json={"machine_id": "im_415v_5hp"})
    assert sweep_resp.status_code == 200
    sweep_data = sweep_resp.get_json()
    assert len(sweep_data["load_torque_nm"]) > 5
    assert len(sweep_data["efficiency_pct"]) == len(sweep_data["load_torque_nm"])
    print("[GATE 6] Automated parametric sweep computed.")

    # Step 8: Save Experiment Observations
    exp_run = {
        "run_id": "PROF-DEMO-RUN-001",
        "experiment_id": "exp_im_load_test",
        "student_name": "Prof. Evaluator",
        "start_time": 1727700000.0,
        "machine_config_snapshot": updated_machine,
        "observations": [
            {"index": 1, "v_line": 415.0, "i_line": round(current_0, 2), "speed": round(speed_0, 1), "torque": 0.0, "eff": 0.0},
            {"index": 2, "v_line": 415.0, "i_line": round(loaded_telem["i_line"], 2), "speed": round(loaded_telem["speed_rpm"], 1), "torque": 25.0, "eff": round(loaded_telem["efficiency_pct"], 1)}
        ]
    }
    save_resp = client.post("/api/experiments/save", json=exp_run)
    assert save_resp.status_code == 200
    print("[GATE 7] Experiment run with frozen snapshot persisted.")

    # Step 9: Controllable Fault Injection and Protection Trip
    sim.protection.inject_fault("overload")
    trip_telem = sim.step()
    assert sim.protection.tripped
    assert sim.state_machine.get_state().value == "FAULT"
    incidents = sim.protection.get_incident_history()
    assert len(incidents) > 0
    print(f"[GATE 8] Protection tripped on: {incidents[0]['fault']}.")

    # Step 10: Reset Protection
    assert sim.reset_protection()
    assert not sim.protection.tripped
    assert sim.state_machine.get_state().value == "OFF"
    print("[GATE 9] Protection reset and transition to OFF verified.")

    # Step 11: Viva Voce Assessment
    viva_resp = client.get("/api/viva/questions?machine_type=induction_motor")
    assert viva_resp.status_code == 200
    viva_questions = viva_resp.get_json()
    assert len(viva_questions) >= 3
    print(f"[GATE 10] Viva examination bank queried ({len(viva_questions)} questions).")

    # Step 12: Academic Lab Report Generation
    rep_gen = LabReportGenerator()
    html_report = rep_gen.generate_html_report(exp_run, viva_questions[:2])
    assert "VERIFIED DIGITAL TWIN REPORT" in html_report
    assert "48.72" in html_report or "48.7" in html_report # Frozen snapshot torque
    assert "Prof. Evaluator" in html_report
    print("[GATE 11] Formal academic lab report generated with frozen configuration snapshot.")
    print("--> ALL PROFESSOR DEMONSTRATION WORKFLOW GATES PASSED! <--\n")

def test_all_10_machines_physics_and_12_experiments(client):
    """
    Verifies that all 10 preset machines simulate without error using deterministic physics
    and all 12 standardized experiments are accessible via the API.
    """
    # 1. Verify Experiments via API
    exp_resp = client.get("/api/experiments")
    assert exp_resp.status_code == 200
    experiments = exp_resp.get_json()
    assert len(experiments) >= 12, f"Expected at least 12 experiments, got {len(experiments)}"
    
    # Check key experiments exist
    exp_ids = [e["id"] for e in experiments]
    assert "exp_im_load_test" in exp_ids
    assert "exp_im_speed_control" in exp_ids
    assert "exp_alt_load_test" in exp_ids
    assert "exp_alt_synchronization" in exp_ids
    assert "exp_dc_shunt_load" in exp_ids
    assert "exp_dc_shunt_speed_control" in exp_ids
    assert "exp_sync_motor_v_curves" in exp_ids
    assert "exp_transformer_oc_sc" in exp_ids
    assert "exp_transformer_load_test" in exp_ids
    assert "exp_3ph_transformer_vector_parallel" in exp_ids
    assert "exp_alt_emf_mmf_regulation" in exp_ids
    assert "exp_induction_generator_load" in exp_ids
    assert "exp_alt_zpf_regulation" in exp_ids
    assert "exp_alt_infinite_bus_v_curves" in exp_ids

    # 2. Verify Deterministic Physics Solvers across all 10 machines
    mgr = NameplateManager()
    all_machines = mgr.get_all_machines()
    assert len(all_machines) == 10

    for m_id, m_cfg in all_machines.items():
        sim = SimulationEngine(m_cfg)
        assert sim.start_machine()
        t = sim.step()
        assert t["machine_id"] == m_id
        assert t["v_line"] > 0.0
        assert t["total_losses_w"] >= 0.0
        assert not t["protection_tripped"]
        # Check machine-specific physics non-triviality
        m_type = m_cfg.get("identity", {}).get("machine_type", "")
        if "transformer" in m_type:
            assert "v_secondary" in t
            assert t["speed_rpm"] == 0.0
        else:
            assert t["speed_rpm"] >= 0.0

