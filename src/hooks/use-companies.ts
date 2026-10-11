"use client";

import { useCallback, useMemo, useState } from "react";
import { CONNECTION_RANK, type Company, type SortKey, type SortState } from "@/lib/types";

function compare(a: Company, b: Company, key: SortKey) {
  if (key === "connection") return CONNECTION_RANK[a.connection] - CONNECTION_RANK[b.connection];
  if (key === "interaction") return (a.interaction ?? "").localeCompare(b.interaction ?? "");
  return a[key].localeCompare(b[key]);
}

export function useCompanies(data: Company[]) {
  const [query, setQuery] = useState("");
  const [recentOnly, setRecentOnly] = useState(false);
  const [sort, setSort] = useState<SortState | null>(null);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [activeId, setActiveId] = useState<string | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = data.filter(
      (r) => !q || r.name.toLowerCase().includes(q) || r.domain.toLowerCase().includes(q) || r.category.toLowerCase().includes(q),
    );
    if (recentOnly) list = list.filter((r) => r.interaction);
    list = [...list];

    if (sort) {
      list.sort((x, y) => {
        if (sort.key === "interaction") {
          if (!x.interaction && !y.interaction) return 0;
          if (!x.interaction) return 1;
          if (!y.interaction) return -1;
        }
        const r = compare(x, y, sort.key);
        return sort.dir === "asc" ? r : -r;
      });
    } else if (recentOnly) {
      list.sort((x, y) => (y.interaction ?? "").localeCompare(x.interaction ?? ""));
    }
    return list;
  }, [data, query, recentOnly, sort]);

  const toggleSort = useCallback((key: SortKey) => {
    setSort((s) => {
      if (!s || s.key !== key) return { key, dir: "asc" };
      if (s.dir === "asc") return { key, dir: "desc" };
      return null;
    });
  }, []);

  const toggleSelected = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const someSelected = rows.some((r) => selected.has(r.id));

  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (rows.every((r) => next.has(r.id))) rows.forEach((r) => next.delete(r.id));
      else rows.forEach((r) => next.add(r.id));
      return next;
    });
  }, [rows]);

  const active = useMemo(() => data.find((r) => r.id === activeId) ?? null, [data, activeId]);

  return {
    rows, query, setQuery, recentOnly, toggleRecent: () => setRecentOnly((v) => !v),
    sort, toggleSort, selected, toggleSelected, toggleAll, allSelected, someSelected,
    activeId, setActiveId, active,
  };
}
