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
import { onHomeViewportWidthChange } from "@/features/home/lib/home-utils";

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
/** After the last image is in the frame, side cards leave to the left. */
const EXIT_DUR = 0.75;
/** Last framed image scales up until the next section. */
const ZOOM_DUR = 1.45;

/** Same frame geometry as the Oryzo layout. The box never scales. */
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
  return STRIP_END + carouselDur(n) + EXIT_DUR + ZOOM_DUR;
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
  const slideImgRefs = useRef<(HTMLDivElement | null)[]>([]);
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

    const stageEl: HTMLElement = stage;
    const copyEl: HTMLDivElement = copy;
    const trackEl: HTMLDivElement = track;
    const frameEl: HTMLDivElement = frame;
    const dashEl: HTMLDivElement = dash;
    const reelEl: HTMLDivElement = reel;
    const hintEl: HTMLDivElement = hint;

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
    let introSealed = false;
    let copySealed = false;

    function anchorX() {
      if (M.vw >= 1024 || M.vw < 768 || copyRight <= 0) return M.vw / 2;
      const rightReserve = M.smW + M.gap + 12;
      const maxCenter = M.vw - rightReserve - M.bigW / 2;
      return clamp(M.vw / 2, M.bigW / 2 + 16, maxCenter);
    }

    function sizeStage() {
      const { smW, smH, bigW, bigH, cy } = M;
      const focusX = anchorX();
      const pad = 6;
      const left = focusX - bigW / 2;
      const top = cy - bigH / 2;
      frameEl.style.width = `${bigW}px`;
      frameEl.style.height = `${bigH}px`;
      frameEl.style.left = `${left}px`;
      frameEl.style.top = `${top}px`;
      dashEl.style.width = `${bigW + pad * 2}px`;
      dashEl.style.height = `${bigH + pad * 2}px`;
      dashEl.style.left = `${left - pad}px`;
      dashEl.style.top = `${top - pad}px`;
      slideRefs.current.forEach((slide) => {
        if (!slide) return;
        slide.style.width = `${bigW}px`;
        slide.style.height = `${bigH}px`;
      });
      cards.forEach((card) => {
        card.style.width = `${smW}px`;
        card.style.height = `${smH}px`;
      });
      trackEl.style.transformOrigin = `${focusX}px ${cy}px`;
    }

    function layout(
      intro: number,
      strip: number,
      t: number,
      exit = 0,
      zoom = 0,
    ) {
      const { smW, bigW, gap, cy } = M;
      const frameLeft = anchorX() - bigW / 2;
      const step = smW + gap;

      reelEl.style.transform = `translate3d(${(-t * bigW).toFixed(1)}px,0,0)`;
      frameEl.style.transform = "none";
      dashEl.style.transform = "none";
      trackEl.style.transform = "none";
      reelEl.style.clipPath = "none";

      slideImgRefs.current.forEach((img, i) => {
        if (!img) return;
        const scale = i === n - 1 ? lerp(1, 1.45, zoom) : 1;
        img.style.transform = `scale(${scale})`;
        if (i === 0) {
          const blur = (1 - intro) * 16;
          img.style.filter = blur > 0.35 ? `blur(${blur.toFixed(2)}px)` : "none";
        }
      });

      if (intro < 1) {
        introSealed = false;
        frameEl.style.opacity = String(clamp(0.45 + intro * 0.55));
        dashEl.style.opacity = String(clamp(intro * 1.6));
      } else if (!introSealed) {
        introSealed = true;
        frameEl.style.opacity = "1";
        dashEl.style.opacity = "1";
      }

      const y = cy - M.smH / 2;
      const frameRight = frameLeft + bigW;
      // Enter from the right edge; once the last image is framed, leave to the left.
      const enterShift = (1 - strip) * M.vw * 0.48;
      const leave = exit * (M.vw + smW + gap);
      for (let i = 0; i < n; i++) {
        const d = i - t;
        const baseX =
          d < 0
            ? frameLeft - gap - smW + (d + 1) * step
            : frameRight + gap + (d - 1) * step;
        const x = baseX + enterShift - leave;
        const right = x + smW;
        const visible = Math.min(right, M.vw) - Math.max(x, 0);
        const edgeSliver = visible < smW * 0.22;
        const offLeft = right < 4;
        const underText = copyRight > 0 ? Math.min(right, copyRight) - x : 0;
        // Desktop copy sits above the row, so side images may pass under its x.
        const overText =
          M.vw < 1024 && x < frameLeft && underText > smW * 0.72;
        const show = strip > 0.02 && !edgeSliver && !overText && !offLeft;
        const card = cards[i];
        card.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
        card.style.opacity = show ? (strip * (1 - exit)).toFixed(3) : "0";
        card.style.pointerEvents =
          show && strip > 0.6 && exit < 0.2 ? "auto" : "none";
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
      const carouselEnd = STRIP_END + travel;
      const afterCarousel = time - carouselEnd;
      const exit =
        afterCarousel <= 0
          ? 0
          : easeInOut(clamp(afterCarousel / EXIT_DUR));
      const zoom =
        afterCarousel <= EXIT_DUR
          ? 0
          : easeInOut(clamp((afterCarousel - EXIT_DUR) / ZOOM_DUR));
      const focus = focusAtTime(Math.min(time, carouselEnd), n);
      layout(intro, strip, focus, exit, zoom);
      if (copyT < 1) {
        if (copySealed) {
          copyEl.classList.remove(styles.copyFinal);
          copyEl.style.top = "";
          copyEl.style.left = "";
          copyEl.style.maxWidth = "";
          copyEl.style.transform = "";
        }
        copySealed = false;
        applyCopy(copyT);
      } else if (!copySealed) {
        applyCopy(1);
        copySealed = true;
        // Keep settled CSS so eyebrow/title/sub/cta/frame gaps stay real.
        copyEl.classList.add(styles.copyFinal);
        if (M.vw >= 1024) {
          placeSettledCopy();
        } else if (M.vw < 1024 && M.vw >= 768) {
          const base = stageEl.getBoundingClientRect();
          const copyLeft = copyEl.getBoundingClientRect().left - base.left;
          const centeredLeft = (M.vw - M.bigW) / 2;
          const col = Math.max(150, centeredLeft - copyLeft - 18);
          copyEl.style.maxWidth = `${col}px`;
          copyEl.style.transform = "";
        } else {
          copyEl.style.top = "";
          copyEl.style.left = "";
          copyEl.style.transform = "";
        }
        copyEls.forEach((el) => {
          el.style.transform = "";
        });
      }
      if (time > STRIP_END) {
        hintEl.style.opacity = String(1 - clamp((time - STRIP_END) / 0.35));
      } else if (hintEl.style.opacity !== "1") {
        hintEl.style.opacity = "1";
      }
    }

    /** Oryzo settled type: upper-left, just above the thumbnail row. */
    function placeSettledCopy() {
      if (M.vw < 1024) return;
      copyEl.style.transform = "none";
      const thumbTop = M.cy - M.smH / 2;
      const copyH = copyEl.getBoundingClientRect().height;
      const top = Math.max(76, thumbTop - copyH - 14);
      copyEl.style.top = `${top}px`;
    }

    function measureCopy() {
      copyEls.forEach((el) => {
        el.style.transform = "";
      });
      copyEl.classList.remove(styles.copyFinal);
      copyEl.style.top = "";
      copyEl.style.left = "";
      copyEl.style.maxWidth = "";
      copyEl.style.transform = "";
      const base = stageEl.getBoundingClientRect();
      const r = (el: HTMLElement) => {
        const b = el.getBoundingClientRect();
        return {
          x: b.left - base.left,
          y: b.top - base.top,
          w: b.width,
        };
      };
      const a = copyEls.map(r);
      M = getMetrics();
      copyEl.classList.add(styles.copyFinal);
      copyEl.style.top = "";
      copyEl.style.left = "";
      copyEl.style.maxWidth = "";
      copyEl.style.transform = "";

      if (M.vw < 768) {
        const copyBottom = copyEl.getBoundingClientRect().bottom - base.top;
        const frameTop = Math.min(copyBottom + 20, M.vh - M.bigH - 36);
        M = { ...M, cy: frameTop + M.bigH / 2 };
        copyRight = copyEl.getBoundingClientRect().right - base.left;
      } else if (M.vw < 1024) {
        const copyLeft = copyEl.getBoundingClientRect().left - base.left;
        const centeredLeft = (M.vw - M.bigW) / 2;
        const col = Math.max(150, centeredLeft - copyLeft - 18);
        copyEl.style.maxWidth = `${col}px`;
        copyRight = copyEl.getBoundingClientRect().right - base.left;
      } else {
        placeSettledCopy();
        copyRight = copyEl.getBoundingClientRect().right - base.left;
      }

      const b = copyEls.map(r);
      copyEl.classList.remove(styles.copyFinal);
      copyEl.style.top = "";
      copyEl.style.left = "";
      copyEl.style.maxWidth = "";
      copyEl.style.transform = "";
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

      if (reduce) {
        M = getMetrics();
        copyEl.classList.add(styles.copyFinal);
        copyEl.style.top = "";
        copyEl.style.left = "";
        copyEl.style.maxWidth = "";
        copyEl.style.transform = "";
        placeSettledCopy();
        const base = stageEl.getBoundingClientRect();
        copyRight = copyEl.getBoundingClientRect().right - base.left;
        sizeStage();
        layout(1, 1, 0);
        applyCopy(1);
        hintEl.style.opacity = "0";
        return;
      }

      deltas = measureCopy();
      introSealed = false;
      copySealed = false;
      sizeStage();

      st = ScrollTrigger.create({
        trigger: stageEl,
        start: "top top",
        end: () => `+=${window.innerHeight * 7.5}`,
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

    // Width-only: ignore URL-bar height changes that fire `resize` on scroll.
    const stopWidthWatch = onHomeViewportWidthChange(() => {
      if (alive) build();
    });

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
      stopWidthWatch();
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
              >
                <div
                  className={styles.slideImg}
                  ref={(el) => {
                    slideImgRefs.current[i] = el;
                  }}
                  style={{ backgroundImage: `url('${slide.image}')` }}
                />
              </div>
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
