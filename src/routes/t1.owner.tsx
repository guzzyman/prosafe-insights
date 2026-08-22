import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { BadgeCheck } from "lucide-react";
import { AppShell } from "@/components/iosp/AppShell";
import { SectionHeading, StatusPill } from "@/components/iosp/primitives";
import { OWNER_PORTAL } from "@/lib/mockData";

export const Route = createFileRoute("/t1/owner")({
  head: () => ({
    meta: [
      { title: "Barrier Owner Portal — Prosafe IOSP" },
      {
        name: "description",
        content:
          "Role view for barrier owners: safety critical activities due, acceptance-form sign-off status and qualification currency.",
      },
      { property: "og:title", content: "Barrier Owner Portal — Prosafe IOSP" },
      {
        property: "og:description",
        content: "SCAs due, acceptance forms and qualification currency for the Inspection Engineer role.",
      },
    ],
  }),
  component: OwnerPortal,
});

function OwnerPortal() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading
          title="Barrier Owner Portal"
          subtitle={`Role view · ${OWNER_PORTAL.role} · BT-19 Fuel Gas System`}
          right={
            <span className="inline-flex items-center gap-2 rounded-lg border border-intact/40 bg-intact/10 px-3 py-1.5 text-xs text-intact">
              <BadgeCheck className="size-4" /> Qualification {OWNER_PORTAL.qualification.status} · expires{" "}
              {OWNER_PORTAL.qualification.expires}
            </span>
          }
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="panel p-4">
            <h2 className="mb-3 text-sm font-semibold">Safety Critical Activities due</h2>
            <ul className="space-y-2">
              {OWNER_PORTAL.scasDue.map((s) => (
                <li
                  key={s.tag}
                  className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface-2 px-3 py-2"
                >
                  <span className="font-mono text-xs">{s.tag}</span>
                  <span className="text-xs text-muted-foreground">{s.type}</span>
                  <StatusPill state={s.state} />
                  <span className="ml-auto font-mono text-[11px] text-muted-foreground">{s.due}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-4">
            <h2 className="mb-3 text-sm font-semibold">Acceptance forms</h2>
            <ul className="space-y-2">
              {OWNER_PORTAL.acceptanceForms.map((f) => (
                <li
                  key={f.ref}
                  className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface-2 px-3 py-2"
                >
                  <span className="font-mono text-xs">{f.ref}</span>
                  <span className="text-xs text-muted-foreground">{f.subject}</span>
                  <span className="ml-auto text-xs">{f.status}</span>
                  <button
                    onClick={() => toast.success(`${f.ref} signed (simulated)`)}
                    className="rounded-md bg-primary px-2 py-1 text-[11px] font-medium text-primary-foreground"
                  >
                    Sign
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-muted-foreground">
              AI prepares the pack; the accountable owner signs. Nothing is signed automatically.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
