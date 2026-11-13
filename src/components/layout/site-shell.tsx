"use client";

import { useState, type ReactNode } from "react";
import { Navbar } from "./navbar";
import { MobileMenu } from "./mobile-menu";
import { Footer } from "./footer";
import { CursorPeek } from "./cursor-peek";

export type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Navbar
        menuOpen={mobileMenuOpen}
        onMenuToggle={() => setMobileMenuOpen((prev) => !prev)}
      />
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <main id="app" className="flex-1">
        {children}
      </main>
      <CursorPeek />
      <Footer />
    </>
  );
}

