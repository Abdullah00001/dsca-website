/**
 * @fileoverview Location Detail Domain Types
 * @module features/location-detail/types
 */

export interface LocationDetailItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface LocationDetailState {
  items: LocationDetailItem[];
  isLoading: boolean;
  error: string | null;
}
