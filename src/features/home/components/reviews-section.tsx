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

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

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
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="reviews-heading">
      <div className={layout.g}>
        <div className={layout.in}>
          <p className={styles.eyebrow}>{REVIEWS_CONTENT.eyebrow}</p>
          <h2 id="reviews-heading" className={styles.title}>
            {REVIEWS_CONTENT.titleBefore}{" "}
            <em className={styles.accent}>{REVIEWS_CONTENT.titleAccent}</em>
          </h2>
          <p className={styles.lead}>{REVIEWS_CONTENT.lead}</p>
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
        <div className={`${layout.in} ${styles.links}`}>
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
