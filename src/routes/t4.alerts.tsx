import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AlertTriangle, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading, ConfidenceBadge, CitationChip } from "@/components/iosp/primitives";
import { WITHIN_CYCLE_ALERTS, ROTATION } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/t4/alerts")({
  head: () => ({ meta: [{ title: "Within-Cycle Alerts — Prosafe IOSP" }] }),
  component: WithinCycleAlerts,
});

const severityStyle: Record<string, string> = {
  High: "border-absent/40 bg-absent/5",
  Medium: "border-degraded/40 bg-degraded/5",
  Low: "border-border bg-surface-2",
};

const severityBadge: Record<string, string> = {
  High: "bg-absent/10 text-absent ring-absent/30",
  Medium: "bg-degraded/10 text-degraded ring-degraded/30",
  Low: "bg-muted/60 text-muted-foreground ring-border",
};

const TEAM_COLORS: Record<string, string> = {
  A: "#6366f1",
  B: "#f59e0b",
  C: "#10b981",
  D: "#8b5cf6",
};

function WithinCycleAlerts() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1000px] space-y-5">
        <SectionHeading
          title="Within-Cycle Alerts"
          subtitle={`Scoreable events flagged while conditions are fresh — Cycle 2026-16 · Day ${ROTATION.day} of ${ROTATION.of}`}
          right={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-absent/10 px-3 py-1 text-xs text-absent ring-1 ring-absent/30">
              <AlertTriangle className="size-3.5" /> {WITHIN_CYCLE_ALERTS.filter((a) => a.severity === "High").length} High
            </span>
          }
        />

        <div className="panel border-primary/20 bg-primary/5 p-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Why within-cycle alerts?</span> End-of-cycle reports arrive after the opportunity to correct has passed. This feed surfaces scoreable events while the correction window is open — giving teams the information they need to act before their score is locked.
          </p>
        </div>

        <div className="space-y-4">
          {WITHIN_CYCLE_ALERTS.map((alert) => (
            <div
              key={alert.id}
              className={cn("panel p-5", severityStyle[alert.severity])}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={cn(
                      "mt-0.5 size-5 shrink-0",
                      alert.severity === "High"
                        ? "text-absent"
                        : alert.severity === "Medium"
                        ? "text-degraded"
                        : "text-muted-foreground",
                    )}
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 font-mono text-xs font-bold"
                        style={{ backgroundColor: `${TEAM_COLORS[alert.team]}22`, color: TEAM_COLORS[alert.team] }}
                      >
                        Team {alert.team}
                      </span>
                      <span className="font-medium">{alert.dimension}</span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 font-mono text-[11px] ring-1",
                          severityBadge[alert.severity],
                        )}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium">{alert.headline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground">
                  <Clock className="size-3" />
                  {alert.correctionWindow}
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{alert.detail}</p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <ConfidenceBadge level={alert.confidence} />
                <CitationChip
                  citation={{
                    system: "STP Register",
                    ref: `Cycle 2026-16 · Team ${alert.team}`,
                    age: alert.timestamp,
                  }}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3">
                <button
                  onClick={() =>
                    toast.success(`Acknowledgement sent to Team ${alert.team} lead (simulated)`)
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs hover:border-primary/50 hover:text-primary"
                >
                  <CheckCircle2 className="size-3.5" /> Acknowledge
                </button>
                <button
                  onClick={() =>
                    toast(`Correction plan requested from Team ${alert.team} (simulated)`)
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs hover:border-primary/50"
                >
                  <ChevronRight className="size-3.5" /> Request correction plan
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Within-cycle alerts are automatically generated · High confidence · scores are deterministic · AI identifies the pattern and the correction window · humans decide the response.
        </p>
      </div>
    </AppShell>
  );
}
