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
 * True when any part of `#dsca-footer` intersects the viewport.
 *
 * @returns Whether the footer is on screen.
 */
function isFooterOnScreen(): boolean {
  const footer = document.getElementById("dsca-footer");
  if (!footer) {
    return false;
  }
  const rect = footer.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

/**
 * Fixed top chrome matching the DSCA reference navigation bar.
 *
 * Visible only while the footer is completely off-screen below the fold.
 * Any footer pixel on screen (including while scrolling up inside it)
 * keeps the nav hidden.
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

    let ticking = false;

    /**
     * Hide nav whenever the footer is on screen; show only outside it.
     */
    function update(): void {
      ticking = false;
      setHidden(isFooterOnScreen());
    }

    /**
     * Coalesces scroll/resize to one rAF tick.
     */
    function onScrollOrResize(): void {
      if (ticking) {
        return;
      }
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
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
