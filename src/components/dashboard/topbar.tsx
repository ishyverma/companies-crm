"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { BuildingIcon } from "./icons";
import { SidebarToggle } from "./sidebar-toggle";
import { ThemeToggle } from "./theme-toggle";

export function Topbar({ showToggle, onToggle }: { showToggle: boolean; onToggle: () => void }) {
  return (
    <motion.header
      initial={{ opacity: 0, transform: "translateY(-6px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={{ duration: 0.28, ease: EASE_OUT, delay: 0.04 }}
      className="flex h-[var(--bar-h)] shrink-0 items-center justify-between gap-2 border-b border-[var(--line)] px-3"
    >
      <div className="flex min-w-0 items-center gap-[7px]">
        {showToggle && (
          <div className="mr-1">
            <SidebarToggle onClick={onToggle} label="Open sidebar" />
          </div>
        )}
        <span className="text-[13px] text-[var(--fg-3)]">Records</span>
        <ChevronRight className="size-3 text-[var(--fg-4)]" strokeWidth={1.5} />
        <span className="flex h-6 items-center gap-[4.5px] rounded-[7px] bg-[var(--tag-bg)] pl-1.5 pr-2 text-[13px] font-medium">
          <span className="grid size-3 place-items-center text-[var(--brand)]"><BuildingIcon /></span>
          Companies
        </span>
      </div>
      <ThemeToggle />
    </motion.header>
  );
}
