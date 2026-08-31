import { useEffect, useRef, useState, type ReactNode } from "react";
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
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANT_UNITS, CURRENT_USER, ROTATION } from "@/lib/mockData";
import { ProSafeSearchBar } from "./ProSafeSearchBar";
import { FloatingChat } from "./FloatingChat";

const NAV = [
  {
    key: "T1",
    label: "Barrier Visibility",
    icon: ShieldAlert,
    to: "/t1",
    children: [
      { to: "/t1", label: "BowTie Barrier Status Board" },
      { to: "/t1/bt19", label: "BT-19 Barrier Dashboard" },
      { to: "/t1/briefing", label: "Daily Barrier Briefing" },
      { to: "/t1/owner", label: "Barrier Owner Portal" },
    ],
  },
  {
    key: "T2",
    label: "LOTO Assurance",
    icon: Lock,
    to: "/t2",
    children: [
      { to: "/t2", label: "ICC Dashboard" },
      { to: "/t2/icc", label: "ICC Detail & AI Drafting" },
      { to: "/t2/spade", label: "Digital Spade Board" },
      { to: "/t2/conflicts", label: "Conflict Detection" },
    ],
  },
  {
    key: "T3",
    label: "Operational Compliance",
    icon: ClipboardList,
    to: "/t3",
    children: [
      { to: "/t3", label: "Field Capture" },
      { to: "/t3/eosr", label: "EoSR Live View" },
      { to: "/t3/handover", label: "Crew Change Handover" },
    ],
  },
  {
    key: "T4",
    label: "Shift Performance",
    icon: Trophy,
    to: "/t4",
    children: [
      { to: "/t4", label: "STP Leaderboard" },
      { to: "/t4/alerts", label: "Within-Cycle Alerts" },
      { to: "/t4/report", label: "Automated Cycle Report" },
    ],
  },
];

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

function SidebarContent({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose?: () => void;
}) {
  return (
    <>
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary">
          <ShieldAlert className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="font-semibold tracking-[0.18em]">PROSAFE</p>
          <p className="text-xs text-muted-foreground">IOSP Suite</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="ml-auto grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground lg:hidden"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <p className="mx-5 mb-4 rounded-md bg-surface-2 px-2 py-1 text-center text-[11px] text-muted-foreground">
        for Nigeria LNG
      </p>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
        <Link
          to="/"
          onClick={onClose}
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
              <div className="ml-6 space-y-0.5 border-l border-sidebar-border pl-3">
                {mod.children.map((c) => (
                  <Link
                    key={c.to}
                    to={c.to}
                    onClick={onClose}
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
            </div>
          );
        })}

        <div className="pt-4">
          <Link
            to="/audit"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
              pathname === "/audit"
                ? "bg-primary/12 text-primary"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
            )}
          >
            <ScrollText className="size-4" /> Audit Trail
          </Link>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground/50 cursor-not-allowed">
            <Settings className="size-4" /> Settings
          </div>
        </div>
      </nav>
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [unit, setUnit] = useState<string>("Train 2");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Dark mode: persist to localStorage
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("iosp-theme");
      return stored ? stored === "dark" : true;
    }
    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    if (typeof window !== "undefined") {
      localStorage.setItem("iosp-theme", dark ? "dark" : "light");
    }
  }, [dark]);

  // The header wraps at narrow widths, so its height is published as a CSS var
  // for anything that has to sit clear of it (toasts are fixed-position).
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new ResizeObserver(() => {
      // offsetHeight, not contentRect — the header has a bottom border.
      document.documentElement.style.setProperty("--app-header-h", `${header.offsetHeight}px`);
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
            aria-hidden
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar rise-in lg:hidden">
            <SidebarContent pathname={pathname} onClose={() => setMobileOpen(false)} />
          </aside>
        </>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          ref={headerRef}
          className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur"
        >
          <div className="flex flex-wrap items-center gap-3 px-4 py-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              className="grid size-9 place-items-center rounded-lg border border-border bg-surface-2 text-muted-foreground transition hover:text-foreground lg:hidden"
            >
              <Menu className="size-4" />
            </button>

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

            <div className="order-last min-w-[200px] flex-1 md:order-none">
              <ProSafeSearchBar compact />
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

      <FloatingChat />
    </div>
  );
}
