/**
 * @fileoverview Blog Post Detail Types
 * @module features/blog-post/types
 */

export type { BlogPost, ArticleBlock } from "@/features/blog/types";

export interface BlogPostState {
  post: import("@/features/blog/types").BlogPost | null;
  isLoading: boolean;
  error: string | null;
}
