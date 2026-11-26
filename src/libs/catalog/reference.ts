/**
 * @fileoverview Typed reference catalog (courses, trainers, posts, areas).
 * Copy is taken from the DSCA static site `app.js` data, not invented.
 * @module libs/catalog/reference
 */

import raw from "./reference-data.json";

/** One barista course from the reference `C` array. */
export type CatalogCourse = {
  id: string;
  n: string;
  d: string;
  p: string;
  o: string;
  off: string;
  lv: string;
  g: string;
  s: string;
  t: string;
  learn: string[];
  plan: [string, string][];
  best: string;
};

/** One trainer from the reference `T` array. */
export type CatalogTrainer = {
  id: string;
  n: string;
  r: string;
  g: string;
  b: string;
  f: string[];
};

/** One blog post from the reference `P` array. */
export type CatalogPost = {
  id: string;
  n: string;
  c: string;
  m: string;
  g: string;
  s: string;
};

/**
 * Area content block.
 * Shapes follow `blocksHTML`: p, h2, areas, fees, faq, close, tbl.
 */
export type AreaBlock = [string, ...unknown[]];

/** Hub or neighbourhood page from the reference `AREAS` object. */
export type AreaPage = {
  h1: string;
  blocks: AreaBlock[];
};

/**
 * Area card row from the reference `AL` list.
 * `[slug, name, title, kicker, route, blurb]`.
 */
export type AreaCard = [string, string, string, string, string, string];

/** Full course catalog. */
export const COURSES = raw.courses as CatalogCourse[];

/** Trainer roster. */
export const TRAINERS = raw.trainers as CatalogTrainer[];

/** Blog guides. */
export const POSTS = raw.posts as CatalogPost[];

/** Locations hub plus per-area pages. */
export const AREAS = raw.areas as unknown as {
  hub: AreaPage;
  areas: Record<string, AreaPage>;
};

/** Area cards shown on the locations hub. */
export const AREA_LIST = raw.areaList as AreaCard[];

/** Portrait paths already in `/public`. */
export const TRAINER_IMAGE: Record<string, string> = {
  zobayer: "/assets/trainers/zobayer.jpg",
  mehedy: "/assets/trainers/mehedy.jpg",
  abdullah: "/assets/trainers/abdullah.jpg",
  motaher: "/assets/trainers/motaher.jpg",
};

/** Session photos used on course cards and heroes. */
export const COURSE_IMAGE: Record<string, string> = {
  intermediate: "/assets/courses/int1.jpg",
  professional: "/assets/courses/bar.jpg",
  starter: "/assets/courses/staff.jpg",
  advance: "/assets/courses/lounge.jpg",
  food: "/assets/courses/hall.jpg",
};

/** Shared campus photos. */
export const PHOTO = {
  staff: "/assets/why/staff.jpg",
  staff2: "/assets/why/staff2.jpg",
  lounge: "/assets/why/lounge.jpg",
  hall: "/assets/why/hall.jpg",
  bar: "/assets/why/bar.jpg",
  int1: "/assets/courses/int1.jpg",
  cert: "/assets/cert.jpg",
  badge: "/assets/badge.svg",
} as const;

/** Campus address used on location and contact pages. */
export const ADDRESS =
  "House 34/A, Indira Road, Farmgate, Dhaka-1215 (Kazi & Chitra Square, Lift 5, next to Kutubbag Darbar Sharif)";

/** Opening hours. */
export const HOURS = "Saturday to Friday, 9:00 am to 9:00 pm";

/** Public phone label. */
export const PHONE = "(+880) 1810-545545";

/** WhatsApp deep link. */
export const WHATSAPP = "https://wa.me/8801810545545";

/** Telephone link. */
export const TEL = "tel:+8801810545545";

/** Card palette from the reference `PAL` array. */
export const PAL = [
  "mint",
  "gold",
  "forest",
  "ink",
  "pale",
] as const;

/** Blog category chip colours (`CAT`). */
export const CATEGORY_TONE: Record<string, "gold" | "mint" | "peach" | "lilac"> =
  {
    Guide: "gold",
    Career: "mint",
    Industry: "peach",
    Brewing: "lilac",
  };

/**
 * Finds a record by id, matching reference `find()`.
 *
 * @param list - Catalog rows.
 * @param id - Slug.
 */
export function findById<T extends { id: string }>(
  list: readonly T[],
  id: string,
): T | undefined {
  return list.find((item) => item.id === id);
}

/**
 * Turns reference hash links inside area closers into app routes.
 *
 * @param text - Plain sentence from `AREAS`.
 * @returns Text with markdown-like link markers left as plain text segments.
 */
export function linkifyParts(
  text: string,
): { text: string; href?: string }[] {
  const rules: [RegExp, string][] = [
    [/read about our trainers and DSCA/, "SPLIT_TRAINERS_DSCA"],
    [/(read about our trainers|meet our trainers)/i, "/trainers"],
    [/read about DSCA/, "/about"],
    [/(see (?:all )?the (?:Dhaka )?areas we serve)/i, "/locations"],
    [
      /(compare every option in the full barista course guide|compare the full barista course guide|compare all barista courses in Dhaka|compare barista courses in Dhaka)/i,
      "/courses",
    ],
  ];

  if (/read about our trainers and DSCA/.test(text)) {
    const parts = text.split("read about our trainers and DSCA");
    return [
      { text: parts[0] ?? "" },
      { text: "trainers", href: "/trainers" },
      { text: " and " },
      { text: "DSCA", href: "/about" },
      { text: parts[1] ?? "" },
    ];
  }

  for (const [pattern, href] of rules) {
    const match = pattern.exec(text);
    if (!match || match.index === undefined) continue;
    const label = match[1] ?? match[0];
    return [
      { text: text.slice(0, match.index) },
      { text: label, href },
      { text: text.slice(match.index + match[0].length) },
    ];
  }

  return [{ text }];
}
