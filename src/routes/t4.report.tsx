import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Sparkles, Download, Info } from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading, ConfidenceBadge } from "@/components/iosp/primitives";
import { CYCLE_REPORT, STP_TEAMS, STP_DIMENSIONS } from "@/lib/mockData";
import { aiDelay } from "@/lib/aiSimulator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/t4/report")({
  head: () => ({ meta: [{ title: "Cycle Report — Prosafe IOSP" }] }),
  component: CycleReport,
});

const TEAM_COLORS: Record<string, string> = {
  A: "#6366f1",
  B: "#f59e0b",
  C: "#10b981",
  D: "#8b5cf6",
};

// Radar chart data — normalised to 0–100%
const radarData = STP_DIMENSIONS.map((dim) => ({
  subject: dim.name.length > 14 ? dim.name.slice(0, 14) + "…" : dim.name,
  ...Object.fromEntries(
    STP_TEAMS.map((t) => [`Team ${t.team}`, Math.round((t.scores[dim.id] / dim.maxPoints) * 100)]),
  ),
}));

function CycleReport() {
  const [narrativeBusy, setNarrativeBusy] = useState(false);
  const [narrativeVisible, setNarrativeVisible] = useState(true);

  async function regenerateNarrative() {
    setNarrativeBusy(true);
    setNarrativeVisible(false);
    await aiDelay(1500);
    setNarrativeVisible(true);
    setNarrativeBusy(false);
    toast.success("Variance narrative regenerated (simulated)");
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] space-y-6">
        <SectionHeading
          title="Automated Cycle Report"
          subtitle={`Cycle ${CYCLE_REPORT.cycleId} · ${CYCLE_REPORT.period} · Day ${CYCLE_REPORT.day} of ${CYCLE_REPORT.of} (mid-cycle snapshot)`}
          right={
            <button
              onClick={() => toast("Report exported to PDF (simulated)")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground"
            >
              <Download className="size-3.5" /> Export PDF
            </button>
          }
        />

        {/* Deterministic scores notice */}
        <div className="panel border-primary/20 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Scores are deterministic.</span> They are calculated from verified operational records in the STP Register — the AI writes only the variance narrative below. A narrative error cannot change a score. Narrative can be regenerated; scores cannot be edited.
            </p>
          </div>
        </div>

        {/* Overall narrative + ranking */}
        <div className="panel p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <p className="text-sm font-semibold">AI Variance Narrative</p>
              <ConfidenceBadge level="High" />
            </div>
            <button
              onClick={() => void regenerateNarrative()}
              disabled={narrativeBusy}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs text-muted-foreground hover:border-primary/50 disabled:opacity-60"
            >
              <Sparkles className="size-3.5" /> Regenerate narrative
            </button>
          </div>

          {narrativeBusy ? (
            <div className="space-y-2 py-4">
              {[100, 85, 70, 90, 60].map((w, i) => (
                <div key={i} className="ai-shimmer h-4 rounded" style={{ width: `${w}%` }} />
              ))}
            </div>
          ) : narrativeVisible ? (
            <div className="rise-in space-y-3">
              <p className="text-sm leading-relaxed">{CYCLE_REPORT.overallNarrative}</p>
              <p className="font-mono text-xs text-muted-foreground">{CYCLE_REPORT.rankingNarrative}</p>
            </div>
          ) : null}
        </div>

        {/* Radar chart */}
        <div className="panel p-5">
          <p className="mb-4 text-sm font-semibold">Performance profile — all dimensions (% of max)</p>
          <div style={{ height: 380 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                <PolarGrid stroke="rgba(100,116,139,0.2)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                />
                {STP_TEAMS.map((t) => (
                  <Radar
                    key={t.team}
                    name={`Team ${t.team}`}
                    dataKey={`Team ${t.team}`}
                    stroke={TEAM_COLORS[t.team]}
                    fill={TEAM_COLORS[t.team]}
                    fillOpacity={0.08}
                    strokeWidth={2}
                  />
                ))}
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dimension narratives */}
        <div className="panel overflow-hidden">
          <div className="border-b border-border px-5 py-3">
            <p className="text-sm font-semibold">Dimension-by-dimension narratives</p>
          </div>
          <div className="divide-y divide-border">
            {CYCLE_REPORT.dimensions.map((dim) => {
              const def = STP_DIMENSIONS.find((d) => d.id === dim.dimensionId)!;
              const sorted = [...dim.scores].sort((a, b) => b.score - a.score);
              return (
                <div key={dim.dimensionId} className="p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{dim.name}</p>
                      <p className="text-xs text-muted-foreground">{def.description}</p>
                    </div>
                    <div className="flex gap-2">
                      {sorted.map((s) => (
                        <div key={s.team} className="text-center">
                          <span
                            className="block font-mono text-xs font-bold"
                            style={{ color: TEAM_COLORS[s.team] }}
                          >
                            {s.score}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground">/{dim.maxPoints}</span>
                          <span
                            className="block font-mono text-[10px]"
                            style={{ color: TEAM_COLORS[s.team] }}
                          >
                            {s.team}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed italic">
                    {dim.narrative}
                  </p>

                  {/* Mini bar for each team */}
                  <div className="mt-3 space-y-1">
                    {sorted.map((s) => (
                      <div key={s.team} className="flex items-center gap-2">
                        <span className="w-12 font-mono text-[11px]" style={{ color: TEAM_COLORS[s.team] }}>
                          Team {s.team}
                        </span>
                        <div className="flex-1 rounded-full bg-border" style={{ height: 6 }}>
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${(s.score / dim.maxPoints) * 100}%`,
                              backgroundColor: TEAM_COLORS[s.team],
                            }}
                          />
                        </div>
                        <span className={cn("w-8 text-right font-mono text-[11px]", s.score / dim.maxPoints < 0.65 ? "text-absent" : s.score / dim.maxPoints < 0.85 ? "text-degraded" : "text-intact")}>
                          {s.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Scores are deterministic · AI writes only the narrative · a narrative error cannot change a score · report is a mid-cycle snapshot, final scores computed at cycle close.
        </p>
      </div>
    </AppShell>
  );
}
