import type { Metadata } from "next";
import { TrainersView } from "@/features/trainers";
import { constructMetadata } from "@/libs/seo";

export const metadata: Metadata = constructMetadata({
  title: "Dhaka's Practicing Coffee Pros | DSCA Instructor Team",
  description:
    "Every DSCA course is led by people who work with coffee every day. Meet Zobayer Hosen, Mehedy Hasan, Abdullah Al Nahid, and Md. Motaher Hossain.",
  canonicalUrl: "https://dsca.academy/trainers",
});

export default function TrainersPage() {
  return <TrainersView />;
}

