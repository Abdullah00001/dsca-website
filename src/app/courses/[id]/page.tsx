import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetailView } from "@/features/course-detail";
import { getCourses, getCourseById } from "@/features/courses/services";
import { constructMetadata, getCourseJsonLd } from "@/libs/seo";

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({
    id: course.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    return constructMetadata({
      title: "Course Not Found | DSCA",
      description: "The requested barista course could not be found.",
    });
  }

  return constructMetadata({
    title: `${course.name} | Barista Course Dhaka | DSCA`,
    description: course.shortDescription,
    canonicalUrl: `https://dsca.academy/courses/${course.id}`,
  });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  const courseJsonLd = getCourseJsonLd({
    name: course.name,
    description: course.fullDescription,
    price: course.price,
    duration: course.duration,
    id: course.id,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <CourseDetailView courseId={id} />
    </>
  );
}

