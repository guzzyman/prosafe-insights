import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading, StatusPill } from "@/components/iosp/primitives";
import { BOW_TIES } from "@/lib/mockData";

export const Route = createFileRoute("/t1/")({
  head: () => ({
    meta: [
      { title: "Major Hazard Status Board — Prosafe IOSP" },
      {
        name: "description",
        content:
          "Control-room status board showing live safety-barrier health across every major-hazard bow-tie in the LNG plant.",
      },
      { property: "og:title", content: "Major Hazard Status Board — Prosafe IOSP" },
      {
        property: "og:description",
        content: "Glanceable barrier health per bow-tie, colour and label coded, for CCR display.",
      },
    ],
  }),
  component: StatusBoard,
});

function StatusBoard() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="Major Hazard Status Board"
          subtitle="Barrier health per bow-tie · CCR display mode · refreshed every 60 s"
          right={
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
              <span className="live-dot size-1.5 rounded-full bg-intact" /> LIVE · auto-refresh
            </span>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {BOW_TIES.map((bt) => {
            const total = bt.intact + bt.degraded + bt.absent + bt.unassessed;
            const pct = (n: number) => (n / total) * 100;
            return (
              <Link
                key={bt.id}
                to={bt.id === "BT-19" ? "/t1/bt19" : "/t1"}
                className="panel block p-5 transition hover:border-primary/50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-xl">{bt.id}</p>
                    <p className="text-sm text-muted-foreground">{bt.name}</p>
                  </div>
                  <StatusPill state={bt.health} />
                </div>
                <p className="mt-3 font-mono text-[11px] text-muted-foreground">{bt.unit}</p>

                <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-muted">
                  <span className="bg-intact" style={{ width: `${pct(bt.intact)}%` }} />
                  <span className="bg-degraded" style={{ width: `${pct(bt.degraded)}%` }} />
                  <span className="bg-absent" style={{ width: `${pct(bt.absent)}%` }} />
                  <span className="bg-unassessed" style={{ width: `${pct(bt.unassessed)}%` }} />
                </div>

                <dl className="mt-3 grid grid-cols-4 gap-2 text-center font-mono text-xs">
                  <div>
                    <dt className="text-[10px] text-muted-foreground">Intact</dt>
                    <dd className="text-intact">{bt.intact}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] text-muted-foreground">Degr.</dt>
                    <dd className="text-degraded">{bt.degraded}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] text-muted-foreground">Absent</dt>
                    <dd className="text-absent">{bt.absent}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] text-muted-foreground">Unass.</dt>
                    <dd className="text-unassessed">{bt.unassessed}</dd>
                  </div>
                </dl>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
