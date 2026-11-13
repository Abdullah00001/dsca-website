/**
 * @fileoverview Certificate View Component
 * @module features/certificate/components/certificate-view
 */

"use client";

import { useState } from "react";
import { useCertificate } from "../hooks";
import styles from "../styles/certificate-view.module.css";

export function CertificateView() {
  const [inputVal, setInputVal] = useState("DSCA-2026-0001");
  const { result, isLoading, checkCertificate } = useCertificate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkCertificate(inputVal);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Verify a DSCA Certificate</h1>
        <p className={styles.subtitle}>
          Enter the certificate number to confirm its genuine ISO accreditation.
        </p>
      </header>

      <section className={styles.card}>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="e.g. DSCA-2026-0001"
            style={{ padding: "12px 18px", borderRadius: "99px", flex: "1 1 240px", border: "1.5px solid var(--color-ink)" }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{ padding: "12px 24px", borderRadius: "99px", background: "var(--color-gold)", color: "var(--color-ink)", fontWeight: "bold" }}
          >
            {isLoading ? "Verifying..." : "Verify Certificate"}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: "24px" }}>
            {result.success && result.certificate ? (
              <div style={{ padding: "20px", borderRadius: "16px", background: "var(--color-mint)", color: "var(--color-ink)" }}>
                <h3>Verified Certificate</h3>
                <p><strong>Student:</strong> {result.certificate.studentName}</p>
                <p><strong>Course:</strong> {result.certificate.courseName} ({result.certificate.duration})</p>
                <p><strong>Issued:</strong> {result.certificate.issueDate}</p>
              </div>
            ) : (
              <div style={{ padding: "20px", borderRadius: "16px", background: "#fef2f2", color: "#991b1b" }}>
                <p>{result.error}</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
