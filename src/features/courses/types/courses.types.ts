/**
 * @fileoverview Courses Domain Types
 * @module features/courses/types
 */

export interface CurriculumDay {
  period: string;
  details: string;
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  level: "Beginner" | "Professional" | "Best value" | "Flagship" | "Add-on";
  gradientClass: "c1" | "c2" | "c3" | "c4" | "c5" | "c6";
  shortDescription: string;
  fullDescription: string;
  learningOutcomes: string[];
  curriculumPlan: CurriculumDay[];
  bestFor?: string;
  maxStudents: number;
}

export interface CoursesState {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
}
