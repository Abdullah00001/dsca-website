/**
 * @fileoverview Trainers Service Layer
 * @module features/trainers/services
 */

import type { TrainersItem } from "../types";

/**
 * Fetches Trainers data items with simulated latency.
 */
export async function getTrainersItems(): Promise<TrainersItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample Trainers Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
