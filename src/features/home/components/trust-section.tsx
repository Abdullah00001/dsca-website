/**
 * @fileoverview Home trust band — four figures after Why DSCA.
 * @module features/home/components/trust-section
 */

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TRUST_CONTENT } from "@/features/home/lib/trust-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/trust-section.module.css";

/**
 * Splits a figure like `200+` or `4.9 ★` into a count target.
 * Word figures such as `ISO` return null.
 *
 * @param figure - Display figure.
 * @returns Count parts, or null when the figure is not numeric.
 */
function parseFigure(figure: string): {
  end: number;
  decimals: number;
  suffix: string;
} | null {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(figure);
  if (!match) {
    return null;
  }
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { end: Number(match[1]), decimals, suffix: match[2] };
}

/**
 * Dark forest band: headline plus the four reference figures.
 * Copy and stats reveal on scroll; numeric figures count up once.
 *
 * @returns Trust section for the home page.
 */
export function TrustSection() {
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

    const copy = root.querySelectorAll<HTMLElement>("[data-trust='copy']");
    const accent = root.querySelector<HTMLElement>(`.${styles.accent}`);
    const stats = root.querySelectorAll<HTMLElement>("[data-trust='stat']");
    const figures = root.querySelectorAll<HTMLElement>("[data-trust='figure']");
    const shine = root.querySelector<HTMLElement>("[data-trust='shine']");

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

      if (stats.length > 0) {
        tl.from(
          stats,
          {
            opacity: 0,
            y: 22,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            immediateRender: false,
          },
          0.22,
        );
      }

      figures.forEach((figure, index) => {
        const parsed = parseFigure(figure.dataset.figure ?? "");
        if (!parsed) {
          return;
        }
        const counter = { n: 0 };
        tl.to(
          counter,
          {
            n: parsed.end,
            duration: 1.05,
            ease: "power2.out",
            onUpdate: () => {
              figure.textContent =
                counter.n.toFixed(parsed.decimals) + parsed.suffix;
            },
            onComplete: () => {
              if (figure.dataset.figure) {
                figure.textContent = figure.dataset.figure;
              }
            },
          },
          0.22 + index * 0.08,
        );
      });

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
      figures.forEach((figure) => {
        if (figure.dataset.figure) {
          figure.textContent = figure.dataset.figure;
        }
      });
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={`${styles.section} ${layout.g}`}
      aria-labelledby="trust-heading"
    >
      <span className={styles.shine} data-trust="shine" aria-hidden="true" />
      <div className={`${styles.inner} ${layout.in}`}>
        <h2 id="trust-heading" className={styles.title} data-trust="copy">
          {TRUST_CONTENT.titleBefore}{" "}
          <em className={styles.accent}>{TRUST_CONTENT.titleAccent}</em>
        </h2>
        <ul className={styles.stats}>
          {TRUST_CONTENT.stats.map((stat) => (
            <li key={stat.id} className={styles.stat} data-trust="stat">
              <div className={styles.value} data-trust="figure" data-figure={stat.figure}>
                {stat.figure}
              </div>
              <div className={styles.label}>{stat.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
