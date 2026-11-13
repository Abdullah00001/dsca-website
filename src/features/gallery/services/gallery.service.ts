/**
 * @fileoverview Gallery Service Layer
 * @module features/gallery/services
 */

import type { GalleryItem, GalleryCategory } from "../types";

const MOCK_GALLERY: GalleryItem[] = [
  { id: "1", category: "Hands-on", title: "Pulling espresso on commercial bar", formatClass: "tall", gradientClass: "c1", imagePath: "/assets/bar.jpg" },
  { id: "2", category: "Hands-on", title: "Latte art milk pour", formatClass: "wide", gradientClass: "c2", imagePath: "/assets/int1.jpg" },
  { id: "3", category: "Events", title: "Weekend barista workshop day", formatClass: "standard", gradientClass: "c3", imagePath: "/assets/hall.jpg" },
  { id: "4", category: "Certificate", title: "ISO certificate handover", formatClass: "standard", gradientClass: "c4", imagePath: "/assets/cert.jpg" },
  { id: "5", category: "Hands-on", title: "Precision milk steaming practice", formatClass: "standard", gradientClass: "c5", imagePath: "/assets/staff2.jpg" },
  { id: "6", category: "Events", title: "Sensory cupping session", formatClass: "wide", gradientClass: "c6", imagePath: "/assets/counter.jpg" },
  { id: "7", category: "Certificate", title: "Graduation batch celebration", formatClass: "tall", gradientClass: "c2", imagePath: "/assets/staff.jpg" },
  { id: "8", category: "Hands-on", title: "Grinder calibration & extraction testing", formatClass: "standard", gradientClass: "c1", imagePath: "/assets/barista.jpg" },
  { id: "9", category: "Events", title: "Guest specialty barista masterclass", formatClass: "standard", gradientClass: "c3", imagePath: "/assets/lounge.jpg" },
];

export async function getGalleryItems(category: GalleryCategory = "All"): Promise<GalleryItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  if (category === "All") {
    return [...MOCK_GALLERY];
  }
  return MOCK_GALLERY.filter((item) => item.category === category);
}
