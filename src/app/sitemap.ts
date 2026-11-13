import type { MetadataRoute } from "next";
import { getCourses } from "@/features/courses/services";
import { getAllLocationAreas } from "@/features/locations/services";
import { getTrainers } from "@/features/trainers/services";
import { getBlogPosts } from "@/features/blog/services";
import { SITE_URL } from "@/libs/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, areas, trainers, posts] = await Promise.all([
    getCourses(),
    getAllLocationAreas(),
    getTrainers(),
    getBlogPosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/courses",
    "/locations",
    "/trainers",
    "/certificate",
    "/gallery",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${SITE_URL}/courses/${course.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const locationRoutes: MetadataRoute.Sitemap = areas.map((area) => ({
    url: `${SITE_URL}/locations/${area.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const trainerRoutes: MetadataRoute.Sitemap = trainers.map((trainer) => ({
    url: `${SITE_URL}/trainers/${trainer.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...courseRoutes,
    ...locationRoutes,
    ...trainerRoutes,
    ...blogRoutes,
  ];
}

