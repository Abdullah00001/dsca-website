/**
 * @fileoverview Location Detail Custom Hook
 * @module features/location-detail/hooks/use-location-detail
 */

"use client";

import { useEffect, useState } from "react";
import type { LocationDetailItem } from "../types";
import { getLocationDetailItems } from "../services";

export function useLocationDetail() {
  const [items, setItems] = useState<LocationDetailItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getLocationDetailItems();
        if (mounted) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load locationDetail data");
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
