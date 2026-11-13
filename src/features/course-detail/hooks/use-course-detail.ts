/**
 * @fileoverview Course Detail Custom Hook
 * @module features/course-detail/hooks/use-course-detail
 */

"use client";

import { useEffect, useState } from "react";
import type { Course } from "@/features/courses/types";
import { getCourseDetail } from "../services";

export function useCourseDetail(courseId: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getCourseDetail(courseId);
        if (mounted) {
          setCourse(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load course details");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    if (courseId) {
      loadData();
    }

    return () => {
      mounted = false;
    };
  }, [courseId]);

  return { course, isLoading, error };
}
