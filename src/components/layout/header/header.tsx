/**
 * @fileoverview Fixed site header organism (logo + nav pill).
 * @module components/layout/header
 */

"use client";

import { useEffect, useState } from "react";
import { LogoBox } from "@/components/layout/logo-box";
import { NavPill } from "@/components/layout/nav-pill";
import { MenuToggle } from "@/components/ui/menu-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import styles from "@/components/layout/header/header.module.css";

/** Phone breakpoint: separate theme + hamburger chips (320–767px). */
const PHONE_MQ = "(max-width: 767px)";

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
 * Phone (≤767px): logo left; separate theme chip + hamburger on the right
 * (Enroll lives in the hamburger sheet). Tablet+: frosted pill with Menu + Enroll.
 *
 * @param props - Shared menu state and handlers from {@link SiteShell}.
 * @returns Landmark navigation header.
 */
export function Header({ menuOpen, onMenuToggle, onNavigate }: HeaderProps) {
  const [hidden, setHidden] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(PHONE_MQ);
    /**
     * Keeps phone layout in sync with the viewport.
     */
    function sync(): void {
      setIsPhone(mq.matches);
    }
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    /**
     * Keep the header visible while the mobile menu is open.
     */
    if (menuOpen) {
      setHidden(false);
      return;
    }

    let lastY = window.scrollY;
    let ticking = false;

    /**
     * True when any part of the footer is in (or about to enter) the viewport.
     */
    function footerInView(): boolean {
      const footer = document.getElementById("dsca-footer");
      if (!footer) {
        return false;
      }
      const top = footer.getBoundingClientRect().top;
      return top < window.innerHeight - 8;
    }

    /**
     * Hide on scroll-down into the footer; show again on scroll-up.
     */
    function update(): void {
      ticking = false;
      const y = window.scrollY;
      const goingUp = y < lastY - 2;
      const goingDown = y > lastY + 2;
      lastY = y;

      if (goingUp || y < 24) {
        setHidden(false);
        return;
      }

      if (goingDown && footerInView()) {
        setHidden(true);
      }
    }

    /**
     * Coalesces scroll events to one rAF tick.
     */
    function onScroll(): void {
      if (ticking) {
        return;
      }
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  return (
    <nav
      className={[styles.header, hidden ? styles.hidden : null]
        .filter(Boolean)
        .join(" ")}
      aria-label="Primary"
      aria-hidden={hidden || undefined}
    >
      <div className={styles.bar}>
        <LogoBox onNavigate={onNavigate} />
        {isPhone ? (
          <div className={styles.actions}>
            <ThemeToggle variant="chip" />
            <MenuToggle
              open={menuOpen}
              onToggle={onMenuToggle}
              variant="hamburger"
            />
          </div>
        ) : (
          <NavPill
            menuOpen={menuOpen}
            onMenuToggle={onMenuToggle}
            onNavigate={onNavigate}
          />
        )}
      </div>
    </nav>
  );
}
