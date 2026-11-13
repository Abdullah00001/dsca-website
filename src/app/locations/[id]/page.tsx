import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationDetailView } from "@/features/location-detail";
import {
  getAllLocationAreas,
  getLocationAreaById,
} from "@/features/locations/services";
import { constructMetadata } from "@/libs/seo";

export async function generateStaticParams() {
  const areas = await getAllLocationAreas();
  return areas.map((area) => ({
    id: area.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const area = await getLocationAreaById(id);

  if (!area) {
    return constructMetadata({
      title: "Location Not Found | DSCA",
      description: "The requested neighborhood transit guide could not be found.",
    });
  }

  return constructMetadata({
    title: area.metaTitle,
    description: area.metaDescription,
    canonicalUrl: `https://dsca.academy/locations/${area.id}`,
  });
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const area = await getLocationAreaById(id);

  if (!area) {
    notFound();
  }

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `DSCA Barista Academy - ${area.name} Hub`,
    description: area.metaDescription,
    url: `https://dsca.academy/locations/${area.id}`,
    telephone: "+8801810545545",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "House 34/A, Indira Road, Farmgate (Kazi & Chitra Square, Lift-5)",
      addressLocality: "Dhaka",
      postalCode: "1215",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "23.7584",
      longitude: "90.3854",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <LocationDetailView areaId={id} />
    </>
  );
}

