/**
 * @fileoverview Home trainers band copy (reference trainers home block).
 * @module features/home/lib/trainers-content
 */

/** One trainer card in the home horizontal track. */
export type HomeTrainer = {
  /** Stable id / profile slug. */
  id: string;
  /** Display name. */
  name: string;
  /** Role label under the name. */
  role: string;
  /** Portrait image path. */
  image: string;
  /** Short blurb (detail pages later). */
  bio: string;
};

/** Static content for the home trainers band. */
export const TRAINERS_CONTENT = {
  eyebrow: "Meet the trainers",
  titleBefore: "Learn from Working Coffee Professionals",
  titleAccent: "in Dhaka",
  lead: "DSCA courses are taught by people who work in coffee, not classroom lecturers. You learn the techniques, shortcuts and standards they use behind the bar every day.",
  cta: { label: "Meet the team", href: "/trainers" },
  trainers: [
    {
      id: "zobayer",
      name: "Zobayer Hosen",
      role: "Founder & CEO",
      image: "/assets/trainers/zobayer.jpg",
      bio: "Founded DSCA to professionalise Bangladesh's coffee industry, building the country's first ISO-certified barista training institute from the ground up.",
    },
    {
      id: "mehedy",
      name: "Mehedy Hasan",
      role: "Head of Operations",
      image: "/assets/trainers/mehedy.jpg",
      bio: "Leads academy operations and trains career-entry baristas and working café professionals.",
    },
    {
      id: "abdullah",
      name: "Abdullah Al Nahid",
      role: "Brewing Specialist",
      image: "/assets/trainers/abdullah.jpg",
      bio: "Precision espresso extraction, specialty brewing methods and latte art educator.",
    },
    {
      id: "motaher",
      name: "Motaher Hossain Ebon",
      role: "Training Specialist",
      image: "/assets/trainers/motaher.jpg",
      bio: "Hands-on training focused on speed to competency and placement readiness.",
    },
  ] as const satisfies readonly HomeTrainer[],
} as const;
