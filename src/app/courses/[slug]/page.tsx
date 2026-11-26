/**
 * @fileoverview Course detail route.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseView } from "@/features/courses";
import { COURSES, findById } from "@/libs/catalog";

/**
 * Prebuilds one page per course.
 *
 * @returns Static params.
 */
export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.id }));
}

/**
 * Course metadata.
 *
 * @param props - Route params.
 * @returns Metadata.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = findById(COURSES, slug);
  if (!course) return {};
  return {
    title: `${course.n} | DSCA Dhaka`,
    description: course.t,
  };
}

/**
 * Course detail page.
 *
 * @param props - Route params.
 * @returns Course view.
 */
export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = findById(COURSES, slug);
  if (!course) notFound();
  return <CourseView course={course} />;
}
