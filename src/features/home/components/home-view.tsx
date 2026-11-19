/**
 * @fileoverview Home view coordinator — composes home feature sections.
 * @module features/home/components/home-view
 */

"use client";

import { PageCta } from "@/components/ui/page-cta";
import { CoursesSection } from "@/features/home/components/courses-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { HomeMarquee } from "@/features/home/components/home-marquee";
import { IsoSection } from "@/features/home/components/iso-section";
import { OnboardSection } from "@/features/home/components/onboard-section";
import { ReviewsSection } from "@/features/home/components/reviews-section";
import { TrainersSection } from "@/features/home/components/trainers-section";
import { TrustSection } from "@/features/home/components/trust-section";
import { WhySection } from "@/features/home/components/why-section";
import { PAGE_CTA_VISIT } from "@/libs/page-cta";
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
      <IsoSection />
      <OnboardSection />
      <CoursesSection />
      <TrainersSection />
      <WhySection />
      <TrustSection />
      <ReviewsSection />
      <PageCta content={PAGE_CTA_VISIT} />
    </div>
  );
}
