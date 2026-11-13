"use client";

import { useState } from "react";
import Image from "next/image";
import { PhotoHero } from "@/components/layout/photo-hero";
import { Button } from "@/components/ui/button";
import { useCertificate } from "../hooks";
import styles from "../styles/certificate-view.module.css";

export function CertificateView() {
  const [inputVal, setInputVal] = useState("DSCA-2026-0001");
  const { result, isLoading, checkCertificate } = useCertificate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      checkCertificate(inputVal.trim());
    }
  };

  return (
    <div>
      <PhotoHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Verify Certificate" },
        ]}
        title={
          <>
            Verify a <em>certificate</em>
          </>
        }
        subtitle="Check the validity of any DSCA certificate issued since 2024. Enter the certificate number printed below the graduate's name."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-10">
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex gap-3 flex-wrap max-w-[520px]"
            >
              <input
                id="cid"
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="e.g. DSCA-2026-0001"
                aria-label="Certificate number"
                className="font-medium text-lg min-h-[56px] px-5 rounded-2xl border-2 border-[#4f8a6c] bg-card text-fg flex-1 outline-none focus:border-gold"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Checking..." : "Verify"}
              </Button>
            </form>

            {result && (
              <div role="status">
                {result.success && result.certificate ? (
                  <div className={styles.verifiedResult}>
                    <b className="font-display font-extrabold text-xl text-[#0a7a4b]">
                      ✓ Certificate Verified
                    </b>
                    <p className="mt-2 text-base leading-relaxed text-[#0b2a1e]">
                      <strong>{result.certificate.studentName}</strong>
                      <br />
                      {result.certificate.courseName} ·{" "}
                      {result.certificate.duration}
                      <br />
                      Issued: {result.certificate.issueDate} · Status:{" "}
                      {result.certificate.status}
                    </p>
                  </div>
                ) : (
                  <div className={styles.unverifiedResult}>
                    <b className="font-display font-extrabold text-xl text-[#b82105]">
                      ✕ No Certificate Found
                    </b>
                    <p className="mt-2 text-base leading-relaxed text-[#0b2a1e]">
                      {result.error ||
                        "Check the number and try again, or message our academy team on WhatsApp."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <div className={styles.paperCard}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-forest/20">
                <Image
                  src="/assets/cert-sample.jpg"
                  alt="DSCA ISO 9001:2015 Certificate"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
              <p className="font-bold text-xs tracking-widest uppercase mt-3 text-center text-[#4a3a1a]">
                DSCA ISO 9001:2015 Accredited Certificate
              </p>
            </div>
          </div>
        </div>
      </PhotoHero>

      {/* 3 Step Verification Guide */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.stepsGrid}>
            <div className={`${styles.stepCard} ${styles.step01}`}>
              <span className={styles.stepNumber}>01</span>
              <h3 className={styles.stepTitle}>Find the number</h3>
              <p className={styles.stepDesc}>
                It is printed at the bottom of every official DSCA certificate
                (e.g. DSCA-2026-0001).
              </p>
            </div>

            <div className={`${styles.stepCard} ${styles.step02}`}>
              <span className={styles.stepNumber}>02</span>
              <h3 className={styles.stepTitle}>Enter it above</h3>
              <p className={styles.stepDesc}>
                Type the certificate ID exactly as shown and press the Verify
                button.
              </p>
            </div>

            <div className={`${styles.stepCard} ${styles.step03}`}>
              <span className={styles.stepNumber}>03</span>
              <h3 className={styles.stepTitle}>See the result</h3>
              <p className={styles.stepDesc}>
                Graduate name, completed course, issue date, and ISO credential
                appear instantly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
