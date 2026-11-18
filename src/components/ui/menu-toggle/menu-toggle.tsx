/**
 * @fileoverview Mobile menu open / close toggle atom.
 * @module components/ui/menu-toggle
 */

"use client";

import styles from "@/components/ui/menu-toggle/menu-toggle.module.css";

/** DOM id of the mobile menu panel controlled by this button. */
export const MOBILE_MENU_ID = "dsca-mobile-menu";

/** DOM id used by the active menu trigger (text or hamburger). */
export const MENU_TOGGLE_ID = "dsca-menu-toggle";

/**
 * Visual presentation of the menu control.
 * - `text` — “Menu” / “Close” label (tablet+ / desktop pill)
 * - `hamburger` — icon bars for 320–767px right chrome
 */
export type MenuToggleVariant = "text" | "hamburger";

/**
 * Props for {@link MenuToggle}.
 */
export interface MenuToggleProps {
  /** Whether the associated mobile menu is currently open. */
  open: boolean;
  /** Called when the user activates the toggle. */
  onToggle: () => void;
  /**
   * Button presentation.
   * @default "text"
   */
  variant?: MenuToggleVariant;
  /** Optional class name merged onto the button. */
  className?: string;
}

/**
 * Pins the menu clip-path origin to this control before open/close.
 */
function syncMenuOrigin(): void {
  const menu = document.getElementById(MOBILE_MENU_ID);
  const toggle = document.getElementById(MENU_TOGGLE_ID);
  if (!menu || !toggle) {
    return;
  }
  const rect = toggle.getBoundingClientRect();
  menu.style.setProperty("--menu-ox", `${rect.left + rect.width / 2}px`);
  menu.style.setProperty("--menu-oy", `${rect.top + rect.height / 2}px`);
}

/**
 * Accessible button that expands / collapses the full-screen mobile menu.
 *
 * @param props - Open state, toggle handler, and visual variant.
 * @returns Menu control wired with ARIA attributes.
 */
export function MenuToggle({
  open,
  onToggle,
  variant = "text",
  className,
}: MenuToggleProps) {
  const isHamburger = variant === "hamburger";

  return (
    <button
      type="button"
      id={MENU_TOGGLE_ID}
      className={[
        styles.toggle,
        isHamburger ? styles.hamburger : null,
        open && isHamburger ? styles.hamburgerOpen : null,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-expanded={open}
      aria-controls={MOBILE_MENU_ID}
      aria-label={open ? "Close menu" : "Open menu"}
      onPointerDown={syncMenuOrigin}
      onClick={onToggle}
    >
      {isHamburger ? (
        <span className={styles.bars} aria-hidden="true">
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </span>
      ) : open ? (
        "Close"
      ) : (
        "Menu"
      )}
    </button>
  );
}
