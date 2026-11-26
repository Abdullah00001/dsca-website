/**
 * @fileoverview About page (reference `pages.about`).
 */

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageCta } from "@/components/ui/page-cta";
import { FaqList } from "@/components/page/faq-list";
import { PageHero } from "@/components/page/page-hero";
import { PagesShell } from "@/components/page/pages-shell";
import styles from "@/components/page/pages.module.css";
import { ADDRESS, HOURS, PAL, PHOTO, TEL, TRAINER_IMAGE, TRAINERS, WHATSAPP } from "../lib";
import layout from "@/styles/layout.module.css";

const WHY = [
  ["Hands-on from the first day", "Every practical session uses commercial espresso machines and precision grinders. Muscle memory comes from repetition, so you start building it in your first class."],
  ["Small batches", "We keep batches small so every student gets instructor time, steady feedback and enough practice hours to improve. You will not get lost in a crowd."],
  ["Trainers who work in coffee", "Your instructors are practising coffee professionals. You learn techniques that are in use on real bars right now."],
  ["Career support after the course", "Our team helps graduates with CV guidance and referrals through our industry network. We stay invested after your last class."],
  ["A certificate that means something", "Every course ends with a DSCA completion certificate, issued by an ISO 9001:2015 certified institute."],
] as const;

const PRINCIPLES = [
  ["Real equipment", "Commercial espresso machines, precision grinders and the tools you will meet in a working café."],
  ["Real environments", "Practice happens in a purpose-built café setting, with the pace and pressure of a real service."],
  ["Real outcomes", "We teach how to make coffee and why coffee behaves the way it does, so you can adapt to any machine, any bean and any café."],
] as const;

const PROGRAMS = [
  ["Barista Intermediate", "The quickest route from coffee lover to skilled café worker. Espresso preparation, basic milk steaming and bar workflow.", "intermediate"],
  ["Barista Professional", "A full barista skill set. Espresso extraction, milk texturing, latte art basics and front-of-house operations.", "professional"],
  ["DSCA Barista Starter Pack", "The Intermediate and Professional levels in one continuous program, with no gap between them.", "starter"],
  ["Barista Advance Professional", "Our flagship. Advanced espresso, specialty brewing, complex latte art, café management basics and food safety certification, for students aiming at senior or head-barista roles.", "advance"],
  ["Food Safety Management", "A short standalone course for café and kitchen teams.", "food"],
] as const;

const FAQ = [
  ["Is DSCA an ISO certified barista training institute?", "Yes. DSCA is ISO 9001:2015 certified, which covers how we structure our curriculum, deliver our classes and track student outcomes."],
  ["Do I need experience before joining?", "No. Our Intermediate and Starter Pack courses are built for complete beginners. If you already work in a café, the Professional and Advance Professional courses will take you further."],
  ["Where is DSCA located?", "We are at House 34/A, Indira Road, Farmgate, Dhaka-1215. Students from Dhanmondi, Tejgaon, Mohammadpur and across Dhaka attend our classes."],
  ["Will I get a certificate?", "Yes. Every course ends with a DSCA completion certificate."],
  ["Do you help graduates find work?", "Yes. Our career support team offers CV guidance and referrals within our network of café employers."],
  ["How big are the classes?", "We keep batches small so every student gets individual attention from the instructor."],
  ["How do I enroll?", "Use the enrollment form on our homepage, request a free callback, or visit the academy in Farmgate."],
] as const;

const TAG = [styles.tagGold, styles.tagMint, styles.tagPeach, styles.tagGold];

/**
 * About DSCA: story, principles, team, campus, and programs.
 *
 * @returns About page.
 */
export function AboutView() {
  return (
    <PagesShell>
      <PageHero
        photo={PHOTO.hall}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title={
          <>
            About Dhaka <em className="it">Specialty</em> Coffee Academy
          </>
        }
        sub="A barista training institute in Farmgate, Dhaka, built around real equipment, small batches and a job at the end of it."
        extra={
          <>
            <p className={styles.sub}>
              DSCA exists to give Bangladeshi coffee professionals the same quality of training you would find in established specialty coffee markets. Whether you are pouring your first shot or running a café bar today, you learn on commercial machines, with working professionals, in a space that looks and runs like a real café.
            </p>
            <div className={styles.actions}>
              <Button href="/courses">Explore Barista Courses</Button>
              <Button href={WHATSAPP} variant="ghost">Request a Free Callback</Button>
            </div>
          </>
        }
        ticker={["ISO 9001:2015 Certified", "200+ Students Trained", "Small Batches, Individual Attention", "Job Placement Assistance"]}
      />
      <section className={`${styles.section} ${layout.g}`}>
        <div className={`${layout.in} ${styles.grid} ${styles.g2}`} style={{ gap: "clamp(32px, 6vw, 96px)" }}>
          <div>
            <p className={styles.eyebrow}>Our story</p>
            <h2 className={styles.display}>Why we <em className="it">built DSCA</em></h2>
          </div>
          <div className={styles.prose}>
            <p>Coffee in Bangladesh has grown from a hot drink into a profession. New cafés open across Dhaka every month, and every one of them needs people who can pull a consistent shot, steam milk properly and keep a busy bar moving.</p>
            <p>What was missing was training that matched that demand. Too many courses meant a whiteboard, a demonstration and a certificate. Zobayer Hosen founded DSCA to change that. He set out to build an academy where students spend their hours on the machines, get corrected by people who work in coffee every day, and finish with skills a café owner can see in the first week.</p>
            <p>Today DSCA trains career-entry baristas, working café staff and aspiring café owners from our Farmgate campus. The goal has not changed: make every graduate useful behind a bar from day one.</p>
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.band} ${layout.g}`}>
        <div className={layout.in}>
          <p className={styles.eyebrow}>Mission and principles</p>
          <h2 className={styles.display}>What we <em className="it">stand for</em></h2>
          <p className={styles.sub} style={{ marginBottom: 56 }}>
            To professionalise coffee in Bangladesh by training skilled, confident baristas to an international standard.
          </p>
          <div className={`${styles.grid} ${styles.g3}`}>
            {PRINCIPLES.map(([title, body], index) => (
              <div key={title} className={styles.principle}>
                <b>0{index + 1}</b>
                <strong>{title}</strong>
                <p style={{ margin: 0, lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${layout.g}`}>
        <div className={layout.in}>
          <p className={styles.eyebrow}>Why students choose DSCA</p>
          <h2 className={styles.display}>
            Why DSCA is a trusted barista training institute <em className="it">in Dhaka</em>
          </h2>
          <div className={`${styles.grid} ${styles.g3}`} style={{ marginTop: 48 }}>
            {WHY.map(([title, body], index) => (
              <div key={title} className={`${styles.panel} ${styles[PAL[index % PAL.length]]}`}>
                <div style={{ font: "800 26px/1.05 var(--font-display)", textTransform: "uppercase" }}>{title}</div>
                <p style={{ margin: "12px 0 0", lineHeight: 1.6, fontWeight: 500 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.band} ${layout.g}`}>
        <div className={`${layout.in} ${styles.grid} ${styles.g2}`} style={{ gap: "clamp(32px, 6vw, 96px)", alignItems: "center" }}>
          <div>
            <p className={styles.eyebrow}>ISO 9001:2015 certification</p>
            <h2 className={styles.display}>
              Training held to an <em className="it">international quality standard</em>
            </h2>
            <p className={styles.sub}>
              DSCA is ISO 9001:2015 certified. ISO 9001 is a quality management standard, and it applies to how we run the academy: a structured curriculum, consistent delivery from batch to batch, and results we can measure. For students, that means the course you join is planned, documented and reviewed, and it is taught to the same standard every time.
            </p>
          </div>
          <figure style={{ margin: 0, display: "grid", placeItems: "center", gap: 16 }}>
            <div className={styles.panel} style={{ width: "min(100%, 380px)" }}>
              <Image src={PHOTO.badge} alt="DSCA ISO 9001:2015 certified institute badge" width={320} height={320} style={{ width: "100%", height: "auto" }} />
            </div>
            <figcaption style={{ font: "700 13px var(--font-body)", letterSpacing: "0.16em", textTransform: "uppercase", color: "#ffe08a" }}>
              ISO 9001:2015 Certified Institute
            </figcaption>
          </figure>
        </div>
      </section>
      <section className={`${styles.section} ${layout.g}`}>
        <div className={layout.in}>
          <p className={styles.eyebrow}>Our team</p>
          <h2 className={styles.display}>Meet the people who teach and <em className="it">run DSCA</em></h2>
          <p className={styles.sub} style={{ marginBottom: 48 }}>
            DSCA is led by coffee professionals who still work in the craft. Here are the people behind the academy.
          </p>
          <div className={`${styles.grid} ${styles.g2}`} style={{ gap: 28 }}>
            {TRAINERS.map((trainer, index) => (
              <Link key={trainer.id} href={`/trainers/${trainer.id}`} className={`${styles.card} ${styles.team}`}>
                <div className={styles.photo} style={{ aspectRatio: "auto", minHeight: 300 }}>
                  <Image src={TRAINER_IMAGE[trainer.id]} alt="" fill sizes="40vw" style={{ objectPosition: "center 18%" }} />
                  <span>Portrait · {trainer.n}</span>
                </div>
                <div className={styles.cardBody}>
                  <span className={`${styles.tag} ${TAG[index]}`}>{trainer.r}</span>
                  <h3>{trainer.n}</h3>
                  <p className={styles.muted}>{trainer.b}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 44 }}>
            <Button href="/trainers" variant="line">Meet the full team</Button>
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.band} ${layout.g}`}>
        <div className={layout.in}>
          <p className={styles.eyebrow}>Facilities and location</p>
          <h2 className={styles.display}>A training café in <em className="it">Farmgate, Dhaka</em></h2>
          <p className={styles.sub} style={{ marginBottom: 44 }}>
            Our campus is set up as a working café, with commercial espresso machines, precision grinders and brewing stations for pour-over, AeroPress and V60. Students rotate through each station, so practice time is spent making drinks, not waiting for a turn.
          </p>
          <div className={`${styles.grid} ${styles.g3}`} style={{ marginBottom: 44 }}>
            {[
              [PHOTO.bar, "Hands-on practice", "Barista training bar at DSCA, Farmgate"],
              [PHOTO.hall, "Student workshops and events", "Students in a DSCA workshop"],
              [PHOTO.lounge, "Certificate handover", "DSCA lounge and certificate handover area"],
            ].map(([src, label, alt]) => (
              <div key={label} className={styles.card}>
                <div className={styles.photo}>
                  <Image src={src} alt={alt} fill sizes="33vw" />
                  <span>{label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.panel} style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}>
            <p style={{ margin: 0, lineHeight: 1.8 }}>
              <b>Dhaka Specialty Coffee Academy (DSCA)</b>
              <br />
              {ADDRESS}
              <br />
              Phone: <a href={TEL}>(+880) 1810-545545</a>
              <br />
              Hours: {HOURS}
            </p>
            <div className={styles.actions}>
              <Button href="https://maps.google.com/?q=Dhaka+Specialty+Coffee+Academy+Farmgate">Get Directions</Button>
              <Button href="/contact" variant="ghost">Visit Us for a Campus Tour</Button>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${layout.g}`}>
        <div className={layout.in}>
          <p className={styles.eyebrow}>Programs</p>
          <h2 className={styles.display}>Find the barista course that <em className="it">fits your goals</em></h2>
          <p className={styles.sub} style={{ marginBottom: 48 }}>
            Pick the level that matches where you are today. Every course includes hands-on practice, certified instruction and a DSCA completion certificate.
          </p>
          <div className={`${styles.grid} ${styles.g3}`}>
            {PROGRAMS.map(([title, body, slug], index) => (
              <Link key={slug} href={`/courses/${slug}`} className={`${styles.card} ${styles.panel} ${styles[PAL[index % PAL.length]]}`} style={{ minHeight: 230 }}>
                <div style={{ font: "800 26px/1.05 var(--font-display)", textTransform: "uppercase" }}>{title}</div>
                <p style={{ margin: "14px 0 0", lineHeight: 1.6, fontWeight: 500 }}>{body}</p>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 44 }}>
            <Button href="/courses">See Fees, Dates and Details</Button>
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.band} ${layout.g}`}>
        <div className={`${layout.in} ${styles.grid} ${styles.g2}`}>
          <div>
            <p className={styles.eyebrow}>FAQ</p>
            <h2 className={styles.display}>Questions students ask <em className="it">before they join</em></h2>
          </div>
          <FaqList items={FAQ} />
        </div>
      </section>
      <PageCta
        content={{
          eyebrow: "Next batch · 12 seats",
          titleBefore: "Ready to start your",
          titleAccent: "barista career?",
          body: "Come and see the academy, meet the trainers and pick the course that fits. Our team will walk you through the options and answer your questions.",
          cta: { label: "Enroll Now", href: "/contact" },
        }}
      />
    
    </PagesShell>
  );
}
