"""
REST API Integration Tests for Electrical Machines Laboratory Server.
Verifies all machine library, nameplate, experiment, analysis, and auth endpoints.
"""

import pytest
import json
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_api_machines_library(client):
    res = client.get("/api/machines")
    assert res.status_code == 200
    machines = res.get_json()
    assert len(machines) >= 8
    assert "im_415v_5hp" in machines
    assert "sync_gen_415v_3kva" in machines
    assert "dc_shunt_220v_3hp" in machines

def test_api_nameplate_update_and_propagation(client):
    # Update rated voltage and power
    update_payload = {
        "identity": {
            "rated_power_kw": 7.5,
            "rated_voltage": 415.0,
            "frequency": 50.0,
            "rated_speed_rpm": 1470.0,
            "poles": 4
        }
    }
    res = client.post("/api/machine/im_415v_5hp/nameplate", json=update_payload)
    assert res.status_code == 200
    data = res.get_json()
    assert data["status"] == "success"
    # Rated torque must be re-derived: T = P / omega
    # 7500 / (2*pi*1470/60) = 48.72 Nm
    assert pytest.approx(data["machine"]["identity"]["rated_torque_nm"], rel=1e-1) == 48.72

def test_api_login_authentication(client):
    # Admin login
    res_admin = client.post("/api/login", json={"username": "admin", "password": "password"})
    assert res_admin.status_code == 200
    assert res_admin.get_json()["role"] == "admin"

    # Student login
    res_student = client.post("/api/login", json={"username": "student", "password": "password"})
    assert res_student.status_code == 200
    assert res_student.get_json()["role"] == "student"

    # Bad password
    res_bad = client.post("/api/login", json={"username": "admin", "password": "wrong"})
    assert res_bad.status_code == 401

def test_api_experiments_list(client):
    res = client.get("/api/experiments")
    assert res.status_code == 200
    exps = res.get_json()
    assert len(exps) >= 5

def test_api_parameter_sweep(client):
    res = client.post("/api/analysis/sweep", json={"machine_id": "im_415v_5hp"})
    assert res.status_code == 200
    data = res.get_json()
    assert "load_torque_nm" in data
    assert "speed_rpm" in data
    assert len(data["load_torque_nm"]) > 5

def test_api_viva_questions(client):
    res = client.get("/api/viva/questions?machine_type=induction_motor")
    assert res.status_code == 200
    questions = res.get_json()
    assert len(questions) > 0
    assert any("slip" in q["question"].lower() for q in questions)

def test_api_ai_improve_staged_workflow(client):
    res = client.post("/api/ai/improve", json={
        "prompt": "Improve torque speed curve chart styling",
        "username": "admin"
    })
    assert res.status_code == 200
    data = res.get_json()
    assert data["status"] == "success"
    assert "change_request" in data
    assert data["change_request"]["approval_status"] == "AWAITING_INSTRUCTOR_APPROVAL"
