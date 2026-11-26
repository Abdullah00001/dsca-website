/**
 * @fileoverview Courses Domain Types
 * @module features/courses/types
 */

export interface CoursesItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface CoursesState {
  items: CoursesItem[];
  isLoading: boolean;
  error: string | null;
}
