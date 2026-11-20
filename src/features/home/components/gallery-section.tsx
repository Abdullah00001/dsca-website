/**
 * @fileoverview Home academy gallery — reference section after reviews, plus filters.
 * @module features/home/components/gallery-section
 */

"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import {
  GALLERY_CONTENT,
  type GalleryFilterId,
  type GalleryItem,
} from "@/features/home/lib/gallery-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/gallery-section.module.css";

/**
 * Slides the gold pill behind the active filter.
 *
 * @param row - Filter row.
 * @param thumb - Sliding highlight.
 * @param animate - Tween when true; snap on the first measure and on resize.
 */
function placeThumb(
  row: HTMLDivElement,
  thumb: HTMLSpanElement,
  animate: boolean,
): void {
  const active = row.querySelector<HTMLButtonElement>("[aria-pressed='true']");
  if (!active) {
    return;
  }
  const rowBox = row.getBoundingClientRect();
  const box = active.getBoundingClientRect();
  gsap.to(thumb, {
    x: box.left - rowBox.left,
    y: box.top - rowBox.top,
    width: box.width,
    height: box.height,
    duration: animate ? 0.45 : 0,
    ease: "power3.out",
    overwrite: "auto",
  });
}

/**
 * One academy photo. The shimmer stays up until the file has loaded,
 * including after a filter swap remounts the card.
 *
 * @param props - Photo to render.
 * @returns Gallery card with a skeleton while the image loads.
 */
function GalleryCard({ item }: { item: GalleryItem }) {
  "use no memo";

  const photoRef = useRef<HTMLDivElement>(null);

  /**
   * Drops the shimmer once the file is ready.
   * DOM-only so a load event cannot re-render the page mid-animation.
   */
  const markReady = (): void => {
    const photo = photoRef.current;
    if (!photo || photo.dataset.ready === "true") {
      return;
    }
    photo.dataset.ready = "true";
    photo.removeAttribute("aria-busy");
    photo.querySelector("img")?.classList.add(styles.imgReady);
  };

  useEffect(() => {
    const img = photoRef.current?.querySelector("img");
    if (img?.complete && img.naturalWidth > 0) {
      markReady();
    }
  }, [item.image]);

  return (
    <li className={styles.card} data-gal="card">
      <div
        ref={photoRef}
        className={styles.photo}
        data-ready="false"
        aria-busy="true"
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 699px) 100vw, (max-width: 899px) 50vw, 33vw"
          className={styles.img}
          onLoad={markReady}
          onError={markReady}
        />
        <span className={styles.skeleton} aria-hidden="true" />
        <span className={styles.label}>{item.label}</span>
      </div>
    </li>
  );
}

/**
 * Reference “Our Academy” photo grid.
 * Pill filters match the site; GSAP reveals the section and swaps the grid.
 *
 * @returns Academy gallery for the home page.
 */
export function GallerySection() {
  "use no memo";

  const rootRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const thumbReady = useRef(false);
  const skipEnter = useRef(true);
  const [filter, setFilter] = useState<GalleryFilterId>("all");
  const items = GALLERY_CONTENT.items.filter(
    (item) => filter === "all" || item.filter === filter,
  );

  useLayoutEffect(() => {
    const row = rowRef.current;
    const thumb = thumbRef.current;
    if (!row || !thumb) {
      return;
    }
    placeThumb(row, thumb, thumbReady.current);
    thumbReady.current = true;

    const onResize = (): void => {
      placeThumb(row, thumb, false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [filter]);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || skipEnter.current) {
      skipEnter.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const cards = grid.querySelectorAll<HTMLElement>("li");
    if (cards.length === 0) {
      return;
    }
    gsap.fromTo(
      cards,
      { opacity: 0, y: 22, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        immediateRender: false,
        clearProps: "opacity,transform",
      },
    );
  }, [filter]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const copy = root.querySelectorAll<HTMLElement>("[data-gal='copy']");
    const accent = root.querySelector<HTMLElement>(`.${styles.accent}`);
    const tabs = root.querySelectorAll<HTMLElement>(`.${styles.tab}`);
    const cards = root.querySelectorAll<HTMLElement>("[data-gal='card']");
    const cta = root.querySelector<HTMLElement>("[data-gal='cta']");

    let observer: IntersectionObserver | null = null;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      if (copy.length > 0) {
        tl.from(
          copy,
          {
            opacity: 0,
            y: 28,
            filter: "blur(8px)",
            duration: 0.7,
            stagger: 0.1,
            immediateRender: false,
            clearProps: "filter",
          },
          0,
        );
      }

      if (accent) {
        tl.from(
          accent,
          {
            scale: 0.92,
            y: 8,
            duration: 0.55,
            ease: "back.out(2.2)",
            immediateRender: false,
          },
          0.12,
        );
      }

      if (tabs.length > 0) {
        tl.from(
          tabs,
          {
            opacity: 0,
            y: 14,
            duration: 0.45,
            stagger: 0.06,
            immediateRender: false,
          },
          0.2,
        );
      }

      if (cards.length > 0) {
        tl.from(
          cards,
          {
            opacity: 0,
            y: 32,
            scale: 0.97,
            duration: 0.65,
            stagger: 0.07,
            ease: "power2.out",
            immediateRender: false,
            clearProps: "opacity,transform",
          },
          0.28,
        );
      }

      if (cta) {
        tl.from(
          cta,
          { opacity: 0, y: 16, duration: 0.45, immediateRender: false },
          0.45,
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
   * Swaps the gallery. The id is read from the button so the pill
   * updates immediately; the grid then eases in with GSAP.
   *
   * @param event - Click on a filter pill.
   */
  const choose = (event: MouseEvent<HTMLButtonElement>): void => {
    const next = event.currentTarget.dataset.filter;
    if (
      next !== "all" &&
      next !== "hands-on" &&
      next !== "events" &&
      next !== "certificate"
    ) {
      return;
    }
    if (next === filter) {
      return;
    }
    setFilter(next);
  };

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-labelledby="gallery-heading"
    >
      <div className={layout.g}>
        <div className={layout.in}>
          <p className={styles.eyebrow} data-gal="copy">
            {GALLERY_CONTENT.eyebrow}
          </p>
          <h2 id="gallery-heading" className={styles.title} data-gal="copy">
            {GALLERY_CONTENT.titleBefore}{" "}
            <em className={styles.accent}>{GALLERY_CONTENT.titleAccent}</em>
          </h2>
          <p className={styles.lead} data-gal="copy">
            {GALLERY_CONTENT.lead}
          </p>

          <div
            ref={rowRef}
            className={styles.row}
            role="group"
            aria-label="Filter gallery"
          >
            <span ref={thumbRef} className={styles.thumb} aria-hidden="true" />
            {GALLERY_CONTENT.filters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.tab}
                data-filter={item.id}
                aria-pressed={filter === item.id}
                onClick={choose}
              >
                {item.label}
              </button>
            ))}
          </div>

          <ul ref={gridRef} className={styles.grid}>
            {items.map((item) => (
              <GalleryCard key={`${filter}-${item.id}`} item={item} />
            ))}
          </ul>
          <div className={styles.cta} data-gal="cta">
            <Button href={GALLERY_CONTENT.cta.href}>
              {GALLERY_CONTENT.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
