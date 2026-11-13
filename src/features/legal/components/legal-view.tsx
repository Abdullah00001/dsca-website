/**
 * @fileoverview Legal View Component
 * @module features/legal/components/legal-view
 */

"use client";

import { useLegal } from "../hooks";
import styles from "../styles/legal-view.module.css";

interface LegalViewProps {
  type?: "privacy" | "terms";
}

export function LegalView({ type = "privacy" }: LegalViewProps) {
  const { document, isLoading, error } = useLegal(type);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Loading document...</p>
      ) : error ? (
        <p style={{ color: "var(--color-coral, #ef8a68)" }}>{error}</p>
      ) : document ? (
        <>
          <header className={styles.header}>
            <h1 className={styles.title}>{document.title}</h1>
            <p className={styles.subtitle}>{document.subtitle}</p>
          </header>
          <section className={styles.card}>
            {document.sections.map((sec, idx) => (
              <div key={idx} style={{ marginBottom: "20px" }}>
                <h3>{sec.title}</h3>
                <p>{sec.body}</p>
              </div>
            ))}
          </section>
        </>
      ) : null}
    </div>
  );
}
