/**
 * @fileoverview Home onboarding band — pick a goal, get a course reco.
 * @module features/home/components/onboard-section
 */

"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  ONBOARD_CONTENT,
  type OnboardGoal,
} from "@/features/home/lib/onboard-content";
import { onHomeViewportWidthChange } from "@/features/home/lib/home-utils";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/onboard-section.module.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/** Resting tilt for each goal chip (matches reference stack). */
const GOAL_TILTS = [-4, 3, -2, 5, -3] as const;
/** Rocket artwork points up — MotionPath autoRotate offset (deg). */
const ROCKET_ANGLE = 90;
const ROCKET_SRC = "/assets/rocket.svg";
const SVG_NS = "http://www.w3.org/2000/svg";

const GOALS = ONBOARD_CONTENT.goals;

/**
 * Formats a BDT amount with thousand separators.
 *
 * @param value - Raw number.
 * @returns e.g. `4,950`.
 */
function formatAmount(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}

/**
 * Interactive “which barista are you” section: fall-in chips, light float,
 * click + scroll auto-select with day/amount counters, plus path rocket.
 *
 * @returns Onboarding landmark for the home page.
 */
export function OnboardSection() {
  // GSAP + MotionPath mutate the tree; React Compiler's memoization walks
  // circular graphs here and blows the call stack ("Maximum call stack size exceeded").
  "use no memo";

  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const recoRef = useRef<HTMLDivElement>(null);
  const courseRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLSpanElement>(null);
  const daysRef = useRef<HTMLSpanElement>(null);
  const amountRef = useRef<HTMLSpanElement>(null);
  const blurbRef = useRef<HTMLSpanElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dashBaseRef = useRef<SVGPathElement>(null);
  const dashLitRef = useRef<SVGPathElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const rocketRef = useRef<SVGImageElement>(null);
  const maskElRef = useRef<SVGMaskElement>(null);
  const busyRef = useRef(false);
  const indexRef = useRef(0);
  const clickLockUntil = useRef(0);
  const counterRef = useRef<{ days: number; amount: number }>({
    days: GOALS[0].days,
    amount: GOALS[0].amount,
  });
  const applyGoalRef = useRef<(index: number) => void>(() => undefined);
  /** Animates rocket (and page sync) to a chip — used by click. */
  const goToChipRef = useRef<(index: number) => void>(() => undefined);
  const [active, setActive] = useState<OnboardGoal>(GOALS[0]);
  const uid = useId().replace(/:/g, "");
  const maskId = `onboard-reveal-${uid}`;

  useEffect(() => {
    const rootEl = rootRef.current;
    const stageEl = stageRef.current;
    if (!rootEl || !stageEl) {
      return;
    }
    const root = rootEl;
    const stage = stageEl;
    let sectionCtx: gsap.Context | null = null;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const goals = [
      ...root.querySelectorAll<HTMLElement>(`.${styles.goal}`),
    ];
    const intro = root.querySelectorAll<HTMLElement>("[data-onboard-intro]");
    const reco = recoRef.current;
    const accent = root.querySelector<HTMLElement>(`.${styles.accent}`);
    const counter = counterRef.current;

    /**
     * Snaps or tweens the day + amount counters to a goal.
     *
     * @param goal - Target goal.
     * @param animate - When false, jump instantly.
     */
    function runCounters(goal: OnboardGoal, animate: boolean): void {
      const daysEl = daysRef.current;
      const amountEl = amountRef.current;
      const blurbEl = blurbRef.current;
      if (!daysEl || !amountEl) {
        return;
      }

      gsap.killTweensOf(counter);

      if (blurbEl) {
        blurbEl.textContent = goal.blurb;
      }

      if (!animate || reduce) {
        counter.days = goal.days;
        counter.amount = goal.amount;
        daysEl.textContent = String(goal.days);
        amountEl.textContent = formatAmount(goal.amount);
        return;
      }

      gsap.to(counter, {
        days: goal.days,
        amount: goal.amount,
        duration: 0.75,
        ease: "power2.out",
        overwrite: true,
        onUpdate: () => {
          daysEl.textContent = String(Math.round(counter.days));
          amountEl.textContent = formatAmount(counter.amount);
        },
      });
    }

    /**
     * Syncs aria-pressed on chips without a React re-render.
     *
     * @param index - Active goal index.
     */
    function syncChipPressed(index: number): void {
      goals.forEach((btn, i) => {
        btn.setAttribute("aria-pressed", i === index ? "true" : "false");
      });
    }

    /**
     * Updates reco copy + active chip for a goal index.
     *
     * Scroll-driven updates stay DOM-only (no setState) so React Compiler /
     * re-renders cannot recurse into a call-stack blowup.
     *
     * @param index - Goal index.
     * @param syncReact - When true (clicks), also update React state.
     */
    function applyGoal(index: number, syncReact = false): void {
      const goal = GOALS[index];
      if (!goal || index === indexRef.current) {
        return;
      }

      indexRef.current = index;
      syncChipPressed(index);
      const courseEl = courseRef.current;
      const detailEl = detailRef.current;
      const shine = shineRef.current;

      if (reduce || !courseEl || !detailEl || !reco) {
        if (syncReact) {
          setActive(goal);
        } else if (courseEl) {
          courseEl.textContent = goal.course;
        }
        runCounters(goal, false);
        return;
      }

      if (busyRef.current) {
        if (syncReact) {
          setActive(goal);
        }
        courseEl.textContent = goal.course;
        runCounters(goal, true);
        return;
      }

      busyRef.current = true;

      gsap.to(reco, { scale: 0.97, duration: 0.18, ease: "power2.in" });
      gsap.to([courseEl, detailEl], {
        opacity: 0,
        y: -12,
        filter: "blur(8px)",
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          if (syncReact) {
            setActive(goal);
          }
          courseEl.textContent = goal.course;
          runCounters(goal, true);

          gsap.fromTo(
            [courseEl, detailEl],
            { opacity: 0, y: 14, filter: "blur(8px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.36,
              stagger: 0.05,
              ease: "power3.out",
            },
          );
          gsap.to(reco, {
            scale: 1,
            duration: 0.5,
            ease: "back.out(2.4)",
            onComplete: () => {
              busyRef.current = false;
            },
          });
          if (shine) {
            gsap.fromTo(
              shine,
              { xPercent: -130, opacity: 0.8 },
              {
                xPercent: 130,
                opacity: 0,
                duration: 0.65,
                ease: "power2.inOut",
              },
            );
          }
        },
      });
    }

    applyGoalRef.current = applyGoal;

    if (reduce) {
      return;
    }

    const svgEl = svgRef.current;
    const dashBaseEl = dashBaseRef.current;
    const dashLitEl = dashLitRef.current;
    const maskPathEl = maskPathRef.current;
    const rocketEl = rocketRef.current;
    const maskNode = maskElRef.current;

    let pathCtx: gsap.Context | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let rocketTl: gsap.core.Timeline | null = null;
    let pathScrollTrigger: ScrollTrigger | null = null;
    /** Path progress (0–1) parked under each chip center. */
    let chipProgress: number[] = GOALS.map((_, i) =>
      GOALS.length <= 1 ? 0 : i / (GOALS.length - 1),
    );
    let clickDriving = false;
    /** Smoothed scroll progress so the rocket eases instead of snapping. */
    const scrollProgress = { value: 0 };
    let smoothScrollTween: gsap.core.Tween | null = null;

    /**
     * Linear interpolate two points.
     *
     * @param a - Start.
     * @param b - End.
     * @param t - 0–1.
     */
    function mix(
      a: { x: number; y: number },
      b: { x: number; y: number },
      t: number,
    ): { x: number; y: number } {
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
      };
    }

    /**
     * Point on left/right edge of a tilted chip, in stage coords.
     *
     * @param i - Goal index.
     * @param side - Edge side.
     */
    function edge(
      i: number,
      side: "l" | "r",
    ): { x: number; y: number } {
      const el = goals[i];
      const cx = el.offsetLeft + el.offsetWidth / 2;
      const cy = el.offsetTop + el.offsetHeight / 2;
      const a = ((GOAL_TILTS[i] ?? 0) * Math.PI) / 180;
      const w = (el.offsetWidth / 2) * (side === "r" ? 1 : -1);
      return {
        x: cx + w * Math.cos(a),
        y: cy + w * Math.sin(a),
      };
    }

    /**
     * Measures SVG path length for a `d` string.
     *
     * @param d - Path data.
     * @param svg - Parent SVG for temporary measure node.
     */
    function lengthOf(d: string, svg: SVGSVGElement): number {
      const p = document.createElementNS(SVG_NS, "path");
      p.setAttribute("d", d);
      svg.appendChild(p);
      const len = p.getTotalLength();
      p.remove();
      return len;
    }

    /**
     * Faces the rocket along travel direction.
     *
     * @param goingForward - True when moving toward later chips.
     */
    function faceRocket(goingForward: boolean): void {
      if (!rocketEl) {
        return;
      }
      gsap.set(rocketEl, { scaleY: goingForward ? 1 : -1 });
    }

    /**
     * Builds the serpentine dash + rocket timeline behind the chips.
     */
    /** Prevents resize ↔ refresh re-entrancy (stack overflow). */
    let pathBusy = false;

    function initPath(): void {
      if (
        pathBusy ||
        !svgEl ||
        !dashBaseEl ||
        !dashLitEl ||
        !maskPathEl ||
        !rocketEl ||
        !maskNode ||
        goals.length < 2
      ) {
        return;
      }

      pathBusy = true;
      try {
        const prevProgress = rocketTl?.progress() ?? 0;
        pathCtx?.revert();
        pathCtx = null;
        rocketTl = null;
        pathScrollTrigger = null;

        const W = stage.offsetWidth;
        const H = stage.offsetHeight;
        if (W <= 0 || H <= 0) {
          return;
        }

        svgEl.setAttribute("width", String(W));
        svgEl.setAttribute("height", String(H));
        svgEl.setAttribute("viewBox", `0 0 ${W} ${H}`);
        maskNode.setAttribute("x", "-200");
        maskNode.setAttribute("y", "-200");
        maskNode.setAttribute("width", String(W + 400));
        maskNode.setAttribute("height", String(H + 400));

        const widest = Math.max(...goals.map((g) => g.offsetWidth));
        const pad = Math.max(0, (W - widest) / 2);
        const k = Math.max(28, Math.min(pad * 0.85, 72));

        const pts = goals.map((_, i) => ({
          l: edge(i, "l"),
          r: edge(i, "r"),
          c: mix(edge(i, "l"), edge(i, "r"), 0.5),
        }));

        const P = (p: { x: number; y: number }) => `${p.x} ${p.y}`;
        // Start under chip 0 center so the nose never peeks past the left edge.
        let d = `M ${P(pts[0].c)}`;
        const anchorDs: string[] = [d];

        for (let i = 1; i < pts.length; i += 1) {
          const prev = pts[i - 1];
          const cur = pts[i];
          // Leave previous chip toward the loop side, curve into current, park at center.
          if (i % 2 === 1) {
            d += ` L ${P(prev.r)} C ${prev.r.x + k} ${prev.r.y}, ${cur.r.x + k} ${cur.r.y}, ${P(cur.r)} L ${P(cur.c)}`;
          } else {
            d += ` L ${P(prev.l)} C ${prev.l.x - k} ${prev.l.y}, ${cur.l.x - k} ${cur.l.y}, ${P(cur.l)} L ${P(cur.c)}`;
          }
          anchorDs.push(d);
        }

        const total = Math.max(lengthOf(d, svgEl), 1);
        chipProgress = anchorDs.map((ad) => lengthOf(ad, svgEl) / total);

        for (const p of [dashBaseEl, dashLitEl, maskPathEl]) {
          p.setAttribute("d", d);
        }
        gsap.set(maskPathEl, {
          strokeDasharray: total,
          strokeDashoffset: total,
        });
        gsap.set(rocketEl, {
          transformOrigin: "50% 50%",
          scaleY: 1,
          opacity: 1,
        });

        // Keep the path context outside the section context. Nested
        // gsap.context() trees make Context.getTweens recurse forever on revert.
        const buildPath = (): void => {
          pathCtx = gsap.context(() => {
            rocketTl = gsap.timeline({
              paused: true,
              defaults: { ease: "none" },
            });
            rocketTl
              .to(
                rocketEl,
                {
                  motionPath: {
                    path: dashBaseEl,
                    align: dashBaseEl,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: ROCKET_ANGLE,
                  },
                  duration: 1,
                },
                0,
              )
              .to(maskPathEl, { strokeDashoffset: 0, duration: 1 }, 0);

            scrollProgress.value = prevProgress;
            rocketTl.progress(prevProgress);

            pathScrollTrigger = ScrollTrigger.create({
              trigger: root,
              // Longer travel distance → slower rocket along the path.
              start: "top 75%",
              end: "bottom 15%",
              scrub: 1.4,
              onUpdate: (self) => {
                if (clickDriving || Date.now() < clickLockUntil.current) {
                  return;
                }
                if (self.direction !== 0) {
                  faceRocket(self.direction > 0);
                }
                smoothScrollTween?.kill();
                smoothScrollTween = gsap.to(scrollProgress, {
                  value: self.progress,
                  duration: 0.9,
                  ease: "power3.out",
                  overwrite: true,
                  onUpdate: () => {
                    rocketTl?.progress(scrollProgress.value);
                  },
                });

                let idx = 0;
                let best = Infinity;
                for (let i = 0; i < chipProgress.length; i += 1) {
                  const dist = Math.abs(chipProgress[i] - self.progress);
                  if (dist < best) {
                    best = dist;
                    idx = i;
                  }
                }
                if (idx !== indexRef.current) {
                  applyGoal(idx);
                }
              },
            });
          }, stage);
        };
        if (sectionCtx) {
          sectionCtx.ignore(buildPath);
        } else {
          buildPath();
        }
      } finally {
        // Do not ScrollTrigger.refresh() here — pin/spacer updates can re-enter
        // resize → initPath and blow the call stack.
        pathBusy = false;
      }
    }

    /**
     * Sends the rocket to a chip on click (no page scroll).
     *
     * @param index - Goal index.
     */
    function goToChip(index: number): void {
      const target = chipProgress[index] ?? 0;
      const from = rocketTl?.progress() ?? scrollProgress.value;
      const delta = Math.abs(target - from);
      faceRocket(target >= from);
      clickDriving = true;
      smoothScrollTween?.kill();
      // Far hops (e.g. 1 → 3) stay slow; nearby hops still feel deliberate.
      const duration = Math.max(1.8, delta * 5.5);
      clickLockUntil.current = Date.now() + duration * 1000 + 400;
      applyGoal(index, true);

      if (rocketTl) {
        gsap.to(scrollProgress, {
          value: target,
          duration,
          ease: "sine.inOut",
          overwrite: true,
          onUpdate: () => {
            rocketTl?.progress(scrollProgress.value);
          },
          onComplete: () => {
            clickDriving = false;
          },
        });
      } else {
        clickDriving = false;
      }
    }

    goToChipRef.current = goToChip;

    const ctx = gsap.context((self) => {
      sectionCtx = self;
      // Chips start in place (no fall-from-top entrance).
      gsap.set(goals, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: (i) => GOAL_TILTS[i] ?? 0,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
          onEnter: () => {
            counter.days = 0;
            counter.amount = 0;
            runCounters(GOALS[0], true);
          },
        },
      });

      tl.from(
        intro,
        {
          opacity: 0,
          y: 28,
          filter: "blur(10px)",
          duration: 0.7,
          stagger: 0.1,
        },
        0,
      );

      if (accent) {
        tl.from(
          accent,
          { scale: 0.9, y: 8, duration: 0.55, ease: "back.out(2.2)" },
          0.15,
        );
      }

      if (reco) {
        tl.from(
          reco,
          { opacity: 0, y: 24, scale: 0.95, duration: 0.65 },
          0.22,
        );
      }

      goals.forEach((btn, i) => {
        const base = GOAL_TILTS[i] ?? 0;
        gsap.to(btn, {
          y: i % 2 === 0 ? -5 : 5,
          rotation: base + (i % 2 === 0 ? 0.8 : -0.8),
          duration: 2.8 + i * 0.25,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.08,
        });
      });
      initPath();
    }, root);

    // Width-only — mobile URL-bar height changes must not rebuild the path.
    const stopWidthWatch = onHomeViewportWidthChange(() => {
      if (!pathBusy) {
        initPath();
      }
    });

    return () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      stopWidthWatch();
      pathCtx?.revert();
      smoothScrollTween?.kill();
      gsap.killTweensOf(counter);
      gsap.killTweensOf(scrollProgress);
      if (rocketTl) {
        gsap.killTweensOf(rocketTl);
      }
      ctx.revert();
    };
    // maskId is stable for the component lifetime; empty deps — run once.
  }, []);

  /**
   * Click handler — rockets to the chip and updates the reco.
   *
   * @param index - Tapped goal index.
   */
  function onGoalClick(index: number): void {
    goToChipRef.current(index);
  }

  return (
    <section
      ref={rootRef}
      className={`${styles.section} ${layout.g}`}
      aria-labelledby="onboard-heading"
    >
      <div className={`${styles.inner} ${layout.in}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-onboard-intro>
            {ONBOARD_CONTENT.eyebrow}
          </p>
          <h2 id="onboard-heading" className={styles.title} data-onboard-intro>
            {ONBOARD_CONTENT.titleBefore}{" "}
            <span className={styles.accent}>{ONBOARD_CONTENT.titleAccent}</span>{" "}
            {ONBOARD_CONTENT.titleAfter}
          </h2>
          <p className={styles.lead} data-onboard-intro>
            {ONBOARD_CONTENT.lead}
          </p>
        </div>

        <div ref={stageRef} className={styles.stage}>
          <svg
            ref={svgRef}
            className={styles.route}
            aria-hidden="true"
          >
            <defs>
              <mask
                ref={maskElRef}
                id={maskId}
                maskUnits="userSpaceOnUse"
              >
                <path
                  ref={maskPathRef}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </mask>
            </defs>
            <path
              ref={dashBaseRef}
              fill="none"
              stroke="rgba(242,184,74,0.28)"
              strokeWidth="3"
              strokeDasharray="9 9"
              strokeLinecap="round"
            />
            <path
              ref={dashLitRef}
              fill="none"
              stroke="var(--gold, #f2b84a)"
              strokeWidth="3"
              strokeDasharray="9 9"
              strokeLinecap="round"
              mask={`url(#${maskId})`}
            />
            <image
              ref={rocketRef}
              href={ROCKET_SRC}
              width="48"
              height="66"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>

          <div
            className={styles.stack}
            role="group"
            aria-label="Choose your goal"
          >
            {GOALS.map((goal, index) => {
              const pressed = goal.course === active.course;
              return (
                <button
                  key={goal.course}
                  type="button"
                  className={styles.goal}
                  data-course={goal.course}
                  data-index={index}
                  aria-pressed={pressed}
                  onClick={() => onGoalClick(index)}
                >
                  {goal.label}
                </button>
              );
            })}
          </div>
        </div>

        <div ref={recoRef} className={styles.reco} aria-live="polite">
          <span
            ref={shineRef}
            className={styles.recoShine}
            aria-hidden="true"
          />
          <div className={styles.recoCopy}>
            <small className={styles.recoLabel}>
              {ONBOARD_CONTENT.recoLabel}
            </small>
            <strong ref={courseRef} className={styles.recoCourse}>
              {active.course}
            </strong>
            <span ref={detailRef} className={styles.recoDetail}>
              <span ref={daysRef} className={styles.recoStat}>
                {active.days}
              </span>{" "}
              days · ৳
              <span ref={amountRef} className={styles.recoStat}>
                {formatAmount(active.amount)}
              </span>
              {" · "}
              <span ref={blurbRef}>{active.blurb}</span>
            </span>
          </div>
          <Button href={ONBOARD_CONTENT.cta.href}>
            {ONBOARD_CONTENT.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
