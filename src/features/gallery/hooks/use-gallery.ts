/**
 * @fileoverview Gallery Custom Hook
 * @module features/gallery/hooks/use-gallery
 */

"use client";

import { useEffect, useState } from "react";
import type { GalleryItem, GalleryCategory } from "../types";
import { getGalleryItems } from "../services";

export function useGallery(initialCategory: GalleryCategory = "All") {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>(initialCategory);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getGalleryItems(selectedCategory);
        if (mounted) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load gallery items");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [selectedCategory]);

  return { items, selectedCategory, setSelectedCategory, isLoading, error };
}
