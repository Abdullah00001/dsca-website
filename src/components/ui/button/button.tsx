/**
 * @fileoverview DSCA liquid-fill button atom (reference `.btn`).
 * @module components/ui/button
 */

import type { ReactNode } from "react";
import Link from "next/link";
import styles from "@/components/ui/button/button.module.css";

/**
 * Visual variants matching the reference button system.
 */
export type ButtonVariant = "default" | "ghost" | "dark" | "line";

/**
 * Control size matching reference `.btn` / `.btn.big`.
 */
export type ButtonSize = "default" | "big";

/**
 * Props for {@link Button}.
 */
export interface ButtonProps {
  /** Visible label text. */
  children: ReactNode;
  /**
   * Destination. Internal paths use Next `Link`; others render a native anchor.
   */
  href: string;
  /**
   * Button surface style.
   * @default "default"
   */
  variant?: ButtonVariant;
  /**
   * Control size.
   * @default "default"
   */
  size?: ButtonSize;
  /**
   * Trailing arrow glyph (reference `<i>→</i>`).
   * @default true
   */
  showArrow?: boolean;
  /** Optional class name merged onto the control. */
  className?: string;
}

/**
 * Returns `true` when `href` should open as an external / protocol link.
 *
 * @param href - Link destination.
 */
function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:")
  );
}

/**
 * Primary DSCA CTA button with liquid hover fill and arrow badge.
 *
 * @param props - Label, href, and variant options.
 * @returns Styled link button.
 */
export function Button({
  children,
  href,
  variant = "default",
  size = "default",
  showArrow = true,
  className,
}: ButtonProps) {
  const classNames = [
    styles.btn,
    variant === "ghost" ? styles.ghost : null,
    variant === "dark" ? styles.dark : null,
    variant === "line" ? styles.line : null,
    size === "big" ? styles.big : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? <i className={styles.icon}>→</i> : null}
    </>
  );

  if (isExternalHref(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classNames}
        data-magnetic="btn"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames} data-magnetic="btn">
      {content}
    </Link>
  );
}
