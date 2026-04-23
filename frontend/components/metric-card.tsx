import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Metric } from "@/lib/mock-data";

const toneStyles: Record<Metric["tone"], string> = {
  emerald: "from-emerald-400/20 to-emerald-500/5 text-emerald-300",
  indigo: "from-indigo-400/20 to-indigo-500/5 text-indigo-300",
  amber: "from-amber-400/20 to-amber-500/5 text-amber-300",
  rose: "from-rose-400/20 to-rose-500/5 text-rose-300",
};

type MetricCardProps = Metric;

export function MetricCard({
  label,
  value,
  delta,
  tone,
  detail,
}: MetricCardProps) {
  return (
    <article
      className={cn(
        "glass-panel relative overflow-hidden p-5",
        "bg-gradient-to-br",
        toneStyles[tone],
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300">{label}</p>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {value}
          </div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/80">
          {delta}
        </span>
        <span className="text-sm text-slate-400">{detail}</span>
      </div>
    </article>
  );
}
