"use client";

import { PhotoHero } from "@/components/layout/photo-hero";
import { useLegal } from "../hooks";
import styles from "../styles/legal-view.module.css";

export type LegalViewProps = {
  documentType: "privacy" | "terms";
};

export function LegalView({ documentType }: LegalViewProps) {
  const { document, isLoading } = useLegal(documentType);

  if (isLoading || !document) {
    return (
      <div className="p-20 text-center font-display text-2xl font-bold">
        Loading document...
      </div>
    );
  }

  return (
    <div>
      <PhotoHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: document.title },
        ]}
        title={document.title}
        subtitle={`Last updated: ${document.lastUpdated}`}
      />

      <section className={styles.section}>
        <div className={styles.inner}>
          <article className={styles.prose}>
            {document.subtitle && (
              <p className="text-xl text-muted leading-relaxed mb-8">
                {document.subtitle}
              </p>
            )}

            {document.sections.map((section, idx) => (
              <div key={idx} className="mb-10">
                <h2>{section.title}</h2>
                <p className="whitespace-pre-line leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
}
