/**
 * Real Laboratory Observation Datasets
 * Source of Truth: C:\Users\saisi\OneDrive\Documents\machineslabmaterials-sem-5
 * Includes all verified readings, columns, formulas, and calculations.
 */

import { RealLabObservationDataset, ExperimentId } from '../types/experiments';

export const SEM5_OBSERVATIONS: Record<ExperimentId, RealLabObservationDataset> = {
  // -------------------------------------------------------------
  // EXPERIMENT 2: No-Load and Blocked Rotor Tests (Circle Diagram)
  // -------------------------------------------------------------
  exp2: {
    experimentId: 'exp2',
    title: 'No Load & Blocked Rotor Tests on 3-Phase Squirrel Cage Induction Motor',
    machineNameplate: {
      name: '3-Phase Squirrel Cage Induction Motor',
      make: 'Kirloskar Electric',
      type: 'KE-IM2.2',
      ratedVoltage: '415 V',
      ratedCurrent: '4.7 A',
      ratedPower: '2.2 kW (3 HP)',
      ratedSpeed: '1440 RPM',
      frequency: '50 Hz',
      connection: 'Delta (Δ)'
    },
    testConditions: {
      ambientTemp: '28°C',
      statorResistance: 7.9007, // Mean measured stator resistance in Ohms
      multiplicationFactor: 4, // Wattmeter MF for no-load
      noLoadSpeed: 1498 // RPM
    },
    tables: [
      {
        id: 'no_load',
        name: 'No-Load Test Observations',
        description: 'Conducted at rated stator voltage with rotor uncoupled to determine core and friction/windage losses.',
        columns: [
          { key: 'v0', label: 'Stator Voltage (V₀)', unit: 'V' },
          { key: 'i0', label: 'No-Load Current (I₀)', unit: 'A' },
          { key: 'w0_raw', label: 'Wattmeter Diff (W₁ - W₂)', unit: 'W' },
          { key: 'mf', label: 'Multiplication Factor', unit: '-' },
          { key: 'w0', label: 'Total No-Load Power (W₀)', unit: 'W', isCalculated: true },
          { key: 'speed', label: 'Speed', unit: 'RPM' }
        ],
        rows: [
          { slNo: 1, v0: 415, i0: 2.6, w0_raw: '155 - 110 = 45', mf: 4, w0: 180, speed: 1498 }
        ],
        calculationsSummary: {
          'No Load Power Factor (cos φ₀)': 'W₀ / (√3 · V₀ · I₀) = 180 / (√3 · 415 · 2.6) = 0.0963',
          'Core Loss Resistance (Rc)': '3 · (V_ph)² / W₀ = 3 · (415)² / 180 = 2870.4 Ω',
          'Magnetizing Reactance (Xm)': 'V_ph / I_m = 415 / 2.587 = 160.4 Ω'
        }
      },
      {
        id: 'blocked_rotor',
        name: 'Blocked Rotor Test Observations',
        description: 'Conducted at reduced voltage with locked rotor to determine equivalent copper losses and leakage impedance.',
        columns: [
          { key: 'vsc', label: 'Short-Circuit Voltage (V_sc)', unit: 'V' },
          { key: 'isc', label: 'Rated Short-Circuit Current (I_sc)', unit: 'A' },
          { key: 'mf', label: 'Wattmeter MF', unit: '-' },
          { key: 'wsc', label: 'Short-Circuit Power (W_sc)', unit: 'W' }
        ],
        rows: [
          { slNo: 1, vsc: 114, isc: 4.7, mf: 1, wsc: 260 }
        ],
        calculationsSummary: {
          'Equivalent Impedance (Z01)': 'V_sc / (√3 · I_sc) = 114 / (√3 · 4.7) = 13.99 Ω',
          'Equivalent Resistance (R01)': 'W_sc / (3 · I_sc²) = 260 / (3 · 4.7²) = 3.92 Ω',
          'Equivalent Reactance (X01)': '√(Z01² - R01²) = √(13.99² - 3.92²) = 13.43 Ω',
          'Rotor Resistance referred to Stator (R2\')': 'R01 - R1 = 3.92 - (7.9007 / 2) = 1.96 Ω',
          'Stator & Rotor Reactance (X1 = X2\')': 'X01 / 2 = 6.715 Ω'
        }
      },
      {
        id: 'stator_resistance',
        name: 'Stator Resistance Measurement (DC Voltmeter-Ammeter Method)',
        description: 'DC drop across stator phases to calculate per-phase resistance.',
        columns: [
          { key: 'voltage', label: 'DC Voltage (V)', unit: 'V' },
          { key: 'current', label: 'DC Current (I)', unit: 'A' },
          { key: 'resistance', label: 'Resistance (R = V / I)', unit: 'Ω', isCalculated: true }
        ],
        rows: [
          { slNo: 1, voltage: 15.5, current: 2.0, resistance: 7.75 },
          { slNo: 2, voltage: 18.0, current: 2.3, resistance: 7.82 },
          { slNo: 3, voltage: 20.0, current: 2.5, resistance: 8.00 },
          { slNo: 4, voltage: 22.0, current: 2.8, resistance: 7.857 },
          { slNo: 5, voltage: 24.0, current: 3.0, resistance: 8.00 },
          { slNo: 6, voltage: 26.0, current: 3.3, resistance: 7.878 },
          { slNo: 7, voltage: 28.0, current: 3.5, resistance: 8.00 }
        ],
        calculationsSummary: {
          'Mean DC Resistance (R_dc)': '7.9007 Ω',
          'Effective AC Resistance (R_ac)': '1.2 · R_dc = 9.48 Ω'
        }
      }
    ],
    modelCalculations: {
      title: 'Equivalent Circuit Parameter Derivation',
      sampleSetIndex: 1,
      steps: [
        {
          stepNumber: 1,
          description: 'No-load power factor angle determination',
          formula: 'cos(φ₀) = W₀ / (√3 · V₀ · I₀)',
          substitution: '180 / (√3 · 415 · 2.6)',
          result: 'cos(φ₀) = 0.0963, φ₀ = 84.47°'
        },
        {
          stepNumber: 2,
          description: 'Magnetizing current and core loss current components',
          formula: 'Iw = I₀ · cos(φ₀), Im = I₀ · sin(φ₀)',
          substitution: '2.6 · 0.0963, 2.6 · sin(84.47°)',
          result: 'Iw = 0.250 A, Im = 2.587 A'
        },
        {
          stepNumber: 3,
          description: 'Short-circuit parameters and leakage reactance',
          formula: 'Z₀₁ = V_sc / (√3 · I_sc), R₀₁ = W_sc / (3 · I_sc²)',
          substitution: '114 / (√3 · 4.7), 260 / (3 · 4.7²)',
          result: 'Z₀₁ = 13.99 Ω, R₀₁ = 3.92 Ω, X₀₁ = 13.43 Ω'
        }
      ]
    },
    benchmarkCurves: [
      {
        id: 'circle_diagram_pts',
        name: 'Circle Diagram Locus Points',
        xAxisKey: 'p_in',
        xLabel: 'Input Power (kW)',
        yAxisKey: 'torque',
        yLabel: 'Torque (N·m)',
        points: [
          { x: 0.18, y: 0.0 },
          { x: 1.0, y: 5.2 },
          { x: 2.2, y: 14.6 },
          { x: 3.1, y: 22.8 },
          { x: 4.0, y: 28.5 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // EXPERIMENT 3: Speed Control of 3-Phase Induction Motor
  // -------------------------------------------------------------
  exp3: {
    experimentId: 'exp3',
    title: 'Speed Control of 3-Phase Induction Motor',
    machineNameplate: {
      name: 'Pole-Changing & Slip-Ring Induction Motor Testbench',
      make: 'Kirloskar / NPTEL Lab Standard',
      type: 'Dual-Winding Dahlander / Slip-Ring Unit',
      ratedVoltage: '415 V',
      ratedCurrent: '4.7 A',
      ratedPower: '2.2 kW / 3 HP',
      ratedSpeed: '1440 RPM (4-pole base)',
      frequency: '50 Hz',
      connection: 'Star / Delta Switchable'
    },
    testConditions: {
      ambientTemp: '27°C'
    },
    tables: [
      {
        id: 'pole_changing',
        name: 'Method 1: Pole Changing Speed Control',
        description: 'Speed variation obtained by toggling stator winding pole grouping (Dahlander / multi-winding stator).',
        columns: [
          { key: 'poleConfig', label: 'Pole Configuration', unit: 'Poles' },
          { key: 'statorVoltage', label: 'Stator Voltage', unit: 'V' },
          { key: 'speed', label: 'No-Load Speed', unit: 'RPM' }
        ],
        rows: [
          { slNo: 1, poleConfig: '6 pole', statorVoltage: 415, speed: 998 },
          { slNo: 2, poleConfig: '4 pole', statorVoltage: 415, speed: 1499 },
          { slNo: 3, poleConfig: '2 pole', statorVoltage: 415, speed: 2999 }
        ],
        calculationsSummary: {
          'Synchronous Speed Ns (6P)': '120 · 50 / 6 = 1000 RPM (Recorded: 998 RPM, s = 0.2%)',
          'Synchronous Speed Ns (4P)': '120 · 50 / 4 = 1500 RPM (Recorded: 1499 RPM, s = 0.07%)',
          'Synchronous Speed Ns (2P)': '120 · 50 / 2 = 3000 RPM (Recorded: 2999 RPM, s = 0.03%)'
        }
      },
      {
        id: 'stator_voltage_control',
        name: 'Method 2: Stator Voltage Control',
        description: 'Varying stator terminal voltage via 3φ auto-transformer at constant frequency.',
        columns: [
          { key: 'voltagePct', label: 'Stator Voltage %', unit: '%' },
          { key: 'voltageVal', label: 'Terminal Voltage', unit: 'V' },
          { key: 'noLoadSpeed', label: 'No-Load Speed', unit: 'RPM' },
          { key: 'loadSpeed', label: '25% Full Load Speed', unit: 'RPM' }
        ],
        rows: [
          { slNo: 1, voltagePct: '20%', voltageVal: 83, noLoadSpeed: 1470, loadSpeed: '-' },
          { slNo: 2, voltagePct: '40%', voltageVal: 166, noLoadSpeed: 1486, loadSpeed: '-' },
          { slNo: 3, voltagePct: '60%', voltageVal: 249, noLoadSpeed: 1491, loadSpeed: 1400 },
          { slNo: 4, voltagePct: '80%', voltageVal: 332, noLoadSpeed: 1493, loadSpeed: 1447 },
          { slNo: 5, voltagePct: '100%', voltageVal: 415, noLoadSpeed: 1494, loadSpeed: 1465 }
        ],
        calculationsSummary: {
          'Observation Note': 'Torque is proportional to V². On load, reducing voltage substantially increases slip, dropping rotor speed.'
        }
      },
      {
        id: 'rotor_rheostat_control',
        name: 'Method 3: Rotor Rheostat Resistance Control (Slip-Ring Motor)',
        description: 'Inserting external 3-phase resistance in rotor circuit via slip-rings.',
        columns: [
          { key: 'speed', label: 'Rotor Speed (N)', unit: 'RPM' },
          { key: 'vr', label: 'Voltage Across Rotor Resistor (V_r)', unit: 'V' },
          { key: 'ir', label: 'Rotor Current (I_r)', unit: 'A' },
          { key: 'rext', label: 'Ext. Rotor Resistance (V_r / I_r)', unit: 'Ω', isCalculated: true }
        ],
        rows: [
          { slNo: 1, speed: 1296, vr: 22, ir: 0.70, rext: 31.43 },
          { slNo: 2, speed: 1233, vr: 28, ir: 0.85, rext: 32.94 },
          { slNo: 3, speed: 1135, vr: 39, ir: 0.95, rext: 41.05 },
          { slNo: 4, speed: 1059, vr: 48, ir: 1.00, rext: 48.00 },
          { slNo: 5, speed: 954, vr: 60, ir: 1.00, rext: 60.00 },
          { slNo: 6, speed: 800, vr: 78, ir: 1.00, rext: 78.00 },
          { slNo: 7, speed: 507, vr: 111, ir: 0.95, rext: 116.84 }
        ],
        calculationsSummary: {
          'Mean Added External Resistance': '58.32 Ω',
          'Operating Principle': 'Added rotor resistance increases starting torque and lowers speed for given load without reducing maximum breakdown torque.'
        }
      }
    ],
    modelCalculations: {
      title: 'Rotor Resistance Calculation',
      sampleSetIndex: 1,
      steps: [
        {
          stepNumber: 1,
          description: 'Calculate external circuit resistance per phase',
          formula: 'R_ext = V_r / I_r',
          substitution: '22 / 0.70',
          result: '31.43 Ω'
        },
        {
          stepNumber: 2,
          description: 'Slip calculation for set 7',
          formula: 's = (N_s - N) / N_s',
          substitution: '(1500 - 507) / 1500',
          result: 's = 0.662 (66.2% slip)'
        }
      ]
    },
    benchmarkCurves: [
      {
        id: 'speed_vs_rext',
        name: 'Rotor Speed vs Added Rotor Resistance',
        xAxisKey: 'rext',
        xLabel: 'Rotor Resistance (Ω)',
        yAxisKey: 'speed',
        yLabel: 'Speed (RPM)',
        points: [
          { x: 31.43, y: 1296 },
          { x: 32.94, y: 1233 },
          { x: 41.05, y: 1135 },
          { x: 48.00, y: 1059 },
          { x: 60.00, y: 954 },
          { x: 78.00, y: 800 },
          { x: 116.84, y: 507 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // EXPERIMENT 5: Load Test on 3-Phase Alternator
  // -------------------------------------------------------------
  exp5: {
    experimentId: 'exp5',
    title: 'Load Test on Three-Phase Alternator',
    machineNameplate: {
      name: '3-Phase Salient Pole Synchronous Alternator',
      make: 'Crompton Greaves',
      type: 'CG-SA3.5',
      ratedVoltage: '415 V',
      ratedCurrent: '4.87 A',
      ratedPower: '3.5 kVA',
      ratedSpeed: '1500 RPM',
      frequency: '50 Hz',
      connection: 'Star (Y) with Neutral'
    },
    testConditions: {
      fieldVoltage: '220 V DC',
      noLoadSpeed: 1500
    },
    tables: [
      {
        id: 'direct_loading',
        name: 'Alternator Direct Loading Test Observations (No-load Voltage E₀ = 415 V)',
        description: 'Measured with 3-phase resistive load bank while maintaining prime mover speed at 1500 RPM.',
        columns: [
          { key: 'ifield', label: 'Field Current (I_f)', unit: 'A' },
          { key: 'vt', label: 'Terminal Line Voltage (V_t)', unit: 'V' },
          { key: 'il', label: 'Load Line Current (I_L)', unit: 'A' },
          { key: 'p0', label: 'Output Power (P_o)', unit: 'W', isCalculated: true },
          { key: 'regPct', label: 'Voltage Regulation (%)', unit: '%', isCalculated: true }
        ],
        rows: [
          { slNo: 1, ifield: 1.10, vt: 415, il: 0.0, p0: 0.0, regPct: 0.0 },
          { slNo: 2, ifield: 1.10, vt: 410, il: 1.0, p0: 710.14, regPct: 1.20 },
          { slNo: 3, ifield: 1.06, vt: 400, il: 2.0, p0: 1385.64, regPct: 3.61 },
          { slNo: 4, ifield: 1.05, vt: 390, il: 2.8, p0: 1891.40, regPct: 6.02 },
          { slNo: 5, ifield: 1.05, vt: 375, il: 3.4, p0: 2208.36, regPct: 9.64 },
          { slNo: 6, ifield: 1.05, vt: 360, il: 4.2, p0: 2618.86, regPct: 13.25 },
          { slNo: 7, ifield: 1.05, vt: 350, il: 4.3, p0: 2606.73, regPct: 15.66 },
          { slNo: 8, ifield: 1.04, vt: 340, il: 4.8, p0: 2826.70, regPct: 18.07 },
          { slNo: 9, ifield: 1.04, vt: 325, il: 5.3, p0: 2983.46, regPct: 21.68 },
          { slNo: 10, ifield: 1.04, vt: 310, il: 5.8, p0: 3114.23, regPct: 25.30 },
          { slNo: 11, ifield: 1.04, vt: 290, il: 6.3, p0: 3164.45, regPct: 30.12 },
          { slNo: 12, ifield: 1.04, vt: 270, il: 6.8, p0: 3180.04, regPct: 34.94 }
        ],
        calculationsSummary: {
          'Full-Load Voltage Regulation (at 4.8 A)': '18.07%',
          'Maximum Test Overload (at 6.8 A)': '34.94% regulation'
        }
      }
    ],
    modelCalculations: {
      title: 'Power and Regulation Model Calculation (Set No. 6)',
      sampleSetIndex: 6,
      steps: [
        {
          stepNumber: 1,
          description: 'Active 3-phase output power calculation (cos φ = 1 for resistive load)',
          formula: 'P_o = √3 · V_t · I_L · cos(φ)',
          substitution: '√3 · 360 · 4.2 · 1.0',
          result: '2618.86 W'
        },
        {
          stepNumber: 2,
          description: 'Percentage voltage regulation calculation',
          formula: '% Regulation = ((E₀ - V_t) / E₀) · 100',
          substitution: '((415 - 360) / 415) · 100',
          result: '13.25%'
        }
      ]
    },
    benchmarkCurves: [
      {
        id: 'vt_vs_il',
        name: 'Terminal Voltage vs Load Current',
        xAxisKey: 'il',
        xLabel: 'Load Current (A)',
        yAxisKey: 'vt',
        yLabel: 'Terminal Voltage (V)',
        points: [
          { x: 0.0, y: 415 },
          { x: 1.0, y: 410 },
          { x: 2.0, y: 400 },
          { x: 2.8, y: 390 },
          { x: 3.4, y: 375 },
          { x: 4.2, y: 360 },
          { x: 4.8, y: 340 },
          { x: 5.8, y: 310 },
          { x: 6.8, y: 270 }
        ]
      },
      {
        id: 'reg_vs_il',
        name: 'Voltage Regulation vs Load Current',
        xAxisKey: 'il',
        xLabel: 'Load Current (A)',
        yAxisKey: 'regPct',
        yLabel: 'Voltage Regulation (%)',
        points: [
          { x: 0.0, y: 0.0 },
          { x: 1.0, y: 1.20 },
          { x: 2.0, y: 3.61 },
          { x: 2.8, y: 6.02 },
          { x: 3.4, y: 9.64 },
          { x: 4.2, y: 13.25 },
          { x: 4.8, y: 18.07 },
          { x: 5.8, y: 25.30 },
          { x: 6.8, y: 34.94 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // EXPERIMENT 6A: Alternator Regulation by EMF and MMF Methods
  // -------------------------------------------------------------
  exp6_a: {
    experimentId: 'exp6_a',
    title: 'Regulation of Alternator by EMF and MMF Methods',
    machineNameplate: {
      name: 'Non-Salient Pole Synchronous Alternator',
      make: 'Crompton Greaves Standard Unit',
      type: 'CG-SA3.5',
      ratedVoltage: '415 V',
      ratedCurrent: '4.8 A',
      ratedPower: '3.5 kVA',
      ratedSpeed: '1500 RPM',
      frequency: '50 Hz',
      connection: 'Star (Y)'
    },
    testConditions: {
      effectiveArmatureResistance: 2.415 // Measured Ra per phase (1.2 * Rdc)
    },
    tables: [
      {
        id: 'occ',
        name: 'Open Circuit Characteristic (OCC) Test',
        description: 'Terminal voltage generated on open circuit at rated synchronous speed (1500 RPM) vs DC field excitation.',
        columns: [
          { key: 'ifield', label: 'Field Current (I_f)', unit: 'A' },
          { key: 'e0_line', label: 'Open Circuit Line Voltage E₀(line)', unit: 'V' },
          { key: 'e0_phase', label: 'Open Circuit Phase Voltage E₀(ph)', unit: 'V', isCalculated: true }
        ],
        rows: [
          { slNo: 1, ifield: 0.00, e0_line: 28.0, e0_phase: 16.16 },
          { slNo: 2, ifield: 0.25, e0_line: 152.5, e0_phase: 87.75 },
          { slNo: 3, ifield: 0.29, e0_line: 170.5, e0_phase: 98.43 },
          { slNo: 4, ifield: 0.31, e0_line: 190.4, e0_phase: 109.92 },
          { slNo: 5, ifield: 0.35, e0_line: 210.0, e0_phase: 121.24 },
          { slNo: 6, ifield: 0.40, e0_line: 230.0, e0_phase: 132.80 },
          { slNo: 7, ifield: 0.43, e0_line: 257.0, e0_phase: 148.40 },
          { slNo: 8, ifield: 0.45, e0_line: 270.0, e0_phase: 155.80 },
          { slNo: 9, ifield: 0.50, e0_line: 290.0, e0_phase: 167.40 },
          { slNo: 10, ifield: 0.55, e0_line: 310.0, e0_phase: 178.90 },
          { slNo: 11, ifield: 0.62, e0_line: 330.0, e0_phase: 190.50 },
          { slNo: 12, ifield: 0.70, e0_line: 350.0, e0_phase: 202.10 },
          { slNo: 13, ifield: 0.79, e0_line: 370.0, e0_phase: 213.60 },
          { slNo: 14, ifield: 0.90, e0_line: 390.0, e0_phase: 225.20 },
          { slNo: 15, ifield: 1.00, e0_line: 400.0, e0_phase: 230.90 },
          { slNo: 16, ifield: 1.09, e0_line: 410.0, e0_phase: 236.70 }
        ]
      },
      {
        id: 'scc',
        name: 'Short Circuit Characteristic (SCC) Test',
        description: 'Armature short-circuited through ammeters; field current increased until rated current flows.',
        columns: [
          { key: 'if_sc', label: 'Field Current (I_fsc)', unit: 'A' },
          { key: 'isc', label: 'Short Circuit Current (I_sc)', unit: 'A' }
        ],
        rows: [
          { slNo: 1, if_sc: 0.35, isc: 4.30 }
        ],
        calculationsSummary: {
          'Synchronous Impedance (Zs)': 'E₀(ph) at If=0.35 / I_sc = 121.24 V / 4.3 A = 28.19 Ω',
          'Synchronous Reactance (Xs)': '√(Zs² - Ra²) = √(28.19² - 2.415²) = 28.09 Ω'
        }
      },
      {
        id: 'dc_resistance',
        name: 'Armature DC Resistance Measurement',
        description: 'Per-phase armature winding resistance by DC drop test.',
        columns: [
          { key: 'idc', label: 'Phase Current (I_dc)', unit: 'A' },
          { key: 'vdc', label: 'Voltage Drop (V_dc)', unit: 'V' },
          { key: 'rdc', label: 'DC Resistance (V_dc / I_dc)', unit: 'Ω', isCalculated: true },
          { key: 'reffective', label: 'Effective AC Resistance (1.2 · R_dc)', unit: 'Ω', isCalculated: true }
        ],
        rows: [
          { slNo: 1, idc: 2.0, vdc: 4.1, rdc: 2.05, reffective: 2.46 },
          { slNo: 2, idc: 2.5, vdc: 5.0, rdc: 2.00, reffective: 2.40 },
          { slNo: 3, idc: 3.0, vdc: 6.0, rdc: 2.00, reffective: 2.40 },
          { slNo: 4, idc: 3.5, vdc: 7.0, rdc: 2.00, reffective: 2.40 }
        ],
        calculationsSummary: {
          'Mean Effective Resistance per phase': '2.415 Ω'
        }
      }
    ],
    modelCalculations: {
      title: 'EMF Method Regulation at 0.8 PF Lagging',
      sampleSetIndex: 1,
      steps: [
        {
          stepNumber: 1,
          description: 'No-load induced EMF per phase equation',
          formula: 'E₀ = √((V·cosφ + I·Ra)² + (V·sinφ + I·Xs)²)',
          substitution: '√((239.6·0.8 + 4.8·2.415)² + (239.6·0.6 + 4.8·28.09)²)',
          result: 'E₀ = 345.2 V'
        },
        {
          stepNumber: 2,
          description: 'Percentage voltage regulation calculation',
          formula: '% Reg = ((E₀ - V) / V) · 100',
          substitution: '((345.2 - 239.6) / 239.6) · 100',
          result: '44.07% (Pessimistic method)'
        }
      ]
    },
    benchmarkCurves: [
      {
        id: 'occ_curve',
        name: 'Open Circuit Characteristic (OCC)',
        xAxisKey: 'ifield',
        xLabel: 'Field Current (A)',
        yAxisKey: 'e0_phase',
        yLabel: 'Phase Voltage (V)',
        points: [
          { x: 0.0, y: 16.16 },
          { x: 0.25, y: 87.75 },
          { x: 0.35, y: 121.24 },
          { x: 0.50, y: 167.40 },
          { x: 0.70, y: 202.10 },
          { x: 0.90, y: 225.20 },
          { x: 1.09, y: 236.70 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // EXPERIMENT 6B: Load Test on Induction Generator
  // -------------------------------------------------------------
  exp6_b: {
    experimentId: 'exp6_b',
    title: 'Load Test on Induction Generator',
    machineNameplate: {
      name: 'DC Shunt Motor coupled Induction Generator Test Set',
      make: 'Kirloskar Integrated Motor-Gen Set',
      type: 'KE-IG2.2',
      ratedVoltage: '415 V (Induction) / 220 V (DC)',
      ratedCurrent: '4.7 A (AC) / 14 A (DC)',
      ratedPower: '2.2 kW Induction Generator',
      ratedSpeed: '1440 RPM (Motor) / >1500 RPM (Gen)',
      frequency: '50 Hz',
      connection: 'Delta (Δ) with Delta Capacitor Bank'
    },
    testConditions: {
      syncSpeed: 1494, // Measured synchronous speed in lab
      multiplicationFactor: 2 // Wattmeter MF = 2
    },
    tables: [
      {
        id: 'ig_load',
        name: 'Induction Generator Loading Observations',
        description: 'Driven super-synchronously (N > Ns) by DC motor; excitation supplied by self-excitation capacitor bank.',
        columns: [
          { key: 'vac', label: 'AC Generated Voltage (V_ac)', unit: 'V' },
          { key: 'iac', label: 'AC Output Current (I_ac)', unit: 'A' },
          { key: 'pac_out', label: 'Active Power Output (P_ac)', unit: 'W' },
          { key: 'vdc', label: 'DC Input Voltage (V_dc)', unit: 'V' },
          { key: 'idc', label: 'DC Input Current (I_dc)', unit: 'A' },
          { key: 'speed', label: 'Shaft Speed (N)', unit: 'RPM' }
        ],
        rows: [
          { slNo: 1, vac: 415, iac: 3.95, pac_out: 200, vdc: 220, idc: 3.5, speed: 1503.6 },
          { slNo: 2, vac: 415, iac: 3.95, pac_out: 280, vdc: 216, idc: 4.5, speed: 1505.5 },
          { slNo: 3, vac: 415, iac: 4.10, pac_out: 560, vdc: 216, idc: 5.0, speed: 1507.0 },
          { slNo: 4, vac: 415, iac: 4.20, pac_out: 720, vdc: 215, idc: 6.0, speed: 1509.6 },
          { slNo: 5, vac: 415, iac: 4.40, pac_out: 890, vdc: 215, idc: 7.0, speed: 1512.0 },
          { slNo: 6, vac: 415, iac: 4.50, pac_out: 1080, vdc: 214, idc: 8.0, speed: 1514.4 },
          { slNo: 7, vac: 415, iac: 4.65, pac_out: 1220, vdc: 210, idc: 9.0, speed: 1516.2 },
          { slNo: 8, vac: 415, iac: 4.80, pac_out: 1400, vdc: 210, idc: 10.0, speed: 1517.0 },
          { slNo: 9, vac: 415, iac: 4.90, pac_out: 1560, vdc: 210, idc: 11.0, speed: 1521.0 },
          { slNo: 10, vac: 415, iac: 5.00, pac_out: 1740, vdc: 210, idc: 12.0, speed: 1524.0 },
          { slNo: 11, vac: 415, iac: 5.10, pac_out: 2000, vdc: 208, idc: 13.0, speed: 1527.8 },
          { slNo: 12, vac: 415, iac: 5.30, pac_out: 2080, vdc: 208, idc: 14.0, speed: 1528.8 }
        ]
      }
    ],
    modelCalculations: {
      title: 'Super-Synchronous Generator Calculations (Set No. 6)',
      sampleSetIndex: 6,
      steps: [
        {
          stepNumber: 1,
          description: 'DC Prime Mover Input Power',
          formula: 'P_dc = V_dc · I_dc',
          substitution: '214 · 8.0',
          result: '1712 W'
        },
        {
          stepNumber: 2,
          description: 'Mechanical shaft power input to generator (η_dc = 85%)',
          formula: 'P_ac_in = 0.85 · P_dc',
          substitution: '0.85 · 1712',
          result: '1455.2 W'
        },
        {
          stepNumber: 3,
          description: 'Generator Power Factor (using half-meter active output reading 540 W)',
          formula: 'cos φ = P_ac_out / (√3 · V_ac · I_ac)',
          substitution: '540 / (√3 · 415 · 4.5)',
          result: '0.166'
        },
        {
          stepNumber: 4,
          description: 'Negative Generator Slip (Super-Synchronous Operation)',
          formula: 's = ((N_s - N) / N_s) · 100',
          substitution: '((1494 - 1514.4) / 1494) · 100',
          result: '-1.36% (Negative slip confirms generating mode)'
        }
      ]
    },
    benchmarkCurves: [
      {
        id: 'pac_vs_speed',
        name: 'Generated Power vs Shaft Speed',
        xAxisKey: 'speed',
        xLabel: 'Shaft Speed (RPM)',
        yAxisKey: 'pac_out',
        yLabel: 'Generated Active Power (W)',
        points: [
          { x: 1503.6, y: 200 },
          { x: 1507.0, y: 560 },
          { x: 1512.0, y: 890 },
          { x: 1514.4, y: 1080 },
          { x: 1521.0, y: 1560 },
          { x: 1528.8, y: 2080 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // EXPERIMENT 7: Regulation of Alternator by ZPF / Potier Method
  // -------------------------------------------------------------
  exp7: {
    experimentId: 'exp7',
    title: 'Regulation of Alternator by ZPF (Potier Triangle) Method',
    machineNameplate: {
      name: '3-Phase Cylindrical / Salient Pole Alternator',
      make: 'Crompton Greaves Precision Test Unit',
      type: 'CG-SA3.5',
      ratedVoltage: '415 V',
      ratedCurrent: '4.87 A (Tested up to 6.9 A)',
      ratedPower: '3.5 kVA',
      ratedSpeed: '1500 RPM',
      frequency: '50 Hz',
      connection: 'Star (Y)'
    },
    testConditions: {
      effectiveArmatureResistance: 2.40 // Ra / phase = 2.4 Ohms
    },
    tables: [
      {
        id: 'occ',
        name: 'Open Circuit Characteristic (OCC) Curve',
        description: 'Field current vs generated line and phase voltage.',
        columns: [
          { key: 'ifield', label: 'Field Current (I_f)', unit: 'A' },
          { key: 'e0_line', label: 'Line Voltage E₀(line)', unit: 'V' },
          { key: 'e0_phase', label: 'Phase Voltage E₀(ph)', unit: 'V', isCalculated: true }
        ],
        rows: [
          { slNo: 1, ifield: 0.00, e0_line: 12.94, e0_phase: 7.47 },
          { slNo: 2, ifield: 0.30, e0_line: 211.6, e0_phase: 122.16 },
          { slNo: 3, ifield: 0.35, e0_line: 245.8, e0_phase: 141.91 },
          { slNo: 4, ifield: 0.40, e0_line: 273.6, e0_phase: 157.96 },
          { slNo: 5, ifield: 0.45, e0_line: 304.6, e0_phase: 175.86 },
          { slNo: 6, ifield: 0.50, e0_line: 341.7, e0_phase: 197.28 },
          { slNo: 7, ifield: 0.55, e0_line: 363.2, e0_phase: 209.69 },
          { slNo: 8, ifield: 0.60, e0_line: 386.2, e0_phase: 222.97 },
          { slNo: 9, ifield: 0.65, e0_line: 405.0, e0_phase: 233.82 },
          { slNo: 10, ifield: 0.70, e0_line: 421.0, e0_phase: 243.06 },
          { slNo: 11, ifield: 0.75, e0_line: 439.0, e0_phase: 253.45 },
          { slNo: 12, ifield: 0.80, e0_line: 450.0, e0_phase: 259.80 }
        ]
      },
      {
        id: 'zpf_test_points',
        name: 'ZPF Operating & Short-Circuit Test Points',
        description: 'Two boundary test points used to construct the Potier Triangle.',
        columns: [
          { key: 'pointName', label: 'Test Point', unit: '-' },
          { key: 'voltage', label: 'Terminal Line Voltage', unit: 'V' },
          { key: 'ifield', label: 'Field Current (I_f)', unit: 'A' },
          { key: 'armatureCurrent', label: 'Armature Current (I_a)', unit: 'A' }
        ],
        rows: [
          { slNo: 1, pointName: 'Short-Circuit Point (Zero Voltage Point)', voltage: 0.0, ifield: 1.0, armatureCurrent: 6.9 },
          { slNo: 2, pointName: 'ZPF Rated Voltage Point (Pure Inductive Load)', voltage: 415.0, ifield: 1.70, armatureCurrent: 6.94 }
        ],
        calculationsSummary: {
          'Potier Leakage Reactance Drop (BK)': 'Height of Potier triangle = 42 V per phase',
          'Leakage Reactance (Xl)': '42 V / 6.9 A = 6.08 Ω',
          'Armature Reaction MMF (Fa)': 'Base of Potier triangle = 0.32 A (field equivalent)'
        }
      },
      {
        id: 'predetermined_reg',
        name: 'Pre-Determined Regulation Table Across Power Factors',
        description: 'Calculated voltage regulation from Potier triangle parameters.',
        columns: [
          { key: 'nature', label: 'Nature of PF', unit: '-' },
          { key: 'pf', label: 'Power Factor', unit: '-' },
          { key: 'vrated', label: 'Rated V/ph', unit: 'V' },
          { key: 'e_induced', label: 'Induced E', unit: 'V' },
          { key: 'if_total', label: 'Total I_f Required', unit: 'A' },
          { key: 'e0_phase', label: 'Generated E₀/ph', unit: 'V' },
          { key: 'regPct', label: 'Voltage Regulation', unit: '%' }
        ],
        rows: [
          { slNo: 1, nature: 'Lagging', pf: 0.0, vrated: 239.6, e_induced: 307.40, if_total: 2.046, e0_phase: 315.0, regPct: 31.40 },
          { slNo: 2, nature: 'Lagging', pf: 0.2, vrated: 239.6, e_induced: 308.49, if_total: 2.036, e0_phase: 315.0, regPct: 31.40 },
          { slNo: 3, nature: 'Lagging', pf: 0.4, vrated: 239.6, e_induced: 307.32, if_total: 2.000, e0_phase: 315.0, regPct: 31.40 },
          { slNo: 4, nature: 'Lagging', pf: 0.6, vrated: 239.6, e_induced: 303.31, if_total: 1.940, e0_phase: 315.0, regPct: 31.40 },
          { slNo: 5, nature: 'Lagging', pf: 0.8, vrated: 239.6, e_induced: 294.70, if_total: 1.830, e0_phase: 315.0, regPct: 31.40 },
          { slNo: 6, nature: 'UPF', pf: 1.0, vrated: 239.6, e_induced: 262.23, if_total: 1.470, e0_phase: 310.0, regPct: 29.38 },
          { slNo: 7, nature: 'Leading', pf: 0.8, vrated: 239.6, e_induced: 219.17, if_total: 0.970, e0_phase: 283.0, regPct: 18.11 },
          { slNo: 8, nature: 'Leading', pf: 0.6, vrated: 239.6, e_induced: 200.61, if_total: 0.740, e0_phase: 240.0, regPct: 0.17 },
          { slNo: 9, nature: 'Leading', pf: 0.4, vrated: 239.6, e_induced: 187.49, if_total: 0.560, e0_phase: 209.0, regPct: -12.77 },
          { slNo: 10, nature: 'Leading', pf: 0.2, vrated: 239.6, e_induced: 178.28, if_total: 0.430, e0_phase: 174.0, regPct: -27.38 },
          { slNo: 11, nature: 'Leading', pf: 0.0, vrated: 239.6, e_induced: 172.65, if_total: 0.386, e0_phase: 145.0, regPct: -39.48 }
        ]
      }
    ],
    modelCalculations: {
      title: 'ZPF Regulation at 0.8 PF Lagging',
      sampleSetIndex: 5,
      steps: [
        {
          stepNumber: 1,
          description: 'Calculate voltage behind leakage reactance E',
          formula: 'E = √((V·cosφ + I·Ra)² + (V·sinφ + I·Xl)²)',
          substitution: '√((239.6·0.8 + 6.94·2.4)² + (239.6·0.6 + 6.94·6.08)²)',
          result: 'E = 294.70 V'
        },
        {
          stepNumber: 2,
          description: 'Obtain field excitation from OCC and combine with Armature reaction MMF vectorially',
          formula: 'Total If = √(If1² + Fa² - 2·If1·Fa·cos(90 + φ))',
          substitution: '√(1.55² + 0.32² - 2·1.55·0.32·cos(126.87°))',
          result: 'Total If = 1.83 A'
        },
        {
          stepNumber: 3,
          description: 'Pre-determined voltage regulation',
          formula: '% Regulation = ((E₀ - V) / V) · 100',
          substitution: '((315 - 239.6) / 239.6) · 100',
          result: '31.40%'
        }
      ]
    },
    benchmarkCurves: [
      {
        id: 'reg_vs_pf',
        name: 'Percentage Regulation vs Power Factor',
        xAxisKey: 'pf',
        xLabel: 'Power Factor (Lagging -> UPF -> Leading)',
        yAxisKey: 'regPct',
        yLabel: 'Regulation (%)',
        points: [
          { x: -0.0, y: 31.4 },
          { x: -0.8, y: 31.4 },
          { x: 1.0, y: 29.38 },
          { x: 0.8, y: 18.11 },
          { x: 0.6, y: 0.17 },
          { x: 0.4, y: -12.77 },
          { x: 0.0, y: -39.48 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // EXPERIMENT 8: Alternator on Infinite Bus Bar (V and Inverted-V Curves)
  // -------------------------------------------------------------
  exp8: {
    experimentId: 'exp8',
    title: 'Alternator Connected to Infinite Bus Bar (V & Inverted V Curves)',
    machineNameplate: {
      name: 'Grid-Connected Synchronous Alternator',
      make: 'Crompton Greaves Synchronization Test Set',
      type: 'CG-SA3.5',
      ratedVoltage: '415 V',
      ratedCurrent: '4.87 A',
      ratedPower: '3.5 kVA',
      ratedSpeed: '1500 RPM',
      frequency: '50 Hz',
      connection: 'Star (Y) to Infinite Bus via Synchronizer'
    },
    testConditions: {
      multiplicationFactor: 2 // Wattmeter multiplication factor = 2
    },
    tables: [
      {
        id: 'v_curves_data',
        name: 'V & Inverted V Curves Tabular Observations',
        description: 'Varying field current from under-excitation to over-excitation while delivering constant active power to the busbar.',
        columns: [
          { key: 'vl', label: 'Bus Voltage (V_L)', unit: 'V' },
          { key: 'il', label: 'Armature Line Current (I_L)', unit: 'A' },
          { key: 'ifield', label: 'Field Excitation (I_f)', unit: 'A' },
          { key: 'wattmeter', label: 'Active Power (W)', unit: 'W' },
          { key: 'pf', label: 'Operating Power Factor', unit: '-', isCalculated: true }
        ],
        rows: [
          { slNo: 1, vl: 415, il: 6.6, ifield: 0.4, wattmeter: 200, pf: 0.252 },
          { slNo: 2, vl: 415, il: 5.8, ifield: 0.5, wattmeter: 200, pf: 0.287 },
          { slNo: 3, vl: 415, il: 5.0, ifield: 0.6, wattmeter: 200, pf: 0.333 },
          { slNo: 4, vl: 415, il: 4.2, ifield: 0.7, wattmeter: 200, pf: 0.397 },
          { slNo: 5, vl: 415, il: 3.2, ifield: 0.8, wattmeter: 200, pf: 0.521 },
          { slNo: 6, vl: 420, il: 2.6, ifield: 0.9, wattmeter: 200, pf: 0.634 },
          { slNo: 7, vl: 420, il: 2.2, ifield: 1.0, wattmeter: 200, pf: 0.749 },
          { slNo: 8, vl: 420, il: 2.0, ifield: 1.1, wattmeter: 200, pf: 0.824 },
          { slNo: 9, vl: 420, il: 2.0, ifield: 1.2, wattmeter: 200, pf: 0.824 },
          { slNo: 10, vl: 420, il: 2.3, ifield: 1.3, wattmeter: 200, pf: 0.717 },
          { slNo: 11, vl: 420, il: 2.0, ifield: 1.4, wattmeter: 200, pf: 0.824 },
          { slNo: 12, vl: 420, il: 3.1, ifield: 1.5, wattmeter: 200, pf: 0.532 },
          { slNo: 13, vl: 420, il: 3.8, ifield: 1.6, wattmeter: 200, pf: 0.434 },
          { slNo: 14, vl: 420, il: 4.4, ifield: 1.7, wattmeter: 200, pf: 0.374 },
          { slNo: 15, vl: 420, il: 5.1, ifield: 1.8, wattmeter: 200, pf: 0.323 },
          { slNo: 16, vl: 420, il: 5.7, ifield: 1.9, wattmeter: 200, pf: 0.289 },
          { slNo: 17, vl: 420, il: 6.3, ifield: 2.0, wattmeter: 200, pf: 0.261 },
          { slNo: 18, vl: 420, il: 6.9, ifield: 2.1, wattmeter: 200, pf: 0.239 }
        ],
        calculationsSummary: {
          'Minimum Armature Current (Unity Power Factor Point)': 'I_L = 2.0 A at I_f = 1.1 - 1.2 A',
          'Under-Excited Regime (I_f < 1.1 A)': 'Lagging Power Factor (Delivers lagging reactive power to bus)',
          'Over-Excited Regime (I_f > 1.2 A)': 'Leading Power Factor (Absorbs leading reactive power / acts as synchronous condenser)'
        }
      }
    ],
    modelCalculations: {
      title: 'Power Factor Calculation (Row 8 Minimum Current Point)',
      sampleSetIndex: 8,
      steps: [
        {
          stepNumber: 1,
          description: 'Power Factor calculation from wattmeter reading and multiplication factor',
          formula: 'cos φ = (W · MF) / (√3 · V_L · I_L)',
          substitution: '(200 · 2) / (√3 · 420 · 2.0)',
          result: 'cos φ = 400 / 1454.9 = 0.824'
        }
      ]
    },
    benchmarkCurves: [
      {
        id: 'v_curve',
        name: 'V Curve (Armature Current Ia vs Field Current If)',
        xAxisKey: 'ifield',
        xLabel: 'Field Current If (A)',
        yAxisKey: 'il',
        yLabel: 'Armature Current Ia (A)',
        points: [
          { x: 0.4, y: 6.6 },
          { x: 0.6, y: 5.0 },
          { x: 0.8, y: 3.2 },
          { x: 1.1, y: 2.0 },
          { x: 1.5, y: 3.1 },
          { x: 1.8, y: 5.1 },
          { x: 2.1, y: 6.9 }
        ]
      },
      {
        id: 'inverted_v_curve',
        name: 'Inverted V Curve (Power Factor vs Field Current If)',
        xAxisKey: 'ifield',
        xLabel: 'Field Current If (A)',
        yAxisKey: 'pf',
        yLabel: 'Power Factor (cos φ)',
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
