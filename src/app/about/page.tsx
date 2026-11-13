import type { Metadata } from "next";
import { AboutView } from "@/features/about";
import { constructMetadata } from "@/libs/seo";

export const metadata: Metadata = constructMetadata({
  title: "About DSCA | ISO 9001:2015 Barista Academy in Dhaka",
  description:
    "Dhaka Specialty Coffee Academy trains baristas in Farmgate with real commercial equipment, small batches of twelve, and job placement support. ISO 9001:2015 certified.",
  canonicalUrl: "https://dsca.academy/about",
});

export default function AboutPage() {
  return <AboutView />;
}

