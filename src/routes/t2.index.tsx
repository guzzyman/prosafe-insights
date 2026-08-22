import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, AlertTriangle, CheckCircle2, Clock, XOctagon } from "lucide-react";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading, StatusPill } from "@/components/iosp/primitives";
import { ICCS, type IccRecord, type ComponentStatus, type Psf1Status } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/t2/")({
  head: () => ({
    meta: [{ title: "LOTO Assurance — Prosafe IOSP" }],
  }),
  component: IccDashboard,
});

type ChipStatus = ComponentStatus | Psf1Status;

const statusChipStyle: Record<string, string> = {
  Confirmed: "bg-intact/10 text-intact ring-intact/30",
  Pass: "bg-intact/10 text-intact ring-intact/30",
  Pending: "bg-degraded/10 text-degraded ring-degraded/30",
  Blocked: "bg-absent/10 text-absent ring-absent/30",
  "N/A": "bg-muted/60 text-muted-foreground ring-border/60",
};

function StatusChip({ label, value }: { label: string; value: ChipStatus }) {
  const style = statusChipStyle[value] ?? "bg-muted text-muted-foreground ring-border";
  const icon =
    value === "Confirmed" || value === "Pass" ? (
      <CheckCircle2 className="size-3" aria-hidden />
    ) : value === "Blocked" ? (
      <XOctagon className="size-3" aria-hidden />
    ) : value === "Pending" ? (
      <Clock className="size-3" aria-hidden />
    ) : (
      <span className="size-3 text-[9px] leading-none" aria-hidden>—</span>
    );

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[11px] ring-1",
          style,
        )}
      >
        {icon}
        {value}
      </span>
    </div>
  );
}

function iccOverallStatus(icc: IccRecord): "green" | "amber" | "red" {
  if (icc.psf1 === "Blocked") return "red";
  if (icc.conflictWith) return "amber";
  const pending = [icc.mechanical, icc.spade, icc.cableLock, icc.electrical, icc.decon, icc.proving].some(
    (v) => v === "Pending",
  );
  if (pending) return "amber";
  return "green";
}

const statusBorderStyle = {
  green: "border-intact/30",
  amber: "border-degraded/30",
  red: "border-absent/40",
};

function IccDashboard() {
  const [filter, setFilter] = useState<"All" | "Active" | "Blocked" | "Conflict">("All");

  const rows = ICCS.filter((icc) => {
    if (filter === "Active") return icc.status === "Active";
    if (filter === "Blocked") return icc.psf1 === "Blocked";
    if (filter === "Conflict") return !!icc.conflictWith;
    return true;
  });

  return (
    <AppShell>
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="T2 — LOTO Assurance"
          subtitle="One screen instead of seven systems — all active isolations, every component status at a glance"
          right={
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="flex items-center gap-1.5 rounded-full bg-absent/10 px-3 py-1 font-mono text-absent ring-1 ring-absent/30">
                <XOctagon className="size-3" /> 1 PSF#1 blocked
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-degraded/10 px-3 py-1 font-mono text-degraded ring-1 ring-degraded/30">
                <AlertTriangle className="size-3" /> 1 conflict detected
              </span>
            </div>
          }
        />

        {/* Filter bar */}
        <div className="panel mb-4 flex flex-wrap items-center gap-2 p-3">
          {(["All", "Active", "Blocked", "Conflict"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs transition",
                filter === f
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border bg-surface-2 text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {f}
              {f === "All" && <span className="ml-1.5 font-mono">({ICCS.length})</span>}
              {f === "Blocked" && <span className="ml-1.5 font-mono">(1)</span>}
              {f === "Conflict" && <span className="ml-1.5 font-mono">(2)</span>}
            </button>
          ))}
          <Link
            to="/t2/conflicts"
            className="ml-auto text-xs text-primary underline-offset-4 hover:underline"
          >
            View conflict details →
          </Link>
        </div>

        {/* ICC table — scrollable within container */}
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead className="bg-surface-2 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">ICC ref</th>
                  <th className="px-4 py-3 font-medium">Equipment / Job</th>
                  <th className="px-4 py-3 font-medium">Unit</th>
                  <th className="px-3 py-3 font-medium text-center">Mechanical</th>
                  <th className="px-3 py-3 font-medium text-center">Spade</th>
                  <th className="px-3 py-3 font-medium text-center">Cable lock</th>
                  <th className="px-3 py-3 font-medium text-center">Electrical</th>
                  <th className="px-3 py-3 font-medium text-center">Decon</th>
                  <th className="px-3 py-3 font-medium text-center">Proving</th>
                  <th className="px-3 py-3 font-medium text-center">PSF#1</th>
                  <th className="px-3 py-3" />
                </tr>
              </thead>
              <tbody>
                {rows.map((icc) => {
                  const overall = iccOverallStatus(icc);
                  return (
                    <tr
                      key={icc.id}
                      className={cn(
                        "border-t border-border transition",
                        statusBorderStyle[overall],
                        overall === "red" && "bg-absent/5",
                        overall === "amber" && "bg-degraded/5",
                      )}
                    >
                      <td className="px-4 py-3">
                        <p className="font-mono text-xs">{icc.id}</p>
                        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{icc.status}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium">{icc.equipment}</p>
                        <p className="mt-0.5 max-w-[220px] truncate text-[11px] text-muted-foreground">
                          {icc.title}
                        </p>
                        {icc.conflictWith && (
                          <span className="mt-1 inline-flex items-center gap-1 rounded bg-degraded/10 px-1.5 py-0.5 font-mono text-[10px] text-degraded">
                            <AlertTriangle className="size-3" /> conflict with {icc.conflictWith}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{icc.unit}</td>
                      <td className="px-3 py-3 text-center">
                        <StatusChip label="" value={icc.mechanical} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <StatusChip label="" value={icc.spade} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <StatusChip label="" value={icc.cableLock} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <StatusChip label="" value={icc.electrical} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <StatusChip label="" value={icc.decon} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <StatusChip label="" value={icc.proving} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <StatusChip label="" value={icc.psf1} />
                        {icc.psf1 === "Blocked" && (
                          <p className="mt-1 text-center font-mono text-[10px] text-absent">sign-off blocked</p>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <Link
                          to="/t2/icc"
                          search={{ id: icc.id }}
                          className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-2 px-2 py-1 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        >
                          Detail <ChevronRight className="size-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          AI drafts isolation certificates · AI runs PSF#1 gate check · humans review and approve all sign-offs · no action is taken automatically.
        </p>
      </div>
    </AppShell>
  );
}
