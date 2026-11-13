"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { PhotoHero } from "@/components/layout/photo-hero";
import { Chip } from "@/components/ui/badge";
import { LeadCtaSection } from "@/features/home/components/lead-cta-section";
import { useGallery } from "../hooks";
import styles from "../styles/gallery-view.module.css";

const CATEGORIES = ["All", "Hands-on", "Events", "Certificate"] as const;

export function GalleryView() {
  const { items } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div>
      <PhotoHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        title={
          <>
            Inside the <em>academy</em>
          </>
        }
        subtitle="Moments from real classes, hands-on milk steaming sessions, cupping workshops, and certificate award days."
      />

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.filters}>
            {CATEGORIES.map((cat) => (
              <Chip
                key={cat}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Chip>
            ))}
          </div>

          <div className={styles.galleryGrid}>
            {filteredItems.map((item, idx) => {
              const isTall = idx % 5 === 0;
              const isWide = idx % 4 === 1;
              const imgSrc =
                item.imagePath ??
                (idx % 2 === 0
                  ? "/assets/students-class.jpg"
                  : "/assets/latte-art-cup.jpg");

              return (
                <div
                  key={item.id}
                  className={clsx(
                    styles.photoCard,
                    isTall && styles.tall,
                    isWide && styles.wide
                  )}
                >
                  <Image
                    src={imgSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className={styles.photoCaption}>{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <LeadCtaSection />
    </div>
  );
}
