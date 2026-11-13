/**
 * @fileoverview Locations Custom Hook
 * @module features/locations/hooks/use-locations
 */

"use client";

import { useEffect, useState } from "react";
import type { LocationArea, LocationHub } from "../types";
import { getAllLocationAreas, getLocationHub } from "../services";

export function useLocations() {
  const [hub, setHub] = useState<LocationHub | null>(null);
  const [areas, setAreas] = useState<LocationArea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const [hubData, areasData] = await Promise.all([
          getLocationHub(),
          getAllLocationAreas(),
        ]);
        if (mounted) {
          setHub(hubData);
          setAreas(areasData);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load locations");
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

  return { hub, areas, isLoading, error };
}
