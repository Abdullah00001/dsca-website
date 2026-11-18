/**
 * @fileoverview Frosted green navigation pill composing header atoms.
 * @module components/layout/nav-pill
 */

"use client";

import { EnrollCta } from "@/components/ui/enroll-cta";
import { MenuToggle } from "@/components/ui/menu-toggle";
import { NavLink } from "@/components/ui/nav-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NAV_PRIMARY } from "@/libs/navigation";
import styles from "@/components/layout/nav-pill/nav-pill.module.css";

/**
 * Props for {@link NavPill}.
 */
export interface NavPillProps {
  /** Whether the mobile menu overlay is open. */
  menuOpen: boolean;
  /** Toggles the mobile menu open state. */
  onMenuToggle: () => void;
  /** Closes the mobile menu after an in-pill navigation (e.g. Enroll). */
  onNavigate?: () => void;
}

/**
 * Tablet+ control cluster: primary links, theme, Menu, enroll CTA.
 * Phones use separate theme + hamburger chips in {@link Header} instead;
 * Enroll moves into the hamburger sheet.
 *
 * @param props - Menu open state and handlers.
 * @returns Frosted nav pill matching the DSCA reference.
 */
export function NavPill({
  menuOpen,
  onMenuToggle,
  onNavigate,
}: NavPillProps) {
  return (
    <div className={styles.pill}>
      {NAV_PRIMARY.map((item) => (
        <span key={item.href} className={styles.hideOnMobile}>
          <NavLink href={item.href} onNavigate={onNavigate}>
            {item.label}
          </NavLink>
        </span>
      ))}
      <ThemeToggle />
      <MenuToggle open={menuOpen} onToggle={onMenuToggle} />
      <EnrollCta onNavigate={onNavigate} />
    </div>
  );
}
