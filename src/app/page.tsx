/**
 * @fileoverview Home page route — delegates to the home feature view.
 * @module app/page
 */

import { HomeView } from "@/features/home";

/**
 * Home landing route.
 *
 * @returns Home feature view.
 */
export default function HomePage() {
  return <HomeView />;
}
