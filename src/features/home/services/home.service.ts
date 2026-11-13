/**
 * @fileoverview Home Service Layer
 * @module features/home/services
 */

import type { HomeItem } from "../types";

/**
 * Fetches Home data items with simulated latency.
 */
export async function getHomeItems(): Promise<HomeItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample Home Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
