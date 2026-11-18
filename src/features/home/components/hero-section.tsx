/**
 * @fileoverview Home hero band with looping timelapse background video.
 * @module features/home/components/hero-section
 */

"use client";

import { useEffect, useRef } from "react";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/hero-section.module.css";

/** Public path to the hero timelapse. */
const HERO_VIDEO_SRC = "/assets/hero-section-timelapse.mp4";

/**
 * Full-bleed forest hero. Background video loops infinitely (muted +
 * playsInline for autoplay). Pauses when the user prefers reduced motion.
 *
 * @returns Landmark hero section for the home page.
 */
export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    /**
     * Plays or pauses the timelapse based on reduced-motion preference.
     */
    function syncPlayback(): void {
      if (!video) {
        return;
      }
      if (reduce.matches) {
        video.pause();
        return;
      }
      void video.play().catch(() => {
        // Autoplay can fail before a user gesture; muted + playsInline usually works.
      });
    }

    syncPlayback();
    reduce.addEventListener("change", syncPlayback);
    return () => {
      reduce.removeEventListener("change", syncPlayback);
    };
  }, []);

  return (
    <header className={`${styles.hero} ${layout.g}`}>
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <div className={styles.scrim} aria-hidden="true" />
      <div className={`${styles.content} ${layout.in}`}>
        <p className={styles.eyebrow}>Dhaka Specialty Coffee Academy</p>
        <h1 className={styles.title}>Pour your craft.</h1>
      </div>
    </header>
  );
}
