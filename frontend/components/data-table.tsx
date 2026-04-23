import type { ReactNode } from "react";

export type TableColumn<T> = {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  rows: T[];
  columns: TableColumn<T>[];
  rowKey: (row: T, index: number) => string;
  emptyMessage?: string;
};

export function DataTable<T>({
  rows,
  columns,
  rowKey,
  emptyMessage = "Nothing to show yet.",
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-10 text-center text-sm text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-white/[0.04] text-left text-xs uppercase tracking-[0.2em] text-slate-400">
          <tr>
            {columns.map((column) => (
              <th key={column.header} className="px-4 py-3 font-medium">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8 bg-slate-950/40">
          {rows.map((row, index) => (
            <tr key={rowKey(row, index)} className="transition hover:bg-white/[0.03]">
              {columns.map((column) => (
                <td
                  key={column.header}
                  className={column.className ?? "px-4 py-4 text-sm text-slate-200"}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
