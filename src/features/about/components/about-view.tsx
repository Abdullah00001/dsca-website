/**
 * @fileoverview About View Component
 * @module features/about/components/about-view
 */

"use client";

import { useAbout } from "../hooks";
import styles from "../styles/about-view.module.css";

export function AboutView() {
  const { data, isLoading, error } = useAbout();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About Dhaka Specialty Coffee Academy</h1>
        <p className={styles.subtitle}>
          Bangladesh&apos;s first ISO 9001:2015 certified barista academy.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading about story...</p>
        ) : error ? (
          <p style={{ color: "var(--color-coral, #ef8a68)" }}>{error}</p>
        ) : data ? (
          <div>
            <h2>{data.storyHeading} {data.storySubheading}</h2>
            <ul>
              {data.milestones.map((m) => (
                <li key={m.number}>
                  <strong>{m.number} · {m.title}:</strong> {m.description}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </div>
  );
}
