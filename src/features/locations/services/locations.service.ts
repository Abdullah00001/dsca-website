/**
 * @fileoverview Locations Service Layer
 * @module features/locations/services
 */

import { AREAS_DATA } from "./areas-data";
import type { LocationHub, LocationArea } from "../types";

const AREA_META: Record<string, [title: string, desc: string]> = {
  farmgate: [
    "Barista Course in Farmgate, Dhaka | DSCA",
    "Barista course in Farmgate at DSCA, a short walk from Farmgate Metro Station. Small batches, courses from 3 days (৳4,950). Call to book.",
  ],
  "indira-road": [
    "Barista Course on Indira Road, Dhaka | DSCA",
    "Barista course on Indira Road at DSCA, House 34/A, Kazi & Chitra Square. Hands-on espresso and latte art, from 3 days (৳4,950). Call to book.",
  ],
  "karwan-bazar": [
    "Barista Course Near Karwan Bazar, Dhaka | DSCA",
    "Barista course one metro stop from Karwan Bazar. DSCA on Indira Road, Farmgate, about 1 km away. From 3 days (৳4,950). Call +880 1810-545545.",
  ],
  dhanmondi: [
    "Barista Course for Dhanmondi Students | DSCA",
    "Barista course for Dhanmondi students at DSCA, Farmgate, about 3 to 4 km by road via Panthapath. Courses from 3 days (৳4,950). Call to book.",
  ],
  rajabazar: [
    "Barista Course in Rajabazar, Dhaka | DSCA",
    "Barista course about 1 km from Rajabazar. DSCA on Indira Road, Farmgate, with small batches. From 3 days (৳4,950). Call to book.",
  ],
  "green-road": [
    "Barista Classes Near Green Road, Dhaka | DSCA",
    "Barista classes near Green Road at DSCA, Farmgate, about 2 km away by rickshaw or CNG. From 3 days (৳4,950). Call +880 1810-545545.",
  ],
  shahbag: [
    "Barista Course for Shahbag Students | DSCA",
    "Barista course two metro stops from Shahbag. DSCA on Indira Road, Farmgate. A 3-day option (৳4,950) suits student schedules. Call to book.",
  ],
  "bijoy-sarani": [
    "Barista Course Near Bijoy Sarani, Dhaka | DSCA",
    "Barista course one metro stop from Bijoy Sarani. DSCA on Indira Road, Farmgate, about 1.5 km away. From 3 days (৳4,950). Call to book.",
  ],
  agargaon: [
    "Barista Course Near Agargaon, Dhaka | DSCA",
    "Barista course two metro stops from Agargaon. DSCA on Indira Road, Farmgate, about 2.5 km away. From 3 days (৳4,950). Call to book.",
  ],
  hatirjheel: [
    "Barista Course Near Hatirjheel, Dhaka | DSCA",
    "Barista course near Hatirjheel at DSCA, Farmgate, about 2 to 3 km from the lake. Courses from 3 days (৳4,950). Call +880 1810-545545.",
  ],
  tejgaon: [
    "Barista Course in Tejgaon, Dhaka | DSCA",
    "Barista course in Tejgaon at DSCA, Farmgate, about 1.5 to 2.5 km from Tejgaon Industrial Area. From 3 days (৳4,950). Call to book.",
  ],
};

const AREA_NAMES: Record<string, string> = {
  farmgate: "Farmgate",
  "indira-road": "Indira Road",
  "karwan-bazar": "Karwan Bazar",
  dhanmondi: "Dhanmondi",
  rajabazar: "Rajabazar",
  "green-road": "Green Road",
  shahbag: "Shahbag",
  "bijoy-sarani": "Bijoy Sarani",
  agargaon: "Agargaon",
  hatirjheel: "Hatirjheel",
  tejgaon: "Tejgaon",
};

export async function getLocationHub(): Promise<LocationHub> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  return {
    h1: AREAS_DATA.hub.h1,
    blocks: (AREAS_DATA.hub.blocks as unknown) as [type: string, content: string][],
  };
}

export async function getAllLocationAreas(): Promise<LocationArea[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const result: LocationArea[] = [];

  for (const [key, rawArea] of Object.entries(AREAS_DATA.areas)) {
    const areaObj = rawArea as { h1: string; blocks: unknown };
    const meta = AREA_META[key] || [
      `Barista Course for ${AREA_NAMES[key] || key} | DSCA`,
      `Learn professional coffee and latte art at DSCA Farmgate, easily accessible from ${AREA_NAMES[key] || key}.`,
    ];

    result.push({
      id: key,
      name: AREA_NAMES[key] || key,
      h1: areaObj.h1,
      blocks: areaObj.blocks as [type: string, content: string][],
      metaTitle: meta[0],
      metaDescription: meta[1],
    });
  }

  return result;
}

export async function getLocationAreaById(id: string): Promise<LocationArea | null> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  const key = id.toLowerCase().replace(/\s+/g, "-");
  const areasRecord = AREAS_DATA.areas as Record<string, { h1: string; blocks: unknown } | undefined>;
  const areaObj = areasRecord[key];

  if (!areaObj) return null;

  const meta = AREA_META[key] || [
    `Barista Course for ${AREA_NAMES[key] || key} | DSCA`,
    `Learn professional coffee and latte art at DSCA Farmgate, easily accessible from ${AREA_NAMES[key] || key}.`,
  ];

  return {
    id: key,
    name: AREA_NAMES[key] || key,
    h1: areaObj.h1,
    blocks: areaObj.blocks as [type: string, content: string][],
    metaTitle: meta[0],
    metaDescription: meta[1],
  };
}
