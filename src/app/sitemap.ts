/**
 * @fileoverview Minimal sitemap until feature routes are rebuilt.
 * @module app/sitemap
 */

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/libs/seo";

/**
 * Generates the public sitemap for known routes.
 *
 * @returns Sitemap entries for the current site surface.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
