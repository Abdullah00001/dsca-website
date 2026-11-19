"use client";
"use no memo";

/**
 * @fileoverview Why DSCA — pinned showcase: hero copy FLIP → card grow → strip → carousel.
 * @module features/home/components/why-section
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import { WHY_CONTENT } from "@/features/home/lib/why-content";

import styles from "./why-section.module.css";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = WHY_CONTENT.items;

type Metrics = {
  vw: number;
  vh: number;
  bigW: number;
  bigH: number;
  smW: number;
  smH: number;
  gap: number;
  cy: number;
};

type Delta = { x: number; y: number; s: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = gsap.parseEase("power2.inOut");
const easeOut3 = gsap.parseEase("power3.out");
const easeInOut3 = gsap.parseEase("power3.inOut");

/** Timeline lengths matching the Claude showcase HTML (in “seconds”). */
const INTRO_DUR = 1.3;
const COPY_AT = 0.3;
const COPY_DUR = 1.4;
const STRIP_AT = 1.7;
const STRIP_DUR = 0.9;
const STRIP_END = STRIP_AT + STRIP_DUR;

function getMetrics(): Metrics {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw < 768) {
    return {
      vw,
      vh,
      bigW: vw * 0.74,
      bigH: vh * 0.5,
      smW: vw * 0.27,
      smH: vh * 0.2,
      gap: 10,
      cy: vh * 0.64,
    };
  }
  const bigH = Math.min(vh * 0.78, 760);
  const bigW = Math.min(bigH * 0.68, vw * 0.32);
  const smH = bigH * 0.3;
  const smW = smH * 0.76;
  return { vw, vh, bigW, bigH, smW, smH, gap: 10, cy: vh * 0.5 };
}

function carouselDur(n: number) {
  return Math.max(n - 1, 1) * 1.05;
}

function totalDuration(n: number) {
  return STRIP_END + carouselDur(n) + 0.25;
}

/** Linear filmstrip — no per-card pause, so the frame tracks the finger. */
function focusAtTime(time: number, n: number) {
  if (n <= 1 || time <= STRIP_END) return 0;
  return clamp((time - STRIP_END) / carouselDur(n)) * (n - 1);
}

/**
 * Pinned Why DSCA journey matching the showcase scroll prototype.
 */
export function WhySection() {
  const stageRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    let alive = true;
    const stage = stageRef.current;
    const copy = copyRef.current;
    const track = trackRef.current;
    const frame = frameRef.current;
    const dash = dashRef.current;
    const reel = reelRef.current;
    const hint = hintRef.current;
    if (!stage || !copy || !track || !frame || !dash || !reel || !hint) return;

    const copyEls = [
      eyebrowRef.current,
      headlineRef.current,
      subRef.current,
      ctaRef.current,
    ].filter(Boolean) as HTMLElement[];

    const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (cards.length !== SLIDES.length || copyEls.length !== 4) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = cards.length;
    const dur = totalDuration(n);
    const travel = carouselDur(n);
    const stepAt = cards.map(
      (_, i) => STRIP_END + (n <= 1 ? 0 : (i / (n - 1)) * travel),
    );

    let M = getMetrics();
    let deltas: Delta[] = copyEls.map(() => ({ x: 0, y: 0, s: 1 }));
    let copyRight = 300;
    let st: ScrollTrigger | null = null;
    let resizeTimer = 0;
    let introSealed = false;
    let copySealed = false;

    function anchorX() {
      if (M.vw < 768 || copyRight <= 0) return M.vw / 2;
      const row = 2 * (M.smW + M.gap);
      const minCenter = copyRight + 18 + row + M.bigW / 2;
      const maxCenter = M.vw - 20 - M.bigW / 2;
      return clamp(Math.max(M.vw / 2, minCenter), M.bigW / 2 + 16, maxCenter);
    }

    function sizeStage() {
      const { smW, smH, bigW, bigH, cy } = M;
      const focusX = anchorX();
      const pad = 6;
      const left = focusX - bigW / 2;
      const top = cy - bigH / 2;
      frame.style.width = `${bigW}px`;
      frame.style.height = `${bigH}px`;
      frame.style.left = `${left}px`;
      frame.style.top = `${top}px`;
      dash.style.width = `${bigW + pad * 2}px`;
      dash.style.height = `${bigH + pad * 2}px`;
      dash.style.left = `${left - pad}px`;
      dash.style.top = `${top - pad}px`;
      slideRefs.current.forEach((slide) => {
        if (!slide) return;
        slide.style.width = `${bigW}px`;
        slide.style.height = `${bigH}px`;
      });
      cards.forEach((card) => {
        card.style.width = `${smW}px`;
        card.style.height = `${smH}px`;
      });
      track.style.transformOrigin = `${focusX}px ${cy}px`;
    }

    function layout(intro: number, strip: number, t: number) {
      const { smW, bigW, gap, cy } = M;
      const frameLeft = anchorX() - bigW / 2;
      const step = smW + gap;

      reel.style.transform = `translate3d(${(-t * bigW).toFixed(1)}px,0,0)`;

      if (intro < 1) {
        introSealed = false;
        frame.style.opacity = String(clamp(intro * 2));
        dash.style.opacity = String(clamp(intro * 2));
        const inset = (1 - intro) * 18;
        reel.style.clipPath = `inset(${inset}% ${inset * 0.75}%)`;
        track.style.transform = `scale(${lerp(0.6, 1, intro)})`;
      } else if (!introSealed) {
        introSealed = true;
        frame.style.opacity = "1";
        dash.style.opacity = "1";
        reel.style.clipPath = "none";
        track.style.transform = "none";
      }

      const y = cy - M.smH / 2;
      const frameRight = frameLeft + bigW;
      for (let i = 0; i < n; i++) {
        const d = i - t;
        const x =
          d < 0
            ? frameLeft - gap - smW + (d + 1) * step
            : frameRight + gap + (d - 1) * step;
        const right = x + smW;
        const visible = Math.min(right, M.vw) - Math.max(x, 0);
        const edgeSliver = visible < smW * 0.62;
        const overText =
          copyRight > 0 && x < copyRight + 12 && right > 36 && x < frameLeft;
        const show = strip > 0.02 && !edgeSliver && !overText;
        const card = cards[i];
        card.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
        card.style.opacity = show ? strip.toFixed(3) : "0";
        card.style.pointerEvents = show && strip > 0.6 ? "auto" : "none";
      }
    }

    function applyCopy(copyT: number) {
      const e = easeInOut3(copyT);
      copyEls.forEach((el, i) => {
        const d = deltas[i];
        el.style.transform = `translate(${d.x * e}px, ${d.y * e}px) scale(${lerp(1, d.s, e)})`;
        el.style.transformOrigin = "0 0";
      });
      if (headlineRef.current) {
        headlineRef.current.style.setProperty("--glow", String(lerp(1, 0, e)));
      }
    }

    function applyTime(time: number) {
      const intro =
        time >= INTRO_DUR ? 1 : easeInOut(clamp(time / INTRO_DUR));
      const strip =
        time >= STRIP_END ? 1 : easeOut3(clamp((time - STRIP_AT) / STRIP_DUR));
      const copyT =
        time >= COPY_AT + COPY_DUR
          ? 1
          : clamp((time - COPY_AT) / COPY_DUR);
      layout(intro, strip, focusAtTime(time, n));
      if (copyT < 1) {
        copySealed = false;
        applyCopy(copyT);
      } else if (!copySealed) {
        applyCopy(1);
        copySealed = true;
      }
      if (time > STRIP_END) {
        hint.style.opacity = String(1 - clamp((time - STRIP_END) / 0.35));
      } else if (hint.style.opacity !== "1") {
        hint.style.opacity = "1";
      }
    }

    function measureCopy() {
      copyEls.forEach((el) => {
        el.style.transform = "";
      });
      copy.classList.remove(styles.copyFinal);
      const base = stage.getBoundingClientRect();
      const r = (el: HTMLElement) => {
        const b = el.getBoundingClientRect();
        return {
          x: b.left - base.left,
          y: b.top - base.top,
          w: b.width,
        };
      };
      const a = copyEls.map(r);
      copy.classList.add(styles.copyFinal);
      copy.style.transform = "none";
      const heroLeft = (M.vw - M.bigW) / 2;
      const naturalRight = copy.getBoundingClientRect().right - base.left;
      const room = heroLeft - naturalRight - 18;
      const need = 2 * (M.smW + M.gap);
      if (M.vw >= 768 && room < need) {
        const thumbTop = M.cy - M.smH / 2;
        const top = Math.max(96, thumbTop - copy.offsetHeight - 36);
        copy.style.top = `${top}px`;
        copyRight = 0;
      } else {
        copy.style.top = "";
        copyRight = copy.getBoundingClientRect().right - base.left;
      }
      const b = copyEls.map(r);
      copy.classList.remove(styles.copyFinal);
      copy.style.top = "";
      copy.style.transform = "";
      return copyEls.map((_, i) => ({
        x: b[i].x - a[i].x,
        y: b[i].y - a[i].y,
        s: a[i].w ? b[i].w / a[i].w : 1,
      }));
    }

    function build() {
      if (!alive) return;
      st?.kill();
      st = null;

      M = getMetrics();

      if (reduce) {
        copy.classList.add(styles.copyFinal);
        const base = stage.getBoundingClientRect();
        copyRight = copy.getBoundingClientRect().right - base.left;
        sizeStage();
        layout(1, 1, 0);
        applyCopy(1);
        hint.style.opacity = "0";
        return;
      }

      deltas = measureCopy();
      introSealed = false;
      copySealed = false;
      sizeStage();

      st = ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: () => `+=${window.innerHeight * 6}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          applyTime(self.progress * dur);
        },
        onRefresh: (self) => {
          applyTime(self.progress * dur);
        },
      });

      applyTime(st.progress * dur);
      ScrollTrigger.refresh();
    }

    const onCardClick = (i: number) => () => {
      if (reduce || !st) {
        layout(1, 1, i);
        applyCopy(1);
        return;
      }
      const y =
        st.start + (stepAt[i] / dur) * (st.end - st.start);
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    const clickHandlers = cards.map((c, i) => {
      const handler = onCardClick(i);
      c.addEventListener("click", handler);
      return handler;
    });

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (alive) build();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    const boot = () => {
      if (!alive) return;
      build();
    };

    if ("fonts" in document) {
      void document.fonts.ready.then(boot);
    } else {
      boot();
    }
    window.addEventListener("load", boot, { once: true });

    return () => {
      alive = false;
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", boot);
      cards.forEach((c, i) => {
        c.removeEventListener("click", clickHandlers[i]);
      });
      st?.kill();
      st = null;
    };
  }, []);

  return (
    <section
      ref={stageRef}
      className={styles.stage}
      aria-labelledby="why-headline"
    >
      <div ref={copyRef} className={styles.copy}>
        <p ref={eyebrowRef} className={styles.eyebrow}>
          {WHY_CONTENT.eyebrow}
        </p>
        <h2 ref={headlineRef} id="why-headline" className={styles.headline}>
          {WHY_CONTENT.title}
        </h2>
        <p ref={subRef} className={styles.sub}>
          {WHY_CONTENT.support}
        </p>
        <Link
          ref={ctaRef}
          href={WHY_CONTENT.cta.href}
          className={styles.cta}
        >
          {WHY_CONTENT.cta.label}{" "}
          <span className={styles.ctaIcon} aria-hidden>
            →
          </span>
        </Link>
      </div>

      <div ref={trackRef} className={styles.track}>
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            className={styles.card}
            aria-label={slide.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
          >
            <div
              ref={(el) => {
                mediaRefs.current[i] = el;
              }}
              className={styles.media}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div
              ref={(el) => {
                dimRefs.current[i] = el;
              }}
              className={styles.dim}
              aria-hidden
            />
          </button>
        ))}

        <div ref={dashRef} className={styles.dash} aria-hidden />
        <div ref={frameRef} className={styles.frame} aria-hidden>
          <div ref={reelRef} className={styles.reel}>
            {SLIDES.map((slide, i) => (
              <div
                key={slide.id}
                className={styles.slide}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div ref={hintRef} className={styles.hint} aria-hidden>
        <span className={styles.hintIcon}>⌄</span>
        Scroll to continue
      </div>
    </section>
  );
}
