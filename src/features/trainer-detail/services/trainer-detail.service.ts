/**
 * @fileoverview Trainer Detail Service Layer
 * @module features/trainer-detail/services
 */

import { getTrainerById } from "@/features/trainers/services";
import type { Trainer } from "@/features/trainers/types";

export { getTrainerById };

export async function getTrainerDetail(id: string): Promise<Trainer | null> {
  return getTrainerById(id);
}
