/**
 * @fileoverview Home blog guides — reference section after the video.
 * @module features/home/components/blog-section
 */

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { BLOG_CONTENT } from "@/features/home/lib/blog-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/blog-section.module.css";

/**
 * Light band of the first three barista guides, plus a link to the blog.
 *
 * @returns Blog section for the home page.
 */
export function BlogSection() {
  "use no memo";

  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const eyebrow = root.querySelector<HTMLElement>("[data-blog='eyebrow']");
    const title = root.querySelector<HTMLElement>("[data-blog='title']");
    const accent = root.querySelector<HTMLElement>(`.${styles.accent}`);
    const cta = root.querySelector<HTMLElement>("[data-blog='cta']");
    const lead = root.querySelector<HTMLElement>("[data-blog='lead']");
    const cards = root.querySelectorAll<HTMLElement>("[data-blog='card']");
    const covers = root.querySelectorAll<HTMLElement>(`.${styles.cover}`);
    const tags = root.querySelectorAll<HTMLElement>(`.${styles.tag}`);
    const shine = root.querySelector<HTMLElement>("[data-blog='shine']");

    let observer: IntersectionObserver | null = null;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      if (eyebrow) {
        tl.fromTo(
          eyebrow,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, immediateRender: false },
          0,
        );
      }

      if (title) {
        tl.fromTo(
          title,
          { opacity: 0, y: 32, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.75,
            immediateRender: false,
            clearProps: "filter",
          },
          0.08,
        );
      }

      if (accent) {
        tl.fromTo(
          accent,
          { scale: 0.9, y: 10 },
          {
            scale: 1,
            y: 0,
            duration: 0.55,
            ease: "back.out(2.2)",
            immediateRender: false,
          },
          0.18,
        );
      }

      if (shine) {
        tl.fromTo(
          shine,
          { xPercent: -130, opacity: 0.55 },
          { xPercent: 130, opacity: 0, duration: 1.05, ease: "power2.inOut" },
          0.1,
        );
      }

      if (cta) {
        tl.fromTo(
          cta,
          { opacity: 0, y: 20, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.6)",
            immediateRender: false,
          },
          0.28,
        );
      }

      if (lead) {
        tl.fromTo(
          lead,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.55, immediateRender: false },
          0.36,
        );
      }

      if (cards.length > 0) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 48, scale: 0.92, rotate: -1.4 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            immediateRender: false,
          },
          0.42,
        );
      }

      if (covers.length > 0) {
        tl.fromTo(
          covers,
          { clipPath: "inset(18% 10%)" },
          {
            clipPath: "inset(0% 0%)",
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
            immediateRender: false,
          },
          0.46,
        );
      }

      if (tags.length > 0) {
        tl.fromTo(
          tags,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            immediateRender: false,
          },
          0.72,
        );
      }

      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            tl.play();
            observer?.disconnect();
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
      );
      observer.observe(root);
    }, root);

    return () => {
      observer?.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-labelledby="blog-heading"
    >
      <span className={styles.shine} data-blog="shine" aria-hidden="true" />
      <div className={`${layout.g} ${styles.inner}`}>
        <div className={layout.in}>
          <p className={styles.eyebrow} data-blog="eyebrow">
            {BLOG_CONTENT.eyebrow}
          </p>
          <h2 id="blog-heading" className={styles.title} data-blog="title">
            {BLOG_CONTENT.titleBefore}{" "}
            <em className={styles.accent}>{BLOG_CONTENT.titleAccent}</em>
          </h2>
          <div className={styles.cta} data-blog="cta">
            <Button href={BLOG_CONTENT.allHref} variant="line">
              {BLOG_CONTENT.allLabel}
            </Button>
          </div>
          <p className={styles.lead} data-blog="lead">
            {BLOG_CONTENT.lead}
          </p>

          <ul className={styles.grid}>
            {BLOG_CONTENT.posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.id}`}
                  className={styles.card}
                  data-blog="card"
                >
                  <div className={styles.cover}>
                    <Image
                      className={styles.img}
                      src={post.image}
                      alt={post.alt}
                      fill
                      sizes="(max-width: 899px) 100vw, 33vw"
                    />
                    <p className={styles.tag}>
                      {post.category} · {post.minutes} read
                    </p>
                  </div>
                  <div className={styles.body}>
                    <h3 className={styles.name}>{post.title}</h3>
                    <small className={styles.excerpt}>{post.excerpt}</small>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
