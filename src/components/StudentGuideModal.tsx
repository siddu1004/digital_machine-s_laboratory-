/**
 * Student Guide & Viva Voce Modal Component
 * Renders complete syllabus guidelines, step-by-step procedures,
 * verified observation tables, model calculations, and viva questions.
 */

import React, { useState } from 'react';
import { ExperimentId } from '../types/experiments';
import { STUDENT_LEARNING_GUIDES } from '../data/learningGuide';
import { SEM5_OBSERVATIONS } from '../data/observations';

interface StudentGuideModalProps {
  experimentId: ExperimentId;
  onClose: () => void;
  onLaunchTwin: (expId: ExperimentId) => void;
}

export const StudentGuideModal: React.FC<StudentGuideModalProps> = ({
  experimentId,
  onClose,
  onLaunchTwin
}) => {
  const guide = STUDENT_LEARNING_GUIDES[experimentId];
  const observations = SEM5_OBSERVATIONS[experimentId];
  const [activeTab, setActiveTab] = useState<'theory' | 'procedure' | 'observations' | 'calculations' | 'viva' | 'philosophy'>('observations');
  const [vivaCategory, setVivaCategory] = useState<string>('all');

  if (!guide || !observations) return null;

  const filteredViva = vivaCategory === 'all'
    ? guide.vivaVoce
    : guide.vivaVoce.filter(v => v.conceptCategory.toLowerCase() === vivaCategory.toLowerCase());

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-indigo-500/40 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-fade-in text-slate-100">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 uppercase">
                {experimentId.toUpperCase()}
              </span>
              <span className="text-xs text-indigo-400 font-mono">SEMESTER-5 CURRICULUM</span>
            </div>
            <h2 className="text-base sm:text-xl font-bold tracking-tight text-white">
              {guide.title}
            </h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onLaunchTwin(experimentId)}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-lg shadow-yellow-500/20"
            >
              <i className="fa-solid fa-play mr-2"></i> Launch Digital Twin
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 sm:px-6 overflow-x-auto gap-2 py-2">
          {[
            { id: 'observations', label: 'Verified Observations', icon: 'fa-table' },
            { id: 'calculations', label: 'Model Calculations', icon: 'fa-calculator' },
            { id: 'procedure', label: 'Procedure & Safety', icon: 'fa-list-check' },
            { id: 'theory', label: 'Theory & Equations', icon: 'fa-book-open' },
            { id: 'philosophy', label: 'Philosopher & Math Lens', icon: 'fa-brain' },
            { id: 'viva', label: 'Viva Voce Bank', icon: 'fa-graduation-cap' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: VERIFIED OBSERVATIONS */}
          {activeTab === 'observations' && (
            <div className="space-y-6">
              <div className="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl text-xs text-indigo-300 flex items-start space-x-3">
                <i className="fa-solid fa-circle-check text-indigo-400 text-base mt-0.5"></i>
                <div>
                  <strong className="text-white">Authentic Laboratory Record Data:</strong> All values below are taken directly from the physical Semester-5 laboratory observation records and verified against standard apparatus calibration.
                </div>
              </div>

              {observations.tables.map((table, tIdx) => (
                <div key={table.id || tIdx} className="space-y-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-800 gap-1">
                    <h3 className="font-bold text-sm text-yellow-400 flex items-center">
                      <i className="fa-solid fa-table-list mr-2"></i>
                      {table.name}
                    </h3>
                    <span className="text-[11px] text-slate-400 italic">{table.description}</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-700 text-slate-300 font-mono">
                          <th className="py-2.5 px-3">#</th>
                          {table.columns.map((col) => (
                            <th key={col.key} className="py-2.5 px-3">
                              {col.label} {col.unit && <span className="text-slate-500 font-normal">({col.unit})</span>}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono">
                        {table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-indigo-950/20 transition-colors">
                            <td className="py-2 px-3 text-slate-500 font-bold">{row.slNo || rIdx + 1}</td>
                            {table.columns.map((col) => (
                              <td key={col.key} className={`py-2 px-3 ${col.isCalculated ? 'text-amber-300 font-semibold' : 'text-slate-300'}`}>
                                {row[col.key] !== undefined ? row[col.key] : '-'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {table.calculationsSummary && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80 bg-slate-900/60 p-3 rounded-lg space-y-1">
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Parameters & Inferences</h4>
                      <ul className="space-y-1 text-xs font-mono text-emerald-400">
                        {Object.entries(table.calculationsSummary).map(([key, val]) => (
                          <li key={key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-slate-400">{key}:</span>
                            <span className="text-yellow-400 font-bold">{String(val)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: MODEL CALCULATIONS */}
          {activeTab === 'calculations' && (
            <div className="space-y-6">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-indigo-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-yellow-400 flex items-center">
                    <i className="fa-solid fa-calculator mr-2 text-indigo-400"></i>
                    {observations.modelCalculations.title}
                  </h3>
                  <span className="text-xs bg-indigo-900/40 text-indigo-300 px-2.5 py-1 rounded border border-indigo-700/50">
                    Sample Set #{observations.modelCalculations.sampleSetIndex}
                  </span>
                </div>

                <div className="space-y-4">
                  {observations.modelCalculations.steps.map((step) => (
                    <div key={step.stepNumber} className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 space-y-2">
                      <div className="flex items-center space-x-2 text-xs font-bold text-indigo-300">
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                          {step.stepNumber}
                        </span>
                        <span>{step.description}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 font-mono text-xs">
                        <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                          <span className="text-[10px] text-slate-500 block uppercase">Formula:</span>
                          <span className="text-yellow-300 font-bold">{step.formula}</span>
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                          <span className="text-[10px] text-slate-500 block uppercase">Substitution:</span>
                          <span className="text-sky-300">{step.substitution}</span>
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded border border-emerald-500/40 bg-emerald-950/10">
                          <span className="text-[10px] text-emerald-400 block uppercase font-bold">Calculated Result:</span>
                          <span className="text-emerald-300 font-bold">{step.result}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Machine Nameplate Specifications */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Test Machine Specifications</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  {Object.entries(observations.machineNameplate).map(([key, val]) => (
                    <div key={key} className="bg-slate-900 p-2 rounded border border-slate-800">
                      <span className="text-[10px] text-slate-500 block capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-slate-200 font-bold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROCEDURE & SAFETY */}
          {activeTab === 'procedure' && (
            <div className="space-y-6">
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
                <h3 className="font-bold text-sm text-yellow-400 flex items-center">
                  <i className="fa-solid fa-list-ol mr-2 text-indigo-400"></i>
                  Standard Operating Procedure (SOP)
                </h3>
                <ol className="space-y-2.5 text-xs text-slate-300">
                  {guide.stepByStepProcedure.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                      <span className="font-bold text-indigo-400 font-mono text-sm">{idx + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-500/40 space-y-3">
                <h3 className="font-bold text-sm text-rose-400 flex items-center">
                  <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                  Crucial Safety Precautions
                </h3>
                <ul className="space-y-2 text-xs text-rose-200/90">
                  {guide.safetyPrecautions.map((precaution, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <i className="fa-solid fa-shield-halved text-rose-400 mt-0.5"></i>
                      <span>{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: THEORY & EQUATIONS */}
          {activeTab === 'theory' && (
            <div className="space-y-6">
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
                <h3 className="font-bold text-sm text-yellow-400">Aim of the Experiment</h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  {guide.aim}
                </p>

                <h3 className="font-bold text-sm text-sky-400 pt-2">Operating Principle</h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  {guide.operatingPrinciple}
                </p>

                <h3 className="font-bold text-sm text-indigo-400 pt-2">Circuit Explanation</h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  {guide.circuitExplanation}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-sm text-emerald-400">Governing Mathematical Formulas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {guide.keyFormulas.map((formula, fIdx) => (
                    <div key={fIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold text-yellow-400">{formula.name}</h4>
                      <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-xs text-emerald-300 font-bold border border-slate-800">
                        {formula.latex}
                      </div>
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Variables:</span>
                        <ul className="text-[11px] text-slate-400 space-y-0.5">
                          {formula.variables.map((v, vIdx) => (
                            <li key={vIdx} className="flex justify-between">
                              <span className="font-mono text-indigo-300">{v.symbol}:</span>
                              <span>{v.meaning} {v.unit && `(${v.unit})`}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VIVA VOCE BANK */}
          {activeTab === 'viva' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Key oral examination questions asked by lab examiners with authoritative model answers.
                </p>
                <div className="flex space-x-1.5">
                  {['all', 'Theory', 'Measurement', 'Applications'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setVivaCategory(cat)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                        vivaCategory === cat
                          ? 'bg-yellow-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredViva.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-yellow-400 flex items-center">
                        <i className="fa-solid fa-circle-question mr-2 text-indigo-400"></i>
                        Q: {item.question}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {item.conceptCategory}
                      </span>
                    </div>
                    <div className="pl-6 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                      <strong className="text-emerald-400 block mb-1">Answer:</strong>
                      {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PHILOSOPHER & MATHEMATICIAN LENS */}
          {activeTab === 'philosophy' && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="p-4 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-amber-950/20 border border-purple-500/30 rounded-xl flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/50 flex items-center justify-center text-purple-300 text-lg flex-shrink-0 mt-0.5">
                  <i className="fa-solid fa-atom"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Epistemology & Differential Symmetry Council
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-700/50">
                      Transcendent UI Lens
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Beyond numbers and meter dials lies an ontological order: rotating magnetic fields mirror celestial mechanics, and complex impedance loci manifest the conformal symmetry of physical law.
                  </p>
                </div>
              </div>

              {/* Two Column Grid: Mathematician vs Philosopher */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Mathematician Card: Dr. Gauss */}
                <div className="bg-slate-950/70 border border-indigo-500/30 rounded-xl p-5 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>
                  
                  <div className="flex items-center justify-between border-b border-indigo-900/50 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400 text-xs">
                        <i className="fa-solid fa-square-root-variable"></i>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-indigo-200">The Mathematician’s Structure</h4>
                        <span className="text-[10px] text-slate-400 font-mono">Agent: Dr. Carl Friedrich Gauss</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                      Φ = 1.618
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <div className="text-[10px] font-mono uppercase text-indigo-400 mb-1 font-semibold flex items-center gap-1.5">
                        <i className="fa-solid fa-shapes"></i> Symmetry Group & Invariance
                      </div>
                      <div className="text-xs font-mono text-slate-200">
                        {guide.mathematicalStructure?.symmetryGroup || 'Lie Group SO(2) rotational symmetry under 3-phase spatial coordinate projection'}
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <div className="text-[10px] font-mono uppercase text-cyan-400 mb-1 font-semibold flex items-center gap-1.5">
                        <i className="fa-solid fa-wave-square"></i> Governing Differential Equation
                      </div>
                      <div className="text-xs font-mono text-cyan-200 bg-slate-950 p-2.5 rounded border border-cyan-900/40 break-all leading-relaxed">
                        {guide.mathematicalStructure?.governingDifferentialEq || '∇ × E = -∂B/∂t, \\quad J = σ(E + v × B)'}
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <div className="text-[10px] font-mono uppercase text-amber-400 mb-1 font-semibold flex items-center gap-1.5">
                        <i className="fa-solid fa-circle-nodes"></i> Geometric Locus on Complex Plane
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed">
                        {guide.mathematicalStructure?.geometricLocus || 'Equidistant circular projection and orthogonal trajectory mapping'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Philosopher Card: Prof. Heidegger / Lao Tzu */}
                <div className="bg-slate-950/70 border border-purple-500/30 rounded-xl p-5 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="flex items-center justify-between border-b border-purple-900/50 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-lg bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 text-xs">
                        <i className="fa-solid fa-quote-left"></i>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-purple-200">The Philosopher’s Lens</h4>
                        <span className="text-[10px] text-slate-400 font-mono">Agent: Prof. Heidegger & Lao Tzu</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                      Ontology
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <div className="text-[10px] font-mono uppercase text-purple-400 mb-1 font-semibold flex items-center gap-1.5">
                        <i className="fa-solid fa-compass"></i> Ontological Theme
                      </div>
                      <div className="text-xs font-semibold text-purple-200">
                        {guide.philosophicalInsight?.theme || 'The Eternal Rotation of Potential into Kinetic Flux'}
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <div className="text-[10px] font-mono uppercase text-emerald-400 mb-1 font-semibold flex items-center gap-1.5">
                        <i className="fa-solid fa-eye"></i> The Essence of the Apparatus
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{guide.philosophicalInsight?.essence || 'A machine does not merely consume electrons; it acts as an invisible loom weaving Faraday’s lines of flux into synchronous mechanical torque.'}"
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-950/60 to-slate-900/90 p-4 rounded-lg border border-purple-700/40 relative">
                      <i className="fa-solid fa-quote-right absolute bottom-3 right-3 text-2xl text-purple-500/10"></i>
                      <p className="text-xs text-amber-200 font-serif italic mb-2">
                        "{guide.philosophicalInsight?.quote || 'If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.'}"
                      </p>
                      <div className="text-[11px] text-slate-400 font-mono text-right">
                        — {guide.philosophicalInsight?.author || 'Nikola Tesla'}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-mono">
            Semester-5 Digital Twin Educational Engine
          </div>
          <button
            onClick={() => onLaunchTwin(experimentId)}
            className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-lg shadow-yellow-500/20 uppercase tracking-wider"
          >
            Launch Digital Twin & Simulation <i className="fa-solid fa-arrow-right ml-1.5"></i>
          </button>
        </div>

      </div>
    </div>
  );
};
