import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Database, Sparkles, Workflow } from "lucide-react";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading } from "@/components/iosp/primitives";
import { ChatConversation } from "@/components/iosp/FloatingChat";
import { T1_CHAT_SUGGESTIONS } from "@/lib/mockData";
import { askChat, resetChat } from "@/lib/chatStore";

export const Route = createFileRoute("/intelligence")({
  head: () => ({
    meta: [
      { title: "ProSafe Intelligence — Prosafe IOSP" },
      {
        name: "description",
        content:
          "Conversational assistant over T1 Barrier Visibility — grounded, cited, confidence-scored. Simulated demo data.",
      },
    ],
  }),
  component: IntelligencePage,
});

const CONNECTED_SOURCES = [
  { system: "Omnisafe", role: "Bow-tie threats, remedial actions" },
  { system: "SAP PM", role: "Work orders, certification status" },
  { system: "Barrier Register", role: "SCE definitions, ownership" },
  { system: "Isolation Register", role: "ICCs, PSF#1 gate status" },
  { system: "EoSR", role: "Field entries, shift narrative" },
  { system: "STP Register", role: "Shift performance context" },
];

function IntelligencePage() {
  const router = useRouter();

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] space-y-5">
        <SectionHeading
          title="ProSafe Intelligence"
          subtitle="Conversational assistant · grounded, cited, confidence-scored across the IOSP suite"
          right={
            <button
              onClick={() => router.history.back()}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> Back
            </button>
          }
        />

        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="panel flex h-[640px] flex-col overflow-hidden">
            <ChatConversation compact={false} />
          </div>

          <div className="space-y-4">
            <div className="panel p-4">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="size-4 text-primary" /> Try asking
              </h2>
              <div className="flex flex-wrap gap-2">
                {T1_CHAT_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => void askChat(s)}
                    className="rounded-full border border-border bg-surface-2 px-3 py-1 text-left text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={() => resetChat()}
                className="mt-3 text-xs text-muted-foreground underline decoration-dotted hover:text-foreground"
              >
                Clear conversation
              </button>
            </div>

            <div className="panel p-4">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Database className="size-4 text-primary" /> Connected sources
              </h2>
              <ul className="space-y-2">
                {CONNECTED_SOURCES.map((s) => (
                  <li key={s.system} className="flex items-start justify-between gap-2 text-xs">
                    <span className="font-mono text-foreground/80">{s.system}</span>
                    <span className="text-right text-muted-foreground">{s.role}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-md border border-degraded/40 bg-degraded/10 px-2 py-1.5 font-mono text-[11px] text-degraded">
                DEMO — answers are pattern-matched against a fixed demo dataset, not live systems.
              </p>
            </div>

            <div className="panel p-4">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Workflow className="size-4 text-primary" /> How this works in production
              </h2>
              <p className="text-xs leading-relaxed text-muted-foreground">
                This demo matches questions against a small curated answer set. A production
                deployment would run retrieval-augmented generation instead: ingest Omnisafe,
                SAP PM, EoSR and the STP Register, chunk and embed the records, retrieve the
                relevant evidence per question, and ground the model's answer in that evidence —
                every claim still tied to a citation and a confidence score. Nothing would act or
                write back on its own; the human sign-off gate stays in place, same as every other
                AI surface in this suite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
