/**
 * @fileoverview Trainer Detail Custom Hook
 * @module features/trainer-detail/hooks/use-trainer-detail
 */

"use client";

import { useEffect, useState } from "react";
import type { Trainer } from "@/features/trainers/types";
import { getTrainerDetail } from "../services";

export function useTrainerDetail(trainerId: string) {
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getTrainerDetail(trainerId);
        if (mounted) {
          setTrainer(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load trainer details");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    if (trainerId) {
      loadData();
    }

    return () => {
      mounted = false;
    };
  }, [trainerId]);

  return { trainer, isLoading, error };
}
