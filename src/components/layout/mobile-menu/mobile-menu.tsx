/**
 * @fileoverview Full-screen circular mobile menu overlay organism.
 * @module components/layout/mobile-menu
 */

"use client";

import { NavLink } from "@/components/ui/nav-link";
import { MOBILE_MENU_ID } from "@/components/ui/menu-toggle";
import { NAV_MENU, NAV_MENU_FOOTER } from "@/libs/navigation";
import styles from "@/components/layout/mobile-menu/mobile-menu.module.css";

/**
 * Props for {@link MobileMenu}.
 */
export interface MobileMenuProps {
  /** Whether the overlay is expanded. */
  open: boolean;
  /** Closes the menu after a link is chosen. */
  onNavigate: () => void;
}

/**
 * Forest full-viewport menu with a slow circular reveal from the top-right
 * corner (reference `.menu` / `.menu.on` clip-path).
 *
 * @param props - Open state and navigate callback.
 * @returns Accessible dialog-like navigation overlay.
 */
export function MobileMenu({ open, onNavigate }: MobileMenuProps) {
  return (
    <div
      id={MOBILE_MENU_ID}
      className={[styles.menu, open ? styles.open : null]
        .filter(Boolean)
        .join(" ")}
      role="dialog"
      aria-modal={open}
      aria-label="Site menu"
      aria-hidden={!open}
    >
      <div className={styles.col}>
        {NAV_MENU.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            variant="menu"
            onNavigate={onNavigate}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <small className={styles.footer}>{NAV_MENU_FOOTER}</small>
    </div>
  );
}
