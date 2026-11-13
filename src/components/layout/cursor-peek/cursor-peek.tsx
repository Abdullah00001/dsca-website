"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { create } from "zustand";
import clsx from "clsx";
import styles from "./cursor-peek.module.css";

type PeekState = {
  active: boolean;
  title: string;
  duration: string;
  image: string;
  gradient?: string;
  showPeek: (data: {
    title: string;
    duration: string;
    image: string;
    gradient?: string;
  }) => void;
  hidePeek: () => void;
};

export const usePeekStore = create<PeekState>((set) => ({
  active: false,
  title: "",
  duration: "",
  image: "",
  gradient: "",
  showPeek: (data) => set({ ...data, active: true }),
  hidePeek: () => set({ active: false }),
}));

export function CursorPeek() {
  const peekRef = useRef<HTMLDivElement>(null);
  const { active, title, duration, image, gradient } = usePeekStore();

  useEffect(() => {
    const el = peekRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const qx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const qy = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

    function handlePointerMove(e: PointerEvent) {
      qx(e.clientX + 190);
      qy(e.clientY);
    }

    function handleScroll() {
      gsap.to(el, { opacity: 0, duration: 0.2, overwrite: "auto" });
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const el = peekRef.current;
    if (!el) return;

    if (active) {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        rotate: -4,
        duration: 0.45,
        ease: "back.out(2)",
        overwrite: "auto",
      });
    } else {
      gsap.to(el, {
        opacity: 0,
        scale: 0.6,
        duration: 0.3,
        overwrite: "auto",
      });
    }
  }, [active]);

  const bgStyle = image
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.7)), url(${image})`,
      }
    : undefined;

  return (
    <div
      ref={peekRef}
      id="peek"
      className={clsx(styles.peek, gradient)}
      style={bgStyle}
      aria-hidden="true"
    >
      <span id="pk1" className={styles.duration}>
        {duration}
      </span>
      <b id="pk2" className={styles.title}>
        {title}
      </b>
    </div>
  );
}

