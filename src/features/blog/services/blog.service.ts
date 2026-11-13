/**
 * @fileoverview Blog Service Layer
 * @module features/blog/services
 */

import type { BlogPost } from "../types";

const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "choose",
    title: "How to choose coffee without knowing much",
    category: "Guide",
    readTime: "6 min",
    gradientClass: "c1",
    excerpt: "Roast levels, origins and brewing methods, so you can pick a coffee you will actually enjoy.",
    author: "Abdullah Al Nahid",
    authorRole: "Brewing Specialist",
    date: "October 2026",
    blocks: [
      {
        type: "p",
        content:
          "Walking into a specialty coffee shop can feel intimidating with flavor notes like bergamot, stone fruit, and jasmine. Understanding roast levels and origin profiles simplifies picking your cup.",
      },
      {
        type: "h2",
        content: "Understanding Roast Levels",
      },
      {
        type: "p",
        content:
          "Light roasts retain the bean's origin characteristics, producing vibrant fruity and floral acidity. Medium roasts balance sweetness and body with chocolatey notes. Dark roasts feature bold, smoky depth ideal for milk drinks.",
      },
    ],
  },
  {
    id: "course",
    title: "Who should choose a barista course in Dhaka?",
    category: "Career",
    readTime: "6 min",
    gradientClass: "c2",
    excerpt: "Hobbyist, job seeker or future café owner: which course fits your specific goal.",
    author: "Zobayer Hosen",
    authorRole: "Founder & CEO",
    date: "October 2026",
  },
  {
    id: "growth",
    title: "Why coffee shops are growing fast in Bangladesh",
    category: "Industry",
    readTime: "5 min",
    gradientClass: "c3",
    excerpt: "What is driving Dhaka's specialty café boom and what it means for trained baristas.",
    author: "Mehedy Hasan",
    authorRole: "Head of Operations",
    date: "September 2026",
  },
  {
    id: "espresso",
    title: "Espresso vs. pour-over: what is the real difference?",
    category: "Brewing",
    readTime: "7 min",
    gradientClass: "c4",
    excerpt: "Pressure, extraction time and grind size explained in plain, accessible language.",
    author: "Abdullah Al Nahid",
    authorRole: "Brewing Specialist",
    date: "September 2026",
  },
  {
    id: "milk",
    title: "5 mistakes beginners make when steaming milk",
    category: "Guide",
    readTime: "6 min",
    gradientClass: "c5",
    excerpt: "How to fix scalded milk, oversized bubbles and flat textures for silky microfoam.",
    author: "Motaher Hossain Ebon",
    authorRole: "Training Specialist",
    date: "August 2026",
  },
  {
    id: "career",
    title: "What a barista career in Dhaka looks like",
    category: "Career",
    readTime: "5 min",
    gradientClass: "c6",
    excerpt: "Roles, growth paths, salary bands and what premium employers look for in candidates.",
    author: "Zobayer Hosen",
    authorRole: "Founder & CEO",
    date: "August 2026",
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...MOCK_BLOG_POSTS];
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  const post = MOCK_BLOG_POSTS.find((p) => p.id.toLowerCase() === id.toLowerCase());
  return post ? { ...post } : null;
}
