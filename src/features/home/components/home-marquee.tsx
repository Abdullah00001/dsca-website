/**
 * @fileoverview Home page ticker — DSCA reference `.tick` + `[data-mq]` GSAP loop.
 * @module features/home/components/home-marquee
 */

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HOME_MARQUEE_ITEMS } from "@/features/home/lib/marquee-content";
import styles from "@/features/home/components/home-marquee.module.css";

/**
 * One item + gold ✦ separator (reference `ticker` word map).
 *
 * @param props - Word label.
 * @returns Marquee item span.
 */
function MarqueeItem({ word }: { word: string }) {
  return (
    <span className={styles.item}>
      <span>{word}</span>
      <b className={styles.star} aria-hidden="true">
        ✦
      </b>
    </span>
  );
}

/**
 * Renders one full word cycle.
 *
 * @param keyPrefix - React key prefix for a duplicated cycle.
 * @returns Cycle of marquee items.
 */
function MarqueeCycle({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {HOME_MARQUEE_ITEMS.map((word) => (
        <MarqueeItem key={`${keyPrefix}-${word}`} word={word} />
      ))}
    </>
  );
}

/**
 * Full-bleed home ticker. Mirrors reference `ticker([...],'a')` markup and the
 * `[data-mq]` GSAP `xPercent` loop (duplicate to fill viewport, scroll -50%).
 *
 * @returns Accessible-hidden marquee strip for the home page.
 */
export function HomeMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      return;
    }

    let tween: gsap.core.Tween | null = null;
    let baseHtml = "";

    /**
     * Rebuilds duplicated strip and restarts the infinite scroll.
     * Same math as reference: `need / scrollWidth` → `base.repeat(n * 2)`.
     */
    const setup = (): void => {
      tween?.kill();
      gsap.set(track, { xPercent: 0 });

      if (!baseHtml) {
        baseHtml = track.innerHTML;
      }
      track.innerHTML = baseHtml;

      const width = track.scrollWidth || 600;
      const need = Math.max(window.innerWidth, window.screen.width || 0) * 1.4;
      const n = Math.max(1, Math.ceil(need / width));
      track.innerHTML = baseHtml.repeat(n * 2);

      tween = gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -50,
          // Slower than the reference base (18) — longer = calmer crawl
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
    <div className={styles.tick} aria-hidden="true">
      {/* Reference ticker seeds `s + s` before JS fills further copies */}
      <div ref={trackRef} className={styles.track} data-mq="a">
        <MarqueeCycle keyPrefix="a" />
        <MarqueeCycle keyPrefix="b" />
      </div>
    </div>
  );
}
