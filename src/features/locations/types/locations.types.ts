/**
 * @fileoverview Locations Domain Types
 * @module features/locations/types
 */

export interface AreaContentBlock {
  type: "p" | "h2" | "h3" | "ul" | "callout" | "close";
  content: string;
}

export interface LocationArea {
  id: string;
  name: string;
  h1: string;
  blocks: [type: string, content: string][];
  metaTitle: string;
  metaDescription: string;
  transitSummary?: string;
  distanceKm?: string;
  estimatedMinutes?: string;
}

export interface LocationHub {
  h1: string;
  blocks: [type: string, content: string][];
}

export interface LocationsState {
  hub: LocationHub;
  areas: LocationArea[];
  isLoading: boolean;
  error: string | null;
}
