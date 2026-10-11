"use client";

import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EvilBarChart } from "@/components/evilcharts/charts/recharts-bar-chart";
import type { ChartConfig } from "@/components/evilcharts/ui/recharts-chart";
import { EASE_DRAWER, EASE_OUT, FORCE_MOTION } from "@/lib/motion";
import { formatDate } from "@/lib/format";
import { PRESS } from "@/lib/ui";
import { cn } from "@/lib/utils";
import type { Company } from "@/lib/types";
import { CompanyLogo } from "./company-logo";
import { ConnectionBadge } from "./connection-badge";
import { CategoryTag } from "./category-tag";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const chartConfig = {
  artifacts: {
    label: "Artifacts",
    colors: { light: ["#2f7df6"], dark: ["#4a90ff"] },
  },
} satisfies ChartConfig;

/** Staged entrance: small chunks, ~50ms apart, starting once the card is mostly in. */
function Reveal({ i, className, children }: { i: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, transform: "translateY(8px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={{ duration: 0.28, ease: EASE_OUT, delay: 0.1 + i * 0.05 }}
    >
      {children}
    </motion.div>
  );
}

/** Decorative, one-off count-up that starts once the card has landed. */
function CountUp({ value }: { value: number }) {
  const reduce = !!useReducedMotion() && !FORCE_MOTION;
  const mv = useMotionValue(reduce ? value : 0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.6, ease: EASE_OUT, delay: 0.3 });
    return () => controls.stop();
  }, [value, reduce, mv]);

  return <motion.span>{rounded}</motion.span>;
}

function Prop({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex h-7 items-center">
      <span className="w-24 shrink-0 text-[13px] text-[var(--fg-4)]">{label}</span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="border-b border-[var(--line)] px-4 py-4">
      <div className="text-[15px] font-semibold leading-5 text-[var(--fg)]"><CountUp value={value} /></div>
      <div className="mt-0.5 text-[13px] leading-[14px] text-[var(--fg-4)]">{label}</div>
    </div>
  );
}

function Body({ company }: { company: Company }) {
  const data = company.activity.map((v, i) => ({ day: DAYS[i], artifacts: v }));
  const hasActivity = company.activity.some(Boolean);

  return (
    <>
      <Reveal i={0} className="border-b border-[var(--line)] px-4 pb-4 pt-[18px] text-xs leading-[15.5px] text-[var(--fg)]">
        <div className="font-medium">{company.name}</div>
        <div className="text-[var(--fg-2)]">{company.description}</div>
      </Reveal>

      <Reveal i={1} className="border-b border-[var(--line)] px-4 pb-3 pt-4">
        <Prop label="Connection"><ConnectionBadge value={company.connection} /></Prop>
        <Prop label="Interaction">
          <span className="text-[13px]">
            {company.interaction ? formatDate(company.interaction) : <span className="text-[var(--fg-4)]">No contact</span>}
          </span>
        </Prop>
        <Prop label="Domain"><span className="text-[13px] underline underline-offset-[2.5px]">{company.domain}</span></Prop>
        <Prop label="Categories"><CategoryTag value={company.category} /></Prop>
      </Reveal>

      <Reveal i={2}>
        <Stat value={company.activeProjects} label="Active projects" />
        <Stat value={company.teamSize} label="Team members" />
      </Reveal>

      <Reveal i={3} className="px-4 py-4">
        <div className="mb-3 text-[13px] font-semibold leading-4">Team activity</div>
        {hasActivity ? (
          <EvilBarChart data={data} config={chartConfig} className="aspect-auto h-[190px] w-full" barRadius={3}>
            <EvilBarChart.Grid />
            <EvilBarChart.XAxis dataKey="day" />
            <EvilBarChart.Legend align="left" variant="circle" />
            <EvilBarChart.Tooltip />
            <EvilBarChart.Bar dataKey="artifacts" variant="hatched" />
          </EvilBarChart>
        ) : (
          <div className="grid h-[120px] place-items-center rounded-xl border border-dashed border-[var(--line-strong)] text-[13px] text-[var(--fg-4)]">
            No activity recorded yet
          </div>
        )}
      </Reveal>
    </>
  );
}

export function DetailDrawer({ company, onClose }: { company: Company | null; onClose: () => void }) {
  return (
    <Dialog.Root open={!!company} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {company && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/15 dark:bg-black/45"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                // floating card: rounded, inset from the right/top/bottom edges
                className={cn(
                  "fixed inset-1 z-50 flex flex-col overflow-hidden rounded-2xl bg-[var(--surface)] outline-none",
                  "shadow-[0_0_0_1px_var(--ring-line),0_12px_40px_rgb(0_0_0/0.14),0_2px_8px_rgb(0_0_0/0.06)]",
                  "sm:left-auto sm:w-[380px]",
                )}
                // transform strings stay on the GPU; enter slower than exit
                initial={{ opacity: 0, transform: "translateX(105%)" }}
                animate={{
                  opacity: 1,
                  transform: "translateX(0%)",
                  transition: { duration: 0.32, ease: EASE_DRAWER },
                }}
                exit={{
                  opacity: 0,
                  transform: "translateX(105%)",
                  transition: { duration: 0.2, ease: EASE_DRAWER },
                }}
              >
                <div className="flex h-[var(--bar-h)] shrink-0 items-center gap-1.5 border-b border-[var(--line)] pl-4 pr-2.5">
                  <CompanyLogo domain={company.logoDomain} name={company.name} />
                  <Dialog.Title className="min-w-0 flex-1 truncate text-[13px] font-semibold leading-4">
                    {company.name}
                  </Dialog.Title>
                  <Dialog.Description className="sr-only">Company details</Dialog.Description>
                  <Dialog.Close asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Close"
                      className={cn(PRESS, "size-6 rounded-lg text-[var(--fg-3)] hover:bg-[var(--hover-soft)] hover:text-[var(--fg)]")}
                    >
                      <X className="size-3.5" strokeWidth={1.5} />
                    </Button>
                  </Dialog.Close>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto">
                  <Body key={company.id} company={company} />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
