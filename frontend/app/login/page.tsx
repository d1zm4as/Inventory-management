import Link from "next/link";
import { ArrowRight, KeyRound, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen px-4 py-6 text-slate-100 md:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <section className="glass-panel relative overflow-hidden p-8 md:p-10">
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            Secure access
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Sign in to the operations console.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            This screen is ready for JWT-backed authentication once the backend
            login flow is connected. For now, it gives us the structure, visual
            language, and layout we will keep when auth goes live.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Role-based access for staff, managers, and admins",
              "Reservation and checkout activity behind authenticated routes",
              "Audit-ready flows that show who changed what and when",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-slate-300"
              >
                <Sparkles className="h-4 w-4 text-cyan-300" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel flex items-center p-6 md:p-10">
          <div className="w-full max-w-lg">
            <p className="muted-label">Workspace login</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Enter the inventory system
            </h2>

            <div className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Email</span>
                <input
                  type="email"
                  defaultValue="manager@inventory.local"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Password</span>
                <input
                  type="password"
                  defaultValue="password123"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
                />
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
              >
                Continue to dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Back home
              </Link>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <KeyRound className="h-4 w-4 text-cyan-300" />
                Planned auth flow
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Once the backend auth endpoints are wired in, this page will
                swap from a presentational scaffold to a real JWT login flow.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
