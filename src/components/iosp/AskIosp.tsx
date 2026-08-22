import { useState } from "react";
import { Search, Sparkles, ChevronDown, X } from "lucide-react";
import { ASK_ANSWERS, type AskAnswer } from "@/lib/mockData";
import { askIosp, aiDelay } from "@/lib/aiSimulator";
import { AiThinking, ConfidenceBadge, CitationChip } from "./primitives";
import { cn } from "@/lib/utils";

export function AskIosp({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<AskAnswer | null>(null);
  const [showEvidence, setShowEvidence] = useState(false);

  async function run(question: string) {
    setQ(question);
    setOpen(true);
    setBusy(true);
    setResult(null);
    setShowEvidence(false);
    await aiDelay(1200);
    setResult(askIosp(question));
    setBusy(false);
  }

  return (
    <div className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) void run(q.trim());
        }}
        className="relative"
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Ask IOSP — e.g. which BT-19 barriers are Absent?"
          aria-label="Ask IOSP natural language query"
          className={cn(
            "w-full rounded-xl border border-border bg-surface-2 pl-9 pr-24 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/25",
            compact ? "h-9" : "h-10",
          )}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary/12 px-2 py-1 font-mono text-[11px] text-primary">
          <Sparkles className="mr-1 inline size-3" />
          Ask IOSP
        </span>
      </form>

      {open && (
        <>
          <button
            className="fixed inset-0 z-40 cursor-default bg-background/40"
            aria-label="Close Ask IOSP"
            onClick={() => setOpen(false)}
          />
          <div className="panel absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-[70vh] overflow-y-auto p-4 rise-in">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Grounded answers · cited · confidence-scored
              </p>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="size-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {ASK_ANSWERS.map((a) => (
                <button
                  key={a.q}
                  onClick={() => void run(a.q)}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
                >
                  {a.q}
                </button>
              ))}
            </div>

            {busy && (
              <div className="mt-4 rounded-xl border border-border bg-surface-2 p-4">
                <AiThinking />
              </div>
            )}

            {result && !busy && (
              <div className="mt-4 rounded-xl border border-border bg-surface-2 p-4 rise-in">
                <p className="text-sm leading-relaxed">{result.answer}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <ConfidenceBadge level={result.confidence} />
                  {result.citations.map((c) => (
                    <CitationChip key={c.ref} citation={c} />
                  ))}
                </div>
                <button
                  onClick={() => setShowEvidence((v) => !v)}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-primary"
                >
                  <ChevronDown
                    className={cn("size-3.5 transition", showEvidence && "rotate-180")}
                  />
                  {showEvidence ? "Hide evidence" : "View evidence"}
                </button>
                {showEvidence && (
                  <dl className="mt-3 space-y-2 border-t border-border pt-3">
                    {result.evidence.map((e) => (
                      <div key={e.label} className="grid gap-1 sm:grid-cols-[180px_1fr]">
                        <dt className="font-mono text-xs text-muted-foreground">{e.label}</dt>
                        <dd className="text-xs">{e.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
