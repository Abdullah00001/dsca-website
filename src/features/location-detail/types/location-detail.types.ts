/**
 * @fileoverview Location Detail Types
 * @module features/location-detail/types
 */

export type { LocationArea, AreaContentBlock } from "@/features/locations/types";

export interface LocationDetailState {
  area: import("@/features/locations/types").LocationArea | null;
  isLoading: boolean;
  error: string | null;
}
