/**
 * @fileoverview Courses Custom Hook
 * @module features/courses/hooks/use-courses
 */

"use client";

import { useEffect, useState } from "react";
import type { CoursesItem } from "../types";
import { getCoursesItems } from "../services";

export function useCourses() {
  const [items, setItems] = useState<CoursesItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getCoursesItems();
        if (mounted) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load courses data");
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
