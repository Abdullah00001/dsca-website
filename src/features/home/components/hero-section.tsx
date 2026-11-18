/**
 * @fileoverview Home hero: video band, attachment layout, Oryzo-style pin scroll.
 * @module features/home/components/hero-section
 */

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  HERO_CONTENT,
  HERO_LOGO_DOCK_AT,
  HERO_LOGO_SIZE,
  HERO_LOGO_SRC,
  HERO_VIDEO_SRC,
} from "@/features/home/lib/hero-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/hero-section.module.css";

gsap.registerPlugin(ScrollTrigger);

const HEADER_LOGO_ID = "dsca-header-logo";

/**
 * Hero mark image shared by the start slot and flying logo.
 *
 * @returns Optimized hero logo image.
 */
function HeroLogoMark() {
  return (
    <Image
      src={HERO_LOGO_SRC}
      alt="Dhaka Specialty Coffee Academy"
      width={HERO_LOGO_SIZE.width}
      height={HERO_LOGO_SIZE.height}
      priority
      className={styles.flyerLogo}
    />
  );
}

/**
 * Full-bleed hero with left logo + glass location card, right course CTA,
 * and a scrubbed logo flight into the site header (white pill morphs in).
 *
 * @returns Landmark hero section for the home page.
 */
export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const startSlotRef = useRef<HTMLDivElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLParagraphElement>(null);

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

  useEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    const overlay = overlayRef.current;
    const startSlot = startSlotRef.current;
    const flyer = flyerRef.current;
    const scrollHint = scrollHintRef.current;
    const headerLogo = document.getElementById(HEADER_LOGO_ID);

    if (!root || !media || !overlay || !startSlot || !flyer || !headerLogo) {
      return;
    }

    const html = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      html.dataset.heroLogo = "docked";
      return () => {
        delete html.dataset.heroLogo;
      };
    }

    html.dataset.heroLogo = "flying";

    /**
     * Matches flyer width to the start-slot so scale math stays 1:1.
     */
    const sizeFlyer = (): void => {
      flyer.style.width = `${startSlot.offsetWidth}px`;
    };

    sizeFlyer();

    const wipeEls = root.querySelectorAll<HTMLElement>(`.${styles.wipe}`);
    const blurEls = root.querySelectorAll<HTMLElement>(`.${styles.blurLine}`);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onRefreshInit: sizeFlyer,
          onUpdate: (self) => {
            const docked = self.progress >= HERO_LOGO_DOCK_AT;
            gsap.set(flyer, { opacity: docked ? 0 : 1 });
            html.dataset.heroLogo = docked ? "docked" : "flying";
          },
        },
      });

      tl.fromTo(
        flyer,
        {
          x: () => startSlot.getBoundingClientRect().left,
          y: () => startSlot.getBoundingClientRect().top,
          scale: 1,
          opacity: 1,
        },
        {
          x: () => headerLogo.getBoundingClientRect().left,
          y: () => headerLogo.getBoundingClientRect().top,
          scale: () =>
            headerLogo.getBoundingClientRect().width / startSlot.offsetWidth,
          duration: HERO_LOGO_DOCK_AT,
          ease: "power3.inOut",
          immediateRender: true,
        },
        0,
      );

      gsap.set(flyer, {
        backgroundColor: "rgba(255,255,255,0)",
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        boxShadow: "0 0 0 0 rgba(0,0,0,0)",
      });
      tl.to(
        flyer,
        {
          backgroundColor: "rgba(255,255,255,1)",
          paddingTop: 6,
          paddingRight: 16,
          paddingBottom: 6,
          paddingLeft: 16,
          boxShadow: "0 14px 30px -14px rgba(0,0,0,0.5)",
          duration: 0.45,
          ease: "power2.in",
        },
        0.32,
      );

      if (wipeEls.length > 0) {
        tl.fromTo(
          wipeEls,
          { clipPath: "inset(0% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.35,
            stagger: 0.1,
            ease: "power2.inOut",
          },
          0.05,
        );
      }

      if (blurEls.length > 0) {
        tl.fromTo(
          blurEls,
          { opacity: 1, filter: "blur(0px)" },
          {
            opacity: 0,
            filter: "blur(12px)",
            duration: 0.4,
            stagger: 0.08,
            ease: "power1.inOut",
          },
          0.1,
        );
      }

      if (scrollHint) {
        tl.to(scrollHint, { opacity: 0, duration: 0.12 }, 0);
      }

      tl.to(media, { filter: "blur(6px)", scale: 1.06, duration: 1 }, 0);
      tl.to(overlay, { opacity: 1, duration: 1, ease: "power1.in" }, 0);
    }, root);

    return () => {
      ctx.revert();
      delete html.dataset.heroLogo;
    };
  }, []);

  return (
    <>
      <section
        ref={rootRef}
        className={styles.hero}
        aria-labelledby="hero-heading"
      >
        <div ref={mediaRef} className={styles.media}>
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
        </div>
        <div className={styles.scrim} aria-hidden="true" />
        <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />

        <div className={`${styles.stage} ${layout.g}`}>
          <div className={`${styles.inner} ${layout.in}`}>
            <div className={styles.leftCol}>
              <div
                ref={startSlotRef}
                className={styles.startSlot}
                aria-hidden="true"
              >
                <div className={styles.startLogo}>
                  <HeroLogoMark />
                </div>
              </div>

              <Link
                href={HERO_CONTENT.location.href}
                className={`${styles.locationCard} ${styles.wipe}`}
              >
                <span className={styles.locationCopy}>
                  {HERO_CONTENT.location.lines.map((line) => (
                    <span key={line} className={styles.locationLine}>
                      {line}
                    </span>
                  ))}
                </span>
                <span className={styles.locationArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className={styles.copy}>
              <p className={`${styles.eyebrow} ${styles.blurLine}`}>
                {HERO_CONTENT.eyebrow}
              </p>
              <h1 id="hero-heading" className={styles.headline}>
                <span className={`${styles.headlineRow} ${styles.blurLine}`}>
                  {HERO_CONTENT.title.line1}
                </span>
                <span className={`${styles.headlineRow} ${styles.blurLine}`}>
                  {HERO_CONTENT.title.line2Lead}{" "}
                  <span className={styles.accent}>
                    {HERO_CONTENT.title.line2Accent}
                  </span>
                </span>
                <span className={`${styles.headlineRow} ${styles.blurLine}`}>
                  {HERO_CONTENT.title.line3Lead}{" "}
                  <span className={styles.accent}>
                    {HERO_CONTENT.title.line3Accent}
                  </span>
                </span>
              </h1>
              <p className={`${styles.subhead} ${styles.blurLine}`}>
                {HERO_CONTENT.subhead}
              </p>
              <p className={`${styles.description} ${styles.blurLine}`}>
                {HERO_CONTENT.description}
              </p>
              <div className={`${styles.actions} ${styles.blurLine}`}>
                <Button href={HERO_CONTENT.primary.href}>
                  {HERO_CONTENT.primary.label}
                </Button>
                <Button href={HERO_CONTENT.secondary.href} variant="ghost">
                  {HERO_CONTENT.secondary.label}
                </Button>
              </div>
            </div>

            <p ref={scrollHintRef} className={styles.scrollHint}>
              {HERO_CONTENT.scrollHint}
            </p>
          </div>
        </div>
      </section>

      <div ref={flyerRef} className={styles.flyer} aria-hidden="true">
        <HeroLogoMark />
      </div>
    </>
  );
}
