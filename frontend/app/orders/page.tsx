import { AppShell } from "@/components/app-shell";
import { DataTable } from "@/components/data-table";
import { SectionCard } from "@/components/section-card";
import { orders } from "@/lib/mock-data";

const columns = [
  {
    header: "Order",
    render: (row: (typeof orders)[number]) => (
      <div>
        <p className="font-medium text-white">{row.ref}</p>
        <p className="text-xs text-slate-400">{row.channel}</p>
      </div>
    ),
  },
  {
    header: "Status",
    render: (row: (typeof orders)[number]) => {
      const tone =
        row.status === "confirmed"
          ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/20"
          : row.status === "pending"
            ? "bg-amber-400/10 text-amber-300 border-amber-400/20"
            : "bg-rose-400/10 text-rose-300 border-rose-400/20";

      return (
        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${tone}`}>
          {row.status}
        </span>
      );
    },
  },
  {
    header: "Total",
    render: (row: (typeof orders)[number]) => (
      <span className="font-medium text-white">{row.total}</span>
    ),
  },
  {
    header: "Location",
    render: (row: (typeof orders)[number]) => (
      <span className="text-slate-300">{row.location}</span>
    ),
  },
];

export default function OrdersPage() {
  return (
    <AppShell
      title="Orders"
      subtitle="Track confirmations, cancellations, and reservation-driven checkouts from a single view."
      action={
        <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">
          New order
        </button>
      }
    >
      <SectionCard
        title="Checkout activity"
        subtitle="This area is designed for the order lifecycle that will sit on top of the backend reservation flow."
      >
        <DataTable rows={orders} columns={columns} rowKey={(row) => row.ref} />
      </SectionCard>
    </AppShell>
  );
}
