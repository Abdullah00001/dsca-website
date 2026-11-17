/**
 * @fileoverview Small uppercase eyebrow label atom.
 * @module components/ui/eyebrow
 */

import type { ReactNode } from "react";
import styles from "@/components/ui/eyebrow/eyebrow.module.css";

/**
 * Props for {@link Eyebrow}.
 */
export interface EyebrowProps {
  /** Eyebrow text. */
  children: ReactNode;
  /**
   * Use light gold on dark/forest bands (footer, heroes).
   * @default false
   */
  onDark?: boolean;
  /** Optional class name. */
  className?: string;
}

/**
 * Compact uppercase section label used above large display headings.
 *
 * @param props - Label content and tone.
 * @returns Styled eyebrow paragraph.
 */
export function Eyebrow({ children, onDark = false, className }: EyebrowProps) {
  return (
    <p
      className={[styles.eyebrow, onDark ? styles.onDark : null, className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}
