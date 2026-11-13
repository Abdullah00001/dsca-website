/**
 * @fileoverview Course Detail Service Layer
 * @module features/course-detail/services
 */

import { getCourseById } from "@/features/courses/services";
import type { Course } from "@/features/courses/types";

export { getCourseById };

export async function getCourseDetail(id: string): Promise<Course | null> {
  return getCourseById(id);
}
