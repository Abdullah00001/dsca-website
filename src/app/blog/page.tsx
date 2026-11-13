import type { Metadata } from "next";
import { BlogView } from "@/features/blog";
import { constructMetadata } from "@/libs/seo";

export const metadata: Metadata = constructMetadata({
  title: "Free Barista Guides & Coffee Insights | DSCA Blog",
  description:
    "Written by DSCA coffee instructors. Guides on espresso brewing, milk steaming, choosing specialty beans, and barista career development in Bangladesh.",
  canonicalUrl: "https://dsca.academy/blog",
});

export default function BlogPage() {
  return <BlogView />;
}

