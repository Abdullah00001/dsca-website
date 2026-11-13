/**
 * @fileoverview About Custom Hook
 * @module features/about/hooks/use-about
 */

"use client";

import { useEffect, useState } from "react";
import type { AboutData } from "../types";
import { getAboutData } from "../services";

export function useAbout() {
  const [data, setData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const aboutData = await getAboutData();
        if (mounted) {
          setData(aboutData);
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

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
