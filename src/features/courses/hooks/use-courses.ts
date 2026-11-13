/**
 * @fileoverview Courses Custom Hook
 * @module features/courses/hooks/use-courses
 */

"use client";

import { useEffect, useState } from "react";
import type { Course } from "../types";
import { getCourses } from "../services";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getCourses();
        if (mounted) {
          setCourses(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load courses");
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

  return { courses, isLoading, error };
}
