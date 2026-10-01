/**
 * Electromechanical Sound Synthesis Engine
 * Synthesizes realistic 50 Hz electrical hum, magnetic flux resonance,
 * and relay switching sounds using Web Audio API (Zero external assets required).
 */
class SoundEngine {
    ctx = null;
    motorOsc = null;
    motorGain = null;
    humOsc = null;
    humGain = null;
    isMuted = false;
    isRunning = false;
    init() {
        if (!this.ctx && typeof window !== 'undefined') {
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
        if (!this.ctx)
            return;
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        try {
            // 1. 50 Hz Stator Core Lamination Hum
            this.humOsc = this.ctx.createOscillator();
            this.humOsc.type = 'sawtooth';
            this.humOsc.frequency.setValueAtTime(50, this.ctx.currentTime);
            // Lowpass filter to muffle harsh harmonics
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(140, this.ctx.currentTime);
            this.humGain = this.ctx.createGain();
            this.humGain.gain.setValueAtTime(this.isMuted ? 0 : 0.025, this.ctx.currentTime);
            this.humOsc.connect(filter);
            filter.connect(this.humGain);
            this.humGain.connect(this.ctx.destination);
            this.humOsc.start();
            // 2. Rotor Rotational Harmonic (Frequency = P * N / 120)
            const rotorFreq = (4 * rpm) / 120; // ~48 - 50 Hz
            this.motorOsc = this.ctx.createOscillator();
            this.motorOsc.type = 'sine';
            this.motorOsc.frequency.setValueAtTime(rotorFreq, this.ctx.currentTime);
            this.motorGain = this.ctx.createGain();
            this.motorGain.gain.setValueAtTime(this.isMuted ? 0 : 0.035, this.ctx.currentTime);
            this.motorOsc.connect(this.motorGain);
            this.motorGain.connect(this.ctx.destination);
            this.motorOsc.start();
            this.isRunning = true;
        }
        catch (e) {
            // Autoplay or audio restrictions
            console.warn('AudioContext autoplay restricted:', e);
        }
    }
    updateRpm(rpm) {
        if (!this.ctx || !this.motorOsc)
            return;
        const freq = Math.max(10, (4 * rpm) / 120);
        this.motorOsc.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.1);
    }
    playRelayClick() {
        this.init();
        if (!this.ctx || this.isMuted)
            return;
        if (this.ctx.state === 'suspended')
            this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }
    stopAll() {
        if (this.motorOsc) {
            try {
                this.motorOsc.stop();
            }
            catch (_) { }
            this.motorOsc = null;
        }
        if (this.humOsc) {
            try {
                this.humOsc.stop();
            }
            catch (_) { }
            this.humOsc = null;
        }
        this.isRunning = false;
    }
}
export const soundEngine = new SoundEngine();
//# sourceMappingURL=soundEngine.js.map