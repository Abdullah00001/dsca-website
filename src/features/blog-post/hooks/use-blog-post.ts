/**
 * @fileoverview Blog Post Custom Hook
 * @module features/blog-post/hooks/use-blog-post
 */

"use client";

import { useEffect, useState } from "react";
import type { BlogPostItem } from "../types";
import { getBlogPostItems } from "../services";

export function useBlogPost() {
  const [items, setItems] = useState<BlogPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getBlogPostItems();
        if (mounted) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load blogPost data");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    items,
    isLoading,
    error,
  };
}
