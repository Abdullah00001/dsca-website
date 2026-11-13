import type { Metadata } from "next";
import { ContactView } from "@/features/contact";
import { constructMetadata } from "@/libs/seo";

export const metadata: Metadata = constructMetadata({
  title: "Enroll or Request a Callback | DSCA Farmgate Campus",
  description:
    "Twelve seats per batch. Reach out via WhatsApp or submit an inquiry to hold your seat for the next DSCA barista training session in Farmgate, Dhaka.",
  canonicalUrl: "https://dsca.academy/contact",
});

export default function ContactPage() {
  return <ContactView />;
}

