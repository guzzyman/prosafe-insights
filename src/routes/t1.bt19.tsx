import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { X, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/iosp/AppShell";
import {
  SectionHeading,
  StatusPill,
  ConfidenceBadge,
  CitationChip,
} from "@/components/iosp/primitives";
import { SCES, BT19, THREAT_LINE_14, type Sce, type BarrierState } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/t1/bt19")({
  head: () => ({
    meta: [
      { title: "BT-19 Barrier Dashboard — Prosafe IOSP" },
      {
        name: "description",
        content:
          "BT-19 Fuel Gas System: 109 threat lines and 124 safety critical elements with evidence-backed barrier states and drill-down reasoning.",
      },
      { property: "og:title", content: "BT-19 Barrier Dashboard — Prosafe IOSP" },
      {
        property: "og:description",
        content:
          "Drill into threat line 14 — 44TICA-016 fail-open with no valid control barrier — with full cited evidence.",
      },
    ],
  }),
  component: Bt19Dashboard,
});

const STATES: BarrierState[] = ["Intact", "Degraded", "Absent", "Unassessed"];

function Bt19Dashboard() {
  const [stateFilter, setStateFilter] = useState<BarrierState | "All">("All");
  const [scaFilter, setScaFilter] = useState<string>("All");
  const [equipFilter, setEquipFilter] = useState<string>("All");
  const [sortKey, setSortKey] = useState<keyof Sce>("tag");
  const [asc, setAsc] = useState(true);
  const [selected, setSelected] = useState<Sce | null>(null);

  const scaTypes = useMemo(() => ["All", ...new Set(SCES.map((s) => s.scaType))], []);
  const equipment = useMemo(() => ["All", ...new Set(SCES.map((s) => s.equipment))], []);

  const rows = useMemo(() => {
    const filtered = SCES.filter(
      (s) =>
        (stateFilter === "All" || s.state === stateFilter) &&
        (scaFilter === "All" || s.scaType === scaFilter) &&
        (equipFilter === "All" || s.equipment === equipFilter),
    );
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      return asc ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [stateFilter, scaFilter, equipFilter, sortKey, asc]);

  const counts = useMemo(
    () =>
      STATES.map((s) => ({
        state: s,
        n: SCES.filter((x) => x.state === s).length,
      })),
    [],
  );

  const isHero = selected?.threatLines.includes(14);

  function sort(key: keyof Sce) {
    if (key === sortKey) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(true);
    }
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="BT-19 — Fuel Gas System"
          subtitle={`${BT19.threatLines} threat-to-consequence lines · ${BT19.sceCount} SCEs · ${BT19.humanBarrierCategories} critical human barrier categories`}
          right={<StatusPill state="Absent" label="2 barriers ABSENT" />}
        />

        <div className="panel mb-4 flex flex-wrap items-center gap-3 p-4">
          {counts.map((c) => (
            <button
              key={c.state}
              onClick={() => setStateFilter(stateFilter === c.state ? "All" : c.state)}
              className={cn(
                "rounded-xl border border-border bg-surface-2 px-3 py-2 text-left transition hover:border-primary/50",
                stateFilter === c.state && "border-primary/60",
              )}
            >
              <StatusPill state={c.state} />
              <p className="mt-1 font-mono text-lg tabular">{c.n}</p>
              <p className="text-[11px] text-muted-foreground">of {SCES.length} seeded SCEs</p>
            </button>
          ))}
          <div className="ml-auto flex flex-wrap gap-2">
            <select
              aria-label="Filter by SCA type"
              value={scaFilter}
              onChange={(e) => setScaFilter(e.target.value)}
              className="h-9 rounded-lg border border-border bg-surface-2 px-2 text-sm"
            >
              {scaTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <select
              aria-label="Filter by equipment"
              value={equipFilter}
              onChange={(e) => setEquipFilter(e.target.value)}
              className="h-9 rounded-lg border border-border bg-surface-2 px-2 font-mono text-sm"
            >
              {equipment.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <button
              onClick={() => {
                setStateFilter("All");
                setScaFilter("All");
                setEquipFilter("All");
              }}
              className="h-9 rounded-lg border border-border bg-surface-2 px-3 text-sm text-muted-foreground hover:text-foreground"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="panel mb-4 overflow-x-auto p-4">
          <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">
            Bow-tie summary — threats → top event → consequences
          </p>
          <div className="flex min-w-[820px] items-center gap-3">
            <div className="flex-1 space-y-1">
              {["Threat 14 · 44TICA-016 fail-open", "Threat 15 · heater overtemp", "Threat 7 · overpressure"].map(
                (t, i) => (
                  <div
                    key={t}
                    className="flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs"
                  >
                    <span className="font-mono">{t}</span>
                    <StatusPill state={i === 0 ? "Absent" : i === 1 ? "Intact" : "Degraded"} />
                  </div>
                ),
              )}
            </div>
            <div className="grid size-24 shrink-0 place-items-center rounded-full border-2 border-absent/60 bg-absent/10 text-center font-mono text-[11px] text-absent">
              Loss of fuel gas containment
            </div>
            <div className="flex-1 space-y-1">
              {["Jet fire", "Vapour cloud explosion", "Plant trip / production loss"].map((c, i) => (
                <div
                  key={c}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs"
                >
                  <span className="font-mono">{c}</span>
                  <StatusPill state={i === 2 ? "Degraded" : "Intact"} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel overflow-hidden">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full min-w-[1000px] text-sm">
              <thead className="bg-surface-2 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  {(
                    [
                      ["tag", "SCE tag"],
                      ["description", "Description"],
                      ["scaType", "SCA type"],
                      ["state", "State"],
                      ["equipment", "Equipment"],
                      ["owner", "Barrier owner"],
                      ["source", "Source"],
                      ["confidence", "Confidence"],
                    ] as [keyof Sce, string][]
                  ).map(([k, label]) => (
                    <th key={k} className="px-3 py-2 font-medium">
                      <button onClick={() => sort(k)} className="hover:text-foreground">
                        {label}
                        {sortKey === k ? (asc ? " ▲" : " ▼") : ""}
                      </button>
                    </th>
                  ))}
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelected(s)}
                    className="cursor-pointer border-t border-border transition hover:bg-surface-2"
                  >
                    <td className="px-3 py-2 font-mono text-xs">{s.tag}</td>
                    <td className="max-w-[280px] px-3 py-2 text-xs text-muted-foreground">
                      {s.description}
                    </td>
                    <td className="px-3 py-2 text-xs">{s.scaType}</td>
                    <td className="px-3 py-2">
                      <StatusPill state={s.state} />
                    </td>
                    <td className="px-3 py-2 font-mono text-xs">{s.equipment}</td>
                    <td className="px-3 py-2 text-xs">{s.owner}</td>
                    <td className="px-3 py-2 font-mono text-[11px] text-muted-foreground">
                      {s.source}
                    </td>
                    <td className="px-3 py-2">
                      <ConfidenceBadge level={s.confidence} />
                    </td>
                    <td className="px-3 py-2">
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <button
            className="flex-1 bg-background/60 backdrop-blur-sm"
            aria-label="Close drill-down"
            onClick={() => setSelected(null)}
          />
          <aside className="w-full max-w-xl overflow-y-auto border-l border-border bg-surface p-5 rise-in sm:w-[560px]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-lg">{selected.tag}</p>
                <p className="text-sm text-muted-foreground">{selected.description}</p>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Close">
                <X className="size-5 text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <StatusPill state={selected.state} />
              <ConfidenceBadge level={selected.confidence} />
              <span className="font-mono text-[11px] text-muted-foreground">
                threat lines {selected.threatLines.join(", ")}
              </span>
            </div>

            {selected.note && (
              <p
                className={cn(
                  "mt-4 rounded-lg border px-3 py-2 text-xs",
                  selected.state === "Unassessed"
                    ? "border-unassessed/40 bg-unassessed/10 text-muted-foreground"
                    : "border-absent/40 bg-absent/10",
                )}
              >
                {selected.note}
              </p>
            )}

            {isHero ? (
              <>
                <div className="mt-5 rounded-xl border border-absent/40 bg-absent/8 p-4">
                  <p className="font-mono text-xs uppercase tracking-wide text-absent">
                    Threat line 14 — no valid control barrier
                  </p>
                  <p className="mt-2 text-sm">
                    {THREAT_LINE_14.threat} → {THREAT_LINE_14.consequence}
                  </p>
                  <dl className="mt-3 grid gap-1 font-mono text-[11px] text-muted-foreground sm:grid-cols-2">
                    <div>Risk: <span className="text-absent">{THREAT_LINE_14.risk}</span></div>
                    <div>Handshake: {THREAT_LINE_14.handshake}</div>
                    <div>Action: {THREAT_LINE_14.action} · {THREAT_LINE_14.status}</div>
                    <div>Overdue: {THREAT_LINE_14.daysOverdue} days</div>
                    <div className="sm:col-span-2">
                      Remedial: {THREAT_LINE_14.remedial} ({THREAT_LINE_14.criticality} criticality)
                    </div>
                  </dl>
                </div>

                <h3 className="mt-5 text-sm font-semibold">Evidence synthesis</h3>
                <ul className="mt-2 space-y-3">
                  {THREAT_LINE_14.evidence.map((e) => (
                    <li key={e.label} className="rounded-lg border border-border bg-surface-2 p-3">
                      <p className="text-xs font-medium">{e.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{e.value}</p>
                      <div className="mt-2">
                        <CitationChip citation={e.citation} />
                      </div>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-5 text-sm font-semibold">Why this state</h3>
                <ol className="mt-2 space-y-2">
                  {THREAT_LINE_14.reasoning.map((r, i) => (
                    <li key={r} className="flex gap-2 text-xs text-muted-foreground">
                      <span className="font-mono text-primary">{i + 1}.</span>
                      {r}
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <>
                <h3 className="mt-5 text-sm font-semibold">Evidence synthesis</h3>
                <div className="mt-2 rounded-lg border border-border bg-surface-2 p-3">
                  <p className="text-xs text-muted-foreground">{selected.lastEvidence}</p>
                  <div className="mt-2">
                    <CitationChip
                      citation={{
                        system: selected.source.split(" · ")[0] ?? selected.source,
                        ref: selected.source.split(" · ")[1] ?? "—",
                        age: "updated today",
                      }}
                    />
                  </div>
                </div>
                <h3 className="mt-5 text-sm font-semibold">Why this state</h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  {selected.state === "Unassessed"
                    ? "Insufficient evidence to classify this SCE. The system will not guess — the item is queued for barrier-owner confirmation."
                    : `Latest ${selected.scaType} evidence ${
                        selected.daysOverdue
                          ? `is ${selected.daysOverdue} days past its due date, so the barrier is degraded.`
                          : "is valid and within interval, so the barrier is credited as intact."
                      }`}
                </p>
              </>
            )}

            <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
              <button
                onClick={() => toast.success("Escalation raised to barrier owner (simulated)")}
                className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
              >
                Escalate to barrier owner
              </button>
              <button
                onClick={() => toast("Acceptance form requested (simulated)")}
                className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs"
              >
                Request acceptance form
              </button>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Barrier owner: {selected.owner} · AI classifies, humans decide. No action is taken
              automatically.
            </p>
          </aside>
        </div>
      )}
    </AppShell>
  );
}
