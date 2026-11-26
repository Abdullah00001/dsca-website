/**
 * @fileoverview Gallery Service Layer
 * @module features/gallery/services
 */

import type { GalleryItem } from "../types";

/**
 * Fetches Gallery data items with simulated latency.
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample Gallery Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
