import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import styles from "./badge.module.css";

/* --- Tag --- */
export type TagVariant = "mint" | "gold" | "coral" | "forest" | "ghost";

export type TagProps = ComponentPropsWithoutRef<"span"> & {
  variant?: TagVariant;
  children: ReactNode;
};

export function Tag({
  variant = "mint",
  className,
  children,
  ...props
}: TagProps) {
  const variantClass =
    variant === "mint"
      ? styles.tagMint
      : variant === "gold"
      ? styles.tagGold
      : variant === "coral"
      ? styles.tagCoral
      : variant === "forest"
      ? styles.tagForest
      : styles.tagGhost;

  return (
    <span className={clsx(styles.tag, variantClass, className)} {...props}>
      {children}
    </span>
  );
}

/* --- Eyebrow --- */
export type EyebrowProps = ComponentPropsWithoutRef<"p"> & {
  as?: "p" | "span" | "h2" | "h3" | "div";
  children: ReactNode;
};

export function Eyebrow({
  as: Component = "p",
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <Component className={clsx(styles.eyebrow, className)} {...props}>
      {children}
    </Component>
  );
}

/* --- Chip --- */
export type ChipProps = ComponentPropsWithoutRef<"button"> & {
  active?: boolean;
  children: ReactNode;
};

export function Chip({
  active = false,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={clsx(
        styles.chip,
        active && styles.chipActive,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

