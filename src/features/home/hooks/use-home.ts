/**
 * @fileoverview Home Custom Hook
 * @module features/home/hooks/use-home
 */

"use client";

import { useEffect, useState } from "react";
import type { HomeData } from "../types";
import { getHomeData } from "../services";

export function useHome() {
  const [data, setData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const homeData = await getHomeData();
        if (mounted) {
          setData(homeData);
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

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
