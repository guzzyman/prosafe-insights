import { useEffect, useRef, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { MessageCircle, Maximize2, X, Send, ChevronDown, Sparkles } from "lucide-react";
import { T1_CHAT_SUGGESTIONS } from "@/lib/mockData";
import { askChat, closeChat, openChat, useChatStore, type ChatTurn } from "@/lib/chatStore";
import { AiThinking, ConfidenceBadge, CitationChip } from "./primitives";
import { cn } from "@/lib/utils";

function ChatTurnView({ turn }: { turn: ChatTurn }) {
  const [showEvidence, setShowEvidence] = useState(false);
  return (
    <div className="space-y-2">
      <div className="ml-8 rounded-xl rounded-tr-sm bg-primary/12 px-3 py-2 text-sm text-foreground">
        {turn.question}
      </div>
      <div className="mr-4 rounded-xl rounded-tl-sm border border-border bg-surface-2 px-3 py-2.5">
        {turn.status === "thinking" || !turn.answer ? (
          <AiThinking lines={2} />
        ) : (
          <div className="rise-in">
            <p className="text-sm leading-relaxed">{turn.answer.answer}</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <ConfidenceBadge level={turn.answer.confidence} />
              {turn.answer.citations.map((c) => (
                <CitationChip key={c.ref} citation={c} />
              ))}
            </div>
            <button
              onClick={() => setShowEvidence((v) => !v)}
              className="mt-2 inline-flex items-center gap-1 text-xs text-primary"
            >
              <ChevronDown className={cn("size-3.5 transition", showEvidence && "rotate-180")} />
              {showEvidence ? "Hide evidence" : "View evidence"}
            </button>
            {showEvidence && (
              <dl className="mt-2 space-y-1.5 border-t border-border pt-2">
                {turn.answer.evidence.map((e) => (
                  <div key={e.label} className="grid gap-0.5 sm:grid-cols-[140px_1fr]">
                    <dt className="font-mono text-[11px] text-muted-foreground">{e.label}</dt>
                    <dd className="text-xs">{e.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ChatConversation({ compact = true }: { compact?: boolean }) {
  const { turns } = useChatStore();
  const [draft, setDraft] = useState("");
  const busy = turns.some((t) => t.status === "thinking");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turns]);

  function submit(question: string) {
    const trimmed = question.trim();
    if (!trimmed || busy) return;
    setDraft("");
    void askChat(trimmed);
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div ref={scrollRef} className={cn("min-h-0 flex-1 space-y-4 overflow-y-auto", compact ? "p-3" : "p-4")}>
        {turns.length === 0 && (
          <div className="space-y-3">
            <div className="mr-4 rounded-xl rounded-tl-sm border border-border bg-surface-2 px-3 py-2.5 text-sm">
              Hi — I'm ProSafe Intelligence. This demo is focused on{" "}
              <span className="text-primary">T1 Barrier Visibility</span> — BT-19 status, SCEs,
              overdue actions and your barrier owner portal — but I'm wired into the same grounded
              knowledge base as the header search, so LOTO, compliance and shift-performance
              questions work too. Try a question below.
            </div>
            <div className="flex flex-wrap gap-2">
              {T1_CHAT_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1 text-left text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {turns.map((t) => (
          <ChatTurnView key={t.id} turn={t} />
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(draft);
        }}
        className={cn("flex items-center gap-2 border-t border-border", compact ? "p-3" : "p-4")}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask about BT-19, SCEs, overdue actions…"
          aria-label="Ask ProSafe Intelligence about T1"
          disabled={busy}
          className="h-9 flex-1 rounded-lg border border-border bg-surface-2 px-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/25 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={busy || !draft.trim()}
          aria-label="Send"
          className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition disabled:opacity-40"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}

export function FloatingChat() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { isOpen, turns } = useChatStore();

  if (pathname === "/intelligence") return null;

  return (
    <>
      {isOpen && (
        <div className="panel fixed bottom-24 right-4 z-50 flex h-[560px] max-h-[70vh] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rise-in sm:right-6">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary">
              <Sparkles className="size-4" />
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold">ProSafe Intelligence</p>
              <p className="truncate text-[11px] text-muted-foreground">Grounded · cited · confidence-scored</p>
            </div>
            <span className="ml-auto hidden shrink-0 rounded-md border border-degraded/40 bg-degraded/10 px-2 py-0.5 font-mono text-[10px] text-degraded sm:inline">
              DEMO
            </span>
            <button
              onClick={() => navigate({ to: "/intelligence" })}
              aria-label="Expand ProSafe Intelligence"
              className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition hover:bg-surface-2 hover:text-foreground"
            >
              <Maximize2 className="size-4" />
            </button>
            <button
              onClick={() => closeChat()}
              aria-label="Close ProSafe Intelligence"
              className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition hover:bg-surface-2 hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
          <ChatConversation compact />
        </div>
      )}

      <button
        onClick={() => (isOpen ? closeChat() : openChat())}
        aria-label={isOpen ? "Close ProSafe Intelligence chat" : "Open ProSafe Intelligence chat"}
        className="fixed bottom-6 right-4 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition hover:scale-105 sm:right-6"
      >
        {isOpen ? <X className="size-5" /> : <MessageCircle className="size-6" />}
        {!isOpen && turns.length === 0 && (
          <span className="live-dot absolute right-0 top-0 size-3 rounded-full bg-intact ring-2 ring-background" aria-hidden />
        )}
      </button>
    </>
  );
}
