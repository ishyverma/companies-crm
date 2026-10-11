"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ListTree, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";
import { BoltIcon, BuildingIcon, MailIcon, NotesIcon, UserIcon } from "./icons";
import { SidebarToggle } from "./sidebar-toggle";

const WIDTH = 207;

type Item = { id: string; label: string; icon?: React.ReactNode; emoji?: string };

const GENERAL: Item[] = [
  { id: "activity", label: "Activity", icon: <BoltIcon /> },
  { id: "tasks", label: "Tasks", icon: <ListTree className="size-3" strokeWidth={1.5} /> },
  { id: "notes", label: "Notes", icon: <NotesIcon /> },
  { id: "email", label: "Email", icon: <MailIcon /> },
];
const RECORDS: Item[] = [
  { id: "companies", label: "Companies", icon: <BuildingIcon /> },
  { id: "people", label: "People", icon: <UserIcon /> },
];
const COLLECTIONS: Item[] = [
  { id: "partnership", label: "Partnership", emoji: "🚀" },
  { id: "sales-pipeline", label: "Sales Pipeline", emoji: "💼" },
  { id: "integrations", label: "Integrations", emoji: "🧩" },
  { id: "customer-accounts", label: "Customer Accounts", emoji: "🌟" },
  { id: "add-workspace", label: "Add Workspace", icon: <Plus className="size-3" strokeWidth={1.5} /> },
];

/** One-time staged intro: items slide in ~30ms apart. Skipped when `intro` is false. */
function Stagger({ i, intro, children }: { i: number; intro: boolean; children: React.ReactNode }) {
  if (!intro) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateX(-6px)" }}
      animate={{ opacity: 1, transform: "translateX(0px)" }}
      transition={{ duration: 0.26, ease: EASE_OUT, delay: 0.06 + i * 0.03 }}
    >
      {children}
    </motion.div>
  );
}

function NavItem({ item, active, onSelect }: { item: Item; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex h-6 w-full items-center gap-1 pl-3.5 pr-3 text-left text-[13px] transition-colors duration-100 ease-out",
        active
          ? "bg-[var(--cell-active)] font-semibold text-[var(--fg)] before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:bg-[var(--brand)]"
          : "text-[var(--fg-2)] hover:bg-[var(--hover-soft)] hover:text-[var(--fg)]",
      )}
    >
      <span className={cn("grid size-4 shrink-0 place-items-center", active ? "text-[var(--brand)]" : "text-[var(--fg-4)]")}>
        {item.icon ?? <span className="emoji" aria-hidden="true">{item.emoji}</span>}
      </span>
      {/* leading-4 keeps descenders (g, p, y) from being clipped by truncate */}
      <span className="truncate leading-4">{item.label}</span>
    </button>
  );
}

function Section({ label, last, children }: { label: string; last?: boolean; children: React.ReactNode }) {
  return (
    <div className={cn("py-3", !last && "border-b border-[var(--line)]")}>
      <div className="mb-1 h-4 px-4 text-[10px] font-[450] uppercase leading-4 tracking-[0.03em] text-[var(--fg-4)]">{label}</div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function SidebarBody({ onToggle, intro }: { onToggle: () => void; intro: boolean }) {
  const [activeId, setActiveId] = useState("companies");
  const render = (items: Item[], offset: number) =>
    items.map((item, n) => (
      <Stagger key={item.id} i={offset + n} intro={intro}>
        <NavItem item={item} active={activeId === item.id} onSelect={() => setActiveId(item.id)} />
      </Stagger>
    ));

  return (
    <div style={{ width: WIDTH }}>
      <div className="flex h-[var(--bar-h)] items-center justify-between border-b border-[var(--line)] pl-2 pr-[9px]">
        <button type="button" className="flex items-center gap-2 rounded-md text-[13px] font-medium">
          <span className="size-6 rounded-full bg-gradient-to-br from-[#5b94ff] to-[#2f7df6]" />
          Acme
        </button>
        <SidebarToggle onClick={onToggle} label="Collapse sidebar" />
      </div>
      <nav>
        <Section label="General">{render(GENERAL, 0)}</Section>
        <Section label="Records">{render(RECORDS, GENERAL.length)}</Section>
        <Section label="Collections" last>{render(COLLECTIONS, GENERAL.length + RECORDS.length)}</Section>
      </nav>
    </div>
  );
}

export function Sidebar({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: open ? WIDTH : 0 }}
      transition={{ duration: 0.22, ease: EASE_OUT }}
      className="shrink-0 overflow-hidden border-[var(--line)] bg-[var(--sidebar-bg)]"
      style={{ borderRightWidth: open ? 1 : 0 }}
      aria-hidden={!open}
    >
      <SidebarBody onToggle={onToggle} intro />
    </motion.aside>
  );
}

export function MobileSidebar({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="gap-0 border-[var(--line)] bg-[var(--sidebar-bg)] p-0 [&>button]:hidden"
        style={{ width: WIDTH, maxWidth: WIDTH }}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Sidebar navigation</SheetDescription>
        </SheetHeader>
        {/* the sheet already slides in; no per-item intro here */}
        <SidebarBody onToggle={() => onOpenChange(false)} intro={false} />
      </SheetContent>
    </Sheet>
  );
}
