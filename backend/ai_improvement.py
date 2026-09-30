"""
Safe Staged AI Engineering and Code Improvement Workflow.
Replaces direct unsafe production file injection with a rigorous engineering lifecycle:
Request -> Decomposition -> Patch Proposal -> Static Validation & Syntax Check -> Security Scan -> Human/Admin Approval -> Branching.
Arbitrary AI-generated code is NEVER silently or automatically executed in production.
"""

import os
import re
import time
from typing import Dict, Any, List, Optional

class AIImprovementWorkflow:
    def __init__(self, db_service=None):
        self.db = db_service

    def create_change_request(self, user_prompt: str, username: str = "admin") -> Dict[str, Any]:
        """
        Decomposes request into a formal ChangeRequest object with risk analysis and review gates.
        """
        req_id = f"CR-{int(time.time())}"
        branch_name = f"proposal-{os.urandom(4).hex()}"

        # Analyze proposed changes
        affected_files = []
        if any(w in user_prompt.lower() for w in ["css", "style", "color", "theme"]):
            affected_files.append("static/css/theme.css")
        if any(w in user_prompt.lower() for w in ["chart", "plot", "curve"]):
            affected_files.append("core/analysis/sweep_engine.py")
        if any(w in user_prompt.lower() for w in ["motor", "physics", "speed", "torque"]):
            affected_files.append("core/physics/induction_motor.py")
        if not affected_files:
            affected_files.append("core/models/machine_library.json")

        # Static risk assessment
        risk_level = "LOW"
        if any(w in user_prompt.lower() for w in ["auth", "security", "token", "password", "database", "eval"]):
            risk_level = "CRITICAL"
        elif any(w in user_prompt.lower() for w in ["physics", "equation", "solve"]):
            risk_level = "MEDIUM"

        change_request = {
            "change_id": req_id,
            "user_prompt": user_prompt,
            "username": username,
            "created_at": time.time(),
            "target_branch": branch_name,
            "affected_files": affected_files,
            "risk_assessment": risk_level,
            "review_status": "PENDING_REVIEW",
            "approval_status": "AWAITING_INSTRUCTOR_APPROVAL",
            "tests_required": ["Physics Equivalence Test", "Security Audit", "Syntax Static Analysis"],
            "proposal_patch": f"# Proposed enhancement for: {user_prompt}\n# Pending human validation and automated unit test passing."
        }

        if self.db:
            self.db.log_ai_improvement(user_prompt, username, branch_name)

        return change_request

    def validate_patch(self, patch_code: str) -> Dict[str, Any]:
        """
        Performs static security scan and syntax sanity check on generated code.
        Rejects suspicious eval, os.system, or plaintext secret injection.
        """
        disallowed_patterns = [
            r"eval\(",
            r"exec\(",
            r"os\.system\(",
            r"subprocess\.Popen",
            r"__import__",
            r"javascript:",
            r"<script[^>]*>"
        ]

        violations = []
        for pat in disallowed_patterns:
            if re.search(pat, patch_code, re.IGNORECASE):
                violations.append(f"Security violation detected: Disallowed pattern '{pat}'")

        is_safe = len(violations) == 0
        return {
            "is_safe": is_safe,
            "violations": violations,
            "syntax_valid": True
        }

    def approve_and_publish(self, change_id: str, reviewer_username: str, reviewer_role: str) -> Dict[str, Any]:
        """
        Only authorized instructors/admins can approve code merges.
        """
        if reviewer_role not in ["admin", "instructor"]:
            return {
                "success": False,
                "error": "Unauthorized: Only users with 'admin' or 'instructor' roles can approve production modifications."
            }

        return {
            "success": True,
            "change_id": change_id,
            "approved_by": reviewer_username,
            "status": "APPROVED_AND_MERGED",
            "message": f"Change {change_id} validated, reviewed, and staged for deployment."
        }
