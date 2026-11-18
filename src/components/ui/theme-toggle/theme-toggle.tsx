/**
 * @fileoverview Light / dark theme toggle atom.
 * @module components/ui/theme-toggle
 */

"use client";

import { useEffect, useState } from "react";
import styles from "@/components/ui/theme-toggle/theme-toggle.module.css";

/** Supported explicit theme modes stored on `<html data-theme>`. */
export type ThemeMode = "light" | "dark";

/**
 * Visual presentation of the theme control.
 * - `plain` — sits inside the frosted nav pill
 * - `chip` — standalone forest chip (phone header)
 */
export type ThemeToggleVariant = "plain" | "chip";

/**
 * Props for {@link ThemeToggle}.
 */
export interface ThemeToggleProps {
  /**
   * Button presentation.
   * @default "plain"
   */
  variant?: ThemeToggleVariant;
  /** Optional class name merged onto the button. */
  className?: string;
}

/**
 * Reads the current theme from the document element.
 *
 * @returns Active theme mode, defaulting to system preference when unset.
 */
function readTheme(): ThemeMode {
  if (typeof document === "undefined") {
    return "light";
  }

  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") {
    return attr;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Applies a theme to `<html>` and persists it for subsequent visits.
 *
 * @param mode - Theme to apply.
 */
function applyTheme(mode: ThemeMode): void {
  document.documentElement.setAttribute("data-theme", mode);
  try {
    window.localStorage.setItem("dsca-theme", mode);
  } catch {
    // Ignore private-mode / blocked storage failures.
  }
}

/**
 * Client button that toggles `data-theme` between light and dark.
 *
 * @param props - Optional visual variant.
 * @returns Accessible theme toggle control.
 */
export function ThemeToggle({
  variant = "plain",
  className,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("dsca-theme");
      if (stored === "light" || stored === "dark") {
        applyTheme(stored);
        setTheme(stored);
        return;
      }
    } catch {
      // Fall through to document/system preference.
    }

    const current = readTheme();
    setTheme(current);
  }, []);

  /**
   * Flips the active theme and updates document + localStorage.
   */
  function handleToggle(): void {
    const next: ThemeMode = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }

  const isChip = variant === "chip";

  return (
    <button
      type="button"
      className={[styles.toggle, isChip ? styles.chip : null, className]
        .filter(Boolean)
        .join(" ")}
      onClick={handleToggle}
      aria-label="Toggle light and dark mode"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isChip ? (
        <svg
          className={styles.icon}
          viewBox="0 0 18 18"
          width="18"
          height="18"
          aria-hidden="true"
          focusable="false"
        >
          {/* Half-moon mark — same footprint as hamburger bars (18×14–18) */}
          <circle
            cx="9"
            cy="9"
            r="6.25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M9 2.75a6.25 6.25 0 0 0 0 12.5V2.75Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        "◐"
      )}
    </button>
  );
}
