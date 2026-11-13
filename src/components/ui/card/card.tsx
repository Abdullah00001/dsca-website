import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./card.module.css";

export type BaseCardProps = {
  interactive?: boolean;
  padded?: boolean;
  className?: string;
  children: ReactNode;
};

export type CardAsDivProps = BaseCardProps &
  ComponentPropsWithoutRef<"div"> & {
    href?: undefined;
  };

export type CardAsLinkProps = BaseCardProps &
  ComponentPropsWithoutRef<typeof Link> & {
    href: string;
  };

export type CardProps = CardAsDivProps | CardAsLinkProps;

export function Card({
  interactive = true,
  padded = false,
  className,
  children,
  ...props
}: CardProps) {
  const combinedClasses = clsx(
    styles.card,
    interactive && styles.interactive,
    padded && styles.padded,
    className
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, ...linkProps } = props as CardAsLinkProps;
    return (
      <Link href={href} className={combinedClasses} {...linkProps}>
        {children}
      </Link>
    );
  }

  const divProps = props as CardAsDivProps;
  return (
    <div className={combinedClasses} {...divProps}>
      {children}
    </div>
  );
}

export function CardPhoto({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={clsx(styles.photo, className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={clsx(styles.content, className)} {...props}>
      {children}
    </div>
  );
}

