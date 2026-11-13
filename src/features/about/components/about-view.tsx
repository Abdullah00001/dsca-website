"use client";

import Image from "next/image";
import { PhotoHero } from "@/components/layout/photo-hero";
import { Eyebrow } from "@/components/ui/badge";
import { LeadCtaSection } from "@/features/home/components/lead-cta-section";
import { useAbout } from "../hooks";
import styles from "../styles/about-view.module.css";

const PRINCIPLES = [
  {
    num: "01",
    title: "Real equipment",
    desc: "Commercial espresso machines, precision grinders, and the tools you will meet in a working café.",
  },
  {
    num: "02",
    title: "Real environments",
    desc: "Practice happens in a purpose-built café setting, with the pace, order tickets, and pressure of real service.",
  },
  {
    num: "03",
    title: "Real outcomes",
    desc: "We teach how to make coffee and why coffee behaves the way it does, so you can adapt to any machine, bean, or café.",
  },
];

export function AboutView() {
  const { data } = useAbout();

  return (
    <div>
      <PhotoHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title={
          <>
            Where coffee lovers become <em>baristas.</em>
          </>
        }
        subtitle={
          data?.storySubheading ??
          "Dhaka Specialty Coffee Academy (DSCA) is Bangladesh's first ISO 9001:2015 certified barista academy. Built around real machines, small batches, and career placement."
        }
      />

      {/* Bento Grid */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.bentoGrid}>
            <div
              className={styles.bentoCard}
              style={{
                gridColumn: "span 5",
                gridRow: "span 3",
                background: "var(--forest)",
                color: "#fff",
              }}
            >
              <div className="font-display font-extrabold text-[clamp(72px,9vw,140px)] leading-[0.85] text-gold">
                200+
              </div>
              <b className="text-2xl leading-tight">
                students trained at our Farmgate academy
              </b>
            </div>

            <div
              className={`${styles.bentoCard} relative`}
              style={{ gridColumn: "span 4", gridRow: "span 2" }}
            >
              <Image
                src="/assets/espresso-pour.jpg"
                alt="Espresso pour"
                fill
                className="object-cover"
              />
            </div>

            <div
              className={styles.bentoCard}
              style={{
                gridColumn: "span 3",
                gridRow: "span 2",
                background: "#c9efd9",
                color: "#073b2b",
              }}
            >
              <div className="font-display font-extrabold text-[84px] leading-[0.85]">
                12
              </div>
              <b className="text-lg leading-snug">
                students per batch, never more
              </b>
            </div>

            <div
              className={styles.bentoCard}
              style={{
                gridColumn: "span 4",
                background: "var(--coral)",
                color: "#fff",
                flexDirection: "row",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div className="font-display font-extrabold text-[64px] leading-none">
                4.9
              </div>
              <b className="text-lg">on Google, 99 reviews</b>
            </div>

            <div
              className={`${styles.bentoCard} relative`}
              style={{ gridColumn: "span 3" }}
            >
              <Image
                src="/assets/latte-art-cup.jpg"
                alt="Latte art"
                fill
                className="object-cover"
              />
            </div>

            <div
              className={`${styles.bentoCard} relative`}
              style={{ gridColumn: "span 4", gridRow: "span 2" }}
            >
              <Image
                src="/assets/students-class.jpg"
                alt="Students in class"
                fill
                className="object-cover"
              />
            </div>

            <div
              className={styles.bentoCard}
              style={{
                gridColumn: "span 4",
                gridRow: "span 2",
                background: "var(--card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/assets/badge.svg"
                alt="DSCA ISO Certification Badge"
                width={160}
                height={160}
              />
            </div>

            <div
              className={`${styles.bentoCard} relative`}
              style={{ gridColumn: "span 4", gridRow: "span 2" }}
            >
              <Image
                src="/assets/graduation-day.jpg"
                alt="Graduation day"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={styles.inner}>
          <div className={styles.storySplit}>
            <div>
              <Eyebrow>Our story</Eyebrow>
              <h2 className={styles.storyHeading}>
                Why we <em>built DSCA</em>
              </h2>
            </div>
            <div className={styles.prose}>
              <p>
                Coffee in Bangladesh has grown from a hot drink into a profession.
                New specialty cafés open across Dhaka every month, and every one
                of them needs people who can pull a consistent shot, steam milk
                properly, and keep a busy bar moving with confidence.
              </p>
              <p>
                What was missing was training that matched that standard. Too
                many courses meant a whiteboard lecture, a brief demo, and a paper
                certificate. Zobayer Hosen founded DSCA to change that. He set out
                to build an academy where students spend their hours on real
                commercial machines, get guided by working professionals, and
                graduate with skills café owners recognize from day one.
              </p>
              <p>
                Today DSCA trains aspiring baristas, working café teams, and
                future coffee shop owners right from our Farmgate campus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className={styles.principlesSection}>
        <div className={styles.inner}>
          <Eyebrow style={{ color: "#ffe08a" }}>Mission and principles</Eyebrow>
          <h2 className={styles.principlesHeading}>
            What we <em>stand for</em>
          </h2>
          <p className="text-xl text-[#eefaf3] max-w-[620px]">
            To professionalise coffee in Bangladesh by training skilled,
            confident baristas to an international standard.
          </p>

          <div className={styles.principlesGrid}>
            {PRINCIPLES.map((pr) => (
              <div key={pr.num} className={styles.principleItem}>
                <div className={styles.principleNumber}>{pr.num}</div>
                <div className={styles.principleTitle}>{pr.title}</div>
                <p className={styles.principleText}>{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeadCtaSection />
    </div>
  );
}
