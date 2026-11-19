/**
 * @fileoverview Reusable page-end CTA band (reference `cta()` / `.last` + `.mq`).
 * @module components/ui/page-cta
 */

"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  PAGE_CTA_MARQUEE_ITEMS,
  PAGE_CTA_VISIT,
  type PageCtaContent,
} from "@/libs/page-cta";
import layout from "@/styles/layout.module.css";
import styles from "@/components/ui/page-cta/page-cta.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for {@link PageCta}.
 */
export interface PageCtaProps {
  /**
   * Band copy. Defaults to the trainers “Meet them in person” preset.
   */
  content?: PageCtaContent;
  /** Optional class name on the section. */
  className?: string;
}

/**
 * One marquee word + gold ✦ (reference `.mq span` / `b`).
 *
 * @param props - Word label.
 * @returns Marquee item.
 */
function MqItem({ word }: { word: string }) {
  return (
    <span className={styles.mqItem}>
      <span>{word}</span>
      <b className={styles.mqStar} aria-hidden="true">
        ✦
      </b>
    </span>
  );
}

/**
 * One full word cycle for the CTA marquee.
 *
 * @param props - React key prefix.
 * @returns Cycle of marquee items.
 */
function MqCycle({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {PAGE_CTA_MARQUEE_ITEMS.map((word) => (
        <MqItem key={`${keyPrefix}-${word}`} word={word} />
      ))}
    </>
  );
}

/**
 * Centered teal CTA used before the footer on listing / detail pages.
 *
 * Mirrors reference `cta()`:
 * `section.last` + trailing `.mq[data-mq=r]` gold ticker.
 *
 * @param props - Optional content override.
 * @returns Page-end CTA landmark + marquee.
 */
export function PageCta({
  content = PAGE_CTA_VISIT,
  className,
}: PageCtaProps) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingId = useId();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const eyebrow = root.querySelector<HTMLElement>(
      `[data-page-cta="eyebrow"]`,
    );
    const title = root.querySelector<HTMLElement>(`[data-page-cta="title"]`);
    const accent = root.querySelector<HTMLElement>(`.${styles.accent}`);
    const body = root.querySelector<HTMLElement>(`[data-page-cta="body"]`);
    const action = root.querySelector<HTMLElement>(`[data-page-cta="action"]`);
    const shine = root.querySelector<HTMLElement>(`[data-page-cta="shine"]`);

    const ctx = gsap.context(() => {
      if (title) {
        gsap.set(title, { transformOrigin: "50% 50%" });
        gsap.fromTo(
          title,
          { scale: 0.85 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: title,
              start: "top bottom",
              end: "center center",
              scrub: true,
            },
          },
        );
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
        },
      });

      if (eyebrow) {
        tl.from(
          eyebrow,
          {
            opacity: 0,
            y: 18,
            filter: "blur(6px)",
            duration: 0.55,
          },
          0,
        );
      }

      if (title) {
        tl.from(
          title,
          {
            opacity: 0,
            y: 36,
            filter: "blur(10px)",
            duration: 0.85,
          },
          0.08,
        );
      }

      if (accent) {
        tl.from(
          accent,
          {
            scale: 0.88,
            y: 10,
            duration: 0.6,
            ease: "back.out(2.2)",
          },
          0.22,
        );
      }

      if (shine) {
        tl.fromTo(
          shine,
          { xPercent: -130, opacity: 0.5 },
          {
            xPercent: 130,
            opacity: 0,
            duration: 1.1,
            ease: "power2.inOut",
          },
          0.2,
        );
      }

      if (body) {
        tl.from(
          body,
          {
            opacity: 0,
            y: 20,
            filter: "blur(6px)",
            duration: 0.55,
          },
          0.32,
        );
      }

      if (action) {
        tl.from(
          action,
          {
            opacity: 0,
            y: 22,
            scale: 0.94,
            duration: 0.6,
            ease: "back.out(1.6)",
          },
          0.42,
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let tween: gsap.core.Tween | null = null;
    let baseHtml = "";

    /**
     * Reference `[data-mq=r]` — reverse infinite crawl.
     */
    const setup = (): void => {
      tween?.kill();
      gsap.set(track, { xPercent: -50 });

      if (!baseHtml) {
        baseHtml = track.innerHTML;
      }
      track.innerHTML = baseHtml;

      const width = track.scrollWidth || 600;
      const need = Math.max(window.innerWidth, window.screen.width || 0) * 1.4;
      const n = Math.max(1, Math.ceil(need / width));
      track.innerHTML = baseHtml.repeat(n * 2);

      // Reverse: -50 → 0 (reference `data-mq="r"`).
      // Same pace as hero `HomeMarquee` (`78 * n`).
      tween = gsap.fromTo(
        track,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 78 * n,
          ease: "none",
          repeat: -1,
        },
      );
    };

    setup();

    let resizeTimer = 0;
    const onResize = (): void => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 150);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      tween?.kill();
    };
  }, []);

  return (
    <>
      <section
        ref={rootRef}
        className={[styles.section, layout.g, className]
          .filter(Boolean)
          .join(" ")}
        aria-labelledby={headingId}
      >
        <span
          className={styles.shine}
          data-page-cta="shine"
          aria-hidden="true"
        />
        <div className={`${styles.inner} ${layout.in}`}>
          <p className={styles.eyebrow} data-page-cta="eyebrow">
            {content.eyebrow}
          </p>
          <h2 id={headingId} className={styles.title} data-page-cta="title">
            {content.titleBefore}{" "}
            <span className={styles.accent}>{content.titleAccent}</span>
          </h2>
          <p className={styles.body} data-page-cta="body">
            {content.body}
          </p>
          <div className={styles.action} data-page-cta="action">
            <Button href={content.cta.href} size="big">
              {content.cta.label}
            </Button>
          </div>
        </div>
      </section>

      <div className={styles.mq} aria-hidden="true">
        <div ref={trackRef} className={styles.mqTrack} data-mq="r">
          <MqCycle keyPrefix="a" />
          <MqCycle keyPrefix="b" />
        </div>
      </div>
    </>
  );
}
