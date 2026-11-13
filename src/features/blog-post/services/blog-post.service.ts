/**
 * @fileoverview Blog Post Service Layer
 * @module features/blog-post/services
 */

import type { BlogPostItem } from "../types";

/**
 * Fetches Blog Post data items with simulated latency.
 */
export async function getBlogPostItems(): Promise<BlogPostItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample Blog Post Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
