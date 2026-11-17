/**
 * @fileoverview Circular social brand icon for footer (and reusable chrome).
 * @module components/ui/social-icon
 */

import type { ReactNode } from "react";
import styles from "@/components/ui/social-icon/social-icon.module.css";

/**
 * Supported social platforms.
 */
export type SocialPlatform = "facebook" | "instagram" | "youtube" | "tiktok";

/**
 * Props for {@link SocialIcon}.
 */
export interface SocialIconProps {
  /** Platform whose glyph to render. */
  platform: SocialPlatform;
  /** Accessible name (also used as the link label). */
  label: string;
  /** External profile URL. */
  href: string;
}

/**
 * Inline SVG marks — currentColor so CSS can theme them.
 */
const ICONS: Record<SocialPlatform, ReactNode> = {
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"
      />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zm6.1-8.2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 3.5c-2.3 0-2.6 0-3.5.1-.9 0-1.5.2-2 .4a4 4 0 0 0-1.5 1 4 4 0 0 0-1 1.5c-.2.5-.3 1.1-.4 2-.1.9-.1 1.2-.1 3.5s0 2.6.1 3.5c0 .9.2 1.5.4 2a4 4 0 0 0 1 1.5 4 4 0 0 0 1.5 1c.5.2 1.1.3 2 .4.9.1 1.2.1 3.5.1s2.6 0 3.5-.1c.9 0 1.5-.2 2-.4a4 4 0 0 0 1.5-1 4 4 0 0 0 1-1.5c.2-.5.3-1.1.4-2 .1-.9.1-1.2.1-3.5s0-2.6-.1-3.5c0-.9-.2-1.5-.4-2a4 4 0 0 0-1-1.5 4 4 0 0 0-1.5-1c-.5-.2-1.1-.3-2-.4-.9-.1-1.2-.1-3.5-.1zm0 1.5c2.3 0 2.5 0 3.4.1.8 0 1.2.2 1.5.3.4.1.6.3.9.6.3.3.5.5.6.9.1.3.3.7.3 1.5.1.9.1 1.1.1 3.4s0 2.5-.1 3.4c0 .8-.2 1.2-.3 1.5-.1.4-.3.6-.6.9-.3.3-.5.5-.9.6-.3.1-.7.3-1.5.3-.9.1-1.1.1-3.4.1s-2.5 0-3.4-.1c-.8 0-1.2-.2-1.5-.3-.4-.1-.6-.3-.9-.6-.3-.3-.5-.5-.6-.9-.1-.3-.3-.7-.3-1.5-.1-.9-.1-1.1-.1-3.4s0-2.5.1-3.4c0-.8.2-1.2.3-1.5.1-.4.3-.6.6-.9.3-.3.5-.5.9-.6.3-.1.7-.3 1.5-.3.9-.1 1.1-.1 3.4-.1z"
      />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M23 12.2s0-3.2-.4-4.7c-.2-.9-.9-1.6-1.8-1.8C19.3 5.3 12 5.3 12 5.3s-7.3 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8 1.5.4 8.8.4 8.8.4s7.3 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.7.4-4.7zM9.8 15.5v-6.6l6.1 3.3-6.1 3.3z"
      />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M19.6 7.4a5.6 5.6 0 0 1-3.3-1.1v7.2a5.5 5.5 0 1 1-4.7-5.4v2.8a2.8 2.8 0 1 0 2 2.7V2.5h2.7a5.6 5.6 0 0 0 3.3 3.2v1.7z"
      />
    </svg>
  ),
};

/**
 * Circular social link with a brand glyph (no visible text).
 *
 * @param props - Platform, label, and href.
 * @returns Accessible circular icon link.
 */
export function SocialIcon({ platform, label, href }: SocialIconProps) {
  return (
    <a
      href={href}
      className={styles.soc}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      {ICONS[platform]}
    </a>
  );
}
