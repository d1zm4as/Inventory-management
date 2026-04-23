"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BadgeCheck,
  Bell,
  Boxes,
  ChevronRight,
  LogIn,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { primaryNavigation, utilityNavigation } from "@/lib/navigation";

type AppShellProps = {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
};

export function AppShell({ title, subtitle, action, children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_30%),linear-gradient(180deg,_rgba(2,6,23,0.8),_rgba(2,6,23,0.98))] blur-0" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[292px,1fr] lg:px-6">
        <aside className="hidden lg:flex lg:flex-col">
          <div className="glass-panel flex h-full flex-col p-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-400 to-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20">
                <Boxes className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-white/60 uppercase">
                  Inventory Ops
                </p>
                <p className="text-sm text-slate-400">
                  Reservation-driven control room
                </p>
              </div>
            </Link>

            <div className="mt-8 space-y-2">
              {primaryNavigation.map((item) => {
                const active = pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-2xl border px-4 py-3 transition",
                      active
                        ? "border-indigo-400/40 bg-indigo-400/10 text-white shadow-lg shadow-indigo-500/10"
                        : "border-white/8 bg-white/[0.03] text-slate-300 hover:border-white/15 hover:bg-white/[0.06]",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>
                        <span className="block text-sm font-medium">
                          {item.label}
                        </span>
                        <span className="block text-xs text-slate-400">
                          {item.description}
                        </span>
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-white/35" />
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <div className="flex items-center gap-2 text-sm text-white/75">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                Live system status
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">API health</p>
                  <p className="text-lg font-semibold text-white">Healthy</p>
                </div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Synced
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-3">
                  <p className="text-slate-400">Reservations</p>
                  <p className="mt-1 font-semibold text-white">18 active</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-3">
                  <p className="text-slate-400">Alerts</p>
                  <p className="mt-1 font-semibold text-white">5 watch</p>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-2 pt-6">
              {utilityNavigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition hover:border-white/15 hover:bg-white/[0.06]"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </span>
                    <LogIn className="h-4 w-4 text-white/35" />
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="flex min-h-[calc(100vh-2rem)] flex-col gap-6">
          <header className="glass-panel flex flex-col gap-5 p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Operations Console
                </p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-4xl">
                  {title}
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-400 md:text-base">
                  {subtitle}
                </p>
              </div>
              <div className="hidden items-center gap-3 md:flex">
                <button className="rounded-full border border-white/10 bg-white/5 p-3 text-white/80 transition hover:bg-white/10">
                  <Bell className="h-4 w-4" />
                </button>
                <button className="rounded-full border border-white/10 bg-white/5 p-3 text-white/80 transition hover:bg-white/10">
                  <Activity className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-cyan-300 text-sm font-semibold text-slate-950">
                    AM
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Admin user</p>
                    <p className="text-xs text-slate-400">Central operations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:hidden">
              {primaryNavigation.map((item) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
                      active
                        ? "border-indigo-400/40 bg-indigo-400/10 text-white"
                        : "border-white/10 bg-white/5 text-slate-300",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {action ? (
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <BadgeCheck className="h-4 w-4 text-emerald-300" />
                  Ready for stock operations
                </div>
                {action}
              </div>
            ) : null}
          </header>

          <div className="flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}
