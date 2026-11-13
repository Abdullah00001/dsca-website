/**
 * @fileoverview Certificate Service Layer
 * @module features/certificate/services
 */

import type { CertificateItem } from "../types";

/**
 * Fetches Certificate data items with simulated latency.
 */
export async function getCertificateItems(): Promise<CertificateItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample Certificate Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
