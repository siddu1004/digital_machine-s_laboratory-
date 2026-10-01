"use strict";
var DigitalTwinApp = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // external-global:three
  var require_three = __commonJS({
    "external-global:three"(exports, module) {
      module.exports = window.THREE;
    }
  });

  // external-global:react
  var require_react = __commonJS({
    "external-global:react"(exports, module) {
      module.exports = window.React;
    }
  });

  // external-global:react-dom/client
  var require_client = __commonJS({
    "external-global:react-dom/client"(exports, module) {
      module.exports = window.ReactDOM;
    }
  });

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    DatasheetModal: () => DatasheetModal,
    EXPERIMENT_3D_CONFIGS: () => EXPERIMENT_3D_CONFIGS,
    LandingHero: () => LandingHero,
    SEM5_OBSERVATIONS: () => SEM5_OBSERVATIONS,
    STUDENT_LEARNING_GUIDES: () => STUDENT_LEARNING_GUIDES,
    StudentGuideModal: () => StudentGuideModal,
    VirtualSpaceManager: () => VirtualSpaceManager
  });

  // src/data/observations.ts
  var SEM5_OBSERVATIONS = {
    // -------------------------------------------------------------
    // EXPERIMENT 2: No-Load and Blocked Rotor Tests (Circle Diagram)
    // -------------------------------------------------------------
    exp2: {
      experimentId: "exp2",
      title: "No Load & Blocked Rotor Tests on 3-Phase Squirrel Cage Induction Motor",
      machineNameplate: {
        name: "3-Phase Squirrel Cage Induction Motor",
        make: "Kirloskar Electric",
        type: "KE-IM2.2",
        ratedVoltage: "415 V",
        ratedCurrent: "4.7 A",
        ratedPower: "2.2 kW (3 HP)",
        ratedSpeed: "1440 RPM",
        frequency: "50 Hz",
        connection: "Delta (\u0394)"
      },
      testConditions: {
        ambientTemp: "28\xB0C",
        statorResistance: 7.9007,
        // Mean measured stator resistance in Ohms
        multiplicationFactor: 4,
        // Wattmeter MF for no-load
        noLoadSpeed: 1498
        // RPM
      },
      tables: [
        {
          id: "no_load",
          name: "No-Load Test Observations",
          description: "Conducted at rated stator voltage with rotor uncoupled to determine core and friction/windage losses.",
          columns: [
            { key: "v0", label: "Stator Voltage (V\u2080)", unit: "V" },
            { key: "i0", label: "No-Load Current (I\u2080)", unit: "A" },
            { key: "w0_raw", label: "Wattmeter Diff (W\u2081 - W\u2082)", unit: "W" },
            { key: "mf", label: "Multiplication Factor", unit: "-" },
            { key: "w0", label: "Total No-Load Power (W\u2080)", unit: "W", isCalculated: true },
            { key: "speed", label: "Speed", unit: "RPM" }
          ],
          rows: [
            { slNo: 1, v0: 415, i0: 2.6, w0_raw: "155 - 110 = 45", mf: 4, w0: 180, speed: 1498 }
          ],
          calculationsSummary: {
            "No Load Power Factor (cos \u03C6\u2080)": "W\u2080 / (\u221A3 \xB7 V\u2080 \xB7 I\u2080) = 180 / (\u221A3 \xB7 415 \xB7 2.6) = 0.0963",
            "Core Loss Resistance (Rc)": "3 \xB7 (V_ph)\xB2 / W\u2080 = 3 \xB7 (415)\xB2 / 180 = 2870.4 \u03A9",
            "Magnetizing Reactance (Xm)": "V_ph / I_m = 415 / 2.587 = 160.4 \u03A9"
          }
        },
        {
          id: "blocked_rotor",
          name: "Blocked Rotor Test Observations",
          description: "Conducted at reduced voltage with locked rotor to determine equivalent copper losses and leakage impedance.",
          columns: [
            { key: "vsc", label: "Short-Circuit Voltage (V_sc)", unit: "V" },
            { key: "isc", label: "Rated Short-Circuit Current (I_sc)", unit: "A" },
            { key: "mf", label: "Wattmeter MF", unit: "-" },
            { key: "wsc", label: "Short-Circuit Power (W_sc)", unit: "W" }
          ],
          rows: [
            { slNo: 1, vsc: 114, isc: 4.7, mf: 1, wsc: 260 }
          ],
          calculationsSummary: {
            "Equivalent Impedance (Z01)": "V_sc / (\u221A3 \xB7 I_sc) = 114 / (\u221A3 \xB7 4.7) = 13.99 \u03A9",
            "Equivalent Resistance (R01)": "W_sc / (3 \xB7 I_sc\xB2) = 260 / (3 \xB7 4.7\xB2) = 3.92 \u03A9",
            "Equivalent Reactance (X01)": "\u221A(Z01\xB2 - R01\xB2) = \u221A(13.99\xB2 - 3.92\xB2) = 13.43 \u03A9",
            "Rotor Resistance referred to Stator (R2')": "R01 - R1 = 3.92 - (7.9007 / 2) = 1.96 \u03A9",
            "Stator & Rotor Reactance (X1 = X2')": "X01 / 2 = 6.715 \u03A9"
          }
        },
        {
          id: "stator_resistance",
          name: "Stator Resistance Measurement (DC Voltmeter-Ammeter Method)",
          description: "DC drop across stator phases to calculate per-phase resistance.",
          columns: [
            { key: "voltage", label: "DC Voltage (V)", unit: "V" },
            { key: "current", label: "DC Current (I)", unit: "A" },
            { key: "resistance", label: "Resistance (R = V / I)", unit: "\u03A9", isCalculated: true }
          ],
          rows: [
            { slNo: 1, voltage: 15.5, current: 2, resistance: 7.75 },
            { slNo: 2, voltage: 18, current: 2.3, resistance: 7.82 },
            { slNo: 3, voltage: 20, current: 2.5, resistance: 8 },
            { slNo: 4, voltage: 22, current: 2.8, resistance: 7.857 },
            { slNo: 5, voltage: 24, current: 3, resistance: 8 },
            { slNo: 6, voltage: 26, current: 3.3, resistance: 7.878 },
            { slNo: 7, voltage: 28, current: 3.5, resistance: 8 }
          ],
          calculationsSummary: {
            "Mean DC Resistance (R_dc)": "7.9007 \u03A9",
            "Effective AC Resistance (R_ac)": "1.2 \xB7 R_dc = 9.48 \u03A9"
          }
        }
      ],
      modelCalculations: {
        title: "Equivalent Circuit Parameter Derivation",
        sampleSetIndex: 1,
        steps: [
          {
            stepNumber: 1,
            description: "No-load power factor angle determination",
            formula: "cos(\u03C6\u2080) = W\u2080 / (\u221A3 \xB7 V\u2080 \xB7 I\u2080)",
            substitution: "180 / (\u221A3 \xB7 415 \xB7 2.6)",
            result: "cos(\u03C6\u2080) = 0.0963, \u03C6\u2080 = 84.47\xB0"
          },
          {
            stepNumber: 2,
            description: "Magnetizing current and core loss current components",
            formula: "Iw = I\u2080 \xB7 cos(\u03C6\u2080), Im = I\u2080 \xB7 sin(\u03C6\u2080)",
            substitution: "2.6 \xB7 0.0963, 2.6 \xB7 sin(84.47\xB0)",
            result: "Iw = 0.250 A, Im = 2.587 A"
          },
          {
            stepNumber: 3,
            description: "Short-circuit parameters and leakage reactance",
            formula: "Z\u2080\u2081 = V_sc / (\u221A3 \xB7 I_sc), R\u2080\u2081 = W_sc / (3 \xB7 I_sc\xB2)",
            substitution: "114 / (\u221A3 \xB7 4.7), 260 / (3 \xB7 4.7\xB2)",
            result: "Z\u2080\u2081 = 13.99 \u03A9, R\u2080\u2081 = 3.92 \u03A9, X\u2080\u2081 = 13.43 \u03A9"
          }
        ]
      },
      benchmarkCurves: [
        {
          id: "circle_diagram_pts",
          name: "Circle Diagram Locus Points",
          xAxisKey: "p_in",
          xLabel: "Input Power (kW)",
          yAxisKey: "torque",
          yLabel: "Torque (N\xB7m)",
          points: [
            { x: 0.18, y: 0 },
            { x: 1, y: 5.2 },
            { x: 2.2, y: 14.6 },
            { x: 3.1, y: 22.8 },
            { x: 4, y: 28.5 }
          ]
        }
      ]
    },
    // -------------------------------------------------------------
    // EXPERIMENT 3: Speed Control of 3-Phase Induction Motor
    // -------------------------------------------------------------
    exp3: {
      experimentId: "exp3",
      title: "Speed Control of 3-Phase Induction Motor",
      machineNameplate: {
        name: "Pole-Changing & Slip-Ring Induction Motor Testbench",
        make: "Kirloskar / NPTEL Lab Standard",
        type: "Dual-Winding Dahlander / Slip-Ring Unit",
        ratedVoltage: "415 V",
        ratedCurrent: "4.7 A",
        ratedPower: "2.2 kW / 3 HP",
        ratedSpeed: "1440 RPM (4-pole base)",
        frequency: "50 Hz",
        connection: "Star / Delta Switchable"
      },
      testConditions: {
        ambientTemp: "27\xB0C"
      },
      tables: [
        {
          id: "pole_changing",
          name: "Method 1: Pole Changing Speed Control",
          description: "Speed variation obtained by toggling stator winding pole grouping (Dahlander / multi-winding stator).",
          columns: [
            { key: "poleConfig", label: "Pole Configuration", unit: "Poles" },
            { key: "statorVoltage", label: "Stator Voltage", unit: "V" },
            { key: "speed", label: "No-Load Speed", unit: "RPM" }
          ],
          rows: [
            { slNo: 1, poleConfig: "6 pole", statorVoltage: 415, speed: 998 },
            { slNo: 2, poleConfig: "4 pole", statorVoltage: 415, speed: 1499 },
            { slNo: 3, poleConfig: "2 pole", statorVoltage: 415, speed: 2999 }
          ],
          calculationsSummary: {
            "Synchronous Speed Ns (6P)": "120 \xB7 50 / 6 = 1000 RPM (Recorded: 998 RPM, s = 0.2%)",
            "Synchronous Speed Ns (4P)": "120 \xB7 50 / 4 = 1500 RPM (Recorded: 1499 RPM, s = 0.07%)",
            "Synchronous Speed Ns (2P)": "120 \xB7 50 / 2 = 3000 RPM (Recorded: 2999 RPM, s = 0.03%)"
          }
        },
        {
          id: "stator_voltage_control",
          name: "Method 2: Stator Voltage Control",
          description: "Varying stator terminal voltage via 3\u03C6 auto-transformer at constant frequency.",
          columns: [
            { key: "voltagePct", label: "Stator Voltage %", unit: "%" },
            { key: "voltageVal", label: "Terminal Voltage", unit: "V" },
            { key: "noLoadSpeed", label: "No-Load Speed", unit: "RPM" },
            { key: "loadSpeed", label: "25% Full Load Speed", unit: "RPM" }
          ],
          rows: [
            { slNo: 1, voltagePct: "20%", voltageVal: 83, noLoadSpeed: 1470, loadSpeed: "-" },
            { slNo: 2, voltagePct: "40%", voltageVal: 166, noLoadSpeed: 1486, loadSpeed: "-" },
            { slNo: 3, voltagePct: "60%", voltageVal: 249, noLoadSpeed: 1491, loadSpeed: 1400 },
            { slNo: 4, voltagePct: "80%", voltageVal: 332, noLoadSpeed: 1493, loadSpeed: 1447 },
            { slNo: 5, voltagePct: "100%", voltageVal: 415, noLoadSpeed: 1494, loadSpeed: 1465 }
          ],
          calculationsSummary: {
            "Observation Note": "Torque is proportional to V\xB2. On load, reducing voltage substantially increases slip, dropping rotor speed."
          }
        },
        {
          id: "rotor_rheostat_control",
          name: "Method 3: Rotor Rheostat Resistance Control (Slip-Ring Motor)",
          description: "Inserting external 3-phase resistance in rotor circuit via slip-rings.",
          columns: [
            { key: "speed", label: "Rotor Speed (N)", unit: "RPM" },
            { key: "vr", label: "Voltage Across Rotor Resistor (V_r)", unit: "V" },
            { key: "ir", label: "Rotor Current (I_r)", unit: "A" },
            { key: "rext", label: "Ext. Rotor Resistance (V_r / I_r)", unit: "\u03A9", isCalculated: true }
          ],
          rows: [
            { slNo: 1, speed: 1296, vr: 22, ir: 0.7, rext: 31.43 },
            { slNo: 2, speed: 1233, vr: 28, ir: 0.85, rext: 32.94 },
            { slNo: 3, speed: 1135, vr: 39, ir: 0.95, rext: 41.05 },
            { slNo: 4, speed: 1059, vr: 48, ir: 1, rext: 48 },
            { slNo: 5, speed: 954, vr: 60, ir: 1, rext: 60 },
            { slNo: 6, speed: 800, vr: 78, ir: 1, rext: 78 },
            { slNo: 7, speed: 507, vr: 111, ir: 0.95, rext: 116.84 }
          ],
          calculationsSummary: {
            "Mean Added External Resistance": "58.32 \u03A9",
            "Operating Principle": "Added rotor resistance increases starting torque and lowers speed for given load without reducing maximum breakdown torque."
          }
        }
      ],
      modelCalculations: {
        title: "Rotor Resistance Calculation",
        sampleSetIndex: 1,
        steps: [
          {
            stepNumber: 1,
            description: "Calculate external circuit resistance per phase",
            formula: "R_ext = V_r / I_r",
            substitution: "22 / 0.70",
            result: "31.43 \u03A9"
          },
          {
            stepNumber: 2,
            description: "Slip calculation for set 7",
            formula: "s = (N_s - N) / N_s",
            substitution: "(1500 - 507) / 1500",
            result: "s = 0.662 (66.2% slip)"
          }
        ]
      },
      benchmarkCurves: [
        {
          id: "speed_vs_rext",
          name: "Rotor Speed vs Added Rotor Resistance",
          xAxisKey: "rext",
          xLabel: "Rotor Resistance (\u03A9)",
          yAxisKey: "speed",
          yLabel: "Speed (RPM)",
          points: [
            { x: 31.43, y: 1296 },
            { x: 32.94, y: 1233 },
            { x: 41.05, y: 1135 },
            { x: 48, y: 1059 },
            { x: 60, y: 954 },
            { x: 78, y: 800 },
            { x: 116.84, y: 507 }
          ]
        }
      ]
    },
    // -------------------------------------------------------------
    // EXPERIMENT 5: Load Test on 3-Phase Alternator
    // -------------------------------------------------------------
    exp5: {
      experimentId: "exp5",
      title: "Load Test on Three-Phase Alternator",
      machineNameplate: {
        name: "3-Phase Salient Pole Synchronous Alternator",
        make: "Crompton Greaves",
        type: "CG-SA3.5",
        ratedVoltage: "415 V",
        ratedCurrent: "4.87 A",
        ratedPower: "3.5 kVA",
        ratedSpeed: "1500 RPM",
        frequency: "50 Hz",
        connection: "Star (Y) with Neutral"
      },
      testConditions: {
        fieldVoltage: "220 V DC",
        noLoadSpeed: 1500
      },
      tables: [
        {
          id: "direct_loading",
          name: "Alternator Direct Loading Test Observations (No-load Voltage E\u2080 = 415 V)",
          description: "Measured with 3-phase resistive load bank while maintaining prime mover speed at 1500 RPM.",
          columns: [
            { key: "ifield", label: "Field Current (I_f)", unit: "A" },
            { key: "vt", label: "Terminal Line Voltage (V_t)", unit: "V" },
            { key: "il", label: "Load Line Current (I_L)", unit: "A" },
            { key: "p0", label: "Output Power (P_o)", unit: "W", isCalculated: true },
            { key: "regPct", label: "Voltage Regulation (%)", unit: "%", isCalculated: true }
          ],
          rows: [
            { slNo: 1, ifield: 1.1, vt: 415, il: 0, p0: 0, regPct: 0 },
            { slNo: 2, ifield: 1.1, vt: 410, il: 1, p0: 710.14, regPct: 1.2 },
            { slNo: 3, ifield: 1.06, vt: 400, il: 2, p0: 1385.64, regPct: 3.61 },
            { slNo: 4, ifield: 1.05, vt: 390, il: 2.8, p0: 1891.4, regPct: 6.02 },
            { slNo: 5, ifield: 1.05, vt: 375, il: 3.4, p0: 2208.36, regPct: 9.64 },
            { slNo: 6, ifield: 1.05, vt: 360, il: 4.2, p0: 2618.86, regPct: 13.25 },
            { slNo: 7, ifield: 1.05, vt: 350, il: 4.3, p0: 2606.73, regPct: 15.66 },
            { slNo: 8, ifield: 1.04, vt: 340, il: 4.8, p0: 2826.7, regPct: 18.07 },
            { slNo: 9, ifield: 1.04, vt: 325, il: 5.3, p0: 2983.46, regPct: 21.68 },
            { slNo: 10, ifield: 1.04, vt: 310, il: 5.8, p0: 3114.23, regPct: 25.3 },
            { slNo: 11, ifield: 1.04, vt: 290, il: 6.3, p0: 3164.45, regPct: 30.12 },
            { slNo: 12, ifield: 1.04, vt: 270, il: 6.8, p0: 3180.04, regPct: 34.94 }
          ],
          calculationsSummary: {
            "Full-Load Voltage Regulation (at 4.8 A)": "18.07%",
            "Maximum Test Overload (at 6.8 A)": "34.94% regulation"
          }
        }
      ],
      modelCalculations: {
        title: "Power and Regulation Model Calculation (Set No. 6)",
        sampleSetIndex: 6,
        steps: [
          {
            stepNumber: 1,
            description: "Active 3-phase output power calculation (cos \u03C6 = 1 for resistive load)",
            formula: "P_o = \u221A3 \xB7 V_t \xB7 I_L \xB7 cos(\u03C6)",
            substitution: "\u221A3 \xB7 360 \xB7 4.2 \xB7 1.0",
            result: "2618.86 W"
          },
          {
            stepNumber: 2,
            description: "Percentage voltage regulation calculation",
            formula: "% Regulation = ((E\u2080 - V_t) / E\u2080) \xB7 100",
            substitution: "((415 - 360) / 415) \xB7 100",
            result: "13.25%"
          }
        ]
      },
      benchmarkCurves: [
        {
          id: "vt_vs_il",
          name: "Terminal Voltage vs Load Current",
          xAxisKey: "il",
          xLabel: "Load Current (A)",
          yAxisKey: "vt",
          yLabel: "Terminal Voltage (V)",
          points: [
            { x: 0, y: 415 },
            { x: 1, y: 410 },
            { x: 2, y: 400 },
            { x: 2.8, y: 390 },
            { x: 3.4, y: 375 },
            { x: 4.2, y: 360 },
            { x: 4.8, y: 340 },
            { x: 5.8, y: 310 },
            { x: 6.8, y: 270 }
          ]
        },
        {
          id: "reg_vs_il",
          name: "Voltage Regulation vs Load Current",
          xAxisKey: "il",
          xLabel: "Load Current (A)",
          yAxisKey: "regPct",
          yLabel: "Voltage Regulation (%)",
          points: [
            { x: 0, y: 0 },
            { x: 1, y: 1.2 },
            { x: 2, y: 3.61 },
            { x: 2.8, y: 6.02 },
            { x: 3.4, y: 9.64 },
            { x: 4.2, y: 13.25 },
            { x: 4.8, y: 18.07 },
            { x: 5.8, y: 25.3 },
            { x: 6.8, y: 34.94 }
          ]
        }
      ]
    },
    // -------------------------------------------------------------
    // EXPERIMENT 6A: Alternator Regulation by EMF and MMF Methods
    // -------------------------------------------------------------
    exp6_a: {
      experimentId: "exp6_a",
      title: "Regulation of Alternator by EMF and MMF Methods",
      machineNameplate: {
        name: "Non-Salient Pole Synchronous Alternator",
        make: "Crompton Greaves Standard Unit",
        type: "CG-SA3.5",
        ratedVoltage: "415 V",
        ratedCurrent: "4.8 A",
        ratedPower: "3.5 kVA",
        ratedSpeed: "1500 RPM",
        frequency: "50 Hz",
        connection: "Star (Y)"
      },
      testConditions: {
        effectiveArmatureResistance: 2.415
        // Measured Ra per phase (1.2 * Rdc)
      },
      tables: [
        {
          id: "occ",
          name: "Open Circuit Characteristic (OCC) Test",
          description: "Terminal voltage generated on open circuit at rated synchronous speed (1500 RPM) vs DC field excitation.",
          columns: [
            { key: "ifield", label: "Field Current (I_f)", unit: "A" },
            { key: "e0_line", label: "Open Circuit Line Voltage E\u2080(line)", unit: "V" },
            { key: "e0_phase", label: "Open Circuit Phase Voltage E\u2080(ph)", unit: "V", isCalculated: true }
          ],
          rows: [
            { slNo: 1, ifield: 0, e0_line: 28, e0_phase: 16.16 },
            { slNo: 2, ifield: 0.25, e0_line: 152.5, e0_phase: 87.75 },
            { slNo: 3, ifield: 0.29, e0_line: 170.5, e0_phase: 98.43 },
            { slNo: 4, ifield: 0.31, e0_line: 190.4, e0_phase: 109.92 },
            { slNo: 5, ifield: 0.35, e0_line: 210, e0_phase: 121.24 },
            { slNo: 6, ifield: 0.4, e0_line: 230, e0_phase: 132.8 },
            { slNo: 7, ifield: 0.43, e0_line: 257, e0_phase: 148.4 },
            { slNo: 8, ifield: 0.45, e0_line: 270, e0_phase: 155.8 },
            { slNo: 9, ifield: 0.5, e0_line: 290, e0_phase: 167.4 },
            { slNo: 10, ifield: 0.55, e0_line: 310, e0_phase: 178.9 },
            { slNo: 11, ifield: 0.62, e0_line: 330, e0_phase: 190.5 },
            { slNo: 12, ifield: 0.7, e0_line: 350, e0_phase: 202.1 },
            { slNo: 13, ifield: 0.79, e0_line: 370, e0_phase: 213.6 },
            { slNo: 14, ifield: 0.9, e0_line: 390, e0_phase: 225.2 },
            { slNo: 15, ifield: 1, e0_line: 400, e0_phase: 230.9 },
            { slNo: 16, ifield: 1.09, e0_line: 410, e0_phase: 236.7 }
          ]
        },
        {
          id: "scc",
          name: "Short Circuit Characteristic (SCC) Test",
          description: "Armature short-circuited through ammeters; field current increased until rated current flows.",
          columns: [
            { key: "if_sc", label: "Field Current (I_fsc)", unit: "A" },
            { key: "isc", label: "Short Circuit Current (I_sc)", unit: "A" }
          ],
          rows: [
            { slNo: 1, if_sc: 0.35, isc: 4.3 }
          ],
          calculationsSummary: {
            "Synchronous Impedance (Zs)": "E\u2080(ph) at If=0.35 / I_sc = 121.24 V / 4.3 A = 28.19 \u03A9",
            "Synchronous Reactance (Xs)": "\u221A(Zs\xB2 - Ra\xB2) = \u221A(28.19\xB2 - 2.415\xB2) = 28.09 \u03A9"
          }
        },
        {
          id: "dc_resistance",
          name: "Armature DC Resistance Measurement",
          description: "Per-phase armature winding resistance by DC drop test.",
          columns: [
            { key: "idc", label: "Phase Current (I_dc)", unit: "A" },
            { key: "vdc", label: "Voltage Drop (V_dc)", unit: "V" },
            { key: "rdc", label: "DC Resistance (V_dc / I_dc)", unit: "\u03A9", isCalculated: true },
            { key: "reffective", label: "Effective AC Resistance (1.2 \xB7 R_dc)", unit: "\u03A9", isCalculated: true }
          ],
          rows: [
            { slNo: 1, idc: 2, vdc: 4.1, rdc: 2.05, reffective: 2.46 },
            { slNo: 2, idc: 2.5, vdc: 5, rdc: 2, reffective: 2.4 },
            { slNo: 3, idc: 3, vdc: 6, rdc: 2, reffective: 2.4 },
            { slNo: 4, idc: 3.5, vdc: 7, rdc: 2, reffective: 2.4 }
          ],
          calculationsSummary: {
            "Mean Effective Resistance per phase": "2.415 \u03A9"
          }
        }
      ],
      modelCalculations: {
        title: "EMF Method Regulation at 0.8 PF Lagging",
        sampleSetIndex: 1,
        steps: [
          {
            stepNumber: 1,
            description: "No-load induced EMF per phase equation",
            formula: "E\u2080 = \u221A((V\xB7cos\u03C6 + I\xB7Ra)\xB2 + (V\xB7sin\u03C6 + I\xB7Xs)\xB2)",
            substitution: "\u221A((239.6\xB70.8 + 4.8\xB72.415)\xB2 + (239.6\xB70.6 + 4.8\xB728.09)\xB2)",
            result: "E\u2080 = 345.2 V"
          },
          {
            stepNumber: 2,
            description: "Percentage voltage regulation calculation",
            formula: "% Reg = ((E\u2080 - V) / V) \xB7 100",
            substitution: "((345.2 - 239.6) / 239.6) \xB7 100",
            result: "44.07% (Pessimistic method)"
          }
        ]
      },
      benchmarkCurves: [
        {
          id: "occ_curve",
          name: "Open Circuit Characteristic (OCC)",
          xAxisKey: "ifield",
          xLabel: "Field Current (A)",
          yAxisKey: "e0_phase",
          yLabel: "Phase Voltage (V)",
          points: [
            { x: 0, y: 16.16 },
            { x: 0.25, y: 87.75 },
            { x: 0.35, y: 121.24 },
            { x: 0.5, y: 167.4 },
            { x: 0.7, y: 202.1 },
            { x: 0.9, y: 225.2 },
            { x: 1.09, y: 236.7 }
          ]
        }
      ]
    },
    // -------------------------------------------------------------
    // EXPERIMENT 6B: Load Test on Induction Generator
    // -------------------------------------------------------------
    exp6_b: {
      experimentId: "exp6_b",
      title: "Load Test on Induction Generator",
      machineNameplate: {
        name: "DC Shunt Motor coupled Induction Generator Test Set",
        make: "Kirloskar Integrated Motor-Gen Set",
        type: "KE-IG2.2",
        ratedVoltage: "415 V (Induction) / 220 V (DC)",
        ratedCurrent: "4.7 A (AC) / 14 A (DC)",
        ratedPower: "2.2 kW Induction Generator",
        ratedSpeed: "1440 RPM (Motor) / >1500 RPM (Gen)",
        frequency: "50 Hz",
        connection: "Delta (\u0394) with Delta Capacitor Bank"
      },
      testConditions: {
        syncSpeed: 1494,
        // Measured synchronous speed in lab
        multiplicationFactor: 2
        // Wattmeter MF = 2
      },
      tables: [
        {
          id: "ig_load",
          name: "Induction Generator Loading Observations",
          description: "Driven super-synchronously (N > Ns) by DC motor; excitation supplied by self-excitation capacitor bank.",
          columns: [
            { key: "vac", label: "AC Generated Voltage (V_ac)", unit: "V" },
            { key: "iac", label: "AC Output Current (I_ac)", unit: "A" },
            { key: "pac_out", label: "Active Power Output (P_ac)", unit: "W" },
            { key: "vdc", label: "DC Input Voltage (V_dc)", unit: "V" },
            { key: "idc", label: "DC Input Current (I_dc)", unit: "A" },
            { key: "speed", label: "Shaft Speed (N)", unit: "RPM" }
          ],
          rows: [
            { slNo: 1, vac: 415, iac: 3.95, pac_out: 200, vdc: 220, idc: 3.5, speed: 1503.6 },
            { slNo: 2, vac: 415, iac: 3.95, pac_out: 280, vdc: 216, idc: 4.5, speed: 1505.5 },
            { slNo: 3, vac: 415, iac: 4.1, pac_out: 560, vdc: 216, idc: 5, speed: 1507 },
            { slNo: 4, vac: 415, iac: 4.2, pac_out: 720, vdc: 215, idc: 6, speed: 1509.6 },
            { slNo: 5, vac: 415, iac: 4.4, pac_out: 890, vdc: 215, idc: 7, speed: 1512 },
            { slNo: 6, vac: 415, iac: 4.5, pac_out: 1080, vdc: 214, idc: 8, speed: 1514.4 },
            { slNo: 7, vac: 415, iac: 4.65, pac_out: 1220, vdc: 210, idc: 9, speed: 1516.2 },
            { slNo: 8, vac: 415, iac: 4.8, pac_out: 1400, vdc: 210, idc: 10, speed: 1517 },
            { slNo: 9, vac: 415, iac: 4.9, pac_out: 1560, vdc: 210, idc: 11, speed: 1521 },
            { slNo: 10, vac: 415, iac: 5, pac_out: 1740, vdc: 210, idc: 12, speed: 1524 },
            { slNo: 11, vac: 415, iac: 5.1, pac_out: 2e3, vdc: 208, idc: 13, speed: 1527.8 },
            { slNo: 12, vac: 415, iac: 5.3, pac_out: 2080, vdc: 208, idc: 14, speed: 1528.8 }
          ]
        }
      ],
      modelCalculations: {
        title: "Super-Synchronous Generator Calculations (Set No. 6)",
        sampleSetIndex: 6,
        steps: [
          {
            stepNumber: 1,
            description: "DC Prime Mover Input Power",
            formula: "P_dc = V_dc \xB7 I_dc",
            substitution: "214 \xB7 8.0",
            result: "1712 W"
          },
          {
            stepNumber: 2,
            description: "Mechanical shaft power input to generator (\u03B7_dc = 85%)",
            formula: "P_ac_in = 0.85 \xB7 P_dc",
            substitution: "0.85 \xB7 1712",
            result: "1455.2 W"
          },
          {
            stepNumber: 3,
            description: "Generator Power Factor (using half-meter active output reading 540 W)",
            formula: "cos \u03C6 = P_ac_out / (\u221A3 \xB7 V_ac \xB7 I_ac)",
            substitution: "540 / (\u221A3 \xB7 415 \xB7 4.5)",
            result: "0.166"
          },
          {
            stepNumber: 4,
            description: "Negative Generator Slip (Super-Synchronous Operation)",
            formula: "s = ((N_s - N) / N_s) \xB7 100",
            substitution: "((1494 - 1514.4) / 1494) \xB7 100",
            result: "-1.36% (Negative slip confirms generating mode)"
          }
        ]
      },
      benchmarkCurves: [
        {
          id: "pac_vs_speed",
          name: "Generated Power vs Shaft Speed",
          xAxisKey: "speed",
          xLabel: "Shaft Speed (RPM)",
          yAxisKey: "pac_out",
          yLabel: "Generated Active Power (W)",
          points: [
            { x: 1503.6, y: 200 },
            { x: 1507, y: 560 },
            { x: 1512, y: 890 },
            { x: 1514.4, y: 1080 },
            { x: 1521, y: 1560 },
            { x: 1528.8, y: 2080 }
          ]
        }
      ]
    },
    // -------------------------------------------------------------
    // EXPERIMENT 7: Regulation of Alternator by ZPF / Potier Method
    // -------------------------------------------------------------
    exp7: {
      experimentId: "exp7",
      title: "Regulation of Alternator by ZPF (Potier Triangle) Method",
      machineNameplate: {
        name: "3-Phase Cylindrical / Salient Pole Alternator",
        make: "Crompton Greaves Precision Test Unit",
        type: "CG-SA3.5",
        ratedVoltage: "415 V",
        ratedCurrent: "4.87 A (Tested up to 6.9 A)",
        ratedPower: "3.5 kVA",
        ratedSpeed: "1500 RPM",
        frequency: "50 Hz",
        connection: "Star (Y)"
      },
      testConditions: {
        effectiveArmatureResistance: 2.4
        // Ra / phase = 2.4 Ohms
      },
      tables: [
        {
          id: "occ",
          name: "Open Circuit Characteristic (OCC) Curve",
          description: "Field current vs generated line and phase voltage.",
          columns: [
            { key: "ifield", label: "Field Current (I_f)", unit: "A" },
            { key: "e0_line", label: "Line Voltage E\u2080(line)", unit: "V" },
            { key: "e0_phase", label: "Phase Voltage E\u2080(ph)", unit: "V", isCalculated: true }
          ],
          rows: [
            { slNo: 1, ifield: 0, e0_line: 12.94, e0_phase: 7.47 },
            { slNo: 2, ifield: 0.3, e0_line: 211.6, e0_phase: 122.16 },
            { slNo: 3, ifield: 0.35, e0_line: 245.8, e0_phase: 141.91 },
            { slNo: 4, ifield: 0.4, e0_line: 273.6, e0_phase: 157.96 },
            { slNo: 5, ifield: 0.45, e0_line: 304.6, e0_phase: 175.86 },
            { slNo: 6, ifield: 0.5, e0_line: 341.7, e0_phase: 197.28 },
            { slNo: 7, ifield: 0.55, e0_line: 363.2, e0_phase: 209.69 },
            { slNo: 8, ifield: 0.6, e0_line: 386.2, e0_phase: 222.97 },
            { slNo: 9, ifield: 0.65, e0_line: 405, e0_phase: 233.82 },
            { slNo: 10, ifield: 0.7, e0_line: 421, e0_phase: 243.06 },
            { slNo: 11, ifield: 0.75, e0_line: 439, e0_phase: 253.45 },
            { slNo: 12, ifield: 0.8, e0_line: 450, e0_phase: 259.8 }
          ]
        },
        {
          id: "zpf_test_points",
          name: "ZPF Operating & Short-Circuit Test Points",
          description: "Two boundary test points used to construct the Potier Triangle.",
          columns: [
            { key: "pointName", label: "Test Point", unit: "-" },
            { key: "voltage", label: "Terminal Line Voltage", unit: "V" },
            { key: "ifield", label: "Field Current (I_f)", unit: "A" },
            { key: "armatureCurrent", label: "Armature Current (I_a)", unit: "A" }
          ],
          rows: [
            { slNo: 1, pointName: "Short-Circuit Point (Zero Voltage Point)", voltage: 0, ifield: 1, armatureCurrent: 6.9 },
            { slNo: 2, pointName: "ZPF Rated Voltage Point (Pure Inductive Load)", voltage: 415, ifield: 1.7, armatureCurrent: 6.94 }
          ],
          calculationsSummary: {
            "Potier Leakage Reactance Drop (BK)": "Height of Potier triangle = 42 V per phase",
            "Leakage Reactance (Xl)": "42 V / 6.9 A = 6.08 \u03A9",
            "Armature Reaction MMF (Fa)": "Base of Potier triangle = 0.32 A (field equivalent)"
          }
        },
        {
          id: "predetermined_reg",
          name: "Pre-Determined Regulation Table Across Power Factors",
          description: "Calculated voltage regulation from Potier triangle parameters.",
          columns: [
            { key: "nature", label: "Nature of PF", unit: "-" },
            { key: "pf", label: "Power Factor", unit: "-" },
            { key: "vrated", label: "Rated V/ph", unit: "V" },
            { key: "e_induced", label: "Induced E", unit: "V" },
            { key: "if_total", label: "Total I_f Required", unit: "A" },
            { key: "e0_phase", label: "Generated E\u2080/ph", unit: "V" },
            { key: "regPct", label: "Voltage Regulation", unit: "%" }
          ],
          rows: [
            { slNo: 1, nature: "Lagging", pf: 0, vrated: 239.6, e_induced: 307.4, if_total: 2.046, e0_phase: 315, regPct: 31.4 },
            { slNo: 2, nature: "Lagging", pf: 0.2, vrated: 239.6, e_induced: 308.49, if_total: 2.036, e0_phase: 315, regPct: 31.4 },
            { slNo: 3, nature: "Lagging", pf: 0.4, vrated: 239.6, e_induced: 307.32, if_total: 2, e0_phase: 315, regPct: 31.4 },
            { slNo: 4, nature: "Lagging", pf: 0.6, vrated: 239.6, e_induced: 303.31, if_total: 1.94, e0_phase: 315, regPct: 31.4 },
            { slNo: 5, nature: "Lagging", pf: 0.8, vrated: 239.6, e_induced: 294.7, if_total: 1.83, e0_phase: 315, regPct: 31.4 },
            { slNo: 6, nature: "UPF", pf: 1, vrated: 239.6, e_induced: 262.23, if_total: 1.47, e0_phase: 310, regPct: 29.38 },
            { slNo: 7, nature: "Leading", pf: 0.8, vrated: 239.6, e_induced: 219.17, if_total: 0.97, e0_phase: 283, regPct: 18.11 },
            { slNo: 8, nature: "Leading", pf: 0.6, vrated: 239.6, e_induced: 200.61, if_total: 0.74, e0_phase: 240, regPct: 0.17 },
            { slNo: 9, nature: "Leading", pf: 0.4, vrated: 239.6, e_induced: 187.49, if_total: 0.56, e0_phase: 209, regPct: -12.77 },
            { slNo: 10, nature: "Leading", pf: 0.2, vrated: 239.6, e_induced: 178.28, if_total: 0.43, e0_phase: 174, regPct: -27.38 },
            { slNo: 11, nature: "Leading", pf: 0, vrated: 239.6, e_induced: 172.65, if_total: 0.386, e0_phase: 145, regPct: -39.48 }
          ]
        }
      ],
      modelCalculations: {
        title: "ZPF Regulation at 0.8 PF Lagging",
        sampleSetIndex: 5,
        steps: [
          {
            stepNumber: 1,
            description: "Calculate voltage behind leakage reactance E",
            formula: "E = \u221A((V\xB7cos\u03C6 + I\xB7Ra)\xB2 + (V\xB7sin\u03C6 + I\xB7Xl)\xB2)",
            substitution: "\u221A((239.6\xB70.8 + 6.94\xB72.4)\xB2 + (239.6\xB70.6 + 6.94\xB76.08)\xB2)",
            result: "E = 294.70 V"
          },
          {
            stepNumber: 2,
            description: "Obtain field excitation from OCC and combine with Armature reaction MMF vectorially",
            formula: "Total If = \u221A(If1\xB2 + Fa\xB2 - 2\xB7If1\xB7Fa\xB7cos(90 + \u03C6))",
            substitution: "\u221A(1.55\xB2 + 0.32\xB2 - 2\xB71.55\xB70.32\xB7cos(126.87\xB0))",
            result: "Total If = 1.83 A"
          },
          {
            stepNumber: 3,
            description: "Pre-determined voltage regulation",
            formula: "% Regulation = ((E\u2080 - V) / V) \xB7 100",
            substitution: "((315 - 239.6) / 239.6) \xB7 100",
            result: "31.40%"
          }
        ]
      },
      benchmarkCurves: [
        {
          id: "reg_vs_pf",
          name: "Percentage Regulation vs Power Factor",
          xAxisKey: "pf",
          xLabel: "Power Factor (Lagging -> UPF -> Leading)",
          yAxisKey: "regPct",
          yLabel: "Regulation (%)",
          points: [
            { x: -0, y: 31.4 },
            { x: -0.8, y: 31.4 },
            { x: 1, y: 29.38 },
            { x: 0.8, y: 18.11 },
            { x: 0.6, y: 0.17 },
            { x: 0.4, y: -12.77 },
            { x: 0, y: -39.48 }
          ]
        }
      ]
    },
    // -------------------------------------------------------------
    // EXPERIMENT 8: Alternator on Infinite Bus Bar (V and Inverted-V Curves)
    // -------------------------------------------------------------
    exp8: {
      experimentId: "exp8",
      title: "Alternator Connected to Infinite Bus Bar (V & Inverted V Curves)",
      machineNameplate: {
        name: "Grid-Connected Synchronous Alternator",
        make: "Crompton Greaves Synchronization Test Set",
        type: "CG-SA3.5",
        ratedVoltage: "415 V",
        ratedCurrent: "4.87 A",
        ratedPower: "3.5 kVA",
        ratedSpeed: "1500 RPM",
        frequency: "50 Hz",
        connection: "Star (Y) to Infinite Bus via Synchronizer"
      },
      testConditions: {
        multiplicationFactor: 2
        // Wattmeter multiplication factor = 2
      },
      tables: [
        {
          id: "v_curves_data",
          name: "V & Inverted V Curves Tabular Observations",
          description: "Varying field current from under-excitation to over-excitation while delivering constant active power to the busbar.",
          columns: [
            { key: "vl", label: "Bus Voltage (V_L)", unit: "V" },
            { key: "il", label: "Armature Line Current (I_L)", unit: "A" },
            { key: "ifield", label: "Field Excitation (I_f)", unit: "A" },
            { key: "wattmeter", label: "Active Power (W)", unit: "W" },
            { key: "pf", label: "Operating Power Factor", unit: "-", isCalculated: true }
          ],
          rows: [
            { slNo: 1, vl: 415, il: 6.6, ifield: 0.4, wattmeter: 200, pf: 0.252 },
            { slNo: 2, vl: 415, il: 5.8, ifield: 0.5, wattmeter: 200, pf: 0.287 },
            { slNo: 3, vl: 415, il: 5, ifield: 0.6, wattmeter: 200, pf: 0.333 },
            { slNo: 4, vl: 415, il: 4.2, ifield: 0.7, wattmeter: 200, pf: 0.397 },
            { slNo: 5, vl: 415, il: 3.2, ifield: 0.8, wattmeter: 200, pf: 0.521 },
            { slNo: 6, vl: 420, il: 2.6, ifield: 0.9, wattmeter: 200, pf: 0.634 },
            { slNo: 7, vl: 420, il: 2.2, ifield: 1, wattmeter: 200, pf: 0.749 },
            { slNo: 8, vl: 420, il: 2, ifield: 1.1, wattmeter: 200, pf: 0.824 },
            { slNo: 9, vl: 420, il: 2, ifield: 1.2, wattmeter: 200, pf: 0.824 },
            { slNo: 10, vl: 420, il: 2.3, ifield: 1.3, wattmeter: 200, pf: 0.717 },
            { slNo: 11, vl: 420, il: 2, ifield: 1.4, wattmeter: 200, pf: 0.824 },
            { slNo: 12, vl: 420, il: 3.1, ifield: 1.5, wattmeter: 200, pf: 0.532 },
            { slNo: 13, vl: 420, il: 3.8, ifield: 1.6, wattmeter: 200, pf: 0.434 },
            { slNo: 14, vl: 420, il: 4.4, ifield: 1.7, wattmeter: 200, pf: 0.374 },
            { slNo: 15, vl: 420, il: 5.1, ifield: 1.8, wattmeter: 200, pf: 0.323 },
            { slNo: 16, vl: 420, il: 5.7, ifield: 1.9, wattmeter: 200, pf: 0.289 },
            { slNo: 17, vl: 420, il: 6.3, ifield: 2, wattmeter: 200, pf: 0.261 },
            { slNo: 18, vl: 420, il: 6.9, ifield: 2.1, wattmeter: 200, pf: 0.239 }
          ],
          calculationsSummary: {
            "Minimum Armature Current (Unity Power Factor Point)": "I_L = 2.0 A at I_f = 1.1 - 1.2 A",
            "Under-Excited Regime (I_f < 1.1 A)": "Lagging Power Factor (Delivers lagging reactive power to bus)",
            "Over-Excited Regime (I_f > 1.2 A)": "Leading Power Factor (Absorbs leading reactive power / acts as synchronous condenser)"
          }
        }
      ],
      modelCalculations: {
        title: "Power Factor Calculation (Row 8 Minimum Current Point)",
        sampleSetIndex: 8,
        steps: [
          {
            stepNumber: 1,
            description: "Power Factor calculation from wattmeter reading and multiplication factor",
            formula: "cos \u03C6 = (W \xB7 MF) / (\u221A3 \xB7 V_L \xB7 I_L)",
            substitution: "(200 \xB7 2) / (\u221A3 \xB7 420 \xB7 2.0)",
            result: "cos \u03C6 = 400 / 1454.9 = 0.824"
          }
        ]
      },
      benchmarkCurves: [
        {
          id: "v_curve",
          name: "V Curve (Armature Current Ia vs Field Current If)",
          xAxisKey: "ifield",
          xLabel: "Field Current If (A)",
          yAxisKey: "il",
          yLabel: "Armature Current Ia (A)",
          points: [
            { x: 0.4, y: 6.6 },
            { x: 0.6, y: 5 },
            { x: 0.8, y: 3.2 },
            { x: 1.1, y: 2 },
            { x: 1.5, y: 3.1 },
            { x: 1.8, y: 5.1 },
            { x: 2.1, y: 6.9 }
          ]
        },
        {
          id: "inverted_v_curve",
          name: "Inverted V Curve (Power Factor vs Field Current If)",
          xAxisKey: "ifield",
          xLabel: "Field Current If (A)",
          yAxisKey: "pf",
          yLabel: "Power Factor (cos \u03C6)",
          points: [
            { x: 0.4, y: 0.252 },
            { x: 0.6, y: 0.333 },
            { x: 0.8, y: 0.521 },
            { x: 1.1, y: 0.824 },
            { x: 1.5, y: 0.532 },
            { x: 1.8, y: 0.323 },
            { x: 2.1, y: 0.239 }
          ]
        }
      ]
    }
  };

  // src/data/learningGuide.ts
  var STUDENT_LEARNING_GUIDES = {
    exp2: {
      experimentId: "exp2",
      title: "No-Load & Blocked Rotor Tests on 3-Phase Induction Motor (Circle Diagram)",
      aim: "To determine the equivalent circuit parameters (R\u2081, X\u2081, R\u2082', X\u2082', R_c, X_m) and construct the Circle Diagram to predict full-load current, power factor, slip, torque, efficiency, and maximum output without loading the machine mechanically.",
      circuitExplanation: "Two wattmeters measure 3-phase power. An auto-transformer adjusts the voltage. For no-load, full 415 V is applied with free shaft. For blocked-rotor, a mechanical clamp locks the rotor completely while low voltage (114 V) is injected so only rated current (4.7 A) flows.",
      operatingPrinciple: "Similar to transformer open-circuit and short-circuit tests. At no load (slip s \u2248 0), the rotor branch looks like an open circuit, isolating the magnetizing branch (Rc, Xm). When blocked (s = 1), the rotor branch dominates, isolating the series leakage impedance (R\u2080\u2081, X\u2080\u2081).",
      keyFormulas: [
        {
          name: "No-Load Power Factor",
          latex: "\\cos\\phi_0 = \\frac{W_0}{\\sqrt{3} V_0 I_0}",
          variables: [
            { symbol: "W\u2080", meaning: "Total 3-phase no-load power", unit: "Watts" },
            { symbol: "V\u2080", meaning: "Rated line-to-line stator voltage", unit: "Volts" },
            { symbol: "I\u2080", meaning: "No-load line current", unit: "Amperes" }
          ]
        },
        {
          name: "Short-Circuit Equivalent Impedance",
          latex: "Z_{01} = \\frac{V_{sc}}{\\sqrt{3} I_{sc}}, \\quad R_{01} = \\frac{W_{sc}}{3 I_{sc}^2}, \\quad X_{01} = \\sqrt{Z_{01}^2 - R_{01}^2}",
          variables: [
            { symbol: "V_sc", meaning: "Short-circuit voltage per line", unit: "Volts" },
            { symbol: "I_sc", meaning: "Rated blocked-rotor line current", unit: "Amperes" },
            { symbol: "W_sc", meaning: "Short-circuit power", unit: "Watts" }
          ]
        },
        {
          name: "Rotor Resistance referred to Stator",
          latex: "R_2' = R_{01} - R_1",
          variables: [
            { symbol: "R_1", meaning: "Stator effective AC resistance per phase", unit: "Ohms" },
            { symbol: "R_2'", meaning: "Referred rotor resistance", unit: "Ohms" }
          ]
        }
      ],
      stepByStepProcedure: [
        "Ensure the variac (auto-transformer) is at zero position before turning ON the 3-phase supply.",
        "No-Load Test: Leave the motor shaft completely uncoupled and free to rotate. Gradually increase the variac to rated 415 V. Record V\u2080, I\u2080, and both wattmeter readings (W\u2081 and W\u2082).",
        "Blocked Rotor Test: Firmly tighten the mechanical brake belt clamp to lock the rotor shaft securely. Slowly apply low voltage until the ammeter indicates rated motor current (4.7 A). Take readings swiftly (within 30 seconds) to prevent winding overheating.",
        "Measure stator resistance by applying small DC voltage across two stator terminals and recording V_dc and I_dc.",
        "Construct the Circle Diagram by drawing the reference voltage vector V on the Y-axis and plotting no-load current I\u2080 and short-circuit current I_sc."
      ],
      safetyPrecautions: [
        "Never touch the rotor belt while power is ON.",
        "During the blocked-rotor test, do not keep the supply ON for more than 45 seconds; high current heats the rotor bars quickly.",
        "Always start the auto-transformer from zero output to prevent massive inrush currents."
      ],
      vivaVoce: [
        {
          question: "Why is the power factor of an induction motor very low (0.1 to 0.2) at no load?",
          answer: "Because the air gap requires a substantial magnetizing current to establish the rotating magnetic field, which is almost 90\xB0 lagging behind the voltage vector.",
          conceptCategory: "Theory"
        },
        {
          question: "What is the purpose of drawing the Circle Diagram?",
          answer: "The circle diagram allows graphical determination of complete motor performance (torque, slip, efficiency, power factor, maximum torque/breakdown torque) at any load without physically loading the machine.",
          conceptCategory: "Applications"
        },
        {
          question: "Why do we multiply the DC measured resistance by 1.2 to 1.5 to get AC resistance?",
          answer: "To account for the Skin Effect and eddy currents in the stator copper conductors at 50 Hz, which forces the current to flow near the conductor surface, decreasing effective cross-section.",
          conceptCategory: "Measurement"
        }
      ],
      philosophicalInsight: {
        theme: "The Archetype of the Infinite Circle",
        essence: "The physical behavior of an induction motor traces an unbroken circle on the complex phasor plane. Even amidst nonlinear mechanical friction, core hysteresis, and stator heating, the fundamental electrical relationship maps strictly into circular geometry.",
        quote: "Geometry existed before the creation; it is co-eternal with the mind of God.",
        author: "Johannes Kepler"
      },
      mathematicalStructure: {
        symmetryGroup: "Conformal circle mapping in complex admittance plane",
        governingDifferentialEq: "V_1(t) = R_1 i_1 + L_1 (di_1/dt) + M (d(i_2 e^{j\\theta})/dt)",
        geometricLocus: "Bilinear Mobius transformation of straight line R2/s into circular locus"
      }
    },
    exp3: {
      experimentId: "exp3",
      title: "Speed Control of 3-Phase Induction Motor",
      aim: "To control and analyze the speed of an induction motor using three classic methods: (1) Pole Changing (Dahlander switch), (2) Stator Voltage Variation, and (3) Rotor Resistance Insertion in slip-ring motor.",
      circuitExplanation: "For pole changing, stator coils are reconfigured between series and parallel groupings to toggle between 2, 4, and 6 poles. For stator voltage, a 3\u03C6 variac alters V. For rotor resistance, external rheostats are inserted into the rotor via slip rings.",
      operatingPrinciple: "Synchronous speed is Ns = 120f / P. Changing P provides step changes in synchronous speed. Changing stator voltage reduces developed torque (T \u221D V\xB2), forcing the motor to operate at higher slip for a given load torque. Adding rotor resistance shifts maximum torque to higher slip speeds.",
      keyFormulas: [
        {
          name: "Synchronous Speed Formula",
          latex: "N_s = \\frac{120 \\cdot f}{P}",
          variables: [
            { symbol: "f", meaning: "Supply frequency (50 Hz)", unit: "Hz" },
            { symbol: "P", meaning: "Number of magnetic poles (2, 4, 6, 8)", unit: "-" }
          ]
        },
        {
          name: "Torque-Voltage Proportionality",
          latex: "T_d \\propto s \\cdot \\frac{V^2}{R_2}",
          variables: [
            { symbol: "V", meaning: "Stator terminal voltage", unit: "Volts" },
            { symbol: "s", meaning: "Rotor operating slip", unit: "-" }
          ]
        }
      ],
      stepByStepProcedure: [
        "Pole Changing: Configure the stator winding selector to 6 poles, 4 poles, and 2 poles. Record the steady-state no-load speed with an optical tachometer.",
        "Stator Voltage Control: Keep poles fixed at 4. Vary the auto-transformer from 20% (83 V) up to 100% (415 V) in steps. Record no-load speed and speed under 25% load.",
        "Rotor Resistance Control: Connect a 3-phase ganged rheostat to the slip-ring terminals. Starting with maximum resistance, gradually decrease resistance while recording rotor voltage, current, and shaft speed."
      ],
      safetyPrecautions: [
        "Do not switch pole configuration while the motor is running at full speed.",
        "Ensure the external rotor rheostat is set to maximum resistance before starting the slip-ring motor."
      ],
      vivaVoce: [
        {
          question: "Why is stator voltage control not suitable for wide speed variation in squirrel cage motors?",
          answer: "Because torque drops as the square of voltage (V\xB2). At reduced voltages, the motor draws higher currents to satisfy load torque, leading to excessive stator heating and poor efficiency.",
          conceptCategory: "Theory"
        },
        {
          question: "Can rotor resistance control be applied to squirrel-cage induction motors?",
          answer: "No. Squirrel cage rotors have end-rings short-circuiting all bars permanently; external resistances can only be introduced via slip rings in wound-rotor induction motors.",
          conceptCategory: "Applications"
        }
      ],
      philosophicalInsight: {
        theme: "The Quantization of Electromagnetic Velocity",
        essence: "Speed in a rotating machine is not an arbitrary variable; it is fundamentally quantized by the spatial harmonic configuration of magnetic pole pairs. To change poles is to alter the very geometry of space through which the rotor journeys.",
        quote: "Motion is the manifestation of geometry changing its mind.",
        author: "Henri Poincar\xE9"
      },
      mathematicalStructure: {
        symmetryGroup: "Discrete cyclic permutation group Z_P of stator winding coils",
        governingDifferentialEq: "T_e(t) - T_L(t) = J (d\\omega_m / dt) + B \\omega_m",
        geometricLocus: "Torque-Speed curve scaling as T \\propto s V^2 / R_2"
      }
    },
    exp5: {
      experimentId: "exp5",
      title: "Direct Load Test on Three-Phase Alternator",
      aim: "To determine the terminal voltage regulation and electrical efficiency of a 3-phase synchronous alternator under direct resistive loading.",
      circuitExplanation: "A DC shunt motor serves as prime mover to spin the alternator at rated 1500 RPM. DC field winding is excited until terminal line voltage reaches rated 415 V. A 3-phase lamp load bank is loaded step-by-step.",
      operatingPrinciple: "When load current flows in the armature, three voltage drops occur: armature resistance drop (I\xB7Ra), leakage reactance drop (I\xB7Xl), and armature reaction drop. For a unity power factor resistive load, cross-magnetizing armature reaction reduces and distorts the main flux, causing terminal voltage to decrease as load increases.",
      keyFormulas: [
        {
          name: "Percentage Voltage Regulation",
          latex: "\\% \\text{Regulation} = \\frac{E_0 - V_t}{E_0} \\times 100\\%",
          variables: [
            { symbol: "E\u2080", meaning: "No-load terminal line voltage (415 V)", unit: "Volts" },
            { symbol: "V_t", meaning: "Full-load or given load terminal line voltage", unit: "Volts" }
          ]
        },
        {
          name: "Three-Phase Active Output Power",
          latex: "P_o = \\sqrt{3} \\cdot V_t \\cdot I_L \\cdot \\cos\\phi",
          variables: [
            { symbol: "V_t", meaning: "Terminal line voltage", unit: "Volts" },
            { symbol: "I_L", meaning: "Armature line current", unit: "Amperes" },
            { symbol: "cos \u03C6", meaning: "Load power factor (1.0 for resistive)", unit: "-" }
          ]
        }
      ],
      stepByStepProcedure: [
        "Start the DC prime mover and adjust its field rheostat until speed reaches exactly 1500 RPM (synchronous speed for 4-pole, 50 Hz).",
        "Switch ON the DC excitation supply to the alternator field. Adjust field rheostat until open-circuit line voltage is exactly 415 V.",
        "Switch ON the 3-phase resistive load bank step by step (1 A, 2 A, up to rated 4.8 A and 6.8 A).",
        "At every load step, verify speed remains 1500 RPM; read field current, line voltage, and load current.",
        "Gradually switch OFF the load steps, decrease excitation, and shut down prime mover."
      ],
      safetyPrecautions: [
        "Never open-circuit the DC field winding of the alternator while high current is flowing; dangerous high-voltage inductive kicks can occur.",
        "Ensure the neutral terminal is securely grounded."
      ],
      vivaVoce: [
        {
          question: "What is voltage regulation of an alternator and why is it important?",
          answer: "It is the percentage change in terminal voltage when rated load at a given power factor is reduced to zero, with speed and field current remaining constant. Low regulation is desired for stable grid voltages.",
          conceptCategory: "Theory"
        },
        {
          question: "Why does direct load test become impractical for large alternators (e.g. 50 MVA)?",
          answer: "Because huge loads are not available in a laboratory to dissipate full electrical power, and the energy cost and prime mover size would be prohibitive.",
          conceptCategory: "Applications"
        }
      ],
      philosophicalInsight: {
        theme: "The Inescapable Law of Equilibrium",
        essence: "Every watt of electrical power delivered to the external load creates an opposing armature reaction flux inside the machine. You cannot extract energy from nature without the universe pushing back with equal and opposite force.",
        quote: "Energy cannot be drawn without giving equal resistance to the cosmos.",
        author: "Heinrich Lenz"
      },
      mathematicalStructure: {
        symmetryGroup: "Terminal phasor voltage polygon V_t = E_0 - I_a(R_a + jX_s)",
        governingDifferentialEq: "v_{abc}(t) = -R_s i_{abc} - d\\lambda_{abc}/dt",
        geometricLocus: "Drooping hyperbolic voltage regulation curve V_t(I_L)"
      }
    },
    exp6_a: {
      experimentId: "exp6_a",
      title: "Regulation of Alternator by EMF & MMF Methods (OCC & SCC Tests)",
      aim: "To predetermine the voltage regulation of a non-salient pole alternator at various power factors (lagging, unity, leading) using Synchronous Impedance (EMF) and Ampere-Turn (MMF) methods.",
      circuitExplanation: "The alternator is driven at 1500 RPM. For OCC, armature is open and open-circuit voltage is recorded against field current. For SCC, armature terminals are shorted through ammeters and field current required for rated short-circuit current is measured.",
      operatingPrinciple: "Synchronous impedance Zs = E\u2080(ph) / I_sc(ph) for the same field excitation. The EMF method treats all armature reaction effects as fictitious reactance drops (Xs), giving higher (pessimistic) regulation values. The MMF method treats both leakage reactance and armature reaction as MMF vectors, giving optimistic regulation values.",
      keyFormulas: [
        {
          name: "Synchronous Impedance & Reactance",
          latex: "Z_s = \\frac{E_{0(ph)}}{I_{sc(ph)}}, \\quad X_s = \\sqrt{Z_s^2 - R_a^2}",
          variables: [
            { symbol: "E\u2080(ph)", meaning: "Open-circuit phase voltage at given If", unit: "Volts" },
            { symbol: "I_sc(ph)", meaning: "Short-circuit phase current at same If", unit: "Amperes" },
            { symbol: "Ra", meaning: "Armature effective resistance per phase", unit: "Ohms" }
          ]
        },
        {
          name: "No-Load Induced EMF by EMF Method",
          latex: "E_0 = \\sqrt{(V \\cos\\phi + I R_a)^2 + (V \\sin\\phi \\pm I X_s)^2}",
          variables: [
            { symbol: "+ sign", meaning: "Used for lagging power factor", unit: "-" },
            { symbol: "- sign", meaning: "Used for leading power factor", unit: "-" }
          ]
        }
      ],
      stepByStepProcedure: [
        "Drive alternator at 1500 RPM using DC shunt motor.",
        "OCC Test: Keep armature switch open. Vary field excitation from 0 up to 1.09 A. Record terminal line voltage at each step until saturation is observed.",
        "SCC Test: Set field rheostat to maximum resistance. Close the 3-phase shorting link across armature terminals with ammeters connected. Gradually increase field current until rated current (4.3 - 4.8 A) flows.",
        "Measure armature resistance per phase by DC drop method.",
        "Calculate Zs and Xs, then compute regulation for 0.8 lag, UPF, and 0.8 lead."
      ],
      safetyPrecautions: [
        "Always start SCC with field rheostat at MAXIMUM resistance (minimum excitation) to prevent sudden burnout of armature windings.",
        "Never disconnect meters while under short-circuit."
      ],
      vivaVoce: [
        {
          question: "Why is the EMF method called the pessimistic method?",
          answer: "Because Zs is determined using the unsaturated region of the OCC. Under actual loaded conditions, the magnetic core saturates, so actual voltage drop is smaller than predicted by the EMF method.",
          conceptCategory: "Theory"
        },
        {
          question: "Can voltage regulation of an alternator ever be negative?",
          answer: "Yes! At leading power factor loads (capacitive loads), the armature reaction is magnetizing, boosting the terminal voltage on load, making (E\u2080 - V) negative.",
          conceptCategory: "Theory"
        }
      ],
      philosophicalInsight: {
        theme: "The Complementary Duality of Physics",
        essence: "The EMF method treats the armature reaction as a fictitious inductive reactance drop (Xs), while the MMF method treats both leakage and reaction as magnetomotive vectors. Each model is an approximation of the underlying nonlinear electromagnetic continuum.",
        quote: "Opposites are complementary, not contradictory.",
        author: "Niels Bohr"
      },
      mathematicalStructure: {
        symmetryGroup: "Phasor triangle equilibrium: E_0^2 = (V\\cos\\phi + IR_a)^2 + (V\\sin\\phi + IX_s)^2",
        governingDifferentialEq: "d\\psi_d/dt = -R i_d - \\omega \\psi_q + v_d",
        geometricLocus: "Intersection of the linear air-gap line and core saturation knee"
      }
    },
    exp6_b: {
      experimentId: "exp6_b",
      title: "Load Test on Induction Generator",
      aim: "To conduct a load test on an isolated 3-phase induction generator driven super-synchronously (N > Ns) and investigate efficiency, power factor, line current, and negative slip characteristics.",
      circuitExplanation: "An induction machine is mechanically coupled to a DC shunt motor prime mover. A delta-connected capacitor bank is connected across the induction machine stator terminals to supply required magnetizing reactive power (VARs). A 3-phase resistive load is connected in parallel.",
      operatingPrinciple: "An induction motor becomes an induction generator when its rotor is driven above synchronous speed (s < 0). It cannot generate its own reactive power, so the external capacitor bank provides the leading reactive current to maintain stator flux. Mechanical power is converted into AC electrical output.",
      keyFormulas: [
        {
          name: "Negative Operating Slip",
          latex: "s = \\frac{N_s - N}{N_s} \\times 100\\%",
          variables: [
            { symbol: "Ns", meaning: "Synchronous speed (1494 - 1500 RPM)", unit: "RPM" },
            { symbol: "N", meaning: "Rotor shaft speed (> 1500 RPM)", unit: "RPM" }
          ]
        },
        {
          name: "Minimum Excitation Capacitance",
          latex: "C_{ph} \\ge \\frac{I_m}{2\\pi f V_{ph}}",
          variables: [
            { symbol: "Im", meaning: "Magnetizing current per phase", unit: "Amperes" },
            { symbol: "Vph", meaning: "Rated phase voltage", unit: "Volts" }
          ]
        }
      ],
      stepByStepProcedure: [
        "Connect the delta capacitor bank across the stator terminals.",
        "Start the DC motor prime mover and increase speed past synchronous speed (1503 to 1528 RPM).",
        "Observe terminal voltage building up due to residual magnetism and capacitive resonance.",
        "Apply 3-phase electrical load in increments. Record Vac, Iac, Pac, Vdc, Idc, and shaft speed N.",
        "Compute negative slip, DC electrical input, AC electrical output, and efficiency."
      ],
      safetyPrecautions: [
        "Ensure the capacitors are discharged using a discharge resistor before touching terminals after the experiment.",
        "Do not exceed maximum safe overspeed of the motor."
      ],
      vivaVoce: [
        {
          question: "What happens if the capacitor bank is too small?",
          answer: "The machine fails to self-excite because the capacitive reactive power is insufficient to overcome the magnetizing reactance of the core, and terminal voltage collapses to zero.",
          conceptCategory: "Theory"
        },
        {
          question: "What are the main advantages of an induction generator over a synchronous generator?",
          answer: "Rugged construction (no slip rings or brushes for squirrel cage), no synchronization required, automatically drops excitation if the grid faults, making it ideal for wind turbines.",
          conceptCategory: "Applications"
        }
      ],
      philosophicalInsight: {
        theme: "The Transmutation of Taking into Giving",
        essence: "When forced past its synchronous threshold, the motor experiences a phase inversion of its electromagnetic soul. It ceases to consume power from the universe and begins to generate, transforming mechanical kinetic energy into pure electrical luminance.",
        quote: "Beyond the synchronous boundary, consumption turns into creation.",
        author: "Nikola Tesla"
      },
      mathematicalStructure: {
        symmetryGroup: "Negative resistance branch: R_2'/s < 0 for s < 0",
        governingDifferentialEq: "d^2 v / dt^2 + (1 / RC) (dv/dt) + (1 / LC) v = 0",
        geometricLocus: "Resonant self-excitation intersection of magnetizing curve and capacitive load line"
      }
    },
    exp7: {
      experimentId: "exp7",
      title: "Regulation of Alternator by ZPF / Potier Triangle Method",
      aim: "To predetermine the accurate voltage regulation of an alternator by separating armature leakage reactance (Xl) and armature reaction MMF (Fa) using the Potier Triangle method.",
      circuitExplanation: "Two characteristics are plotted: the Open Circuit Characteristic (OCC) and the Zero Power Factor Characteristic (ZPFC). A pure inductive load is applied to obtain the rated ZPF operating point (415 V, 6.94 A at If = 1.7 A).",
      operatingPrinciple: "Under zero power factor lagging load, the armature reaction is purely demagnetizing and directly subtracts from the main field MMF. The Potier triangle (hypotenuse tangent to OCC knee) isolates the leakage reactance voltage drop (vertical leg) and the armature reaction MMF in equivalent field amperes (horizontal leg).",
      keyFormulas: [
        {
          name: "Potier Leakage Reactance Drop",
          latex: "X_l = \\frac{\\text{Vertical leg of Potier Triangle (Volts)}}{I_{a(\\text{rated})}}",
          variables: [
            { symbol: "Xl", meaning: "Armature leakage reactance per phase", unit: "Ohms" },
            { symbol: "Ia", meaning: "Rated armature current per phase", unit: "Amperes" }
          ]
        },
        {
          name: "Vectorial Field Current Sum",
          latex: "I_{f\\text{total}} = \\sqrt{I_{f1}^2 + F_a^2 - 2 I_{f1} F_a \\cos(90^\\circ + \\phi)}",
          variables: [
            { symbol: "If1", meaning: "Field current to induce voltage behind leakage reactance", unit: "Amperes" },
            { symbol: "Fa", meaning: "Armature reaction MMF in equivalent field amperes", unit: "Amperes" }
          ]
        }
      ],
      stepByStepProcedure: [
        "Plot the OCC curve from field current 0 to 0.8 A.",
        "Obtain the short-circuit point (terminal voltage = 0, rated current flows at If = 1.0 A).",
        "Apply a purely inductive load reactor to obtain the ZPF rated voltage point (V = 415 V at rated current).",
        "Draw the Potier triangle: draw horizontal line equal to short-circuit field current, draw hypotenuse parallel to OCC initial air-gap tangent.",
        "Measure vertical height for leakage reactance drop and horizontal base for armature reaction MMF.",
        "Pre-calculate regulation for power factors from 0 lag to 0 lead."
      ],
      safetyPrecautions: [
        "Ensure the inductive choke coils do not overheat during ZPF loading.",
        "Handle high-voltage terminals with insulated tools."
      ],
      vivaVoce: [
        {
          question: "Why is the Potier method more accurate than EMF and MMF methods?",
          answer: "Because it separates leakage reactance (which causes a physical voltage drop) from armature reaction (which alters core flux and MMF), and accounts for actual core saturation along the OCC.",
          conceptCategory: "Theory"
        },
        {
          question: "What is the nature of armature reaction in an alternator at zero power factor lagging?",
          answer: "It is purely demagnetizing, directly weakening the main field flux along the direct axis.",
          conceptCategory: "Theory"
        }
      ],
      philosophicalInsight: {
        theme: "The Art of Separation: Void vs Iron",
        essence: "Potier\u2019s triangle is the intellectual scalpel of electromagnetic engineering. It dissects the invisible into two distinct physical entities: that which leaks into the airy void (leakage reactance Xl) and that which alters the iron crystalline soul of the core (armature reaction Fa).",
        quote: "Distinguish the shadow from the substance, and you shall command the light.",
        author: "Michael Faraday"
      },
      mathematicalStructure: {
        symmetryGroup: "Right-angled triangular vector decomposition of MMF and EMF",
        governingDifferentialEq: "E_r = V + I_a (R_a + jX_l), \\quad \\vec{F}_R = \\vec{F}_f + \\vec{F}_a",
        geometricLocus: "Hypotenuse congruent and parallel to the initial linear tangent of the OCC"
      }
    },
    exp8: {
      experimentId: "exp8",
      title: "Alternator Connected to Infinite Bus Bar (Synchronization & V-Curves)",
      aim: "To synchronize a 3-phase alternator to the infinite bus bar using the Three-Dark-Lamp method and plot V and Inverted-V curves at constant active power output.",
      circuitExplanation: "Synchronizing lamps are connected across the triple-pole single-throw (TPST) synchronizing switch between alternator and grid busbar. Once synchronized and connected to the bus, varying field current alters reactive power and armature current without changing active power delivered.",
      operatingPrinciple: "For synchronization, four conditions must be met: equal voltage magnitudes, equal frequencies, same phase sequence, and zero phase difference. On the busbar, decreasing field current causes under-excitation (lagging current, low power factor); increasing field current causes over-excitation (leading current). At unity power factor, armature current is minimum, producing the characteristic V shape.",
      keyFormulas: [
        {
          name: "Alternator Power Equation on Infinite Bus",
          latex: "P = \\frac{E V}{X_s} \\sin \\delta = \\text{Constant}",
          variables: [
            { symbol: "E", meaning: "Excitation induced EMF per phase", unit: "Volts" },
            { symbol: "V", meaning: "Busbar voltage per phase", unit: "Volts" },
            { symbol: "\u03B4", meaning: "Power angle / rotor angle", unit: "Degrees" }
          ]
        },
        {
          name: "Reactive Power Equation",
          latex: "Q = \\frac{V}{X_s} (E \\cos \\delta - V)",
          variables: [
            { symbol: "Q > 0", meaning: "Over-excited: delivers lagging VARs to busbar", unit: "VAR" },
            { symbol: "Q < 0", meaning: "Under-excited: absorbs lagging VARs from busbar", unit: "VAR" }
          ]
        }
      ],
      stepByStepProcedure: [
        "Bring alternator up to synchronous speed (1500 RPM) using prime mover.",
        "Adjust alternator field current until its terminal voltage matches the infinite bus voltage (415 V).",
        "Observe the synchronizing lamps. If lamps flicker together slowly, phase sequence is correct. Adjust prime mover speed fine-trim until the flicker rate becomes extremely slow.",
        "At the exact instant when all three lamps are completely DARK (zero voltage across switch contacts), close the synchronizing TPST switch.",
        "With active power constant (wattmeter = 200 W), vary field excitation from 0.4 A to 2.1 A. Record armature current Ia and power factor.",
        "Plot Ia vs If (V-curve) and cos \u03C6 vs If (Inverted V-curve)."
      ],
      safetyPrecautions: [
        "NEVER close the synchronizing switch when lamps are bright or flickering rapidly; massive short-circuit currents will damage the generator shaft and trip circuit breakers.",
        "Always ensure voltmeter readings on both sides of the switch are identical before closing."
      ],
      vivaVoce: [
        {
          question: "What are the four essential conditions for paralleling an alternator with an infinite bus?",
          answer: "1. Terminal voltage magnitude must match bus voltage. 2. Alternator frequency must equal bus frequency. 3. Phase sequence (R-Y-B) must be identical. 4. Phase angles of corresponding phases must be in exact phase (zero voltage across switch).",
          conceptCategory: "Theory"
        },
        {
          question: "What happens if you over-excite a synchronous machine connected to the infinite bus?",
          answer: "The machine delivers lagging reactive power (VARs) to the grid, operating at a leading power factor relative to the machine convention, acting as a synchronous condenser to support grid voltage.",
          conceptCategory: "Applications"
        }
      ],
      philosophicalInsight: {
        theme: "The Harmony of Three Dark Stars",
        essence: "Paralleling an isolated generator with an infinite electrical grid is the ultimate communion of human engineering. At the precise instant when all three lamps go pitch black, the solitary machine harmonizes with the continental grid\u2014a drop merging seamlessly into the ocean.",
        quote: "In perfect darkness, alignment is born. The single generator finds peace in the infinite bus.",
        author: "Charles Proteus Steinmetz"
      },
      mathematicalStructure: {
        symmetryGroup: "Phase alignment manifold & U(1) infinite bus synchronization",
        governingDifferentialEq: "P(\\delta) = \\frac{E V}{X_s} \\sin\\delta = \\text{const}, \\quad Q(\\delta) = \\frac{V}{X_s}(E\\cos\\delta - V)",
        geometricLocus: "V-curve hyperbola of minimum armature current at unity power factor"
      }
    }
  };

  // src/3d/floatingModels.ts
  var THREE = __toESM(require_three());

  // src/audio/soundEngine.ts
  var SoundEngine = class {
    ctx = null;
    motorOsc = null;
    motorGain = null;
    humOsc = null;
    humGain = null;
    isMuted = false;
    isRunning = false;
    init() {
      if (!this.ctx && typeof window !== "undefined") {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
    }
    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.motorGain) {
        this.motorGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.04, this.ctx?.currentTime || 0, 0.05);
      }
      if (this.humGain) {
        this.humGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.02, this.ctx?.currentTime || 0, 0.05);
      }
      return this.isMuted;
    }
    getMuteState() {
      return this.isMuted;
    }
    startMachineHum(rpm = 1440) {
      if (this.isRunning) {
        this.updateRpm(rpm);
        return;
      }
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      try {
        this.humOsc = this.ctx.createOscillator();
        this.humOsc.type = "sawtooth";
        this.humOsc.frequency.setValueAtTime(50, this.ctx.currentTime);
        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(140, this.ctx.currentTime);
        this.humGain = this.ctx.createGain();
        this.humGain.gain.setValueAtTime(this.isMuted ? 0 : 0.025, this.ctx.currentTime);
        this.humOsc.connect(filter);
        filter.connect(this.humGain);
        this.humGain.connect(this.ctx.destination);
        this.humOsc.start();
        const rotorFreq = 4 * rpm / 120;
        this.motorOsc = this.ctx.createOscillator();
        this.motorOsc.type = "sine";
        this.motorOsc.frequency.setValueAtTime(rotorFreq, this.ctx.currentTime);
        this.motorGain = this.ctx.createGain();
        this.motorGain.gain.setValueAtTime(this.isMuted ? 0 : 0.035, this.ctx.currentTime);
        this.motorOsc.connect(this.motorGain);
        this.motorGain.connect(this.ctx.destination);
        this.motorOsc.start();
        this.isRunning = true;
      } catch (e) {
        console.warn("AudioContext autoplay restricted:", e);
      }
    }
    updateRpm(rpm) {
      if (!this.ctx || !this.motorOsc) return;
      const freq = Math.max(10, 4 * rpm / 120);
      this.motorOsc.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.1);
    }
    playRelayClick() {
      this.init();
      if (!this.ctx || this.isMuted) return;
      if (this.ctx.state === "suspended") this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(1e-3, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    }
    stopAll() {
      if (this.motorOsc) {
        try {
          this.motorOsc.stop();
        } catch (_) {
        }
        this.motorOsc = null;
      }
      if (this.humOsc) {
        try {
          this.humOsc.stop();
        } catch (_) {
        }
        this.humOsc = null;
      }
      this.isRunning = false;
    }
  };
  var soundEngine = new SoundEngine();

  // src/3d/floatingModels.ts
  var R_RING = 17;
  var getHeptagonCoords = (index) => {
    const theta = 2 * Math.PI * index / 7 - Math.PI / 2;
    return {
      x: Math.round(R_RING * Math.cos(theta) * 10) / 10,
      y: 0,
      z: Math.round(R_RING * Math.sin(theta) * 10) / 10
    };
  };
  var EXPERIMENT_3D_CONFIGS = [
    {
      id: "exp2",
      name: "EXP 2: Induction Motor Circle Diagram",
      category: "induction",
      facility: "motor",
      gridCoordinates: getHeptagonCoords(0),
      accentColor: 15381256,
      // Gold
      colorHex: "#eab308",
      badgeText: "Circle Diagram // 2.2 kW",
      components: [
        { name: "Induction Motor", type: "machine", positionOffset: [0, 1, 0] },
        { name: "Mechanical Brake Drum", type: "machine", positionOffset: [1.8, 0.9, 0] },
        { name: "Auto-Transformer Variac", type: "variac", positionOffset: [-1.8, 0.6, 0] },
        { name: "Twin Wattmeter Meter Bank", type: "meter", positionOffset: [0, 0.5, 1.4] }
      ]
    },
    {
      id: "exp3",
      name: "EXP 3: Motor Speed Control Bench",
      category: "induction",
      facility: "motor",
      gridCoordinates: getHeptagonCoords(1),
      accentColor: 3718648,
      // Sky Blue
      colorHex: "#38bdf8",
      badgeText: "Pole / Voltage / Rotor R",
      components: [
        { name: "Slip-Ring Induction Motor", type: "machine", positionOffset: [0, 1, 0] },
        { name: "Pole Changing Switchbox", type: "switch", positionOffset: [-1.6, 0.8, 0] },
        { name: "3\u03C6 Rotor Rheostat Bank", type: "rheostat", positionOffset: [1.6, 0.7, 0] },
        { name: "Stator Variac Unit", type: "variac", positionOffset: [0, 0.6, 1.4] }
      ]
    },
    {
      id: "exp5",
      name: "EXP 5: Alternator Load Test Bench",
      category: "synchronous",
      facility: "alternator",
      gridCoordinates: getHeptagonCoords(2),
      accentColor: 16096779,
      // Amber
      colorHex: "#f59e0b",
      badgeText: "Direct Loading // 3.5 kVA",
      components: [
        { name: "Salient Alternator", type: "machine", positionOffset: [0.9, 1, 0] },
        { name: "DC Prime Mover", type: "machine", positionOffset: [-0.9, 1, 0] },
        { name: "3-Phase Lamp Load Bank", type: "load_bank", positionOffset: [0, 0.8, 1.8] },
        { name: "Field Exciter Rheostat", type: "rheostat", positionOffset: [2, 0.6, 0] }
      ]
    },
    {
      id: "exp6_a",
      name: "EXP 6A: Alternator EMF & MMF Bench",
      category: "synchronous",
      facility: "alternator",
      gridCoordinates: getHeptagonCoords(3),
      accentColor: 1096065,
      // Emerald
      colorHex: "#10b981",
      badgeText: "OCC & SCC // Zs Analysis",
      components: [
        { name: "Alternator & DC Motor Set", type: "machine", positionOffset: [0, 1, 0] },
        { name: "Field Ammeter & Rheostat", type: "meter", positionOffset: [-1.8, 0.7, 0] },
        { name: "Armature Shorting Switch", type: "switch", positionOffset: [1.8, 0.6, 0] }
      ]
    },
    {
      id: "exp6_b",
      name: "EXP 6B: Induction Generator Bench",
      category: "induction",
      facility: "generator",
      gridCoordinates: getHeptagonCoords(4),
      accentColor: 440020,
      // Cyan
      colorHex: "#06b6d4",
      badgeText: "Super-Synchronous Gen",
      components: [
        { name: "Induction Machine", type: "machine", positionOffset: [0.9, 1, 0] },
        { name: "DC Prime Mover Motor", type: "machine", positionOffset: [-0.9, 1, 0] },
        { name: "3\u03C6 Delta Capacitor Bank", type: "capacitor_bank", positionOffset: [0, 0.7, 1.6] },
        { name: "Active Load Bank", type: "load_bank", positionOffset: [2, 0.7, 0] }
      ]
    },
    {
      id: "exp7",
      name: "EXP 7: Alternator ZPF / Potier Bench",
      category: "synchronous",
      facility: "alternator",
      gridCoordinates: getHeptagonCoords(5),
      accentColor: 11032055,
      // Purple
      colorHex: "#a855f7",
      badgeText: "Potier Triangle & Xl",
      components: [
        { name: "Alternator Coupled Set", type: "machine", positionOffset: [0, 1, 0] },
        { name: "Pure Inductive Choke Bank", type: "load_bank", positionOffset: [0, 0.8, 1.6] },
        { name: "DC Field Exciter Panel", type: "rheostat", positionOffset: [-1.8, 0.7, 0] }
      ]
    },
    {
      id: "exp8",
      name: "EXP 8: Infinite Bus Synchronizer",
      category: "synchronous",
      facility: "alternator",
      gridCoordinates: getHeptagonCoords(6),
      accentColor: 16007006,
      // Rose
      colorHex: "#f43f5e",
      badgeText: "3-Lamp Synch & V-Curves",
      components: [
        { name: "Alternator Coupled Set", type: "machine", positionOffset: [0, 1, 0] },
        { name: "3-Dark Lamp Array Panel", type: "lamp_array", positionOffset: [0, 1.2, 1.6] },
        { name: "Infinite Bus Switchgear", type: "switch", positionOffset: [1.8, 0.8, 0] },
        { name: "Field Controller & Voltmeter", type: "meter", positionOffset: [-1.8, 0.7, 0] }
      ]
    }
  ];
  var VirtualSpaceManager = class {
    scene;
    camera;
    renderer;
    controls;
    // OrbitControls
    bundles = [];
    raycaster;
    mouse;
    animationFrameId = 0;
    clock;
    container;
    onSelectCallback;
    onHoverCallback;
    constructor(container, options) {
      this.container = container;
      this.onSelectCallback = options.onSelect;
      this.onHoverCallback = options.onHover;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || 600;
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(396312, 0.018);
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1e3);
      this.camera.position.set(0, 22, 28);
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      container.innerHTML = "";
      container.appendChild(this.renderer.domElement);
      const OrbitControls2 = window.THREE?.OrbitControls || THREE.OrbitControls;
      this.controls = new OrbitControls2(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.08;
      this.controls.maxPolarAngle = Math.PI / 2 - 0.04;
      this.controls.minDistance = 5;
      this.controls.maxDistance = 60;
      this.controls.target.set(0, 1, 0);
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2(-999, -999);
      this.clock = new THREE.Clock();
      this.setupLighting();
      this.setupFloorGrid();
      this.buildExperimentPlatforms();
      this.bindEvents();
      this.startAnimation();
    }
    setupLighting() {
      this.scene.add(new THREE.AmbientLight(16777215, 1.4));
      const keyLight = new THREE.DirectionalLight(16777215, 2.2);
      keyLight.position.set(20, 35, 20);
      this.scene.add(keyLight);
      const blueBackLight = new THREE.DirectionalLight(3718648, 1.2);
      blueBackLight.position.set(-20, 20, -20);
      this.scene.add(blueBackLight);
      const goldFillLight = new THREE.PointLight(16096779, 1, 40);
      goldFillLight.position.set(0, 10, 0);
      this.scene.add(goldFillLight);
    }
    coreMesh;
    innerCoreMesh;
    setupFloorGrid() {
      const grid = new THREE.GridHelper(100, 100, 5195493, 988970);
      grid.position.y = -0.01;
      this.scene.add(grid);
      const centerGeom = new THREE.RingGeometry(24, 24.4, 64);
      const centerMat = new THREE.MeshBasicMaterial({ color: 3718648, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
      const centerRing = new THREE.Mesh(centerGeom, centerMat);
      centerRing.rotation.x = Math.PI / 2;
      centerRing.position.y = 0.02;
      this.scene.add(centerRing);
      const coreGeom = new THREE.IcosahedronGeometry(1.6, 2);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 5195493,
        emissive: 6514417,
        emissiveIntensity: 0.8,
        wireframe: true
      });
      this.coreMesh = new THREE.Mesh(coreGeom, coreMat);
      this.coreMesh.position.set(0, 2.5, 0);
      this.scene.add(this.coreMesh);
      const innerGeom = new THREE.SphereGeometry(0.9, 24, 24);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 15381256,
        transparent: true,
        opacity: 0.75
      });
      this.innerCoreMesh = new THREE.Mesh(innerGeom, innerMat);
      this.innerCoreMesh.position.set(0, 2.5, 0);
      this.scene.add(this.innerCoreMesh);
    }
    buildExperimentPlatforms() {
      EXPERIMENT_3D_CONFIGS.forEach((config) => {
        const group = new THREE.Group();
        group.position.set(config.gridCoordinates.x, config.gridCoordinates.y, config.gridCoordinates.z);
        const baseGeom = new THREE.CylinderGeometry(3, 3.2, 0.4, 32);
        const baseMat = new THREE.MeshStandardMaterial({
          color: 988970,
          metalness: 0.85,
          roughness: 0.25,
          emissive: 593949
        });
        const pedestal = new THREE.Mesh(baseGeom, baseMat);
        pedestal.position.y = 0.2;
        group.add(pedestal);
        const haloGeom = new THREE.RingGeometry(3.1, 3.35, 48);
        const haloMat = new THREE.MeshBasicMaterial({
          color: config.accentColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85
        });
        const halo = new THREE.Mesh(haloGeom, haloMat);
        halo.rotation.x = Math.PI / 2;
        halo.position.y = 0.41;
        group.add(halo);
        const podLight = new THREE.PointLight(config.accentColor, 1.5, 8);
        podLight.position.y = 1;
        group.add(podLight);
        const statorGeom = new THREE.CylinderGeometry(0.85, 0.85, 1.8, 24);
        const statorMat = new THREE.MeshStandardMaterial({
          color: config.category === "induction" ? 1981066 : 7877903,
          metalness: 0.8,
          roughness: 0.3
        });
        const stator = new THREE.Mesh(statorGeom, statorMat);
        stator.rotation.x = Math.PI / 2;
        stator.position.y = 1.1;
        group.add(stator);
        const rotorGeom = new THREE.CylinderGeometry(0.55, 0.55, 1.9, 16);
        const rotorMat = new THREE.MeshStandardMaterial({ color: 9741240, metalness: 0.9, roughness: 0.2 });
        const rotor = new THREE.Mesh(rotorGeom, rotorMat);
        rotor.rotation.x = Math.PI / 2;
        rotor.position.y = 1.1;
        group.add(rotor);
        const shaftGeom = new THREE.CylinderGeometry(0.12, 0.12, 2.5, 16);
        const shaftMat = new THREE.MeshStandardMaterial({ color: 16777215, metalness: 0.95 });
        const shaft = new THREE.Mesh(shaftGeom, shaftMat);
        shaft.rotation.x = Math.PI / 2;
        shaft.position.y = 1.1;
        group.add(shaft);
        const fluxGroup = new THREE.Group();
        for (let i = 0; i < 3; i++) {
          const ringGeom = new THREE.TorusGeometry(0.7, 0.02, 8, 32);
          const ringMat = new THREE.MeshBasicMaterial({
            color: config.accentColor,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending
          });
          const ring = new THREE.Mesh(ringGeom, ringMat);
          ring.position.z = -0.4 + i * 0.4;
          fluxGroup.add(ring);
        }
        fluxGroup.rotation.x = Math.PI / 2;
        fluxGroup.position.y = 1.1;
        group.add(fluxGroup);
        config.components.forEach((comp) => {
          if (comp.type === "variac") {
            const vGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16);
            const vMat = new THREE.MeshStandardMaterial({ color: 3359061, metalness: 0.7 });
            const variacMesh = new THREE.Mesh(vGeom, vMat);
            variacMesh.position.set(...comp.positionOffset);
            group.add(variacMesh);
            const knobGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 12);
            const knobMat = new THREE.MeshStandardMaterial({ color: 15680580 });
            const knob = new THREE.Mesh(knobGeom, knobMat);
            knob.position.set(comp.positionOffset[0], comp.positionOffset[1] + 0.35, comp.positionOffset[2]);
            group.add(knob);
          } else if (comp.type === "load_bank" || comp.type === "capacitor_bank") {
            const bankGeom = new THREE.BoxGeometry(0.9, 0.8, 0.6);
            const bankMat = new THREE.MeshStandardMaterial({
              color: comp.type === "capacitor_bank" ? 165063 : 4674921,
              metalness: 0.6
            });
            const bankMesh = new THREE.Mesh(bankGeom, bankMat);
            bankMesh.position.set(...comp.positionOffset);
            group.add(bankMesh);
          } else if (comp.type === "lamp_array") {
            for (let l = -1; l <= 1; l++) {
              const bulbGeom = new THREE.SphereGeometry(0.14, 16, 16);
              const bulbMat = new THREE.MeshStandardMaterial({
                color: 16638023,
                emissive: 16096779,
                emissiveIntensity: 0.8
              });
              const bulb = new THREE.Mesh(bulbGeom, bulbMat);
              bulb.position.set(comp.positionOffset[0] + l * 0.4, comp.positionOffset[1], comp.positionOffset[2]);
              group.add(bulb);
            }
          }
        });
        const labelCanvas = document.createElement("canvas");
        labelCanvas.width = 512;
        labelCanvas.height = 140;
        const ctx = labelCanvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "rgba(6, 12, 24, 0.88)";
          ctx.strokeStyle = config.colorHex;
          ctx.lineWidth = 4;
          const x = 8, y = 8, w = 496, h = 124, r = 16;
          ctx.beginPath();
          ctx.moveTo(x + r, y);
          ctx.arcTo(x + w, y, x + w, y + h, r);
          ctx.arcTo(x + w, y + h, x, y + h, r);
          ctx.arcTo(x, y + h, x, y, r);
          ctx.arcTo(x, y, x + w, y, r);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 24px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(config.name, 256, 48);
          ctx.fillStyle = config.colorHex;
          ctx.font = "italic 16px sans-serif";
          ctx.fillText(config.badgeText, 256, 85);
        }
        const labelTex = new THREE.CanvasTexture(labelCanvas);
        const labelSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex, transparent: true }));
        labelSprite.scale.set(4.8, 1.3, 1);
        labelSprite.position.set(0, 3.2, 0);
        group.add(labelSprite);
        const hitboxGeom = new THREE.CylinderGeometry(3.2, 3.2, 3.8, 16);
        const hitboxMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitbox = new THREE.Mesh(hitboxGeom, hitboxMat);
        hitbox.position.y = 1.9;
        group.add(hitbox);
        this.scene.add(group);
        this.bundles.push({
          config,
          group,
          hitbox,
          halo,
          rotorMeshes: [rotor, shaft],
          fluxMeshes: [fluxGroup],
          labelSprite
        });
      });
    }
    bindEvents() {
      const onPointerMove = (e) => {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      };
      const onClick = () => {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const hitboxes = this.bundles.map((b) => b.hitbox);
        const intersects = this.raycaster.intersectObjects(hitboxes);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const bundle = this.bundles.find((b) => b.hitbox === hit);
          if (bundle) {
            this.focusOnExperiment(bundle.config.id);
            if (this.onSelectCallback) {
              this.onSelectCallback(bundle.config.id);
            }
          }
        }
      };
      const onResize = () => {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight || 600;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      };
      this.renderer.domElement.addEventListener("mousemove", onPointerMove);
      this.renderer.domElement.addEventListener("click", onClick);
      window.addEventListener("resize", onResize);
    }
    focusOnExperiment(id) {
      soundEngine.playRelayClick();
      soundEngine.startMachineHum(id === "exp3" ? 1200 : 1500);
      const bundle = this.bundles.find((b) => b.config.id === id);
      if (!bundle) return;
      const targetPos = new THREE.Vector3(
        bundle.config.gridCoordinates.x,
        bundle.config.gridCoordinates.y + 3,
        bundle.config.gridCoordinates.z + 6
      );
      const targetLookAt = new THREE.Vector3(
        bundle.config.gridCoordinates.x,
        bundle.config.gridCoordinates.y + 1.2,
        bundle.config.gridCoordinates.z
      );
      const gsap = window.gsap;
      if (gsap) {
        gsap.to(this.camera.position, {
          x: targetPos.x,
          y: targetPos.y,
          z: targetPos.z,
          duration: 1.2,
          ease: "power3.out",
          onUpdate: () => this.controls.update()
        });
        gsap.to(this.controls.target, {
          x: targetLookAt.x,
          y: targetLookAt.y,
          z: targetLookAt.z,
          duration: 1.2,
          ease: "power3.out"
        });
      } else {
        this.camera.position.copy(targetPos);
        this.controls.target.copy(targetLookAt);
        this.controls.update();
      }
    }
    resetOverviewCamera() {
      soundEngine.playRelayClick();
      const gsap = window.gsap;
      if (gsap) {
        gsap.to(this.camera.position, {
          x: 0,
          y: 22,
          z: 28,
          duration: 1.2,
          ease: "power3.out",
          onUpdate: () => this.controls.update()
        });
        gsap.to(this.controls.target, {
          x: 0,
          y: 1,
          z: 0,
          duration: 1.2,
          ease: "power3.out"
        });
      }
    }
    startAnimation() {
      const animate = () => {
        this.animationFrameId = requestAnimationFrame(animate);
        const time = this.clock.getElapsedTime();
        if (this.coreMesh) {
          this.coreMesh.rotation.y = time * 0.6;
          this.coreMesh.rotation.x = time * 0.3;
        }
        if (this.innerCoreMesh) {
          const pulse = 1 + 0.12 * Math.sin(time * 3.5);
          this.innerCoreMesh.scale.set(pulse, pulse, pulse);
        }
        this.bundles.forEach((bundle) => {
          bundle.rotorMeshes.forEach((mesh) => {
            mesh.rotation.y = time * 4;
          });
          bundle.fluxMeshes.forEach((group) => {
            group.rotation.z = time * 2.5;
          });
          bundle.halo.scale.setScalar(1 + 0.05 * Math.sin(time * 3.5 + bundle.config.gridCoordinates.x));
        });
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const hitboxes = this.bundles.map((b) => b.hitbox);
        const intersects = this.raycaster.intersectObjects(hitboxes);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const hovered = this.bundles.find((b) => b.hitbox === hit) || null;
          this.renderer.domElement.style.cursor = "pointer";
          if (this.onHoverCallback) this.onHoverCallback(hovered);
        } else {
          this.renderer.domElement.style.cursor = "default";
          if (this.onHoverCallback) this.onHoverCallback(null);
        }
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      };
      animate();
    }
    dispose() {
      cancelAnimationFrame(this.animationFrameId);
      this.renderer.dispose();
      this.scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      if (this.container && this.renderer.domElement) {
        this.container.removeChild(this.renderer.domElement);
      }
    }
  };

  // src/components/LandingHero.tsx
  var import_react3 = __toESM(require_react());

  // src/components/StudentGuideModal.tsx
  var import_react = __toESM(require_react());
  var StudentGuideModal = ({
    experimentId,
    onClose,
    onLaunchTwin
  }) => {
    const guide = STUDENT_LEARNING_GUIDES[experimentId];
    const observations = SEM5_OBSERVATIONS[experimentId];
    const [activeTab, setActiveTab] = (0, import_react.useState)("observations");
    const [vivaCategory, setVivaCategory] = (0, import_react.useState)("all");
    if (!guide || !observations) return null;
    const filteredViva = vivaCategory === "all" ? guide.vivaVoce : guide.vivaVoce.filter((v) => v.conceptCategory.toLowerCase() === vivaCategory.toLowerCase());
    return /* @__PURE__ */ import_react.default.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-900 border border-indigo-500/40 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-fade-in text-slate-100" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4 sm:p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 uppercase" }, experimentId.toUpperCase()), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs text-indigo-400 font-mono" }, "SEMESTER-5 CURRICULUM")), /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-base sm:text-xl font-bold tracking-tight text-white" }, guide.title)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => onLaunchTwin(experimentId),
        className: "hidden sm:inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-lg shadow-yellow-500/20"
      },
      /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-play mr-2" }),
      " Launch Digital Twin"
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: onClose,
        className: "p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
      },
      /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-xmark text-lg" })
    ))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex border-b border-slate-800 bg-slate-950/40 px-4 sm:px-6 overflow-x-auto gap-2 py-2" }, [
      { id: "observations", label: "Verified Observations", icon: "fa-table" },
      { id: "calculations", label: "Model Calculations", icon: "fa-calculator" },
      { id: "procedure", label: "Procedure & Safety", icon: "fa-list-check" },
      { id: "theory", label: "Theory & Equations", icon: "fa-book-open" },
      { id: "philosophy", label: "Philosopher & Math Lens", icon: "fa-brain" },
      { id: "viva", label: "Viva Voce Bank", icon: "fa-graduation-cap" }
    ].map((tab) => /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        key: tab.id,
        onClick: () => setActiveTab(tab.id),
        className: `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"}`
      },
      /* @__PURE__ */ import_react.default.createElement("i", { className: `fa-solid ${tab.icon}` }),
      /* @__PURE__ */ import_react.default.createElement("span", null, tab.label)
    ))), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4 sm:p-6 overflow-y-auto flex-1 space-y-6" }, activeTab === "observations" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl text-xs text-indigo-300 flex items-start space-x-3" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-circle-check text-indigo-400 text-base mt-0.5" }), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("strong", { className: "text-white" }, "Authentic Laboratory Record Data:"), " All values below are taken directly from the physical Semester-5 laboratory observation records and verified against standard apparatus calibration.")), observations.tables.map((table, tIdx) => /* @__PURE__ */ import_react.default.createElement("div", { key: table.id || tIdx, className: "space-y-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-800 gap-1" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-sm text-yellow-400 flex items-center" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-table-list mr-2" }), table.name), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[11px] text-slate-400 italic" }, table.description)), /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ import_react.default.createElement("table", { className: "w-full text-left text-xs border-collapse" }, /* @__PURE__ */ import_react.default.createElement("thead", null, /* @__PURE__ */ import_react.default.createElement("tr", { className: "bg-slate-900 border-b border-slate-700 text-slate-300 font-mono" }, /* @__PURE__ */ import_react.default.createElement("th", { className: "py-2.5 px-3" }, "#"), table.columns.map((col) => /* @__PURE__ */ import_react.default.createElement("th", { key: col.key, className: "py-2.5 px-3" }, col.label, " ", col.unit && /* @__PURE__ */ import_react.default.createElement("span", { className: "text-slate-500 font-normal" }, "(", col.unit, ")"))))), /* @__PURE__ */ import_react.default.createElement("tbody", { className: "divide-y divide-slate-800 font-mono" }, table.rows.map((row, rIdx) => /* @__PURE__ */ import_react.default.createElement("tr", { key: rIdx, className: "hover:bg-indigo-950/20 transition-colors" }, /* @__PURE__ */ import_react.default.createElement("td", { className: "py-2 px-3 text-slate-500 font-bold" }, row.slNo || rIdx + 1), table.columns.map((col) => /* @__PURE__ */ import_react.default.createElement("td", { key: col.key, className: `py-2 px-3 ${col.isCalculated ? "text-amber-300 font-semibold" : "text-slate-300"}` }, row[col.key] !== void 0 ? row[col.key] : "-"))))))), table.calculationsSummary && /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-3 pt-3 border-t border-slate-800/80 bg-slate-900/60 p-3 rounded-lg space-y-1" }, /* @__PURE__ */ import_react.default.createElement("h4", { className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider" }, "Parameters & Inferences"), /* @__PURE__ */ import_react.default.createElement("ul", { className: "space-y-1 text-xs font-mono text-emerald-400" }, Object.entries(table.calculationsSummary).map(([key, val]) => /* @__PURE__ */ import_react.default.createElement("li", { key, className: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-slate-400" }, key, ":"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-yellow-400 font-bold" }, String(val))))))))), activeTab === "calculations" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-950/60 p-4 rounded-xl border border-indigo-500/30 space-y-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-sm text-yellow-400 flex items-center" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-calculator mr-2 text-indigo-400" }), observations.modelCalculations.title), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs bg-indigo-900/40 text-indigo-300 px-2.5 py-1 rounded border border-indigo-700/50" }, "Sample Set #", observations.modelCalculations.sampleSetIndex)), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-4" }, observations.modelCalculations.steps.map((step) => /* @__PURE__ */ import_react.default.createElement("div", { key: step.stepNumber, className: "bg-slate-900/80 p-4 rounded-lg border border-slate-800 space-y-2" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-2 text-xs font-bold text-indigo-300" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]" }, step.stepNumber), /* @__PURE__ */ import_react.default.createElement("span", null, step.description)), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 font-mono text-xs" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-950 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] text-slate-500 block uppercase" }, "Formula:"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-yellow-300 font-bold" }, step.formula)), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-950 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] text-slate-500 block uppercase" }, "Substitution:"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sky-300" }, step.substitution)), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-950 p-2.5 rounded border border-emerald-500/40 bg-emerald-950/10" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] text-emerald-400 block uppercase font-bold" }, "Calculated Result:"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-emerald-300 font-bold" }, step.result))))))), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-950/40 p-4 rounded-xl border border-slate-800 space-y-2" }, /* @__PURE__ */ import_react.default.createElement("h4", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider" }, "Test Machine Specifications"), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono" }, Object.entries(observations.machineNameplate).map(([key, val]) => /* @__PURE__ */ import_react.default.createElement("div", { key, className: "bg-slate-900 p-2 rounded border border-slate-800" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] text-slate-500 block capitalize" }, key.replace(/([A-Z])/g, " $1")), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-slate-200 font-bold" }, val)))))), activeTab === "procedure" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-sm text-yellow-400 flex items-center" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-list-ol mr-2 text-indigo-400" }), "Standard Operating Procedure (SOP)"), /* @__PURE__ */ import_react.default.createElement("ol", { className: "space-y-2.5 text-xs text-slate-300" }, guide.stepByStepProcedure.map((step, idx) => /* @__PURE__ */ import_react.default.createElement("li", { key: idx, className: "flex items-start space-x-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "font-bold text-indigo-400 font-mono text-sm" }, idx + 1, "."), /* @__PURE__ */ import_react.default.createElement("span", { className: "leading-relaxed" }, step))))), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-rose-950/20 p-4 rounded-xl border border-rose-500/40 space-y-3" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-sm text-rose-400 flex items-center" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-triangle-exclamation mr-2" }), "Crucial Safety Precautions"), /* @__PURE__ */ import_react.default.createElement("ul", { className: "space-y-2 text-xs text-rose-200/90" }, guide.safetyPrecautions.map((precaution, idx) => /* @__PURE__ */ import_react.default.createElement("li", { key: idx, className: "flex items-start space-x-2" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-shield-halved text-rose-400 mt-0.5" }), /* @__PURE__ */ import_react.default.createElement("span", null, precaution)))))), activeTab === "theory" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-sm text-yellow-400" }, "Aim of the Experiment"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800" }, guide.aim), /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-sm text-sky-400 pt-2" }, "Operating Principle"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800" }, guide.operatingPrinciple), /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-sm text-indigo-400 pt-2" }, "Circuit Explanation"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800" }, guide.circuitExplanation)), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-sm text-emerald-400" }, "Governing Mathematical Formulas"), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3" }, guide.keyFormulas.map((formula, fIdx) => /* @__PURE__ */ import_react.default.createElement("div", { key: fIdx, className: "bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2" }, /* @__PURE__ */ import_react.default.createElement("h4", { className: "text-xs font-bold text-yellow-400" }, formula.name), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-2.5 bg-slate-900 rounded font-mono text-center text-xs text-emerald-300 font-bold border border-slate-800" }, formula.latex), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-1 pt-1" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] text-slate-500 uppercase font-bold" }, "Variables:"), /* @__PURE__ */ import_react.default.createElement("ul", { className: "text-[11px] text-slate-400 space-y-0.5" }, formula.variables.map((v, vIdx) => /* @__PURE__ */ import_react.default.createElement("li", { key: vIdx, className: "flex justify-between" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "font-mono text-indigo-300" }, v.symbol, ":"), /* @__PURE__ */ import_react.default.createElement("span", null, v.meaning, " ", v.unit && `(${v.unit})`)))))))))), activeTab === "viva" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-400" }, "Key oral examination questions asked by lab examiners with authoritative model answers."), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex space-x-1.5" }, ["all", "Theory", "Measurement", "Applications"].map((cat) => /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        key: cat,
        onClick: () => setVivaCategory(cat),
        className: `px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${vivaCategory === cat ? "bg-yellow-500 text-slate-950" : "bg-slate-800 text-slate-400 hover:text-white"}`
      },
      cat
    )))), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-3" }, filteredViva.map((item, idx) => /* @__PURE__ */ import_react.default.createElement("div", { key: idx, className: "bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs font-bold text-yellow-400 flex items-center" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-circle-question mr-2 text-indigo-400" }), "Q: ", item.question), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800" }, item.conceptCategory)), /* @__PURE__ */ import_react.default.createElement("div", { className: "pl-6 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed" }, /* @__PURE__ */ import_react.default.createElement("strong", { className: "text-emerald-400 block mb-1" }, "Answer:"), item.answer))))), activeTab === "philosophy" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-amber-950/20 border border-purple-500/30 rounded-xl flex items-start space-x-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/50 flex items-center justify-center text-purple-300 text-lg flex-shrink-0 mt-0.5" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-atom" })), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-sm font-bold text-white flex items-center gap-2" }, "Epistemology & Differential Symmetry Council", /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-700/50" }, "Transcendent UI Lens")), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-300 mt-1 leading-relaxed" }, "Beyond numbers and meter dials lies an ontological order: rotating magnetic fields mirror celestial mechanics, and complex impedance loci manifest the conformal symmetry of physical law."))), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-950/70 border border-indigo-500/30 rounded-xl p-5 space-y-4 relative overflow-hidden" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center justify-between border-b border-indigo-900/50 pb-3" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-2.5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400 text-xs" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-square-root-variable" })), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h4", { className: "text-xs font-bold text-indigo-200" }, "The Mathematician\u2019s Structure"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] text-slate-400 font-mono" }, "Agent: Dr. Carl Friedrich Gauss"))), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800" }, "\u03A6 = 1.618")), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-900/80 p-3 rounded-lg border border-slate-800" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[10px] font-mono uppercase text-indigo-400 mb-1 font-semibold flex items-center gap-1.5" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-shapes" }), " Symmetry Group & Invariance"), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-xs font-mono text-slate-200" }, guide.mathematicalStructure?.symmetryGroup || "Lie Group SO(2) rotational symmetry under 3-phase spatial coordinate projection")), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-900/80 p-3 rounded-lg border border-slate-800" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[10px] font-mono uppercase text-cyan-400 mb-1 font-semibold flex items-center gap-1.5" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-wave-square" }), " Governing Differential Equation"), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-xs font-mono text-cyan-200 bg-slate-950 p-2.5 rounded border border-cyan-900/40 break-all leading-relaxed" }, guide.mathematicalStructure?.governingDifferentialEq || "\u2207 \xD7 E = -\u2202B/\u2202t, \\quad J = \u03C3(E + v \xD7 B)")), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-900/80 p-3 rounded-lg border border-slate-800" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[10px] font-mono uppercase text-amber-400 mb-1 font-semibold flex items-center gap-1.5" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-circle-nodes" }), " Geometric Locus on Complex Plane"), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-xs text-slate-300 leading-relaxed" }, guide.mathematicalStructure?.geometricLocus || "Equidistant circular projection and orthogonal trajectory mapping")))), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-950/70 border border-purple-500/30 rounded-xl p-5 space-y-4 relative overflow-hidden" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center justify-between border-b border-purple-900/50 pb-3" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-2.5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-7 h-7 rounded-lg bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 text-xs" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-quote-left" })), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h4", { className: "text-xs font-bold text-purple-200" }, "The Philosopher\u2019s Lens"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] text-slate-400 font-mono" }, "Agent: Prof. Heidegger & Lao Tzu"))), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800" }, "Ontology")), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-900/80 p-3 rounded-lg border border-slate-800" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[10px] font-mono uppercase text-purple-400 mb-1 font-semibold flex items-center gap-1.5" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-compass" }), " Ontological Theme"), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-xs font-semibold text-purple-200" }, guide.philosophicalInsight?.theme || "The Eternal Rotation of Potential into Kinetic Flux")), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-900/80 p-3 rounded-lg border border-slate-800" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[10px] font-mono uppercase text-emerald-400 mb-1 font-semibold flex items-center gap-1.5" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-eye" }), " The Essence of the Apparatus"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-300 leading-relaxed italic" }, '"', guide.philosophicalInsight?.essence || "A machine does not merely consume electrons; it acts as an invisible loom weaving Faraday\u2019s lines of flux into synchronous mechanical torque.", '"')), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-gradient-to-br from-purple-950/60 to-slate-900/90 p-4 rounded-lg border border-purple-700/40 relative" }, /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-quote-right absolute bottom-3 right-3 text-2xl text-purple-500/10" }), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-amber-200 font-serif italic mb-2" }, '"', guide.philosophicalInsight?.quote || "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.", '"'), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[11px] text-slate-400 font-mono text-right" }, "\u2014 ", guide.philosophicalInsight?.author || "Nikola Tesla"))))))), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-xs text-slate-500 font-mono" }, "Semester-5 Digital Twin Educational Engine"), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => onLaunchTwin(experimentId),
        className: "px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-lg shadow-yellow-500/20 uppercase tracking-wider"
      },
      "Launch Digital Twin & Simulation ",
      /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-arrow-right ml-1.5" })
    ))));
  };

  // src/components/DatasheetModal.tsx
  var import_react2 = __toESM(require_react());
  var DatasheetModal = ({ onClose }) => {
    const [selectedMachine, setSelectedMachine] = (0, import_react2.useState)("motor");
    return /* @__PURE__ */ import_react2.default.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 border border-yellow-500/40 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center border border-yellow-500/40" }, /* @__PURE__ */ import_react2.default.createElement("i", { className: "fa-solid fa-microchip" })), /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("h2", { className: "text-base font-bold text-white uppercase tracking-wider" }, "Laboratory Machine Technical Datasheets"), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-xs text-slate-400 font-mono" }, "Semester-5 Verified Machine Nameplate Ratings"))), /* @__PURE__ */ import_react2.default.createElement("button", { onClick: onClose, className: "p-2 text-slate-400 hover:text-white rounded-lg" }, /* @__PURE__ */ import_react2.default.createElement("i", { className: "fa-solid fa-xmark text-lg" }))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex border-b border-slate-800 bg-slate-950/50 p-2 gap-2" }, [
      { id: "motor", label: "3\u03C6 Induction Motor (2.2 kW)" },
      { id: "alternator", label: "3\u03C6 Synchronous Alternator (3.5 kVA)" },
      { id: "dc_prime", label: "DC Shunt Prime Mover (220 V)" }
    ].map((m) => /* @__PURE__ */ import_react2.default.createElement(
      "button",
      {
        key: m.id,
        onClick: () => setSelectedMachine(m.id),
        className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${selectedMachine === m.id ? "bg-yellow-500 text-slate-950 shadow-md shadow-yellow-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800"}`
      },
      m.label
    ))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "p-5 overflow-y-auto max-h-[65vh] space-y-4" }, selectedMachine === "motor" && /* @__PURE__ */ import_react2.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3" }, /* @__PURE__ */ import_react2.default.createElement("h3", { className: "text-xs font-bold text-yellow-400 uppercase tracking-wider" }, "Nameplate Ratings: Kirloskar Electric KE-IM2.2"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Rated Output Power:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "2.2 kW (3.0 HP)")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Rated Stator Voltage:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "415 V (Delta Connected)")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Rated Full-Load Current:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "4.7 A")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Synchronous Speed:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "1500 RPM (4-pole, 50 Hz)")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Full-Load Rated Speed:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "1440 RPM (s = 4.0%)")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Class of Insulation:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "Class B (130\xB0C rise)")))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3" }, /* @__PURE__ */ import_react2.default.createElement("h3", { className: "text-xs font-bold text-sky-400 uppercase tracking-wider" }, "Measured Equivalent Circuit Parameters (Exp 2 Circle Diagram)"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2 rounded" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Stator Resistance R1:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-yellow-400 font-bold" }, "7.90 \u03A9 (3.95 \u03A9/ph)")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2 rounded" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Referred Rotor R2':"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-yellow-400 font-bold" }, "1.96 \u03A9 / phase")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2 rounded" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Leakage Reactance X1+X2':"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-yellow-400 font-bold" }, "13.43 \u03A9 / phase")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2 rounded" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Magnetizing Reactance Xm:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-yellow-400 font-bold" }, "160.4 \u03A9"))))), selectedMachine === "alternator" && /* @__PURE__ */ import_react2.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3" }, /* @__PURE__ */ import_react2.default.createElement("h3", { className: "text-xs font-bold text-yellow-400 uppercase tracking-wider" }, "Nameplate Ratings: Crompton Greaves CG-SA3.5"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Rated Apparent Power:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "3.5 kVA")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Rated Armature Voltage:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "415 V (Star Connected)")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Rated Armature Current:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "4.87 A")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Rated Synchronous Speed:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "1500 RPM (4-pole, 50 Hz)")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "DC Field Voltage / Current:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "110-220 V DC / 1.8 A max")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Power Factor:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "0.8 Lagging Standard")))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3" }, /* @__PURE__ */ import_react2.default.createElement("h3", { className: "text-xs font-bold text-sky-400 uppercase tracking-wider" }, "Internal Impedance Parameters (Exp 6A & Exp 7)"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2 rounded" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Armature Resistance Ra:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-yellow-400 font-bold" }, "2.415 \u03A9 / phase")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2 rounded" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Synchronous Impedance Zs:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-yellow-400 font-bold" }, "28.19 \u03A9 / phase")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2 rounded" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Leakage Reactance Xl:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-yellow-400 font-bold" }, "6.08 \u03A9 (Potier method)")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2 rounded" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Armature Reaction MMF Fa:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-yellow-400 font-bold" }, "0.32 A (field equivalent)"))))), selectedMachine === "dc_prime" && /* @__PURE__ */ import_react2.default.createElement("div", { className: "p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3" }, /* @__PURE__ */ import_react2.default.createElement("h3", { className: "text-xs font-bold text-yellow-400 uppercase tracking-wider" }, "Nameplate Ratings: DC Shunt Prime Mover Motor"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Rated Voltage:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "220 V DC")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Rated Armature Current:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "14.0 A")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Rated Base Speed:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "1500 RPM")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Field Resistance Rf:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "185 \u03A9")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Armature Resistance Ra:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "1.8 \u03A9")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-900 p-2.5 rounded border border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] text-slate-500 block" }, "Coupling:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-200 font-bold" }, "Rigid Flanged Coupling"))))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "p-4 border-t border-slate-800 bg-slate-950 flex justify-end" }, /* @__PURE__ */ import_react2.default.createElement(
      "button",
      {
        onClick: onClose,
        className: "px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg transition-all"
      },
      "Close Datasheet"
    ))));
  };

  // src/components/LandingHero.tsx
  var EXPERIMENT_MATHEMATICAL_INSIGHTS = {
    exp2: {
      symmetry: "\u222E Conformal Mobius Circle // SO(2)",
      specs: "415 V \u2022 4.7 A \u2022 1440 RPM \u2022 2.2 kW",
      archetype: "The Archetype of the Infinite Circle",
      icon: "fa-circle-notch"
    },
    exp3: {
      symmetry: "Torque \u221D V\xB2 // Dahlander 2P:4P Switch",
      specs: "415 V \u2022 4P / 2P \u2022 Slip-Ring Rheostat",
      archetype: "The Tripartite Modulation of Slip",
      icon: "fa-gauge-high"
    },
    exp5: {
      symmetry: "Synchronous Phasor // Ra + jXs Regulation",
      specs: "3.5 kVA \u2022 415 V \u2022 1500 RPM \u2022 4.8 A",
      archetype: "The Resilient Synchronous Field",
      icon: "fa-bolt"
    },
    exp6_a: {
      symmetry: "EMF Pessimistic & MMF Optimistic Bounds",
      specs: "OCC & SCC \u2022 1500 RPM \u2022 Potier Field",
      archetype: "The Epistemology of Upper & Lower Bounds",
      icon: "fa-chart-line"
    },
    exp6_b: {
      symmetry: "Super-Synchronous Generation (s < 0)",
      specs: "Grid-Connected \u2022 1540 RPM \u2022 Negative Slip",
      archetype: "The Transmutation of Slip into Power",
      icon: "fa-rotate"
    },
    exp7: {
      symmetry: "Potier Reactance Triangle (XL & Fa)",
      specs: "ZPF Magnetization \u2022 Leakage & Armature Reaction",
      archetype: "The Geometrical Unmasking of Flux",
      icon: "fa-shapes"
    },
    exp8: {
      symmetry: "Infinite Bus V-Curves // cos\u03C6 = 1 Parabola",
      specs: "3-Lamp Dark/Bright \u2022 50 Hz Grid Synchrony",
      archetype: "The Infinite Bus and the Solitary Machine",
      icon: "fa-network-wired"
    }
  };
  var PHILOSOPHICAL_APHORISMS = [
    {
      quote: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
      author: "Nikola Tesla",
      role: "Rotating Field Architecture"
    },
    {
      quote: "Geometry existed before the creation; it is co-eternal with the mind of God.",
      author: "Johannes Kepler",
      role: "Harmonic Invariance"
    },
    {
      quote: "Nothing is too wonderful to be true, if it be consistent with the laws of nature.",
      author: "Michael Faraday",
      role: "Electromagnetic Induction"
    },
    {
      quote: "There is no question which cannot be answered by mathematics.",
      author: "Carl Friedrich Gauss",
      role: "Differential Manifold"
    },
    {
      quote: "The complex plane transforms alternating currents from transient mystery into pure circular geometry.",
      author: "Charles Proteus Steinmetz",
      role: "AC Symbolic Method"
    }
  ];
  var LandingHero = ({
    onLaunchExperiment,
    currentUser,
    onLogout,
    onOpenAdmin
  }) => {
    const mountRef = (0, import_react3.useRef)(null);
    const spaceManagerRef = (0, import_react3.useRef)(null);
    const [activeExpId, setActiveExpId] = (0, import_react3.useState)(null);
    const [hoveredBundle, setHoveredBundle] = (0, import_react3.useState)(null);
    const [searchQuery, setSearchQuery] = (0, import_react3.useState)("");
    const [categoryFilter, setCategoryFilter] = (0, import_react3.useState)("all");
    const [drawerOpen, setDrawerOpen] = (0, import_react3.useState)(false);
    const [guideModalExpId, setGuideModalExpId] = (0, import_react3.useState)(null);
    const [showDatasheet, setShowDatasheet] = (0, import_react3.useState)(false);
    const [isMuted, setIsMuted] = (0, import_react3.useState)(soundEngine.getMuteState());
    (0, import_react3.useEffect)(() => {
      if (!mountRef.current) return;
      const manager = new VirtualSpaceManager(mountRef.current, {
        onSelect: (id) => setActiveExpId(id),
        onHover: (bundle) => setHoveredBundle(bundle)
      });
      spaceManagerRef.current = manager;
      return () => {
        manager.dispose();
        spaceManagerRef.current = null;
      };
    }, []);
    const handleSelectCameraMode = (expId) => {
      if (expId === "overview") {
        setActiveExpId(null);
        spaceManagerRef.current?.resetOverviewCamera();
      } else {
        setActiveExpId(expId);
        spaceManagerRef.current?.focusOnExperiment(expId);
        setDrawerOpen(false);
      }
    };
    const handleLaunch = (expId) => {
      const config = EXPERIMENT_3D_CONFIGS.find((c) => c.id === expId);
      const facility = config ? config.facility : "motor";
      onLaunchExperiment(expId, facility);
    };
    const filteredConfigs = EXPERIMENT_3D_CONFIGS.filter((config) => {
      const matchesCategory = categoryFilter === "all" || config.category === categoryFilter;
      const q = searchQuery.toLowerCase();
      const obs = SEM5_OBSERVATIONS[config.id];
      const matchesSearch = config.name.toLowerCase().includes(q) || config.badgeText.toLowerCase().includes(q) || obs && obs.title.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
    const activeBundle = EXPERIMENT_3D_CONFIGS.find((c) => c.id === activeExpId);
    return /* @__PURE__ */ import_react3.default.createElement("div", { className: "w-full h-full relative bg-slate-950 overflow-hidden font-sans select-none" }, /* @__PURE__ */ import_react3.default.createElement("header", { className: "absolute top-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-indigo-900/60 px-3 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.85)]" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center space-x-3 flex-shrink-0" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-600/30 text-yellow-400 border border-yellow-500/40 flex items-center justify-center text-lg shadow-lg shadow-yellow-500/10 flex-shrink-0" }, /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-bolt-lightning animate-pulse" })), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react3.default.createElement("h1", { className: "text-xs sm:text-sm font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-sky-400 uppercase whitespace-nowrap" }, "ELECTRICAL MACHINES DIGITAL TWIN LAB"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "hidden xl:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 whitespace-nowrap" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5" }), "SEM-5 CERTIFIED")), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block whitespace-nowrap" }, "VIRTUAL 3D TESTBENCH & REAL CURRICULUM OBSERVATIONS"))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "hidden lg:flex items-center space-x-1 bg-slate-900/90 border border-slate-800/90 p-1 rounded-xl shadow-inner" }, /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => handleSelectCameraMode("overview"),
        className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${activeExpId === null ? "bg-yellow-500 text-slate-950 font-bold shadow-md shadow-yellow-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"}`
      },
      /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-globe" }),
      /* @__PURE__ */ import_react3.default.createElement("span", null, "Floor Overview")
    ), EXPERIMENT_3D_CONFIGS.map((exp) => {
      const isSelected = activeExpId === exp.id;
      return /* @__PURE__ */ import_react3.default.createElement(
        "button",
        {
          key: exp.id,
          onClick: () => handleSelectCameraMode(exp.id),
          className: `px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center space-x-1.5 ${isSelected ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`,
          title: exp.name
        },
        /* @__PURE__ */ import_react3.default.createElement(
          "span",
          {
            className: "w-1.5 h-1.5 rounded-full",
            style: { backgroundColor: exp.colorHex }
          }
        ),
        /* @__PURE__ */ import_react3.default.createElement("span", null, exp.id.toUpperCase().replace("_", ""))
      );
    })), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center space-x-2 flex-shrink-0" }, /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => setGuideModalExpId(activeExpId || "exp2"),
        className: "px-3 py-1.5 bg-indigo-950/70 hover:bg-indigo-900/90 border border-indigo-500/50 hover:border-yellow-400/80 rounded-lg text-xs font-semibold text-yellow-300 transition-all flex items-center shadow-sm whitespace-nowrap",
        title: "Open Authentic Laboratory Observations & Viva Bank"
      },
      /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-graduation-cap mr-1.5 text-yellow-400" }),
      /* @__PURE__ */ import_react3.default.createElement("span", { className: "hidden sm:inline" }, "Lab Records & Viva"),
      /* @__PURE__ */ import_react3.default.createElement("span", { className: "sm:hidden" }, "Records")
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => setShowDatasheet(true),
        className: "px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-yellow-500/50 rounded-lg text-xs font-semibold text-slate-200 transition-all flex items-center whitespace-nowrap"
      },
      /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-book-open mr-1.5 text-yellow-400" }),
      /* @__PURE__ */ import_react3.default.createElement("span", { className: "hidden sm:inline" }, "Datasheets")
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => setIsMuted(soundEngine.toggleMute()),
        title: isMuted ? "Enable 50 Hz stator resonance & relay acoustics" : "Mute electromechanical audio",
        className: `px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center whitespace-nowrap ${isMuted ? "bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200" : "bg-emerald-950/70 border-emerald-500/50 text-emerald-400 shadow-sm shadow-emerald-500/20"}`
      },
      /* @__PURE__ */ import_react3.default.createElement("i", { className: `fa-solid ${isMuted ? "fa-volume-xmark text-slate-500" : "fa-volume-high text-emerald-400 animate-pulse"} mr-1.5` }),
      /* @__PURE__ */ import_react3.default.createElement("span", { className: "hidden md:inline" }, isMuted ? "Audio Off" : "50Hz Live")
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => handleLaunch(activeExpId || "exp2"),
        className: "px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-lg transition-all shadow-lg shadow-yellow-500/25 flex items-center uppercase tracking-wider whitespace-nowrap"
      },
      /* @__PURE__ */ import_react3.default.createElement("span", null, "Enter Lab"),
      /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-chevron-right ml-1.5" })
    ), currentUser?.role === "admin" && onOpenAdmin && /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: onOpenAdmin,
        className: "p-2 text-indigo-300 hover:text-white bg-indigo-950/60 border border-indigo-800 rounded-lg hover:bg-indigo-900 transition-colors",
        title: "Admin Git Settings"
      },
      /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-code-merge text-xs" })
    ), onLogout && /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: onLogout,
        className: "p-2 text-slate-400 hover:text-red-400 bg-slate-900 border border-slate-700 hover:border-red-500/60 rounded-lg transition-colors",
        title: "Exit Session"
      },
      /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-power-off text-xs" })
    ))), /* @__PURE__ */ import_react3.default.createElement("div", { ref: mountRef, className: "w-full h-full cursor-grab active:cursor-grabbing" }), hoveredBundle && !activeExpId && /* @__PURE__ */ import_react3.default.createElement("div", { className: "absolute top-20 left-1/2 transform -translate-x-1/2 pointer-events-none bg-slate-950/90 border border-yellow-500 text-yellow-400 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase shadow-2xl backdrop-blur-md" }, /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-crosshairs mr-2 animate-spin" }), "CLICK TO FOCUS: ", hoveredBundle.config.name), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        className: `absolute top-16 left-3 sm:left-6 z-30 transition-all duration-300 pointer-events-auto ${drawerOpen ? "w-[calc(100%-1.5rem)] sm:w-[410px]" : "w-14"}`
      },
      !drawerOpen ? (
        /* Mini Vertical Dock when collapsed */
        /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-slate-950/90 backdrop-blur-xl border border-indigo-500/40 rounded-2xl shadow-2xl p-2 flex flex-col items-center space-y-2.5" }, /* @__PURE__ */ import_react3.default.createElement(
          "button",
          {
            onClick: () => setDrawerOpen(true),
            className: "w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/40 flex items-center justify-center transition-all shadow-md",
            title: "Expand Semester-5 Experiment Directory"
          },
          /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-list-check" })
        ), /* @__PURE__ */ import_react3.default.createElement("div", { className: "w-6 h-px bg-slate-800" }), EXPERIMENT_3D_CONFIGS.map((exp) => {
          const isSelected = activeExpId === exp.id;
          return /* @__PURE__ */ import_react3.default.createElement(
            "button",
            {
              key: exp.id,
              onClick: () => {
                handleSelectCameraMode(exp.id);
                setDrawerOpen(true);
              },
              className: `w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-mono font-bold transition-all relative ${isSelected ? "ring-2 ring-yellow-400 shadow-lg scale-105" : "hover:scale-105 opacity-80 hover:opacity-100"}`,
              style: {
                backgroundColor: `${exp.colorHex}22`,
                color: exp.colorHex,
                border: `1px solid ${exp.colorHex}50`
              },
              title: exp.name
            },
            exp.id.replace("exp", "").toUpperCase()
          );
        }))
      ) : (
        /* Full Rich Drawer */
        /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-slate-950/92 backdrop-blur-2xl border border-indigo-500/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col max-h-[84vh]" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "p-3.5 sm:p-4 border-b border-indigo-900/40 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-indigo-950/40 flex items-center justify-between" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center space-x-2.5" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 text-xs" }, /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-layer-group" })), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-yellow-400 font-extrabold text-xs sm:text-sm tracking-wide uppercase" }, "Semester-5 Experiments"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded-full bg-yellow-950/80 text-yellow-300 border border-yellow-500/40 font-bold" }, "7 Twins")), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-[10px] text-slate-400 font-mono" }, "Virtual Testbenches & Lab Observations"))), /* @__PURE__ */ import_react3.default.createElement(
          "button",
          {
            onClick: () => setDrawerOpen(false),
            className: "w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center ml-auto",
            title: "Collapse to Mini Dock"
          },
          /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-chevron-left text-xs" })
        )), /* @__PURE__ */ import_react3.default.createElement("div", { className: "p-3 border-b border-slate-800/80 space-y-2.5 bg-slate-950/70" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-xs text-indigo-400" }), /* @__PURE__ */ import_react3.default.createElement(
          "input",
          {
            type: "text",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            placeholder: "Search circle diagram, potier, speed, V-curves...",
            className: "w-full bg-slate-900/90 border border-indigo-900/50 focus:border-yellow-500 rounded-xl pl-8 pr-8 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
          }
        ), searchQuery && /* @__PURE__ */ import_react3.default.createElement(
          "button",
          {
            onClick: () => setSearchQuery(""),
            className: "absolute right-2.5 top-2.5 text-xs text-slate-500 hover:text-white"
          },
          /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-xmark" })
        )), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex gap-1.5" }, [
          { id: "all", label: "All Experiments (7)" },
          { id: "induction", label: "Induction (3)" },
          { id: "synchronous", label: "Synchronous (4)" }
        ].map((cat) => /* @__PURE__ */ import_react3.default.createElement(
          "button",
          {
            key: cat.id,
            onClick: () => setCategoryFilter(cat.id),
            className: `flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${categoryFilter === cat.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"}`
          },
          cat.label
        )))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "p-3 overflow-y-auto space-y-3 flex-1 [scrollbar-width:thin] [scrollbar-color:#4f46e5_#0f172a]" }, filteredConfigs.map((exp) => {
          const obs = SEM5_OBSERVATIONS[exp.id];
          const insight = EXPERIMENT_MATHEMATICAL_INSIGHTS[exp.id];
          const isSelected = activeExpId === exp.id;
          return /* @__PURE__ */ import_react3.default.createElement(
            "div",
            {
              key: exp.id,
              className: `rounded-xl p-3.5 transition-all cursor-pointer border ${isSelected ? "bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-yellow-950/20 border-yellow-400/90 shadow-xl shadow-yellow-500/10 ring-1 ring-yellow-400/50" : "bg-slate-900/60 border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/90"}`,
              onClick: () => handleSelectCameraMode(exp.id)
            },
            /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-between gap-2 pb-1.5" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react3.default.createElement(
              "span",
              {
                className: "text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-sm",
                style: {
                  color: exp.colorHex,
                  backgroundColor: `${exp.colorHex}20`,
                  border: `1px solid ${exp.colorHex}50`
                }
              },
              exp.id.toUpperCase().replace("_", "")
            ), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-[10px] text-slate-400 font-mono capitalize" }, exp.category)), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-[9px] font-mono font-bold text-emerald-400 flex items-center bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30" }, /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-check-double mr-1 text-[8px]" }), " Verified Lab Data")),
            /* @__PURE__ */ import_react3.default.createElement("h4", { className: "text-xs sm:text-sm font-bold text-slate-100 hover:text-yellow-400 transition-colors leading-snug" }, obs?.title || exp.name),
            insight && /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-2 p-1.5 rounded-lg bg-slate-950/70 border border-indigo-900/50 flex items-center justify-between text-[10px] font-mono" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-indigo-300 font-semibold truncate flex items-center gap-1.5" }, /* @__PURE__ */ import_react3.default.createElement("i", { className: `fa-solid ${insight.icon} text-indigo-400` }), insight.symmetry)),
            insight && /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-1.5 flex items-center text-[10px] font-mono text-amber-300/80 space-x-1" }, /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-bolt text-yellow-400 text-[9px]" }), /* @__PURE__ */ import_react3.default.createElement("span", null, insight.specs)),
            /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex flex-wrap gap-1 mt-2" }, exp.components.slice(0, 3).map((comp, cIdx) => /* @__PURE__ */ import_react3.default.createElement(
              "span",
              {
                key: cIdx,
                className: "text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 flex items-center gap-1"
              },
              /* @__PURE__ */ import_react3.default.createElement("span", { className: "w-1 h-1 rounded-full bg-indigo-400" }),
              comp.name
            ))),
            /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2" }, /* @__PURE__ */ import_react3.default.createElement(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setGuideModalExpId(exp.id);
                },
                className: "flex-1 py-1.5 px-2 bg-indigo-950/50 hover:bg-indigo-900/80 border border-indigo-600/40 hover:border-yellow-400 text-slate-200 text-[10px] font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 shadow-sm"
              },
              /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-graduation-cap text-yellow-400" }),
              /* @__PURE__ */ import_react3.default.createElement("span", null, "Student Guide & Tables")
            ), /* @__PURE__ */ import_react3.default.createElement(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  handleLaunch(exp.id);
                },
                className: "py-1.5 px-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 text-[10px] font-black rounded-lg transition-all flex items-center justify-center shadow-md shadow-yellow-500/20 uppercase tracking-wider"
              },
              /* @__PURE__ */ import_react3.default.createElement("span", null, "Launch"),
              /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-play ml-1.5 text-[8px]" })
            ))
          );
        }), filteredConfigs.length === 0 && /* @__PURE__ */ import_react3.default.createElement("div", { className: "py-8 text-center text-xs text-slate-500 space-y-1" }, /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-folder-open text-2xl mb-1 block" }), 'No experiments match "', searchQuery, '"')))
      )
    ), activeBundle && /* @__PURE__ */ import_react3.default.createElement("div", { className: "absolute bottom-6 left-1/2 transform -translate-x-1/2 z-35 w-[calc(100%-2rem)] max-w-2xl bg-slate-950/90 backdrop-blur-md border-2 border-yellow-500 rounded-2xl p-4 shadow-2xl text-slate-100 pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        className: "w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold border shadow-md",
        style: {
          backgroundColor: `${activeBundle.colorHex}25`,
          color: activeBundle.colorHex,
          borderColor: `${activeBundle.colorHex}50`
        }
      },
      /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-cube" })
    ), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 uppercase font-bold" }, activeBundle.id.toUpperCase().replace("_", ""), " ACTIVE"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-xs text-slate-400 font-mono" }, "Virtual Pedestal Focused")), /* @__PURE__ */ import_react3.default.createElement("h3", { className: "text-sm font-bold text-white tracking-tight" }, SEM5_OBSERVATIONS[activeBundle.id]?.title || activeBundle.name))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center space-x-2 w-full sm:w-auto" }, /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => setGuideModalExpId(activeBundle.id),
        className: "flex-1 sm:flex-initial px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center"
      },
      /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-graduation-cap text-yellow-400 mr-1.5" }),
      "Guide & Tables"
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => handleLaunch(activeBundle.id),
        className: "flex-1 sm:flex-initial px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 rounded-xl text-xs font-black transition-all shadow-lg shadow-yellow-500/25 uppercase flex items-center justify-center"
      },
      "Launch Twin",
      /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-arrow-right ml-1.5" })
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => handleSelectCameraMode("overview"),
        className: "p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors",
        title: "Reset View"
      },
      /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-rotate-left" })
    ))), !activeBundle && /* @__PURE__ */ import_react3.default.createElement("div", { className: "hidden sm:block absolute bottom-4 right-6 max-w-lg z-30 pointer-events-auto bg-slate-950/90 backdrop-blur-md border border-indigo-900/60 p-3.5 rounded-2xl shadow-2xl space-y-2" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-between border-b border-indigo-950 pb-2" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "w-2 h-2 rounded-full bg-indigo-400 animate-ping" }), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-[10px] font-mono uppercase tracking-wider text-indigo-300 font-bold" }, "Differential Council \u2022 Heptagonal Virtual Ring (N=7)")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center space-x-2 text-[10px] font-mono text-slate-400" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-yellow-400" }, "R = 17.0m"), /* @__PURE__ */ import_react3.default.createElement("span", null, "\u2022"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-emerald-400" }, "\u03A6 = 1.618"), /* @__PURE__ */ import_react3.default.createElement("span", null, "\u2022"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-cyan-400" }, "50 Hz"))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-start space-x-3 pt-1" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "w-7 h-7 rounded-lg bg-purple-950/80 border border-purple-600/40 flex items-center justify-center text-purple-300 text-xs flex-shrink-0 mt-0.5" }, /* @__PURE__ */ import_react3.default.createElement("i", { className: "fa-solid fa-quote-left" })), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-xs text-amber-200/90 italic font-serif leading-snug" }, '"', PHILOSOPHICAL_APHORISMS[aphorismIdx].quote, '"'), /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-1 flex items-center justify-between text-[10px]" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-purple-300 font-semibold font-mono" }, "\u2014 ", PHILOSOPHICAL_APHORISMS[aphorismIdx].author), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-slate-500 font-mono" }, PHILOSOPHICAL_APHORISMS[aphorismIdx].role))))), guideModalExpId && /* @__PURE__ */ import_react3.default.createElement(
      StudentGuideModal,
      {
        experimentId: guideModalExpId,
        onClose: () => setGuideModalExpId(null),
        onLaunchTwin: (expId) => {
          setGuideModalExpId(null);
          handleLaunch(expId);
        }
      }
    ), showDatasheet && /* @__PURE__ */ import_react3.default.createElement(DatasheetModal, { onClose: () => setShowDatasheet(false) }));
  };

  // src/index.ts
  var import_react4 = __toESM(require_react());
  var import_client = __toESM(require_client());
  if (typeof window !== "undefined") {
    window.DigitalTwinTS = {
      LandingHero,
      StudentGuideModal,
      DatasheetModal,
      SEM5_OBSERVATIONS,
      STUDENT_LEARNING_GUIDES,
      VirtualSpaceManager,
      EXPERIMENT_3D_CONFIGS,
      mountLandingPage: (containerId, onLaunchExperiment) => {
        const container = document.getElementById(containerId);
        if (container) {
          const root = import_client.default.createRoot(container);
          root.render(
            import_react4.default.createElement(LandingHero, { onLaunchExperiment })
          );
          return root;
        }
        return null;
      }
    };
  }
  return __toCommonJS(index_exports);
})();
//# sourceMappingURL=digital_twin_bundle.js.map
