/**
 * @fileoverview Trainers Service Layer
 * @module features/trainers/services
 */

import type { Trainer } from "../types";

const MOCK_TRAINERS: Trainer[] = [
  {
    id: "zobayer",
    name: "Zobayer Hosen",
    role: "Founder & CEO",
    gradientClass: "c1",
    bio: "Founded DSCA to professionalise Bangladesh's coffee industry, building the country's first ISO-certified barista training institute from the ground up. Oversees training standards and industry partnerships.",
    focusAreas: ["Training standards", "Industry partnerships", "Academy vision"],
    image: "/assets/z.jpg",
  },
  {
    id: "mehedy",
    name: "Mehedy Hasan",
    role: "Head of Operations",
    gradientClass: "c2",
    bio: "Leads academy operations and trains both career-entry baristas and working café professionals, focusing on espresso technique, equipment handling and speed to competency.",
    focusAreas: ["Espresso technique", "Equipment handling", "Job-ready skills"],
    image: "/assets/m.jpg",
  },
  {
    id: "abdullah",
    name: "Abdullah Al Nahid",
    role: "Brewing Specialist",
    gradientClass: "c3",
    bio: "DSCA's coffee brewing specialist, with expertise in precision espresso extraction, specialty brewing methods and latte art. One of Dhaka's most accomplished coffee educators.",
    focusAreas: ["Precision extraction", "Pour-over and V60", "Latte art"],
    image: "/assets/a.jpg",
  },
  {
    id: "motaher",
    name: "Motaher Hossain Ebon",
    role: "Training Specialist",
    gradientClass: "c4",
    bio: "Head barista training specialist with hands-on experience training career-entry baristas and working café professionals, with a focus on speed to competency and placement readiness.",
    focusAreas: ["Speed to competency", "Placement readiness", "Café workflow"],
    image: "/assets/t.jpg",
  },
];

export async function getTrainers(): Promise<Trainer[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...MOCK_TRAINERS];
}

export async function getTrainerById(id: string): Promise<Trainer | null> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  const trainer = MOCK_TRAINERS.find((t) => t.id.toLowerCase() === id.toLowerCase());
  return trainer ? { ...trainer } : null;
}
