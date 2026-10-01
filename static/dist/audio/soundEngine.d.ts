/**
 * Electromechanical Sound Synthesis Engine
 * Synthesizes realistic 50 Hz electrical hum, magnetic flux resonance,
 * and relay switching sounds using Web Audio API (Zero external assets required).
 */
declare class SoundEngine {
    private ctx;
    private motorOsc;
    private motorGain;
    private humOsc;
    private humGain;
    private isMuted;
    private isRunning;
    private init;
    toggleMute(): boolean;
    getMuteState(): boolean;
    startMachineHum(rpm?: number): void;
    updateRpm(rpm: number): void;
    playRelayClick(): void;
    stopAll(): void;
}
export declare const soundEngine: SoundEngine;
export {};
