/**
 * @fileoverview Chip filter (reference course / blog / gallery chips).
 */

"use client";

import { createContext, useContext, useState, type CSSProperties, type ReactNode } from "react";

const FilterContext = createContext("All");

/**
 * Props for {@link FilterBar}.
 */
export type FilterBarProps = {
  label: string;
  filters: readonly string[];
  children: ReactNode;
  style?: CSSProperties;
};

/**
 * Chip row. Descendants use {@link FilterItem} to show or hide.
 *
 * @param props - Labels and filtered content.
 * @returns Filter controls.
 */
export function FilterBar({ label, filters, children, style }: FilterBarProps) {
  const [active, setActive] = useState(filters[0] ?? "All");

  return (
    <FilterContext.Provider value={active}>
      <div className="chips" role="group" aria-label={label} style={style}>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className="chip"
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      {children}
    </FilterContext.Provider>
  );
}

/**
 * Props for {@link FilterItem}.
 */
export type FilterItemProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

/**
 * Hides its children when the active chip does not match `value`.
 *
 * @param props - Filter value and content.
 * @returns A wrapper, or the children themselves when `className` is set.
 */
export function FilterItem({ value, children, className }: FilterItemProps) {
  const active = useContext(FilterContext);
  const hidden = active !== "All" && active !== value;
  if (className) {
    return (
      <div className={className} hidden={hidden}>
        {children}
      </div>
    );
  }
  return <div hidden={hidden}>{children}</div>;
}
