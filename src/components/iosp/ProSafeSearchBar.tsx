import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { T1_CHAT_SUGGESTIONS } from "@/lib/mockData";
import { askChat, openChat } from "@/lib/chatStore";
import { cn } from "@/lib/utils";

export function ProSafeSearchBar({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  function ask(question: string) {
    setQ("");
    setOpen(false);
    openChat();
    void askChat(question);
  }

  return (
    <div className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) ask(q.trim());
        }}
        className="relative"
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Ask ProSafe Intelligence — e.g. which BT-19 barriers are Absent?"
          aria-label="Ask ProSafe Intelligence a question"
          className={cn(
            "w-full rounded-xl border border-border bg-surface-2 pl-9 pr-32 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/25",
            compact ? "h-9" : "h-10",
          )}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary/12 px-2 py-1 font-mono text-[11px] text-primary">
          <Sparkles className="mr-1 inline size-3" />
          ProSafe Intelligence
        </span>
      </form>

      {open && (
        <div className="panel absolute left-0 right-0 top-[calc(100%+8px)] z-50 p-3 rise-in">
          <p className="mb-2 px-1 text-xs uppercase tracking-wide text-muted-foreground">
            Try asking
          </p>
          <div className="flex flex-wrap gap-2">
            {T1_CHAT_SUGGESTIONS.map((s) => (
              <button
                key={s}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => ask(s)}
                className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
