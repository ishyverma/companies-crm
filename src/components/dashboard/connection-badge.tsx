import type { Connection } from "@/lib/types";
import { BoltIcon, DatabaseIcon, PillsIcon, WeakIcon } from "./icons";

export const CONNECTION_META: Record<Connection, { label: string; color: string }> = {
  "very-strong": { label: "Very strong", color: "#3fa564" },
  strong: { label: "Strong", color: "#4b8df2" },
  good: { label: "Good", color: "#ebb344" },
  weak: { label: "Weak", color: "#e0356b" },
};

export function ConnectionIcon({ value }: { value: Connection }) {
  const style = { color: CONNECTION_META[value].color };
  const icon =
    value === "very-strong" ? <BoltIcon /> :
    value === "strong" ? <DatabaseIcon /> :
    value === "good" ? <PillsIcon /> : <WeakIcon />;
  return <span className="grid size-3 shrink-0 place-items-center" style={style}>{icon}</span>;
}

export function ConnectionBadge({ value }: { value: Connection }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1 text-[13px] text-[var(--fg)]">
      <ConnectionIcon value={value} />
      <span className="truncate pl-0.5">{CONNECTION_META[value].label}</span>
    </span>
  );
}
