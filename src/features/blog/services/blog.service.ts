/**
 * @fileoverview Blog Service Layer
 * @module features/blog/services
 */

import type { BlogItem } from "../types";

/**
 * Fetches Blog data items with simulated latency.
 */
export async function getBlogItems(): Promise<BlogItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample Blog Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
