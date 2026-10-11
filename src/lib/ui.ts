/** Press feedback (0.96) with explicit transition properties (never `all`). */
export const PRESS =
  "transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-out active:scale-[0.96]";

/** Bordered control with a soft shadow, light + dark. */
export const CTL = `${PRESS} border border-[var(--ring-line)] bg-[var(--surface)] shadow-[0_1px_2px_rgb(0_0_0/0.05)] hover:bg-[var(--hover-strong)] dark:border-[var(--ring-line)] dark:bg-[var(--surface)] dark:hover:bg-[var(--hover-strong)]`;
