/**
 * @fileoverview About DSCA.
 */

import type { Metadata } from "next";
import { AboutView } from "@/features/about";

export const metadata: Metadata = {
  title: "About Dhaka Specialty Coffee Academy | DSCA",
  description:
    "A barista training institute in Farmgate, Dhaka, built around real equipment, small batches and a job at the end of it.",
};

/**
 * About page.
 *
 * @returns About view.
 */
export default function AboutPage() {
  return <AboutView />;
}
