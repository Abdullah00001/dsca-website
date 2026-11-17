/**
 * @fileoverview Navigation link atom with active-route styling.
 * @module components/ui/nav-link
 */

"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/components/ui/nav-link/nav-link.module.css";

/**
 * Visual variants for {@link NavLink}.
 * - `pill` — compact link inside the frosted nav pill
 * - `menu` — oversized display link inside the full-screen mobile menu
 */
export type NavLinkVariant = "pill" | "menu";

/**
 * Props for {@link NavLink}.
 */
export interface NavLinkProps {
  /** Destination path. */
  href: string;
  /** Visible label. */
  children: ReactNode;
  /**
   * Presentation style.
   * @default "pill"
   */
  variant?: NavLinkVariant;
  /** Optional callback fired after navigation (e.g. close mobile menu). */
  onNavigate?: () => void;
  /** Optional class name merged onto the anchor. */
  className?: string;
}

/**
 * Returns whether `pathname` matches `href` for active-state highlighting.
 *
 * @param pathname - Current app pathname.
 * @param href - Link destination.
 * @returns `true` when the link should appear active.
 */
function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * App Router link with active-state classes for header and menu chrome.
 *
 * @param props - Link destination and presentation options.
 * @returns Styled Next.js `Link`.
 */
export function NavLink({
  href,
  children,
  variant = "pill",
  onNavigate,
  className,
}: NavLinkProps) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);
  const baseClass = variant === "menu" ? styles.menuLink : styles.link;
  const activeClass =
    variant === "menu" ? styles.menuLinkActive : styles.linkActive;

  return (
    <Link
      href={href}
      className={[baseClass, active ? activeClass : null, className]
        .filter(Boolean)
        .join(" ")}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}
