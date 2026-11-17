/**
 * @fileoverview GSAP magnetic pull for `.btn` / totop — port of reference `app.js`.
 * @module components/layout/magnetic-buttons
 */

"use client";

import { useEffect } from "react";
import gsap from "gsap";

/** Matches reference selector intent: liquid buttons + back-to-top. */
const MAGNETIC_SELECTOR = '[data-magnetic="btn"], [data-magnetic="totop"]';

/**
 * Props for {@link MagneticButtons}.
 */
export interface MagneticButtonsProps {
  /**
   * When `false`, clears transforms and ignores pointer move
   * (e.g. while the mobile menu is open).
   * @default true
   */
  enabled?: boolean;
}

/**
 * Applies the DSCA reference magnetic cursor effect to marked buttons.
 *
 * Offset is computed from the element’s untransformed center so GSAP does not
 * feed its own translate back into `getBoundingClientRect` (that feedback loop
 * makes the chrome jitter).
 *
 * @param props - Enable flag from the site shell.
 * @returns `null` (side-effect only).
 */
export function MagneticButtons({ enabled = true }: MagneticButtonsProps) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none)").matches;
    if (reduce || coarse) {
      return;
    }

    let magnet: HTMLElement | null = null;

    /**
     * Clears any active magnetic translate.
     */
    function resetMagnet(): void {
      if (!magnet) {
        return;
      }
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
      magnet = null;
    }

    if (!enabled) {
      resetMagnet();
      return;
    }

    /**
     * Pulls the hovered button toward the pointer (reference `pointermove`).
     *
     * @param event - Pointer event from the document.
     */
    function onPointerMove(event: PointerEvent): void {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const next = target.closest(MAGNETIC_SELECTOR);
      const button = next instanceof HTMLElement ? next : null;

      if (magnet && magnet !== button) {
        resetMagnet();
      }

      if (!button) {
        return;
      }

      const rect = button.getBoundingClientRect();
      const currentX = Number(gsap.getProperty(button, "x")) || 0;
      const currentY = Number(gsap.getProperty(button, "y")) || 0;
      // Un-transformed center — avoids the translate feedback loop / shake.
      const centerX = rect.left + rect.width / 2 - currentX;
      const centerY = rect.top + rect.height / 2 - currentY;

      magnet = button;
      gsap.to(button, {
        x: (event.clientX - centerX) * 0.22,
        y: (event.clientY - centerY) * 0.3,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      if (magnet) {
        gsap.set(magnet, { x: 0, y: 0 });
        magnet = null;
      }
    };
  }, [enabled]);

  return null;
}
