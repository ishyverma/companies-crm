import { Suspense } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function Page() {
  // TanStack Query reads the clock internally; Next 16 requires that to live behind Suspense.
  return (
    <Suspense fallback={<div className="h-dvh bg-[var(--app-bg)]" />}>
      <DashboardShell />
    </Suspense>
  );
}
