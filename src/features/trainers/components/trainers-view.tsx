"use client";

import Image from "next/image";
import { PhotoHero } from "@/components/layout/photo-hero";
import { Ticker } from "@/components/ui/ticker";
import { Tag } from "@/components/ui/badge";
import { Card, CardPhoto } from "@/components/ui/card";
import { LeadCtaSection } from "@/features/home/components/lead-cta-section";
import { useTrainers } from "../hooks";
import styles from "../styles/trainers-view.module.css";

const TRAINER_TICKER_ITEMS = [
  "Show it",
  "Then do it",
  "Taste",
  "Adjust",
  "Repeat",
];

export function TrainersView() {
  const { trainers, isLoading } = useTrainers();

  return (
    <div>
      <PhotoHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Trainers" }]}
        title={
          <>
            Dhaka&apos;s <em>practicing</em> coffee pros
          </>
        }
        subtitle="Every DSCA course is led by people who work with coffee every day, not classroom lecturers."
      >
        <Ticker items={TRAINER_TICKER_ITEMS} variant="header" className="mt-8" />
      </PhotoHero>

      <section className={styles.section}>
        <div className={styles.inner}>
          {isLoading ? (
            <p>Loading trainer roster...</p>
          ) : (
            <div className={styles.grid}>
              {trainers.map((trainer) => (
                <Card
                  key={trainer.id}
                  href={`/trainers/${trainer.id}`}
                  className={styles.card}
                >
                  <CardPhoto className={styles.portrait}>
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </CardPhoto>
                  <div className={styles.content}>
                    <Tag variant="mint" className="self-start">
                      {trainer.role}
                    </Tag>
                    <h3 className={styles.name}>{trainer.name}</h3>
                    <p className={styles.bio}>
                      {trainer.bio.slice(0, 140)}...
                    </p>
                    <b className={styles.viewProfile}>View profile →</b>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <LeadCtaSection />
    </div>
  );
}
