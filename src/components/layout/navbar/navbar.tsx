"use client";

import { useSyncExternalStore, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import styles from "./navbar.module.css";

export type NavbarProps = {
  onMenuToggle?: () => void;
  menuOpen?: boolean;
};

function getThemeSnapshot(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("dsca-theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getThemeServerSnapshot(): "light" | "dark" {
  return "light";
}

function subscribeToTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

export function Navbar({ onMenuToggle, menuOpen = false }: NavbarProps) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("dsca-theme", next);
    document.documentElement.setAttribute("data-theme", next);
    window.dispatchEvent(new Event("storage"));
  }, [theme]);

  return (
    <nav className={styles.nav} aria-label="Main Navigation">
      <Link href="/" className={styles.logobox} aria-label="DSCA Barista Academy Home">
        <Image
          src="/assets/logo.svg"
          alt="Dhaka Specialty Coffee Academy"
          width={180}
          height={46}
          priority
          className={styles.logo}
        />
      </Link>

      <div className={styles.pill} role="toolbar" aria-label="Site Navigation">
        <Link href="/courses" className={styles.hideOnMobile}>
          Courses
        </Link>
        <Link href="/locations" className={styles.hideOnMobile}>
          Locations
        </Link>
        <Link href="/trainers" className={styles.hideOnMobile}>
          Trainers
        </Link>
        <Link href="/blog" className={styles.hideOnMobile}>
          Blog
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          ◐
        </button>

        <button
          type="button"
          onClick={onMenuToggle}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          Menu
        </button>

        <Link href="/contact" className={clsx(styles.cta)}>
          Enroll
        </Link>
      </div>
    </nav>
  );
}
