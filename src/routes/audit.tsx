import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Lock, Filter } from "lucide-react";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading, ConfidenceBadge } from "@/components/iosp/primitives";
import { AUDIT_TRAIL, type AuditEntry } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/audit")({
  head: () => ({ meta: [{ title: "Audit Trail — Prosafe IOSP" }] }),
  component: AuditTrailPage,
});

const MODULE_COLORS: Record<string, string> = {
  T1: "bg-intact/10 text-intact ring-intact/30",
  T2: "bg-primary/10 text-primary ring-primary/30",
  T3: "bg-degraded/10 text-degraded ring-degraded/30",
  T4: "bg-unassessed/10 text-unassessed ring-unassessed/30",
  "Ask IOSP": "bg-primary/10 text-primary ring-primary/30",
  System: "bg-muted/60 text-muted-foreground ring-border",
};

const OUTCOME_STYLE: Record<string, string> = {
  Completed: "text-intact",
  "Queued for review": "text-degraded",
  Blocked: "text-absent",
  Approved: "text-intact",
};

const ACTION_TYPE_STYLE: Record<string, string> = {
  Classification: "bg-intact/8 text-intact",
  Draft: "bg-primary/8 text-primary",
  Query: "bg-unassessed/8 text-unassessed",
  Briefing: "bg-muted/50 text-muted-foreground",
  Alert: "bg-degraded/8 text-degraded",
  "Gate check": "bg-absent/8 text-absent",
  Routing: "bg-primary/8 text-primary",
  "Review request": "bg-degraded/8 text-degraded",
  Escalation: "bg-degraded/8 text-degraded",
};

const MODULES = ["All", "T1", "T2", "T3", "T4", "Ask IOSP", "System"] as const;
const ACTION_TYPES = [
  "All",
  "Classification",
  "Draft",
  "Query",
  "Briefing",
  "Alert",
  "Gate check",
  "Routing",
  "Escalation",
] as const;
const OUTCOMES = ["All", "Completed", "Queued for review", "Blocked", "Approved"] as const;

function AuditTrailPage() {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState<string>("All");
  const [actionFilter, setActionFilter] = useState<string>("All");
  const [outcomeFilter, setOutcomeFilter] = useState<string>("All");

  const filtered: AuditEntry[] = useMemo(() => {
    return AUDIT_TRAIL.filter((e) => {
      const matchesSearch =
        !search ||
        e.description.toLowerCase().includes(search.toLowerCase()) ||
        e.sourceSystems.join(" ").toLowerCase().includes(search.toLowerCase()) ||
        e.user.toLowerCase().includes(search.toLowerCase());
      const matchesModule = moduleFilter === "All" || e.module === moduleFilter;
      const matchesAction = actionFilter === "All" || e.actionType === actionFilter;
      const matchesOutcome = outcomeFilter === "All" || e.outcome === outcomeFilter;
      return matchesSearch && matchesModule && matchesAction && matchesOutcome;
    });
  }, [search, moduleFilter, actionFilter, outcomeFilter]);

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] space-y-5">
        <SectionHeading
          title="Audit Trail"
          subtitle="Immutable log of every AI inference, gate check, and user action — searchable, citable, traceable"
          right={
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5">
              <Lock className="size-3.5 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground">Immutable · append-only</span>
            </div>
          }
        />

        {/* Search + filters */}
        <div className="panel p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative min-w-[240px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search descriptions, sources, users…"
                className="h-9 w-full rounded-lg border border-border bg-surface-2 pl-9 pr-3 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="size-4 text-muted-foreground" />
              <select
                aria-label="Filter by module"
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                className="h-9 rounded-lg border border-border bg-surface-2 px-2 text-sm"
              >
                {MODULES.map((m) => <option key={m}>{m}</option>)}
              </select>
              <select
                aria-label="Filter by action type"
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="h-9 rounded-lg border border-border bg-surface-2 px-2 text-sm"
              >
                {ACTION_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
              <select
                aria-label="Filter by outcome"
                value={outcomeFilter}
                onChange={(e) => setOutcomeFilter(e.target.value)}
                className="h-9 rounded-lg border border-border bg-surface-2 px-2 text-sm"
              >
                {OUTCOMES.map((o) => <option key={o}>{o}</option>)}
              </select>
              {(search || moduleFilter !== "All" || actionFilter !== "All" || outcomeFilter !== "All") && (
                <button
                  onClick={() => { setSearch(""); setModuleFilter("All"); setActionFilter("All"); setOutcomeFilter("All"); }}
                  className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
          <p className="mt-2 font-mono text-[11px] text-muted-foreground">
            {filtered.length} of {AUDIT_TRAIL.length} entries
          </p>
        </div>

        {/* Audit log table */}
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-sm">
              <thead className="bg-surface-2 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Module</th>
                  <th className="px-4 py-3 font-medium">Action type</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium">Sources</th>
                  <th className="px-4 py-3 font-medium">Confidence</th>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                      No audit entries match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((entry) => (
                    <tr
                      key={entry.id}
                      className={cn(
                        "border-t border-border transition hover:bg-surface-2",
                        entry.outcome === "Blocked" && "border-l-2 border-l-absent",
                        entry.outcome === "Queued for review" && "border-l-2 border-l-degraded",
                      )}
                    >
                      <td className="px-4 py-3 font-mono text-xs">{entry.timestamp}</td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 font-mono text-[11px] ring-1",
                            MODULE_COLORS[entry.module],
                          )}
                        >
                          {entry.module}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "rounded-md px-2 py-0.5 text-[11px]",
                            ACTION_TYPE_STYLE[entry.actionType],
                          )}
                        >
                          {entry.actionType}
                        </span>
                      </td>
                      <td className="max-w-[320px] px-4 py-3 text-xs">{entry.description}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {entry.sourceSystems.map((s) => (
                            <span
                              key={s}
                              className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] ring-1 ring-border"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <ConfidenceBadge level={entry.confidence} />
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">
                        {entry.user}
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn("font-mono text-[11px]", OUTCOME_STYLE[entry.outcome])}>
                          {entry.outcome}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Audit trail is append-only and immutable · every AI inference is logged with its source systems, confidence, and outcome · {AUDIT_TRAIL.length} entries today.
        </p>
      </div>
    </AppShell>
  );
}
