import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/iosp/AppShell";
import {
  SectionHeading,
  StatusPill,
  ConfidenceBadge,
  CitationChip,
  AiThinking,
} from "@/components/iosp/primitives";
import { BRIEFING_ITEMS, SCES } from "@/lib/mockData";
import { aiDelay } from "@/lib/aiSimulator";

export const Route = createFileRoute("/t1/briefing")({
  head: () => ({
    meta: [
      { title: "Daily Barrier Health Briefing — Prosafe IOSP" },
      {
        name: "description",
        content:
          "Auto-generated morning briefing listing every degraded or absent safety barrier with source, days overdue and recommended action.",
      },
      { property: "og:title", content: "Daily Barrier Health Briefing — Prosafe IOSP" },
      {
        property: "og:description",
        content: "Every line cited to its source system, with a confidence score attached.",
      },
    ],
  }),
  component: Briefing,
});

function Briefing() {
  const [busy, setBusy] = useState(true);
  const unassessed = SCES.filter((s) => s.state === "Unassessed");

  async function generate() {
    setBusy(true);
    await aiDelay(1400);
    setBusy(false);
  }

  useEffect(() => {
    void generate();
  }, []);

  return (
    <AppShell>
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading
          title="Daily Barrier Health Briefing"
          subtitle="Generated 06:40 WAT · BT-19 Fuel Gas System · synthesised from Omnisafe, SAP PM, Credo RBI and EoSR"
          right={
            <button
              onClick={() => {
                void generate();
                toast("Regenerating briefing from current evidence…");
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
            >
              <RefreshCw className="size-3.5" /> Regenerate
            </button>
          }
        />

        {busy ? (
          <div className="panel p-6">
            <AiThinking lines={5} />
          </div>
        ) : (
          <div className="space-y-4 rise-in">
            <div className="panel p-5">
              <p className="text-sm leading-relaxed">
                Overnight, BT-19 barrier health is <span className="text-absent">not fully credited</span>. Two
                barriers are ABSENT on threat line 14 (Train 2) and {BRIEFING_ITEMS.length - 2} are DEGRADED
                across Trains 1–3. Two SCEs remain UNASSESSED — insufficient evidence to classify, and the
                system will not guess. Priority for this shift: OMN-BT19-014, open at High criticality and 487
                days overdue.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <ConfidenceBadge level="High" />
                <CitationChip citation={{ system: "Omnisafe", ref: "OMN-BT19-014", age: "4h ago" }} />
                <CitationChip citation={{ system: "SAP PM", ref: "BT-19 SCE set", age: "12m ago" }} />
              </div>
            </div>

            <div className="panel overflow-hidden">
              <div className="max-w-full overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-surface-2 text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">SCE tag</th>
                      <th className="px-3 py-2 font-medium">SCA type</th>
                      <th className="px-3 py-2 font-medium">State</th>
                      <th className="px-3 py-2 font-medium">Source</th>
                      <th className="px-3 py-2 font-medium">Days overdue</th>
                      <th className="px-3 py-2 font-medium">Recommended action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BRIEFING_ITEMS.map((s) => (
                      <tr key={s.id} className="border-t border-border">
                        <td className="px-3 py-2 font-mono text-xs">{s.tag}</td>
                        <td className="px-3 py-2 text-xs">{s.scaType}</td>
                        <td className="px-3 py-2">
                          <StatusPill state={s.state} />
                        </td>
                        <td className="px-3 py-2 font-mono text-[11px] text-muted-foreground">
                          {s.source}
                        </td>
                        <td className="px-3 py-2 font-mono text-xs tabular">
                          {s.daysOverdue ?? "—"}
                        </td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">
                          {s.state === "Absent"
                            ? "Escalate OMN-BT19-014 to plant leadership; raise acceptance form or expedite install."
                            : "Schedule the outstanding SCA within the current rotation; confirm compensating measures."}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel p-5">
              <h2 className="text-sm font-semibold">Unassessed — will not guess</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                These SCEs have no Performance Standard linkage; classification is withheld and routed for
                human confirmation rather than inferred.
              </p>
              <ul className="mt-3 space-y-2">
                {unassessed.map((s) => (
                  <li
                    key={s.id}
                    className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface-2 px-3 py-2"
                  >
                    <span className="font-mono text-xs">{s.tag}</span>
                    <StatusPill state={s.state} />
                    <span className="text-xs text-muted-foreground">{s.lastEvidence}</span>
                    <span className="ml-auto">
                      <ConfidenceBadge level="Low" queued />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
