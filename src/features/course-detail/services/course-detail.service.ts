/**
 * @fileoverview Course Detail Service Layer
 * @module features/course-detail/services
 */

import type { CourseDetailItem } from "../types";

/**
 * Fetches Course Detail data items with simulated latency.
 */
export async function getCourseDetailItems(): Promise<CourseDetailItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "Sample Course Detail Item",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}
