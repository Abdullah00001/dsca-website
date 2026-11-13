/**
 * @fileoverview Contact View Component
 * @module features/contact/components/contact-view
 */

"use client";

import { useState } from "react";
import { useContact } from "../hooks";
import { ACADEMY_CONTACT_INFO } from "../services";
import styles from "../styles/contact-view.module.css";

export function ContactView() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [courseId, setCourseId] = useState("professional");
  const { response, isSubmitting, sendEnquiry } = useContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendEnquiry({ fullName, phone, courseId });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Enroll in Your First Batch</h1>
        <p className={styles.subtitle}>
          Twelve seats a batch. Tell us the course and we reply with the next start date.
        </p>
      </header>

      <section className={styles.card}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              required
              style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--color-line)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Phone / WhatsApp Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(+880) 1810-545545"
              required
              style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--color-line)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Select Course</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--color-line)" }}
            >
              <option value="intermediate">Barista Intermediate (3 Days - ৳4,950)</option>
              <option value="professional">Barista Professional (10 Days - ৳14,000)</option>
              <option value="starter">DSCA Starter Pack (15 Days - ৳17,000)</option>
              <option value="advance">Barista Advance Professional (22 Days - ৳21,000)</option>
              <option value="food">Food Safety Management (2 Days - ৳5,000)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "14px",
              borderRadius: "99px",
              background: "var(--color-gold)",
              color: "var(--color-ink)",
              fontWeight: "bold",
              border: 0,
              cursor: "pointer",
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit Enrollment Request"}
          </button>
        </form>

        {response && (
          <div style={{ marginTop: "16px", padding: "16px", borderRadius: "12px", background: response.success ? "var(--color-mint)" : "#fee2e2" }}>
            <p>{response.message}</p>
          </div>
        )}

        <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--color-line)" }}>
          <p><strong>Address:</strong> {ACADEMY_CONTACT_INFO.address}</p>
          <p><strong>Hours:</strong> {ACADEMY_CONTACT_INFO.hours}</p>
          <p><strong>Phone:</strong> {ACADEMY_CONTACT_INFO.phone}</p>
        </div>
      </section>
    </div>
  );
}
