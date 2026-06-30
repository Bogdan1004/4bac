"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Plus, Search, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface Class {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  createdBy: { name: string; username: string | null };
  _count: { members: number };
}

export default function ClassesPage() {
  const { data: session, status } = useSession();
  const router = useRouter(); // kept for createClass redirect
  const [classes, setClasses] = useState<Class[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const isGuest = status !== "loading" && !session;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/classes?q=${encodeURIComponent(q)}`)
      .then(r => r.json()).then(d => { setClasses(d); setLoading(false); });
  }, [q]);

  async function createClass() {
    if (!newName.trim()) return;
    setCreating(true); setError("");
    const res = await fetch("/api/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, description: newDesc }),
    });
    const data = await res.json();
    setCreating(false);
    if (!res.ok) { setError(data.error ?? "Eroare"); return; }
    router.push(`/classes/${data.id}`);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main className="max-w-3xl mx-auto w-full px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Clase</h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Intra sau creeaza o clasa</p>
          </div>
          {!isGuest && (
            <button
              onClick={() => setShowCreate(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Clasa noua
            </button>
          )}
        </div>

        {showCreate && (
          <div className="rounded-2xl border p-5 mb-6 flex flex-col gap-3" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>Creeaza clasa</p>
              <button onClick={() => setShowCreate(false)}><X className="w-4 h-4" style={{ color: "var(--text-muted)" }} /></button>
            </div>
            <input
              value={newName} onChange={e => setNewName(e.target.value)}
              placeholder="Numele clasei (ex: 12A Informatica)"
              className="px-3 py-2 rounded-xl text-sm border outline-none focus:border-indigo-500"
              style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}
            />
            <textarea
              value={newDesc} onChange={e => setNewDesc(e.target.value)}
              placeholder="Descriere optionala..."
              rows={2}
              className="px-3 py-2 rounded-xl text-sm border outline-none resize-none focus:border-indigo-500"
              style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              onClick={createClass} disabled={!newName.trim() || creating}
              className="self-start px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-sm transition-colors"
            >
              {creating ? "Se creeaza..." : "Creeaza"}
            </button>
          </div>
        )}

        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--text-muted)" }} />
          <input
            value={q} onChange={e => setQ(e.target.value)}
            placeholder="Cauta clasa dupa nume..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border outline-none focus:border-indigo-500"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text)" }}
          />
        </div>

        {loading ? (
          <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>Se incarca...</div>
        ) : classes.length === 0 ? (
          <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>
            {q ? "Nicio clasa gasita." : "Nu exista clase inca. Fii primul!"}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {classes.map(c => (
              <Link
                key={c.id} href={`/classes/${c.id}`}
                className="flex items-center gap-4 px-5 py-4 rounded-xl border hover:border-indigo-500/30 transition-all group"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium group-hover:text-indigo-400 transition-colors" style={{ color: "var(--text)" }}>{c.name}</p>
                  {c.description && <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>{c.description}</p>}
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    Creata de {c.createdBy.username ? `@${c.createdBy.username}` : c.createdBy.name}
                  </p>
                </div>
                <span className="text-sm font-semibold shrink-0 text-indigo-400">{c._count.members} membri</span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
