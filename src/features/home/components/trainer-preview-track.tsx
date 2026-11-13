"use client";

import Image from "next/image";
import { Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardPhoto, CardContent } from "@/components/ui/card";
import type { Trainer } from "@/features/trainers/types";
import styles from "./trainer-preview-track.module.css";

export type TrainerPreviewTrackProps = {
  trainers: Trainer[];
};

export function TrainerPreviewTrack({ trainers }: TrainerPreviewTrackProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <Eyebrow>Practicing professionals</Eyebrow>
            <h2 className={styles.heading}>
              Taught by people who <em>pour daily.</em>
            </h2>
          </div>
          <Button href="/trainers" variant="line">
            Meet the team
          </Button>
        </div>

        <div className={styles.track} data-track>
          {trainers.map((trainer) => (
            <Card
              key={trainer.id}
              href={`/trainers/${trainer.id}`}
              className={styles.trainerCard}
            >
              <CardPhoto className={styles.portrait}>
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  sizes="(max-width: 900px) 78vw, 25vw"
                  className="object-cover"
                />
              </CardPhoto>
              <CardContent>
                <h3 className={styles.trainerName}>{trainer.name}</h3>
                <small className={styles.trainerRole}>{trainer.role}</small>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

