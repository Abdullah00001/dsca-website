/**
 * @fileoverview Courses index.
 */

import type { Metadata } from "next";
import { CoursesView } from "@/features/courses";

export const metadata: Metadata = {
  title: "Barista Courses in Dhaka | DSCA",
  description:
    "Five barista programs in Farmgate, from a 3-day start to a 22-day advanced track. Batches of twelve, professional equipment, and a verifiable DSCA certificate.",
};

/**
 * Courses listing.
 *
 * @returns Courses page.
 */
export default function CoursesPage() {
  return <CoursesView />;
}
