/**
 * @fileoverview Blog index and article (reference `pages.blog` / `pages.post`).
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import btn from "@/components/ui/button/button.module.css";
import { FilterBar, FilterItem } from "@/components/page/filter-bar";
import { PageHero } from "@/components/page/page-hero";
import { PagesShell } from "@/components/page/pages-shell";
import styles from "@/components/page/pages.module.css";
import {
  CATEGORY_TONE,
  PHOTO,
  POSTS,
  TRAINER_IMAGE,
  type CatalogPost,
} from "../lib";
import layout from "@/styles/layout.module.css";

const FILTERS = ["All", "Guide", "Career", "Industry", "Brewing"] as const;

const COVERS = [PHOTO.lounge, PHOTO.bar, PHOTO.hall, PHOTO.staff, PHOTO.staff2, PHOTO.int1];

/**
 * Blog listing with featured guide and category filter.
 *
 * @returns Blog page.
 */
export function BlogView() {
  const [joined, setJoined] = useState(false);

  return (
    <PagesShell>
      <PageHero
        photo={PHOTO.lounge}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title={<>Free barista <em className="it">guides</em></>}
        sub="Written by the instructors who train you. From choosing your first beans to what a barista career in Bangladesh looks like."
      />
      <section className={`${styles.section} ${layout.g}`}>
        <div className={layout.in}>
          <Link className={`${styles.card} ${styles.featured}`} href="/blog/choose">
            <div className={styles.photo}>
              <Image src={PHOTO.lounge} alt="" fill sizes="100vw" />
              <span>Featured · How to choose coffee</span>
            </div>
            <div className={styles.featuredCopy}>
              <span className={`${styles.tag} ${styles.tagGold}`}>Featured guide · 6 min</span>
              <h2>How to choose coffee without knowing much</h2>
              <b style={{ color: "#ffe08a" }}>Read article →</b>
            </div>
          </Link>
          <FilterBar label="Filter guides" filters={FILTERS}>
            <div className={`${styles.grid} ${styles.g3}`}>
              {POSTS.map((post, index) => (
                <FilterItem key={post.id} value={post.c}>
                  <PostCard post={post} image={COVERS[index % COVERS.length]} />
                </FilterItem>
              ))}
            </div>
          </FilterBar>
        </div>
      </section>
      <section className={`${styles.section} ${styles.soft} ${layout.g}`}>
        <div className={`${layout.in} ${styles.grid} ${styles.g2}`}>
          <div>
            <h2 className={styles.display}>
              Barista tips, <em className="it">in your inbox</em>
            </h2>
            <p className={styles.sub}>One useful email when we publish a guide or open a batch.</p>
          </div>
          {joined ? (
            <b style={{ font: "800 28px var(--font-display)", color: "#ffe08a" }}>
              You are on the list. Thank you.
            </b>
          ) : (
            <form
              className={styles.newsletter}
              onSubmit={(event: FormEvent) => {
                event.preventDefault();
                setJoined(true);
              }}
            >
              <label htmlFor="guide-email" className="sr-only" style={{ position: "absolute", left: -9999 }}>
                Email
              </label>
              <input id="guide-email" type="email" required placeholder="Your email" />
              <button className={btn.btn} type="submit">
                <span>Sign up</span>
                <i className={btn.icon}>→</i>
              </button>
            </form>
          )}
        </div>
      </section>
    
    </PagesShell>
  );
}

/**
 * One guide card.
 *
 * @param props - Post and cover.
 * @returns Card link.
 */
function PostCard({ post, image }: { post: CatalogPost; image: string }) {
  const tone = CATEGORY_TONE[post.c] ?? "gold";
  const toneClass =
    tone === "mint" ? styles.tagMint : tone === "peach" ? styles.tagPeach : tone === "lilac" ? styles.tagLilac : styles.tagGold;
  return (
    <Link className={styles.card} href={`/blog/${post.id}`}>
      <div className={styles.photo}>
        <Image src={image} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
        <span>
          {post.c} · {post.m} read
        </span>
      </div>
      <div className={styles.cardBody}>
        <span className={`${styles.tag} ${toneClass}`}>{post.c}</span>
        <h3>{post.n}</h3>
        <p className={styles.muted}>{post.s}</p>
      </div>
    </Link>
  );
}

/**
 * Props for {@link PostView}.
 */
export type PostViewProps = { post: CatalogPost };

/**
 * Article page. The reference uses one shared body for every guide.
 *
 * @param props - Post record.
 * @returns Article.
 */
export function PostView({ post }: PostViewProps) {
  const more = POSTS.filter((item) => item.id !== post.id).slice(0, 3);

  return (
    <PagesShell>
      <PageHero
        photo={PHOTO.staff}
        titleStyle={{ fontSize: "clamp(40px, 7vw, 112px)" }}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.c },
        ]}
        title={post.n}
        extra={
          <div className={styles.actions}>
            <span className={`${styles.tag} ${styles.tagGold}`}>
              {post.c} · {post.m} read
            </span>
            <span className={styles.author}>
              <span className={`${styles.avatar} ${styles.avatarSm}`}>
                <Image src={TRAINER_IMAGE.abdullah} alt="" width={44} height={44} />
              </span>
              Abdullah Al Nahid, Brewing Specialist · October 2026
            </span>
          </div>
        }
      />
      <section className={`${styles.section} ${layout.g}`} style={{ paddingTop: 56 }}>
        <div className={layout.in}>
          <div className={`${styles.photo} ${styles.photoCover}`}>
            <Image src={PHOTO.lounge} alt="" fill sizes="100vw" />
            <span>Cover · {post.n}</span>
          </div>
          <div className={`${styles.split} ${styles.splitNarrow}`} style={{ marginTop: 56 }}>
            <article className={styles.prose}>
              <p style={{ fontSize: 24, lineHeight: 1.6 }}>
                {post.s} Here is a simple way to think about it, even if you know almost nothing.
              </p>
              <h2>Start with what you already like</h2>
              <p>
                Think about the drinks you enjoy. If you love sweet, creamy drinks, begin with milk-based coffee such as a latte or flat white. If you prefer a strong short drink, try an espresso or an americano. Your taste in familiar drinks is the best map you have.
              </p>
              <blockquote className={styles.quote}>
                &ldquo;Good coffee is not luck. It is a series of small decisions made carefully.&rdquo;
                <footer>Abdullah Al Nahid</footer>
              </blockquote>
              <h2>Understand roast level in a minute</h2>
              <div className={`${styles.grid} ${styles.g3}`} style={{ gap: 14, marginBottom: 28 }}>
                <div className={`${styles.swatch} ${styles.gold}`}>
                  <b>Light</b>
                  <p>Bright, fruity, tea-like.</p>
                </div>
                <div className={`${styles.swatch} ${styles.mint}`}>
                  <b>Medium</b>
                  <p>Balanced and sweet. The safest start.</p>
                </div>
                <div className={`${styles.swatch} ${styles.ink}`}>
                  <b>Dark</b>
                  <p>Bold and smoky. Great with milk.</p>
                </div>
              </div>
              <h2>Taste, note, adjust</h2>
              <p>
                Sip slowly and ask three questions: is it sweet, sour or bitter? Sour usually means under-extracted, bitter means over-extracted. Changing the grind a little finer or coarser fixes most problems. This habit of tasting and adjusting is exactly what we teach in class.
              </p>
            </article>
            <aside className={styles.aside}>
              <div className={styles.panel}>
                <div className={styles.author}>
                  <span className={styles.avatar}>
                    <Image src={TRAINER_IMAGE.abdullah} alt="" width={72} height={72} />
                  </span>
                  <div>
                    <b style={{ font: "800 20px var(--font-display)", textTransform: "uppercase" }}>Abdullah Al Nahid</b>
                    <div className={styles.muted}>Brewing Specialist</div>
                  </div>
                </div>
              </div>
              <div className={`${styles.panel} ${styles.forest}`}>
                <div style={{ font: "800 26px/1.1 var(--font-display)", textTransform: "uppercase" }}>
                  Taste the difference yourself
                </div>
                <p style={{ color: "#eefaf3", margin: "12px 0 20px", lineHeight: 1.6 }}>
                  Our 3‑day Barista Intermediate course takes you from curious to confident.
                </p>
                <Button href="/courses/intermediate">See the course</Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.band} ${layout.g}`}>
        <div className={layout.in}>
          <h2 className={styles.display} style={{ marginBottom: 40 }}>
            Keep <em className="it">reading</em>
          </h2>
          <div className={`${styles.grid} ${styles.g3}`}>
            {more.map((item, index) => (
              <PostCard key={item.id} post={item} image={COVERS[index % COVERS.length]} />
            ))}
          </div>
        </div>
      </section>
    
    </PagesShell>
  );
}
