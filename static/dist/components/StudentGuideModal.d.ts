/**
 * Student Guide & Viva Voce Modal Component
 * Renders complete syllabus guidelines, step-by-step procedures,
 * verified observation tables, model calculations, and viva questions.
 */
import React from 'react';
import { ExperimentId } from '../types/experiments';
interface StudentGuideModalProps {
    experimentId: ExperimentId;
    onClose: () => void;
    onLaunchTwin: (expId: ExperimentId) => void;
}
export declare const StudentGuideModal: React.FC<StudentGuideModalProps>;
export {};
