"use client";

import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import styles from "./footer.module.css";

const QUICK_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About Us" },
  { href: "/trainers", label: "Trainers" },
  { href: "/blog", label: "Blog" },
  { href: "/certificate", label: "Verify certificate" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

const AREA_LINKS = [
  { href: "/locations/farmgate", label: "Farmgate" },
  { href: "/locations/indira-road", label: "Indira Road" },
  { href: "/locations/karwan-bazar", label: "Karwan Bazar" },
  { href: "/locations/dhanmondi", label: "Dhanmondi" },
  { href: "/locations/rajabazar", label: "Rajabazar" },
  { href: "/locations/green-road", label: "Green Road" },
  { href: "/locations/shahbag", label: "Shahbag" },
  { href: "/locations/tejgaon", label: "Tejgaon" },
  { href: "/locations/bijoy-sarani", label: "Bijoy Sarani" },
  { href: "/locations/agargaon", label: "Agargaon" },
  { href: "/locations/hatirjheel", label: "Hatirjheel" },
];

export function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Footer CTA */}
        <div className={styles.cta}>
          <div>
            <Eyebrow style={{ color: "#fff" }}>Next batch · 12 seats</Eyebrow>
            <h2 className={styles.ctaTitle}>
              Ready to Start Your Barista Career <em>in Dhaka?</em>
            </h2>
            <p className={styles.ctaText}>
              Join the next DSCA batch. Seats are capped at 12 students, and our
              team will help you pick the right course. Message us today and get a
              reply on WhatsApp.
            </p>
          </div>
          <div className={styles.ctaButtons}>
            <Button href="/contact">Enrol in the Next Batch</Button>
            <Button
              href="https://wa.me/8801810545545"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
            >
              Chat on WhatsApp
            </Button>
            <Button href="tel:+8801810545545" variant="ghost">
              Call 01810-545545
            </Button>
          </div>
        </div>

        {/* 4-column Grid */}
        <div className={styles.grid}>
          <div className={styles.brand}>
            <span className={styles.logopill}>
              <Image
                src="/assets/logo.svg"
                alt="Dhaka Specialty Coffee Academy"
                width={160}
                height={40}
              />
            </span>
            <p>
              ISO 9001:2015 certified barista training institute in Dhaka. Real
              machines, small batches, job-ready skills.
            </p>
            <div className={styles.social}>
              <a
                href="https://www.facebook.com/dhakaspecialitycoffeeacademy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/dhakaspecialitycoffeeccademy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@DhakaSpecialityCoffeeAcademy"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
              <a
                href="https://www.tiktok.com/@dhakaspecialitycoffee"
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok
              </a>
            </div>
          </div>

          <div className={styles.linksList}>
            <h4 className={styles.sectionHeading}>Quick Links</h4>
            {QUICK_LINKS.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className={styles.areasGrid}>
            <h4 className={styles.sectionHeading}>Barista Courses by Area</h4>
            {AREA_LINKS.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className={styles.sectionHeading}>Visit DSCA</h4>
            <p>
              House 34/A, Indira Road, Farmgate (Kazi &amp; Chitra Square, Lift-5,
              next to Kutubbag Darbar Sharif), Dhaka-1215
            </p>
            <span className={styles.chipInfo}>Sat to Fri · 9am to 9pm</span>
            <a
              className={`${styles.chipInfo} ${styles.chipInfoLink}`}
              href="tel:+8801810545545"
            >
              (+880) 1810-545545
            </a>
          </div>
        </div>

        {/* Big Watermark */}
        <div className={styles.watermark} aria-hidden="true">
          DSCA
        </div>

        {/* Bottom Bar */}
        <div className={styles.bar}>
          <div>
            © {new Date().getFullYear()} Dhaka Specialty Coffee Academy. All
            rights reserved.
          </div>
          <div className={styles.barLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className={styles.toTop}
            aria-label="Scroll to top of page"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}

