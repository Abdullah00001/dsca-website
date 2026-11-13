import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dsca.academy";
export const SITE_NAME = "Dhaka Specialty Coffee Academy (DSCA)";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-image.jpg`;

export function constructMetadata({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  canonicalUrl,
}: {
  title: string;
  description: string;
  image?: string;
  canonicalUrl?: string;
}): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      title,
      description,
      url: canonicalUrl || SITE_URL,
      siteName: SITE_NAME,
      locale: "en_BD",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Dhaka Specialty Coffee Academy (DSCA)",
    alternateName: "DSCA Barista Academy",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo.svg`,
    image: `${SITE_URL}/assets/campus.jpg`,
    description:
      "Bangladesh's first ISO 9001:2015 certified barista training institute in Farmgate, Dhaka. Real machines, twelve students a batch, and job placement support.",
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
    telephone: "+8801810545545",
    openingHours: "Sa-Fr 09:00-21:00",
    sameAs: [
      "https://www.facebook.com/dhakaspecialitycoffeeacademy",
      "https://www.instagram.com/dhakaspecialitycoffeeccademy/",
      "https://www.youtube.com/@DhakaSpecialityCoffeeAcademy",
      "https://www.tiktok.com/@dhakaspecialitycoffee",
    ],
  };
}

export function getCourseJsonLd({
  name,
  description,
  price,
  duration,
  id,
}: {
  name: string;
  description: string;
  price: string;
  duration: string;
  id: string;
}) {
  const numericPrice = price.replace(/[^0-9]/g, "") || "4950";

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "EducationalOrganization",
      name: "Dhaka Specialty Coffee Academy",
      sameAs: SITE_URL,
    },
    url: `${SITE_URL}/courses/${id}`,
    timeRequired: duration,
    offers: {
      "@type": "Offer",
      price: numericPrice,
      priceCurrency: "BDT",
      category: "Barista Training",
    },
  };
}

export function getArticleJsonLd({
  title,
  excerpt,
  author,
  publishedDate,
  slug,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: "Dhaka Specialty Coffee Academy",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo.svg`,
      },
    },
    datePublished: publishedDate,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    image,
  };
}

