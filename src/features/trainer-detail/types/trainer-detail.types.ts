/**
 * @fileoverview Trainer Detail Types
 * @module features/trainer-detail/types
 */

export type { Trainer } from "@/features/trainers/types";

export interface TrainerDetailState {
  trainer: import("@/features/trainers/types").Trainer | null;
  isLoading: boolean;
  error: string | null;
}
