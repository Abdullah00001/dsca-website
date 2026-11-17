/**
 * @fileoverview Mobile menu open / close toggle atom.
 * @module components/ui/menu-toggle
 */

"use client";

import styles from "@/components/ui/menu-toggle/menu-toggle.module.css";

/** DOM id of the mobile menu panel controlled by this button. */
export const MOBILE_MENU_ID = "dsca-mobile-menu";

/**
 * Props for {@link MenuToggle}.
 */
export interface MenuToggleProps {
  /** Whether the associated mobile menu is currently open. */
  open: boolean;
  /** Called when the user activates the toggle. */
  onToggle: () => void;
}

/**
 * Accessible button that expands / collapses the full-screen mobile menu.
 *
 * @param props - Open state and toggle handler.
 * @returns Menu control wired with ARIA attributes.
 */
export function MenuToggle({ open, onToggle }: MenuToggleProps) {
  return (
    <button
      type="button"
      id="dsca-menu-toggle"
      className={styles.toggle}
      aria-expanded={open}
      aria-controls={MOBILE_MENU_ID}
      onClick={onToggle}
    >
      {open ? "Close" : "Menu"}
    </button>
  );
}
