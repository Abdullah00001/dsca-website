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
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MagneticButtons } from "@/components/layout/magnetic-buttons";
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

    /**
     * True when the event target is inside the open mobile menu.
     *
     * @param target - Event target node.
     */
    function isInsideMenu(target: EventTarget | null): boolean {
      return target instanceof Element && !!target.closest("#dsca-mobile-menu");
    }

    /**
     * Blocks background scroll without toggling the scrollbar
     * (scrollbar toggle is what was jerking the layout).
     *
     * @param event - Wheel or touch move on the document.
     */
    function preventScroll(event: Event): void {
      if (isInsideMenu(event.target)) {
        return;
      }
      event.preventDefault();
    }

    /**
     * Blocks keyboard scrolling of the page behind the menu.
     *
     * @param event - Keyboard event from the document.
     */
    function preventKeyScroll(event: KeyboardEvent): void {
      if (isInsideMenu(event.target)) {
        return;
      }
      const block = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];
      if (block.includes(event.key)) {
        event.preventDefault();
      }
    }

    document.documentElement.classList.add("menu-open");
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", preventKeyScroll, { passive: false });
    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.documentElement.classList.remove("menu-open");
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", preventKeyScroll);
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [menuOpen]);

  return (
    <>
      <MagneticButtons enabled={!menuOpen} />
      <Header
        menuOpen={menuOpen}
        onMenuToggle={toggleMenu}
        onNavigate={closeMenu}
      />
      <MobileMenu open={menuOpen} onNavigate={closeMenu} />
      <div id="dsca-main">{children}</div>
      <Footer />
    </>
  );
}
