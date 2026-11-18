/**
 * @fileoverview Full-screen circular mobile menu overlay organism.
 * @module components/layout/mobile-menu
 */

"use client";

import { useLayoutEffect, useRef } from "react";
import { EnrollCta } from "@/components/ui/enroll-cta";
import { NavLink } from "@/components/ui/nav-link";
import { MENU_TOGGLE_ID, MOBILE_MENU_ID } from "@/components/ui/menu-toggle";
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
 * Pins the clip-path origin to the active Menu / hamburger control.
 *
 * @param menuEl - Overlay element that owns `--menu-ox` / `--menu-oy`.
 */
function syncOriginFromToggle(menuEl: HTMLElement): void {
  const toggle = document.getElementById(MENU_TOGGLE_ID);
  if (!toggle) {
    return;
  }
  const rect = toggle.getBoundingClientRect();
  menuEl.style.setProperty("--menu-ox", `${rect.left + rect.width / 2}px`);
  menuEl.style.setProperty("--menu-oy", `${rect.top + rect.height / 2}px`);
}

/**
 * Forest full-viewport menu with a circular reveal from the active toggle.
 * On phones, Enroll lives here (removed from the header chrome).
 *
 * @param props - Open state and navigate callback.
 * @returns Accessible dialog-like navigation overlay.
 */
export function MobileMenu({ open, onNavigate }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const menuEl = menuRef.current;
    if (!menuEl) {
      return;
    }

    syncOriginFromToggle(menuEl);

    /**
     * Keeps the reveal origin locked to the toggle on resize / rotate.
     */
    function handleResize(): void {
      if (menuEl) {
        syncOriginFromToggle(menuEl);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  return (
    <div
      ref={menuRef}
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
      <div className={styles.enroll}>
        <EnrollCta
          className={styles.enrollBtn}
          onNavigate={onNavigate}
          label="Enrol in the Next Batch"
        />
      </div>
      <small className={styles.footer}>{NAV_MENU_FOOTER}</small>
    </div>
  );
}
