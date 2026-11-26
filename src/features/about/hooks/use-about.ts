/**
 * @fileoverview About Custom Hook
 * @module features/about/hooks/use-about
 */

"use client";

import { useEffect, useState } from "react";
import type { AboutItem } from "../types";
import { getAboutItems } from "../services";

export function useAbout() {
  const [items, setItems] = useState<AboutItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getAboutItems();
        if (mounted) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load about data");
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
