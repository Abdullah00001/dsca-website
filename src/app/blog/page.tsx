/**
 * @fileoverview Blog index.
 */

import type { Metadata } from "next";
import { BlogView } from "@/features/blog";

export const metadata: Metadata = {
  title: "Barista Guides | DSCA Blog",
  description:
    "Free barista guides written by the instructors who train you, from choosing beans to a barista career in Bangladesh.",
};

/**
 * Blog listing.
 *
 * @returns Blog page.
 */
export default function BlogPage() {
  return <BlogView />;
}
