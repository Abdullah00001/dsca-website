/**
 * @fileoverview Trainer profile (reference `pages.trainer`).
 */

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageCta } from "@/components/ui/page-cta";
import { PAGE_CTA_VISIT } from "@/libs/page-cta";
import { PageHero } from "@/components/page/page-hero";
import { PagesShell } from "@/components/page/pages-shell";
import styles from "@/components/page/pages.module.css";
import {
  COURSES,
  PHOTO,
  TRAINER_IMAGE,
  TRAINERS,
  type CatalogTrainer,
} from "../lib";
import layout from "@/styles/layout.module.css";

/**
 * Props for {@link TrainerView}.
 */
export type TrainerViewProps = { trainer: CatalogTrainer };

/**
 * Last-name accent, matching `t.n.replace(/ (\S+)$/, ...)`.
 *
 * @param name - Full name.
 * @returns Name with the last word emphasised.
 */
function accentLast(name: string) {
  const index = name.lastIndexOf(" ");
  if (index < 0) return name;
  return (
    <>
      {name.slice(0, index)} <em className="it">{name.slice(index + 1)}</em>
    </>
  );
}

/**
 * Trainer profile, focus list, and the rest of the team.
 *
 * @param props - Trainer record.
 * @returns Trainer page.
 */
export function TrainerView({ trainer }: TrainerViewProps) {
  const first = trainer.n.split(" ")[0];
  const others = TRAINERS.filter((item) => item.id !== trainer.id);

  return (
    <PagesShell>
      <PageHero
        photo={PHOTO.staff}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Trainers", href: "/trainers" },
          { label: trainer.n },
        ]}
        title={accentLast(trainer.n)}
        extra={
          <div className={styles.actions}>
            <span className={`${styles.tag} ${styles.tagInk}`}>{trainer.r}</span>
            <Button href="/contact" variant="dark">
              Train with {first}
            </Button>
          </div>
        }
      />
      <section className={`${styles.section} ${layout.g}`}>
        <div className={`${layout.in} ${styles.split}`}>
          <div className={styles.prose}>
            <h2 style={{ marginTop: 0 }}>About {first}</h2>
            <p>{trainer.b}</p>
            <p>Google reviewers describe the DSCA trainers as knowledgeable, friendly, patient and supportive.</p>
            <h2>Teaching focus</h2>
            <ul>
              {trainer.f.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <aside className={`${styles.aside} ${styles.panel}`}>
            <p className={styles.eyebrow}>Courses</p>
            {COURSES.slice(0, 4).map((course) => (
              <Link key={course.id} className={styles.courseLink} href={`/courses/${course.id}`}>
                {course.n}
                <small>
                  {course.d} · {course.p}
                </small>
              </Link>
            ))}
          </aside>
        </div>
      </section>
      <section className={`${styles.section} ${styles.band} ${layout.g}`}>
        <div className={layout.in}>
          <h2 className={styles.display} style={{ marginBottom: 40 }}>
            More from the <em className="it">team</em>
          </h2>
          <div className={`${styles.grid} ${styles.g3}`}>
            {others.map((item) => (
              <Link key={item.id} className={styles.card} href={`/trainers/${item.id}`}>
                <div className={styles.photo} style={{ aspectRatio: "4 / 5" }}>
                  <Image
                    src={TRAINER_IMAGE[item.id]}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{ objectPosition: "center 18%" }}
                  />
                  <span>Portrait · {item.n}</span>
                </div>
                <div className={styles.cardBody}>
                  <h3>{item.n}</h3>
                  <p className={styles.muted}>{item.r}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <PageCta content={PAGE_CTA_VISIT} />
    </PagesShell>
  );
}
