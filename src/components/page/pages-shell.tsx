/**
 * @fileoverview Wrapper that loads reference page CSS under `.dsca-pages`.
 */

import type { ReactNode } from "react";
import "./styles/dsca-pages.css";

/**
 * Props for {@link PagesShell}.
 */
export type PagesShellProps = {
  children: ReactNode;
};

/**
 * Scopes reference page classes for fidelity to the static site.
 *
 * @param props - Page content.
 * @returns Scoped page root.
 */
export function PagesShell({ children }: PagesShellProps) {
  return <div className="dsca-pages">{children}</div>;
}
