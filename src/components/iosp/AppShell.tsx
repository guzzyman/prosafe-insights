import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ShieldAlert,
  Lock,
  ClipboardList,
  Trophy,
  ScrollText,
  Settings,
  Sun,
  Moon,
  FlaskConical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANT_UNITS, CURRENT_USER, ROTATION } from "@/lib/mockData";
import { AskIosp } from "./AskIosp";

const NAV = [
  {
    key: "T1",
    label: "Barrier Visibility",
    icon: ShieldAlert,
    children: [
      { to: "/t1", label: "Major Hazard Status Board" },
      { to: "/t1/bt19", label: "BT-19 Barrier Dashboard" },
      { to: "/t1/briefing", label: "Daily Barrier Briefing" },
      { to: "/t1/owner", label: "Barrier Owner Portal" },
    ],
  },
  { key: "T2", label: "LOTO Assurance", icon: Lock, children: [] },
  { key: "T3", label: "Operational Compliance", icon: ClipboardList, children: [] },
  { key: "T4", label: "Shift Performance", icon: Trophy, children: [] },
] as const;

function LagosClock() {
  const [now, setNow] = useState<string>("--:--:--");
  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <span className="live-dot size-2 rounded-full bg-intact" aria-hidden />
      <span className="tabular">{now}</span>
      <span className="text-xs text-muted-foreground">WAT</span>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [unit, setUnit] = useState<string>("Train 2");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary">
            <ShieldAlert className="size-5" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold tracking-[0.18em]">PROSAFE</p>
            <p className="text-xs text-muted-foreground">IOSP Suite</p>
          </div>
        </div>
        <p className="mx-5 mb-4 rounded-md bg-surface-2 px-2 py-1 text-center text-[11px] text-muted-foreground">
          for Nigeria LNG
        </p>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
              pathname === "/"
                ? "bg-primary/12 text-primary"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
            )}
          >
            <FlaskConical className="size-4" />
            Command Center
          </Link>

          {NAV.map((mod) => {
            const Icon = mod.icon;
            const active = pathname.startsWith(`/${mod.key.toLowerCase()}`);
            return (
              <div key={mod.key} className="pt-2">
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  <span className="font-mono text-[11px] text-primary">{mod.key}</span>
                  <span className="truncate">{mod.label}</span>
                </div>
                {mod.children.length > 0 ? (
                  <div className="ml-6 space-y-0.5 border-l border-sidebar-border pl-3">
                    {mod.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        activeOptions={{ exact: true }}
                        className={cn(
                          "block rounded-md px-2 py-1.5 text-xs transition",
                          pathname === c.to
                            ? "bg-primary/12 text-primary"
                            : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                        )}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="ml-9 text-[11px] text-muted-foreground/70">coming next</p>
                )}
              </div>
            );
          })}

          <div className="pt-4">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground">
              <ScrollText className="size-4" /> Audit Trail
            </div>
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground">
              <Settings className="size-4" /> Settings
            </div>
          </div>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
          <div className="flex flex-wrap items-center gap-3 px-4 py-3">
            <label className="sr-only" htmlFor="unit-select">
              Plant unit
            </label>
            <select
              id="unit-select"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="h-9 rounded-lg border border-border bg-surface-2 px-2 text-sm outline-none focus:ring-2 focus:ring-primary/25"
            >
              {PLANT_UNITS.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>

            <LagosClock />

            <span className="hidden rounded-md border border-degraded/40 bg-degraded/10 px-2 py-1 font-mono text-[11px] text-degraded sm:inline">
              DEMO — simulated data
            </span>

            <div className="order-last min-w-[240px] flex-1 md:order-none">
              <AskIosp compact />
            </div>

            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="grid size-9 place-items-center rounded-lg border border-border bg-surface-2 text-muted-foreground transition hover:text-foreground"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-2 py-1">
              <span className="grid size-7 place-items-center rounded-full bg-primary/15 font-mono text-xs text-primary">
                {CURRENT_USER.initials}
              </span>
              <span className="hidden text-xs sm:block">
                {CURRENT_USER.role} — {CURRENT_USER.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t border-border px-4 py-1.5 font-mono text-[11px] text-muted-foreground">
            <span>{unit}</span>
            <span aria-hidden>·</span>
            <span>
              Rotation day {ROTATION.day} of {ROTATION.of}
            </span>
            <span aria-hidden>·</span>
            <span>Shift teams A · B · C · D</span>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6">{children}</main>

        <footer className="border-t border-border px-4 py-3 text-center text-xs text-muted-foreground">
          Demo build · simulated data · not connected to live systems.
        </footer>
      </div>
    </div>
  );
}
