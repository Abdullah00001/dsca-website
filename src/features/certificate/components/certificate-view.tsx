/**
 * @fileoverview Certificate View Component
 * @module features/certificate/components/certificate-view
 */

"use client";

import { useCertificate } from "../hooks";
import styles from "../styles/certificate-view.module.css";

export function CertificateView() {
  const { items, isLoading, error } = useCertificate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Certificate</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy certificate settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading certificate data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>Certificate</strong>.</p>
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.name} ({item.status})</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
