"use client";

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { CTL } from "@/lib/ui";
import { FORCE_MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";

// false on the server and during hydration, true afterwards: avoids the icon mismatch
const subscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(subscribe, () => true, () => false);

// contextual icon swap: scale .25→1, opacity 0→1, blur 4px→0, spring with bounce 0
const swap = {
  initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
};
const spring = { type: "spring", duration: 0.3, bounce: 0 } as const;

type VT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

export function ThemeToggle() {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  function toggle() {
    const next = isDark ? "light" : "dark";
    const apply = () => flushSync(() => setTheme(next));

    const doc = document as VT;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches && !FORCE_MOTION;
    if (!doc.startViewTransition || reduce) {
      apply();
      return;
    }

    const transition = doc.startViewTransition(apply);
    transition.ready
      .then(() => {
        const toDark = next === "dark";
        document.documentElement.animate(
          {
            // light → dark wipes left to right, dark → light wipes right to left
            clipPath: toDark
              ? ["inset(0 100% 0 0)", "inset(0 0 0 0)"]
              : ["inset(0 0 0 100%)", "inset(0 0 0 0)"],
          },
          {
            duration: 450,
            easing: "cubic-bezier(0.77, 0, 0.175, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={toggle}
      className={cn(CTL, "size-6 rounded-lg text-[var(--fg-2)] hover:text-[var(--fg)]")}
    >
      <span className="relative grid size-3.5 place-items-center">
        {mounted && (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={isDark ? "moon" : "sun"} {...swap} transition={spring} className="grid place-items-center">
              {isDark ? <Moon className="size-3.5" strokeWidth={1.5} /> : <Sun className="size-3.5" strokeWidth={1.5} />}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </Button>
  );
}
