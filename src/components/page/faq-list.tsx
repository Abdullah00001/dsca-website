/**
 * @fileoverview Reference FAQ accordion (`faq()`).
 */

/**
 * Props for {@link FaqList}.
 */
export type FaqListProps = {
  items: readonly (readonly [string, string])[];
};

/**
 * Native details accordion matching the reference FAQ.
 *
 * @param props - Question and answer pairs.
 * @returns FAQ list.
 */
export function FaqList({ items }: FaqListProps) {
  return (
    <div className="faq">
      {items.map(([question, answer], index) => (
        <details key={question} open={index === 0}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
