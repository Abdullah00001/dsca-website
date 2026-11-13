/**
 * @fileoverview Trainers View Component
 * @module features/trainers/components/trainers-view
 */

"use client";

import { useTrainers } from "../hooks";
import styles from "../styles/trainers-view.module.css";

export function TrainersView() {
  const { trainers, isLoading, error } = useTrainers();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dhaka&apos;s Practicing Coffee Pros</h1>
        <p className={styles.subtitle}>
          Every DSCA course is led by people who work with coffee every day.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading trainers...</p>
        ) : error ? (
          <p style={{ color: "var(--color-coral, #ef8a68)" }}>{error}</p>
        ) : (
          <div>
            <ul>
              {trainers.map((trainer) => (
                <li key={trainer.id}>
                  <strong>{trainer.name}</strong> — {trainer.role}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
