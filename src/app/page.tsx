"use client";

import { useState, useEffect } from "react";
import {
  ColorForest700,
  ColorGold500,
  ColorCoral500,
  ColorForest100,
  ColorForest900,
} from "@/tokens";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <main className="min-h-screen bg-bg text-fg transition-colors duration-400">
      {/* Navigation Preview */}
      <nav className="max-w-[1360px] mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-forest text-gold flex items-center justify-center font-bold font-display text-lg">
            D
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-fg">
            DSCA
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            type="button"
            className="px-4 py-2 rounded-full border border-line bg-card text-fg font-medium text-xs tracking-wider uppercase transition-colors hover:bg-mint hover:text-ink cursor-pointer"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
          <a
            href="#courses"
            className="hidden sm:inline-flex items-center gap-3 min-h-[46px] px-6 rounded-full bg-gold text-ink font-bold text-xs uppercase tracking-widest hover:brightness-105 transition-all shadow-[0_12px_24px_-10px_rgba(242,184,74,0.6)]"
          >
            Enroll Now <i>→</i>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-[1360px] mx-auto px-6 pt-12 pb-20">
        <div className="max-w-4xl space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gt">
            ISO 9001:2015 Certified Barista Institute
          </p>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold uppercase leading-[0.85] tracking-tight">
            Dhaka Specialty <br />
            Coffee <span className="font-serif-italic text-ait">Academy</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">
            Real espresso machines, small 12-student batches, and globally recognized job-ready barista skills in the heart of Dhaka.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-4 min-h-[56px] pl-8 pr-3 rounded-full bg-gold text-ink font-bold text-xs uppercase tracking-[0.14em] shadow-[0_18px_36px_-14px_rgba(242,184,74,0.6)] cursor-pointer hover:brightness-105 transition-all"
            >
              Explore Courses
              <span className="w-10 h-10 rounded-full bg-ink text-gold grid place-items-center text-lg">
                →
              </span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-3 min-h-[56px] px-8 rounded-full border border-fg text-fg font-bold text-xs uppercase tracking-[0.14em] hover:bg-fg hover:text-bg transition-colors cursor-pointer"
            >
              Verify Certificate
            </button>
          </div>
        </div>
      </section>

      {/* DSCA Tokenized Color Swatches */}
      <section className="bg-card border-y border-line py-16 px-6">
        <div className="max-w-[1360px] mx-auto space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gt">
              DTCG Design Tokens
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase mt-1">
              DSCA Color & Typography System
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-2xl bg-forest text-white space-y-2">
              <div className="text-xs uppercase font-bold tracking-wider opacity-75">Forest</div>
              <div className="text-lg font-bold">{ColorForest700}</div>
              <div className="text-xs opacity-70">Main Brand</div>
            </div>

            <div className="p-4 rounded-2xl bg-gold text-ink space-y-2">
              <div className="text-xs uppercase font-bold tracking-wider opacity-75">Gold</div>
              <div className="text-lg font-bold">{ColorGold500}</div>
              <div className="text-xs opacity-70">Signature CTA</div>
            </div>

            <div className="p-4 rounded-2xl bg-coral text-white space-y-2">
              <div className="text-xs uppercase font-bold tracking-wider opacity-75">Coral</div>
              <div className="text-lg font-bold">{ColorCoral500}</div>
              <div className="text-xs opacity-70">Punctuation</div>
            </div>

            <div className="p-4 rounded-2xl bg-mint text-ink space-y-2">
              <div className="text-xs uppercase font-bold tracking-wider opacity-75">Mint</div>
              <div className="text-lg font-bold">{ColorForest100}</div>
              <div className="text-xs opacity-70">Badge & Pill</div>
            </div>

            <div className="p-4 rounded-2xl bg-ink text-gold space-y-2">
              <div className="text-xs uppercase font-bold tracking-wider opacity-75">Ink</div>
              <div className="text-lg font-bold">{ColorForest900}</div>
              <div className="text-xs opacity-70">Deep Espresso</div>
            </div>

            <div className="p-4 rounded-2xl bg-bg border border-line text-fg space-y-2">
              <div className="text-xs uppercase font-bold tracking-wider opacity-75">Canvas</div>
              <div className="text-lg font-bold">Theme-aware</div>
              <div className="text-xs opacity-70">Matcha/Dark</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Card Preview with Tokens */}
      <section className="max-w-[1360px] mx-auto px-6 py-20 space-y-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gt">
            Featured Academy Modules
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold uppercase mt-1">
            Professional Barista <span className="font-serif-italic text-ait">Tracks</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-[32px] bg-card border border-line p-8 flex flex-col justify-between space-y-8 shadow-[0_24px_50px_-30px_rgba(6,37,26,0.5)]">
            <div className="space-y-4">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] py-1.5 px-3 rounded-full bg-mint text-ink">
                Foundation
              </span>
              <h3 className="text-2xl font-display font-extrabold uppercase">
                Barista Skills Foundation
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Learn espresso extraction, grinder calibration, milk steaming, and classic drink builds on commercial dual-boiler machines.
              </p>
            </div>
            <div className="pt-4 border-t border-line flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">2 Weeks</span>
              <span className="font-display font-extrabold text-xl text-forest">৳18,500</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-[32px] bg-card border border-line p-8 flex flex-col justify-between space-y-8 shadow-[0_24px_50px_-30px_rgba(6,37,26,0.5)]">
            <div className="space-y-4">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] py-1.5 px-3 rounded-full bg-gold text-ink">
                Popular
              </span>
              <h3 className="text-2xl font-display font-extrabold uppercase">
                Latte Art Masterclass
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Intensive micro-foam milk steaming, pouring mechanics, heart, rosetta, tulip, and advanced multi-tier swan patterns.
              </p>
            </div>
            <div className="pt-4 border-t border-line flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">1 Week</span>
              <span className="font-display font-extrabold text-xl text-forest">৳14,000</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-[32px] bg-card border border-line p-8 flex flex-col justify-between space-y-8 shadow-[0_24px_50px_-30px_rgba(6,37,26,0.5)]">
            <div className="space-y-4">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] py-1.5 px-3 rounded-full bg-coral text-white">
                Career Track
              </span>
              <h3 className="text-2xl font-display font-extrabold uppercase">
                Café Management & Brewing
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Manual brewing (V60, Aeropress, Chemex), sensory cupping, menu engineering, inventory control, and café operations.
              </p>
            </div>
            <div className="pt-4 border-t border-line flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">4 Weeks</span>
              <span className="font-display font-extrabold text-xl text-forest">৳32,000</span>
            </div>
          </div>
        </div>
      </section>

      {/* Forest Band CTA */}
      <section className="bg-forest text-white py-20 px-6">
        <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-highlight">
              Next Batch · 12 Seats Only
            </p>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold uppercase leading-[0.9]">
              Ready to Start Your Barista Career{" "}
              <span className="font-serif-italic text-highlight">in Dhaka?</span>
            </h2>
            <p className="text-base sm:text-lg text-[#eefaf3] opacity-90 leading-relaxed">
              House 34/A, Indira Road, Farmgate, Dhaka · Open Sat to Fri, 9am to 9pm · (+880) 1810-545545
            </p>
          </div>
          <a
            href="https://wa.me/8801810545545"
            className="inline-flex items-center gap-4 min-h-[56px] pl-8 pr-3 rounded-full bg-gold text-ink font-bold text-xs uppercase tracking-[0.14em] shadow-[0_18px_36px_-14px_rgba(242,184,74,0.6)] hover:brightness-105 transition-all self-start lg:self-auto"
          >
            Chat on WhatsApp
            <span className="w-10 h-10 rounded-full bg-ink text-gold grid place-items-center text-lg">
              →
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
