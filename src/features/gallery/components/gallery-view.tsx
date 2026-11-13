/**
 * @fileoverview Gallery View Component
 * @module features/gallery/components/gallery-view
 */

"use client";

import { useGallery } from "../hooks";
import styles from "../styles/gallery-view.module.css";
import type { GalleryCategory } from "../types";

const CATEGORIES: GalleryCategory[] = ["All", "Hands-on", "Events", "Certificate"];

export function GalleryView() {
  const { items, selectedCategory, setSelectedCategory, isLoading, error } = useGallery();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Inside the Academy</h1>
        <p className={styles.subtitle}>Real moments from our Farmgate campus.</p>
        <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: "99px",
                border: "1px solid var(--color-ink)",
                background: selectedCategory === cat ? "var(--color-gold)" : "transparent",
                color: "var(--color-ink)",
                fontWeight: "bold",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading gallery photos...</p>
        ) : error ? (
          <p style={{ color: "var(--color-coral, #ef8a68)" }}>{error}</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong> — {item.category}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
