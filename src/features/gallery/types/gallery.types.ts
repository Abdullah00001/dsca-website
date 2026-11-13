/**
 * @fileoverview Gallery Domain Types
 * @module features/gallery/types
 */

export type GalleryCategory = "All" | "Hands-on" | "Events" | "Certificate";

export interface GalleryItem {
  id: string;
  title: string;
  category: "Hands-on" | "Events" | "Certificate";
  formatClass: string;
  gradientClass: string;
  imagePath?: string;
}

export interface GalleryState {
  items: GalleryItem[];
  selectedCategory: GalleryCategory;
  isLoading: boolean;
  error: string | null;
}
