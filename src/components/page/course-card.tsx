/**
 * @fileoverview Course card (reference `ccard()`).
 */

import Image from "next/image";
import Link from "next/link";
import type { CatalogCourse } from "@/libs/catalog";
import { COURSE_IMAGE } from "@/libs/catalog";

/**
 * Props for {@link CourseCard}.
 */
export type CourseCardProps = {
  course: CatalogCourse;
};

/**
 * Linked course card with fee and duration.
 *
 * @param props - Course record.
 * @returns Card link.
 */
export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link className="card" href={`/courses/${course.id}`}>
      <div className={`ph ${course.g}`}>
        <Image
          src={COURSE_IMAGE[course.id] ?? "/assets/courses/bar.jpg"}
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
        />
        <span className="lab">
          {course.d} · {course.lv}
        </span>
      </div>
      <div className="t">
        <h3>{course.n}</h3>
        <small>{course.s}</small>
        <div className="price">
          {course.p}
          {course.o ? <s> {course.o}</s> : null}
        </div>
      </div>
    </Link>
  );
}
