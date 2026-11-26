/**
 * @fileoverview Locations hub and area page (reference `pages.locations` / `pages.location`).
 */

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PageCta } from "@/components/ui/page-cta";
import { PAGE_CTA_DIRECTIONS } from "@/libs/page-cta";
import { AreaBlocks } from "./area-blocks";
import { PageHero } from "@/components/page/page-hero";
import { PagesShell } from "@/components/page/pages-shell";
import styles from "@/components/page/pages.module.css";
import {
  ADDRESS,
  HOURS,
  PAL,
  PHONE,
  PHOTO,
  TEL,
  linkifyParts,
  type AreaPage,
} from "../lib";
import layout from "@/styles/layout.module.css";
import Link from "next/link";

const STATS = [
  ["12", "students per batch, never more"],
  ["9–9", "open Saturday to Friday"],
  ["ISO", "9001:2015 certified"],
  ["4.9", "Google rating, 99 reviews"],
] as const;

/**
 * Props for {@link LocationsView}.
 */
export type LocationsViewProps = {
  page: AreaPage;
  /** Neighbourhood name, when this is an area page rather than the hub. */
  name?: string;
};

/**
 * Closer band under an area page (reference `closeBand`).
 *
 * @param props - Close-block title and paragraph.
 * @returns Dark closer.
 */
function CloseBand({ title, body }: { title: string; body: string }) {
  const parts = linkifyParts(body);
  return (
    <section className={`${styles.section} ${styles.band} ${layout.g}`}>
      <div className={`${layout.in} ${styles.closer}`}>
        <h2 className={styles.display} style={{ fontSize: "clamp(36px, 5.4vw, 84px)", marginBottom: 24 }}>
          {title}
        </h2>
        <p className={styles.sub} style={{ marginTop: 0, maxWidth: 720 }}>
          {parts.map((part, index) =>
            part.href ? (
              <Link key={index} href={part.href}>{part.text}</Link>
            ) : (
              <span key={index}>{part.text}</span>
            ),
          )}
        </p>
        <div className={styles.actions}>
          <Button href="/contact">Enroll Now</Button>
          <Button href="/courses" variant="ghost">See Upcoming Batches</Button>
          <Button href={TEL} variant="line">Call: {PHONE}</Button>
        </div>
        <address style={{ fontStyle: "normal", lineHeight: 1.8, color: "#eefaf3", marginTop: 28 }}>
          <b style={{ color: "#fff" }}>Dhaka Specialty Coffee Academy (DSCA)</b>
          <br />
          {ADDRESS}
          <br />
          Phone: <a href={TEL} style={{ color: "#fff", fontWeight: 600 }}>{PHONE}</a>
          <br />
          Hours: {HOURS}
        </address>
      </div>
    </section>
  );
}

/**
 * Areas hub, or one neighbourhood page.
 *
 * @param props - Page copy and optional area name.
 * @returns Locations page.
 */
export function LocationsView({ page, name }: LocationsViewProps) {
  const close = page.blocks.find((block) => block[0] === "close");
  const title = name ? page.h1.replace(name, `†${name}†`) : page.h1;
  const titleNode = name ? (
    <>
      {title.split(`†${name}†`)[0]}
      <em className="it">{name}</em>
      {title.split(`†${name}†`)[1]}
    </>
  ) : (
    <>
      Barista Course in Dhaka: <em className="it">Areas We Serve</em>
    </>
  );

  return (
    <PagesShell>
      <PageHero
        photo={name ? PHOTO.bar : PHOTO.lounge}
        titleStyle={{ fontSize: "clamp(40px, 7vw, 112px)" }}
        crumbs={
          name
            ? [
                { label: "Home", href: "/" },
                { label: "Areas we serve", href: "/locations" },
                { label: name },
              ]
            : [
                { label: "Home", href: "/" },
                { label: "Areas we serve" },
              ]
        }
        title={titleNode}
        sub={String(page.blocks[0]?.[1] ?? "")}
        extra={
          name ? (
            <div className={styles.actions}>
              <Button href="/courses" variant="dark">See courses</Button>
              <Button href="/contact" variant="line">Request a callback</Button>
            </div>
          ) : null
        }
      />
      {name ? (
        <section className={`${layout.g} ${styles.lift}`}>
          <div className={`${layout.in} ${styles.grid} ${styles.g4}`} style={{ gap: 16 }}>
            {STATS.map(([figure, label], index) => (
              <div key={figure} className={`${styles.stat} ${styles[PAL[index]]}`}>
                <b>{figure}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}
      <section className={`${styles.section} ${layout.g}`}>
        <div className={`${layout.in} ${name ? styles.split : styles.narrow}`}>
          <AreaBlocks blocks={page.blocks.slice(1)} />
          {name ? (
            <aside className={styles.aside}>
              <div className={`${styles.panel} ${styles.gold}`}>
                <p className={styles.eyebrow} style={{ color: "#073b2b" }}>Visit the academy</p>
                <p style={{ lineHeight: 1.7, margin: "14px 0", fontWeight: 500 }}>
                  {ADDRESS}
                  <br />
                  {HOURS}
                </p>
                <div className={styles.photo} style={{ aspectRatio: "16 / 10" }}>
                  <Image src={PHOTO.int1} alt="Dhaka Specialty Coffee Academy, Indira Road, Farmgate" fill sizes="380px" />
                  <span>Our academy</span>
                </div>
              </div>
              <div className={`${styles.panel} ${styles.forest}`}>
                <div style={{ font: "800 26px/1.1 var(--font-display)", textTransform: "uppercase" }}>
                  Reserve your seat
                </div>
                <p style={{ color: "#eefaf3", margin: "10px 0 20px" }}>12 seats per batch.</p>
                <Button href="/contact">Enroll now</Button>
              </div>
            </aside>
          ) : null}
        </div>
      </section>
      {close ? (
        <CloseBand title={String(close[1])} body={String(close[2])} />
      ) : null}
      <PageCta content={PAGE_CTA_DIRECTIONS} />
    </PagesShell>
  );
}
