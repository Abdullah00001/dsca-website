/**
 * @fileoverview Home student-review marquee (reference `REV` + `revCard`).
 * @module features/home/lib/reviews-content
 */

/** One Google review shown on the home marquee. */
export type ReviewItem = {
  /** Stable id. */
  id: string;
  /** Reviewer name, as published on Google. */
  name: string;
  /** Review body, without surrounding quotation marks. */
  quote: string;
};

/** Maps listing used for “read” and “write” review links. */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Dhaka+Specialty+Coffee+Academy+Farmgate";

/**
 * “What Our Barista Students Say About DSCA” copy.
 */
export const REVIEWS_CONTENT = {
  eyebrow: "Student reviews",
  titleBefore: "What Our Barista Students",
  titleAccent: "Say About DSCA",
  lead: "4.9 ★ from 99 Google reviews. Here is what graduates of our barista courses in Dhaka say about their training:",
  readAll: "Read all 99 reviews on Google",
  write: "Write a review",
  href: GOOGLE_REVIEWS_URL,
  items: [
    {
      id: "sudipta",
      name: "Sudipta Stanly Palma",
      quote:
        "I completed my Professional Level 2 Barista Training at Dhaka Specialty Coffee Academy, and it was an excellent experience from start to finish. The trainers are highly knowledgeable, experienced, and very helpful.",
    },
    {
      id: "aynul",
      name: "Aynul Islam",
      quote:
        "The training was very useful and practical. The trainers specially Evon bhai and Nahid bhai were super friendly, helpful, and explained everything clearly.",
    },
    {
      id: "emon",
      name: "emon hossein",
      quote:
        "I have completed my course from this place and had a great time. It was very easy to learn from the professionals, their dedication to teach me was something that helped me to learn faster.",
    },
    {
      id: "himel",
      name: "Himel Biswas",
      quote:
        "Hands down the best barista academy! I recently finished my training and learned so much—from espresso extraction to perfect latte art. The trainers are incredibly knowledgeable, patient, and supportive.",
    },
    {
      id: "siad",
      name: "Siad Rafiq",
      quote:
        "The instructors were knowledgeable, friendly, and explained everything clearly. I learned a lot about coffee and enjoyed the hands on experience. Definitely recommend it to anyone interested in learning more about coffee!",
    },
    {
      id: "infars",
      name: "Infars 92",
      quote:
        "Dhaka Specialty Coffee Academy’s 10-day Barista course was an outstanding and professional experience.",
    },
  ] as const satisfies readonly ReviewItem[],
} as const;
