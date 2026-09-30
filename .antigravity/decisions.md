# Architectural & Engineering Decisions Log (ADR)

## ADR-001: Standalone Canonical Physics Engine
- **Context**: Physics logic was duplicated between Python `app.py` and client-side `index.html`.
- **Decision**: Implement a canonical, high-precision physics engine in Python (`core/physics/`) and mirror it deterministically in a standalone JavaScript module (`static/js/physics_engine.js`). Both engines must share identical equations, constants, and parameter conventions.
- **Consequences**: No divergence between backend training/validation and frontend real-time simulation.

## ADR-002: Dual Database Persistence Layer (MongoDB + SQLite Fallback)
- **Context**: MongoDB Atlas fails in environments without cloud network access or preconfigured credentials, breaking the application.
- **Decision**: Build a repository pattern service (`backend/db_service.py`) that checks for a live MongoDB instance; if absent, transparently initializes a local SQLite database with identical document schemas.
- **Consequences**: The laboratory functions 100% offline out-of-the-box while retaining enterprise MongoDB Atlas support.

## ADR-003: Causal Feedback Simulation Loop & Telemetry Bus
- **Context**: Virtual instruments and animations should never read from disconnected random numbers or uncoupled sliders.
- **Decision**: Build a deterministic simulation loop in `core/simulation/engine.py` and `static/js/simulation_engine.js`. User inputs (e.g. load torque) drive mechanical balance -> change speed -> recalculate slip -> update electrical impedances -> compute terminal and internal currents -> determine losses -> update thermal state -> check protection trip limits. Telemetry is published to an event bus.
- **Consequences**: Realistic, physically truthful behavior across all meters, scopes, and 3D animations.

## ADR-004: Modular Extensibility for 10 Machines
- **Context**: The lab requires 10 distinct electrical machine types.
- **Decision**: Use a configuration-driven schema (`MachineConfig`) and machine-specific physics calculators implementing a common interface.
- **Consequences**: Adding new machine models requires zero modifications to UI shell components.
