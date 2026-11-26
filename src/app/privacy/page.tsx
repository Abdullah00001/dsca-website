/**
 * @fileoverview Privacy policy.
 */

import type { Metadata } from "next";
import { LegalView, PRIVACY_SECTIONS } from "@/features/legal";

export const metadata: Metadata = {
  title: "Privacy policy | DSCA",
  description: "How Dhaka Specialty Coffee Academy collects and uses personal information.",
};

/**
 * Privacy policy.
 *
 * @returns Privacy page.
 */
export default function PrivacyPage() {
  return (
    <LegalView
      crumb="Privacy policy"
      title={<>Privacy <em>policy</em></>}
      sections={PRIVACY_SECTIONS}
    />
  );
}
