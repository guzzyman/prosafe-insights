import { cn } from "@/lib/utils";
import type { BarrierState, Confidence, Citation } from "@/lib/mockData";
import { ShieldCheck, AlertTriangle, XOctagon, HelpCircle, FileText } from "lucide-react";

const stateStyles: Record<BarrierState, { dot: string; text: string; bg: string; ring: string }> = {
  Intact: { dot: "bg-intact", text: "text-intact", bg: "bg-intact/10", ring: "ring-intact/30" },
  Degraded: { dot: "bg-degraded", text: "text-degraded", bg: "bg-degraded/10", ring: "ring-degraded/30" },
  Absent: { dot: "bg-absent", text: "text-absent", bg: "bg-absent/10", ring: "ring-absent/30" },
  Unassessed: { dot: "bg-unassessed", text: "text-unassessed", bg: "bg-unassessed/10", ring: "ring-unassessed/30" },
};

export const stateIcon: Record<BarrierState, typeof ShieldCheck> = {
  Intact: ShieldCheck,
  Degraded: AlertTriangle,
  Absent: XOctagon,
  Unassessed: HelpCircle,
};

export function StatusPill({
  state,
  label,
  className,
}: {
  state: BarrierState;
  label?: string;
  className?: string;
}) {
  const s = stateStyles[state];
  const Icon = stateIcon[state];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1",
        s.bg,
        s.text,
        s.ring,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", s.dot)} aria-hidden />
      <Icon className="size-3" aria-hidden />
      {label ?? state}
    </span>
  );
}

export function stateColorVar(state: BarrierState) {
  return `var(--${state.toLowerCase()})`;
}

const confStyles: Record<Confidence, string> = {
  High: "bg-intact/12 text-intact ring-intact/30",
  Medium: "bg-degraded/12 text-degraded ring-degraded/30",
  Low: "bg-unassessed/15 text-unassessed ring-unassessed/40",
};

export function ConfidenceBadge({ level, queued }: { level: Confidence; queued?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ring-1",
          confStyles[level],
        )}
      >
        <span className="size-1.5 rounded-full bg-current" aria-hidden />
        {level} confidence
      </span>
      {(queued || level === "Low") && (
        <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
          queued for human review
        </span>
      )}
    </span>
  );
}

export function CitationChip({ citation }: { citation: Citation }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
      <FileText className="size-3 text-primary" aria-hidden />
      <span className="text-foreground/80">{citation.system}</span>
      <span aria-hidden>·</span>
      {citation.ref}
      <span aria-hidden>·</span>
      {citation.age}
    </span>
  );
}

export function SectionHeading({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function AiThinking({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2" role="status" aria-label="AI reasoning">
      <p className="font-mono text-xs text-primary">reasoning over grounded sources…</p>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="ai-shimmer h-3 rounded"
          style={{ width: `${100 - i * 12}%` }}
        />
      ))}
    </div>
  );
}
