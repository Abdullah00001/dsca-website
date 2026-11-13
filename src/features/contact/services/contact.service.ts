/**
 * @fileoverview Contact Service Layer
 * @module features/contact/services
 */

import type { ContactItem } from "../types";

/**
 * Fetches Contact data items with simulated latency.
 */
export async function getContactItems(): Promise<ContactItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample Contact Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
