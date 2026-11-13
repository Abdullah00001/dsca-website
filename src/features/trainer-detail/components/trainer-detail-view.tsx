"use client";

import Link from "next/link";
import { PhotoHero } from "@/components/layout/photo-hero";
import { Tag, Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadCtaSection } from "@/features/home/components/lead-cta-section";
import { useCourses } from "@/features/courses/hooks";
import { useTrainerDetail } from "../hooks";
import styles from "../styles/trainer-detail-view.module.css";

export type TrainerDetailViewProps = {
  trainerId: string;
};

export function TrainerDetailView({ trainerId }: TrainerDetailViewProps) {
  const { trainer, isLoading, error } = useTrainerDetail(trainerId);
  const { courses } = useCourses();

  if (isLoading) {
    return (
      <div className="p-20 text-center font-display text-2xl font-bold">
        Loading instructor profile...
      </div>
    );
  }

  if (error || !trainer) {
    return (
      <div className="p-20 text-center text-coral font-display text-2xl font-bold">
        {error || "Instructor profile not found"}
      </div>
    );
  }

  const firstName = trainer.name.split(" ")[0];

  return (
    <div>
      <PhotoHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Trainers", href: "/trainers" },
          { label: trainer.name },
        ]}
        title={
          <>
            {trainer.name.replace(/(\S+)$/, "")}
            <em>{trainer.name.split(" ").slice(-1)[0]}</em>
          </>
        }
        subtitle={`${trainer.role} at Dhaka Specialty Coffee Academy`}
      >
        <div className="flex gap-4 items-center flex-wrap mt-6">
          <Tag variant="gold">{trainer.role}</Tag>
          <Button href={`/contact?trainer=${trainer.id}`} variant="ghost">
            Train with {firstName}
          </Button>
        </div>
      </PhotoHero>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.split}>
            <article className={styles.prose}>
              <h2>About {firstName}</h2>
              <p>{trainer.bio}</p>
              <p>
                Google reviewers describe DSCA trainers as knowledgeable,
                friendly, patient, and deeply supportive of every student&apos;s
                barista journey.
              </p>

              <h2>Teaching focus</h2>
              <ul>
                {trainer.focusAreas.map((focus, i) => (
                  <li key={i}>{focus}</li>
                ))}
              </ul>
            </article>

            <aside className={styles.sidebarCard}>
              <Eyebrow>Courses taught</Eyebrow>
              <div className="mt-4">
                {courses.slice(0, 4).map((c) => (
                  <Link
                    key={c.id}
                    href={`/courses/${c.id}`}
                    className={styles.courseItem}
                  >
                    <span>{c.name}</span>
                    <small>
                      {c.duration} · {c.price}
                    </small>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <LeadCtaSection />
    </div>
  );
}
