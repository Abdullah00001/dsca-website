import type { Metadata } from "next";
import { LegalView } from "@/features/legal";
import { constructMetadata } from "@/libs/seo";

export const metadata: Metadata = constructMetadata({
  title: "Terms and Conditions | Dhaka Specialty Coffee Academy",
  description:
    "Enrollment terms, academy attendance guidelines, and certification requirements at DSCA.",
  canonicalUrl: "https://dsca.academy/terms",
});

export default function TermsPage() {
  return <LegalView documentType="terms" />;
}

