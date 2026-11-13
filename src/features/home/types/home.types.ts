/**
 * @fileoverview Home Domain Types
 * @module features/home/types
 */

export interface WhyUsCard {
  title: string;
  description: string;
  imageKey: string;
  objectPosition: string;
}

export interface ReviewItem {
  author: string;
  reviewText: string;
  rating: number;
  source: "Google" | "Student";
}

export interface QuoteItem {
  quote: string;
  authorType: string;
  course: string;
}

export interface AcademyStats {
  rating: number;
  totalReviews: number;
  maxStudentsPerBatch: number;
  graduatesCount: number;
  isoStandard: string;
}

export interface HomeData {
  whyUs: WhyUsCard[];
  reviews: ReviewItem[];
  quotes: QuoteItem[];
  stats: AcademyStats;
}
