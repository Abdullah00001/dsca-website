/**
 * @fileoverview Course Detail Domain Types
 * @module features/course-detail/types
 */

export interface CourseDetailItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface CourseDetailState {
  items: CourseDetailItem[];
  isLoading: boolean;
  error: string | null;
}
