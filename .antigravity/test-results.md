# Automated Test Execution Results

## Comprehensive Test Execution Summary
- **Total Tests Run**: 26
- **Passed**: 26 (100%)
- **Failed**: 0
- **Execution Environment**: Python 3.13.14 (win32), pytest-9.1.1

## Test Suite Breakdown

### 1. Physics Engine Tests (`tests/test_physics.py`) — 8 Passed
- `test_reference_synchronous_speed`: Verified $N_s = \frac{120 \times 50}{4} = 1500\text{ RPM}$.
- `test_reference_slip`: Verified $s = 0.04$ at $N = 1440\text{ RPM}$.
- `test_angular_velocity`: Verified $\omega = \frac{2\pi N}{60} = 157.08\text{ rad/s}$.
- `test_induction_motor_energy_balance`: Verified $P_{\text{in}} = P_{\text{out}} + P_{\text{loss}}$ with exact complex phasor impedance.
- `test_induction_motor_causal_monotonicity`: Verified load demand increases slip, stator current, and losses.
- `test_synchronous_alternator_voltage_regulation`: Verified lagging vs leading terminal voltage regulation.
- `test_dc_shunt_motor_back_emf_and_torque`: Verified back-EMF, field flux saturation, and torque-armature current linearity.
- `test_transformer_maximum_efficiency_condition`: Verified optimal load fraction $x = \sqrt{P_{\text{core}} / P_{\text{cu,fl}}}$.

### 2. Simulation & State Machine Tests (`tests/test_simulation.py`) — 5 Passed
- `test_state_machine_valid_transitions`: Validated OFF -> STARTING -> RUNNING -> LOADED -> OVERLOADED.
- `test_state_machine_invalid_transition_rejected`: Invalid jump directly from OFF to LOADED rejected.
- `test_emergency_stop_from_any_state`: Instantaneous E-Stop transition succeeds from any state.
- `test_simulation_causal_feedback`: Causal loop verifies load torque slows rotor, raises slip, surges stator current.
- `test_protection_overload_trip`: Protection trips on sustained overload, transitions to FAULT state with incident log.

### 3. Security & Validation Tests (`tests/test_security.py`) — 4 Passed
- `test_password_hashing`: Werkzeug password hashing verification (admin/student).
- `test_ai_patch_security_scanner`: Blocks arbitrary code injection (`eval`, `os.system`, `subprocess`).
- `test_ai_approval_role_guard`: Rejects student code merges, permits only admin/instructor roles.
- `test_nameplate_input_validation`: Rejects negative voltage and negative power values.

### 4. REST API Tests (`tests/test_api.py`) — 7 Passed
- `test_api_machines_library`: Returns 10 configuration-driven machines.
- `test_api_nameplate_update_and_propagation`: Re-derives rated torque $T = 48.72\text{ Nm}$ for $7.5\text{ kW}$ motor.
- `test_api_login_authentication`: Secure authentication and role assignment.
- `test_api_experiments_list`: Returns 12 standardized university laboratory experiments.
- `test_api_parameter_sweep`: Computes full load torque sweep curve data.
- `test_api_viva_questions`: Returns curated viva examination question bank.
- `test_api_ai_improve_staged_workflow`: Formulates formal ChangeRequest objects without direct code execution.

### 5. Professor Demonstration Workflow (`tests/test_end_to_end_lab.py`) — 2 Passed
- `test_full_professor_demonstration_workflow`: Validated all 12 sequential demonstration gates from authentication to frozen report generation.
- `test_all_10_machines_physics_and_12_experiments`: Validated deterministic simulation without dummy values across all 10 machines and verified API availability of all 12 standardized laboratory experiments.
