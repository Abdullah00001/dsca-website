/**
 * @fileoverview Home map band — live embed + visit copy + Get Direction.
 * @module features/home/components/map-section
 */

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { MAP_CONTENT } from "@/features/home/lib/map-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/map-section.module.css";

/**
 * Live Google Map with visit copy and a single directions CTA.
 *
 * @returns Map section for the home page.
 */
export function MapSection() {
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

    const copy = root.querySelectorAll<HTMLElement>("[data-map='copy']");
    const accent = root.querySelector<HTMLElement>(`.${styles.accent}`);
    const frame = root.querySelector<HTMLElement>("[data-map='frame']");
    const panel = root.querySelector<HTMLElement>("[data-map='panel']");

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

      if (frame) {
        tl.from(
          frame,
          {
            opacity: 0,
            y: 28,
            duration: 0.65,
            ease: "power2.out",
            immediateRender: false,
            clearProps: "opacity,transform",
          },
          0.2,
        );
      }

      if (panel) {
        tl.from(
          panel,
          {
            opacity: 0,
            y: 28,
            duration: 0.65,
            ease: "power2.out",
            immediateRender: false,
            clearProps: "opacity,transform",
          },
          0.28,
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
      aria-labelledby="map-heading"
    >
      <div className={layout.g}>
        <div className={layout.in}>
          <h2 id="map-heading" className={styles.title} data-map="copy">
            {MAP_CONTENT.titleBefore}{" "}
            <em className={styles.accent}>{MAP_CONTENT.titleAccent}</em>
          </h2>

          <div className={styles.layout}>
            <div className={styles.mapFrame} data-map="frame">
              <iframe
                className={styles.iframe}
                src={MAP_CONTENT.embedSrc}
                title={MAP_CONTENT.embedTitle}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <aside className={styles.panel} data-map="panel">
              <p className={styles.eyebrow}>{MAP_CONTENT.panel.eyebrow}</p>
              <p className={styles.name}>{MAP_CONTENT.panel.name}</p>
              <p className={styles.details}>
                {MAP_CONTENT.panel.address}
                <br />
                Phone / WhatsApp:{" "}
                <a
                  className={styles.phone}
                  href={MAP_CONTENT.panel.phoneHref}
                >
                  {MAP_CONTENT.panel.phoneLabel}
                </a>
                <br />
                Open: {MAP_CONTENT.panel.hours}
              </p>
              <Button href={MAP_CONTENT.directionsHref} className={styles.cta}>
                {MAP_CONTENT.directionsLabel}
              </Button>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
