/**
 * @fileoverview Minimal sitemap until feature routes are rebuilt.
 * @module app/sitemap
 */

import type { MetadataRoute } from "next";
import { AREA_LIST, COURSES, POSTS, TRAINERS } from "@/libs/catalog";
import { SITE_URL } from "@/libs/seo";

/**
 * Generates the public sitemap for known routes.
 *
 * @returns Sitemap entries for the current site surface.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/courses",
    "/trainers",
    "/locations",
    "/blog",
    "/about",
    "/certificate",
    "/gallery",
    "/contact",
    "/privacy",
    "/terms",
    ...COURSES.map((course) => `/courses/${course.id}`),
    ...TRAINERS.map((trainer) => `/trainers/${trainer.id}`),
    ...POSTS.map((post) => `/blog/${post.id}`),
    ...AREA_LIST.map((area) => `/locations/${area[0]}`),
  ];

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" as const : "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
