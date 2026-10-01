/**
 * Main TypeScript Module Index
 * Electrical Machines Digital Twin Laboratory
 */

export * from './types/experiments';
export * from './data/observations';
export * from './data/learningGuide';
export * from './3d/floatingModels';
export * from './components/LandingHero';
export * from './components/StudentGuideModal';
export * from './components/DatasheetModal';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { LandingHero } from './components/LandingHero';
import { StudentGuideModal } from './components/StudentGuideModal';
import { DatasheetModal } from './components/DatasheetModal';
import { SEM5_OBSERVATIONS } from './data/observations';
import { STUDENT_LEARNING_GUIDES } from './data/learningGuide';
import { VirtualSpaceManager, EXPERIMENT_3D_CONFIGS } from './3d/floatingModels';

// Expose on window for runtime access and interoperability
if (typeof window !== 'undefined') {
  (window as any).DigitalTwinTS = {
    LandingHero,
    StudentGuideModal,
    DatasheetModal,
    SEM5_OBSERVATIONS,
    STUDENT_LEARNING_GUIDES,
    VirtualSpaceManager,
    EXPERIMENT_3D_CONFIGS,
    mountLandingPage: (containerId: string, onLaunchExperiment: (expId: string, facility: string) => void) => {
      const container = document.getElementById(containerId);
      if (container) {
        const root = ReactDOM.createRoot(container);
        root.render(
          React.createElement(LandingHero, { onLaunchExperiment })
        );
        return root;
      }
      return null;
    }
  };
}
