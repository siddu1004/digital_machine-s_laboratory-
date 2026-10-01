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

interface LandingHeroProps {
  onLaunchExperiment: (expId: ExperimentId, facility: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onLaunchExperiment }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const spaceManagerRef = useRef<VirtualSpaceManager | null>(null);

  const [activeExpId, setActiveExpId] = useState<ExperimentId | null>(null);
  const [hoveredBundle, setHoveredBundle] = useState<ExperimentMeshBundle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | ExperimentCategory>('all');
  const [drawerOpen, setDrawerOpen] = useState(true);

  const [guideModalExpId, setGuideModalExpId] = useState<ExperimentId | null>(null);
  const [showDatasheet, setShowDatasheet] = useState(false);

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
      <header className="absolute top-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-indigo-900/60 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        
        {/* Brand & Lab Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 flex items-center justify-center text-lg shadow-lg shadow-yellow-500/10">
            <i className="fa-solid fa-bolt-lightning animate-pulse"></i>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xs sm:text-sm font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-sky-400 uppercase">
                ELECTRICAL MACHINES DIGITAL TWIN LAB
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5"></span>
                SEM-5 CERTIFIED
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight">
              INTERACTIVE 3D VIRTUAL TESTBENCH & REAL CURRICULUM OBSERVATIONS
            </p>
          </div>
        </div>

        {/* 3D Camera Quick Jump Bar (Desktop) */}
        <div className="hidden lg:flex items-center space-x-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => handleSelectCameraMode('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeExpId === null
                ? 'bg-yellow-500 text-slate-950 font-bold shadow-md shadow-yellow-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <i className="fa-solid fa-globe mr-1.5"></i> Floor Overview
          </button>
          {EXPERIMENT_3D_CONFIGS.map((exp) => (
            <button
              key={exp.id}
              onClick={() => handleSelectCameraMode(exp.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeExpId === exp.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {exp.id.toUpperCase().replace('_', '')}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDatasheet(true)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-yellow-500/50 rounded-lg text-xs font-semibold text-slate-200 transition-all flex items-center"
          >
            <i className="fa-solid fa-book-open mr-1.5 text-yellow-400"></i>
            <span className="hidden sm:inline">Machine</span> Datasheets
          </button>
          <button
            onClick={() => handleLaunch(activeExpId || 'exp2')}
            className="px-4 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black text-xs rounded-lg transition-all shadow-lg shadow-yellow-500/25 flex items-center uppercase tracking-wider"
          >
            <span>Enter Lab</span>
            <i className="fa-solid fa-chevron-right ml-1.5"></i>
          </button>
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
          drawerOpen ? 'w-[calc(100%-1.5rem)] sm:w-96' : 'w-12'
        }`}
      >
        <div className="bg-slate-950/85 backdrop-blur-md border border-indigo-900/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh]">
          
          {/* Drawer Header & Toggle */}
          <div className="p-3 sm:p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
            {drawerOpen ? (
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                  ⚡ Semester-5 Experiments
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-yellow-950/80 text-yellow-400 border border-yellow-500/30">
                  7 Digital Twins
                </span>
              </div>
            ) : null}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-auto"
              title={drawerOpen ? 'Collapse Directory' : 'Expand Directory'}
            >
              <i className={`fa-solid ${drawerOpen ? 'fa-chevron-left' : 'fa-list-check'}`}></i>
            </button>
          </div>

          {drawerOpen && (
            <>
              {/* Search & Category Filter */}
              <div className="p-3 border-b border-slate-800/80 space-y-2.5 bg-slate-950/60">
                {/* Search Input */}
                <div className="relative">
                  <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-xs text-slate-500"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search circle diagram, potier, speed..."
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-yellow-500 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2 text-xs text-slate-500 hover:text-white"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex gap-1.5">
                  {[
                    { id: 'all', label: 'All (7)' },
                    { id: 'induction', label: 'Induction (3)' },
                    { id: 'synchronous', label: 'Sync (4)' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(cat.id as any)}
                      className={`flex-1 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        categoryFilter === cat.id
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Experiment Cards List */}
              <div className="p-3 overflow-y-auto space-y-2.5 flex-1 divide-y divide-slate-800/40">
                {filteredConfigs.map((exp) => {
                  const obs = SEM5_OBSERVATIONS[exp.id];
                  const isSelected = activeExpId === exp.id;

                  return (
                    <div
                      key={exp.id}
                      className={`pt-2.5 first:pt-0 rounded-xl p-3 transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-indigo-950/40 border-yellow-500/80 shadow-lg shadow-yellow-500/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                      onClick={() => handleSelectCameraMode(exp.id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span
                              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                              style={{
                                color: exp.colorHex,
                                backgroundColor: `${exp.colorHex}18`,
                                border: `1px solid ${exp.colorHex}40`
                              }}
                            >
                              {exp.id.toUpperCase().replace('_', '')}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono capitalize">
                              {exp.category}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-100 hover:text-yellow-400 transition-colors">
                            {obs?.title || exp.name}
                          </h4>
                        </div>
                      </div>

                      {/* Chips / Apparatus */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {exp.components.slice(0, 3).map((comp, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                          >
                            {comp.name}
                          </span>
                        ))}
                      </div>

                      {/* Card Action Buttons */}
                      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setGuideModalExpId(exp.id);
                          }}
                          className="flex-1 py-1.5 px-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300 text-[10px] font-semibold rounded-lg transition-colors flex items-center justify-center space-x-1"
                        >
                          <i className="fa-solid fa-graduation-cap text-yellow-400"></i>
                          <span>Student Guide & Data</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLaunch(exp.id);
                          }}
                          className="py-1.5 px-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center shadow-md shadow-yellow-500/20"
                        >
                          <span>Launch</span>
                          <i className="fa-solid fa-play ml-1 text-[8px]"></i>
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
            </>
          )}

        </div>
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
