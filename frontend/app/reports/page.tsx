import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { BarChart3, TrendingUp, TriangleAlert } from "lucide-react";

const bars = [72, 88, 64, 92, 76, 84, 98];

export default function ReportsPage() {
  return (
    <AppShell
      title="Reports"
      subtitle="A first pass at the analytics surface for stock health, order volume, and low-stock alerts."
      action={
        <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">
          Export CSV
        </button>
      }
    >
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Low-stock alerts",
              value: "18",
              icon: TriangleAlert,
            },
            {
              title: "Average fill rate",
              value: "97.4%",
              icon: TrendingUp,
            },
            {
              title: "Daily movement",
              value: "312",
              icon: BarChart3,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="glass-panel p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
              </article>
            );
          })}
        </section>

        <SectionCard
          title="Weekly movement trend"
          subtitle="A chart library can replace this simple visual once the analytics layer lands."
        >
          <div className="grid h-72 grid-cols-7 items-end gap-3 rounded-3xl border border-white/8 bg-slate-950/40 p-6">
            {bars.map((height, index) => (
              <div key={index} className="flex h-full flex-col items-center gap-3">
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-cyan-400 to-indigo-400 shadow-lg shadow-cyan-500/20"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-slate-500">W{index + 1}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
