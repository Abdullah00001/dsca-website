import type { Metadata } from "next";
import { CoursesView } from "@/features/courses";
import { constructMetadata } from "@/libs/seo";

export const metadata: Metadata = constructMetadata({
  title: "Barista Courses in Dhaka | Five Accredited Programs at DSCA",
  description:
    "Five programs from a 3‑day start (৳4,950) to a 22‑day advanced track. Every course runs on commercial machines in batches of 12 and includes an online verifiable certificate.",
  canonicalUrl: "https://dsca.academy/courses",
});

export default function CoursesPage() {
  return <CoursesView />;
}

