/**
 * @fileoverview Site-wide contact, social, and footer content config.
 * @module libs/site
 */

import type { NavItem } from "@/libs/navigation";
import type { SocialPlatform } from "@/components/ui/social-icon";

/**
 * Social destination with a platform key for the circular icon button.
 */
export interface SocialItem {
  /** Accessible label (screen readers / title). */
  readonly label: string;
  /** External profile URL. */
  readonly href: string;
  /** Icon glyph key. */
  readonly platform: SocialPlatform;
}

/**
 * Academy contact and visit details (from the DSCA reference footer).
 */
export const SITE_CONTACT = {
  /** Full street address shown in the footer Visit column. */
  address:
    "House 34/A, Indira Road, Farmgate (Kazi & Chitra Square, Lift-5, next to Kutubbag Darbar Sharif), Dhaka-1215",
  /** Opening hours chip label. */
  hours: "Sat to Fri · 9am to 9pm",
  /** Display phone number. */
  phoneDisplay: "(+880) 1810-545545",
  /** `tel:` href for call actions. */
  phoneHref: "tel:+8801810545545",
  /** WhatsApp deep link. */
  whatsappHref: "https://wa.me/8801810545545",
  /** Short brand blurb under the footer logo. */
  blurb:
    "ISO 9001:2015 certified barista training institute in Dhaka. Real machines, small batches, job-ready skills.",
} as const;

/**
 * Social destinations shown in the footer brand column.
 */
export const SITE_SOCIAL: readonly SocialItem[] = [
  {
    label: "Facebook",
    platform: "facebook",
    href: "https://www.facebook.com/dhakaspecialitycoffeeacademy",
  },
  {
    label: "Instagram",
    platform: "instagram",
    href: "https://www.instagram.com/dhakaspecialitycoffeeccademy/",
  },
  {
    label: "YouTube",
    platform: "youtube",
    href: "https://www.youtube.com/@DhakaSpecialityCoffeeAcademy",
  },
  {
    label: "TikTok",
    platform: "tiktok",
    href: "https://www.tiktok.com/@dhakaspecialitycoffee",
  },
] as const;

/**
 * Quick Links column in the site footer.
 */
export const FOOTER_QUICK_LINKS: readonly NavItem[] = [
  { label: "Courses", href: "/courses" },
  { label: "About Us", href: "/about" },
  { label: "Trainers", href: "/trainers" },
  { label: "Blog", href: "/blog" },
  { label: "Verify certificate", href: "/certificate" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
] as const;

/**
 * Area links under “Barista Courses by Area”.
 */
export const FOOTER_AREA_LINKS: readonly NavItem[] = [
  { label: "Farmgate", href: "/locations/farmgate" },
  { label: "Indira Road", href: "/locations/indira-road" },
  { label: "Karwan Bazar", href: "/locations/karwan-bazar" },
  { label: "Dhanmondi", href: "/locations/dhanmondi" },
  { label: "Rajabazar", href: "/locations/rajabazar" },
  { label: "Green Road", href: "/locations/green-road" },
  { label: "Shahbag", href: "/locations/shahbag" },
  { label: "Tejgaon", href: "/locations/tejgaon" },
  { label: "Bijoy Sarani", href: "/locations/bijoy-sarani" },
  { label: "Agargaon", href: "/locations/agargaon" },
  { label: "Hatirjheel", href: "/locations/hatirjheel" },
] as const;

/**
 * Legal links in the footer bottom bar.
 */
export const FOOTER_LEGAL_LINKS: readonly NavItem[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms and conditions", href: "/terms" },
] as const;

/**
 * Top CTA band copy inside the footer.
 */
export const FOOTER_CTA = {
  eyebrow: "Next batch · 12 seats",
  /** Forced two-line lockup — never wrap to a third line. */
  titleLine1: "Ready to Start Your",
  titleLine2: "Barista Career",
  titleItalic: "in Dhaka?",
  body: "Join the next DSCA batch. Seats are capped at 12 students, and our team will help you pick the right course. Message us today and get a reply on WhatsApp.",
  primary: { label: "Enrol in the Next Batch", href: "/contact" },
  whatsapp: { label: "Chat on WhatsApp", href: SITE_CONTACT.whatsappHref },
  call: { label: "Call 01810-545545", href: SITE_CONTACT.phoneHref },
} as const;

/**
 * Copyright line in the footer bottom bar.
 */
export const FOOTER_COPYRIGHT =
  "© 2026 Dhaka Specialty Coffee Academy (DSCA). All rights reserved. ISO-certified barista training institute in Dhaka, Bangladesh.";
