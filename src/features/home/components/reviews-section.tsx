/**
 * @fileoverview Home student reviews — full-bleed card marquee.
 * @module features/home/components/reviews-section
 */

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { REVIEWS_CONTENT, type ReviewItem } from "@/features/home/lib/reviews-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/reviews-section.module.css";

/**
 * One Google review card.
 *
 * @param props - Review fields.
 * @returns Card figure.
 */
function ReviewCard({ item }: { item: ReviewItem }) {
  return (
    <figure className={styles.card}>
      <div className={styles.who}>
        <span className={styles.mark} aria-hidden="true">
          G
        </span>
        <div>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.source}>Google review</div>
        </div>
      </div>
      <blockquote className={styles.quote}>“{item.quote}”</blockquote>
      <a
        className={styles.more}
        href={REVIEWS_CONTENT.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read on Google →
      </a>
    </figure>
  );
}

/**
 * Light band of Google reviews. The row loops; hover or keyboard focus pauses it.
 *
 * @returns Reviews section for the home page.
 */
export function ReviewsSection() {
  "use no memo";

  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!root || !viewport || !track) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const copy = root.querySelectorAll<HTMLElement>("[data-reviews='copy']");
    const accent = root.querySelector<HTMLElement>(`.${styles.accent}`);
    const cards = root.querySelectorAll<HTMLElement>(
      "ul:not([inert]) figure",
    );
    const links = root.querySelector<HTMLElement>("[data-reviews='links']");
    const shine = root.querySelector<HTMLElement>("[data-reviews='shine']");

    let observer: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      if (copy.length > 0) {
        tl.from(
          copy,
          {
            opacity: 0,
            y: 28,
            filter: "blur(8px)",
            duration: 0.7,
            stagger: 0.1,
            immediateRender: false,
            clearProps: "filter",
          },
          0,
        );
      }

      if (accent) {
        tl.from(
          accent,
          {
            scale: 0.92,
            y: 8,
            duration: 0.55,
            ease: "back.out(2.2)",
            immediateRender: false,
          },
          0.12,
        );
      }

      if (shine) {
        tl.fromTo(
          shine,
          { xPercent: -130, opacity: 0.55 },
          { xPercent: 130, opacity: 0, duration: 1.05, ease: "power2.inOut" },
          0.18,
        );
      }

      if (cards.length > 0) {
        tl.from(
          cards,
          {
            opacity: 0,
            y: 36,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            immediateRender: false,
          },
          0.24,
        );
      }

      if (links) {
        tl.from(links, {
          opacity: 0,
          y: 16,
          duration: 0.5,
          immediateRender: false,
        }, 0.45);
      }

      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            tl.play();
            observer?.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
      );
      observer.observe(root);
    }, root);

    const tween = gsap.fromTo(
      track,
      { xPercent: 0 },
      { xPercent: -50, duration: 55, ease: "none", repeat: -1 },
    );

    const pause = (): void => {
      tween.pause();
    };
    const play = (): void => {
      tween.play();
    };
    const onFocusOut = (event: FocusEvent): void => {
      const next = event.relatedTarget;
      if (!(next instanceof Node) || !viewport.contains(next)) {
        play();
      }
    };

    viewport.addEventListener("mouseenter", pause);
    viewport.addEventListener("mouseleave", play);
    viewport.addEventListener("focusin", pause);
    viewport.addEventListener("focusout", onFocusOut);

    return () => {
      viewport.removeEventListener("mouseenter", pause);
      viewport.removeEventListener("mouseleave", play);
      viewport.removeEventListener("focusin", pause);
      viewport.removeEventListener("focusout", onFocusOut);
      tween.kill();
      observer?.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-labelledby="reviews-heading"
    >
      <span className={styles.shine} data-reviews="shine" aria-hidden="true" />
      <div className={`${layout.g} ${styles.copy}`}>
        <div className={layout.in}>
          <p className={styles.eyebrow} data-reviews="copy">
            {REVIEWS_CONTENT.eyebrow}
          </p>
          <h2 id="reviews-heading" className={styles.title} data-reviews="copy">
            {REVIEWS_CONTENT.titleBefore}{" "}
            <em className={styles.accent}>{REVIEWS_CONTENT.titleAccent}</em>
          </h2>
          <p className={styles.lead} data-reviews="copy">
            {REVIEWS_CONTENT.lead}
          </p>
        </div>
      </div>

      <div ref={viewportRef} className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          <ul className={styles.group}>
            {REVIEWS_CONTENT.items.map((item) => (
              <li key={item.id}>
                <ReviewCard item={item} />
              </li>
            ))}
          </ul>
          <ul className={styles.group} aria-hidden="true" inert>
            {REVIEWS_CONTENT.items.map((item) => (
              <li key={`loop-${item.id}`}>
                <ReviewCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={layout.g}>
        <div className={`${layout.in} ${styles.links}`} data-reviews="links">
          <a href={REVIEWS_CONTENT.href} target="_blank" rel="noopener noreferrer">
            {REVIEWS_CONTENT.readAll} →
          </a>
          <a href={REVIEWS_CONTENT.href} target="_blank" rel="noopener noreferrer">
            {REVIEWS_CONTENT.write} →
          </a>
        </div>
      </div>
    </section>
  );
}
