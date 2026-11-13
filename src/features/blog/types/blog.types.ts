/**
 * @fileoverview Blog Domain Types
 * @module features/blog/types
 */

export interface ArticleBlock {
  type: "p" | "h2" | "h3" | "ul" | "quote";
  content: string | string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: "Guide" | "Career" | "Industry" | "Brewing";
  readTime: string;
  gradientClass: "c1" | "c2" | "c3" | "c4" | "c5" | "c6";
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  blocks?: ArticleBlock[];
}

export interface BlogState {
  posts: BlogPost[];
  isLoading: boolean;
  error: string | null;
}
