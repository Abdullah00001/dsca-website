/**
 * @fileoverview Trainers Domain Types
 * @module features/trainers/types
 */

export interface Trainer {
  id: string;
  name: string;
  role: string;
  gradientClass: "c1" | "c2" | "c3" | "c4" | "c5" | "c6";
  bio: string;
  focusAreas: string[];
  image: string;
}

export interface TrainersState {
  trainers: Trainer[];
  isLoading: boolean;
  error: string | null;
}
