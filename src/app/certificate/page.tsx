import type { Metadata } from "next";
import { CertificateView } from "@/features/certificate";
import { constructMetadata } from "@/libs/seo";

export const metadata: Metadata = constructMetadata({
  title: "Verify Certificate | DSCA Barista Academy Dhaka",
  description:
    "Verify the authenticity of any DSCA barista completion certificate. Enter certificate ID (e.g. DSCA-2026-0001) for instant ISO 9001:2015 credential validation.",
  canonicalUrl: "https://dsca.academy/certificate",
});

export default function CertificatePage() {
  return <CertificateView />;
}

