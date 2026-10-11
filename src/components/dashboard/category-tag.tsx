import { Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

const VAR: Record<Category, string> = {
  Productivity: "var(--tag-productivity)",
  Collaboration: "var(--tag-collaboration)",
  B2B: "var(--tag-b2b)",
  SaaS: "var(--tag-saas)",
  Software: "var(--tag-software)",
};

export function CategoryTag({ value, onActive }: { value: Category; onActive?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-[17px] items-center gap-[4.5px] rounded-[4.5px] px-1.5 text-xs font-medium leading-none",
        onActive ? "bg-[var(--tag-bg-active)]" : "bg-[var(--tag-bg)]",
      )}
      style={{ color: VAR[value] }}
    >
      <Hash className="size-2.5" strokeWidth={2} aria-hidden="true" />
      {value}
    </span>
  );
}
