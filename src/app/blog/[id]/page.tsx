import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/features/blog-post";
import { getBlogPosts, getBlogPostById } from "@/features/blog/services";
import { constructMetadata, getArticleJsonLd } from "@/libs/seo";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    return constructMetadata({
      title: "Article Not Found | DSCA Blog",
      description: "The requested coffee guide could not be found.",
    });
  }

  return constructMetadata({
    title: `${post.title} | DSCA Coffee Guide`,
    description: post.excerpt,
    canonicalUrl: `https://dsca.academy/blog/${post.id}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  const articleJsonLd = getArticleJsonLd({
    title: post.title,
    excerpt: post.excerpt,
    author: post.author,
    publishedDate: post.date,
    slug: post.id,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPostView postId={id} />
    </>
  );
}

