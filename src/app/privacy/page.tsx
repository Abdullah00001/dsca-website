import type { Metadata } from "next";
import { LegalView } from "@/features/legal";
import { constructMetadata } from "@/libs/seo";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy | Dhaka Specialty Coffee Academy",
  description:
    "Privacy Policy and student data governance for Dhaka Specialty Coffee Academy (DSCA).",
  canonicalUrl: "https://dsca.academy/privacy",
});

export default function PrivacyPage() {
  return <LegalView documentType="privacy" />;
}

