import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./photo-hero.module.css";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type PhotoHeroVariant = "forest" | "dark" | "coral";

export type PhotoHeroProps = {
  breadcrumbs?: BreadcrumbItem[];
  title: ReactNode;
  subtitle?: ReactNode;
  variant?: PhotoHeroVariant;
  children?: ReactNode;
  className?: string;
};

export function PhotoHero({
  breadcrumbs,
  title,
  subtitle,
  variant = "forest",
  children,
  className,
}: PhotoHeroProps) {
  const variantClass =
    variant === "coral"
      ? styles.heroCoral
      : variant === "dark"
      ? styles.heroDark
      : styles.heroForest;

  return (
    <header className={clsx(styles.hero, variantClass, className)}>
      <div className={styles.inner}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumbs">
            <ol className={styles.crumbs}>
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center">
                    {crumb.href && !isLast ? (
                      <Link href={crumb.href}>{crumb.label}</Link>
                    ) : (
                      <span aria-current={isLast ? "page" : undefined}>
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && (
                      <span className={styles.crumbSeparator} aria-hidden="true">
                        /
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <h1 className={styles.title}>{title}</h1>

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {children}
      </div>
    </header>
  );
}

