/**
 * @fileoverview Home academy gallery (reference post-reviews `gal` + filter).
 * @module features/home/lib/gallery-content
 */

/** Filter keys. `all` shows every photo. */
export type GalleryFilterId = "all" | "hands-on" | "events" | "certificate";

/** One academy photo. */
export type GalleryItem = {
  /** Stable id. */
  id: string;
  /** Which filter shows this photo. */
  filter: Exclude<GalleryFilterId, "all">;
  /** Label over the photo (reference `phi2` caption). */
  label: string;
  /** Image alt. */
  alt: string;
  /** Image under `/public`. */
  image: string;
};

/**
 * Reference “Our Academy” block, with the four gallery filters.
 */
export const GALLERY_CONTENT = {
  eyebrow: "Our Academy",
  titleBefore: "Inside DSCA: Our Barista Training Academy",
  titleAccent: "in Farmgate",
  lead: "Our academy is built like a working café, not a classroom. You practise on commercial espresso machines, work at real barista stations, and learn in small groups with an instructor beside you. Take a look around.",
  cta: { label: "Book a Campus Visit", href: "/contact" },
  filters: [
    { id: "all", label: "All" },
    { id: "hands-on", label: "Hands-on practice" },
    { id: "events", label: "Student workshop & events" },
    { id: "certificate", label: "Certificate" },
  ] as const satisfies readonly { id: GalleryFilterId; label: string }[],
  items: [
    {
      id: "bar",
      filter: "hands-on",
      label: "Your training bar: commercial machines from day one.",
      alt: "Barista training bar with commercial espresso machines at DSCA, Dhaka",
      image: "/assets/why/bar.jpg",
    },
    {
      id: "latte",
      filter: "hands-on",
      label: "Latte art practice with instructor feedback.",
      alt: "Student practising latte art during a DSCA barista course",
      image: "/assets/why/staff.jpg",
    },
    {
      id: "steam",
      filter: "hands-on",
      label: "Milk steaming, demonstrated up close.",
      alt: "DSCA instructor demonstrating milk steaming technique",
      image: "/assets/why/staff2.jpg",
    },
    {
      id: "brew",
      filter: "hands-on",
      label: "Specialty brewing: pour-over, AeroPress and V60.",
      alt: "Pour-over and V60 brewing station at Dhaka Specialty Coffee Academy",
      image: "/assets/why/counter.jpg",
    },
    {
      id: "batch",
      filter: "events",
      label: "A small batch, hands on at every station.",
      alt: "DSCA barista course batch in class",
      image: "/assets/why/hall.jpg",
    },
    {
      id: "campus",
      filter: "events",
      label: "Find us at Kazi & Chitra Square, Indira Road, Farmgate.",
      alt: "Inside Dhaka Specialty Coffee Academy on Indira Road, Farmgate",
      image: "/assets/courses/int1.jpg",
    },
    {
      id: "certificate",
      filter: "certificate",
      label: "Certificate handover.",
      alt: "DSCA lounge and certificate handover area",
      image: "/assets/why/lounge.jpg",
    },
  ] as const satisfies readonly GalleryItem[],
} as const;
