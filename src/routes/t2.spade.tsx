import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading } from "@/components/iosp/primitives";
import { SPADE_BOARD, PLANT_UNITS, type SpadeStatus } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/t2/spade")({
  head: () => ({ meta: [{ title: "Digital Spade Board — Prosafe IOSP" }] }),
  component: SpadeBoard,
});

const plateBg: Record<SpadeStatus, string> = {
  White: "bg-background border-border",
  Red: "bg-absent/15 border-absent/60",
  Grey: "bg-muted/60 border-border",
};

const plateText: Record<SpadeStatus, string> = {
  White: "text-foreground",
  Red: "text-absent",
  Grey: "text-muted-foreground",
};

const plateDot: Record<SpadeStatus, string> = {
  White: "bg-foreground/20",
  Red: "bg-absent",
  Grey: "bg-muted-foreground/40",
};

const statusLabel: Record<SpadeStatus, string> = {
  White: "Available",
  Red: "Spade inserted",
  Grey: "Job ongoing",
};

function SpadeBoard() {
  const [unitFilter, setUnitFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<SpadeStatus | "All">("All");

  const areas = ["All", ...new Set(SPADE_BOARD.map((s) => s.area))];

  const rows = SPADE_BOARD.filter(
    (s) =>
      (unitFilter === "All" || s.unit === unitFilter) &&
      (statusFilter === "All" || s.status === statusFilter),
  );

  const counts = (["White", "Red", "Grey"] as SpadeStatus[]).map((st) => ({
    status: st,
    n: SPADE_BOARD.filter((s) => s.status === st).length,
  }));

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] space-y-5">
        <SectionHeading
          title="Digital Spade Control Board"
          subtitle="Site-wide spade point status — White (available) · Red (spade inserted) · Grey (job ongoing)"
        />

        {/* Legend + summary counts */}
        <div className="panel flex flex-wrap items-center gap-6 p-4">
          {counts.map(({ status, n }) => (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? "All" : status)}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-2.5 transition",
                statusFilter === status ? "border-primary/60 bg-primary/8" : "border-border bg-surface-2 hover:border-primary/30",
              )}
            >
              <div className={cn("size-5 rounded border-2", plateBg[status], plateDot[status] && `ring-2 ring-offset-1 ring-offset-background ring-${status === "Red" ? "absent/60" : "border"}`)}>
                <div className={cn("m-auto mt-1.5 size-2 rounded-full", plateDot[status])} />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium">{statusLabel[status]}</p>
                <p className="font-mono text-lg tabular leading-none">{n}</p>
              </div>
            </button>
          ))}
          <div className="ml-auto flex flex-wrap gap-2">
            <select
              aria-label="Filter by unit"
              value={unitFilter}
              onChange={(e) => setUnitFilter(e.target.value)}
              className="h-9 rounded-lg border border-border bg-surface-2 px-2 text-sm"
            >
              <option value="All">All units</option>
              {PLANT_UNITS.map((u) => <option key={u}>{u}</option>)}
            </select>
            <select
              aria-label="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as SpadeStatus | "All")}
              className="h-9 rounded-lg border border-border bg-surface-2 px-2 text-sm"
            >
              <option value="All">All statuses</option>
              <option value="White">White — available</option>
              <option value="Red">Red — inserted</option>
              <option value="Grey">Grey — ongoing</option>
            </select>
          </div>
        </div>

        {/* Spade plate grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rows.map((sp) => (
            <div
              key={sp.id}
              className={cn(
                "panel flex flex-col gap-2 p-4 transition",
                sp.status === "Red" && "border-absent/40",
                sp.status === "Grey" && "border-border opacity-75",
              )}
            >
              {/* Plate visual */}
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-lg border-2 font-mono text-xs font-bold",
                    plateBg[sp.status],
                    plateText[sp.status],
                  )}
                >
                  {sp.status === "Red" ? "R" : sp.status === "White" ? "W" : "G"}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-mono text-xs">{sp.tag}</p>
                  <p className={cn("text-[11px] font-medium", plateText[sp.status])}>
                    {statusLabel[sp.status]}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">{sp.description}</p>

              <div className="flex flex-wrap gap-2 font-mono text-[10px] text-muted-foreground">
                <span className="rounded bg-surface-2 px-1.5 py-0.5 ring-1 ring-border">{sp.area}</span>
                <span className="rounded bg-surface-2 px-1.5 py-0.5 ring-1 ring-border">{sp.unit}</span>
                {sp.icc !== "—" && (
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary ring-1 ring-primary/30">
                    {sp.icc}
                  </span>
                )}
              </div>

              {sp.status === "Red" && sp.insertedBy && (
                <p className="text-[10px] text-muted-foreground">
                  Inserted by {sp.insertedBy} · {sp.insertedAt}
                </p>
              )}
            </div>
          ))}
        </div>

        {rows.length === 0 && (
          <div className="panel flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm text-muted-foreground">No spade points match the selected filters.</p>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Spade board shows {SPADE_BOARD.length} active spade points across all areas. Physical verification required — digital status mirrors field register, not a substitute for physical inspection.
        </p>
      </div>
    </AppShell>
  );
}
