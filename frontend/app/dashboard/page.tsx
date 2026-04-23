import { ArrowRight, Bell, Boxes, PlusCircle } from "lucide-react";
import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { DataTable } from "@/components/data-table";
import { MetricCard } from "@/components/metric-card";
import { SectionCard } from "@/components/section-card";
import { inventoryRows, metrics, movements } from "@/lib/mock-data";

const inventoryColumns = [
  {
    header: "SKU",
    render: (row: (typeof inventoryRows)[number]) => (
      <div>
        <p className="font-medium text-white">{row.sku}</p>
        <p className="text-xs text-slate-400">{row.name}</p>
      </div>
    ),
  },
  {
    header: "Location",
    render: (row: (typeof inventoryRows)[number]) => (
      <span className="text-slate-200">{row.location}</span>
    ),
  },
  {
    header: "Available",
    render: (row: (typeof inventoryRows)[number]) => (
      <span className="font-medium text-white">{row.available}</span>
    ),
  },
  {
    header: "Status",
    render: (row: (typeof inventoryRows)[number]) => {
      const tone =
        row.status === "healthy"
          ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/20"
          : row.status === "watch"
            ? "bg-amber-400/10 text-amber-300 border-amber-400/20"
            : "bg-rose-400/10 text-rose-300 border-rose-400/20";

      return (
        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${tone}`}>
          {row.status}
        </span>
      );
    },
  },
];

const movementColumns = [
  {
    header: "Action",
    render: (row: (typeof movements)[number]) => (
      <div>
        <p className="font-medium text-white">{row.action}</p>
        <p className="text-xs text-slate-400">{row.note}</p>
      </div>
    ),
  },
  {
    header: "SKU",
    render: (row: (typeof movements)[number]) => (
      <span className="text-slate-200">{row.sku}</span>
    ),
  },
  {
    header: "Quantity",
    render: (row: (typeof movements)[number]) => (
      <span className="font-medium text-white">{row.quantity}</span>
    ),
  },
  {
    header: "When",
    render: (row: (typeof movements)[number]) => (
      <span className="text-slate-400">{row.when}</span>
    ),
  },
];

export default function DashboardPage() {
  return (
    <AppShell
      title="Operational dashboard"
      subtitle="A clear view of inventory, reservation pressure, and checkout activity across the network."
      action={
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
            <Bell className="h-4 w-4 text-cyan-300" />
            Notifications
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">
            <PlusCircle className="h-4 w-4" />
            New reservation
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr,0.7fr]">
          <SectionCard
            title="Low-stock watchlist"
            subtitle="These SKUs are approaching reorder thresholds and should be reviewed soon."
            action={
              <Link
                href="/inventory"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                View inventory
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          >
            <DataTable
              rows={inventoryRows}
              columns={inventoryColumns}
              rowKey={(row) => row.sku + row.location}
            />
          </SectionCard>

          <SectionCard
            title="Reservation pulse"
            subtitle="A compact summary of active holds and upcoming expirations."
          >
            <div className="space-y-4">
              {[
                { label: "Active holds", value: "18", tone: "text-white" },
                { label: "Expiring in 15m", value: "4", tone: "text-amber-300" },
                { label: "Expired today", value: "3", tone: "text-rose-300" },
                { label: "Manual releases", value: "1", tone: "text-cyan-300" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3"
                >
                  <span className="text-sm text-slate-400">{item.label}</span>
                  <span className={`text-xl font-semibold ${item.tone}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        <SectionCard
          title="Recent stock movements"
          subtitle="Every adjustment, receipt, and sale should leave a paper trail."
        >
          <DataTable
            rows={movements}
            columns={movementColumns}
            rowKey={(row) => `${row.sku}-${row.when}`}
          />
        </SectionCard>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Audit trail",
              copy: "Build trust by exposing who touched stock and why.",
              icon: Boxes,
            },
            {
              title: "Fast checkout",
              copy: "Reservation and confirmation flows keep orders safe.",
              icon: ArrowRight,
            },
            {
              title: "System health",
              copy: "Keep an eye on sync status, job queues, and alerts.",
              icon: Bell,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="glass-panel p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300">
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
        </section>
      </div>
    </AppShell>
  );
}
