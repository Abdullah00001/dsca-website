/**
 * @fileoverview Frosted white logo link molecule for the site header.
 * @module components/layout/logo-box
 */

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import styles from "@/components/layout/logo-box/logo-box.module.css";

/**
 * Props for {@link LogoBox}.
 */
export interface LogoBoxProps {
  /** Optional callback when the home link is activated. */
  onNavigate?: () => void;
}

/**
 * Home-linked logo wrapped in the reference white pill container.
 *
 * @param props - Optional navigate callback.
 * @returns Accessible home logo control.
 */
export function LogoBox({ onNavigate }: LogoBoxProps) {
  return (
    <Link
      href="/"
      id="dsca-header-logo"
      className={styles.box}
      aria-label="DSCA home"
      onClick={onNavigate}
    >
      <Logo priority height={46} />
    </Link>
  );
}
