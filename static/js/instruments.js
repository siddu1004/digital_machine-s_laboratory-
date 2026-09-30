/**
 * Electrical Machines Digital Twin — Virtual Instruments Module (Client-Side)
 * Reads strictly from the active telemetry bus. Never creates detached random values.
 */

window.VirtualInstruments = (function() {
  class InstrumentPanel {
    constructor() {
      this.totalEnergyWh = 0.0;
    }

    readMeters(telem) {
      const v = telem.v_line || 0;
      const i = telem.i_line || 0;
      const p = telem.power_in_w || 0;
      const pf = telem.power_factor || 1.0;
      const speed = telem.speed_rpm || 0;
      const torque = telem.torque_nm || 0;
      const temp = telem.winding_temp_c || 25;

      // Energy integration (50ms interval)
      this.totalEnergyWh += (p * (0.05 / 3600.0));

      const s_va = Math.sqrt(3.0) * v * i;
      const q_var = Math.sqrt(Math.max(0.0, s_va * s_va - p * p));

      // Two-wattmeter readings: P = W1 + W2
      const phi = Math.acos(Math.min(1.0, Math.max(0.0, pf)));
      const w1 = (v * i / Math.sqrt(3.0)) * Math.cos((Math.PI / 6.0) - phi);
      const w2 = (v * i / Math.sqrt(3.0)) * Math.cos((Math.PI / 6.0) + phi);

      return {
        dmm: {
          voltage: v.toFixed(1),
          current: i.toFixed(2),
          frequency: v > 10 ? "50.0" : "0.0"
        },
        powerMeter: {
          activeKW: (p / 1000.0).toFixed(3),
          reactiveKVAR: (q_var / 1000.0).toFixed(3),
          apparentKVA: (s_va / 1000.0).toFixed(3),
          pf: pf.toFixed(3),
          w1: w1.toFixed(1),
          w2: w2.toFixed(1)
        },
        tachometer: {
          rpm: Math.round(speed),
          rad_s: ((2.0 * Math.PI * speed) / 60.0).toFixed(1)
        },
        torqueMeter: {
          torqueNm: torque.toFixed(2)
        },
        energyMeter: {
          wh: this.totalEnergyWh.toFixed(2),
          kwh: (this.totalEnergyWh / 1000.0).toFixed(4)
        },
        thermal: {
          tempC: temp.toFixed(1),
          status: temp > 120 ? "CRITICAL" : temp > 95 ? "WARNING" : "NORMAL"
        }
      };
    }

    sampleWaveforms(telem, numPoints = 80) {
      const v_rms = (telem.v_line || 0) / Math.sqrt(3.0);
      const i_rms = telem.i_line || 0;
      const pf = telem.power_factor || 0.85;
      const phi = Math.acos(Math.min(1.0, Math.max(-1.0, pf)));

      const v_peak = v_rms * Math.SQRT2;
      const i_peak = i_rms * Math.SQRT2;
      const f = 50.0;
      const t_max = 0.04; // 2 complete 50Hz cycles (40ms)

      const time_ms = [];
      const va = [];
      const vb = [];
      const vc = [];
      const ia = [];

      for (let idx = 0; idx < numPoints; idx++) {
        const t = (idx / (numPoints - 1)) * t_max;
        time_ms.push(Number((t * 1000).toFixed(1)));
        va.push(Number((v_peak * Math.sin(2 * Math.PI * f * t)).toFixed(1)));
        vb.push(Number((v_peak * Math.sin(2 * Math.PI * f * t - (2 * Math.PI / 3))).toFixed(1)));
        vc.push(Number((v_peak * Math.sin(2 * Math.PI * f * t + (2 * Math.PI / 3))).toFixed(1)));
        ia.push(Number((i_peak * Math.sin(2 * Math.PI * f * t - phi)).toFixed(2)));
      }

      return { time_ms, va, vb, vc, ia, phi_deg: Number(((phi * 180) / Math.PI).toFixed(1)) };
    }
  }

  return {
    InstrumentPanel
  };
})();
