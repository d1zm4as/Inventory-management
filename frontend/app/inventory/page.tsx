import { AppShell } from "@/components/app-shell";
import { DataTable } from "@/components/data-table";
import { SectionCard } from "@/components/section-card";
import { inventoryRows } from "@/lib/mock-data";

const columns = [
  {
    header: "Product",
    render: (row: (typeof inventoryRows)[number]) => (
      <div>
        <p className="font-medium text-white">{row.name}</p>
        <p className="text-xs text-slate-400">{row.sku}</p>
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
    header: "On hand",
    render: (row: (typeof inventoryRows)[number]) => (
      <span className="font-medium text-white">{row.onHand}</span>
    ),
  },
  {
    header: "Reserved",
    render: (row: (typeof inventoryRows)[number]) => (
      <span className="font-medium text-white">{row.reserved}</span>
    ),
  },
  {
    header: "Available",
    render: (row: (typeof inventoryRows)[number]) => (
      <span className="font-medium text-white">{row.available}</span>
    ),
  },
];

export default function InventoryPage() {
  return (
    <AppShell
      title="Inventory catalog"
      subtitle="Track stock by SKU and location with a clean view of on-hand, reserved, and available quantities."
      action={
        <div className="flex gap-3">
          <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
            Filter
          </button>
          <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">
            Add product
          </button>
        </div>
      }
    >
      <SectionCard
        title="Stock overview"
        subtitle="This page will eventually connect to filters, search, and the product API."
      >
        <div className="mb-5 grid gap-4 md:grid-cols-3">
          {[
            { label: "Locations", value: "4" },
            { label: "Active SKUs", value: "86" },
            { label: "Reorder watch", value: "18" },
          ].map((item) => (
            <div key={item.label} className="surface p-4">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <DataTable
          rows={inventoryRows}
          columns={columns}
          rowKey={(row) => `${row.sku}-${row.location}`}
        />
      </SectionCard>
    </AppShell>
  );
}
