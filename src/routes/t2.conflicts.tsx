import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { AlertTriangle, GitMerge, ArrowRight, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading, ConfidenceBadge, CitationChip } from "@/components/iosp/primitives";
import { ICCS } from "@/lib/mockData";

export const Route = createFileRoute("/t2/conflicts")({
  head: () => ({ meta: [{ title: "ICC Conflict Detection — Prosafe IOSP" }] }),
  component: ConflictDetection,
});

function ConflictDetection() {
  const conflictPair = [
    ICCS.find((x) => x.id === "ICC-2026-0423")!,
    ICCS.find((x) => x.id === "ICC-2026-0431")!,
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-[1100px] space-y-6">
        <SectionHeading
          title="Conflict Detection"
          subtitle="AI-detected direct and indirect conflicts between active isolation certificates"
          right={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-degraded/10 px-3 py-1 text-xs font-medium text-degraded ring-1 ring-degraded/30">
              <AlertTriangle className="size-3.5" /> 1 direct conflict active
            </span>
          }
        />

        {/* Conflict explanation */}
        <div className="panel border-degraded/40 bg-degraded/5 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-6 shrink-0 text-degraded" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-degraded">
                Direct conflict — shared isolation point valve{" "}
                <span className="font-mono">44-XV-118</span>
              </p>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Two active isolation certificates both claim valve <span className="font-mono">44-XV-118</span> as an
                isolation point. If both jobs proceeded simultaneously, the valve would need to be operated for two
                independent purposes, invalidating the isolation integrity of one or both certificates and creating a
                potential loss-of-containment path.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <ConfidenceBadge level="High" />
                <CitationChip citation={{ system: "Isolation Register", ref: "ICC-2026-0423 / 0431", age: "updated now" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-side ICC comparison */}
        <div className="grid gap-4 lg:grid-cols-2">
          {conflictPair.map((icc) => (
            <div key={icc.id} className="panel space-y-3 p-5">
              <div>
                <p className="font-mono text-sm text-primary">{icc.id}</p>
                <p className="text-sm font-medium">{icc.title}</p>
                <p className="text-xs text-muted-foreground">{icc.unit} · Prepared by {icc.preparedBy?.split(" (")[0]}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[11px] ring-1 ${
                    icc.status === "Active"
                      ? "bg-intact/10 text-intact ring-intact/30"
                      : "bg-degraded/10 text-degraded ring-degraded/30"
                  }`}
                >
                  {icc.status}
                </span>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-medium">Isolation points</p>
                <div className="space-y-1">
                  {icc.isolationPoints.map((pt) => (
                    <div
                      key={pt.id}
                      className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 font-mono text-xs ${
                        pt.tag === "44-XV-118"
                          ? "border-degraded/50 bg-degraded/10 text-degraded"
                          : "border-border bg-surface-2 text-muted-foreground"
                      }`}
                    >
                      {pt.tag === "44-XV-118" && <AlertTriangle className="size-3 shrink-0" />}
                      <span>{pt.tag}</span>
                      <span className="truncate text-[10px]">— {pt.description}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to="/t2/icc"
                search={{ id: icc.id }}
                className="inline-flex items-center gap-1 text-xs text-primary underline-offset-4 hover:underline"
              >
                View full ICC detail <ArrowRight className="size-3" />
              </Link>
            </div>
          ))}
        </div>

        {/* Resolution options */}
        <div className="panel p-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <GitMerge className="size-4 text-primary" />
            <p className="text-sm font-semibold">Conflict resolution options</p>
          </div>
          <div className="mt-4 space-y-3">
            {[
              {
                label: "Option A — Sequence the jobs",
                detail: "Complete ICC-2026-0423 (E-4410 tube bundle pull) first, restore valve 44-XV-118, then raise a new ICC for ICC-2026-0431 (F-4401 filter element).",
                recommended: true,
              },
              {
                label: "Option B — Combine into a single ICC",
                detail: "Issue a single combined isolation certificate covering both jobs under the same isolation boundary. Requires revalidation of both PSF#1 checks under the combined scope.",
                recommended: false,
              },
              {
                label: "Option C — Provide alternative isolation route for ICC-2026-0431",
                detail: "Identify an alternative upstream isolation point that does not include 44-XV-118, then raise a revised ICC-2026-0431 with the new boundary.",
                recommended: false,
              },
            ].map((opt) => (
              <div
                key={opt.label}
                className={`flex items-start gap-3 rounded-xl border p-4 ${
                  opt.recommended ? "border-primary/40 bg-primary/5" : "border-border bg-surface-2"
                }`}
              >
                {opt.recommended ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                ) : (
                  <div className="mt-1 size-4 shrink-0 rounded-full border-2 border-border" />
                )}
                <div className="flex-1">
                  <p className="text-xs font-medium">
                    {opt.label}
                    {opt.recommended && (
                      <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[10px] text-primary">
                        Recommended
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{opt.detail}</p>
                </div>
                <button
                  onClick={() => toast(`${opt.label} — escalated to isolation authority (simulated)`)}
                  className="shrink-0 rounded-lg border border-border bg-background px-3 py-1.5 text-xs hover:border-primary/50 hover:text-primary"
                >
                  Escalate
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Indirect conflict explanation */}
        <div className="panel border-border bg-surface-2 p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            About indirect conflicts
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            An <strong className="text-foreground">indirect conflict</strong> occurs when two jobs do not share an isolation point but affect the same process segment, making it impossible to safely depressurise or prove gas-free both simultaneously. For example, if ICC-2026-0412 (K-2401 seal overhaul) and a hypothetical upstream filter job both required the Train 2 fuel gas header to be fully depressurised but from opposite ends, the simultaneous isolation boundary would be invalid. The IOSP system flags these by modelling the process flow topology against active isolation boundaries — no indirect conflicts are currently detected.
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Conflict detection is automated · High confidence · no human action is taken automatically · all resolutions require isolation-authority sign-off.
        </p>
      </div>
    </AppShell>
  );
}
