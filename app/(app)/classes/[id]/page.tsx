"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, ArrowLeft, LogOut, Zap, Flame, Trash2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface Member {
  userId: string;
  joinedAt: string;
  user: { id: string; name: string; username: string | null; xp: number; level: number; streak: number };
}
interface ClassDetail {
  id: string;
  name: string;
  description: string;
  createdById: string;
  createdBy: { id: string; name: string; username: string | null };
  members: Member[];
}

export default function ClassPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cls, setCls] = useState<ClassDetail | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [joining, setJoining] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const userId = (session?.user as { id?: string })?.id;


  useEffect(() => {
    fetch(`/api/classes/${id}`)
      .then(r => { if (r.status === 404) { setNotFound(true); return null; } return r.json(); })
      .then(d => { if (d) setCls(d); });
  }, [id]);

  const isMember = cls?.members.some(m => m.userId === userId) ?? false;

  async function join() {
    setJoining(true);
    await fetch(`/api/classes/${id}/join`, { method: "POST" });
    const d = await fetch(`/api/classes/${id}`).then(r => r.json());
    setCls(d); setJoining(false);
  }

  async function deleteClass() {
    if (!confirm("Stergi aceasta clasa? Toti membrii vor fi eliminati. Actiunea este ireversibila.")) return;
    setDeleting(true);
    await fetch(`/api/classes/${id}`, { method: "DELETE" });
    router.push("/classes");
  }

  async function leave() {
    if (!confirm("Esti sigur ca vrei sa parasesti aceasta clasa?")) return;
    setJoining(true);
    await fetch(`/api/classes/${id}/join`, { method: "DELETE" });
    const d = await fetch(`/api/classes/${id}`).then(r => r.json());
    setCls(d); setJoining(false);
  }

  if (notFound) return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <p className="text-lg font-semibold" style={{ color: "var(--text)" }}>Clasa negasita</p>
        <Link href="/classes" className="text-sm text-indigo-400 hover:text-indigo-300">← Inapoi la clase</Link>
      </div>
    </div>
  );

  if (!cls) return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />
      <div className="flex-1 flex items-center justify-center" style={{ color: "var(--text-muted)" }}>Se incarca...</div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main className="max-w-2xl mx-auto w-full px-6 py-8 flex flex-col gap-5">
        <Link href="/classes" className="flex items-center gap-1.5 text-sm w-fit hover:text-indigo-400 transition-colors" style={{ color: "var(--text-muted)" }}>
          <ArrowLeft className="w-4 h-4" /> Inapoi la clase
        </Link>

        {/* Header */}
        <div className="rounded-2xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>{cls.name}</h1>
                {cls.description && <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{cls.description}</p>}
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {cls.members.length} membri · Creata de{" "}
                  <Link href={`/users/${cls.createdBy.username ?? cls.createdBy.id}`} className="text-indigo-400 hover:text-indigo-300">
                    {cls.createdBy.username ? `@${cls.createdBy.username}` : cls.createdBy.name}
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {userId === cls.createdById ? (
                <button
                  onClick={deleteClass} disabled={deleting}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> {deleting ? "Se sterge..." : "Sterge clasa"}
                </button>
              ) : userId && (
                isMember ? (
                  <button
                    onClick={leave} disabled={joining}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Iesi din clasa
                  </button>
                ) : (
                  <button
                    onClick={join} disabled={joining}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  >
                    <Users className="w-3.5 h-3.5" /> Alatura-te
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Members */}
        <div>
          <h2 className="font-semibold text-sm mb-3" style={{ color: "var(--text)" }}>Membri ({cls.members.length})</h2>
          <div className="flex flex-col gap-2">
            {cls.members.map((m, i) => (
              <Link
                key={m.userId} href={`/users/${m.user.username ?? m.user.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border hover:border-indigo-500/30 transition-all"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <span className="text-xs w-6 text-right font-mono shrink-0" style={{ color: "var(--text-muted)" }}>#{i + 1}</span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
                >
                  {(m.user.username ?? m.user.name).charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    {m.user.username ? `@${m.user.username}` : m.user.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Nivel {m.user.level}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {m.user.streak > 0 && (
                    <span className="flex items-center gap-1 text-xs text-orange-400"><Flame className="w-3 h-3" />{m.user.streak}</span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-indigo-300"><Zap className="w-3 h-3" />{m.user.xp}</span>
                  {m.userId === cls.createdById && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400">creator</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
