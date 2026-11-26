/**
 * @fileoverview Inner-page hero matching reference `photoHero()` / overridden `hero()`.
 */

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { PHOTO } from "@/libs/catalog";

/** One breadcrumb. The last item is the current page. */
export type Crumb = { label: string; href?: string };

/**
 * Props for {@link PageHero}.
 */
export type PageHeroProps = {
  crumbs: Crumb[];
  title: ReactNode;
  sub?: ReactNode;
  /** Campus photo. Defaults to hall — reference `hero()` always uses a photo. */
  photo?: string;
  photoAlt?: string;
  titleStyle?: CSSProperties;
  className?: string;
  headerStyle?: CSSProperties;
  extra?: ReactNode;
  ticker?: readonly string[];
};

/**
 * Forest photo page hero with breadcrumbs (reference `.ph0.photo.h-forest`).
 *
 * @param props - Title, crumbs, optional photo and ticker.
 * @returns Header landmark.
 */
export function PageHero({
  crumbs,
  title,
  sub,
  photo = PHOTO.hall,
  photoAlt = "",
  titleStyle,
  className = "",
  headerStyle,
  extra,
  ticker,
}: PageHeroProps) {
  return (
    <header className={`ph0 g photo h-forest ${className}`.trim()} style={headerStyle}>
      <Image
        src={photo}
        alt={photoAlt}
        fill
        priority
        sizes="100vw"
        className="hbg"
      />
      <div className="in">
        <ol className="crumbs">
          {crumbs.map((crumb) => (
            <li key={crumb.label}>
              {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
            </li>
          ))}
        </ol>
        <h1 data-hero style={titleStyle}>{title}</h1>
        {sub ? <p className="sub">{sub}</p> : null}
        {extra}
      </div>
      {ticker ? (
        <div className="tick" aria-hidden="true">
          <div>
            {[0, 1].map((copy) =>
              ticker.map((word) => (
                <span key={`${copy}-${word}`}>
                  {word} <b>✦</b>
                </span>
              )),
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
