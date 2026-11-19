/**
 * @fileoverview Trainers listing page (linked from the home trainers band).
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TRAINERS_CONTENT } from "@/features/home/lib/trainers-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/trainers-section.module.css";

export const metadata: Metadata = {
  title: "Trainers | DSCA Barista Academy Dhaka",
  description:
    "Meet the practicing coffee professionals who teach DSCA barista courses in Farmgate, Dhaka.",
};

/**
 * Trainers index — portraits and roles from the home band content.
 *
 * @returns Trainers page.
 */
export default function TrainersPage() {
  return (
    <main className={`${styles.section} ${layout.g}`}>
      <div className={`${styles.inner} ${layout.in}`}>
        <p className={styles.eyebrow}>{TRAINERS_CONTENT.eyebrow}</p>
        <h1 className={styles.title}>
          {TRAINERS_CONTENT.titleBefore}{" "}
          <span className={styles.accent}>{TRAINERS_CONTENT.titleAccent}</span>
        </h1>
        <p className={styles.lead} style={{ marginBottom: 48 }}>
          {TRAINERS_CONTENT.lead}
        </p>
      </div>
      <div className={`${styles.track} ${layout.in}`} role="list">
        {TRAINERS_CONTENT.trainers.map((trainer) => (
          <article key={trainer.id} className={styles.card} role="listitem">
            <div className={styles.photo}>
              <Image
                src={trainer.image}
                alt={`${trainer.name}, ${trainer.role}`}
                fill
                sizes="(max-width: 900px) 78vw, 25vw"
                className={styles.img}
              />
            </div>
            <div className={styles.copy}>
              <h2 className={styles.name}>{trainer.name}</h2>
              <small className={styles.role}>{trainer.role}</small>
              <p className={styles.role} style={{ marginTop: 14 }}>
                {trainer.bio}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className={`${layout.in}`} style={{ marginTop: 48 }}>
        <Link href="/">← Back home</Link>
      </div>
    </main>
  );
}
