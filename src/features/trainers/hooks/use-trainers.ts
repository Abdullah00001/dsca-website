/**
 * @fileoverview Trainers Custom Hook
 * @module features/trainers/hooks/use-trainers
 */

"use client";

import { useEffect, useState } from "react";
import type { Trainer } from "../types";
import { getTrainers } from "../services";

export function useTrainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getTrainers();
        if (mounted) {
          setTrainers(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load trainers");
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

  return { trainers, isLoading, error };
}
