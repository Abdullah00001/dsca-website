import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Figtree } from "next/font/google";
import { SiteShell } from "@/components/layout";
import { constructMetadata, getOrganizationJsonLd } from "@/libs/seo";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = constructMetadata({
  title: "Barista Course in Dhaka | ISO-Certified Training at DSCA",
  description:
    "ISO-certified barista courses in Farmgate, Dhaka. Commercial espresso machines, small batches of twelve, and job placement support. 4.9 from 99 Google reviews.",
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const jsonLd = getOrganizationJsonLd();

  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${instrumentSerif.variable} ${figtree.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
