"use client";

import { useState, useEffect } from "react";
import { tokens, ColorBrand500 } from "@/tokens";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <main className="min-h-screen bg-canvas text-text-primary transition-colors duration-200 p-8 md:p-16">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-brand">
              Design Token System
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Built with Style Dictionary v5 (DTCG format) & Tailwind CSS v4
            </p>
          </div>
          <button
            onClick={toggleTheme}
            type="button"
            className="self-start sm:self-auto px-4 py-2 rounded-lg bg-surface border border-border-default hover:bg-surface-subtle text-text-primary font-medium text-sm transition-colors cursor-pointer shadow-sm"
          >
            Switch to {theme === "light" ? "🌙 Dark" : "☀️ Light"} Theme
          </button>
        </header>

        {/* Section 1: Tokens in Tailwind Classes */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">1. Tailwind Utility Integration</h2>
          <p className="text-text-secondary text-sm">
            Semantic tokens mapped to Tailwind classes via <code>@theme</code> in <code>globals.css</code>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1: Primary Action */}
            <div className="p-6 rounded-xl bg-surface-raised border border-border-subtle shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-text-muted">
                  Interactive
                </span>
                <h3 className="text-base font-semibold mt-1">Primary Button</h3>
                <p className="text-sm text-text-secondary mt-1">
                  Uses <code>bg-primary</code> and hover states.
                </p>
              </div>
              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-md bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-contrast font-medium text-sm transition-colors cursor-pointer"
              >
                Click Action
              </button>
            </div>

            {/* Card 2: Surface & Borders */}
            <div className="p-6 rounded-xl bg-surface-muted border border-border-default flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-text-muted">
                  Surfaces
                </span>
                <h3 className="text-base font-semibold mt-1">Subdued Container</h3>
                <p className="text-sm text-text-secondary mt-1">
                  Uses <code>bg-surface-muted</code> with <code>border-border-default</code>.
                </p>
              </div>
              <div className="p-3 rounded-md bg-surface border border-border-subtle text-xs text-text-muted">
                Nested Surface Box
              </div>
            </div>

            {/* Card 3: Feedback Alerts */}
            <div className="p-6 rounded-xl bg-surface-raised border border-border-subtle shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-text-muted">
                  Feedback Tokens
                </span>
                <h3 className="text-base font-semibold mt-1">Status Badges</h3>
                <p className="text-sm text-text-secondary mt-1">
                  Semantic feedback color tokens.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-success-bg text-success-text">
                  ✓ Success
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-warning-bg text-warning-text">
                  ⚠ Warning
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-danger-bg text-danger-text">
                  ✕ Danger
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: TypeScript Token Usage */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">2. TypeScript & JavaScript Consumption</h2>
          <p className="text-text-secondary text-sm">
            Import strongly typed design tokens directly into React components or logic.
          </p>

          <div className="p-4 rounded-lg bg-surface border border-border-default font-mono text-xs overflow-x-auto space-y-2">
            <p className="text-text-muted">{"// Imported from @/tokens"}</p>
            <p>
              <span className="text-text-brand">ColorBrand500:</span> {ColorBrand500}
            </p>
            <p>
              <span className="text-text-brand">tokens.font.family.sans:</span>{" "}
              {tokens.font.family.sans}
            </p>
            <p>
              <span className="text-text-brand">tokens.space[4]:</span>{" "}
              {tokens.space[4]}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
