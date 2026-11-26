/**
 * @fileoverview Areas we serve.
 */

import type { Metadata } from "next";
import { LocationsView } from "@/features/locations";
import { AREAS } from "@/libs/catalog";

export const metadata: Metadata = {
  title: "Barista Course in Dhaka: Areas We Serve | DSCA",
  description: String(AREAS.hub.blocks[0]?.[1] ?? ""),
};

/**
 * Locations hub.
 *
 * @returns Areas page.
 */
export default function LocationsPage() {
  return <LocationsView page={AREAS.hub} />;
}
