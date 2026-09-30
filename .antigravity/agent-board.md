# Multi-Agent Engineering Organization Board

## Mission
Transform the repository into an academically defensible, browser-based Electrical Machines Digital Twin and Virtual Laboratory following the complete workflow:
CONFIGURE → CONNECT → START → OPERATE → MEASURE → RECORD → ANALYZE → EXPERIMENT → GRAPH → CALCULATE → REPORT → REVIEW

## Agent Roster & Ownership
| Agent ID | Role | Focus Area | Status | Deliverables |
|---|---|---|---|---|
| AGENT 0 | Chief Orchestrator | Coordination, integration & gates | Active | Architecture, lifecycle, integration |
| AGENT 1 | Codebase Archaeologist | Audit legacy code & preserve functionality | Complete | repository-audit.md |
| AGENT 2 | Runtime & Build Engineer | Local environment & build stability | Complete | Run workflow, headless support |
| AGENT 3 | Security Engineer | Credentials, auth, input sanitization | In Progress | Secrets extraction, hashing, validation |
| AGENT 4 | System Architect | Layered architecture & folder design | Complete | Modular core & backend split |
| AGENT 5 | Physics Engineer | Exact physics equations & parameter solving | Complete | core/physics/* (IM, Sync, DC, Transformer) |
| AGENT 6 | Digital Twin Engineer | Machine state machine & causal feedback | Active | core/simulation/state_machine.py |
| AGENT 7 | Machine Library Engineer | 10 machine models & presets | Active | core/models/machine_library.json |
| AGENT 8 | Nameplate Engineer | Editable parameters & propagation | Active | core/models/nameplate.py |
| AGENT 9 | Simulation Engine | Deterministic time-step loop & telemetry | Active | core/simulation/engine.py |
| AGENT 10 | Virtual Instruments | DMM, 3-Phase Meter, Scope, Tachometer | Active | core/instruments/* |
| AGENT 11 | Fault & Protection | 12 fault types, trips, event log | Active | core/simulation/protection.py |
| AGENT 12 | Experiment Engine | 12 standardized lab procedures | Active | core/experiments/* |
| AGENT 13 | Virtual Wiring | Connection rules & electrical validation | Active | core/experiments/wiring_validator.py |
| AGENT 14 | Experiment Data Engineer | Records, CSV/JSON export, replay | Active | core/experiments/data_logger.py |
| AGENT 15 | Data Persistence | Clean DB abstraction (MongoDB/SQLite) | Active | backend/db_service.py |
| AGENT 16 | AI/ML Engineer | Physics vs ML comparison, error metrics | Active | core/ml/model_evaluator.py |
| AGENT 17 | AI Software Engineer | Safe staged AI improvement pipeline | Active | backend/ai_improvement.py |
| AGENT 18 | Three.js Digital Twin | 3D twin tied to machine telemetry | Active | static/js/twin3d.js |
| AGENT 19 | UI/UX Engineer | High-density laboratory UI & telemetry | Active | UI components & dashboard |
| AGENT 20 | Analytics Engineer | Reusable charts, curves, sweeps | Active | core/analysis/sweep_engine.py |
| AGENT 21 | Report Generator | Formal lab reports with nameplate snapshot | Active | core/reports/report_generator.py |
| AGENT 22 | Education/Viva | Viva oral exam system with 3 difficulty tiers | Active | core/experiments/viva_bank.py |
| AGENT 23 | Physics Test Engineer | Automated physics & conservation tests | Active | tests/test_physics.py |
| AGENT 24 | Adversarial Security Tester | Boundary & malicious input validation | Active | tests/test_security.py |
| AGENT 25 | Performance Engineer | Telemetry buffers, throttled redraws | Active | Telemetry buffer & benchmarks |
| AGENT 26 | Accessibility Engineer | Keyboard navigation, high contrast | Active | WCAG ARIA support |
| AGENT 27 | Documentation Engineer | Complete manual, theoretical basis | Active | README.md & theory docs |

## Experiment Agent Assignments

| Experiment ID | UI Agent | Test Agent | ML Agent | Integration Agent |
|---|---|---|---|---|
| exp_im_no_load | AGENT 30 (UI Engineer) | AGENT 31 (Physics Test Engineer) | AGENT 32 (AI/ML Engineer) | AGENT 28 (Supervisor) |
| exp_im_blocked_rotor | AGENT 30 (UI Engineer) | AGENT 31 (Physics Test Engineer) | AGENT 32 (AI/ML Engineer) | AGENT 28 (Supervisor) |
| exp_im_speed_control | AGENT 30 (UI Engineer) | AGENT 31 (Physics Test Engineer) | AGENT 32 (AI/ML Engineer) | AGENT 28 (Supervisor) |
| exp_alt_load_test | AGENT 30 (UI Engineer) | AGENT 31 (Physics Test Engineer) | AGENT 32 (AI/ML Engineer) | AGENT 28 (Supervisor) |
| exp_alt_emf_mmf_regulation | AGENT 30 (UI Engineer) | AGENT 31 (Physics Test Engineer) | AGENT 32 (AI/ML Engineer) | AGENT 28 (Supervisor) |
| exp_induction_generator_load | AGENT 30 (UI Engineer) | AGENT 31 (Physics Test Engineer) | AGENT 32 (AI/ML Engineer) | AGENT 28 (Supervisor) |
| exp_alt_zpf_regulation | AGENT 30 (UI Engineer) | AGENT 31 (Physics Test Engineer) | AGENT 32 (AI/ML Engineer) | AGENT 28 (Supervisor) |
| exp_alt_infinite_bus_v_curves | AGENT 30 (UI Engineer) | AGENT 31 (Physics Test Engineer) | AGENT 32 (AI/ML Engineer) | AGENT 28 (Supervisor) |

## New Agent Definitions

| Agent ID | Role | Focus Area | Status | Deliverables |
|---|---|---|---|---|
| AGENT 28 | Supervisor | Orchestrate experiment agents, ensure communication | Active | Coordination protocols, message routing |
| AGENT 30 | UI Engineer | Front‑end experiment interfaces, telemetry visualisation | Active | UI components for each experiment |
| AGENT 31 | Physics Test Engineer | Automated physics validation, conserved quantities | Active | test_physics_experiments.py |
| AGENT 32 | AI/ML Engineer | Machine‑learning models for prediction & error analysis | Active | ml_experiment_models/ |
