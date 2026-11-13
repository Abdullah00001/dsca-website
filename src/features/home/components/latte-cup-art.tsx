"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./latte-cup-art.module.css";

export function LatteCupArt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const badge = badgeRef.current;
    if (!badge) return;

    function handlePointerMove(e: PointerEvent) {
      const xOffset = (e.clientX / window.innerWidth - 0.5) * 40;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 30;
      gsap.to(badge, {
        x: xOffset,
        y: yOffset,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.cupContainer}
      data-cup
      aria-hidden="true"
    >
      <svg
        className={styles.cupSvg}
        viewBox="0 0 520 480"
        role="img"
        aria-label="A latte being poured into a white cup"
      >
        <defs>
          <linearGradient id="cb" x1="0" x2="1">
            <stop offset="0" stopColor="#d3e2d9" />
            <stop offset="0.35" stopColor="#ffffff" />
            <stop offset="1" stopColor="#bccdc3" />
          </linearGradient>
          <radialGradient id="cc" cx="0.5" cy="0.4" r="0.7">
            <stop offset="0" stopColor="#d9a066" />
            <stop offset="0.6" stopColor="#8a5126" />
            <stop offset="1" stopColor="#4a2813" />
          </radialGradient>
          <linearGradient id="ps" x1="0" x2="1">
            <stop offset="0" stopColor="#8fa299" />
            <stop offset="0.4" stopColor="#f6faf8" />
            <stop offset="0.7" stopColor="#b4c3bb" />
            <stop offset="1" stopColor="#788b82" />
          </linearGradient>
          <radialGradient id="sg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#b8ccc1" />
          </radialGradient>
          <clipPath id="cl">
            <ellipse cx="260" cy="257" rx="125" ry="32" />
          </clipPath>
          <filter id="bl" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        {/* Saucer shadow & body */}
        <ellipse
          cx="272"
          cy="432"
          rx="205"
          ry="24"
          fill="rgba(0,0,0,.42)"
          filter="url(#bl)"
        />
        <ellipse cx="260" cy="394" rx="206" ry="46" fill="url(#sg)" />
        <ellipse
          cx="260"
          cy="390"
          rx="150"
          ry="30"
          fill="none"
          stroke="#a5baaf"
          strokeWidth="3"
          opacity="0.7"
        />

        {/* Cup body & handle */}
        <path
          d="M112 252C112 340 172 392 260 392S408 340 408 252Z"
          fill="url(#cb)"
        />
        <path
          d="M130 280C140 340 190 380 260 384"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
          opacity="0.55"
          strokeLinecap="round"
        />
        <path
          d="M116 278C56 268 50 332 112 348"
          fill="none"
          stroke="url(#cb)"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d="M116 285C64 276 60 326 112 340"
          fill="none"
          stroke="#a9bdb2"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Cup interior & coffee */}
        <ellipse cx="260" cy="252" rx="150" ry="46" fill="#ffffff" />
        <ellipse cx="260" cy="255" rx="138" ry="38" fill="#dbe7e0" />
        <ellipse cx="260" cy="258" rx="127" ry="33" fill="url(#cc)" />

        {/* Latte art inside mask */}
        <g clipPath="url(#cl)">
          <ellipse
            cx="226"
            cy="251"
            rx="62"
            ry="8"
            fill="rgba(255,255,255,.14)"
          />
          <g className={styles.art}>
            <ellipse cx="260" cy="270" rx="80" ry="16" fill="#f6e6cb" />
            <ellipse cx="260" cy="258" rx="64" ry="13" fill="#f6e6cb" />
            <ellipse cx="260" cy="248" rx="48" ry="10" fill="#f6e6cb" />
            <ellipse cx="260" cy="239" rx="31" ry="8" fill="#f6e6cb" />
            <path
              d="M260 232V286"
              stroke="#7a4a24"
              strokeWidth="2.2"
              opacity="0.5"
            />
          </g>
        </g>

        {/* Cup rim specular highlight */}
        <path
          d="M132 238C150 214 212 208 262 208"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          opacity="0.85"
          strokeLinecap="round"
        />

        {/* Pouring Milk Pitcher */}
        <g transform="translate(332 198) rotate(-35)">
          <path d="M-6 -2L-36 -4Q-24 6 -6 10Z" fill="#a8b9b0" />
          <path
            d="M-6 10L96 10 84 150Q82 164 66 164L28 164Q12 164 10 150Z"
            fill="url(#ps)"
          />
          <ellipse
            cx="45"
            cy="10"
            rx="51"
            ry="9"
            fill="#e6efea"
            stroke="#94a79d"
          />
          <ellipse cx="45" cy="11" rx="45" ry="6" fill="#f6eedd" />
          <path
            d="M96 40C142 30 150 112 88 128"
            fill="none"
            stroke="#6f8279"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </g>

        {/* Milk flow line */}
        <path
          d="M300 216C299 228 296 239 292 247"
          fill="none"
          stroke="#fff4e0"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          className={styles.flow}
          d="M300 216C299 228 296 239 292 247"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="5 7"
        />
        <ellipse
          cx="292"
          cy="249"
          rx="11"
          ry="3.5"
          fill="#fff4e0"
          opacity="0.85"
        />

        {/* Rising steam vapors */}
        <g
          className={styles.steam}
          fill="none"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.5"
        >
          <path d="M190 196C176 176 204 164 190 140" />
          <path d="M226 190C212 168 240 158 226 130" />
        </g>
      </svg>

      {/* ISO Certified Badge */}
      <Image
        ref={badgeRef}
        data-badge
        className={styles.badge}
        src="/assets/badge.svg"
        alt="ISO 9001:2015 Certified Barista Academy"
        width={140}
        height={140}
        priority
      />
    </div>
  );
}

