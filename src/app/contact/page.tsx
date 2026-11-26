/**
 * @fileoverview Enrol / contact page.
 */

import type { Metadata } from "next";
import { ContactView } from "@/features/contact";

export const metadata: Metadata = {
  title: "Enroll | DSCA Barista Academy Dhaka",
  description:
    "Twelve seats a batch. Tell us the course and we reply with the next start date and how to hold your seat.",
};

/**
 * Contact and enrolment page.
 *
 * @returns Contact view.
 */
export default function ContactPage() {
  return <ContactView />;
}
