/**
 * @fileoverview Home page — hero band with looping timelapse.
 * @module app/page
 */

import { HeroSection } from "@/components/layout/hero-section";

/**
 * Home landing surface. Full homepage composition will grow beneath the hero.
 *
 * @returns Home page.
 */
export default function HomePage() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
