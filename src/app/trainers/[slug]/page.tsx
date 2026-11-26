/**
 * @fileoverview Trainer profile route.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrainerView } from "@/features/trainers";
import { TRAINERS, findById } from "@/libs/catalog";

/**
 * Prebuilds one page per trainer.
 *
 * @returns Static params.
 */
export function generateStaticParams() {
  return TRAINERS.map((trainer) => ({ slug: trainer.id }));
}

/**
 * Trainer metadata.
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
  const trainer = findById(TRAINERS, slug);
  if (!trainer) return {};
  return {
    title: `${trainer.n} | DSCA Trainers`,
    description: trainer.b,
  };
}

/**
 * Trainer profile.
 *
 * @param props - Route params.
 * @returns Trainer view.
 */
export default async function TrainerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trainer = findById(TRAINERS, slug);
  if (!trainer) notFound();
  return <TrainerView trainer={trainer} />;
}
