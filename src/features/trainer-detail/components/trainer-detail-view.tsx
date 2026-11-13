/**
 * @fileoverview Trainer Detail View Component
 * @module features/trainer-detail/components/trainer-detail-view
 */

"use client";

import { useTrainerDetail } from "../hooks";
import styles from "../styles/trainer-detail-view.module.css";

interface TrainerDetailViewProps {
  id?: string;
}

export function TrainerDetailView({ id = "zobayer" }: TrainerDetailViewProps) {
  const { trainer, isLoading, error } = useTrainerDetail(id);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Loading trainer...</p>
      ) : error ? (
        <p style={{ color: "var(--color-coral, #ef8a68)" }}>{error}</p>
      ) : trainer ? (
        <>
          <header className={styles.header}>
            <h1 className={styles.title}>{trainer.name}</h1>
            <p className={styles.subtitle}>{trainer.role}</p>
          </header>
          <section className={styles.card}>
            <p>{trainer.bio}</p>
          </section>
        </>
      ) : (
        <p>Trainer not found.</p>
      )}
    </div>
  );
}
