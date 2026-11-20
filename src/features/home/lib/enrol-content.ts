/**
 * @fileoverview Home enrolment form band (reference post-blog `#enrol`).
 * @module features/home/lib/enrol-content
 */

import { COURSES_CONTENT } from "@/features/home/lib/courses-content";

/**
 * Course choices for the enrol select, plus “Not sure yet”.
 */
export const ENROL_COURSE_OPTIONS = [
  ...COURSES_CONTENT.courses.map((course) => ({
    value: course.id,
    label: `${course.name} · ${course.price}`,
  })),
  { value: "unsure", label: "Not sure yet" },
] as const;

/**
 * “Enrol in a Barista Course” — dark band card copy and labels.
 */
export const ENROL_CONTENT = {
  titleLine1: "Enrol in a Barista",
  titleLine2: "Course in Dhaka",
  titleDash: "—",
  titleAccent: "Start This Week",
  lead: "Ready to start? Fill in your details and our team will confirm your enrolment and send everything you need before your first class.",
  fields: {
    name: { id: "enrol-name", label: "Full Name" },
    email: { id: "enrol-email", label: "Email Address" },
    phone: { id: "enrol-phone", label: "WhatsApp / Phone Number" },
    course: { id: "enrol-course", label: "Select Your Course" },
    note: {
      id: "enrol-note",
      label: "Anything you'd like us to know? (Optional)",
    },
  },
  submitLabel: "Confirm My Enrolment",
  successTitleBefore: "Thank",
  successTitleAccent: "you",
  successBody:
    "We received your request. Our team will contact you with the next batch date.",
} as const;
