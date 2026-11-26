/**
 * @fileoverview Gallery Domain Types
 * @module features/gallery/types
 */

export interface GalleryItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface GalleryState {
  items: GalleryItem[];
  isLoading: boolean;
  error: string | null;
}
