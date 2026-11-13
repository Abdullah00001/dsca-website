/**
 * @fileoverview Blog Post Domain Types
 * @module features/blog-post/types
 */

export interface BlogPostItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface BlogPostState {
  items: BlogPostItem[];
  isLoading: boolean;
  error: string | null;
}
