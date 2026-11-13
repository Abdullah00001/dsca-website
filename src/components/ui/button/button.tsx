import type { ComponentPropsWithRef, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./button.module.css";

export type ButtonVariant = "primary" | "ghost" | "line" | "dark";
export type ButtonSize = "sm" | "md";

export type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: boolean;
  children: ReactNode;
  className?: string;
};

export type ButtonAsButtonProps = BaseButtonProps &
  ComponentPropsWithRef<"button"> & {
    href?: undefined;
  };

export type ButtonAsLinkProps = BaseButtonProps &
  ComponentPropsWithRef<typeof Link> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button({
  variant = "primary",
  size = "md",
  icon = true,
  children,
  className,
  ...props
}: ButtonProps) {
  const combinedClasses = clsx(
    styles.btn,
    styles[variant],
    styles[size],
    className
  );

  const iconElement = icon ? (
    <span className={styles.icon} aria-hidden="true">
      →
    </span>
  ) : null;

  if ("href" in props && typeof props.href === "string") {
    const { href, ...linkProps } = props as ButtonAsLinkProps;
    return (
      <Link href={href} className={combinedClasses} {...linkProps}>
        <span>{children}</span>
        {iconElement}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButtonProps;
  return (
    <button
      type={buttonProps.type || "button"}
      className={combinedClasses}
      {...buttonProps}
    >
      <span>{children}</span>
      {iconElement}
    </button>
  );
}

