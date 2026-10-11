"use client";

import { cn } from "@/lib/utils";

interface Props {
  checked: boolean | "indeterminate";
  onChange: () => void;
  label: string;
}

export function Check({ checked, onChange, label }: Props) {
  const on = checked !== false;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked === "indeterminate" ? "mixed" : checked}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={cn(
        "relative grid size-3 shrink-0 place-items-center rounded-[3.5px] outline-none",
        "transition-[background-color,box-shadow] duration-150 ease-out",
        "before:absolute before:-inset-2 before:content-['']",
        "focus-visible:shadow-[0_0_0_2px_var(--brand)]",
        on
          ? "bg-[var(--brand)] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)]"
          : "bg-[var(--surface)] shadow-[0_0_0_1px_var(--ring-line),0_1px_1.5px_rgb(0_0_0/0.05)] hover:shadow-[0_0_0_1px_var(--fg-4),0_1px_1.5px_rgb(0_0_0/0.05)]",
      )}
    >
      <svg viewBox="0 0 12 12" className="size-full" fill="none" aria-hidden="true">
        {checked === "indeterminate" ? (
          <path d="M3.25 6h5.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        ) : (
          <path
            d="M3.1 6.35 5.1 8.3 8.9 3.9"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: on ? 0 : 1,
              transition: "stroke-dashoffset 160ms var(--ease-out)",
            }}
          />
        )}
      </svg>
    </button>
  );
}
