/**
 * @fileoverview Trainer Detail Service Layer
 * @module features/trainer-detail/services
 */

import type { TrainerDetailItem } from "../types";

/**
 * Fetches Trainer Detail data items with simulated latency.
 */
export async function getTrainerDetailItems(): Promise<TrainerDetailItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample Trainer Detail Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
