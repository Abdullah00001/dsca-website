import clsx from "clsx";
import styles from "./ticker.module.css";

export type TickerVariant = "header" | "ribbon";

export type TickerProps = {
  items: string[];
  variant?: TickerVariant;
  reverse?: boolean;
  className?: string;
};

export function Ticker({
  items,
  variant = "header",
  reverse = false,
  className,
}: TickerProps) {
  // Duplicate array so it loops seamlessly
  const content = [...items, ...items, ...items, ...items];

  return (
    <div
      className={clsx(
        variant === "header" ? styles.ticker : styles.mq,
        className
      )}
      aria-hidden="true"
    >
      <div className={clsx(styles.track, reverse && styles.reverse)}>
        {content.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <span className={styles.star}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

