/**
 * @fileoverview Certificate verification.
 */

import type { Metadata } from "next";
import { CertificateView } from "@/features/certificate";

export const metadata: Metadata = {
  title: "Verify a DSCA Certificate",
  description:
    "Enter the certificate number printed on a DSCA certificate to confirm it is genuine.",
};

/**
 * Certificate lookup.
 *
 * @returns Certificate page.
 */
export default function CertificatePage() {
  return <CertificateView />;
}
