"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "motion/react";
import { useCompanies } from "@/hooks/use-companies";
import { useCompaniesQuery, useCreateCompany } from "@/hooks/use-companies-query";
import { useMediaQuery } from "@/hooks/use-media-query";
import { makeId, type NewCompanyInput } from "@/lib/companies-store";
import { FORCE_MOTION } from "@/lib/motion";
import { MobileSidebar, Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { Toolbar } from "./toolbar";
import { CompaniesTable } from "./companies-table";
import { DetailDrawer } from "./detail-drawer";
import { NewCompanyDialog } from "./new-company-dialog";

export function DashboardShell() {
  const { data } = useCompaniesQuery();
  const t = useCompanies(data);
  const create = useCreateCompany();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [enterId, setEnterId] = useState<string | null>(null);
  const [intro, setIntro] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // the staged page-load intro only applies to rows mounted in the first second
  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        if (isMobile) setMobileNavOpen((v) => !v);
        else setSidebarOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobile]);

  function handleCreate(input: NewCompanyInput) {
    const id = makeId(input.name);
    setEnterId(id);
    scrollRef.current?.scrollTo({ top: 0 });
    create.mutate({ id, input });
    // clear after the slide-in + flash have finished so filtering never replays them
    setTimeout(() => setEnterId((current) => (current === id ? null : current)), 2000);
  }

  return (
    <MotionConfig reducedMotion={FORCE_MOTION ? "never" : "user"}>
      <div className="flex h-dvh overflow-hidden bg-[var(--app-bg)]">
        {isMobile ? (
          <MobileSidebar open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
        ) : (
          <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
        )}

        <main className="flex min-w-0 flex-1 flex-col">
          <Topbar
            showToggle={isMobile || !sidebarOpen}
            onToggle={() => (isMobile ? setMobileNavOpen(true) : setSidebarOpen(true))}
          />
          <Toolbar
            query={t.query}
            onQuery={t.setQuery}
            recentOnly={t.recentOnly}
            onToggleRecent={t.toggleRecent}
            onNew={() => setDialogOpen(true)}
          />
          <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto">
            <CompaniesTable
              rows={t.rows}
              query={t.query}
              selected={t.selected}
              activeId={t.activeId}
              enterId={enterId}
              intro={intro}
              sort={t.sort}
              allSelected={t.allSelected}
              someSelected={t.someSelected}
              onSort={t.toggleSort}
              onToggle={t.toggleSelected}
              onToggleAll={t.toggleAll}
              onActivate={t.setActiveId}
            />
          </div>
        </main>

        <DetailDrawer company={t.active} onClose={() => t.setActiveId(null)} />
        <NewCompanyDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleCreate} />
      </div>
    </MotionConfig>
  );
}
