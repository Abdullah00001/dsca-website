/**
 * @fileoverview About Domain Types
 * @module features/about/types
 */

export interface AboutItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface AboutState {
  items: AboutItem[];
  isLoading: boolean;
  error: string | null;
}
