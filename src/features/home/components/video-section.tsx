/**
 * @fileoverview Home training video — reference section after the map.
 * @module features/home/components/video-section
 */

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { VIDEO_CONTENT } from "@/features/home/lib/video-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/video-section.module.css";

/**
 * Dark forest band with a looping 16:9 training video.
 *
 * @returns Video section for the home page.
 */
export function VideoSection() {
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

    const copy = root.querySelectorAll<HTMLElement>("[data-video='copy']");
    const accent = root.querySelector<HTMLElement>(`.${styles.accent}`);
    const frame = root.querySelector<HTMLElement>("[data-video='frame']");
    const shine = root.querySelector<HTMLElement>("[data-video='shine']");

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
          0.05,
        );
      }

      if (frame) {
        tl.from(
          frame,
          {
            scale: 0.86,
            y: 72,
            clipPath: "inset(12% 8% round 36px)",
            duration: 1.05,
            ease: "power4.out",
            immediateRender: false,
          },
          0.18,
        );
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

    return () => {
      observer?.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-labelledby="video-heading"
    >
      <span className={styles.shine} data-video="shine" aria-hidden="true" />
      <div className={`${layout.g} ${styles.inner}`}>
        <div className={layout.in}>
          <h2 id="video-heading" className={styles.title} data-video="copy">
            <span className={styles.line}>{VIDEO_CONTENT.titleLine1}</span>
            <span className={styles.line}>
              {VIDEO_CONTENT.titleLine2}{" "}
              <em className={styles.accent}>{VIDEO_CONTENT.titleAccent}</em>
            </span>
          </h2>
          <p className={styles.lead} data-video="copy">
            {VIDEO_CONTENT.lead}
          </p>
          <div className={styles.frame} data-video="frame">
            <iframe
              className={styles.player}
              src={VIDEO_CONTENT.embedSrc}
              title={VIDEO_CONTENT.embedTitle}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
