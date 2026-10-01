/**
 * Landing Hero Component with 3D Virtual Space & Interactive Experiment Drawer
 * Supports floating 3D models for all 7 experiments, search, student guides, and direct twin launching.
 */

import React, { useEffect, useRef, useState } from 'react';
import { ExperimentId, ExperimentCategory, Floating3DExperimentModel } from '../types/experiments';
import { EXPERIMENT_3D_CONFIGS, VirtualSpaceManager, ExperimentMeshBundle } from '../3d/floatingModels';
import { SEM5_OBSERVATIONS } from '../data/observations';
import { StudentGuideModal } from './StudentGuideModal';
import { DatasheetModal } from './DatasheetModal';

import { soundEngine } from '../audio/soundEngine';

export interface LandingHeroProps {
  onLaunchExperiment: (expId: ExperimentId, facility: string) => void;
  currentUser?: { role?: string; name?: string } | null;
  onLogout?: () => void;
  onOpenAdmin?: () => void;
}

const EXPERIMENT_MATHEMATICAL_INSIGHTS: Record<ExperimentId, { symmetry: string; specs: string; archetype: string; icon: string }> = {
  exp2: {
    symmetry: '∮ Conformal Mobius Circle // SO(2)',
    specs: '415 V • 4.7 A • 1440 RPM • 2.2 kW',
    archetype: 'The Archetype of the Infinite Circle',
    icon: 'fa-circle-notch'
  },
  exp3: {
    symmetry: 'Torque ∝ V² // Dahlander 2P:4P Switch',
    specs: '415 V • 4P / 2P • Slip-Ring Rheostat',
    archetype: 'The Tripartite Modulation of Slip',
    icon: 'fa-gauge-high'
  },
  exp5: {
    symmetry: 'Synchronous Phasor // Ra + jXs Regulation',
    specs: '3.5 kVA • 415 V • 1500 RPM • 4.8 A',
    archetype: 'The Resilient Synchronous Field',
    icon: 'fa-bolt'
  },
  exp6_a: {
    symmetry: 'EMF Pessimistic & MMF Optimistic Bounds',
    specs: 'OCC & SCC • 1500 RPM • Potier Field',
    archetype: 'The Epistemology of Upper & Lower Bounds',
    icon: 'fa-chart-line'
  },
  exp6_b: {
    symmetry: 'Super-Synchronous Generation (s < 0)',
    specs: 'Grid-Connected • 1540 RPM • Negative Slip',
    archetype: 'The Transmutation of Slip into Power',
    icon: 'fa-rotate'
  },
  exp7: {
    symmetry: 'Potier Reactance Triangle (XL & Fa)',
    specs: 'ZPF Magnetization • Leakage & Armature Reaction',
    archetype: 'The Geometrical Unmasking of Flux',
    icon: 'fa-shapes'
  },
  exp8: {
    symmetry: 'Infinite Bus V-Curves // cosφ = 1 Parabola',
    specs: '3-Lamp Dark/Bright • 50 Hz Grid Synchrony',
    archetype: 'The Infinite Bus and the Solitary Machine',
    icon: 'fa-network-wired'
  }
};

const PHILOSOPHICAL_APHORISMS = [
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

export const LandingHero: React.FC<LandingHeroProps> = ({
  onLaunchExperiment,
  currentUser,
  onLogout,
  onOpenAdmin
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const spaceManagerRef = useRef<VirtualSpaceManager | null>(null);

  const [activeExpId, setActiveExpId] = useState<ExperimentId | null>(null);
  const [hoveredBundle, setHoveredBundle] = useState<ExperimentMeshBundle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | ExperimentCategory>('all');
  const [drawerOpen, setDrawerOpen] = useState(false); // Default collapsed so 3D space is 100% unobstructed!

  const [guideModalExpId, setGuideModalExpId] = useState<ExperimentId | null>(null);
  const [showDatasheet, setShowDatasheet] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuteState());

  // Initialize Three.js 3D Virtual Space
  useEffect(() => {
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

  const handleSelectCameraMode = (expId: ExperimentId | 'overview') => {
    if (expId === 'overview') {
      setActiveExpId(null);
      spaceManagerRef.current?.resetOverviewCamera();
    } else {
      setActiveExpId(expId);
      spaceManagerRef.current?.focusOnExperiment(expId);
      setDrawerOpen(false); // Auto-collapse drawer when focused on an experiment to avoid blocking view
    }
  };

  const handleLaunch = (expId: ExperimentId) => {
    const config = EXPERIMENT_3D_CONFIGS.find((c) => c.id === expId);
    const facility = config ? config.facility : 'motor';
    onLaunchExperiment(expId, facility);
  };

  // Filter experiments
  const filteredConfigs = EXPERIMENT_3D_CONFIGS.filter((config) => {
    const matchesCategory = categoryFilter === 'all' || config.category === categoryFilter;
    const q = searchQuery.toLowerCase();
    const obs = SEM5_OBSERVATIONS[config.id];
    const matchesSearch =
      config.name.toLowerCase().includes(q) ||
      config.badgeText.toLowerCase().includes(q) ||
      (obs && obs.title.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const activeBundle = EXPERIMENT_3D_CONFIGS.find((c) => c.id === activeExpId);

  return (
    <div className="w-full h-full relative bg-slate-950 overflow-hidden font-sans select-none">
      
      {/* 1. TOP SCI-FI NAVIGATION BAR */}
      <header className="absolute top-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-indigo-900/60 px-3 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
        
        {/* Brand & Lab Title */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-600/30 text-yellow-400 border border-yellow-500/40 flex items-center justify-center text-lg shadow-lg shadow-yellow-500/10 flex-shrink-0">
            <i className="fa-solid fa-bolt-lightning animate-pulse"></i>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xs sm:text-sm font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-sky-400 uppercase whitespace-nowrap">
                ELECTRICAL MACHINES DIGITAL TWIN LAB
              </h1>
              <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5"></span>
                SEM-5 CERTIFIED
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block whitespace-nowrap">
              VIRTUAL 3D TESTBENCH & REAL CURRICULUM OBSERVATIONS
            </p>
          </div>
        </div>

        {/* 3D Camera Quick Jump Bar (Desktop) */}
        <div className="hidden lg:flex items-center space-x-1 bg-slate-900/90 border border-slate-800/90 p-1 rounded-xl shadow-inner">
          <button
            onClick={() => handleSelectCameraMode('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeExpId === null
                ? 'bg-yellow-500 text-slate-950 font-bold shadow-md shadow-yellow-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <i className="fa-solid fa-globe"></i>
            <span>Floor Overview</span>
          </button>
          {EXPERIMENT_3D_CONFIGS.map((exp) => {
            const isSelected = activeExpId === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => handleSelectCameraMode(exp.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                title={exp.name}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: exp.colorHex }}
                ></span>
                <span>{exp.id.toUpperCase().replace('_', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Lab Records & Viva Button */}
          <button
            onClick={() => setGuideModalExpId(activeExpId || 'exp2')}
            className="px-3 py-1.5 bg-indigo-950/70 hover:bg-indigo-900/90 border border-indigo-500/50 hover:border-yellow-400/80 rounded-lg text-xs font-semibold text-yellow-300 transition-all flex items-center shadow-sm whitespace-nowrap"
            title="Open Authentic Laboratory Observations & Viva Bank"
          >
            <i className="fa-solid fa-graduation-cap mr-1.5 text-yellow-400"></i>
            <span className="hidden sm:inline">Lab Records & Viva</span>
            <span className="sm:hidden">Records</span>
          </button>

          {/* Machine Datasheets */}
          <button
            onClick={() => setShowDatasheet(true)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-yellow-500/50 rounded-lg text-xs font-semibold text-slate-200 transition-all flex items-center whitespace-nowrap"
          >
            <i className="fa-solid fa-book-open mr-1.5 text-yellow-400"></i>
            <span className="hidden sm:inline">Datasheets</span>
          </button>

          {/* 50Hz Live Audio Toggle */}
          <button
            onClick={() => setIsMuted(soundEngine.toggleMute())}
            title={isMuted ? "Enable 50 Hz stator resonance & relay acoustics" : "Mute electromechanical audio"}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center whitespace-nowrap ${
              isMuted
                ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                : 'bg-emerald-950/70 border-emerald-500/50 text-emerald-400 shadow-sm shadow-emerald-500/20'
            }`}
          >
            <i className={`fa-solid ${isMuted ? 'fa-volume-xmark text-slate-500' : 'fa-volume-high text-emerald-400 animate-pulse'} mr-1.5`}></i>
            <span className="hidden md:inline">{isMuted ? 'Audio Off' : '50Hz Live'}</span>
          </button>

          {/* Enter Lab / Launch */}
          <button
            onClick={() => handleLaunch(activeExpId || 'exp2')}
            className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-lg transition-all shadow-lg shadow-yellow-500/25 flex items-center uppercase tracking-wider whitespace-nowrap"
          >
            <span>Enter Lab</span>
            <i className="fa-solid fa-chevron-right ml-1.5"></i>
          </button>

          {/* Admin Settings Button if Admin */}
          {currentUser?.role === 'admin' && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="p-2 text-indigo-300 hover:text-white bg-indigo-950/60 border border-indigo-800 rounded-lg hover:bg-indigo-900 transition-colors"
              title="Admin Git Settings"
            >
              <i className="fa-solid fa-code-merge text-xs"></i>
            </button>
          )}

          {/* Power Off / Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-400 bg-slate-900 border border-slate-700 hover:border-red-500/60 rounded-lg transition-colors"
              title="Exit Session"
            >
              <i className="fa-solid fa-power-off text-xs"></i>
            </button>
          )}
        </div>
      </header>

      {/* 2. THREE.JS 3D VIRTUAL SPACE CANVAS */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing"></div>

      {/* 3. FLOATING HOVER INDICATOR IN 3D SPACE */}
      {hoveredBundle && !activeExpId && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 pointer-events-none bg-slate-950/90 border border-yellow-500 text-yellow-400 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase shadow-2xl backdrop-blur-md">
          <i className="fa-solid fa-crosshairs mr-2 animate-spin"></i>
          CLICK TO FOCUS: {hoveredBundle.config.name}
        </div>
      )}

      {/* 4. LEFT FLOATING EXPERIMENT DIRECTORY DRAWER */}
      <div
        className={`absolute top-16 left-3 sm:left-6 z-30 transition-all duration-300 pointer-events-auto ${
          drawerOpen ? 'w-[calc(100%-1.5rem)] sm:w-[410px]' : 'w-14'
        }`}
      >
        {!drawerOpen ? (
          /* Mini Vertical Dock when collapsed */
          <div className="bg-slate-950/90 backdrop-blur-xl border border-indigo-500/40 rounded-2xl shadow-2xl p-2 flex flex-col items-center space-y-2.5">
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/40 flex items-center justify-center transition-all shadow-md"
              title="Expand Semester-5 Experiment Directory"
            >
              <i className="fa-solid fa-list-check"></i>
            </button>
            <div className="w-6 h-px bg-slate-800"></div>
            {EXPERIMENT_3D_CONFIGS.map((exp) => {
              const isSelected = activeExpId === exp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => {
                    handleSelectCameraMode(exp.id);
                    setDrawerOpen(true);
                  }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-mono font-bold transition-all relative ${
                    isSelected
                      ? 'ring-2 ring-yellow-400 shadow-lg scale-105'
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: `${exp.colorHex}22`,
                    color: exp.colorHex,
                    border: `1px solid ${exp.colorHex}50`
                  }}
                  title={exp.name}
                >
                  {exp.id.replace('exp', '').toUpperCase()}
                </button>
              );
            })}
          </div>
        ) : (
          /* Full Rich Drawer */
          <div className="bg-slate-950/92 backdrop-blur-2xl border border-indigo-500/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col max-h-[84vh]">
            
            {/* Drawer Header & Toggle */}
            <div className="p-3.5 sm:p-4 border-b border-indigo-900/40 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-indigo-950/40 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 text-xs">
                  <i className="fa-solid fa-layer-group"></i>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400 font-extrabold text-xs sm:text-sm tracking-wide uppercase">
                      Semester-5 Experiments
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-yellow-950/80 text-yellow-300 border border-yellow-500/40 font-bold">
                      7 Twins
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Virtual Testbenches & Lab Observations
                  </span>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center ml-auto"
                title="Collapse to Mini Dock"
              >
                <i className="fa-solid fa-chevron-left text-xs"></i>
              </button>
            </div>

            {/* Search & Category Filter */}
            <div className="p-3 border-b border-slate-800/80 space-y-2.5 bg-slate-950/70">
              {/* Search Input */}
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-xs text-indigo-400"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search circle diagram, potier, speed, V-curves..."
                  className="w-full bg-slate-900/90 border border-indigo-900/50 focus:border-yellow-500 rounded-xl pl-8 pr-8 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-xs text-slate-500 hover:text-white"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex gap-1.5">
                {[
                  { id: 'all', label: 'All Experiments (7)' },
                  { id: 'induction', label: 'Induction (3)' },
                  { id: 'synchronous', label: 'Synchronous (4)' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id as any)}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                      categoryFilter === cat.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Experiment Cards List */}
            <div className="p-3 overflow-y-auto space-y-3 flex-1 [scrollbar-width:thin] [scrollbar-color:#4f46e5_#0f172a]">
              {filteredConfigs.map((exp) => {
                const obs = SEM5_OBSERVATIONS[exp.id];
                const insight = EXPERIMENT_MATHEMATICAL_INSIGHTS[exp.id];
                const isSelected = activeExpId === exp.id;

                return (
                  <div
                    key={exp.id}
                    className={`rounded-xl p-3.5 transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-yellow-950/20 border-yellow-400/90 shadow-xl shadow-yellow-500/10 ring-1 ring-yellow-400/50'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/90'
                    }`}
                    onClick={() => handleSelectCameraMode(exp.id)}
                  >
                    {/* Top Badges Row */}
                    <div className="flex items-center justify-between gap-2 pb-1.5">
                      <div className="flex items-center space-x-2">
                        <span
                          className="text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-sm"
                          style={{
                            color: exp.colorHex,
                            backgroundColor: `${exp.colorHex}20`,
                            border: `1px solid ${exp.colorHex}50`
                          }}
                        >
                          {exp.id.toUpperCase().replace('_', '')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono capitalize">
                          {exp.category}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-emerald-400 flex items-center bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        <i className="fa-solid fa-check-double mr-1 text-[8px]"></i> Verified Lab Data
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xs sm:text-sm font-bold text-slate-100 hover:text-yellow-400 transition-colors leading-snug">
                      {obs?.title || exp.name}
                    </h4>

                    {/* Mathematical Symmetry & Archetype Pill */}
                    {insight && (
                      <div className="mt-2 p-1.5 rounded-lg bg-slate-950/70 border border-indigo-900/50 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-indigo-300 font-semibold truncate flex items-center gap-1.5">
                          <i className={`fa-solid ${insight.icon} text-indigo-400`}></i>
                          {insight.symmetry}
                        </span>
                      </div>
                    )}

                    {/* Nameplate Specs Row */}
                    {insight && (
                      <div className="mt-1.5 flex items-center text-[10px] font-mono text-amber-300/80 space-x-1">
                        <i className="fa-solid fa-bolt text-yellow-400 text-[9px]"></i>
                        <span>{insight.specs}</span>
                      </div>
                    )}

                    {/* Apparatus Chips */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.components.slice(0, 3).map((comp, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 flex items-center gap-1"
                        >
                          <span className="w-1 h-1 rounded-full bg-indigo-400"></span>
                          {comp.name}
                        </span>
                      ))}
                    </div>

                    {/* Card Action Buttons */}
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setGuideModalExpId(exp.id);
                        }}
                        className="flex-1 py-1.5 px-2 bg-indigo-950/50 hover:bg-indigo-900/80 border border-indigo-600/40 hover:border-yellow-400 text-slate-200 text-[10px] font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                      >
                        <i className="fa-solid fa-graduation-cap text-yellow-400"></i>
                        <span>Student Guide & Tables</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLaunch(exp.id);
                        }}
                        className="py-1.5 px-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 text-[10px] font-black rounded-lg transition-all flex items-center justify-center shadow-md shadow-yellow-500/20 uppercase tracking-wider"
                      >
                        <span>Launch</span>
                        <i className="fa-solid fa-play ml-1.5 text-[8px]"></i>
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredConfigs.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-500 space-y-1">
                  <i className="fa-solid fa-folder-open text-2xl mb-1 block"></i>
                  No experiments match "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 5. BOTTOM FLOATING MACHINE & APPARATUS HUD */}
      {activeBundle && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-35 w-[calc(100%-2rem)] max-w-2xl bg-slate-950/90 backdrop-blur-md border-2 border-yellow-500 rounded-2xl p-4 shadow-2xl text-slate-100 pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold border shadow-md"
              style={{
                backgroundColor: `${activeBundle.colorHex}25`,
                color: activeBundle.colorHex,
                borderColor: `${activeBundle.colorHex}50`
              }}
            >
              <i className="fa-solid fa-cube"></i>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 uppercase font-bold">
                  {activeBundle.id.toUpperCase().replace('_', '')} ACTIVE
                </span>
                <span className="text-xs text-slate-400 font-mono">Virtual Pedestal Focused</span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                {SEM5_OBSERVATIONS[activeBundle.id]?.title || activeBundle.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => setGuideModalExpId(activeBundle.id)}
              className="flex-1 sm:flex-initial px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center"
            >
              <i className="fa-solid fa-graduation-cap text-yellow-400 mr-1.5"></i>
              Guide & Tables
            </button>
            <button
              onClick={() => handleLaunch(activeBundle.id)}
              className="flex-1 sm:flex-initial px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 rounded-xl text-xs font-black transition-all shadow-lg shadow-yellow-500/25 uppercase flex items-center justify-center"
            >
              Launch Twin
              <i className="fa-solid fa-arrow-right ml-1.5"></i>
            </button>
            <button
              onClick={() => handleSelectCameraMode('overview')}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              title="Reset View"
            >
              <i className="fa-solid fa-rotate-left"></i>
            </button>
          </div>
        </div>
      )}

      {/* 6. MODALS */}
      {guideModalExpId && (
        <StudentGuideModal
          experimentId={guideModalExpId}
          onClose={() => setGuideModalExpId(null)}
          onLaunchTwin={(expId) => {
            setGuideModalExpId(null);
            handleLaunch(expId);
          }}
        />
      )}

      {showDatasheet && (
        <DatasheetModal onClose={() => setShowDatasheet(false)} />
      )}

    </div>
  );
};
