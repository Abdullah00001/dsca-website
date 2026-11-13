/**
 * @fileoverview Locations Service Layer
 * @module features/locations/services
 */

import type { LocationsItem } from "../types";

/**
 * Fetches Locations data items with simulated latency.
 */
export async function getLocationsItems(): Promise<LocationsItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample Locations Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
