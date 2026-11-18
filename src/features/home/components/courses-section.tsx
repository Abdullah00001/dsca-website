/**
 * @fileoverview Home popular-courses band (reference dkband + `.rows` + peek).
 * @module features/home/components/courses-section
 */

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { COURSES_CONTENT } from "@/features/home/lib/courses-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/courses-section.module.css";

gsap.registerPlugin(ScrollTrigger);

const PEEK_W = 300;

/**
 * Dark “Barista Courses in Dhaka” list.
 * Desktop: gold hover + floating peek. Tablet/mobile: details left, image card right.
 *
 * @returns Courses landmark for the home page.
 */
export function CoursesSection() {
  const rootRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const intro = root.querySelectorAll<HTMLElement>("[data-courses-intro]");
    const rows = root.querySelectorAll<HTMLElement>(`.${styles.row}`);
    const cta = root.querySelector<HTMLElement>(`.${styles.cta}`);

    const ctx = gsap.context(() => {
      gsap.from(intro, {
        opacity: 0,
        y: 28,
        filter: "blur(10px)",
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(rows, {
        opacity: 0,
        y: 36,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          once: true,
        },
      });

      if (cta) {
        gsap.from(cta, {
          opacity: 0,
          y: 18,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cta,
            start: "top 92%",
            once: true,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const rowsEl = rowsRef.current;
    const peekEl = peekRef.current;
    if (!rowsEl || !peekEl) {
      return;
    }
    const peek = peekEl;

    const desktopPeek = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1025px)",
    );

    /** Whether the floating cursor peek is enabled. */
    function peekEnabled(): boolean {
      return desktopPeek.matches;
    }

    const qx = gsap.quickTo(peek, "x", { duration: 0.45, ease: "power3" });
    const qy = gsap.quickTo(peek, "y", { duration: 0.45, ease: "power3" });

    gsap.set(peek, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 0.6,
      rotate: -4,
    });

    let peekVisible = false;

    /**
     * Clamps peek center inside the viewport.
     *
     * @param clientX - Pointer X.
     * @param clientY - Pointer Y.
     * @returns Clamped center point.
     */
    function clampPeekPoint(
      clientX: number,
      clientY: number,
    ): { x: number; y: number } {
      const pad = 16;
      const h = PEEK_W * (5 / 4);
      const offsetX = Math.min(190, window.innerWidth * 0.18);
      let x = clientX + offsetX;
      let y = clientY;
      x = Math.max(
        pad + PEEK_W / 2,
        Math.min(window.innerWidth - pad - PEEK_W / 2, x),
      );
      y = Math.max(
        pad + h / 2,
        Math.min(window.innerHeight - pad - h / 2, y),
      );
      return { x, y };
    }

    /**
     * Fills floating peek from a course row.
     *
     * @param row - Active course row.
     */
    function fillPeek(row: HTMLElement): void {
      const index = Number(row.dataset.index ?? "0");
      const course = COURSES_CONTENT.courses[index];
      if (!course) {
        return;
      }
      peek.style.backgroundImage = `url(${course.image})`;
      peek.style.backgroundSize = "cover";
      peek.style.backgroundPosition = "center";
    }

    /**
     * Shows the floating peek near the pointer.
     *
     * @param clientX - Pointer X.
     * @param clientY - Pointer Y.
     * @param row - Course row.
     */
    function showPeek(
      clientX: number,
      clientY: number,
      row: HTMLElement,
    ): void {
      fillPeek(row);
      const { x, y } = clampPeekPoint(clientX, clientY);
      gsap.set(peek, {
        xPercent: -50,
        yPercent: -50,
        x,
        y,
      });
      gsap.to(peek, {
        opacity: 1,
        scale: 1,
        rotate: -4,
        duration: 0.4,
        ease: "back.out(2)",
        overwrite: "auto",
      });
      peekVisible = true;
    }

    /** Hides the floating peek. */
    function hidePeek(): void {
      if (!peekVisible) {
        return;
      }
      peekVisible = false;
      gsap.to(peek, {
        opacity: 0,
        scale: 0.6,
        duration: 0.28,
        overwrite: "auto",
      });
    }

    /**
     * Follows the cursor while peek is visible.
     *
     * @param clientX - Pointer X.
     * @param clientY - Pointer Y.
     */
    function movePeek(clientX: number, clientY: number): void {
      if (!peekVisible) {
        return;
      }
      const { x, y } = clampPeekPoint(clientX, clientY);
      qx(x);
      qy(y);
    }

    /**
     * Desktop enter row.
     *
     * @param e - Pointer event.
     */
    function onPointerOver(e: PointerEvent): void {
      if (!peekEnabled() || e.pointerType === "touch") {
        return;
      }
      const row = (e.target as Element | null)?.closest<HTMLElement>(
        `.${styles.row}`,
      );
      if (!row) {
        return;
      }
      showPeek(e.clientX, e.clientY, row);
    }

    /**
     * Desktop move.
     *
     * @param e - Pointer event.
     */
    function onPointerMove(e: PointerEvent): void {
      if (!peekEnabled() || e.pointerType === "touch") {
        return;
      }
      movePeek(e.clientX, e.clientY);
    }

    /** Desktop leave list. */
    function onPointerLeave(): void {
      if (!peekEnabled()) {
        return;
      }
      hidePeek();
    }

    /** Hide on scroll. */
    function onScroll(): void {
      hidePeek();
    }

    /** Capability / breakpoint change. */
    function onMediaChange(): void {
      hidePeek();
    }

    rowsEl.addEventListener("pointerover", onPointerOver);
    rowsEl.addEventListener("pointermove", onPointerMove);
    rowsEl.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    desktopPeek.addEventListener("change", onMediaChange);

    return () => {
      rowsEl.removeEventListener("pointerover", onPointerOver);
      rowsEl.removeEventListener("pointermove", onPointerMove);
      rowsEl.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      desktopPeek.removeEventListener("change", onMediaChange);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={`${styles.section} ${layout.g}`}
      aria-labelledby="courses-heading"
    >
      <div className={`${styles.inner} ${layout.in}`}>
        <p className={styles.eyebrow} data-courses-intro>
          {COURSES_CONTENT.eyebrow}
        </p>
        <h2 id="courses-heading" className={styles.title} data-courses-intro>
          {COURSES_CONTENT.titleBefore}{" "}
          <span className={styles.accent}>{COURSES_CONTENT.titleAccent}</span>
        </h2>
        <p className={styles.lead} data-courses-intro>
          {COURSES_CONTENT.lead}
        </p>

        <div ref={rowsRef} className={styles.rows} role="list">
          {COURSES_CONTENT.courses.map((course, index) => (
            <Link
              key={course.id}
              href={course.href}
              className={styles.row}
              role="listitem"
              data-index={index}
            >
              <div className={styles.body}>
                <span className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.copy}>
                  <h3 className={styles.name}>{course.name}</h3>
                  <small className={styles.best}>
                    Best for: {course.bestFor}
                  </small>
                </div>
                <span className={styles.meta}>
                  <span className={styles.duration}>{course.duration}</span>
                  <span className={styles.price}>{course.price}</span>
                </span>
              </div>

              <div
                className={styles.thumb}
                style={{ backgroundImage: `url(${course.image})` }}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>

        <div className={styles.cta}>
          <Button href={COURSES_CONTENT.cta.href}>
            {COURSES_CONTENT.cta.label}
          </Button>
        </div>
      </div>

      <div ref={peekRef} className={styles.peek} aria-hidden="true" />
    </section>
  );
}
