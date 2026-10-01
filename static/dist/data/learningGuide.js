/**
 * Student Educational Learning Guide & Viva Voce Bank
 * Formatted specifically to help undergraduate students understand concepts simply.
 * Source: Semester-5 syllabus & standard machine laboratory guidelines.
 */
export const STUDENT_LEARNING_GUIDES = {
    exp2: {
        experimentId: 'exp2',
        title: 'No-Load & Blocked Rotor Tests on 3-Phase Induction Motor (Circle Diagram)',
        aim: 'To determine the equivalent circuit parameters (R₁, X₁, R₂\', X₂\', R_c, X_m) and construct the Circle Diagram to predict full-load current, power factor, slip, torque, efficiency, and maximum output without loading the machine mechanically.',
        circuitExplanation: 'Two wattmeters measure 3-phase power. An auto-transformer adjusts the voltage. For no-load, full 415 V is applied with free shaft. For blocked-rotor, a mechanical clamp locks the rotor completely while low voltage (114 V) is injected so only rated current (4.7 A) flows.',
        operatingPrinciple: 'Similar to transformer open-circuit and short-circuit tests. At no load (slip s ≈ 0), the rotor branch looks like an open circuit, isolating the magnetizing branch (Rc, Xm). When blocked (s = 1), the rotor branch dominates, isolating the series leakage impedance (R₀₁, X₀₁).',
        keyFormulas: [
            {
                name: 'No-Load Power Factor',
                latex: '\\cos\\phi_0 = \\frac{W_0}{\\sqrt{3} V_0 I_0}',
                variables: [
                    { symbol: 'W₀', meaning: 'Total 3-phase no-load power', unit: 'Watts' },
                    { symbol: 'V₀', meaning: 'Rated line-to-line stator voltage', unit: 'Volts' },
                    { symbol: 'I₀', meaning: 'No-load line current', unit: 'Amperes' }
                ]
            },
            {
                name: 'Short-Circuit Equivalent Impedance',
                latex: 'Z_{01} = \\frac{V_{sc}}{\\sqrt{3} I_{sc}}, \\quad R_{01} = \\frac{W_{sc}}{3 I_{sc}^2}, \\quad X_{01} = \\sqrt{Z_{01}^2 - R_{01}^2}',
                variables: [
                    { symbol: 'V_sc', meaning: 'Short-circuit voltage per line', unit: 'Volts' },
                    { symbol: 'I_sc', meaning: 'Rated blocked-rotor line current', unit: 'Amperes' },
                    { symbol: 'W_sc', meaning: 'Short-circuit power', unit: 'Watts' }
                ]
            },
            {
                name: 'Rotor Resistance referred to Stator',
                latex: 'R_2\' = R_{01} - R_1',
                variables: [
                    { symbol: 'R_1', meaning: 'Stator effective AC resistance per phase', unit: 'Ohms' },
                    { symbol: 'R_2\'', meaning: 'Referred rotor resistance', unit: 'Ohms' }
                ]
            }
        ],
        stepByStepProcedure: [
            'Ensure the variac (auto-transformer) is at zero position before turning ON the 3-phase supply.',
            'No-Load Test: Leave the motor shaft completely uncoupled and free to rotate. Gradually increase the variac to rated 415 V. Record V₀, I₀, and both wattmeter readings (W₁ and W₂).',
            'Blocked Rotor Test: Firmly tighten the mechanical brake belt clamp to lock the rotor shaft securely. Slowly apply low voltage until the ammeter indicates rated motor current (4.7 A). Take readings swiftly (within 30 seconds) to prevent winding overheating.',
            'Measure stator resistance by applying small DC voltage across two stator terminals and recording V_dc and I_dc.',
            'Construct the Circle Diagram by drawing the reference voltage vector V on the Y-axis and plotting no-load current I₀ and short-circuit current I_sc.'
        ],
        safetyPrecautions: [
            'Never touch the rotor belt while power is ON.',
            'During the blocked-rotor test, do not keep the supply ON for more than 45 seconds; high current heats the rotor bars quickly.',
            'Always start the auto-transformer from zero output to prevent massive inrush currents.'
        ],
        vivaVoce: [
            {
                question: 'Why is the power factor of an induction motor very low (0.1 to 0.2) at no load?',
                answer: 'Because the air gap requires a substantial magnetizing current to establish the rotating magnetic field, which is almost 90° lagging behind the voltage vector.',
                conceptCategory: 'Theory'
            },
            {
                question: 'What is the purpose of drawing the Circle Diagram?',
                answer: 'The circle diagram allows graphical determination of complete motor performance (torque, slip, efficiency, power factor, maximum torque/breakdown torque) at any load without physically loading the machine.',
                conceptCategory: 'Applications'
            },
            {
                question: 'Why do we multiply the DC measured resistance by 1.2 to 1.5 to get AC resistance?',
                answer: 'To account for the Skin Effect and eddy currents in the stator copper conductors at 50 Hz, which forces the current to flow near the conductor surface, decreasing effective cross-section.',
                conceptCategory: 'Measurement'
            }
        ]
    },
    exp3: {
        experimentId: 'exp3',
        title: 'Speed Control of 3-Phase Induction Motor',
        aim: 'To control and analyze the speed of an induction motor using three classic methods: (1) Pole Changing (Dahlander switch), (2) Stator Voltage Variation, and (3) Rotor Resistance Insertion in slip-ring motor.',
        circuitExplanation: 'For pole changing, stator coils are reconfigured between series and parallel groupings to toggle between 2, 4, and 6 poles. For stator voltage, a 3φ variac alters V. For rotor resistance, external rheostats are inserted into the rotor via slip rings.',
        operatingPrinciple: 'Synchronous speed is Ns = 120f / P. Changing P provides step changes in synchronous speed. Changing stator voltage reduces developed torque (T ∝ V²), forcing the motor to operate at higher slip for a given load torque. Adding rotor resistance shifts maximum torque to higher slip speeds.',
        keyFormulas: [
            {
                name: 'Synchronous Speed Formula',
                latex: 'N_s = \\frac{120 \\cdot f}{P}',
                variables: [
                    { symbol: 'f', meaning: 'Supply frequency (50 Hz)', unit: 'Hz' },
                    { symbol: 'P', meaning: 'Number of magnetic poles (2, 4, 6, 8)', unit: '-' }
                ]
            },
            {
                name: 'Torque-Voltage Proportionality',
                latex: 'T_d \\propto s \\cdot \\frac{V^2}{R_2}',
                variables: [
                    { symbol: 'V', meaning: 'Stator terminal voltage', unit: 'Volts' },
                    { symbol: 's', meaning: 'Rotor operating slip', unit: '-' }
                ]
            }
        ],
        stepByStepProcedure: [
            'Pole Changing: Configure the stator winding selector to 6 poles, 4 poles, and 2 poles. Record the steady-state no-load speed with an optical tachometer.',
            'Stator Voltage Control: Keep poles fixed at 4. Vary the auto-transformer from 20% (83 V) up to 100% (415 V) in steps. Record no-load speed and speed under 25% load.',
            'Rotor Resistance Control: Connect a 3-phase ganged rheostat to the slip-ring terminals. Starting with maximum resistance, gradually decrease resistance while recording rotor voltage, current, and shaft speed.'
        ],
        safetyPrecautions: [
            'Do not switch pole configuration while the motor is running at full speed.',
            'Ensure the external rotor rheostat is set to maximum resistance before starting the slip-ring motor.'
        ],
        vivaVoce: [
            {
                question: 'Why is stator voltage control not suitable for wide speed variation in squirrel cage motors?',
                answer: 'Because torque drops as the square of voltage (V²). At reduced voltages, the motor draws higher currents to satisfy load torque, leading to excessive stator heating and poor efficiency.',
                conceptCategory: 'Theory'
            },
            {
                question: 'Can rotor resistance control be applied to squirrel-cage induction motors?',
                answer: 'No. Squirrel cage rotors have end-rings short-circuiting all bars permanently; external resistances can only be introduced via slip rings in wound-rotor induction motors.',
                conceptCategory: 'Applications'
            }
        ]
    },
    exp5: {
        experimentId: 'exp5',
        title: 'Direct Load Test on Three-Phase Alternator',
        aim: 'To determine the terminal voltage regulation and electrical efficiency of a 3-phase synchronous alternator under direct resistive loading.',
        circuitExplanation: 'A DC shunt motor serves as prime mover to spin the alternator at rated 1500 RPM. DC field winding is excited until terminal line voltage reaches rated 415 V. A 3-phase lamp load bank is loaded step-by-step.',
        operatingPrinciple: 'When load current flows in the armature, three voltage drops occur: armature resistance drop (I·Ra), leakage reactance drop (I·Xl), and armature reaction drop. For a unity power factor resistive load, cross-magnetizing armature reaction reduces and distorts the main flux, causing terminal voltage to decrease as load increases.',
        keyFormulas: [
            {
                name: 'Percentage Voltage Regulation',
                latex: '\\% \\text{Regulation} = \\frac{E_0 - V_t}{E_0} \\times 100\\%',
                variables: [
                    { symbol: 'E₀', meaning: 'No-load terminal line voltage (415 V)', unit: 'Volts' },
                    { symbol: 'V_t', meaning: 'Full-load or given load terminal line voltage', unit: 'Volts' }
                ]
            },
            {
                name: 'Three-Phase Active Output Power',
                latex: 'P_o = \\sqrt{3} \\cdot V_t \\cdot I_L \\cdot \\cos\\phi',
                variables: [
                    { symbol: 'V_t', meaning: 'Terminal line voltage', unit: 'Volts' },
                    { symbol: 'I_L', meaning: 'Armature line current', unit: 'Amperes' },
                    { symbol: 'cos φ', meaning: 'Load power factor (1.0 for resistive)', unit: '-' }
                ]
            }
        ],
        stepByStepProcedure: [
            'Start the DC prime mover and adjust its field rheostat until speed reaches exactly 1500 RPM (synchronous speed for 4-pole, 50 Hz).',
            'Switch ON the DC excitation supply to the alternator field. Adjust field rheostat until open-circuit line voltage is exactly 415 V.',
            'Switch ON the 3-phase resistive load bank step by step (1 A, 2 A, up to rated 4.8 A and 6.8 A).',
            'At every load step, verify speed remains 1500 RPM; read field current, line voltage, and load current.',
            'Gradually switch OFF the load steps, decrease excitation, and shut down prime mover.'
        ],
        safetyPrecautions: [
            'Never open-circuit the DC field winding of the alternator while high current is flowing; dangerous high-voltage inductive kicks can occur.',
            'Ensure the neutral terminal is securely grounded.'
        ],
        vivaVoce: [
            {
                question: 'What is voltage regulation of an alternator and why is it important?',
                answer: 'It is the percentage change in terminal voltage when rated load at a given power factor is reduced to zero, with speed and field current remaining constant. Low regulation is desired for stable grid voltages.',
                conceptCategory: 'Theory'
            },
            {
                question: 'Why does direct load test become impractical for large alternators (e.g. 50 MVA)?',
                answer: 'Because huge loads are not available in a laboratory to dissipate full electrical power, and the energy cost and prime mover size would be prohibitive.',
                conceptCategory: 'Applications'
            }
        ]
    },
    exp6_a: {
        experimentId: 'exp6_a',
        title: 'Regulation of Alternator by EMF & MMF Methods (OCC & SCC Tests)',
        aim: 'To predetermine the voltage regulation of a non-salient pole alternator at various power factors (lagging, unity, leading) using Synchronous Impedance (EMF) and Ampere-Turn (MMF) methods.',
        circuitExplanation: 'The alternator is driven at 1500 RPM. For OCC, armature is open and open-circuit voltage is recorded against field current. For SCC, armature terminals are shorted through ammeters and field current required for rated short-circuit current is measured.',
        operatingPrinciple: 'Synchronous impedance Zs = E₀(ph) / I_sc(ph) for the same field excitation. The EMF method treats all armature reaction effects as fictitious reactance drops (Xs), giving higher (pessimistic) regulation values. The MMF method treats both leakage reactance and armature reaction as MMF vectors, giving optimistic regulation values.',
        keyFormulas: [
            {
                name: 'Synchronous Impedance & Reactance',
                latex: 'Z_s = \\frac{E_{0(ph)}}{I_{sc(ph)}}, \\quad X_s = \\sqrt{Z_s^2 - R_a^2}',
                variables: [
                    { symbol: 'E₀(ph)', meaning: 'Open-circuit phase voltage at given If', unit: 'Volts' },
                    { symbol: 'I_sc(ph)', meaning: 'Short-circuit phase current at same If', unit: 'Amperes' },
                    { symbol: 'Ra', meaning: 'Armature effective resistance per phase', unit: 'Ohms' }
                ]
            },
            {
                name: 'No-Load Induced EMF by EMF Method',
                latex: 'E_0 = \\sqrt{(V \\cos\\phi + I R_a)^2 + (V \\sin\\phi \\pm I X_s)^2}',
                variables: [
                    { symbol: '+ sign', meaning: 'Used for lagging power factor', unit: '-' },
                    { symbol: '- sign', meaning: 'Used for leading power factor', unit: '-' }
                ]
            }
        ],
        stepByStepProcedure: [
            'Drive alternator at 1500 RPM using DC shunt motor.',
            'OCC Test: Keep armature switch open. Vary field excitation from 0 up to 1.09 A. Record terminal line voltage at each step until saturation is observed.',
            'SCC Test: Set field rheostat to maximum resistance. Close the 3-phase shorting link across armature terminals with ammeters connected. Gradually increase field current until rated current (4.3 - 4.8 A) flows.',
            'Measure armature resistance per phase by DC drop method.',
            'Calculate Zs and Xs, then compute regulation for 0.8 lag, UPF, and 0.8 lead.'
        ],
        safetyPrecautions: [
            'Always start SCC with field rheostat at MAXIMUM resistance (minimum excitation) to prevent sudden burnout of armature windings.',
            'Never disconnect meters while under short-circuit.'
        ],
        vivaVoce: [
            {
                question: 'Why is the EMF method called the pessimistic method?',
                answer: 'Because Zs is determined using the unsaturated region of the OCC. Under actual loaded conditions, the magnetic core saturates, so actual voltage drop is smaller than predicted by the EMF method.',
                conceptCategory: 'Theory'
            },
            {
                question: 'Can voltage regulation of an alternator ever be negative?',
                answer: 'Yes! At leading power factor loads (capacitive loads), the armature reaction is magnetizing, boosting the terminal voltage on load, making (E₀ - V) negative.',
                conceptCategory: 'Theory'
            }
        ]
    },
    exp6_b: {
        experimentId: 'exp6_b',
        title: 'Load Test on Induction Generator',
        aim: 'To conduct a load test on an isolated 3-phase induction generator driven super-synchronously (N > Ns) and investigate efficiency, power factor, line current, and negative slip characteristics.',
        circuitExplanation: 'An induction machine is mechanically coupled to a DC shunt motor prime mover. A delta-connected capacitor bank is connected across the induction machine stator terminals to supply required magnetizing reactive power (VARs). A 3-phase resistive load is connected in parallel.',
        operatingPrinciple: 'An induction motor becomes an induction generator when its rotor is driven above synchronous speed (s < 0). It cannot generate its own reactive power, so the external capacitor bank provides the leading reactive current to maintain stator flux. Mechanical power is converted into AC electrical output.',
        keyFormulas: [
            {
                name: 'Negative Operating Slip',
                latex: 's = \\frac{N_s - N}{N_s} \\times 100\\%',
                variables: [
                    { symbol: 'Ns', meaning: 'Synchronous speed (1494 - 1500 RPM)', unit: 'RPM' },
                    { symbol: 'N', meaning: 'Rotor shaft speed (> 1500 RPM)', unit: 'RPM' }
                ]
            },
            {
                name: 'Minimum Excitation Capacitance',
                latex: 'C_{ph} \\ge \\frac{I_m}{2\\pi f V_{ph}}',
                variables: [
                    { symbol: 'Im', meaning: 'Magnetizing current per phase', unit: 'Amperes' },
                    { symbol: 'Vph', meaning: 'Rated phase voltage', unit: 'Volts' }
                ]
            }
        ],
        stepByStepProcedure: [
            'Connect the delta capacitor bank across the stator terminals.',
            'Start the DC motor prime mover and increase speed past synchronous speed (1503 to 1528 RPM).',
            'Observe terminal voltage building up due to residual magnetism and capacitive resonance.',
            'Apply 3-phase electrical load in increments. Record Vac, Iac, Pac, Vdc, Idc, and shaft speed N.',
            'Compute negative slip, DC electrical input, AC electrical output, and efficiency.'
        ],
        safetyPrecautions: [
            'Ensure the capacitors are discharged using a discharge resistor before touching terminals after the experiment.',
            'Do not exceed maximum safe overspeed of the motor.'
        ],
        vivaVoce: [
            {
                question: 'What happens if the capacitor bank is too small?',
                answer: 'The machine fails to self-excite because the capacitive reactive power is insufficient to overcome the magnetizing reactance of the core, and terminal voltage collapses to zero.',
                conceptCategory: 'Theory'
            },
            {
                question: 'What are the main advantages of an induction generator over a synchronous generator?',
                answer: 'Rugged construction (no slip rings or brushes for squirrel cage), no synchronization required, automatically drops excitation if the grid faults, making it ideal for wind turbines.',
                conceptCategory: 'Applications'
            }
        ]
    },
    exp7: {
        experimentId: 'exp7',
        title: 'Regulation of Alternator by ZPF / Potier Triangle Method',
        aim: 'To predetermine the accurate voltage regulation of an alternator by separating armature leakage reactance (Xl) and armature reaction MMF (Fa) using the Potier Triangle method.',
        circuitExplanation: 'Two characteristics are plotted: the Open Circuit Characteristic (OCC) and the Zero Power Factor Characteristic (ZPFC). A pure inductive load is applied to obtain the rated ZPF operating point (415 V, 6.94 A at If = 1.7 A).',
        operatingPrinciple: 'Under zero power factor lagging load, the armature reaction is purely demagnetizing and directly subtracts from the main field MMF. The Potier triangle (hypotenuse tangent to OCC knee) isolates the leakage reactance voltage drop (vertical leg) and the armature reaction MMF in equivalent field amperes (horizontal leg).',
        keyFormulas: [
            {
                name: 'Potier Leakage Reactance Drop',
                latex: 'X_l = \\frac{\\text{Vertical leg of Potier Triangle (Volts)}}{I_{a(\\text{rated})}}',
                variables: [
                    { symbol: 'Xl', meaning: 'Armature leakage reactance per phase', unit: 'Ohms' },
                    { symbol: 'Ia', meaning: 'Rated armature current per phase', unit: 'Amperes' }
                ]
            },
            {
                name: 'Vectorial Field Current Sum',
                latex: 'I_{f\\text{total}} = \\sqrt{I_{f1}^2 + F_a^2 - 2 I_{f1} F_a \\cos(90^\\circ + \\phi)}',
                variables: [
                    { symbol: 'If1', meaning: 'Field current to induce voltage behind leakage reactance', unit: 'Amperes' },
                    { symbol: 'Fa', meaning: 'Armature reaction MMF in equivalent field amperes', unit: 'Amperes' }
                ]
            }
        ],
        stepByStepProcedure: [
            'Plot the OCC curve from field current 0 to 0.8 A.',
            'Obtain the short-circuit point (terminal voltage = 0, rated current flows at If = 1.0 A).',
            'Apply a purely inductive load reactor to obtain the ZPF rated voltage point (V = 415 V at rated current).',
            'Draw the Potier triangle: draw horizontal line equal to short-circuit field current, draw hypotenuse parallel to OCC initial air-gap tangent.',
            'Measure vertical height for leakage reactance drop and horizontal base for armature reaction MMF.',
            'Pre-calculate regulation for power factors from 0 lag to 0 lead.'
        ],
        safetyPrecautions: [
            'Ensure the inductive choke coils do not overheat during ZPF loading.',
            'Handle high-voltage terminals with insulated tools.'
        ],
        vivaVoce: [
            {
                question: 'Why is the Potier method more accurate than EMF and MMF methods?',
                answer: 'Because it separates leakage reactance (which causes a physical voltage drop) from armature reaction (which alters core flux and MMF), and accounts for actual core saturation along the OCC.',
                conceptCategory: 'Theory'
            },
            {
                question: 'What is the nature of armature reaction in an alternator at zero power factor lagging?',
                answer: 'It is purely demagnetizing, directly weakening the main field flux along the direct axis.',
                conceptCategory: 'Theory'
            }
        ]
    },
    exp8: {
        experimentId: 'exp8',
        title: 'Alternator Connected to Infinite Bus Bar (Synchronization & V-Curves)',
        aim: 'To synchronize a 3-phase alternator to the infinite bus bar using the Three-Dark-Lamp method and plot V and Inverted-V curves at constant active power output.',
        circuitExplanation: 'Synchronizing lamps are connected across the triple-pole single-throw (TPST) synchronizing switch between alternator and grid busbar. Once synchronized and connected to the bus, varying field current alters reactive power and armature current without changing active power delivered.',
        operatingPrinciple: 'For synchronization, four conditions must be met: equal voltage magnitudes, equal frequencies, same phase sequence, and zero phase difference. On the busbar, decreasing field current causes under-excitation (lagging current, low power factor); increasing field current causes over-excitation (leading current). At unity power factor, armature current is minimum, producing the characteristic V shape.',
        keyFormulas: [
            {
                name: 'Alternator Power Equation on Infinite Bus',
                latex: 'P = \\frac{E V}{X_s} \\sin \\delta = \\text{Constant}',
                variables: [
                    { symbol: 'E', meaning: 'Excitation induced EMF per phase', unit: 'Volts' },
                    { symbol: 'V', meaning: 'Busbar voltage per phase', unit: 'Volts' },
                    { symbol: 'δ', meaning: 'Power angle / rotor angle', unit: 'Degrees' }
                ]
            },
            {
                name: 'Reactive Power Equation',
                latex: 'Q = \\frac{V}{X_s} (E \\cos \\delta - V)',
                variables: [
                    { symbol: 'Q > 0', meaning: 'Over-excited: delivers lagging VARs to busbar', unit: 'VAR' },
                    { symbol: 'Q < 0', meaning: 'Under-excited: absorbs lagging VARs from busbar', unit: 'VAR' }
                ]
            }
        ],
        stepByStepProcedure: [
            'Bring alternator up to synchronous speed (1500 RPM) using prime mover.',
            'Adjust alternator field current until its terminal voltage matches the infinite bus voltage (415 V).',
            'Observe the synchronizing lamps. If lamps flicker together slowly, phase sequence is correct. Adjust prime mover speed fine-trim until the flicker rate becomes extremely slow.',
            'At the exact instant when all three lamps are completely DARK (zero voltage across switch contacts), close the synchronizing TPST switch.',
            'With active power constant (wattmeter = 200 W), vary field excitation from 0.4 A to 2.1 A. Record armature current Ia and power factor.',
            'Plot Ia vs If (V-curve) and cos φ vs If (Inverted V-curve).'
        ],
        safetyPrecautions: [
            'NEVER close the synchronizing switch when lamps are bright or flickering rapidly; massive short-circuit currents will damage the generator shaft and trip circuit breakers.',
            'Always ensure voltmeter readings on both sides of the switch are identical before closing.'
        ],
        vivaVoce: [
            {
                question: 'What are the four essential conditions for paralleling an alternator with an infinite bus?',
                answer: '1. Terminal voltage magnitude must match bus voltage. 2. Alternator frequency must equal bus frequency. 3. Phase sequence (R-Y-B) must be identical. 4. Phase angles of corresponding phases must be in exact phase (zero voltage across switch).',
                conceptCategory: 'Theory'
            },
            {
                question: 'What happens if you over-excite a synchronous machine connected to the infinite bus?',
                answer: 'The machine delivers lagging reactive power (VARs) to the grid, operating at a leading power factor relative to the machine convention, acting as a synchronous condenser to support grid voltage.',
                conceptCategory: 'Applications'
            }
        ]
    }
};
//# sourceMappingURL=learningGuide.js.map