/**
 * @fileoverview Home Domain Types
 * @module features/home/types
 */

export interface HomeItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface HomeState {
  items: HomeItem[];
  isLoading: boolean;
  error: string | null;
}
