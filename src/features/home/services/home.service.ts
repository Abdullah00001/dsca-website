/**
 * @fileoverview Home Service Layer
 * @module features/home/services
 */

import type { HomeData, ReviewItem, WhyUsCard, QuoteItem, AcademyStats } from "../types";

const MOCK_WHY_US: WhyUsCard[] = [
  {
    title: "Real Commercial Equipment",
    description: "Pull shots on the same commercial dual-boiler machines and precision grinders that specialty cafés use.",
    imageKey: "/assets/bar.jpg",
    objectPosition: "50% 40%",
  },
  {
    title: "Twelve Students, Never More",
    description: "Dedicated instructor time, regular feedback, and enough practice hours to improve. You will not get lost in a crowd.",
    imageKey: "/assets/hall.jpg",
    objectPosition: "50% 50%",
  },
  {
    title: "ISO 9001:2015 Certified",
    description: "Our curriculum, teaching and student records run under an international quality standard. Structured, measurable outcomes.",
    imageKey: "/assets/staff.jpg",
    objectPosition: "50% 40%",
  },
  {
    title: "Practicing Professionals",
    description: "Our trainers work with coffee every day on busy bars. They teach what works in real café environments.",
    imageKey: "/assets/staff2.jpg",
    objectPosition: "50% 40%",
  },
  {
    title: "Job Placement Support",
    description: "CV guidance, interview preparation and direct referrals across Dhaka's growing café and roastery network.",
    imageKey: "/assets/counter.jpg",
    objectPosition: "50% 30%",
  },
  {
    title: "A Certificate You Can Verify",
    description: "Every DSCA completion certificate can be checked online anytime by prospective employers.",
    imageKey: "/assets/lounge.jpg",
    objectPosition: "50% 50%",
  },
];

const MOCK_REVIEWS: ReviewItem[] = [
  {
    author: "Sudipta Stanly Palma",
    reviewText: "I completed my Professional Level 2 Barista Training at Dhaka Specialty Coffee Academy, and it was an excellent experience from start to finish. The trainers are highly knowledgeable, experienced, and very helpful.",
    rating: 5,
    source: "Google",
  },
  {
    author: "Aynul Islam",
    reviewText: "The training was very useful and practical. The trainers specially Evon bhai and Nahid bhai were super friendly, helpful, and explained everything clearly.",
    rating: 5,
    source: "Google",
  },
  {
    author: "Emon Hossein",
    reviewText: "I have completed my course from this place and had a great time. It was very easy to learn from the professionals, their dedication to teach me was something that helped me to learn faster.",
    rating: 5,
    source: "Google",
  },
  {
    author: "Himel Biswas",
    reviewText: "Hands down the best barista academy! I recently finished my training and learned so much—from espresso extraction to perfect latte art. The trainers are incredibly knowledgeable, patient, and supportive.",
    rating: 5,
    source: "Google",
  },
  {
    author: "Siad Rafiq",
    reviewText: "The instructors were knowledgeable, friendly, and explained everything clearly. I learned a lot about coffee and enjoyed the hands on experience. Definitely recommend it to anyone interested in learning more about coffee!",
    rating: 5,
    source: "Google",
  },
  {
    author: "Infars 92",
    reviewText: "Dhaka Specialty Coffee Academy's 10-day Barista course was an outstanding and professional experience.",
    rating: 5,
    source: "Google",
  },
];

const MOCK_QUOTES: QuoteItem[] = [
  {
    quote: "I walked in knowing nothing about espresso. By day ten I could dial in a grinder and steam milk properly.",
    authorType: "Student",
    course: "Barista Professional",
  },
  {
    quote: "Small batch, real machines, and a trainer who checks every shot. That is what made the difference for me.",
    authorType: "Student",
    course: "Barista Intermediate",
  },
  {
    quote: "The placement support helped me get my first café job within weeks of finishing the course.",
    authorType: "Graduate",
    course: "DSCA Starter Pack",
  },
];

const MOCK_STATS: AcademyStats = {
  rating: 4.9,
  totalReviews: 99,
  maxStudentsPerBatch: 12,
  graduatesCount: 200,
  isoStandard: "ISO 9001:2015",
};

export async function getHomeData(): Promise<HomeData> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return {
    whyUs: [...MOCK_WHY_US],
    reviews: [...MOCK_REVIEWS],
    quotes: [...MOCK_QUOTES],
    stats: { ...MOCK_STATS },
  };
}
