/**
 * @fileoverview Blog Post Service Layer
 * @module features/blog-post/services
 */

import { getBlogPostById } from "@/features/blog/services";
import type { BlogPost } from "@/features/blog/types";

export { getBlogPostById };

export async function getBlogPostDetail(id: string): Promise<BlogPost | null> {
  return getBlogPostById(id);
}
