/**
 * @fileoverview Home ISO certification band (reference section after marquee).
 * @module features/home/components/iso-section
 */

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ISO_CONTENT } from "@/features/home/lib/iso-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/iso-section.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Dark forest “Certification & Quality” band with one paragraph and certificate art.
 * Scroll-triggered GSAP reveals keep the layout intact.
 *
 * @returns ISO section for the home page.
 */
export function IsoSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const copyItems = root.querySelectorAll<HTMLElement>(
      `[data-iso-animate="copy"]`,
    );
    const paper = root.querySelector<HTMLElement>(`[data-iso-animate="paper"]`);
    const shine = root.querySelector<HTMLElement>(`[data-iso-animate="shine"]`);
    const cta = root.querySelector<HTMLElement>(`[data-iso-animate="cta"]`);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          once: true,
        },
      });

      if (copyItems.length > 0) {
        tl.from(
          copyItems,
          {
            opacity: 0,
            y: 28,
            filter: "blur(8px)",
            duration: 0.7,
            stagger: 0.1,
          },
          0,
        );
      }

      if (cta) {
        tl.from(
          cta,
          { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" },
          0.55,
        );
      }

      if (paper) {
        // One-shot entrance — settles into the static 2° tilt (no loop float)
        tl.from(
          paper,
          {
            opacity: 0,
            y: 40,
            rotate: 6,
            scale: 0.96,
            duration: 0.9,
            ease: "power3.out",
          },
          0.12,
        );
      }

      if (shine) {
        tl.fromTo(
          shine,
          { xPercent: -130 },
          { xPercent: 130, duration: 1.05, ease: "power2.inOut" },
          0.42,
        );
      }
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={`${styles.section} ${layout.g}`}
      aria-labelledby="iso-heading"
    >
      <div className={`${styles.inner} ${layout.in}`}>
        <div className={styles.copyCol}>
          <p className={styles.eyebrow} data-iso-animate="copy">
            {ISO_CONTENT.eyebrow}
          </p>
          <h2
            id="iso-heading"
            className={styles.title}
            data-iso-animate="copy"
          >
            {ISO_CONTENT.titleBefore}{" "}
            <span className={styles.accent}>{ISO_CONTENT.titleAccent}</span>
          </h2>
          <p className={styles.lead} data-iso-animate="copy">
            {ISO_CONTENT.lead}
          </p>
          <div data-iso-animate="cta">
            <Button href={ISO_CONTENT.cta.href}>{ISO_CONTENT.cta.label}</Button>
          </div>
        </div>

        <div className={styles.mediaCol}>
          <div className={styles.paper} data-iso-animate="paper">
            <span
              className={styles.paperShine}
              data-iso-animate="shine"
              aria-hidden="true"
            />
            <Image
              src={ISO_CONTENT.certImage.src}
              alt={ISO_CONTENT.certImage.alt}
              width={500}
              height={647}
              className={styles.certImg}
              sizes="(max-width: 900px) 90vw, 360px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
