/**
 * @fileoverview About Service Layer
 * @module features/about/services
 */

import type { AboutData } from "../types";

const MOCK_ABOUT_DATA: AboutData = {
  title: "About DSCA | ISO 9001:2015 Barista Academy in Dhaka",
  storyHeading: "Built to professionalise",
  storySubheading: "Bangladesh's coffee industry",
  milestones: [
    {
      number: "01",
      title: "A Founder's Vision",
      description: "Zobayer Hosen set out to give Bangladeshi coffee professionals the training standards and equipment access found in international coffee hubs.",
    },
    {
      number: "02",
      title: "ISO 9001:2015 Certified",
      description: "DSCA became Bangladesh's first barista training institute certified under the ISO 9001:2015 quality management standard.",
    },
    {
      number: "03",
      title: "200+ Working Graduates",
      description: "Our alumni now operate commercial bars across Dhaka and abroad, with dedicated placement support behind every student.",
    },
  ],
  equipment: [
    {
      title: "Commercial Dual-Boiler Machines",
      gradientClass: "c1",
      description: "Train on professional multi-group espresso machines with PID temperature stability.",
    },
    {
      title: "On-Demand Precision Grinders",
      gradientClass: "c2",
      description: "Calibrate flat and conical burr grinders to dial in extraction recipes.",
    },
    {
      title: "Specialty Manual Brewing Bar",
      gradientClass: "c3",
      description: "V60, Chemex, AeroPress and cupping stations for sensory palate development.",
    },
  ],
};

export async function getAboutData(): Promise<AboutData> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  return { ...MOCK_ABOUT_DATA };
}
