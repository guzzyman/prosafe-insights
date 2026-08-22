import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Send, Wifi, WifiOff, Sparkles, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading, ConfidenceBadge, AiThinking } from "@/components/iosp/primitives";
import { EOSR_SECTIONS, type FieldEntry } from "@/lib/mockData";
import { aiDelay } from "@/lib/aiSimulator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/t3/")({
  head: () => ({ meta: [{ title: "Field Capture — Prosafe IOSP" }] }),
  component: FieldCapture,
});

interface RoutingResult {
  sections: number[];
  tag: string | null;
  observationType: string;
  confidence: "High" | "Medium" | "Low";
  escalate: boolean;
  escalateReason?: string;
}

function parseFieldNote(note: string): RoutingResult {
  const low = note.toLowerCase();
  const sections: number[] = [];
  let tag: string | null = null;
  let observationType = "Routine";
  let escalate = false;
  let escalateReason: string | undefined;

  // Extract tag
  const tagMatch = note.match(/\b([A-Z0-9]{2,4}-[A-Z0-9A-Z/-]{2,10})\b/);
  if (tagMatch) tag = tagMatch[1];

  // Route to sections
  if (low.includes("alarm") || low.includes("high") || low.includes("trip")) {
    sections.push(5);
    observationType = "Alarm";
  }
  if (low.includes("temp") || low.includes("vibrat") || low.includes("pressure") || low.includes("bearing")) {
    sections.push(3, 11);
    observationType = "Defect";
  }
  if (low.includes("permit") || low.includes("icc") || low.includes("isolation") || low.includes("overhaul")) {
    sections.push(4);
    observationType = "Activity";
  }
  if (low.includes("safety") || low.includes("sce") || low.includes("barrier") || low.includes("omnisafe")) {
    sections.push(7);
    observationType = "Safety";
  }
  if (low.includes("production") || low.includes("lng") || low.includes("rate") || low.includes("output")) {
    sections.push(1, 10);
    observationType = "Optimisation";
  }
  if (low.includes("environmental") || low.includes("emission") || low.includes("discharge") || low.includes("flare")) {
    sections.push(8);
  }
  if (low.includes("inhibit") || low.includes("bypass")) {
    sections.push(6, 7);
  }
  if (low.includes("handover") || low.includes("shift") || low.includes("changeover")) {
    sections.push(9);
  }
  if (sections.length === 0) sections.push(3);
  const uniqueSections = [...new Set(sections)].sort((a, b) => a - b);

  // Escalation check
  const escalationTriggers = ["overdue", "absent", "blocked", "critical", "elevated", "rising", "above normal", "excursion", "alarm"];
  if (escalationTriggers.some((t) => low.includes(t))) {
    escalate = true;
    escalateReason = "Threshold keyword detected — supervisor review recommended.";
  }

  return {
    sections: uniqueSections,
    tag,
    observationType,
    confidence: sections.length >= 2 ? "High" : "Medium",
    escalate,
    escalateReason,
  };
}

const EXAMPLE_NOTES = [
  "P-201A bearing temp elevated ~24% above normal. A running / B standby. Maintenance flagged.",
  "E-4420 outlet temp reading 214°C — above 210°C normal. 44TICA-016 alarm noted. Cleared manually.",
  "44LIA-771 inhibited alarm reviewed. Proof test overdue. Raised SAP PM work order for scheduling.",
  "K-2401 isolated under ICC-2026-0412. Seal overhaul commenced. Work area barriered.",
];

function FieldCapture() {
  const [note, setNote] = useState("");
  const [offline, setOffline] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<RoutingResult | null>(null);
  const [escalate, setEscalate] = useState(false);
  const [submitted, setSubmitted] = useState<FieldEntry[]>([]);

  async function submit() {
    if (!note.trim()) return;
    setBusy(true);
    setResult(null);
    await aiDelay(900);
    const r = parseFieldNote(note);
    setResult(r);
    setEscalate(r.escalate);
    setBusy(false);
  }

  function confirm() {
    if (!result) return;
    const entry: FieldEntry = {
      id: `E-LIVE-${submitted.length + 1}`,
      timestamp: new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit" }).format(new Date()),
      author: "Demo user",
      role: "Operator",
      raw: note,
      sections: result.sections,
      tag: result.tag ?? undefined,
      observationType: result.observationType as FieldEntry["observationType"],
      escalated: escalate,
      confidence: result.confidence,
      offlineQueued: offline,
    };
    setSubmitted((prev) => [entry, ...prev]);
    toast.success(
      offline ? "Entry queued — will sync when connection restores" : "Entry submitted to EoSR",
      { description: `Routed to ${result.sections.map((s) => `§${s}`).join(", ")}` },
    );
    setNote("");
    setResult(null);
    setEscalate(false);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[900px] space-y-5">
        <div className="flex items-start justify-between gap-3">
          <SectionHeading
            title="T3 — Field Capture"
            subtitle="Type a natural-language field note — AI routes it to the correct EoSR sections"
          />
          <button
            onClick={() => setOffline((v) => !v)}
            aria-label="Toggle offline mode"
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition",
              offline
                ? "border-absent/50 bg-absent/10 text-absent"
                : "border-border bg-surface-2 text-muted-foreground hover:text-foreground",
            )}
          >
            {offline ? <WifiOff className="size-3.5" /> : <Wifi className="size-3.5" />}
            {offline ? "Offline — queued" : "Online"}
          </button>
        </div>

        {/* Entry form — tablet-styled */}
        <div className="panel p-5">
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Field observation — free text
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Describe what you observed, include equipment tags where possible…"
            rows={4}
            className="w-full rounded-xl border border-border bg-surface-2 p-4 text-sm leading-relaxed outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
          />

          {/* Example chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLE_NOTES.map((ex) => (
              <button
                key={ex}
                onClick={() => setNote(ex)}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
              >
                {ex.slice(0, 40)}…
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => void submit()}
              disabled={!note.trim() || busy}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
            >
              <Sparkles className="size-4" /> Analyse &amp; route
            </button>
            {offline && (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-absent/40 bg-absent/10 px-3 py-1.5 text-xs text-absent">
                <WifiOff className="size-3" /> Entry will be queued and synced on reconnect
              </span>
            )}
          </div>
        </div>

        {/* AI routing result */}
        {busy && (
          <div className="panel p-4">
            <AiThinking lines={3} />
          </div>
        )}

        {result && !busy && (
          <div className="panel space-y-4 p-5 rise-in">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold">AI routing result</p>
              <ConfidenceBadge level={result.confidence} />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-surface-2 p-3">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Routed sections</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {result.sections.map((s) => {
                    const sec = EOSR_SECTIONS.find((x) => x.id === s);
                    return (
                      <span
                        key={s}
                        className="rounded-full bg-primary/12 px-2 py-0.5 font-mono text-xs text-primary"
                        title={sec?.title}
                      >
                        §{s}
                      </span>
                    );
                  })}
                </div>
                <div className="mt-2 space-y-0.5">
                  {result.sections.map((s) => {
                    const sec = EOSR_SECTIONS.find((x) => x.id === s);
                    return sec ? (
                      <p key={s} className="text-[11px] text-muted-foreground">§{s} — {sec.title}</p>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-surface-2 p-3">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Equipment tag</p>
                {result.tag ? (
                  <p className="mt-1.5 font-mono text-sm text-primary">{result.tag}</p>
                ) : (
                  <p className="mt-1.5 text-xs text-muted-foreground">No tag extracted</p>
                )}
                <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">Observation type</p>
                <p className="mt-1 text-xs">{result.observationType}</p>
              </div>

              <div className="rounded-lg border border-border bg-surface-2 p-3">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Supervisor escalation</p>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="escalate"
                    checked={escalate}
                    onChange={(e) => setEscalate(e.target.checked)}
                    className="size-4 accent-primary"
                  />
                  <label htmlFor="escalate" className="text-xs">
                    Escalate to supervisor
                  </label>
                </div>
                {result.escalateReason && (
                  <p className="mt-1.5 flex items-start gap-1 text-[11px] text-degraded">
                    <AlertTriangle className="mt-0.5 size-3 shrink-0" />
                    {result.escalateReason}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-border pt-3">
              <button
                onClick={confirm}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                <Send className="size-4" /> {offline ? "Queue entry" : "Submit to EoSR"}
              </button>
              <button
                onClick={() => { setResult(null); setNote(""); }}
                className="rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                Discard
              </button>
            </div>
          </div>
        )}

        {/* Submitted entries this session */}
        {submitted.length > 0 && (
          <div className="panel p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Submitted this session ({submitted.length})
            </p>
            <div className="space-y-2">
              {submitted.map((e) => (
                <div key={e.id} className="flex items-start gap-3 rounded-lg border border-border bg-surface-2 px-3 py-2">
                  <span className="font-mono text-[11px] text-muted-foreground">{e.timestamp}</span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs">{e.raw}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {e.sections.map((s) => (
                        <span key={s} className="rounded-full bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary">§{s}</span>
                      ))}
                      {e.tag && <span className="rounded-full bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] ring-1 ring-border">{e.tag}</span>}
                      {e.offlineQueued && <span className="rounded-full bg-absent/10 px-1.5 py-0.5 font-mono text-[10px] text-absent ring-1 ring-absent/30">queued</span>}
                      {e.escalated && <span className="rounded-full bg-degraded/10 px-1.5 py-0.5 font-mono text-[10px] text-degraded ring-1 ring-degraded/30">escalated</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
