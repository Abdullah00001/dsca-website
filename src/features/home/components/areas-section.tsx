/**
 * @fileoverview Home Find Us areas band — reference section after the gallery.
 * @module features/home/components/areas-section
 */

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { AREAS_CONTENT } from "@/features/home/lib/areas-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/areas-section.module.css";

/**
 * Dark forest band listing every Dhaka area that trains at DSCA.
 *
 * @returns Areas section for the home page.
 */
export function AreasSection() {
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

    const copy = root.querySelectorAll<HTMLElement>("[data-areas='copy']");
    const accent = root.querySelector<HTMLElement>(`.${styles.accent}`);
    const cards = root.querySelectorAll<HTMLElement>("[data-areas='card']");
    const links = root.querySelector<HTMLElement>("[data-areas='links']");
    const shine = root.querySelector<HTMLElement>("[data-areas='shine']");

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

      if (cards.length > 0) {
        tl.from(
          cards,
          {
            opacity: 0,
            y: 22,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.out",
            immediateRender: false,
            clearProps: "opacity,transform",
          },
          0.22,
        );
      }

      if (links) {
        tl.from(
          links,
          { opacity: 0, y: 14, duration: 0.45, immediateRender: false },
          0.4,
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
      id="home-areas"
      className={styles.section}
      aria-labelledby="areas-heading"
    >
      <span className={styles.shine} data-areas="shine" aria-hidden="true" />
      <div className={`${layout.g} ${styles.inner}`}>
        <div className={layout.in}>
          <p className={styles.eyebrow} data-areas="copy">
            {AREAS_CONTENT.eyebrow}
          </p>
          <h2 id="areas-heading" className={styles.title} data-areas="copy">
            {AREAS_CONTENT.titleBefore}{" "}
            <em className={styles.accent}>{AREAS_CONTENT.titleAccent}</em>
          </h2>
          <p className={styles.lead} data-areas="copy">
            {AREAS_CONTENT.lead}
          </p>

          <ul className={styles.grid}>
            {AREAS_CONTENT.areas.map((area) => (
              <li key={area.id}>
                <Link
                  href={`/locations/${area.id}`}
                  className={styles.card}
                  data-areas="card"
                >
                  <span className={styles.copy}>
                    <b className={styles.name}>Barista Course in {area.name}</b>
                    <small className={styles.blurb}>{area.blurb}</small>
                  </span>
                  <i className={styles.arrow} aria-hidden="true">
                    →
                  </i>
                </Link>
              </li>
            ))}
          </ul>

          <p className={styles.footer} data-areas="links">
            <span>{AREAS_CONTENT.footerLead}</span>
            {AREAS_CONTENT.links.map((item, index) => (
              <span key={item.href} className={styles.footerItem}>
                {index > 0 ? <span aria-hidden="true"> | </span> : " "}
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
