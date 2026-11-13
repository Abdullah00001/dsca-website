/**
 * @fileoverview Courses Service Layer
 * @module features/courses/services
 *
 * Provides async data access for DSCA barista programs.
 * Currently uses strongly-typed in-memory mock datasets matching the production catalog;
 * ready to swap to backend REST/GraphQL API when available without altering UI code.
 */

import type { Course } from "../types";

const MOCK_COURSES: Course[] = [
  {
    id: "intermediate",
    name: "Barista Intermediate",
    duration: "3 days",
    price: "৳4,950",
    originalPrice: "৳5,500",
    discount: "10%",
    level: "Beginner",
    gradientClass: "c1",
    shortDescription: "The fastest way from coffee lover to confident café hand.",
    fullDescription:
      "Espresso preparation, basic milk steaming and the barista workflow every coffee professional builds on.",
    learningOutcomes: [
      "Espresso preparation and dosing",
      "Basic milk steaming",
      "Barista workflow and station habits",
      "Coffee origins in plain language",
    ],
    curriculumPlan: [
      { period: "Day 1", details: "Equipment, grinder basics, dosing and tamping" },
      { period: "Day 2", details: "Pulling and tasting shots, basic milk steaming" },
      { period: "Day 3", details: "Drink recipes, workflow practice and certificate" },
    ],
    bestFor: "Beginners and home baristas wanting clean technique",
    maxStudents: 12,
  },
  {
    id: "professional",
    name: "Barista Professional",
    duration: "10 days",
    price: "৳14,000",
    originalPrice: "৳23,333",
    discount: "40%",
    level: "Professional",
    gradientClass: "c2",
    shortDescription: "A complete skill set built over ten days of hands-on practice.",
    fullDescription:
      "Extraction theory, milk texturing, latte art foundations and front-of-house café operations. You finish job-ready for Dhaka's growing coffee scene.",
    learningOutcomes: [
      "Espresso extraction theory and troubleshooting",
      "Grinder calibration and machine care",
      "Milk texturing and latte art foundations",
      "Café operations, speed and service",
    ],
    curriculumPlan: [
      { period: "Days 1 to 2", details: "Foundations: origins, equipment, dosing, tamping" },
      { period: "Days 3 to 4", details: "Dialing in and reading a shot" },
      { period: "Days 5 to 6", details: "Milk texturing and drink recipes" },
      { period: "Days 7 to 8", details: "Latte art: heart, tulip, rosetta" },
      { period: "Day 9", details: "Café operations and service flow" },
      { period: "Day 10", details: "Live service assessment and certificate" },
    ],
    bestFor: "Anyone aiming to work as a café barista or open a coffee shop",
    maxStudents: 12,
  },
  {
    id: "starter",
    name: "DSCA Barista Starter Pack",
    duration: "15 days",
    price: "৳17,000",
    originalPrice: "৳28,333",
    discount: "40%",
    level: "Best value",
    gradientClass: "c3",
    shortDescription: "Intermediate and Professional in one continuous program.",
    fullDescription:
      "Save on fees and build skills without a gap. Ideal if you want the most from your training time with full job placement support.",
    learningOutcomes: [
      "Everything in Intermediate",
      "Everything in Professional",
      "Continuous practice with no break between levels",
      "Job placement support",
    ],
    curriculumPlan: [
      { period: "Days 1 to 3", details: "Intermediate foundations" },
      { period: "Days 4 to 13", details: "Professional skills block" },
      { period: "Days 14 to 15", details: "Assessment, portfolio and certificate" },
    ],
    bestFor: "Students seeking full career transition with placement support",
    maxStudents: 12,
  },
  {
    id: "advance",
    name: "Barista Advance Professional",
    duration: "22 days",
    price: "৳21,000",
    originalPrice: "৳42,000",
    discount: "50%",
    level: "Flagship",
    gradientClass: "c4",
    shortDescription: "Built for senior and head-barista roles.",
    fullDescription:
      "Advanced espresso science, pour-over, V60 and AeroPress, complex latte art, café management principles and food safety.",
    learningOutcomes: [
      "Advanced espresso science",
      "Pour-over, V60 and AeroPress",
      "Complex latte art",
      "Café management and food safety",
    ],
    curriculumPlan: [
      { period: "Week 1", details: "Espresso science and dialing in" },
      { period: "Week 2", details: "Specialty brewing and latte art" },
      { period: "Week 3", details: "Café management, food safety and assessment" },
    ],
    bestFor: "Head baristas, trainers, and specialty café owners",
    maxStudents: 12,
  },
  {
    id: "food",
    name: "Food Safety Management",
    duration: "2 days",
    price: "৳5,000",
    originalPrice: undefined,
    discount: undefined,
    level: "Add-on",
    gradientClass: "c5",
    shortDescription: "Hygiene and safety routines for anyone who handles food and drink.",
    fullDescription:
      "Storage, allergen handling, cleaning and kitchen safety. Take it alone or alongside a barista course.",
    learningOutcomes: [
      "Hygiene and cleaning routines",
      "Storage and allergen handling",
      "Kitchen safety",
      "Documentation basics",
    ],
    curriculumPlan: [
      { period: "Day 1", details: "Hygiene, storage and allergens" },
      { period: "Day 2", details: "Safety routines, documentation and certificate" },
    ],
    bestFor: "Café team leads, kitchen managers, and commercial staff",
    maxStudents: 12,
  },
];

/**
 * Retrieves the full list of DSCA courses.
 */
export async function getCourses(): Promise<Course[]> {
  // Simulated network latency for realistic state handling
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...MOCK_COURSES];
}

/**
 * Retrieves a specific course by its unique slug identifier.
 */
export async function getCourseById(id: string): Promise<Course | null> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  const course = MOCK_COURSES.find((item) => item.id.toLowerCase() === id.toLowerCase());
  return course ? { ...course } : null;
}

/**
 * Retrieves featured flagship courses for landing displays.
 */
export async function getFeaturedCourses(): Promise<Course[]> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  return MOCK_COURSES.filter((c) => c.level === "Professional" || c.level === "Best value" || c.level === "Flagship");
}
