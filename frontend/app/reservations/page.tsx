import { AppShell } from "@/components/app-shell";
import { DataTable } from "@/components/data-table";
import { SectionCard } from "@/components/section-card";
import { reservations } from "@/lib/mock-data";

const columns = [
  {
    header: "Reference",
    render: (row: (typeof reservations)[number]) => (
      <div>
        <p className="font-medium text-white">{row.ref}</p>
        <p className="text-xs text-slate-400">{row.customer}</p>
      </div>
    ),
  },
  {
    header: "SKU",
    render: (row: (typeof reservations)[number]) => (
      <span className="text-slate-200">{row.sku}</span>
    ),
  },
  {
    header: "Qty",
    render: (row: (typeof reservations)[number]) => (
      <span className="font-medium text-white">{row.quantity}</span>
    ),
  },
  {
    header: "Expires",
    render: (row: (typeof reservations)[number]) => (
      <span className="text-slate-300">{row.expiresIn}</span>
    ),
  },
  {
    header: "Status",
    render: (row: (typeof reservations)[number]) => {
      const tone =
        row.status === "active"
          ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/20"
          : row.status === "expiring"
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

export default function ReservationsPage() {
  return (
    <AppShell
      title="Reservations"
      subtitle="Monitor active holds, expiry windows, and which customers are waiting on checkout confirmation."
      action={
        <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">
          Create hold
        </button>
      }
    >
      <SectionCard
        title="Reservation queue"
        subtitle="A future API view can replace this mock queue without changing the layout."
      >
        <DataTable
          rows={reservations}
          columns={columns}
          rowKey={(row) => row.ref}
        />
      </SectionCard>
    </AppShell>
  );
}
