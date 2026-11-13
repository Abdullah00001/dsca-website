/**
 * @fileoverview Home View Coordinator Component
 * @module features/home/components/home-view
 */

"use client";

import { useHome } from "../hooks";
import { useCourses } from "@/features/courses/hooks";
import { useTrainers } from "@/features/trainers/hooks";
import type { AcademyStats } from "../types";
import { HeroSection } from "./hero-section";
import { CourseRecommender } from "./course-recommender";
import { CourseOverviewRows } from "./course-overview-rows";
import { TrainerPreviewTrack } from "./trainer-preview-track";
import { AcademyStatsSection } from "./academy-stats";
import { LeadCtaSection } from "./lead-cta-section";
import styles from "../styles/home-view.module.css";

const FALLBACK_STATS: AcademyStats = {
  rating: 4.9,
  totalReviews: 99,
  graduatesCount: 200,
  maxStudentsPerBatch: 12,
  isoStandard: "ISO 9001:2015",
};

export function HomeView() {
  const { data } = useHome();
  const { courses } = useCourses();
  const { trainers } = useTrainers();

  return (
    <div className={styles.page}>
      <HeroSection />
      <CourseRecommender />
      <CourseOverviewRows courses={courses} />
      <TrainerPreviewTrack trainers={trainers} />
      <AcademyStatsSection stats={data?.stats ?? FALLBACK_STATS} />
      <LeadCtaSection />
    </div>
  );
}
