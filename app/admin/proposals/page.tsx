"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface Proposal {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  grade: number;
  chapter: string;
  sourceUrl: string;
  status: string;
  adminNote: string;
  createdAt: string;
  user: { name: string; username: string | null };
}

const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string }> = {
  pending:  { label: "In asteptare", icon: Clock,         color: "text-yellow-400" },
  approved: { label: "Aprobata",     icon: CheckCircle2,  color: "text-green-400" },
  rejected: { label: "Respinsa",     icon: XCircle,       color: "text-red-400" },
};

export default function AdminProposalsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (status === "authenticated" && (session?.user as { role?: string })?.role !== "admin") {
      router.push("/problems");
    }
  }, [status, session, router]);

  useEffect(() => {
    fetch("/api/proposals").then(r => r.json()).then(d => { setProposals(d); setLoading(false); });
  }, []);

  async function updateStatus(id: string, newStatus: string) {
    const res = await fetch(`/api/proposals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, adminNote: notes[id] ?? "" }),
    });
    if (res.ok) {
      const updated = await res.json();
      setProposals(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main className="max-w-3xl mx-auto w-full px-6 py-8">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text)" }}>Propuneri de probleme</h1>

        {loading ? (
          <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>Se incarca...</div>
        ) : proposals.length === 0 ? (
          <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>Nicio propunere.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {proposals.map(p => {
              const cfg = statusConfig[p.status] ?? statusConfig.pending;
              const StatusIcon = cfg.icon;
              return (
                <div key={p.id} className="rounded-2xl border p-5 flex flex-col gap-3" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold" style={{ color: "var(--text)" }}>{p.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        de {p.user.username ? `@${p.user.username}` : p.user.name} ·
                        Clasa a {p.grade}-a{p.chapter ? ` · ${p.chapter}` : ""} ·{" "}
                        {p.difficulty === "easy" ? "Usor" : p.difficulty === "medium" ? "Mediu" : "Greu"}
                      </p>
                      {p.sourceUrl && (
                        <a href={p.sourceUrl} target="_blank" rel="noopener" className="text-xs text-indigo-400 hover:text-indigo-300 mt-0.5 block">
                          {p.sourceUrl}
                        </a>
                      )}
                      {p.description && <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>{p.description}</p>}
                    </div>
                    <span className={`flex items-center gap-1 text-xs shrink-0 ${cfg.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />{cfg.label}
                    </span>
                  </div>

                  {p.status === "pending" && (
                    <div className="flex flex-col gap-2">
                      <input
                        value={notes[p.id] ?? ""}
                        onChange={e => setNotes(n => ({...n, [p.id]: e.target.value}))}
                        placeholder="Nota pentru elev (optional)..."
                        className="px-3 py-2 rounded-xl text-xs border outline-none focus:border-indigo-500"
                        style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(p.id, "approved")}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-green-600 hover:bg-green-500 text-white transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Aproba
                        </button>
                        <button
                          onClick={() => updateStatus(p.id, "rejected")}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Respinge
                        </button>
                      </div>
                    </div>
                  )}
                  {p.adminNote && p.status !== "pending" && (
                    <p className="text-xs text-yellow-400">Nota admin: {p.adminNote}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
