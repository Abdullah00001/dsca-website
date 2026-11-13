"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PhotoHero } from "@/components/layout/photo-hero";
import { Chip, Tag } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardPhoto, CardContent } from "@/components/ui/card";
import { useBlog } from "../hooks";
import styles from "../styles/blog-view.module.css";

const CATEGORIES = ["All", "Guide", "Career", "Industry", "Brewing"] as const;

export function BlogView() {
  const { posts, isLoading } = useBlog();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const featured = posts[0];

  return (
    <div>
      <PhotoHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title={
          <>
            Free barista <em>guides</em>
          </>
        }
        subtitle="Written by the instructors who train you. From choosing your first beans to what a barista career in Bangladesh looks like."
      />

      <section className={styles.section}>
        <div className={styles.inner}>
          {/* Featured Article Banner */}
          {featured && (
            <Link
              href={`/blog/${featured.id}`}
              className={styles.featuredCard}
            >
              <div className={styles.featuredPhoto}>
                <Image
                  src="/assets/blog-cover.jpg"
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className={styles.featuredContent}>
                <Tag variant="mint" className="self-start">
                  {featured.category} · {featured.readTime}
                </Tag>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <p className={styles.featuredLead}>{featured.excerpt}</p>
                <b className={styles.readMore}>Read article →</b>
              </div>
            </Link>
          )}

          {/* Filter Chips */}
          <div className={styles.filters}>
            {CATEGORIES.map((cat) => (
              <Chip
                key={cat}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Chip>
            ))}
          </div>

          {/* Post Cards Grid */}
          {isLoading ? (
            <p>Loading guides...</p>
          ) : (
            <div className={styles.grid}>
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="flex flex-col"
                >
                  <CardPhoto className="aspect-[16/10]">
                    <Image
                      src="/assets/blog-cover.jpg"
                      alt={post.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="relative z-10">
                      {post.category} · {post.readTime}
                    </span>
                  </CardPhoto>
                  <CardContent>
                    <h3 className="font-display font-extrabold text-2xl leading-snug">
                      {post.title}
                    </h3>
                    <small className="block text-muted text-sm mt-2">
                      {post.excerpt}
                    </small>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup Band */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <div>
            <h2 className={styles.newsletterTitle}>
              Barista tips, <em>in your inbox</em>
            </h2>
            <p className="text-[#eefaf3] text-lg mt-4 max-w-[500px]">
              One useful email when we publish a new guide or open an academy batch.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
            }}
            className="flex gap-3 flex-wrap"
          >
            {subscribed ? (
              <b className="font-display text-2xl text-gold">
                You are on the list. Thank you!
              </b>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  aria-label="Email address for barista tips"
                  className="flex-1 min-w-[240px] min-h-[56px] rounded-full px-6 text-ink bg-white font-medium text-base outline-none"
                />
                <Button type="submit">Sign up</Button>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
