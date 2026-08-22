import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Trophy, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading } from "@/components/iosp/primitives";
import { STP_TEAMS, STP_DIMENSIONS } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/t4/")({
  head: () => ({ meta: [{ title: "STP Leaderboard — Prosafe IOSP" }] }),
  component: StpLeaderboard,
});

const TEAM_COLORS: Record<string, string> = {
  A: "#6366f1",
  B: "#f59e0b",
  C: "#10b981",
  D: "#8b5cf6",
};

const MAX_TOTAL = 1000;

function trafficLight(score: number, max: number): "green" | "amber" | "red" {
  const pct = score / max;
  if (pct >= 0.85) return "green";
  if (pct >= 0.65) return "amber";
  return "red";
}

const trafficStyle: Record<string, string> = {
  green: "bg-intact/12 text-intact",
  amber: "bg-degraded/12 text-degraded",
  red: "bg-absent/12 text-absent",
};

const sortedTeams = [...STP_TEAMS].sort((a, b) => b.total - a.total);

// Recharts data: one entry per dimension
const chartData = STP_DIMENSIONS.map((dim) => ({
  name: dim.name.length > 12 ? dim.name.slice(0, 12) + "…" : dim.name,
  fullName: dim.name,
  max: dim.maxPoints,
  ...Object.fromEntries(STP_TEAMS.map((t) => [`Team ${t.team}`, t.scores[dim.id]])),
}));

export function StpLeaderboard() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1400px] space-y-6">
        <SectionHeading
          title="T4 — STP Leaderboard"
          subtitle="Shift Team Performance · Cycle 2026-16 · Day 9 of 14 · 4 teams scored across 13 dimensions"
          right={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary ring-1 ring-primary/30">
              <span className="live-dot size-1.5 rounded-full bg-primary" /> LIVE
            </span>
          }
        />

        {/* Ranking cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sortedTeams.map((team, rank) => {
            const movement = team.cycleMovement;
            const pct = (team.total / MAX_TOTAL) * 100;
            return (
              <div
                key={team.team}
                className={cn(
                  "panel p-5",
                  rank === 0 && "border-intact/40 bg-intact/5",
                )}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex size-9 items-center justify-center rounded-full font-mono text-sm font-bold"
                    style={{ backgroundColor: `${TEAM_COLORS[team.team]}22`, color: TEAM_COLORS[team.team] }}
                  >
                    {team.team}
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs">
                    {movement > 0 ? (
                      <TrendingUp className="size-3.5 text-intact" />
                    ) : movement < 0 ? (
                      <TrendingDown className="size-3.5 text-absent" />
                    ) : (
                      <Minus className="size-3.5 text-muted-foreground" />
                    )}
                    <span
                      className={
                        movement > 0
                          ? "text-intact"
                          : movement < 0
                          ? "text-absent"
                          : "text-muted-foreground"
                      }
                    >
                      {movement > 0 ? `▲${movement}` : movement < 0 ? `▼${Math.abs(movement)}` : "—"}
                    </span>
                  </div>
                </div>
                <p className="mt-3 font-mono text-3xl tabular">{team.total}</p>
                <p className="text-xs text-muted-foreground">of {MAX_TOTAL} pts</p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[11px]"
                    style={{ backgroundColor: `${TEAM_COLORS[team.team]}20`, color: TEAM_COLORS[team.team] }}
                  >
                    {rank === 0 && <Trophy className="size-3" />} Rank {rank + 1}
                  </span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-border">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: TEAM_COLORS[team.team],
                    }}
                  />
                </div>
                <p className="mt-1 text-right font-mono text-[11px] text-muted-foreground">{pct.toFixed(1)}%</p>
              </div>
            );
          })}
        </div>

        {/* Recharts bar chart */}
        <div className="panel p-5">
          <p className="mb-4 text-sm font-semibold">Points by dimension — all teams</p>
          <div className="overflow-x-auto">
            <div style={{ minWidth: 900, height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 4, right: 20, left: 0, bottom: 60 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                    height={70}
                  />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <Tooltip
                    contentStyle={{
                      background: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "#e2e8f0" }}
                    formatter={(value: number, name: string) => [`${value} pts`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  {STP_TEAMS.map((t) => (
                    <Bar
                      key={t.team}
                      dataKey={`Team ${t.team}`}
                      fill={TEAM_COLORS[t.team]}
                      radius={[3, 3, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 13-dimension traffic-light grid */}
        <div className="panel overflow-hidden">
          <div className="border-b border-border px-5 py-3">
            <p className="text-sm font-semibold">13-Dimension scorecard — traffic light</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-surface-2 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Dimension</th>
                  <th className="px-4 py-3 font-medium text-center">Max</th>
                  {sortedTeams.map((t) => (
                    <th
                      key={t.team}
                      className="px-4 py-3 font-medium text-center"
                      style={{ color: TEAM_COLORS[t.team] }}
                    >
                      Team {t.team}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STP_DIMENSIONS.map((dim) => (
                  <tr key={dim.id} className="border-t border-border hover:bg-surface-2">
                    <td className="px-4 py-2">
                      <p className="text-xs">{dim.name}</p>
                      <p className="text-[11px] text-muted-foreground">{dim.description}</p>
                    </td>
                    <td className="px-4 py-2 text-center font-mono text-xs text-muted-foreground">
                      {dim.maxPoints}
                    </td>
                    {sortedTeams.map((team) => {
                      const score = team.scores[dim.id];
                      const light = trafficLight(score, dim.maxPoints);
                      return (
                        <td key={team.team} className="px-4 py-2 text-center">
                          <span
                            className={cn(
                              "inline-block rounded-lg px-2.5 py-1 font-mono text-xs tabular",
                              trafficStyle[light],
                            )}
                          >
                            {score}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="border-t-2 border-border bg-surface-2 font-semibold">
                  <td className="px-4 py-3 text-sm">TOTAL</td>
                  <td className="px-4 py-3 text-center font-mono text-sm">{MAX_TOTAL}</td>
                  {sortedTeams.map((team) => (
                    <td key={team.team} className="px-4 py-3 text-center font-mono text-sm" style={{ color: TEAM_COLORS[team.team] }}>
                      {team.total}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Scores are computed deterministically from operational records — the AI writes only the narrative.
          </p>
          <Link
            to="/t4/alerts"
            className="inline-flex items-center gap-1 text-xs text-primary underline-offset-4 hover:underline"
          >
            View within-cycle alerts <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
