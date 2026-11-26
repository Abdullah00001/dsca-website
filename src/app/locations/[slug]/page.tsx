/**
 * @fileoverview One neighbourhood page.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationsView } from "@/features/locations";
import { AREAS, AREA_LIST } from "@/libs/catalog";

/**
 * Prebuilds one page per area.
 *
 * @returns Static params.
 */
export function generateStaticParams() {
  return AREA_LIST.map((area) => ({ slug: area[0] }));
}

/**
 * Area metadata.
 *
 * @param props - Route params.
 * @returns Metadata.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = AREAS.areas[slug];
  const name = AREA_LIST.find((area) => area[0] === slug)?.[1];
  if (!page || !name) return {};
  return {
    title: page.h1,
    description: String(page.blocks[0]?.[1] ?? ""),
  };
}

/**
 * Neighbourhood page.
 *
 * @param props - Route params.
 * @returns Area view.
 */
export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = AREAS.areas[slug];
  const name = AREA_LIST.find((area) => area[0] === slug)?.[1];
  if (!page || !name) notFound();
  return <LocationsView page={page} name={name} />;
}
