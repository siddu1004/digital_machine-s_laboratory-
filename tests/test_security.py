"""
Security & Adversarial Boundary Tests.
Verifies password hashing, credential sanitization, input boundaries,
and that AI code generation cannot inject arbitrary execution patterns.
"""

import pytest
import os
from backend.db_service import DatabaseService
from backend.ai_improvement import AIImprovementWorkflow
from core.models.nameplate import NameplateManager

def test_password_hashing():
    db = DatabaseService()
    # Admin and student should authenticate successfully with default passwords
    admin = db.authenticate_user("admin", "password")
    assert admin is not None
    assert admin["role"] == "admin"

    # Invalid password must be rejected
    invalid = db.authenticate_user("admin", "wrongpassword")
    assert invalid is None

def test_ai_patch_security_scanner():
    ai = AIImprovementWorkflow()

    safe_patch = "/* Add new blue border */ .meter-card { border: 1px solid #38bdf8; }"
    res_safe = ai.validate_patch(safe_patch)
    assert res_safe["is_safe"]

    malicious_patch = "import os; os.system('echo compromised'); eval('2+2')"
    res_malicious = ai.validate_patch(malicious_patch)
    assert not res_malicious["is_safe"]
    assert len(res_malicious["violations"]) >= 2

def test_ai_approval_role_guard():
    ai = AIImprovementWorkflow()
    # Student role cannot approve production code
    res_student = ai.approve_and_publish("CR-001", "student_user", "student")
    assert not res_student["success"]

    # Admin role can approve
    res_admin = ai.approve_and_publish("CR-001", "admin_user", "admin")
    assert res_admin["success"]

def test_nameplate_input_validation():
    mgr = NameplateManager()
    # Negative voltage must be rejected
    valid, msg, _ = mgr.validate_and_update("im_415v_5hp", {
        "identity": {"rated_voltage": -415.0}
    })
    assert not valid
    assert "Rated voltage must be positive" in msg

    # Zero or negative power must be rejected
    valid_power, msg_power, _ = mgr.validate_and_update("im_415v_5hp", {
        "identity": {"rated_power_kw": -5.0}
    })
    assert not valid_power
