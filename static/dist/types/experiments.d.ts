/**
 * Core TypeScript Definitions for Semester-5 Electrical Machines Digital Twin Lab
 * Source of Truth: C:\Users\saisi\OneDrive\Documents\machineslabmaterials-sem-5
 */
export type ExperimentId = 'exp2' | 'exp3' | 'exp5' | 'exp6_a' | 'exp6_b' | 'exp7' | 'exp8';
export type MachineFacility = 'motor' | 'alternator' | 'generator';
export type ExperimentCategory = 'induction' | 'synchronous';
export interface ApparatusItem {
    name: string;
    type: string;
    range: string;
    quantity: number | string;
    purpose: string;
}
export interface ObservationColumn {
    key: string;
    label: string;
    unit: string;
    isCalculated?: boolean;
}
export interface ObservationRow {
    slNo: number;
    [key: string]: number | string;
}
export interface RealLabObservationDataset {
    experimentId: ExperimentId;
    title: string;
    machineNameplate: {
        name: string;
        make: string;
        type: string;
        ratedVoltage: string;
        ratedCurrent: string;
        ratedPower: string;
        ratedSpeed: string;
        frequency: string;
        connection: string;
        [extra: string]: string;
    };
    testConditions: {
        ambientTemp?: string;
        statorResistance?: number;
        effectiveArmatureResistance?: number;
        multiplicationFactor?: number;
        noLoadSpeed?: number;
        syncSpeed?: number;
        fieldVoltage?: string;
    };
    tables: {
        id: string;
        name: string;
        description: string;
        columns: ObservationColumn[];
        rows: ObservationRow[];
        calculationsSummary?: Record<string, string | number>;
    }[];
    modelCalculations: {
        title: string;
        sampleSetIndex: number;
        steps: {
            stepNumber: number;
            description: string;
            formula: string;
            substitution: string;
            result: string;
        }[];
    };
    benchmarkCurves: {
        id: string;
        name: string;
        xAxisKey: string;
        xLabel: string;
        yAxisKey: string;
        yLabel: string;
        points: {
            x: number;
            y: number;
        }[];
    }[];
}
export interface StudentExperimentGuide {
    experimentId: ExperimentId;
    title: string;
    aim: string;
    circuitExplanation: string;
    operatingPrinciple: string;
    keyFormulas: {
        name: string;
        latex: string;
        variables: {
            symbol: string;
            meaning: string;
            unit: string;
        }[];
    }[];
    stepByStepProcedure: string[];
    safetyPrecautions: string[];
    vivaVoce: {
        question: string;
        answer: string;
        conceptCategory: 'Theory' | 'Measurement' | 'Fault Analysis' | 'Applications';
    }[];
    philosophicalInsight?: {
        theme: string;
        essence: string;
        quote: string;
        author: string;
    };
    mathematicalStructure?: {
        symmetryGroup: string;
        governingDifferentialEq: string;
        geometricLocus: string;
    };
}
export interface Floating3DExperimentModel {
    id: ExperimentId;
    name: string;
    category: ExperimentCategory;
    facility: MachineFacility;
    gridCoordinates: {
        x: number;
        y: number;
        z: number;
    };
    accentColor: number;
    colorHex: string;
    badgeText: string;
    components: {
        name: string;
        type: 'machine' | 'variac' | 'meter' | 'switch' | 'rheostat' | 'load_bank' | 'capacitor_bank' | 'lamp_array';
        positionOffset: [number, number, number];
    }[];
}
