/**
 * Electrical Machines Digital Twin — Client-Side Experiments & Laboratory Manager
 * Manages the full laboratory workflow: CONFIGURE -> CONNECT -> START -> OPERATE -> MEASURE -> RECORD -> ANALYZE -> GRAPH -> REPORT -> VIVA
 */

window.LabExperiments = (function() {
  const EXPERIMENTS = [
    {
      id: "exp_im_load",
      title: "Brake Load Test on 3-Phase Squirrel-Cage Induction Motor",
      machineType: "induction_motor",
      aim: "To determine operating efficiency, slip, power factor, and torque-speed characteristics under varying mechanical loads.",
      procedure: [
        "1. Verify mechanical brake drum turns freely without friction.",
        "2. Complete electrical wiring and close the main 3-phase circuit breaker.",
        "3. Apply rated voltage (415V, 50Hz) and observe no-load speed (approx 1495-1500 RPM).",
        "4. Gradually apply load torque via the brake dynamometer in steady increments.",
        "5. At each increment, record Voltage, Current, Power, Speed, and Spring Balances.",
        "6. Observe the causal feedback chain and plot Torque-Speed and Efficiency curves."
      ]
    },
    {
      id: "exp_alt_load",
      title: "Load Test and Voltage Regulation of 3-Phase Alternator",
      machineType: "synchronous_alternator",
      aim: "To measure terminal voltage variations, phasor displacement, and percentage regulation under lagging, unity, and leading power factors.",
      procedure: [
        "1. Couple prime mover and adjust speed strictly to synchronous speed (1500 RPM).",
        "2. Energize DC field excitation circuit to establish rated open-circuit voltage.",
        "3. Switch on balanced 3-phase load banks and record terminal voltage drop/rise."
      ]
    },
    {
      id: "exp_dc_shunt",
      title: "Load Characteristics of DC Shunt Motor",
      machineType: "dc_shunt_motor",
      aim: "To observe speed regulation and back-EMF behavior under increasing mechanical torque.",
      procedure: [
        "1. Check field rheostat is in minimum resistance position for maximum starting flux.",
        "2. Start motor with 3-point starter and adjust to 1500 RPM rated speed.",
        "3. Apply brake load and measure armature current increase and speed droop."
      ]
    }
  ];

  class ObservationLogger {
    constructor(expId, machineSnapshot) {
      this.expId = expId;
      this.machineSnapshot = machineSnapshot || {};
      this.observations = [];
      this.runId = "RUN-" + Date.now();
    }

    record(reading) {
      const row = {
        index: this.observations.length + 1,
        time: new Date().toLocaleTimeString(),
        ...reading
      };
      this.observations.push(row);
      return row;
    }

    clear() {
      this.observations = [];
    }

    exportCSV() {
      if (this.observations.length === 0) return "";
      const headers = Object.keys(this.observations[0]);
      const csvRows = [headers.join(",")];
      for (const row of this.observations) {
        csvRows.push(headers.map(h => row[h]).join(","));
      }
      return csvRows.join("\n");
    }

    exportJSON() {
      return JSON.stringify({
        runId: this.runId,
        experimentId: this.expId,
        machineConfig: this.machineSnapshot,
        observations: this.observations
      }, null, 2);
    }
  }

  function validateWiring(machineConfig, switches) {
    const errors = [];
    const warnings = [];

    if (!switches.mainBreaker) {
      errors.push("Current path is incomplete: Main 3-Phase Circuit Breaker (MCB) is OPEN.");
    }
    if (machineConfig.type === "synchronous_alternator" && !switches.fieldExciter) {
      errors.push("Alternator excitation disconnected: Close DC Field Exciter switch to generate magnetic flux.");
    }
    if (machineConfig.type === "dc_shunt_motor" && switches.fieldOpen) {
      errors.push("CRITICAL HAZARD: DC Shunt field circuit is OPEN! Starting without field causes dangerous overspeed runaway.");
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  return {
    EXPERIMENTS,
    ObservationLogger,
    validateWiring
  };
})();
