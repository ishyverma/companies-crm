"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT, ICON_SPRING, ICON_SWAP } from "@/lib/motion";
import { formatDate } from "@/lib/format";
import type { Company, SortKey, SortState } from "@/lib/types";
import { CompanyLogo } from "./company-logo";
import { ConnectionBadge } from "./connection-badge";
import { CategoryTag } from "./category-tag";
import { Check } from "./check";
import { BoltIcon, BuildingIcon, CalendarIcon, GlobeIcon, TagIcon } from "./icons";

const COLUMNS: { key: SortKey; label: string; icon: React.ReactNode; width: number }[] = [
  { key: "name", label: "Company", icon: <BuildingIcon />, width: 112 },
  { key: "connection", label: "Connection", icon: <BoltIcon />, width: 112 },
  { key: "interaction", label: "Interaction", icon: <CalendarIcon />, width: 112 },
  { key: "domain", label: "Domain", icon: <GlobeIcon />, width: 127 },
  { key: "category", label: "Categories", icon: <TagIcon />, width: 116 },
];

interface Props {
  rows: Company[];
  query: string;
  selected: Set<string>;
  activeId: string | null;
  enterId: string | null;
  /** true only during the first second after page load: rows fade up in a short stagger */
  intro: boolean;
  sort: SortState | null;
  allSelected: boolean;
  someSelected: boolean;
  onSort: (key: SortKey) => void;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onActivate: (id: string) => void;
}

export function CompaniesTable({
  rows, query, selected, activeId, enterId, intro, sort, allSelected, someSelected,
  onSort, onToggle, onToggleAll, onActivate,
}: Props) {
  const bodyRef = useRef<HTMLTableSectionElement>(null);

  // Arrow keys only move focus (instant, no animation); Enter opens the drawer.
  function onKeyDown(e: React.KeyboardEvent<HTMLTableSectionElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const rowEls = Array.from(bodyRef.current?.querySelectorAll<HTMLElement>("[data-row-id]") ?? []);
    const i = rowEls.findIndex((el) => el === document.activeElement);
    const next = rowEls[Math.min(rowEls.length - 1, Math.max(0, i + (e.key === "ArrowDown" ? 1 : -1)))];
    next?.focus();
  }

  const th = "sticky top-0 z-10 h-[var(--thead-h)] bg-[var(--cell-head)] px-0 text-left text-[13px] font-[450] text-[var(--fg-4)]";

  return (
    // the table background shows through the 1px gaps between cells
    <table className="w-full min-w-[622px] table-fixed border-separate border-spacing-[1px] bg-[var(--table-gap)]">
      <colgroup>
        <col style={{ width: 36 }} />
        {COLUMNS.map((c) => <col key={c.key} style={{ width: c.width }} />)}
      </colgroup>

      <thead>
        <tr>
          <th className={th}>
            <div className="grid place-items-center">
              <Check
                label="Select all"
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onChange={onToggleAll}
              />
            </div>
          </th>
          {COLUMNS.map(({ key, label, icon }) => {
            const isSorted = sort?.key === key;
            return (
              <th key={key} className={th} aria-sort={sort && isSorted ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
                <button
                  type="button"
                  onClick={() => onSort(key)}
                  className="flex h-full w-full min-w-0 items-center gap-1 pl-2.5 pr-2 text-left transition-colors duration-100 hover:text-[var(--fg)]"
                >
                  <span className="grid size-3 shrink-0 place-items-center text-[var(--icon-muted)]">{icon}</span>
                  <span className="truncate pl-0.5">{label}</span>
                  <AnimatePresence mode="popLayout" initial={false}>
                    {sort && isSorted && (
                      <motion.span
                        key={sort.dir}
                        {...ICON_SWAP}
                        transition={ICON_SPRING}
                        className="grid shrink-0 place-items-center"
                      >
                        {sort.dir === "asc" ? (
                          <ArrowUp className="size-3" strokeWidth={1.5} />
                        ) : (
                          <ArrowDown className="size-3" strokeWidth={1.5} />
                        )}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody ref={bodyRef} onKeyDown={onKeyDown}>
        {rows.length === 0 && (
          <tr>
            <td colSpan={6} className="h-24 bg-[var(--cell)] text-center text-[13px] text-[var(--fg-3)]">
              {query ? `No companies match “${query}”` : "No companies to show"}
            </td>
          </tr>
        )}
        {rows.map((r, i) => {
          const isActive = r.id === activeId;
          const isSelected = selected.has(r.id);
          const highlighted = isActive || isSelected;
          const isNew = r.id === enterId;
          const td = cn(
            "h-[var(--row-h)] overflow-hidden px-0 align-middle transition-colors duration-100",
            highlighted ? "bg-[var(--cell-active)]" : "bg-[var(--cell)] group-hover/row:bg-[var(--cell-hover)]",
            isNew && "row-flash",
          );
          const pad = "pl-2.5 pr-2";

          return (
            <motion.tr
              key={r.id}
              data-row-id={r.id}
              tabIndex={0}
              aria-selected={isActive}
              onClick={() => onActivate(r.id)}
              onKeyDown={(e) => {
                if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onActivate(r.id);
                }
              }}
              // a new row slides in; the first paint staggers; later mounts (filtering) never animate
              initial={
                isNew
                  ? { opacity: 0, transform: "translateY(-6px)" }
                  : intro
                    ? { opacity: 0, transform: "translateY(6px)" }
                    : false
              }
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{
                duration: 0.24,
                ease: EASE_OUT,
                delay: !isNew && intro ? 0.15 + Math.min(i, 12) * 0.03 : 0,
              }}
              className="group/row cursor-default outline-none focus-visible:[&>td]:bg-[var(--cell-active)]"
            >
              <td className={td}>
                <div className="grid place-items-center">
                  <Check label={`Select ${r.name}`} checked={isSelected} onChange={() => onToggle(r.id)} />
                </div>
              </td>
              <td className={td}>
                <div className={cn("flex min-w-0 items-center gap-1", pad)}>
                  <CompanyLogo domain={r.logoDomain} name={r.name} />
                  <span className="truncate pl-0.5 text-[13px] text-[var(--fg)]">{r.name}</span>
                </div>
              </td>
              <td className={td}><div className={pad}><ConnectionBadge value={r.connection} /></div></td>
              <td className={td}>
                <div className={cn(pad, "pl-[11px]")}>
                  {r.interaction ? (
                    <span className="text-[13px] text-[var(--fg)]">{formatDate(r.interaction)}</span>
                  ) : (
                    <span className="text-[13px] text-[var(--fg-4)]">No contact</span>
                  )}
                </div>
              </td>
              <td className={td}>
                <div className={pad}>
                  <a
                    href={`https://${r.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex max-w-full items-center gap-1 text-[13px] text-[var(--fg)]"
                  >
                    <Link2 className="size-3 shrink-0 text-[var(--brand)]" strokeWidth={1.5} />
                    <span className="truncate pl-0.5 underline decoration-[var(--fg)]/70 underline-offset-[2.5px]">{r.domain}</span>
                  </a>
                </div>
              </td>
              <td className={td}>
                <div className="pl-2.5 pr-2"><CategoryTag value={r.category} onActive={highlighted} /></div>
              </td>
            </motion.tr>
          );
        })}
      </tbody>
    </table>
  );
}
