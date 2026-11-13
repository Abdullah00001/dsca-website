"use client";

import { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./mobile-menu.module.css";

export type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/locations", label: "Locations" },
  { href: "/trainers", label: "Trainers" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/certificate", label: "Certificate" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        onClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      className={clsx(styles.menu, open && styles.open)}
      aria-hidden={!open}
      role="dialog"
      aria-label="Navigation Menu"
    >
      <div className={styles.grid}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.link}
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <small className={styles.info}>
        House 34/A, Indira Road, Farmgate, Dhaka · Open Sat to Fri, 9am to 9pm ·
        (+880) 1810-545545
      </small>
    </div>
  );
}

