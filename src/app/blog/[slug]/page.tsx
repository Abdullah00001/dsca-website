/**
 * @fileoverview Blog article route.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostView } from "@/features/blog";
import { POSTS, findById } from "@/libs/catalog";

/**
 * Prebuilds one page per guide.
 *
 * @returns Static params.
 */
export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.id }));
}

/**
 * Article metadata.
 *
 * @param props - Route params.
 * @returns Metadata.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findById(POSTS, slug);
  if (!post) return {};
  return { title: `${post.n} | DSCA`, description: post.s };
}

/**
 * Guide article.
 *
 * @param props - Route params.
 * @returns Article.
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findById(POSTS, slug);
  if (!post) notFound();
  return <PostView post={post} />;
}
