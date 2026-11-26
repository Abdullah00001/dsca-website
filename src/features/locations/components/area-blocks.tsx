/**
 * @fileoverview Area page blocks (reference `blocksHTML`, `areaCards`, `feeTable`).
 */

"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { FaqList } from "@/components/page/faq-list";
import styles from "@/components/page/pages.module.css";
import {
  AREA_LIST,
  COURSES,
  PAL,
  linkifyParts,
  type AreaBlock,
} from "../lib";

/**
 * Props for {@link AreaBlocks}.
 */
export type AreaBlocksProps = {
  blocks: AreaBlock[];
};

/**
 * Renders reference area blocks, including the searchable area grid.
 *
 * @param props - Block list from `AREAS`.
 * @returns Prose, tables, FAQ, and area cards.
 */
export function AreaBlocks({ blocks }: AreaBlocksProps) {
  const [query, setQuery] = useState("");
  const prose: ReactNode[] = [];
  const chunks: ReactNode[] = [];
  let proseKey = 0;

  const flush = () => {
    if (prose.length === 0) return;
    chunks.push(
      <div key={`prose-${proseKey}`} className={styles.prose}>
        {prose.splice(0)}
      </div>,
    );
    proseKey += 1;
  };

  blocks.forEach((block, index) => {
    const [kind] = block;
    if (kind === "close") return;
    if (kind === "h2") {
      prose.push(<h2 key={index}>{String(block[1])}</h2>);
      return;
    }
    if (kind === "p") {
      const parts = linkifyParts(String(block[1]));
      prose.push(
        <p key={index}>
          {parts.map((part, partIndex) =>
            part.href ? (
              <Link key={partIndex} href={part.href}>
                {part.text}
              </Link>
            ) : (
              <span key={partIndex}>{part.text}</span>
            ),
          )}
        </p>,
      );
      return;
    }
    flush();
    if (kind === "tbl") {
      const rows = block[1] as [string, string][];
      chunks.push(
        <div key={index} className={styles.attr}>
          {rows.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <b>{value}</b>
            </div>
          ))}
        </div>,
      );
    } else if (kind === "fees") {
      chunks.push(
        <div key={index}>
          <h2 className={styles.h2s}>Barista courses and fees at DSCA</h2>
          <div className={styles.scroll}>
            <table className={`${styles.table} ${styles.tableLight}`}>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Duration</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map((course) => (
                  <tr key={course.id}>
                    <td>
                      <Link href={`/courses/${course.id}`}>
                        <b>{course.n}</b>
                      </Link>
                    </td>
                    <td>{course.d}</td>
                    <td>{course.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>,
      );
    } else if (kind === "faq") {
      chunks.push(
        <div key={index}>
          <h2 className={styles.h2s}>{String(block[1])}</h2>
          <FaqList items={block[2] as [string, string][]} />
        </div>,
      );
    } else if (kind === "areas") {
      const q = query.toLowerCase();
      chunks.push(
        <div key={index}>
          <div className={`${styles.field} ${styles.search}`}>
            <label htmlFor="area-search">Search your area</label>
            <input
              id="area-search"
              type="search"
              placeholder="e.g. Dhanmondi"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className={`${styles.grid} ${styles.g3}`}>
            {AREA_LIST.filter((area) =>
              `${area[1]} ${area[2]}`.toLowerCase().includes(q),
            ).map((area) => {
              const tone = PAL[AREA_LIST.indexOf(area) % PAL.length];
              return (
                <Link
                  key={area[0]}
                  href={`/locations/${area[0]}`}
                  className={`${styles.card} ${styles.areaCard} ${styles[tone]}`}
                >
                  <span className={styles.eyebrow}>{area[3]}</span>
                  <strong>{area[2]}</strong>
                  <span className={styles.areaFoot}>
                    {area[4]}
                    <span className={styles.arrow}>→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>,
      );
    }
  });
  flush();

  return <>{chunks}</>;
}
