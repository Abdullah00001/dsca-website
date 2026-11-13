"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AcademyStats } from "@/features/home/types";
import styles from "./academy-stats.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type AcademyStatsSectionProps = {
  stats: AcademyStats;
};

export function AcademyStatsSection({ stats }: AcademyStatsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const n1Ref = useRef<HTMLElement>(null);
  const n2Ref = useRef<HTMLElement>(null);
  const n3Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const n1 = n1Ref.current;
    const n2 = n2Ref.current;
    const n3 = n3Ref.current;

    if (!n1 || !n2 || !n3) return;

    const ctx = gsap.context(() => {
      // Counter 1: Students trained
      const o1 = { val: 0 };
      ScrollTrigger.create({
        trigger: n1,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(o1, {
            val: stats.graduatesCount,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              n1.textContent = `${Math.round(o1.val)}+`;
            },
          });
        },
      });

      // Counter 2: Seats per batch
      const o2 = { val: 0 };
      ScrollTrigger.create({
        trigger: n2,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(o2, {
            val: stats.maxStudentsPerBatch,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              n2.textContent = String(Math.round(o2.val));
            },
          });
        },
      });

      // Counter 3: Rating
      const o3 = { val: 0 };
      ScrollTrigger.create({
        trigger: n3,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(o3, {
            val: stats.rating * 10,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              n3.textContent = (o3.val / 10).toFixed(1);
            },
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.proofGrid}>
          <div className={styles.statItem}>
            <b ref={n1Ref} className={styles.statValue}>
              {stats.graduatesCount}+
            </b>
            <span className={styles.statLabel}>students trained</span>
          </div>

          <div className={styles.statItem}>
            <b ref={n2Ref} className={styles.statValue}>
              {stats.maxStudentsPerBatch}
            </b>
            <span className={styles.statLabel}>seats per batch, never more</span>
          </div>

          <div className={styles.statItem}>
            <b ref={n3Ref} className={styles.statValue}>
              {stats.rating}
            </b>
            <span className={styles.statLabel}>
              Google rating, {stats.totalReviews} reviews
            </span>
          </div>

          <div className={styles.statItem}>
            <b className={styles.statValue}>ISO</b>
            <span className={styles.statLabel}>
              {stats.isoStandard} certified institute
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
