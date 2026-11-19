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
 * Trainers-page visit band — reference
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
 * Generic enroll band used on course-style pages.
 */
export const PAGE_CTA_ENROLL: PageCtaContent = {
  eyebrow: "Next batch · 12 seats",
  titleBefore: "Your first",
  titleAccent: "shot",
  body: "Tell us the course you want. We reply with the batch date and how to hold your seat.",
  cta: { label: "Enroll now", href: "/contact" },
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
