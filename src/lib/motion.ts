export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

export const FORCE_MOTION = process.env.NEXT_PUBLIC_FORCE_MOTION === "1";

/** Contextual icon swap: scale .25→1, opacity 0→1, blur 4px→0, spring with bounce 0. */
export const ICON_SWAP = {
  initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
} as const;
export const ICON_SPRING = { type: "spring", duration: 0.3, bounce: 0 } as const;
