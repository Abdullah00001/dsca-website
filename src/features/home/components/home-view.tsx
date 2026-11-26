/**
 * @fileoverview Home view coordinator — composes home feature sections.
 * @module features/home/components/home-view
 */

"use client";

import { PageCta } from "@/components/ui/page-cta";
import { CoursesSection } from "@/features/home/components/courses-section";
import { AreasSection } from "@/features/home/components/areas-section";
import { GallerySection } from "@/features/home/components/gallery-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { HomeMarquee } from "@/features/home/components/home-marquee";
import { IsoSection } from "@/features/home/components/iso-section";
import { MapSection } from "@/features/home/components/map-section";
import { VideoSection } from "@/features/home/components/video-section";
import { BlogSection } from "@/features/home/components/blog-section";
import { EnrolSection } from "@/features/home/components/enrol-section";
import { OnboardSection } from "@/features/home/components/onboard-section";
import { ReviewsSection } from "@/features/home/components/reviews-section";
import { TrainersSection } from "@/features/home/components/trainers-section";
import { TrustSection } from "@/features/home/components/trust-section";
import { WhySection } from "@/features/home/components/why-section";
import { enableHomeScrollTriggerStability } from "@/features/home/lib/home-utils";
import { PAGE_CTA_ENROLL } from "@/libs/page-cta";
import styles from "@/features/home/styles/home-view.module.css";

// Before child ScrollTriggers mount — skip pin refresh on URL-bar height changes.
if (typeof window !== "undefined") {
  enableHomeScrollTriggerStability();
}

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
      <GallerySection />
      <AreasSection />
      <MapSection />
      <VideoSection />
      <BlogSection />
      <EnrolSection />
      <PageCta content={PAGE_CTA_ENROLL} />
    </div>
  );
}
