/**
 * @fileoverview Trainers index (reference `pages.trainers`).
 */

import Image from "next/image";
import Link from "next/link";
import { PageCta } from "@/components/ui/page-cta";
import { PAGE_CTA_VISIT } from "@/libs/page-cta";
import { PageHero } from "@/components/page/page-hero";
import { PagesShell } from "@/components/page/pages-shell";
import styles from "@/components/page/pages.module.css";
import { PHOTO, TRAINER_IMAGE, TRAINERS } from "../lib";
import layout from "@/styles/layout.module.css";

const TAG = [styles.tagGold, styles.tagMint, styles.tagPeach, styles.tagGold];

const TEACH = [
  { title: "Show", body: "Your trainer demonstrates each technique once.", tone: styles.gold },
  { title: "Do", body: "You repeat it on the machine until it feels natural.", tone: styles.mint },
  { title: "Taste", body: "Honest feedback in groups of twelve or fewer, every session.", tone: styles.ink },
] as const;

/**
 * Trainer directory and teaching method band.
 *
 * @returns Trainers page.
 */
export function TrainersView() {
  return (
    <PagesShell>
      <PageHero
        photo={PHOTO.staff2}
        crumbs={[{ label: "Home", href: "/" }, { label: "Trainers" }]}
        title={<>Dhaka&apos;s <em className="it">practicing</em> coffee pros</>}
        sub="Every DSCA course is led by people who work with coffee every day, not classroom lecturers."
        ticker={["Show it", "Then do it", "Taste", "Adjust", "Repeat"]}
      />
      <section className={`${styles.section} ${layout.g}`}>
        <div className={`${layout.in} ${styles.grid} ${styles.g2}`} style={{ gap: 28 }}>
          {TRAINERS.map((trainer, index) => (
            <Link key={trainer.id} className={styles.card} href={`/trainers/${trainer.id}`}>
              <div className={styles.photo} style={{ aspectRatio: "4 / 4.2" }}>
                <Image
                  src={TRAINER_IMAGE[trainer.id]}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectPosition: "center 18%" }}
                />
                <span>Portrait · {trainer.n}</span>
              </div>
              <div className={styles.cardBody}>
                <span className={`${styles.tag} ${TAG[index]}`}>{trainer.r}</span>
                <h3 style={{ fontSize: "clamp(30px, 3.4vw, 44px)" }}>{trainer.n}</h3>
                <p className={styles.muted}>{trainer.b}</p>
                <div className={styles.chips} style={{ marginBottom: 0 }}>
                  {trainer.f.map((focus) => (
                    <span key={focus} className={`${styles.tag} ${styles.tagPale}`}>{focus}</span>
                  ))}
                </div>
                <b className={styles.more}>View profile →</b>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className={`${styles.section} ${styles.band} ${layout.g}`}>
        <div className={layout.in}>
          <p className={styles.eyebrow}>How we teach</p>
          <h2 className={styles.displayGold}>
            Show it. Do it. <em className="it">Taste it.</em>
          </h2>
          <div className={`${styles.grid} ${styles.g3}`} style={{ marginTop: 48 }}>
            {TEACH.map((step) => (
              <div key={step.title} className={`${styles.teach} ${step.tone}`}>
                <b>{step.title}</b>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PageCta content={PAGE_CTA_VISIT} />
    
    </PagesShell>
  );
}
