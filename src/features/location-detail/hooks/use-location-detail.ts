/**
 * @fileoverview Location Detail Custom Hook
 * @module features/location-detail/hooks/use-location-detail
 */

"use client";

import { useEffect, useState } from "react";
import type { LocationArea } from "@/features/locations/types";
import { getLocationDetail } from "../services";

export function useLocationDetail(areaId: string) {
  const [area, setArea] = useState<LocationArea | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getLocationDetail(areaId);
        if (mounted) {
          setArea(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load area transit details");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    if (areaId) {
      loadData();
    }

    return () => {
      mounted = false;
    };
  }, [areaId]);

  return { area, isLoading, error };
}
