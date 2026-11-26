/**
 * @fileoverview Terms and conditions.
 */

import type { Metadata } from "next";
import { LegalView, TERMS_SECTIONS } from "@/features/legal";

export const metadata: Metadata = {
  title: "Terms and conditions | DSCA",
  description: "Enrollment, fees, attendance, and certificates at Dhaka Specialty Coffee Academy.",
};

/**
 * Terms and conditions.
 *
 * @returns Terms page.
 */
export default function TermsPage() {
  return (
    <LegalView
      crumb="Terms and conditions"
      title={<>Terms and <em>conditions</em></>}
      sections={TERMS_SECTIONS}
    />
  );
}
