/**
 * @fileoverview Root site chrome shell owning header + mobile menu state.
 * @module components/layout/site-shell
 */

"use client";

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { MobileMenu } from "@/components/layout/mobile-menu";

/**
 * Props for {@link SiteShell}.
 */
export interface SiteShellProps {
  /** Page content rendered beneath the fixed header. */
  children: ReactNode;
}

/**
 * Application chrome wrapper: fixed header, mobile menu, and page children.
 *
 * Owns menu open state, Escape-to-close, route-change close, and body scroll lock.
 *
 * @param props - Children to render inside the shell.
 * @returns Header + mobile menu + main content region.
 */
export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  const onPathnameChange = useEffectEvent(() => {
    setMenuOpen(false);
  });

  useEffect(() => {
    onPathnameChange();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    /**
     * Closes the menu when the user presses Escape.
     *
     * @param event - Keyboard event from the document.
     */
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onMenuToggle={toggleMenu}
        onNavigate={closeMenu}
      />
      <MobileMenu open={menuOpen} onNavigate={closeMenu} />
      <div id="dsca-main">{children}</div>
    </>
  );
}
