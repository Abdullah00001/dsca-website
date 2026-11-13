import type { Metadata } from "next";
import { LocationsView } from "@/features/locations";
import { constructMetadata } from "@/libs/seo";

export const metadata: Metadata = constructMetadata({
  title: "Barista Course in Dhaka by Area | DSCA Farmgate Campus",
  description:
    "Find the barista course near you. DSCA's Farmgate campus serves Dhanmondi, Karwan Bazar, Shahbag, Agargaon, Mirpur, Uttara, and 7 more Dhaka neighborhoods. Routes and fees inside.",
  canonicalUrl: "https://dsca.academy/locations",
});

export default function LocationsPage() {
  return <LocationsView />;
}

