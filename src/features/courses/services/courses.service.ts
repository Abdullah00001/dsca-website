/**
 * @fileoverview Courses Service Layer
 * @module features/courses/services
 */

import type { CoursesItem } from "../types";

/**
 * Fetches Courses data items with simulated latency.
 */
export async function getCoursesItems(): Promise<CoursesItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample Courses Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
