/**
 * @fileoverview Locations Custom Hook
 * @module features/locations/hooks/use-locations
 */

"use client";

import { useEffect, useState } from "react";
import type { LocationsItem } from "../types";
import { getLocationsItems } from "../services";

export function useLocations() {
  const [items, setItems] = useState<LocationsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getLocationsItems();
        if (mounted) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load locations data");
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
