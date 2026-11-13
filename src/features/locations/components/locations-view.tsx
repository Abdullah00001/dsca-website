"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PhotoHero } from "@/components/layout/photo-hero";
import { Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadCtaSection } from "@/features/home/components/lead-cta-section";
import { useLocations } from "../hooks";
import styles from "../styles/locations-view.module.css";

export function LocationsView() {
  const { areas, isLoading } = useLocations();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAreas = areas.filter((area) =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div>
      <PhotoHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Locations" }]}
        title={
          <>
            Close to <em>wherever</em> you live
          </>
        }
        subtitle="One purpose-built café academy in Farmgate, easy to reach from across Dhaka. Find your area and see transit routes and travel times."
      />

      <section className={styles.section}>
        <div className={styles.inner}>
          {/* Main Academy Hub */}
          <div className={styles.hubGrid}>
            <div className={styles.hubCard}>
              <Eyebrow style={{ color: "#ffe08a" }}>The academy</Eyebrow>
              <h2 className={styles.hubTitle}>
                Farmgate, <em>Dhaka</em>
              </h2>
              <p className={styles.hubAddress}>
                House 34/A, Indira Road, Farmgate (Kazi &amp; Chitra Square,
                Lift-5, next to Kutubbag Darbar Sharif), Dhaka-1215
                <br />
                Open Saturday to Friday, 9:00 am to 9:00 pm
              </p>
              <div>
                <Button
                  href="https://maps.google.com/?q=Dhaka+Specialty+Coffee+Academy+Farmgate"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  Open in Google Maps
                </Button>
              </div>
            </div>

            <div className={styles.mapPhoto}>
              <Image
                src="/assets/location-map.jpg"
                alt="DSCA Academy Map Indira Road Farmgate"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Search by Neighborhood */}
          <div>
            <h2 className={styles.searchLabel}>
              Find your <em>area</em>
            </h2>

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your area (e.g. Dhanmondi, Mirpur, Uttara)"
              aria-label="Search your Dhaka neighborhood"
              className={styles.searchInput}
            />

            {isLoading ? (
              <p>Loading neighborhood guides...</p>
            ) : (
              <div className={styles.areasGrid}>
                {filteredAreas.map((area) => (
                  <Link
                    key={area.id}
                    href={`/locations/${area.id}`}
                    className={styles.areaCard}
                  >
                    <span>{area.name}</span>
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <LeadCtaSection />
    </div>
  );
}
