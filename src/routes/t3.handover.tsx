import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Sparkles, Clock, FileCheck2, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading, ConfidenceBadge, CitationChip, AiThinking } from "@/components/iosp/primitives";
import { HANDOVER_NOTES, type HandoverRole } from "@/lib/mockData";
import { aiDelay } from "@/lib/aiSimulator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/t3/handover")({
  head: () => ({ meta: [{ title: "Crew Change Handover — Prosafe IOSP" }] }),
  component: HandoverNote,
});

const ROLES: HandoverRole[] = ["Operator", "Supervisor", "HPSO"];

const roleDescription: Record<HandoverRole, string> = {
  Operator: "Field-level detail — equipment states, alarms, active permits",
  Supervisor: "Risk framing — what incoming supervisor needs to know and act on",
  HPSO: "Executive summary — major hazard exposures and integrity priorities",
};

function HandoverNote() {
  const [role, setRole] = useState<HandoverRole>("HPSO");
  const [busy, setBusy] = useState(false);
  const [generated, setGenerated] = useState(true);
  const [expandedCitations, setExpandedCitations] = useState<Record<string, boolean>>({});

  const note = HANDOVER_NOTES[role];

  async function regenerate() {
    setBusy(true);
    setGenerated(false);
    await aiDelay(1600);
    setGenerated(true);
    setBusy(false);
    toast.success(`Handover note regenerated — ${role} view`, {
      description: `${note.sentences.length} statements synthesised from ${new Set(note.sentences.map((s) => s.citation.system)).size} source systems`,
    });
  }

  function toggleCitation(id: string) {
    setExpandedCitations((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1100px] space-y-5">
        <SectionHeading
          title="AI Crew Change Handover Note"
          subtitle="Every statement is grounded in a cited source entry — click any sentence to see its evidence"
        />

        {/* Role selector + time saving callout */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="panel p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">View as</p>
            <div className="flex flex-col gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition",
                    role === r
                      ? "border-primary/60 bg-primary/8 text-foreground"
                      : "border-border bg-surface-2 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 size-4 shrink-0 rounded-full border-2 transition",
                      role === r ? "border-primary bg-primary" : "border-muted-foreground",
                    )}
                  />
                  <div>
                    <p className="text-sm font-medium">{r}</p>
                    <p className="text-[11px] text-muted-foreground">{roleDescription[r]}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="panel flex flex-col justify-between p-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Time saving</p>
              <div className="mt-3 flex items-end gap-3">
                <div className="text-center">
                  <p className="font-mono text-4xl tabular text-primary">18</p>
                  <p className="text-xs text-muted-foreground">min with AI</p>
                </div>
                <p className="mb-2 text-2xl text-muted-foreground/40">vs</p>
                <div className="text-center">
                  <p className="font-mono text-4xl tabular text-muted-foreground/60">2 hr</p>
                  <p className="text-xs text-muted-foreground">manual</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Based on 15 EoSR entries across 13 sections synthesised into {note.sentences.length} statements.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
              <button
                onClick={() => void regenerate()}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
              >
                <Sparkles className="size-3.5" /> Regenerate
              </button>
              <button
                onClick={() => toast.success("Handover note approved (simulated). 18 min vs ~2 hr manual review.")}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs hover:border-primary/40"
              >
                <FileCheck2 className="size-3.5" /> Approve &amp; sign off
              </button>
            </div>
          </div>
        </div>

        {/* Generated handover note */}
        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <p className="text-sm font-semibold">Crew Change Handover — {role} view</p>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <Clock className="size-3.5" />
              Generated {note.generatedAt}
            </div>
          </div>

          {busy ? (
            <div className="p-6">
              <AiThinking lines={6} />
            </div>
          ) : generated ? (
            <div className="p-5 rise-in">
              <ConfidenceBadge level="High" />
              <p className="mt-3 text-[11px] text-muted-foreground">
                Click any statement to expand its source citation.
              </p>

              <div className="mt-4 space-y-3">
                {note.sentences.map((sentence) => {
                  const isOpen = expandedCitations[sentence.id];
                  return (
                    <div
                      key={sentence.id}
                      className={cn(
                        "rounded-xl border p-3 transition",
                        sentence.watchpoint
                          ? "border-degraded/40 bg-degraded/5"
                          : "border-border bg-surface-2 hover:border-primary/30",
                      )}
                    >
                      <button
                        onClick={() => toggleCitation(sentence.id)}
                        className="flex w-full items-start gap-3 text-left"
                      >
                        {sentence.watchpoint && (
                          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-degraded" aria-hidden />
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-medium text-muted-foreground">{sentence.section}</span>
                            {isOpen ? (
                              <ChevronUp className="size-3.5 shrink-0 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
                            )}
                          </div>
                          <p className={cn("mt-1 text-sm leading-relaxed", sentence.watchpoint && "font-medium")}>
                            {sentence.text}
                          </p>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="mt-3 border-t border-border pt-2 rise-in">
                          <p className="mb-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">Source</p>
                          <CitationChip citation={sentence.citation} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Watchpoints section */}
              {note.watchpoints.length > 0 && (
                <div className="mt-6 rounded-xl border border-degraded/40 bg-degraded/8 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-degraded">
                    <AlertTriangle className="size-4" /> Watchpoints for incoming shift
                  </p>
                  <div className="mt-3 space-y-2">
                    {note.watchpoints.map((wp) => (
                      <div key={wp.tag} className="flex items-start gap-3">
                        <span className="mt-0.5 font-mono text-xs text-primary">{wp.tag}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs">{wp.description}</p>
                          <p className="mt-0.5 font-mono text-[11px] text-degraded">{wp.trend}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          AI synthesises · humans approve · every sentence cites its source · a narrative error cannot change operational records.
        </p>
      </div>
    </AppShell>
  );
}
