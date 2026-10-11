"use client";
import { useState } from "react";

export function CompanyLogo({ domain, name, size = 12 }: { domain: string; name: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <span
        className="grid shrink-0 place-items-center rounded-[3px] bg-[var(--tag-bg)] text-[8px] font-semibold text-[var(--fg-2)]"
        style={{ width: size, height: size }}
      >
        {name[0]}
      </span>
    );
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt=""
      width={size}
      height={size}
      // light tile behind dark marks (Notion, Zendesk) so they stay visible in dark mode
      className="shrink-0 rounded-[3px] dark:bg-white dark:p-px"
      onError={() => setFailed(true)}
    />
  );
}
