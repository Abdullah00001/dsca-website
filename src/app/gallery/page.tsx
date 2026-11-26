/**
 * @fileoverview Academy gallery.
 */

import type { Metadata } from "next";
import { GalleryView } from "@/features/gallery";

export const metadata: Metadata = {
  title: "Gallery | DSCA Barista Academy",
  description: "Inside the DSCA academy in Farmgate: training, workshops, and certificate days.",
};

/**
 * Gallery page.
 *
 * @returns Gallery view.
 */
export default function GalleryPage() {
  return <GalleryView />;
}
