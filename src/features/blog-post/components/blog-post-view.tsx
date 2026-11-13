"use client";

import Image from "next/image";
import { PhotoHero } from "@/components/layout/photo-hero";
import { Tag } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadCtaSection } from "@/features/home/components/lead-cta-section";
import { useBlogPost } from "../hooks";
import styles from "../styles/blog-post-view.module.css";

export type BlogPostViewProps = {
  postId: string;
};

export function BlogPostView({ postId }: BlogPostViewProps) {
  const { post, isLoading, error } = useBlogPost(postId);

  if (isLoading) {
    return (
      <div className="p-20 text-center font-display text-2xl font-bold">
        Loading article...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="p-20 text-center text-coral font-display text-2xl font-bold">
        {error || "Article not found"}
      </div>
    );
  }

  return (
    <div>
      <PhotoHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category },
        ]}
        title={post.title}
        subtitle=""
      >
        <div className="flex gap-4 items-center flex-wrap mt-6">
          <Tag variant="gold">
            {post.category} · {post.readTime}
          </Tag>
          <span className="text-white/80 font-medium text-sm">
            {post.author} · {post.date}
          </span>
        </div>
      </PhotoHero>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.coverPhoto}>
            <Image
              src="/assets/blog-cover.jpg"
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <article className={styles.prose}>
            <p className="text-2xl leading-relaxed text-muted mb-8">
              {post.excerpt}
            </p>

            {post.blocks && post.blocks.length > 0 ? (
              post.blocks.map((block, idx) => {
                if (block.type === "h2") {
                  return <h2 key={idx}>{block.content}</h2>;
                }
                if (block.type === "h3") {
                  return <h3 key={idx}>{block.content}</h3>;
                }
                if (block.type === "ul" && Array.isArray(block.content)) {
                  return (
                    <ul key={idx}>
                      {block.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={idx}>{block.content}</p>;
              })
            ) : (
              <>
                <h2>Start with what you already like</h2>
                <p>
                  Think about the drinks you enjoy. If you love sweet, creamy
                  drinks, begin with milk-based coffee such as a latte or flat
                  white. If you prefer a strong short drink, try an espresso or an
                  americano. Your taste in familiar drinks is the best map you
                  have.
                </p>

                <h2>Understand roast level in a minute</h2>
                <ul>
                  <li>
                    <b>Light:</b> bright, fruity, tea-like.
                  </li>
                  <li>
                    <b>Medium:</b> balanced, sweet, chocolate and caramel. The
                    safest place to start.
                  </li>
                  <li>
                    <b>Dark:</b> bold, smoky, bitter-sweet. Works well with
                    milk.
                  </li>
                </ul>

                <h2>Taste, note, adjust</h2>
                <p>
                  Sip slowly and ask three questions: is it sweet, sour or
                  bitter? Sour usually means under-extracted, bitter means
                  over-extracted. Changing the grind a little finer or coarser
                  fixes most problems. This habit of tasting and adjusting is
                  exactly what we teach in class.
                </p>
              </>
            )}

            <div className={styles.courseCallout}>
              <h3 className={styles.calloutTitle}>
                Want to taste the difference yourself?
              </h3>
              <p className="text-[#eefaf3] mb-6">
                Our 3‑day Barista Intermediate course takes you from curious to
                confident behind a commercial machine.
              </p>
              <Button href="/courses/intermediate">See the course</Button>
            </div>
          </article>
        </div>
      </section>

      <LeadCtaSection />
    </div>
  );
}
