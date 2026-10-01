/**
 * Technical Datasheet Modal Component
 * Displays authorized nameplate ratings and impedance parameters for Semester-5 machines.
 */

import React, { useState } from 'react';

interface DatasheetModalProps {
  onClose: () => void;
}

export const DatasheetModal: React.FC<DatasheetModalProps> = ({ onClose }) => {
  const [selectedMachine, setSelectedMachine] = useState<'motor' | 'alternator' | 'dc_prime'>('motor');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-yellow-500/40 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center border border-yellow-500/40">
              <i className="fa-solid fa-microchip"></i>
            </div>
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Laboratory Machine Technical Datasheets
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Semester-5 Verified Machine Nameplate Ratings
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Machine Selector Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 p-2 gap-2">
          {[
            { id: 'motor', label: '3φ Induction Motor (2.2 kW)' },
            { id: 'alternator', label: '3φ Synchronous Alternator (3.5 kVA)' },
            { id: 'dc_prime', label: 'DC Shunt Prime Mover (220 V)' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMachine(m.id as any)}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                selectedMachine === m.id
                  ? 'bg-yellow-500 text-slate-950 shadow-md shadow-yellow-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[65vh] space-y-4">
          {selectedMachine === 'motor' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                  Nameplate Ratings: Kirloskar Electric KE-IM2.2
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Rated Output Power:</span>
                    <span className="text-slate-200 font-bold">2.2 kW (3.0 HP)</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Rated Stator Voltage:</span>
                    <span className="text-slate-200 font-bold">415 V (Delta Connected)</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Rated Full-Load Current:</span>
                    <span className="text-slate-200 font-bold">4.7 A</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Synchronous Speed:</span>
                    <span className="text-slate-200 font-bold">1500 RPM (4-pole, 50 Hz)</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Full-Load Rated Speed:</span>
                    <span className="text-slate-200 font-bold">1440 RPM (s = 4.0%)</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Class of Insulation:</span>
                    <span className="text-slate-200 font-bold">Class B (130°C rise)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Measured Equivalent Circuit Parameters (Exp 2 Circle Diagram)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Stator Resistance R1:</span>
                    <span className="text-yellow-400 font-bold">7.90 Ω (3.95 Ω/ph)</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Referred Rotor R2':</span>
                    <span className="text-yellow-400 font-bold">1.96 Ω / phase</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Leakage Reactance X1+X2':</span>
                    <span className="text-yellow-400 font-bold">13.43 Ω / phase</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Magnetizing Reactance Xm:</span>
                    <span className="text-yellow-400 font-bold">160.4 Ω</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMachine === 'alternator' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                  Nameplate Ratings: Crompton Greaves CG-SA3.5
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Rated Apparent Power:</span>
                    <span className="text-slate-200 font-bold">3.5 kVA</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Rated Armature Voltage:</span>
                    <span className="text-slate-200 font-bold">415 V (Star Connected)</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Rated Armature Current:</span>
                    <span className="text-slate-200 font-bold">4.87 A</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Rated Synchronous Speed:</span>
                    <span className="text-slate-200 font-bold">1500 RPM (4-pole, 50 Hz)</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">DC Field Voltage / Current:</span>
                    <span className="text-slate-200 font-bold">110-220 V DC / 1.8 A max</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Power Factor:</span>
                    <span className="text-slate-200 font-bold">0.8 Lagging Standard</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Internal Impedance Parameters (Exp 6A & Exp 7)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Armature Resistance Ra:</span>
                    <span className="text-yellow-400 font-bold">2.415 Ω / phase</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Synchronous Impedance Zs:</span>
                    <span className="text-yellow-400 font-bold">28.19 Ω / phase</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Leakage Reactance Xl:</span>
                    <span className="text-yellow-400 font-bold">6.08 Ω (Potier method)</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Armature Reaction MMF Fa:</span>
                    <span className="text-yellow-400 font-bold">0.32 A (field equivalent)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMachine === 'dc_prime' && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                Nameplate Ratings: DC Shunt Prime Mover Motor
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Rated Voltage:</span>
                  <span className="text-slate-200 font-bold">220 V DC</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Rated Armature Current:</span>
                  <span className="text-slate-200 font-bold">14.0 A</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Rated Base Speed:</span>
                  <span className="text-slate-200 font-bold">1500 RPM</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Field Resistance Rf:</span>
                  <span className="text-slate-200 font-bold">185 Ω</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Armature Resistance Ra:</span>
                  <span className="text-slate-200 font-bold">1.8 Ω</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Coupling:</span>
                  <span className="text-slate-200 font-bold">Rigid Flanged Coupling</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg transition-all"
          >
            Close Datasheet
          </button>
        </div>

      </div>
    </div>
  );
};
