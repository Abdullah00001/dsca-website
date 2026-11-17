/**
 * @fileoverview Fixed site header organism (logo + nav pill).
 * @module components/layout/header
 */

"use client";

import { LogoBox } from "@/components/layout/logo-box";
import { NavPill } from "@/components/layout/nav-pill";
import styles from "@/components/layout/header/header.module.css";

/**
 * Props for {@link Header}.
 */
export interface HeaderProps {
  /** Whether the mobile menu overlay is open. */
  menuOpen: boolean;
  /** Toggles the mobile menu open state. */
  onMenuToggle: () => void;
  /** Closes the mobile menu after navigation. */
  onNavigate?: () => void;
}

/**
 * Fixed top chrome matching the DSCA reference navigation bar.
 *
 * Uses `.g` gutters + a centered 1360px bar so the logo and pill
 * share the same content column as page `.in` sections.
 *
 * @param props - Shared menu state and handlers from {@link SiteShell}.
 * @returns Landmark navigation header.
 */
export function Header({ menuOpen, onMenuToggle, onNavigate }: HeaderProps) {
  return (
    <nav className={styles.header} aria-label="Primary">
      <div className={styles.bar}>
        <LogoBox onNavigate={onNavigate} />
        <NavPill
          menuOpen={menuOpen}
          onMenuToggle={onMenuToggle}
          onNavigate={onNavigate}
        />
      </div>
    </nav>
  );
}
