"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import clsx from "clsx";
import { Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import styles from "./course-recommender.module.css";

type GoalOption = {
  label: string;
  course: string;
  details: string;
  rotation: number;
};

const GOALS: GoalOption[] = [
  {
    label: "I just love coffee",
    course: "Barista Intermediate",
    details: "3 days · ৳4,950 · the fastest start",
    rotation: -4,
  },
  {
    label: "I want a café job",
    course: "Barista Professional",
    details: "10 days · ৳14,000 · job-ready skills",
    rotation: 3,
  },
  {
    label: "I want the full journey",
    course: "DSCA Barista Starter Pack",
    details: "15 days · ৳17,000 · best value, zero gaps",
    rotation: -2,
  },
  {
    label: "I'm opening my own shop",
    course: "Barista Advance Professional",
    details: "22 days · ৳21,000 · head-barista track",
    rotation: 5,
  },
  {
    label: "I already work in a café",
    course: "Food Safety Management",
    details: "2 days · ৳5,000 · add it to any course",
    rotation: -3,
  },
];

export function CourseRecommender() {
  const [selectedGoal, setSelectedGoal] = useState<GoalOption>(GOALS[0]);
  const recoRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const stack = stackRef.current;
    if (!stack) return;

    const buttons = stack.querySelectorAll<HTMLButtonElement>("button");
    const tweens = Array.from(buttons).map((btn, i) => {
      return gsap.to(btn, {
        y: i % 2 ? -6 : 6,
        duration: 2 + i * 0.3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  function handleSelect(goal: GoalOption) {
    setSelectedGoal(goal);

    if (
      recoRef.current &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.fromTo(
        recoRef.current,
        { scale: 0.96 },
        { scale: 1, duration: 0.5, ease: "back.out(3)" }
      );
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div>
          <Eyebrow>Start here</Eyebrow>
          <h2 className={styles.heading}>
            Which kind of <em>barista</em> are you?
          </h2>
          <p className={styles.lead}>
            Tap the one that sounds like you. We will point you to the right
            course.
          </p>

          <div
            ref={recoRef}
            className={styles.recoCard}
            aria-live="polite"
            role="status"
          >
            <div>
              <span className={styles.recoSmall}>Recommended for you</span>
              <strong className={styles.recoTitle}>
                {selectedGoal.course}
              </strong>
              <span className={styles.recoDetails}>
                {selectedGoal.details}
              </span>
            </div>
            <Button href="/contact">Reserve</Button>
          </div>
        </div>

        <div
          ref={stackRef}
          className={styles.stack}
          role="group"
          aria-label="Choose your learning goal"
        >
          {GOALS.map((goal) => {
            const isSelected = selectedGoal.label === goal.label;
            return (
              <button
                key={goal.label}
                type="button"
                aria-pressed={isSelected}
                style={{ transform: `rotate(${goal.rotation}deg)` }}
                className={clsx(
                  styles.stackButton,
                  isSelected && styles.activeButton
                )}
                onClick={() => handleSelect(goal)}
              >
                {goal.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

