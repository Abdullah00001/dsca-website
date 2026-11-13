/**
 * @fileoverview Blog Custom Hook
 * @module features/blog/hooks/use-blog
 */

"use client";

import { useEffect, useState } from "react";
import type { BlogPost } from "../types";
import { getBlogPosts } from "../services";

export function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getBlogPosts();
        if (mounted) {
          setPosts(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load blog posts");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  return { posts, isLoading, error };
}
