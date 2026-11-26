/**
 * @fileoverview Trainers listing (reference trainers page).
 */

import type { Metadata } from "next";
import { TrainersView } from "@/features/trainers";

export const metadata: Metadata = {
  title: "Trainers | DSCA Barista Academy Dhaka",
  description:
    "Meet the practicing coffee professionals who teach DSCA barista courses in Farmgate, Dhaka.",
};

/**
 * Trainers index.
 *
 * @returns Trainers page.
 */
export default function TrainersPage() {
  return <TrainersView />;
}
