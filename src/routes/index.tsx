import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ShieldAlert,
  Lock,
  ClipboardList,
  Trophy,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { AppShell } from "@/components/iosp/AppShell";
import { StatusPill, ConfidenceBadge } from "@/components/iosp/primitives";
import { KPI, BOW_TIES, AI_ACTIVITY, ALERTS } from "@/lib/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prosafe IOSP Suite — Command Center" },
      {
        name: "description",
        content:
          "Interactive demo of the Prosafe Intelligent Operations & Safety Platform: barrier visibility, LOTO assurance, shift compliance and shift performance for an LNG plant.",
      },
      { property: "og:title", content: "Prosafe IOSP Suite — Command Center" },
      {
        property: "og:description",
        content:
          "Grounded, cited, confidence-scored operational intelligence for LNG process safety. Simulated demo data.",
      },
    ],
  }),
  component: CommandCenter,
});

const TILES = [
  { to: "/t1", icon: ShieldAlert, code: "T1", ...KPI.t1 },
  { to: "/t1", icon: Lock, code: "T2", ...KPI.t2 },
  { to: "/t1", icon: ClipboardList, code: "T3", ...KPI.t3 },
  { to: "/t1", icon: Trophy, code: "T4", ...KPI.t4 },
];

function CommandCenter() {
  useEffect(() => {
    const t1 = setTimeout(
      () =>
        toast.error("BT-19 threat line 14 — barrier ABSENT", {
          description: "44TZA-044 not installed · Train 2 · 487 days overdue",
        }),
      900,
    );
    const t2 = setTimeout(
      () =>
        toast.warning("ICC PSF#1 check blocked a sign-off", {
          description: "ICC-2026-0418 · single barrier on hydrocarbon drain",
        }),
      2200,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <AppShell>
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div className="grid-backdrop panel relative overflow-hidden p-6">
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Command Center
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Intelligent Operations &amp; Safety Platform
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Grounded, cited, confidence-scored, human-in-command. Every inference below shows its
              evidence and its source system; nothing acts on its own.
            </p>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {TILES.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.code}
                to={t.to}
                className="panel group p-4 transition hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon className="size-4 text-primary" />
                    <span className="font-mono text-primary">{t.code}</span> {t.label}
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" />
                </div>
                <p className="mt-3 font-mono text-3xl tabular">{t.value}</p>
                <p className="text-xs text-muted-foreground">{t.unit}</p>
                <p className="mt-3 border-t border-border pt-2 text-xs text-muted-foreground">
                  {t.sub}
                </p>
              </Link>
            );
          })}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="panel p-4 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Major Hazard Status</h2>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                <span className="live-dot size-1.5 rounded-full bg-intact" /> LIVE
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {BOW_TIES.slice(0, 8).map((bt) => (
                <Link
                  key={bt.id}
                  to={bt.id === "BT-19" ? "/t1/bt19" : "/t1"}
                  className="rounded-xl border border-border bg-surface-2 p-3 transition hover:border-primary/50"
                >
                  <p className="font-mono text-sm">{bt.id}</p>
                  <p className="truncate text-xs text-muted-foreground">{bt.name}</p>
                  <div className="mt-2">
                    <StatusPill state={bt.health} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="panel p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Activity className="size-4 text-primary" /> AI Activity
            </h2>
            <ul className="space-y-3">
              {AI_ACTIVITY.map((a) => (
                <li key={a.id} className="border-b border-border pb-3 last:border-0">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                    <span>{a.time}</span>
                    <span className="text-primary">{a.module}</span>
                    <span>{a.source}</span>
                  </div>
                  <p className="mt-1 text-xs">{a.action}</p>
                  <div className="mt-1.5">
                    <ConfidenceBadge level={a.confidence} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="panel p-4">
          <h2 className="mb-3 text-sm font-semibold">Alerts</h2>
          <div className="flex flex-col gap-2">
            {ALERTS.map((a) => (
              <div
                key={a.id}
                className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface-2 px-3 py-2"
              >
                <StatusPill state={a.severity} />
                <span className="text-sm">{a.text}</span>
                <span className="ml-auto font-mono text-[11px] text-muted-foreground">{a.meta}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
