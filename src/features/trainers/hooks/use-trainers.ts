/**
 * @fileoverview Trainers Custom Hook
 * @module features/trainers/hooks/use-trainers
 */

"use client";

import { useEffect, useState } from "react";
import type { TrainersItem } from "../types";
import { getTrainersItems } from "../services";

export function useTrainers() {
  const [items, setItems] = useState<TrainersItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getTrainersItems();
        if (mounted) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load trainers data");
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
