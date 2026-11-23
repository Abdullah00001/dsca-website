/**
 * @fileoverview Home Utilities
 * @module features/home/lib
 */

/** Matches hero / why compact layout (phone + tablet). */
export const HOME_COMPACT_MQ = "(max-width: 1023px)";

/**
 * Formats a Home display name.
 */
export function formatHomeName(name: string): string {
  return name.trim();
}

/**
 * True on phone/tablet widths where pin+scrub fights touch scroll.
 */
export function isHomeCompactViewport(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(HOME_COMPACT_MQ).matches;
}

/**
 * Subscribes to viewport **width** changes only.
 * Ignores mobile browser chrome show/hide (height-only `resize`),
 * which otherwise rebuilds ScrollTrigger pins and yanks scroll up.
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
