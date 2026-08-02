import type { ReactNode } from "react";

/**
 * Layout wrapper for section blocks. The reference favours restrained motion,
 * so this is a plain server component (no client JS, no dependencies): the
 * grid/flow classNames are preserved and any entrance treatment is handled by
 * CSS, which also honours prefers-reduced-motion.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`.trim()}>{children}</div>;
}
