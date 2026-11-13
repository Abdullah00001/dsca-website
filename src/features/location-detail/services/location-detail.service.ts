/**
 * @fileoverview Location Detail Service Layer
 * @module features/location-detail/services
 */

import type { LocationDetailItem } from "../types";

/**
 * Fetches Location Detail data items with simulated latency.
 */
export async function getLocationDetailItems(): Promise<LocationDetailItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample Location Detail Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
