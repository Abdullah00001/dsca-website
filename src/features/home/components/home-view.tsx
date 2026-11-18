/**
 * @fileoverview Home view coordinator — composes home feature sections.
 * @module features/home/components/home-view
 */

"use client";

import { HeroSection } from "@/features/home/components/hero-section";
import { HomeMarquee } from "@/features/home/components/home-marquee";
import styles from "@/features/home/styles/home-view.module.css";

/**
 * Home landing composition. Additional sections mount beneath the hero
 * as the feature grows.
 *
 * @returns Home page view.
 */
export function HomeView() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <HomeMarquee />
    </div>
  );
}
