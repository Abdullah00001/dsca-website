/**
 * @fileoverview About Service Layer
 * @module features/about/services
 */

import type { AboutItem } from "../types";

/**
 * Fetches About data items with simulated latency.
 */
export async function getAboutItems(): Promise<AboutItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample About Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
