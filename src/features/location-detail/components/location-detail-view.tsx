"use client";

import { PhotoHero } from "@/components/layout/photo-hero";
import { Button } from "@/components/ui/button";
import { LeadCtaSection } from "@/features/home/components/lead-cta-section";
import { useLocationDetail } from "../hooks";
import styles from "../styles/location-detail-view.module.css";

export type LocationDetailViewProps = {
  areaId: string;
};

export function LocationDetailView({ areaId }: LocationDetailViewProps) {
  const { area, isLoading, error } = useLocationDetail(areaId);

  if (isLoading) {
    return (
      <div className="p-20 text-center font-display text-2xl font-bold">
        Loading neighborhood transit guide...
      </div>
    );
  }

  if (error || !area) {
    return (
      <div className="p-20 text-center text-coral font-display text-2xl font-bold">
        {error || "Neighborhood guide not found"}
      </div>
    );
  }

  return (
    <div>
      <PhotoHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: area.name },
        ]}
        title={
          <>
            Barista Course for students from <em>{area.name}</em>
          </>
        }
        subtitle={area.metaDescription}
      />

      <section className={styles.section}>
        <div className={styles.inner}>
          <article className={styles.prose}>
            {area.blocks.map(([type, content], idx) => {
              if (type === "h2") {
                return <h2 key={idx}>{content}</h2>;
              }
              if (type === "h3") {
                return <h3 key={idx}>{content}</h3>;
              }
              if (type === "ul") {
                const items = content.split(";").map((s) => s.trim());
                return (
                  <ul key={idx}>
                    {items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                );
              }
              if (type === "callout") {
                return (
                  <div key={idx} className={styles.calloutCard}>
                    <h3 className={styles.calloutTitle}>
                      Ready to join from {area.name}?
                    </h3>
                    <p className="text-[#eefaf3] mb-6">{content}</p>
                    <Button href="/contact">Book next batch</Button>
                  </div>
                );
              }
              return <p key={idx}>{content}</p>;
            })}
          </article>
        </div>
      </section>

      <LeadCtaSection />
    </div>
  );
}
