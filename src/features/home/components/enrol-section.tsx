/**
 * @fileoverview Home enrolment form — reference `#enrol` after the blog.
 * @module features/home/components/enrol-section
 */

"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Script from "next/script";
import gsap from "gsap";
import {
  ENROL_CONTENT,
  ENROL_COURSE_OPTIONS,
} from "@/features/home/lib/enrol-content";
import layout from "@/styles/layout.module.css";
import buttonStyles from "@/components/ui/button/button.module.css";
import styles from "@/features/home/components/enrol-section.module.css";

type CourseOption = (typeof ENROL_COURSE_OPTIONS)[number];

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

/** Cloudflare always-pass test site key when env is unset. */
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
  "1x00000000000000000000AA";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Dark forest enrolment band with Cloudflare Turnstile on the form.
 *
 * @returns Enrol section for the home page.
 */
export function EnrolSection() {
  "use no memo";

  const rootRef = useRef<HTMLElement>(null);
  const captchaRef = useRef<HTMLDivElement>(null);
  const courseWrapRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const captchaMountId = useId();
  const listboxId = useId();

  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [courseOpen, setCourseOpen] = useState(false);
  const [course, setCourse] = useState<CourseOption>(
    ENROL_COURSE_OPTIONS[0]!,
  );

  useEffect(() => {
    if (!courseOpen) {
      return;
    }

    const onPointer = (event: MouseEvent) => {
      const wrap = courseWrapRef.current;
      if (wrap && !wrap.contains(event.target as Node)) {
        setCourseOpen(false);
      }
    };
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setCourseOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [courseOpen]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const card = root.querySelector<HTMLElement>("[data-enrol='card']");
    const shine = root.querySelector<HTMLElement>("[data-enrol='shine']");

    let observer: IntersectionObserver | null = null;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      if (shine) {
        tl.fromTo(
          shine,
          { xPercent: -130, opacity: 0.55 },
          { xPercent: 130, opacity: 0, duration: 1.05, ease: "power2.inOut" },
          0,
        );
      }

      if (card) {
        tl.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            immediateRender: false,
          },
          0.08,
        );
      }

      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            tl.play();
            observer?.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
      );
      observer.observe(root);
    }, root);

    return () => {
      observer?.disconnect();
      ctx.revert();
    };
  }, []);

  /**
   * Mounts the Turnstile widget once the Cloudflare script is ready.
   */
  const mountTurnstile = (): void => {
    const host = captchaRef.current;
    if (!host || !window.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(host, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "auto",
      callback: (value) => {
        setToken(value);
        setError("");
      },
      "expired-callback": () => setToken(""),
      "error-callback": () => {
        setToken("");
        setError("Captcha failed to load. Refresh and try again.");
      },
    });
  };

  useEffect(() => {
    mountTurnstile();
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  /**
   * Posts the enrolment payload after Turnstile has a fresh token.
   *
   * @param event - Form submit event.
   */
  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (status === "submitting") {
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    if (!token) {
      setError("Please complete the captcha.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/enrol", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          course: String(data.get("course") ?? ""),
          note: String(data.get("note") ?? ""),
          turnstileToken: token,
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Something went wrong.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setToken("");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }
  };

  return (
    <section
      ref={rootRef}
      id="enrol"
      className={styles.section}
      aria-labelledby="enrol-heading"
    >
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={mountTurnstile}
      />
      <span className={styles.shine} data-enrol="shine" aria-hidden="true" />
      <div className={`${layout.g} ${styles.inner}`}>
        <div className={styles.card} data-enrol="card">
          {status === "success" ? (
            <div className={styles.success}>
              <h2 className={styles.successTitle}>
                {ENROL_CONTENT.successTitleBefore}{" "}
                <em className={styles.accent}>
                  {ENROL_CONTENT.successTitleAccent}
                </em>
              </h2>
              <p className={styles.successBody}>{ENROL_CONTENT.successBody}</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <h2 id="enrol-heading" className={styles.title}>
                <span className={styles.line}>{ENROL_CONTENT.titleLine1}</span>
                <span className={styles.line}>{ENROL_CONTENT.titleLine2}</span>
                <span className={styles.line}>
                  {ENROL_CONTENT.titleDash}{" "}
                  <em className={styles.accent}>{ENROL_CONTENT.titleAccent}</em>
                </span>
              </h2>
              <p className={styles.lead}>{ENROL_CONTENT.lead}</p>

              <div className={styles.field}>
                <label htmlFor={ENROL_CONTENT.fields.name.id}>
                  {ENROL_CONTENT.fields.name.label}
                </label>
                <input
                  id={ENROL_CONTENT.fields.name.id}
                  className={styles.control}
                  name="name"
                  required
                  autoComplete="name"
                />
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor={ENROL_CONTENT.fields.email.id}>
                    {ENROL_CONTENT.fields.email.label}
                  </label>
                  <input
                    id={ENROL_CONTENT.fields.email.id}
                    className={styles.control}
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor={ENROL_CONTENT.fields.phone.id}>
                    {ENROL_CONTENT.fields.phone.label}
                  </label>
                  <input
                    id={ENROL_CONTENT.fields.phone.id}
                    className={styles.control}
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <span id={`${ENROL_CONTENT.fields.course.id}-label`}>
                  {ENROL_CONTENT.fields.course.label}
                </span>
                <div className={styles.selectWrap} ref={courseWrapRef}>
                  <input type="hidden" name="course" value={course.value} />
                  <button
                    id={ENROL_CONTENT.fields.course.id}
                    type="button"
                    className={`${styles.control} ${styles.selectTrigger}${
                      courseOpen ? ` ${styles.selectOpen}` : ""
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={courseOpen}
                    aria-controls={listboxId}
                    aria-labelledby={`${ENROL_CONTENT.fields.course.id}-label`}
                    onClick={() => setCourseOpen((open) => !open)}
                    onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => {
                      if (event.key === "ArrowDown" || event.key === "Enter") {
                        event.preventDefault();
                        setCourseOpen(true);
                      }
                    }}
                  >
                    <span className={styles.selectValue}>{course.label}</span>
                    <span className={styles.selectChevron} aria-hidden="true">
                      ▾
                    </span>
                  </button>
                  {courseOpen ? (
                    <ul
                      id={listboxId}
                      className={styles.selectMenu}
                      role="listbox"
                      aria-labelledby={`${ENROL_CONTENT.fields.course.id}-label`}
                    >
                      {ENROL_COURSE_OPTIONS.map((option) => {
                        const selected = option.value === course.value;
                        return (
                          <li key={option.value} role="presentation">
                            <button
                              type="button"
                              role="option"
                              aria-selected={selected}
                              className={`${styles.selectOption}${
                                selected ? ` ${styles.selectOptionActive}` : ""
                              }`}
                              onClick={() => {
                                setCourse(option);
                                setCourseOpen(false);
                              }}
                            >
                              {option.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor={ENROL_CONTENT.fields.note.id}>
                  {ENROL_CONTENT.fields.note.label}
                </label>
                <textarea
                  id={ENROL_CONTENT.fields.note.id}
                  className={styles.textarea}
                  name="note"
                  rows={4}
                />
              </div>

              <div
                ref={captchaRef}
                id={captchaMountId}
                className={styles.captcha}
              />

              {error ? <p className={styles.error}>{error}</p> : null}

              <button
                type="submit"
                className={`${buttonStyles.btn} ${styles.submit}`}
                data-magnetic="btn"
                disabled={status === "submitting"}
              >
                <span className={styles.submitLabel}>
                  {ENROL_CONTENT.submitLabel}
                </span>
                <i className={buttonStyles.icon}>→</i>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
