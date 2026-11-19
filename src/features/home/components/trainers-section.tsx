/**
 * @fileoverview Home trainers band (reference `.tr-wrap` + `.track`).
 * @module features/home/components/trainers-section
 */

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { TRAINERS_CONTENT } from "@/features/home/lib/trainers-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/trainers-section.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * “Taught by people who pour daily” trainer cards after the courses band.
 *
 * @returns Trainers landmark for the home page.
 */
export function TrainersSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const intro = root.querySelectorAll<HTMLElement>(
      "[data-trainers-animate='copy']",
    );
    const accent = root.querySelector<HTMLElement>(`.${styles.accent}`);
    const shine = root.querySelector<HTMLElement>(
      "[data-trainers-animate='shine']",
    );
    const cards = [
      ...root.querySelectorAll<HTMLElement>(`.${styles.card}`),
    ];
    const photos = root.querySelectorAll<HTMLElement>(`.${styles.photo}`);
    const names = root.querySelectorAll<HTMLElement>(`.${styles.name}`);
    const roles = root.querySelectorAll<HTMLElement>(`.${styles.role}`);
    const cta = root.querySelector<HTMLElement>(
      "[data-trainers-animate='cta']",
    );

    const ctx = gsap.context(() => {
      gsap.set(cards, { transformOrigin: "50% 100%" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          once: true,
        },
      });

      if (intro.length > 0) {
        tl.from(
          intro,
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

      if (accent) {
        tl.from(
          accent,
          { scale: 0.9, y: 8, duration: 0.55, ease: "back.out(2.2)" },
          0.12,
        );
      }

      if (cta) {
        tl.from(
          cta,
          { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" },
          0.2,
        );
      }

      if (shine) {
        tl.fromTo(
          shine,
          { xPercent: -130, opacity: 0.55 },
          {
            xPercent: 130,
            opacity: 0,
            duration: 1.05,
            ease: "power2.inOut",
          },
          0.18,
        );
      }

      if (cards.length > 0) {
        tl.from(
          cards,
          {
            opacity: 0,
            y: 56,
            rotate: (i) => (i % 2 === 0 ? -3 : 3),
            scale: 0.94,
            duration: 0.8,
            stagger: 0.11,
            ease: "power3.out",
            clearProps: "transform",
          },
          0.28,
        );
      }

      if (photos.length > 0) {
        tl.from(
          photos,
          {
            scale: 1.12,
            duration: 1,
            stagger: 0.11,
            ease: "power2.out",
          },
          0.32,
        );
      }

      if (names.length > 0) {
        tl.from(
          names,
          {
            opacity: 0,
            y: 14,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.55,
        );
      }

      if (roles.length > 0) {
        tl.from(
          roles,
          {
            opacity: 0,
            y: 10,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.62,
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className={`${styles.section} ${layout.g}`}
      aria-labelledby="trainers-heading"
    >
      <span
        className={styles.shine}
        data-trainers-animate="shine"
        aria-hidden="true"
      />

      <div className={`${styles.inner} ${layout.in}`}>
        <div className={styles.head}>
          <p className={styles.eyebrow} data-trainers-animate="copy">
            {TRAINERS_CONTENT.eyebrow}
          </p>
          <h2
            id="trainers-heading"
            className={styles.title}
            data-trainers-animate="copy"
          >
            {TRAINERS_CONTENT.titleBefore}{" "}
            <span className={styles.accent}>
              {TRAINERS_CONTENT.titleAccent}
            </span>
          </h2>
          <div className={styles.cta} data-trainers-animate="cta">
            <Button href={TRAINERS_CONTENT.cta.href} variant="ghost">
              {TRAINERS_CONTENT.cta.label}
            </Button>
          </div>
          <p className={styles.lead} data-trainers-animate="copy">
            {TRAINERS_CONTENT.lead}
          </p>
        </div>
      </div>

      <div className={`${styles.track} ${layout.in}`} role="list">
        {TRAINERS_CONTENT.trainers.map((trainer) => (
          <Link
            key={trainer.id}
            href="/trainers"
            className={styles.card}
            role="listitem"
          >
            <div className={styles.photo}>
              <Image
                src={trainer.image}
                alt={`${trainer.name}, ${trainer.role}`}
                fill
                sizes="(max-width: 900px) 78vw, 25vw"
                className={styles.img}
              />
            </div>
            <div className={styles.copy}>
              <h3 className={styles.name}>{trainer.name}</h3>
              <small className={styles.role}>{trainer.role}</small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
