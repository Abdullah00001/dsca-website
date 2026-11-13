/**
 * @fileoverview Course Detail Types
 * @module features/course-detail/types
 */

export type { Course, CurriculumDay } from "@/features/courses/types";

export interface CourseDetailState {
  course: import("@/features/courses/types").Course | null;
  isLoading: boolean;
  error: string | null;
}
