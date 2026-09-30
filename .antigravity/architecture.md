# Electrical Machines Digital Twin Lab — Architecture Specification

## Architectural Overview
```
┌────────────────────────────────────────────────────────┐
│                   MACHINE LIBRARY                      │
│   (10 Machine Presets: IM, Alternator, DC Shunt, etc.)  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             MACHINE CONFIGURATION / NAMEPLATE          │
│       (Editable Ratings, Parameters & Limits)          │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   DIGITAL TWIN CORE                    │
│   ├─ Electrical Equivalent Circuit (Complex Phasors)   │
│   ├─ Mechanical Dynamics (Torque, Slip, Speed, Inertia)│
│   ├─ Thermal Network (Copper/Iron Losses -> Temp rise) │
│   ├─ Fault Injection System (12 Controllable Faults)   │
│   └─ Protection System (Overcurrent, Overvoltage, etc) │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│           DETERMINISTIC SIMULATION ENGINE              │
│       (Fixed dt Time-Stepping, Causal Feedbacks)       │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                    TELEMETRY BUS                       │
│    (Buffered Stream: V, I, P, Q, Speed, Torque, Temp)  │
└────────────┬─────────────────────────────┬─────────────┘
             │                             │
             ▼                             ▼
┌─────────────────────────┐   ┌──────────────────────────┐
│   VIRTUAL INSTRUMENTS   │   │  THREE.JS 3D TWIN SCENE  │
│  - Digital Multimeter   │   │  - Dynamic Shaft Speed   │
│  - 3-Phase Power Meter  │   │  - Stator Cutaway        │
│  - Digital Tachometer   │   │  - Thermal Heatmap       │
│  - Shaft Torque Meter   │   │  - Magnetic Flux Visuals │
│  - Dual-Trace Scope     │   │  - Fault Smoke & Alerts  │
└────────────┬────────────┘   └──────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────────┐
│                   EXPERIMENT ENGINE                    │
│   (Wiring Validation, Step Procedure, Observations)    │
└────────────┬─────────────────────────────┬─────────────┘
             │                             │
             ▼                             ▼
┌─────────────────────────┐   ┌──────────────────────────┐
│  ANALYTICS & PLOTTING   │   │   AI/ML VALIDATION BENCH │
│  - Torque-Speed Curves  │   │  - Polynomial Regressor  │
│  - Efficiency vs Load   │   │  - Random Forest         │
│  - V-Curves / Phasors   │   │  - Multi-Layer Perceptron│
│  - Parameter Sweeps     │   │  - Residuals, RMSE, R²   │
└────────────┬────────────┘   └────────────┬─────────────┘
             │                             │
             └──────────────┬──────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             ACADEMIC LAB REPORT GENERATOR              │
│     (Snapshot Configuration, Observations, Graphs)     │
└────────────────────────────────────────────────────────┘
```

## Directory Hierarchy
- `core/physics/`: Mathematical models for induction motors, synchronous machines, DC machines, and transformers.
- `core/simulation/`: Real-time simulation loop, telemetry bus, state machine, fault and protection.
- `core/models/`: Machine configurations, nameplate schemas, presets library.
- `core/instruments/`: Meter models computing readings strictly from telemetry.
- `core/experiments/`: Standardized university lab experiments, procedures, wiring checks.
- `backend/`: Flask REST API, authentication, database persistence service (MongoDB with local SQLite fallback).
- `static/js/`: Client-side modular engines (physics, telemetry, instruments, 3D twin).
- `tests/`: Automated unit, physics, security, and integration test suite.
