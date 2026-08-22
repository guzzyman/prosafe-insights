import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  CheckCircle2,
  XOctagon,
  Clock,
  AlertTriangle,
  Sparkles,
  ChevronLeft,
  FileCheck2,
  User,
} from "lucide-react";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading, ConfidenceBadge, AiThinking } from "@/components/iosp/primitives";
import { ICCS, type IccRecord, type ComponentStatus, type Psf1Status } from "@/lib/mockData";
import { aiDelay } from "@/lib/aiSimulator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/t2/icc")({
  validateSearch: (s: Record<string, unknown>) => ({
    id: typeof s.id === "string" ? s.id : "ICC-2026-0412",
  }),
  head: () => ({ meta: [{ title: "ICC Detail — Prosafe IOSP" }] }),
  component: IccDetail,
});

type ChipStatus = ComponentStatus | Psf1Status;

const chipStyle: Record<string, string> = {
  Confirmed: "bg-intact/10 text-intact ring-intact/30",
  Pass: "bg-intact/10 text-intact ring-intact/30",
  Pending: "bg-degraded/10 text-degraded ring-degraded/30",
  Blocked: "bg-absent/10 text-absent ring-absent/30",
  "N/A": "bg-muted/60 text-muted-foreground ring-border/60",
};

function Chip({ label, value }: { label: string; value: ChipStatus }) {
  const style = chipStyle[value] ?? "bg-muted text-muted-foreground ring-border";
  const icon =
    value === "Confirmed" || value === "Pass" ? <CheckCircle2 className="size-3" /> :
    value === "Blocked" ? <XOctagon className="size-3" /> :
    value === "Pending" ? <Clock className="size-3" /> : null;
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <span className={cn("inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-xs ring-1", style)}>
        {icon} {value}
      </span>
    </div>
  );
}

const WORK_ORDER_TEXT =
  "K-2401 dry-gas seal overhaul — process isolation required. NDE bearing vibration +18% over 4 shifts, seal-gas filter dP alarms x2 prior to shutdown. Compressor to be depressurised, purged and proven gas-free before maintenance access.";

function IccDetail() {
  const { id } = Route.useSearch();
  const icc: IccRecord = ICCS.find((x) => x.id === id) ?? ICCS[0];
  const [draftVisible, setDraftVisible] = useState(false);
  const [draftBusy, setDraftBusy] = useState(false);
  const [draftText, setDraftText] = useState<string | null>(null);
  const [workOrder, setWorkOrder] = useState(
    icc.id === "ICC-2026-0412" ? WORK_ORDER_TEXT : icc.jobDescription,
  );

  async function generateDraft() {
    setDraftBusy(true);
    setDraftVisible(true);
    setDraftText(null);
    await aiDelay(1400);
    setDraftText(
      icc.id === "ICC-2026-0412"
        ? `ISOLATION CERTIFICATE — AI DRAFT\n\nEquipment: ${icc.equipment} | ${icc.title}\nUnit: ${icc.unit} | Prepared: ${icc.preparedBy}\n\nAPPLIED MINIMUM ISOLATION STANDARD: PSF#1 Rev 6 — Two independent barriers required on all process lines.\n\nAUTO-GENERATED SPADE LIST:\n• SP-K2401-01 — Suction line, 8\" 600# ANSI, spade mass ≈ 18 kg\n• SP-K2401-02 — Discharge line, 6\" 600# ANSI, spade mass ≈ 12 kg\n\nELECTRICAL ISOLATION: MCC breaker CB-K2401, Smithlock Ref CL-K2401-01, isolation confirmed by EIC.\n\nDECONTAMINATION: Purge to atmospheric via drain connection DN-K2401-PURGE. Gas-free proving required before entry.\n\nPSF#1 COMPLIANCE CHECK: PASS — Two independent barriers confirmed on all hydrocarbon-bearing lines (valve + spade on suction and discharge). Human review and sign-off required before work commencement.\n\n— AI drafts, humans approve. This draft is not a signed certificate.`
        : `ISOLATION CERTIFICATE — AI DRAFT\n\nEquipment: ${icc.equipment} | ${icc.title}\nUnit: ${icc.unit}\n\n${icc.psf1 === "Blocked" ? "⚠ PSF#1 COMPLIANCE CHECK: BLOCKED — " + (icc.psf1Note ?? "Second barrier required.") : "AI-generated isolation draft. Review all isolation points before proceeding."}\n\n— AI drafts, humans approve. This draft requires human review.`,
    );
    setDraftBusy(false);
  }

  const isPsf1Blocked = icc.psf1 === "Blocked";

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] space-y-5">
        <div className="flex items-center gap-3">
          <Link
            to="/t2"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-3.5" /> ICC Dashboard
          </Link>
        </div>

        <SectionHeading
          title={icc.id}
          subtitle={icc.title}
          right={
            <select
              aria-label="Select ICC"
              value={id}
              onChange={(e) => {
                const next = ICCS.find((x) => x.id === e.target.value);
                if (next) window.history.pushState(null, "", `/t2/icc?id=${next.id}`);
                window.location.reload();
              }}
              className="h-9 rounded-lg border border-border bg-surface-2 px-2 font-mono text-xs"
            >
              {ICCS.map((x) => (
                <option key={x.id} value={x.id}>{x.id} — {x.equipment}</option>
              ))}
            </select>
          }
        />

        {/* One-screen component status strip */}
        <div className={cn(
          "panel p-5",
          isPsf1Blocked && "border-absent/40 bg-absent/5",
          icc.conflictWith && "border-degraded/40 bg-degraded/5",
        )}>
          <p className="mb-4 text-xs uppercase tracking-wide text-muted-foreground">
            Component status — isolation gates
          </p>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-7">
            <Chip label="Mechanical" value={icc.mechanical} />
            <Chip label="Spade/Blind" value={icc.spade} />
            <Chip label="Cable lock" value={icc.cableLock} />
            <Chip label="Electrical" value={icc.electrical} />
            <Chip label="Decon" value={icc.decon} />
            <Chip label="Proving" value={icc.proving} />
            <Chip label="PSF#1" value={icc.psf1} />
          </div>

          {isPsf1Blocked && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-absent/50 bg-absent/10 p-4">
              <XOctagon className="mt-0.5 size-5 shrink-0 text-absent" />
              <div>
                <p className="text-sm font-semibold text-absent">Cannot proceed to sign-off — PSF#1 gate active</p>
                <p className="mt-1 text-xs text-muted-foreground">{icc.psf1Note}</p>
                <p className="mt-2 font-mono text-[11px] text-absent">
                  This gate cannot be bypassed in the system. AI drafts, humans approve. A second physical barrier must be confirmed in the field.
                </p>
              </div>
            </div>
          )}

          {icc.conflictWith && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-degraded/50 bg-degraded/10 p-4">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-degraded" />
              <div>
                <p className="text-sm font-semibold text-degraded">Cross-ICC conflict detected</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Isolation point <span className="font-mono">44-XV-118</span> is also claimed by{" "}
                  <span className="font-mono">{icc.conflictWith}</span>. These two jobs must not proceed
                  concurrently. See{" "}
                  <Link to="/t2/conflicts" className="text-primary underline-offset-4 hover:underline">
                    Conflict Detection
                  </Link>{" "}
                  for details.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Isolation points table */}
        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold">Isolation Points</p>
            <span className="font-mono text-xs text-muted-foreground">{icc.isolationPoints.length} points</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead className="bg-surface-2 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">Tag</th>
                  <th className="px-4 py-2 font-medium">Type</th>
                  <th className="px-4 py-2 font-medium">Description</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {icc.isolationPoints.map((pt) => (
                  <tr key={pt.id} className="border-t border-border">
                    <td className="px-4 py-2 font-mono text-xs">{pt.tag}</td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">{pt.type}</td>
                    <td className="px-4 py-2 text-xs">{pt.description}</td>
                    <td className="px-4 py-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[11px] ring-1",
                          pt.status === "Closed" || pt.status === "Locked" || pt.status === "Inserted"
                            ? "bg-intact/10 text-intact ring-intact/30"
                            : pt.status === "Pending"
                            ? "bg-degraded/10 text-degraded ring-degraded/30"
                            : "bg-muted text-muted-foreground ring-border",
                        )}
                      >
                        {pt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI ICC Drafting */}
        <div className="panel p-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Sparkles className="size-4 text-primary" />
            <p className="text-sm font-semibold">GenAI ICC Drafting</p>
            <ConfidenceBadge level="Medium" />
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium">Work order / job description</label>
            <textarea
              value={workOrder}
              onChange={(e) => setWorkOrder(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-border bg-surface-2 p-3 font-mono text-xs leading-relaxed outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
            />
            <button
              onClick={() => void generateDraft()}
              disabled={draftBusy}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
            >
              <Sparkles className="size-3.5" />
              {draftBusy ? "Generating…" : "Generate isolation certificate draft"}
            </button>
          </div>

          {draftVisible && (
            <div className="mt-4 rounded-xl border border-border bg-surface-2 p-4 rise-in">
              {draftBusy ? (
                <AiThinking lines={5} />
              ) : draftText ? (
                <>
                  <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground">
                    {draftText}
                  </pre>
                  {!isPsf1Blocked && (
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3">
                      <button
                        onClick={() => toast.success("Draft approved for human sign-off (simulated). The certificate is NOT active until physically signed.")}
                        className="inline-flex items-center gap-2 rounded-lg bg-intact/15 px-3 py-2 text-xs font-medium text-intact ring-1 ring-intact/30 hover:bg-intact/25"
                      >
                        <FileCheck2 className="size-3.5" /> Human review &amp; approve
                      </button>
                      <button
                        onClick={() => toast("Draft sent to isolation authority for countersignature (simulated)")}
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <User className="size-3.5" /> Send to isolation authority
                      </button>
                    </div>
                  )}
                  {isPsf1Blocked && (
                    <p className="mt-3 rounded-lg border border-absent/40 bg-absent/10 px-3 py-2 font-mono text-xs text-absent">
                      Sign-off is blocked by the PSF#1 gate. The draft is available for review but cannot be approved until the second barrier is confirmed.
                    </p>
                  )}
                </>
              ) : null}
            </div>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            AI drafts isolation certificates from free-text work orders. The human isolation authority reviews and signs every certificate. No isolation is active until physically verified and signed.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
