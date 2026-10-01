/**
 * 3D Floating Virtual Space for ALL 7 Semester-5 Experiments
 * Creates floating 3D apparatus pedestals in WebGL virtual space.
 * Source: C:\Users\saisi\OneDrive\Documents\machineslabmaterials-sem-5
 */
import * as THREE from 'three';
import { ExperimentId, Floating3DExperimentModel } from '../types/experiments';
export declare const EXPERIMENT_3D_CONFIGS: Floating3DExperimentModel[];
export interface ExperimentMeshBundle {
    config: Floating3DExperimentModel;
    group: THREE.Group;
    hitbox: THREE.Mesh;
    halo: THREE.Mesh;
    rotorMeshes: THREE.Mesh[];
    fluxMeshes: THREE.Group[];
    labelSprite: THREE.Sprite;
}
export declare class VirtualSpaceManager {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: any;
    bundles: ExperimentMeshBundle[];
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    private animationFrameId;
    private clock;
    private container;
    private onSelectCallback?;
    private onHoverCallback?;
    constructor(container: HTMLElement, options: {
        onSelect?: (id: ExperimentId) => void;
        onHover?: (bundle: ExperimentMeshBundle | null) => void;
    });
    private setupLighting;
    private setupFloorGrid;
    private buildExperimentPlatforms;
    private bindEvents;
    focusOnExperiment(id: ExperimentId): void;
    resetOverviewCamera(): void;
    private startAnimation;
    dispose(): void;
}
