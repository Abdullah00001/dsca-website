/**
 * @fileoverview Home Custom Hook
 * @module features/home/hooks/use-home
 */

"use client";

import { useEffect, useState } from "react";
import type { HomeItem } from "../types";
import { getHomeItems } from "../services";

export function useHome() {
  const [items, setItems] = useState<HomeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getHomeItems();
        if (mounted) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load home data");
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
