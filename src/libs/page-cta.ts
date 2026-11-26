/**
 * @fileoverview Shared page-end CTA presets (reference `cta()` / `.last`).
 * @module libs/page-cta
 */

/**
 * Copy + action for {@link PageCta}.
 */
export type PageCtaContent = {
  /** Small uppercase line above the headline. */
  eyebrow: string;
  /** Plain title text before the italic accent. */
  titleBefore: string;
  /** Italic accent word/phrase (serif, gold). */
  titleAccent: string;
  /** Supporting paragraph under the headline. */
  body: string;
  /** Primary button. */
  cta: {
    label: string;
    href: string;
  };
};

/**
 * Home / generic enroll band — reference
 * `cta('Your first<br><span class="it">shot</span> starts here', …)`.
 */
export const PAGE_CTA_ENROLL: PageCtaContent = {
  eyebrow: "Next batch · 12 seats",
  titleBefore: "Your first",
  titleAccent: "shot",
  body: "Tell us the course you want. We reply with the batch date and how to hold your seat.",
  cta: { label: "Enroll now", href: "/contact" },
} as const;

/**
 * Courses index — reference
 * `cta('Ready to <span class="it">pour?</span>', …)`.
 */
export const PAGE_CTA_POUR: PageCtaContent = {
  eyebrow: "Next batch · 12 seats",
  titleBefore: "Ready to",
  titleAccent: "pour?",
  body: "Compare, pick your batch and reserve your seat. Batches are capped at 12 students.",
  cta: { label: "Enroll now", href: "/contact" },
} as const;

/**
 * Trainers — reference
 * `cta('Meet them in <span class="it">person</span>', …, 'Plan a visit')`.
 */
export const PAGE_CTA_VISIT: PageCtaContent = {
  eyebrow: "Next batch · 12 seats",
  titleBefore: "Meet them in",
  titleAccent: "person",
  body: "Visit the academy in Farmgate, see the bar and talk to a trainer before you decide.",
  cta: { label: "Plan a visit", href: "/contact" },
} as const;

/**
 * Locations — reference
 * `cta('Not sure how to <span class="it">get here?</span>', …, 'WhatsApp us')`.
 */
export const PAGE_CTA_DIRECTIONS: PageCtaContent = {
  eyebrow: "Next batch · 12 seats",
  titleBefore: "Not sure how to",
  titleAccent: "get here?",
  body: "Message us your starting point and we will share the easiest route.",
  cta: { label: "WhatsApp us", href: "https://wa.me/8801810545545" },
} as const;

/**
 * Gallery — reference
 * `cta('Want to be in the <span class="it">next photo?</span>', …)`.
 */
export const PAGE_CTA_GALLERY: PageCtaContent = {
  eyebrow: "Next batch · 12 seats",
  titleBefore: "Want to be in the",
  titleAccent: "next photo?",
  body: "Join the next batch and train on the same bar.",
  cta: { label: "Join a batch", href: "/contact" },
} as const;

/**
 * About — reference Nov copy
 * `cta('Ready to start your <span class="it">barista career?</span>', …)`.
 */
export const PAGE_CTA_CAREER: PageCtaContent = {
  eyebrow: "Next batch · 12 seats",
  titleBefore: "Ready to start your",
  titleAccent: "barista career?",
  body: "Come and see the academy, meet the trainers and pick the course that fits. Our team will walk you through the options and answer your questions.",
  cta: { label: "Enroll Now", href: "/contact" },
} as const;

/**
 * Words in the CTA trailing marquee (reference `cta()` → `.mq[data-mq=r]`).
 */
export const PAGE_CTA_MARQUEE_ITEMS = [
  "Enroll now",
  "Intermediate",
  "Professional",
  "Starter Pack",
  "Advance",
] as const;
