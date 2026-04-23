import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Clock3,
  PackageSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { metrics, movements } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 text-slate-100 md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_24%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr,0.85fr]">
        <section className="glass-panel relative overflow-hidden p-8 md:p-10">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Inventory Control Room
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Run inventory like an operation, not a spreadsheet.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Track stock across locations, reserve items during checkout, and
            keep your team aligned with a dashboard that makes the important
            flows obvious at a glance.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
            >
              Open dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              Preview sign in
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Stock visibility",
                copy: "Know what is on hand, reserved, and available per location.",
                icon: PackageSearch,
              },
              {
                title: "Reservation safety",
                copy: "Keep checkout holds timed and auditable so stock never overcommits.",
                icon: Clock3,
              },
              {
                title: "Traceable actions",
                copy: "Every movement is recorded so ops teams can explain what changed.",
                icon: ShieldCheck,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-slate-950/45 p-5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-white">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="glass-panel p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="muted-label">Live snapshot</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Performance signals
                </h2>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Healthy
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {metrics.slice(0, 2).map((metric) => (
                <div key={metric.label} className="surface p-4">
                  <p className="text-sm text-slate-400">{metric.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">{metric.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {metrics.slice(2).map((metric) => (
                <div key={metric.label} className="surface p-4">
                  <p className="text-sm text-slate-400">{metric.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">{metric.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="muted-label">Recent movement</p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  Stock activity
                </h2>
              </div>
              <BarChart3 className="h-5 w-5 text-cyan-300" />
            </div>

            <div className="mt-5 space-y-3">
              {movements.map((movement) => (
                <div
                  key={`${movement.sku}-${movement.when}`}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {movement.action} - {movement.sku}
                    </p>
                    <p className="text-xs text-slate-400">{movement.note}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {movement.quantity}
                    </p>
                    <p className="text-xs text-slate-400">{movement.when}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
