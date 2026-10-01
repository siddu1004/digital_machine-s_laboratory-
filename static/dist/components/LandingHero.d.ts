/**
 * Landing Hero Component with 3D Virtual Space & Interactive Experiment Drawer
 * Supports floating 3D models for all 7 experiments, search, student guides, and direct twin launching.
 */
import React from 'react';
import { ExperimentId } from '../types/experiments';
interface LandingHeroProps {
    onLaunchExperiment: (expId: ExperimentId, facility: string) => void;
}
export declare const LandingHero: React.FC<LandingHeroProps>;
export {};
