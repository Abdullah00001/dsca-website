/**
 * @fileoverview Home Utilities
 * @module features/home/lib
 */

import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Matches hero / why compact layout (phone + tablet). */
export const HOME_COMPACT_MQ = "(max-width: 1023px)";

/**
 * Formats a Home display name.
 */
export function formatHomeName(name: string): string {
  return name.trim();
}

/**
 * True on phone/tablet widths (layout breakpoints).
 */
export function isHomeCompactViewport(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(HOME_COMPACT_MQ).matches;
}

/**
 * Keep pin+scrub animations on touch devices without URL-bar resize yanks.
 * Call once from the home page mount.
 *
 * GSAP skips refresh when only height changes (address bar show/hide)
 * unless width changes or height jumps by >25%.
 */
export function enableHomeScrollTriggerStability(): void {
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/**
 * Subscribes to viewport **width** changes only.
 * Ignores mobile browser chrome show/hide (height-only `resize`),
 * which otherwise rebuilds custom home layouts and yanks scroll up.
 *
 * @param onWidthChange - Called when CSS width changes by ≥1px.
 * @returns Unsubscribe.
 */
export function onHomeViewportWidthChange(onWidthChange: () => void): () => void {
  let lastWidth = window.innerWidth;
  let timer = 0;

  const run = (): void => {
    const next = window.innerWidth;
    if (Math.abs(next - lastWidth) < 1) {
      return;
    }
    lastWidth = next;
    onWidthChange();
  };

  const onResize = (): void => {
    window.clearTimeout(timer);
    timer = window.setTimeout(run, 180);
  };

  window.addEventListener("resize", onResize);
  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("resize", onResize);
  };
}
