import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrainerDetailView } from "@/features/trainer-detail";
import { getTrainers, getTrainerById } from "@/features/trainers/services";
import { constructMetadata } from "@/libs/seo";

export async function generateStaticParams() {
  const trainers = await getTrainers();
  return trainers.map((trainer) => ({
    id: trainer.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const trainer = await getTrainerById(id);

  if (!trainer) {
    return constructMetadata({
      title: "Trainer Not Found | DSCA",
      description: "The requested instructor profile could not be found.",
    });
  }

  return constructMetadata({
    title: `${trainer.name} | ${trainer.role} | DSCA Barista Academy`,
    description: trainer.bio,
    canonicalUrl: `https://dsca.academy/trainers/${trainer.id}`,
  });
}

export default async function TrainerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trainer = await getTrainerById(id);

  if (!trainer) {
    notFound();
  }

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: trainer.name,
    jobTitle: trainer.role,
    worksFor: {
      "@type": "EducationalOrganization",
      name: "Dhaka Specialty Coffee Academy",
      sameAs: "https://dsca.academy",
    },
    description: trainer.bio,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <TrainerDetailView trainerId={id} />
    </>
  );
}

