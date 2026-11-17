/**
 * @fileoverview Site navigation link configuration.
 * @module libs/navigation
 */

/**
 * A single navigable destination in the site chrome.
 */
export interface NavItem {
  /** Visible label shown in the header or mobile menu. */
  readonly label: string;
  /** Absolute app-router path (e.g. `/courses`). */
  readonly href: string;
}

/**
 * Primary links shown inside the desktop nav pill (hidden below 900px).
 */
export const NAV_PRIMARY: readonly NavItem[] = [
  { label: "Courses", href: "/courses" },
  { label: "Locations", href: "/locations" },
  { label: "Trainers", href: "/trainers" },
  { label: "Blog", href: "/blog" },
] as const;

/**
 * Full link set for the circular full-screen mobile menu overlay.
 */
export const NAV_MENU: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Locations", href: "/locations" },
  { label: "Trainers", href: "/trainers" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Certificate", href: "/certificate" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Primary conversion CTA shown in the nav pill.
 */
export const NAV_ENROLL: NavItem = {
  label: "Enroll",
  href: "/contact",
};

/**
 * Footer microcopy shown at the bottom of the mobile menu.
 */
export const NAV_MENU_FOOTER =
  "House 34/A, Indira Road, Farmgate, Dhaka · Open Sat to Fri, 9am to 9pm · (+880) 1810-545545";
