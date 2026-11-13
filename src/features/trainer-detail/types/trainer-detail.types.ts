/**
 * @fileoverview Trainer Detail Domain Types
 * @module features/trainer-detail/types
 */

export interface TrainerDetailItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface TrainerDetailState {
  items: TrainerDetailItem[];
  isLoading: boolean;
  error: string | null;
}
