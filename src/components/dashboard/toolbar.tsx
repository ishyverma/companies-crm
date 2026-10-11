"use client";

import { motion } from "motion/react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EASE_OUT } from "@/lib/motion";
import { CTL, PRESS } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { NotesIcon } from "./icons";

interface Props {
  query: string;
  onQuery: (v: string) => void;
  recentOnly: boolean;
  onToggleRecent: () => void;
  onNew: () => void;
}

export function Toolbar({ query, onQuery, recentOnly, onToggleRecent, onNew }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(-6px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={{ duration: 0.28, ease: EASE_OUT, delay: 0.09 }}
      className="flex shrink-0 items-center justify-between gap-2 border-b border-[var(--line)] px-[11px] py-2 sm:h-[var(--toolbar-h)] sm:py-0"
    >
      <div className="relative min-w-0 flex-1 sm:flex-none">
        <Search className="pointer-events-none absolute left-2 top-1/2 size-3 -translate-y-1/2 text-[var(--fg-3)]" strokeWidth={1.5} />
        <Input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search...."
          aria-label="Search companies"
          className="h-[25.5px] w-full rounded-lg border border-[var(--ring-line)] bg-[var(--surface)] py-0 pl-[22px] pr-2 text-[13px] font-[450] shadow-[0_1px_2px_rgb(0_0_0/0.05)] placeholder:text-[var(--fg-3)] focus-visible:border-[var(--brand)]/50 focus-visible:ring-[3px] focus-visible:ring-[var(--brand)]/15 sm:w-[156.5px] md:text-[13px] dark:bg-[var(--surface)]"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-pressed={recentOnly}
          aria-label="Recently contacted"
          onClick={onToggleRecent}
          className={cn(
            CTL,
            "h-[25.5px] gap-1.5 rounded-lg px-2 py-0 text-[13px] font-[450] has-[>svg]:px-2",
            recentOnly &&
              "border-[var(--brand)]/30 bg-[var(--brand-soft)] text-[var(--brand)] hover:bg-[var(--brand-soft)] dark:bg-[var(--brand-soft)] dark:hover:bg-[var(--brand-soft)]",
          )}
        >
          <NotesIcon size={12} className="text-[var(--brand)]" />
          <span className="hidden sm:inline">Recently contacted</span>
        </Button>

        <Button
          type="button"
          size="sm"
          onClick={onNew}
          className={cn(
            PRESS,
            "h-[25.5px] gap-1 rounded-lg px-2 py-0 text-[13px] font-medium shadow-[0_1px_2px_rgb(0_0_0/0.2)] has-[>svg]:px-2",
          )}
        >
          <Plus className="size-3" strokeWidth={1.75} />
          New company
        </Button>
      </div>
    </motion.div>
  );
}
