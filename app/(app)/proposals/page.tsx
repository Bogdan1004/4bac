"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lightbulb, Plus, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface Proposal {
  id: string;
  title: string;
  difficulty: string;
  grade: number;
  chapter: string;
  sourceUrl: string;
  status: string;
  adminNote: string;
  createdAt: string;
}

const statusLabel: Record<string, { text: string; color: string }> = {
  pending:  { text: "In asteptare", color: "text-yellow-400 bg-yellow-500/10" },
  approved: { text: "Aprobata",     color: "text-green-400 bg-green-500/10" },
  rejected: { text: "Respinsa",     color: "text-red-400 bg-red-500/10" },
};

export default function ProposalsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ title: "", description: "", difficulty: "easy", grade: 9, chapter: "", sourceUrl: "" });

  useEffect(() => { if (status === "unauthenticated") router.push("/login"); }, [status, router]);

  useEffect(() => {
    fetch("/api/proposals").then(r => r.json()).then(setProposals);
  }, []);

  async function submit() {
    if (!form.title.trim()) return;
    setSubmitting(true); setError(""); setSuccess("");
    const res = await fetch("/api/proposals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) { setError(data.error ?? "Eroare"); return; }
    setSuccess("Propunerea a fost trimisa! Adminul o va revizui curand.");
    setProposals(prev => [data, ...prev]);
    setShowForm(false);
    setForm({ title: "", description: "", difficulty: "easy", grade: 9, chapter: "", sourceUrl: "" });
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main className="max-w-2xl mx-auto w-full px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Propune o problema</h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Sugereaza o problema care sa fie adaugata pe platforma</p>
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Propune
          </button>
        </div>

        {success && <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">{success}</div>}

        {showForm && (
          <div className="rounded-2xl border p-5 mb-6 flex flex-col gap-3" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>Propunere noua</p>
              <button onClick={() => setShowForm(false)}><X className="w-4 h-4" style={{ color: "var(--text-muted)" }} /></button>
            </div>

            <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))}
              placeholder="Titlul problemei *"
              className="px-3 py-2 rounded-xl text-sm border outline-none focus:border-indigo-500"
              style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}
            />
            <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))}
              placeholder="Descriere scurta (optional)..."
              rows={3}
              className="px-3 py-2 rounded-xl text-sm border outline-none resize-none focus:border-indigo-500"
              style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Dificultate</label>
                <select value={form.difficulty} onChange={e => setForm(f => ({...f, difficulty: e.target.value}))}
                  className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
                  style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <option value="easy">Usor</option>
                  <option value="medium">Mediu</option>
                  <option value="hard">Greu</option>
                </select>
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Clasa</label>
                <select value={form.grade} onChange={e => setForm(f => ({...f, grade: parseInt(e.target.value)}))}
                  className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
                  style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}>
                  {[9,10,11,12].map(g => <option key={g} value={g}>Clasa a {g}-a</option>)}
                </select>
              </div>
            </div>
            <input value={form.chapter} onChange={e => setForm(f => ({...f, chapter: e.target.value}))}
              placeholder="Capitol (ex: Sortare, Greedy...)"
              className="px-3 py-2 rounded-xl text-sm border outline-none focus:border-indigo-500"
              style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}
            />
            <input value={form.sourceUrl} onChange={e => setForm(f => ({...f, sourceUrl: e.target.value}))}
              placeholder="Link sursa originala (ex: pbinfo, infoarena...)"
              className="px-3 py-2 rounded-xl text-sm border outline-none focus:border-indigo-500"
              style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button onClick={submit} disabled={!form.title.trim() || submitting}
              className="self-start px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-sm transition-colors">
              {submitting ? "Se trimite..." : "Trimite propunerea"}
            </button>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {proposals.length === 0 ? (
            <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>
              <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Nicio propunere inca. Fii primul!</p>
            </div>
          ) : proposals.map(p => (
            <div key={p.id} className="rounded-xl border p-4" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--text)" }}>{p.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    Clasa a {p.grade}-a{p.chapter ? ` · ${p.chapter}` : ""}
                    {p.sourceUrl && <> · <a href={p.sourceUrl} target="_blank" rel="noopener" className="text-indigo-400 hover:text-indigo-300">sursa</a></>}
                  </p>
                  {p.adminNote && <p className="text-xs mt-1.5 text-yellow-400">Nota admin: {p.adminNote}</p>}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${statusLabel[p.status]?.color ?? ""}`}>
                  {statusLabel[p.status]?.text ?? p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
