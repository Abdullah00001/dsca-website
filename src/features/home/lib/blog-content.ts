/**
 * @fileoverview Home blog band (reference post-video guides block).
 * @module features/home/lib/blog-content
 */

/**
 * One guide card. Home shows the first three, matching `P.slice(0, 3)`.
 */
export interface BlogPost {
  /** Route slug under `/blog`. */
  id: string;
  /** Card title. */
  title: string;
  /** Short category label on the cover. */
  category: string;
  /** Reading time, already including the unit word. */
  minutes: string;
  /** One-line excerpt under the title. */
  excerpt: string;
  /** Cover photo path. */
  image: string;
  /** Cover image alt text. */
  alt: string;
}

/**
 * “Free Barista Guides” — eyebrow, title, lead, and the first three posts.
 */
export const BLOG_CONTENT = {
  eyebrow: "Coffee Knowledge",
  titleBefore: "Free Barista Guides, Coffee Tips and",
  titleAccent: "Industry Insights",
  lead: "Choosing between courses, or just starting out? Our free guides cover how to pick coffee beans, how to get your first barista job, and what a barista career in Bangladesh looks like. Written by the instructors who teach you.",
  allHref: "/blog",
  allLabel: "All guides",
  posts: [
    {
      id: "choose",
      title: "How to choose coffee without knowing much",
      category: "Guide",
      minutes: "6 min",
      excerpt:
        "Roast levels, origins and brewing methods, so you can pick a coffee you will enjoy.",
      image: "/assets/courses/int1.jpg",
      alt: "Coffee beans and brewing tools at DSCA",
    },
    {
      id: "course",
      title: "Who should choose a barista course in Dhaka?",
      category: "Career",
      minutes: "6 min",
      excerpt:
        "Hobbyist, job seeker or future café owner: which course fits your goal.",
      image: "/assets/courses/bar.jpg",
      alt: "Barista training bar at DSCA Farmgate",
    },
    {
      id: "growth",
      title: "Why coffee shops are growing fast in Bangladesh",
      category: "Industry",
      minutes: "5 min",
      excerpt:
        "What is driving Dhaka's café boom and what it means for trained baristas.",
      image: "/assets/courses/lounge.jpg",
      alt: "DSCA lounge and specialty coffee space",
    },
  ] satisfies BlogPost[],
} as const;
