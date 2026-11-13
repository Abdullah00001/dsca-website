/**
 * @fileoverview Legal Service Layer
 * @module features/legal/services
 */

import type { LegalItem } from "../types";

/**
 * Fetches Legal data items with simulated latency.
 */
export async function getLegalItems(): Promise<LegalItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample Legal Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
