/**
 * @fileoverview Gallery page (reference `pages.gallery`).
 */

"use client";

import Image from "next/image";
import { PageCta } from "@/components/ui/page-cta";
import { FilterBar, FilterItem } from "@/components/page/filter-bar";
import { PageHero } from "@/components/page/page-hero";
import { PagesShell } from "@/components/page/pages-shell";
import styles from "@/components/page/pages.module.css";
import { PHOTO } from "../lib";
import layout from "@/styles/layout.module.css";

const SHOTS = [
  { cat: "Hands-on", label: "Pulling espresso", shape: styles.tall, image: PHOTO.bar },
  { cat: "Hands-on", label: "Latte art pour", shape: styles.wide, image: PHOTO.staff },
  { cat: "Events", label: "Workshop day", shape: "", image: PHOTO.hall },
  { cat: "Certificate", label: "Certificate handover", shape: "", image: PHOTO.lounge },
  { cat: "Hands-on", label: "Milk steaming", shape: "", image: PHOTO.staff2 },
  { cat: "Events", label: "Cupping session", shape: styles.wide, image: PHOTO.hall },
  { cat: "Certificate", label: "Graduation batch", shape: styles.tall, image: PHOTO.lounge },
  { cat: "Hands-on", label: "Grinder calibration", shape: "", image: PHOTO.bar },
  { cat: "Events", label: "Guest barista talk", shape: "", image: PHOTO.int1 },
] as const;

/**
 * Filterable academy gallery.
 *
 * @returns Gallery page.
 */
export function GalleryView() {
  return (
    <PagesShell>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        title={<>Inside the <em className="it">academy</em></>}
      />
      <section className={`${styles.section} ${layout.g}`} style={{ paddingTop: 56 }}>
        <div className={layout.in}>
          <FilterBar label="Filter gallery" filters={["All", "Hands-on", "Events", "Certificate"]}>
            <div className={styles.gal}>
              {SHOTS.map((shot) => (
                <FilterItem
                  key={shot.label}
                  value={shot.cat}
                  className={`${styles.photo} ${shot.shape}`}
                >
                  <Image src={shot.image} alt={shot.label} fill sizes="(max-width: 900px) 50vw, 25vw" />
                  <span>{shot.label}</span>
                </FilterItem>
              ))}
            </div>
          </FilterBar>
        </div>
      </section>
      <PageCta
        content={{
          eyebrow: "Next batch · 12 seats",
          titleBefore: "Want to be in the",
          titleAccent: "next photo?",
          body: "Join the next batch and train on the same bar.",
          cta: { label: "Join a batch", href: "/contact" },
        }}
      />
    
    </PagesShell>
  );
}
