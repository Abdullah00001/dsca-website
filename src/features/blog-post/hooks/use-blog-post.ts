/**
 * @fileoverview Blog Post Custom Hook
 * @module features/blog-post/hooks/use-blog-post
 */

"use client";

import { useEffect, useState } from "react";
import type { BlogPost } from "@/features/blog/types";
import { getBlogPostDetail } from "../services";

export function useBlogPost(postId: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getBlogPostDetail(postId);
        if (mounted) {
          setPost(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load post");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    if (postId) {
      loadData();
    }

    return () => {
      mounted = false;
    };
  }, [postId]);

  return { post, isLoading, error };
}
