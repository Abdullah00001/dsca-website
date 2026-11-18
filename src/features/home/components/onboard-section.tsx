/**
 * @fileoverview Home onboarding band — pick a goal, get a course reco.
 * @module features/home/components/onboard-section
 */

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  ONBOARD_CONTENT,
  type OnboardGoal,
} from "@/features/home/lib/onboard-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/onboard-section.module.css";

gsap.registerPlugin(ScrollTrigger);

/** Resting tilt for each goal chip (matches reference stack). */
const GOAL_TILTS = [-4, 3, -2, 5, -3] as const;

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
 * click + scroll auto-select with day/amount counters.
 *
 * @returns Onboarding landmark for the home page.
 */
export function OnboardSection() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const recoRef = useRef<HTMLDivElement>(null);
  const courseRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLSpanElement>(null);
  const daysRef = useRef<HTMLSpanElement>(null);
  const amountRef = useRef<HTMLSpanElement>(null);
  const blurbRef = useRef<HTMLSpanElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);
  const busyRef = useRef(false);
  const indexRef = useRef(0);
  const clickLockUntil = useRef(0);
  const counterRef = useRef<{ days: number; amount: number }>({
    days: GOALS[0].days,
    amount: GOALS[0].amount,
  });
  const applyGoalRef = useRef<(index: number, opts?: { punch?: boolean }) => void>(
    () => undefined,
  );
  const [active, setActive] = useState<OnboardGoal>(GOALS[0]);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) {
      return;
    }

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
     * Updates reco copy + active chip for a goal index.
     *
     * @param index - Goal index.
     * @param opts.punch - Soft scale reaction on the stack.
     */
    function applyGoal(
      index: number,
      opts: { punch?: boolean } = {},
    ): void {
      const goal = GOALS[index];
      if (!goal || index === indexRef.current) {
        return;
      }

      indexRef.current = index;
      const courseEl = courseRef.current;
      const detailEl = detailRef.current;
      const shine = shineRef.current;

      if (reduce || !courseEl || !detailEl || !reco) {
        setActive(goal);
        runCounters(goal, false);
        return;
      }

      if (busyRef.current) {
        setActive(goal);
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
          setActive(goal);
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

      if (opts.punch) {
        goals.forEach((btn, i) => {
          gsap.fromTo(
            btn,
            { scale: 1 },
            {
              scale: i === index ? 1.06 : 0.95,
              duration: i === index ? 0.36 : 0.22,
              ease: i === index ? "back.out(2.8)" : "power2.out",
              yoyo: true,
              repeat: 1,
              overwrite: "auto",
            },
          );
        });
      }
    }

    applyGoalRef.current = applyGoal;

    if (reduce) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(goals, {
        opacity: 0,
        y: -140,
        scale: 0.9,
        rotation: (i) => (GOAL_TILTS[i] ?? 0) - 8,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
          onEnter: () => {
            // Intro count-up from 0 into the first reco
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

      tl.to(
        goals,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: (i) => GOAL_TILTS[i] ?? 0,
          duration: 0.85,
          stagger: 0.09,
          ease: "bounce.out",
        },
        0.12,
      );

      tl.add(() => {
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
      }, "+=0.15");

      ScrollTrigger.create({
        trigger: root,
        start: "top 55%",
        end: "bottom 40%",
        scrub: 0.55,
        onUpdate: (self) => {
          if (Date.now() < clickLockUntil.current) {
            return;
          }
          const idx = Math.round(self.progress * (GOALS.length - 1));
          if (idx !== indexRef.current) {
            applyGoal(idx, { punch: false });
          }
        },
      });
    }, root);

    return () => {
      gsap.killTweensOf(counter);
      ctx.revert();
    };
  }, []);

  /**
   * Click handler — locks scroll sync briefly so the pick sticks.
   *
   * @param index - Tapped goal index.
   */
  function onGoalClick(index: number): void {
    clickLockUntil.current = Date.now() + 1200;
    applyGoalRef.current(index, { punch: true });
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

        <div ref={stageRef} className={styles.stage}>
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
      </div>
    </section>
  );
}
