/**
 * @fileoverview Primary Enroll call-to-action atom for the site header.
 * @module components/ui/enroll-cta
 */

import Link from "next/link";
import { NAV_ENROLL } from "@/libs/navigation";
import styles from "@/components/ui/enroll-cta/enroll-cta.module.css";

/**
 * Props for {@link EnrollCta}.
 */
export interface EnrollCtaProps {
  /**
   * Optional override for the CTA label.
   * @default NAV_ENROLL.label
   */
  label?: string;
  /**
   * Optional override for the CTA destination.
   * @default NAV_ENROLL.href
   */
  href?: string;
  /** Optional callback when the CTA is activated. */
  onNavigate?: () => void;
  /** Optional class name merged onto the link. */
  className?: string;
}

/**
 * Gold pill link that drives enrollment / contact conversion from the header.
 *
 * @param props - Optional label / href overrides.
 * @returns Styled enrollment CTA link.
 */
export function EnrollCta({
  label = NAV_ENROLL.label,
  href = NAV_ENROLL.href,
  onNavigate,
  className,
}: EnrollCtaProps) {
  return (
    <Link
      href={href}
      className={[styles.cta, className].filter(Boolean).join(" ")}
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}
