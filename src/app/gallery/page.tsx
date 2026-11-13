import type { Metadata } from "next";
import { GalleryView } from "@/features/gallery";
import { constructMetadata } from "@/libs/seo";

export const metadata: Metadata = constructMetadata({
  title: "Inside the Academy | DSCA Barista Training Gallery",
  description:
    "Explore photos from hands-on espresso extraction sessions, latte art workshops, cupping classes, and graduate certificate awards at DSCA Farmgate.",
  canonicalUrl: "https://dsca.academy/gallery",
});

export default function GalleryPage() {
  return <GalleryView />;
}

