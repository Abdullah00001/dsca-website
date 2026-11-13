/**
 * @fileoverview Trainer Detail Custom Hook
 * @module features/trainer-detail/hooks/use-trainer-detail
 */

"use client";

import { useEffect, useState } from "react";
import type { TrainerDetailItem } from "../types";
import { getTrainerDetailItems } from "../services";

export function useTrainerDetail() {
  const [items, setItems] = useState<TrainerDetailItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getTrainerDetailItems();
        if (mounted) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load trainerDetail data");
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
