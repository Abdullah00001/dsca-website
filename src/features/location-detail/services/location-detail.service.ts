/**
 * @fileoverview Location Detail Service Layer
 * @module features/location-detail/services
 */

import { getLocationAreaById } from "@/features/locations/services";
import type { LocationArea } from "@/features/locations/types";

export { getLocationAreaById };

export async function getLocationDetail(id: string): Promise<LocationArea | null> {
  return getLocationAreaById(id);
}
