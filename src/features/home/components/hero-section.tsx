"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Ticker } from "@/components/ui/ticker";
import { LatteCupArt } from "./latte-cup-art";
import styles from "./hero-section.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TICKER_ITEMS = [
  "ISO 9001:2015 Certified",
  "Max 12 per batch",
  "Job placement support",
  "Farmgate, Dhaka",
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const l1Ref = useRef<HTMLSpanElement>(null);
  const l3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const hero = heroRef.current;
    const l1 = l1Ref.current;
    const l3 = l3Ref.current;

    if (!hero || !l1 || !l3) return;

    const ctx = gsap.context(() => {
      gsap.to(l1, {
        xPercent: -8,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(l3, {
        xPercent: 7,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={heroRef} className={styles.heroWrapper}>
      <div className={styles.inner}>
        <h1 className={styles.heroTitle} data-hero>
          <span ref={l1Ref}>Pour</span>
          <span className={styles.line2}>
            <em className={styles.italicGold}>your</em> craft.
          </span>
          <span ref={l3Ref}>
            Pour it <em className={styles.italicGold}>well.</em>
          </span>
        </h1>

        <div className={styles.heroRow}>
          <div>
            <p className={styles.leadText}>
              Bangladesh&apos;s first ISO 9001:2015 certified barista academy. Real
              machines, twelve students a batch, and a certificate cafés across
              Dhaka recognise.
            </p>
            <div className={styles.buttons}>
              <Button href="/courses">Explore courses</Button>
              <Button href="/contact" variant="ghost">
                Free callback
              </Button>
            </div>
          </div>

          <div className={styles.locationInfo}>
            House 34/A, Indira Road, Farmgate
            <br />
            Open Sat to Fri, 9am to 9pm
            <br />
            <span className={styles.goldRating}>
              4.9 on Google · 99 reviews
            </span>
          </div>
        </div>
      </div>

      <LatteCupArt />

      <Ticker
        items={TICKER_ITEMS}
        variant="header"
        className={styles.heroTicker}
      />
    </header>
  );
}

