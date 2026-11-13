"use client";

import { useState } from "react";
import Image from "next/image";
import { PhotoHero } from "@/components/layout/photo-hero";
import { Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { useContact } from "../hooks";
import styles from "../styles/contact-view.module.css";

const COURSES_OPTIONS = [
  { id: "intermediate", name: "Barista Intermediate · ৳4,950" },
  { id: "professional", name: "Barista Professional · ৳14,000" },
  { id: "starter-pack", name: "DSCA Barista Starter Pack · ৳17,000" },
  { id: "advance", name: "Barista Advance Professional · ৳21,000" },
  { id: "food-safety", name: "Food Safety Management · ৳5,000" },
  { id: "not-sure", name: "Not sure yet" },
];

export function ContactView() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState("intermediate");
  const [notes, setNotes] = useState("");
  const { response, isSubmitting, sendEnquiry } = useContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendEnquiry({
      fullName,
      phone,
      email: email || undefined,
      courseId,
      notes: notes || undefined,
    });
  };

  return (
    <div>
      <PhotoHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={
          <>
            Let&apos;s talk <em>coffee</em>
          </>
        }
        subtitle="Twelve seats per batch. Reach out to verify start dates, schedule a campus visit, or confirm your enrollment."
      />

      {/* 3 Quick Cards */}
      <div className={styles.cardsGrid}>
        <a
          href="tel:+8801810545545"
          className={styles.quickCard}
          style={{ background: "var(--card)", color: "var(--fg)" }}
        >
          <div className={styles.quickCardTitle}>Call</div>
          <span className="font-semibold text-lg">(+880) 1810-545545 →</span>
        </a>

        <a
          href="https://wa.me/8801810545545"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.quickCard}
          style={{ background: "var(--coral)", color: "#073b2b" }}
        >
          <div className={styles.quickCardTitle}>WhatsApp</div>
          <span className="font-semibold text-lg">Fastest reply →</span>
        </a>

        <a
          href="https://maps.google.com/?q=Dhaka+Specialty+Coffee+Academy+Farmgate"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.quickCard}
          style={{ background: "var(--gold)", color: "var(--ink)" }}
        >
          <div className={styles.quickCardTitle}>Visit</div>
          <span className="font-semibold text-lg">Indira Road, Farmgate →</span>
        </a>
      </div>

      {/* Form Section */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.formGrid}>
            <div className={styles.mapPhoto}>
              <Image
                src="/assets/location-map.jpg"
                alt="Map to DSCA Farmgate Campus"
                fill
                className="object-cover"
              />
            </div>

            <div className={styles.formCard}>
              {response?.success ? (
                <div className="text-center py-16">
                  <div className="font-display font-extrabold text-4xl sm:text-6xl uppercase mb-4">
                    Thank <span className="font-serif italic font-normal text-forest">you</span>
                  </div>
                  <p className="text-muted text-lg max-w-[480px] mx-auto leading-relaxed">
                    We received your request. Our academy team will reach out on
                    WhatsApp or call you with the upcoming batch start date.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h2 className={styles.formTitle}>
                    Enroll or <em>ask</em>
                  </h2>

                  <Input
                    label="Full Name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                  />

                  <div className={styles.twoCols}>
                    <Input
                      label="WhatsApp / Phone Number"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(+880) 1810-545545"
                    />

                    <Input
                      label="Email Address (Optional)"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                    />
                  </div>

                  <Select
                    label="Select Your Course"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                  >
                    {COURSES_OPTIONS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Select>

                  <Textarea
                    label="Anything you'd like us to know? (Optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Prior café experience, preferred timing, or questions..."
                  />

                  <Button type="submit" size="md" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Confirm My Enrolment"}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Find Us Banner */}
          <div className={styles.findUsCard}>
            <Eyebrow>Find us</Eyebrow>
            <p className={styles.findUsText}>
              House 34/A, Indira Road, Farmgate (Kazi &amp; Chitra Square, Lift-5,
              next to Kutubbag Darbar Sharif), Dhaka-1215 · Open Saturday to
              Friday, 9:00 am to 9:00 pm
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
