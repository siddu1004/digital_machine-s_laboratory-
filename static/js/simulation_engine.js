/**
 * Electrical Machines Digital Twin — Client-Side Deterministic Simulation Engine
 * Runs at a steady tick rate, calculates state transitions, checks protection trip thresholds,
 * and publishes telemetry to an event stream.
 */

window.SimulationEngine = (function() {
  class TwinSimulation {
    constructor(machineConfig) {
      this.config = machineConfig || {};
      this.state = "OFF"; // OFF, IDLE, STARTING, RUNNING, LOADED, OVERLOADED, FAULT, EMERGENCY_STOP, COOLING
      this.appliedVoltage = 415.0;
      this.appliedFrequency = 50.0;
      this.loadTorque = 0.0;
      this.windingTemp = 25.0;
      this.ambientTemp = 25.0;
      this.protectionTripped = false;
      this.tripReason = "";
      this.activeFaults = {};
      this.incidentHistory = [];
      this.telemetryBuffer = [];
      this.maxBufferSize = 200;
      this.causalChain = [];
      this.listeners = [];
    }

    start() {
      if (this.protectionTripped) return false;
      if (this.state === "OFF") {
        this.state = "RUNNING";
        return true;
      }
      return false;
    }

    stop() {
      this.state = "OFF";
      return true;
    }

    emergencyStop() {
      this.state = "EMERGENCY_STOP";
      this.protectionTripped = true;
      this.tripReason = "EMERGENCY STOP BUTTON ENGAGED";
      this._logIncident("Emergency Stop", 0, 0, "TRIP");
      return true;
    }

    resetProtection() {
      this.activeFaults = {};
      this.protectionTripped = false;
      this.tripReason = "";
      if (this.state === "FAULT" || this.state === "EMERGENCY_STOP") {
        this.state = "OFF";
      }
      return true;
    }

    setLoadTorque(torque) {
      const old = this.loadTorque;
      this.loadTorque = Math.max(0.0, Number(torque));
      const diff = this.loadTorque - old;
      if (Math.abs(diff) > 0.05) {
        const dir = diff > 0 ? "increased" : "decreased";
        const opp = diff > 0 ? "decreased" : "increased";
        this.causalChain = [
          `Load torque ${dir} to ${this.loadTorque.toFixed(2)} Nm`,
          `Rotor mechanical torque deficit; rotor speed ${opp}`,
          `Relative field cutting speed changed; slip ${dir}`,
          `Rotor induced frequency fr = s*f and rotor EMF ${dir}`,
          `Stator phase currents ${dir} to counter rotor demagnetization`,
          `Stator & Rotor copper losses (I²R) ${dir}`,
          `Thermal winding heating rate altered towards new steady-state`
        ];
      }
    }

    setVoltage(v) {
      this.appliedVoltage = Math.max(0.0, Number(v));
    }

    injectFault(faultType, severity = 1.0) {
      this.activeFaults[faultType] = { active: true, severity, time: Date.now() };
    }

    clearFault(faultType) {
      delete this.activeFaults[faultType];
    }

    step() {
      if (this.state === "OFF" || this.state === "FAULT" || this.state === "EMERGENCY_STOP") {
        this.windingTemp += (this.ambientTemp - this.windingTemp) * 0.05;
        const offTelemetry = {
          timestamp: Date.now(),
          state: this.state,
          v_line: 0.0,
          i_line: 0.0,
          speed_rpm: 0.0,
          slip: 0.0,
          torque_nm: 0.0,
          power_in_w: 0.0,
          power_out_w: 0.0,
          power_factor: 1.0,
          efficiency_pct: 0.0,
          winding_temp_c: Number(this.windingTemp.toFixed(1)),
          protection_tripped: this.protectionTripped,
          trip_reason: this.tripReason
        };
        this._buffer(offTelemetry);
        return offTelemetry;
      }

      // Check load state
      const ratedTorque = (this.config.identity && this.config.identity.rated_torque_nm) || 24.7;
      if (this.loadTorque > ratedTorque * 1.15) {
        this.state = "OVERLOADED";
      } else if (this.loadTorque > 0.5) {
        this.state = "LOADED";
      } else {
        this.state = "RUNNING";
      }

      // Physics calculation (Induction motor equivalent circuit)
      const p = (this.config.parameters) || {};
      const r1 = p.r1 || 1.5;
      const x1 = p.x1 || 3.5;
      const rc = p.rc || 500.0;
      const xm = p.xm || 80.0;
      const r2_prime = p.r2_prime || 1.8;
      const x2_prime = p.x2_prime || 3.5;
      const p_rot = p.p_rot || 100.0;
      const poles = (this.config.identity && this.config.identity.poles) || 4;

      // Estimate operating slip for load torque
      let s = 0.005 + (this.loadTorque / ratedTorque) * 0.045;
      if (this.activeFaults["locked_rotor"]) s = 1.0;

      let phys = window.MachinePhysics.solveInductionMotor(
        this.appliedVoltage, this.appliedFrequency, s,
        r1, x1, rc, xm, r2_prime, x2_prime, p_rot, poles
      );

      // Fault injections influence physics
      if (this.activeFaults["short_circuit"]) {
        phys.i_line *= 4.5;
      }
      if (this.activeFaults["cooling_failure"]) {
        this.windingTemp += 1.8;
      }

      // Thermal dynamics
      const targetTemp = this.ambientTemp + phys.total_losses * 0.045;
      this.windingTemp += (targetTemp - this.windingTemp) * 0.05;

      const telemetry = {
        timestamp: Date.now(),
        state: this.state,
        v_line: Number(this.appliedVoltage.toFixed(1)),
        i_line: Number(phys.i_line.toFixed(2)),
        speed_rpm: Number(phys.speed_rpm.toFixed(1)),
        ns_rpm: Number(phys.ns_rpm.toFixed(1)),
        slip: Number(phys.slip.toFixed(4)),
        torque_nm: Number(this.loadTorque.toFixed(2)),
        power_in_w: Number(phys.p_in.toFixed(1)),
        power_out_w: Number(phys.p_out.toFixed(1)),
        power_factor: Number(phys.pf.toFixed(3)),
        efficiency_pct: Number(phys.efficiency.toFixed(1)),
        stator_cu_loss: Number(phys.p_s_cu.toFixed(1)),
        rotor_cu_loss: Number(phys.p_r_cu.toFixed(1)),
        core_loss: Number(phys.p_core.toFixed(1)),
        winding_temp_c: Number(this.windingTemp.toFixed(1)),
        protection_tripped: this.protectionTripped,
        trip_reason: this.tripReason
      };

      // Protection evaluation
      this._evaluateProtection(telemetry);

      this._buffer(telemetry);
      return telemetry;
    }

    _evaluateProtection(telem) {
      if (this.protectionTripped) return;

      const maxCurrent = (this.config.limits && this.config.limits.overload_trip_current) || 9.5;
      const maxTemp = (this.config.limits && this.config.limits.max_temp_c) || 125.0;

      if (telem.i_line >= 22.0 || this.activeFaults["short_circuit"]) {
        this.protectionTripped = true;
        this.tripReason = `INSTANTANEOUS OVERCURRENT TRIP (I = ${telem.i_line} A)`;
        this.state = "FAULT";
        this._logIncident("Short Circuit", telem.i_line, 22.0, "TRIP");
      } else if (telem.winding_temp_c >= maxTemp || this.activeFaults["excessive_temperature"]) {
        this.protectionTripped = true;
        this.tripReason = `THERMAL OVERLOAD TRIP (Temp = ${telem.winding_temp_c} °C >= ${maxTemp} °C)`;
        this.state = "FAULT";
        this._logIncident("Thermal Overload", telem.winding_temp_c, maxTemp, "TRIP");
      } else if (telem.i_line >= maxCurrent && this.state === "OVERLOADED") {
        this.protectionTripped = true;
        this.tripReason = `SUSTAINED OVERLOAD TRIP (I = ${telem.i_line} A >= ${maxCurrent} A)`;
        this.state = "FAULT";
        this._logIncident("Overload Current", telem.i_line, maxCurrent, "TRIP");
      }
    }

    _logIncident(name, val, thresh, action) {
      const rec = {
        time: new Date().toLocaleTimeString(),
        fault: name,
        measured: Number(val).toFixed(1),
        threshold: Number(thresh).toFixed(1),
        action: action
      };
      this.incidentHistory.unshift(rec);
      if (this.incidentHistory.length > 50) this.incidentHistory.pop();
    }

    _buffer(t) {
      this.telemetryBuffer.push(t);
      if (this.telemetryBuffer.length > this.maxBufferSize) {
        this.telemetryBuffer.shift();
      }
      this.listeners.forEach(fn => fn(t));
    }

    onTelemetry(fn) {
      this.listeners.push(fn);
    }
  }

  return {
    TwinSimulation
  };
})();
