# Electrical Machines Digital Twin & Virtual Laboratory
### Academic-Grade Browser-Based Virtual Electrical Engineering Laboratory

[![Tests](https://img.shields.io/badge/Tests-25%20Passed%20(100%25)-emerald.svg)]()
[![Physics](https://img.shields.io/badge/Physics-IEEE%20Equivalent%20Circuits-blue.svg)]()
[![Security](https://img.shields.io/badge/Security-Hardened%20%26%20Zero%20Leaks-purple.svg)]()
[![Architecture](https://img.shields.io/badge/Architecture-Modular%20Multi--Agent-amber.svg)]()

---

## 1. Executive Overview

This repository provides an academically defensible, engineering-driven **Electrical Machines Digital Twin and Virtual Laboratory**. It faithfully reproduces the complete experiential workflow of an undergraduate/graduate electrical machines laboratory:

$$\text{CONFIGURE} \longrightarrow \text{CONNECT} \longrightarrow \text{START} \longrightarrow \text{OPERATE} \longrightarrow \text{MEASURE} \longrightarrow \text{RECORD} \longrightarrow \text{ANALYZE} \longrightarrow \text{EXPERIMENT} \longrightarrow \text{GRAPH} \longrightarrow \text{CALCULATE} \longrightarrow \text{REPORT} \longrightarrow \text{VIVA}$$

### Core Distinctions from Standard Visual Demos
* **Zero Fake Telemetry**: All displayed currents, speeds, torques, powers, efficiencies, and temperatures originate from fundamental Maxwellian circuit equations, electromechanical balance equations, or explicitly labeled ML surrogates.
* **Causal Feedback Loop**: When mechanical load increases, the motor does not arbitrarily update numbers; the shaft torque deficit slows the rotor down $\rightarrow$ slip increases $\rightarrow$ rotor induced frequency and EMF rise $\rightarrow$ stator phase current surges $\rightarrow$ copper losses ($I^2R$) climb $\rightarrow$ thermal winding temperature escalates.
* **Frozen Nameplate Snapshots**: Historical experiment reports capture the exact machine nameplate parameters used during the test, ensuring historical reports remain scientifically reproducible even if the machine presets are altered later.
* **Dual Persistence Layer**: Enterprise MongoDB Atlas support with an automatic zero-dependency local SQLite repository fallback, enabling the entire virtual lab to operate 100% offline out-of-the-box.

---

## 2. System Architecture

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
│  - Dual-Trace Scope     │   │  - Fault Indicators      │
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

---

## 3. Mathematical & Physics Foundations

### 3.1 Three-Phase Squirrel-Cage Induction Motor
The per-phase equivalent circuit is solved using exact complex phasor algebra:

* **Synchronous Speed**:
  $$N_s = \frac{120 f}{P} \quad (\text{RPM}), \quad \omega_s = \frac{2\pi N_s}{60} \quad (\text{rad/s})$$

* **Per-Unit Slip**:
  $$s = \frac{N_s - N}{N_s}$$

* **Equivalent Input Impedance**:
  $$Z_1 = R_1 + jX_1, \quad Z_m = R_c \parallel jX_m, \quad Z_2' = \frac{R_2'}{s} + jX_2'$$
  $$Z_{\text{in}} = Z_1 + \frac{Z_m Z_2'}{Z_m + Z_2'}$$

* **Air-Gap and Converted Mechanical Power Flow**:
  $$P_{\text{ag}} = 3 |I_2'|^2 \frac{R_2'}{s}$$
  $$P_{\text{rotor\_cu}} = s P_{\text{ag}}$$
  $$P_{\text{conv}} = (1 - s) P_{\text{ag}}$$
  $$P_{\text{out}} = \max(0, P_{\text{conv}} - P_{\text{rot}})$$
  $$T_{\text{dev}} = \frac{P_{\text{ag}}}{\omega_s}, \quad T_{\text{shaft}} = \frac{P_{\text{out}}}{\omega_m}$$

* **Conservation of Energy Balance**:
  $$P_{\text{in}} = P_{\text{out}} + P_{\text{stator\_cu}} + P_{\text{core}} + P_{\text{rotor\_cu}} + P_{\text{rot}}$$

### 3.2 Synchronous Machine / Alternator
* **Terminal Voltage Quadratic Equation**:
  $$V_t^2 + 2 V_t I_a (R_a \cos\phi \pm X_s \sin\phi) + I_a^2 (R_a^2 + X_s^2) - E_{ph}^2 = 0$$
  *(where $+$ is for lagging power factor, $-$ is for leading power factor)*
* **Percentage Voltage Regulation**:
  $$\text{VR}\% = \frac{E_{ph} - V_{t,ph}}{V_{t,ph}} \times 100\%$$

---

## 4. Machine Library (10 Machines Included)

| ID | Machine Type | Rating | Voltage / Connection | Rated Speed |
|---|---|---|---|---|
| `im_415v_5hp` | 3-Phase Squirrel-Cage Induction Motor | 3.73 kW (5.0 HP) | 415 V Delta | 1440 RPM |
| `im_220v_3hp` | 3-Phase Induction Motor | 2.2 kW (3.0 HP) | 220 V Star | 1465 RPM |
| `sync_gen_415v_3kva` | 3-Phase Salient Pole Synchronous Generator | 3.0 kVA (2.4 kW) | 415 V Star + Neutral | 1500 RPM |
| `dc_shunt_220v_3hp` | DC Shunt Motor | 2.2 kW (3.0 HP) | 220 V DC | 1500 RPM |
| `dc_series_220v_3hp` | DC Series Motor (Traction Demo) | 2.2 kW (3.0 HP) | 220 V DC | 1200 RPM |
| `dc_compound_220v` | DC Cumulative Compound Motor | 2.2 kW (3.0 HP) | 220 V DC | 1450 RPM |
| `dc_gen_sep_220v` | Separately Excited DC Generator | 2.5 kW | 220 V DC | 1500 RPM |
| `sync_motor_415v_5hp` | 3-Phase Synchronous Motor | 3.73 kW (5.0 HP) | 415 V Star | 1500 RPM |
| `transformer_1ph_3kva` | 1-Phase Distribution Transformer | 3.0 kVA | 230 V / 115 V | N/A (Static) |
| `transformer_3ph_10kva`| 3-Phase Power Transformer | 10.0 kVA | 415 V / 240 V Dyn11 | N/A (Static) |

---

## 5. Standardized Laboratory Experiments (12 Procedures)

1. **Brake Load Test on 3-Phase Squirrel-Cage Induction Motor**
2. **No-Load (Open Shaft) Test on 3-Phase Induction Motor**
3. **Blocked Rotor (Short Circuit) Test on 3-Phase Induction Motor**
4. **Induction Motor Speed Control via Stator Voltage & V/f Variation**
5. **Load Test & Voltage Regulation of 3-Phase Alternator**
6. **Synchronous Generator Synchronization to Infinite Bus**
7. **Load Characteristics of DC Shunt Motor**
8. **Speed Control of DC Shunt Motor via Armature and Field Rheostats**
9. **Synchronous Motor V-Curves and Inverted V-Curves**
10. **Open Circuit (OC) and Short Circuit (SC) Tests on 1-Phase Transformer**
11. **Transformer Load Test, Efficiency Curves, and Voltage Regulation**
12. **3-Phase Transformer Vector Group and Load Sharing Verification**

---

## 6. Security & Credential Hardening

* **Zero Exposed Secrets**: All legacy tokens (e.g. GitHub PATs, Atlas database passwords) have been permanently purged from source files and decoupled into environment variables (`.env.example`).
* **Hashed Passwords**: Replaced plaintext user storage with PBKDF2/SHA-256 cryptographic password hashing using `werkzeug.security`.
* **Safe AI Improvement Pipeline**: The AI improvement endpoint no longer injects unvalidated code into files. User prompts are decomposed into formal `ChangeRequest` objects with static AST syntax validation, security scans (blocking `eval`, `exec`, `os.system`), and human/admin review gates.

---

## 7. Setup & Execution Instructions

### Prerequisites
* Python 3.10+
* Windows, Linux, or macOS

### Installation
```bash
# Clone the repository
git clone https://github.com/siddardhvanguri-source/digital_machine-s_laboratory-.git
cd digital_machine-s_laboratory-

# Install required dependencies
pip install -r requirements.txt
pip install pytest
```

### Running the Digital Twin Laboratory
```bash
python app.py
```
Open your browser to: **`http://127.0.0.1:5000`**

* **Default Admin Account**: `username: admin`, `password: password`
* **Default Student Account**: `username: student`, `password: password`

### Running the Complete Automated Test Suite
```bash
python -m pytest tests/ -v
```

---

## 8. Academic Limitations & Real-World Lab Differences

This digital twin is an educational and numerical simulation. While mathematically rigorous, real physical laboratory experiments exhibit phenomena that idealized equivalent circuits simplify:
1. **Electromagnetic Non-linearities**: Stator slot harmonics, iron saturation curves (hysteresis loops), and temperature-dependent resistance shifts ($R_T = R_0[1 + \alpha(T - T_0)]$) are approximated through lumped models.
2. **Sensor Uncertainty & Noise**: Real analog dynamometers and current transformers exhibit class 0.5/1.0 calibration uncertainty, pointer parallax, and mechanical vibration.
3. **Bearing & Mechanical Degradation**: Real physical machines experience gradual mechanical wear, eccentricity, and unbalanced magnetic pull (UMP).
