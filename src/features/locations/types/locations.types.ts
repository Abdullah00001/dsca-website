/**
 * @fileoverview Locations Domain Types
 * @module features/locations/types
 */

export interface LocationsItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface LocationsState {
  items: LocationsItem[];
  isLoading: boolean;
  error: string | null;
}
