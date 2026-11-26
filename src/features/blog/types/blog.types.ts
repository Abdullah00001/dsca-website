/**
 * @fileoverview Blog Domain Types
 * @module features/blog/types
 */

export interface BlogItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface BlogState {
  items: BlogItem[];
  isLoading: boolean;
  error: string | null;
}
