/**
 * @fileoverview DSCA brand logo image atom.
 * @module components/ui/logo
 */

import Image from "next/image";
import styles from "@/components/ui/logo/logo.module.css";

/** Public path to the DSCA wordmark / mark SVG. */
export const LOGO_SRC = "/assets/logo.svg";

/**
 * Props for {@link Logo}.
 */
export interface LogoProps {
  /**
   * Rendered height in CSS pixels. Width scales automatically.
   * @default 46
   */
  height?: number;
  /**
   * Accessible alternative text for the logo image.
   * @default "Dhaka Specialty Coffee Academy"
   */
  alt?: string;
  /** Optional class name merged onto the image. */
  className?: string;
  /** Optional priority hint for above-the-fold usage (e.g. site header). */
  priority?: boolean;
}

/**
 * Renders the DSCA logo using Next.js `Image` for optimized delivery.
 *
 * @param props - Logo display options.
 * @returns Optimized brand logo image.
 */
export function Logo({
  height = 46,
  alt = "Dhaka Specialty Coffee Academy",
  className,
  priority = false,
}: LogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt={alt}
      width={Math.round(height * 2.4)}
      height={height}
      priority={priority}
      unoptimized
      className={[styles.logo, className].filter(Boolean).join(" ")}
      style={{ ["--logo-height" as string]: `${height}px` }}
    />
  );
}
