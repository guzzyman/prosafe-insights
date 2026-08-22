import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Circle, AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading, ConfidenceBadge } from "@/components/iosp/primitives";
import { EOSR_SECTIONS, EOSR_ENTRIES } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/t3/eosr")({
  head: () => ({ meta: [{ title: "EoSR Live View — Prosafe IOSP" }] }),
  component: EosrLiveView,
});

const observationTypeStyle: Record<string, string> = {
  Defect: "bg-absent/10 text-absent ring-absent/30",
  Alarm: "bg-degraded/10 text-degraded ring-degraded/30",
  Safety: "bg-degraded/10 text-degraded ring-degraded/30",
  Activity: "bg-primary/10 text-primary ring-primary/30",
  Optimisation: "bg-intact/10 text-intact ring-intact/30",
  Routine: "bg-muted/60 text-muted-foreground ring-border/60",
};

function EosrLiveView() {
  const [expandedSection, setExpandedSection] = useState<number | null>(3);

  const totalSections = EOSR_SECTIONS.length;
  const requiredSections = EOSR_SECTIONS.filter((s) => s.required).length;
  const completedSections = EOSR_SECTIONS.filter((s) =>
    EOSR_ENTRIES.some((e) => e.sections.includes(s.id)),
  ).length;
  const escalatedEntries = EOSR_ENTRIES.filter((e) => e.escalated).length;
  const offlineEntries = EOSR_ENTRIES.filter((e) => e.offlineQueued).length;

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] space-y-5">
        <SectionHeading
          title="T3 — EoSR Live View"
          subtitle={`End-of-Shift Report · ${EOSR_ENTRIES.length} field entries · ${completedSections} of ${totalSections} sections active`}
          right={
            <div className="flex flex-wrap gap-2">
              {escalatedEntries > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-degraded/10 px-3 py-1 text-xs text-degraded ring-1 ring-degraded/30">
                  <AlertTriangle className="size-3" /> {escalatedEntries} escalated
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary ring-1 ring-primary/30">
                <span className="live-dot size-1.5 rounded-full bg-primary" />
                LIVE
              </span>
            </div>
          }
        />

        {/* Supervisor compliance dashboard */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Sections active", value: completedSections, max: totalSections, ok: completedSections >= requiredSections },
            { label: "Required sections", value: requiredSections, max: requiredSections, ok: true },
            { label: "Field entries", value: EOSR_ENTRIES.length, max: null, ok: true },
            { label: "Escalated entries", value: escalatedEntries, max: null, ok: false },
          ].map((kpi) => (
            <div key={kpi.label} className={cn("panel p-4", !kpi.ok && kpi.value > 0 && "border-degraded/30")}>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <p className="mt-2 font-mono text-3xl tabular">
                {kpi.value}
                {kpi.max && <span className="ml-1 text-base text-muted-foreground">/ {kpi.max}</span>}
              </p>
              {kpi.max && (
                <div className="mt-2 h-1.5 w-full rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${Math.min(100, (kpi.value / kpi.max) * 100)}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          {/* 13-section accordion */}
          <div className="panel overflow-hidden">
            <div className="border-b border-border px-4 py-3">
              <p className="text-sm font-semibold">13 EoSR Sections</p>
            </div>
            <div className="divide-y divide-border">
              {EOSR_SECTIONS.map((sec) => {
                const entries = EOSR_ENTRIES.filter((e) => e.sections.includes(sec.id));
                const hasEntries = entries.length > 0;
                const isOpen = expandedSection === sec.id;
                return (
                  <div key={sec.id}>
                    <button
                      onClick={() => setExpandedSection(isOpen ? null : sec.id)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-surface-2"
                    >
                      {hasEntries ? (
                        <CheckCircle2 className="size-4 shrink-0 text-intact" aria-hidden />
                      ) : (
                        <Circle className="size-4 shrink-0 text-muted-foreground/40" aria-hidden />
                      )}
                      <span className="font-mono text-xs text-primary">{sec.code}</span>
                      <span className="flex-1 text-sm">{sec.title}</span>
                      {sec.required && (
                        <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground ring-1 ring-border">
                          Required
                        </span>
                      )}
                      <span className="font-mono text-xs text-muted-foreground">{entries.length}</span>
                      {isOpen ? (
                        <ChevronDown className="size-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="size-4 text-muted-foreground" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="border-t border-border bg-surface-2 px-4 pb-3 pt-2 rise-in">
                        {hasEntries ? (
                          <div className="space-y-2">
                            {entries.map((e) => (
                              <div key={e.id} className="rounded-lg border border-border bg-background p-3">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-mono text-[11px] text-muted-foreground">{e.timestamp}</span>
                                  <span className="text-[11px] text-muted-foreground">{e.author}</span>
                                  {e.tag && (
                                    <span className="font-mono text-[11px] text-primary">{e.tag}</span>
                                  )}
                                  <span
                                    className={cn(
                                      "rounded-full px-2 py-0.5 font-mono text-[10px] ring-1",
                                      observationTypeStyle[e.observationType],
                                    )}
                                  >
                                    {e.observationType}
                                  </span>
                                  {e.escalated && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-degraded/10 px-2 py-0.5 font-mono text-[10px] text-degraded ring-1 ring-degraded/30">
                                      <AlertTriangle className="size-2.5" /> escalated
                                    </span>
                                  )}
                                  {e.offlineQueued && (
                                    <span className="rounded-full bg-muted/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground ring-1 ring-border">
                                      offline-queued
                                    </span>
                                  )}
                                </div>
                                <p className="mt-1.5 text-xs">{e.raw}</p>
                                <div className="mt-1.5">
                                  <ConfidenceBadge level={e.confidence} />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="py-2 text-xs text-muted-foreground">No entries in this section yet.</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar: all entries chronological */}
          <div className="panel overflow-hidden">
            <div className="border-b border-border px-4 py-3">
              <p className="text-sm font-semibold">All entries — chronological</p>
            </div>
            <div className="max-h-[700px] overflow-y-auto">
              {EOSR_ENTRIES.map((e) => (
                <div
                  key={e.id}
                  className={cn(
                    "border-b border-border px-4 py-3 transition last:border-0 hover:bg-surface-2",
                    e.escalated && "border-l-2 border-l-degraded",
                    e.offlineQueued && "opacity-75",
                  )}
                >
                  <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                    <span>{e.timestamp}</span>
                    <span>{e.author}</span>
                    {e.tag && <span className="text-primary">{e.tag}</span>}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs">{e.raw}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {e.sections.map((s) => (
                      <span key={s} className="rounded-full bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary">§{s}</span>
                    ))}
                    {e.escalated && <AlertTriangle className="size-3 text-degraded" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {offlineEntries > 0 && (
          <p className="text-center text-xs text-muted-foreground">
            {offlineEntries} entr{offlineEntries === 1 ? "y" : "ies"} submitted offline — pending sync.
          </p>
        )}
      </div>
    </AppShell>
  );
}
