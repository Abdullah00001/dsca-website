/**
 * @fileoverview Trainers Domain Types
 * @module features/trainers/types
 */

export interface TrainersItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface TrainersState {
  items: TrainersItem[];
  isLoading: boolean;
  error: string | null;
}
