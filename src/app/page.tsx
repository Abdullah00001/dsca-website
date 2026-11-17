/**
 * @fileoverview Temporary home surface for previewing the fixed DSCA header.
 * @module app/page
 */

import layout from "@/styles/layout.module.css";

/**
 * Minimal forest hero band so the frosted header reads against brand green.
 * Full homepage composition will replace this later.
 *
 * @returns Temporary preview page.
 */
export default function HomePage() {
  return (
    <main
      className={layout.g}
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(900px 520px at 90% -5%, rgba(255, 214, 102, 0.55), transparent 60%), radial-gradient(800px 560px at 0% 110%, rgba(120, 255, 190, 0.45), transparent 62%), linear-gradient(135deg, #10b573 0%, #08925a 45%, #066a43 100%)",
        color: "#fff",
        paddingTop: "150px",
        paddingBottom: "80px",
      }}
    >
      <div className={layout.in}>
        <p
          style={{
            font: "600 13px var(--font-body)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            opacity: 0.85,
            margin: "0 0 18px",
          }}
        >
          Header preview
        </p>
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(48px, 10vw, 120px)",
            lineHeight: 0.9,
            margin: 0,
            maxWidth: "12ch",
          }}
        >
          DSCA header
        </h1>
      </div>
    </main>
  );
}
