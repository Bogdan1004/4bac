"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Flame, Zap, Trophy, Star, CheckCircle2, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface UserProfile {
  name: string;
  username?: string | null;
  xp: number;
  level: number;
  streak: number;
  solvedCount: number;
  levelProgress: { current: number; needed: number; percent: number };
  badges: { name: string; description: string; icon: string }[];
}

interface Submission {
  id: string;
  status: string;
  score: number;
  createdAt: string;
  problem: { title: string; slug: string; difficulty: string };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/user/me").then((r) => r.json()).then(setUser);
    fetch("/api/submissions").then((r) => r.json()).then(setSubmissions);
  }, [session]);

  if (status !== "loading" && !session) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
            <Trophy className="w-7 h-7 text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>Progresul tau</h2>
          <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
            Conecteaza-te pentru a vedea XP-ul, streak-ul si istoricul de submisii.
          </p>
          <Link
            href="/login"
            className="mt-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            Conecteaza-te
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-slate-500">Se incarca...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[color:var(--text)]">Salut, {user.username || user.name.split(" ")[0]}!</h1>
          <p className="text-slate-500 text-sm mt-1">Continua sa rezolvi probleme si urca in clasament.</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              Streak
            </div>
            <div className="text-2xl font-bold text-[color:var(--text)]">{user.streak}</div>
            <div className="text-xs text-slate-500">{user.streak === 1 ? "zi" : "zile"} consecutiv</div>
          </Card>

          <Card className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              XP total
            </div>
            <div className="text-2xl font-bold text-[color:var(--text)]">{user.xp}</div>
            <div className="text-xs text-slate-500">Nivel {user.level}</div>
          </Card>

          <Card className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              Rezolvate
            </div>
            <div className="text-2xl font-bold text-[color:var(--text)]">{user.solvedCount}</div>
            <div className="text-xs text-slate-500">probleme unice</div>
          </Card>

          <Card className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              Badge-uri
            </div>
            <div className="text-2xl font-bold text-[color:var(--text)]">{user.badges.length}</div>
            <div className="text-xs text-slate-500">obtinute</div>
          </Card>
        </div>

        {/* Level progress */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="font-medium text-[color:var(--text)] text-sm">Nivel {user.level}</span>
            </div>
            <span className="text-xs text-slate-500">
              {user.levelProgress.current} / {user.levelProgress.needed} XP
            </span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--bg-hover)" }}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
              style={{ width: `${user.levelProgress.percent}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Mai ai nevoie de {user.levelProgress.needed - user.levelProgress.current} XP pentru Nivel {user.level + 1}
          </p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent submissions */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[color:var(--text)]">Trimiteri recente</h2>
              <Link href="/problems" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                Toate problemele <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {submissions.length === 0 ? (
              <Card className="text-center py-8">
                <p className="text-slate-500 text-sm">Nicio trimitere inca.</p>
                <Link href="/problems" className="text-indigo-400 text-sm hover:text-indigo-300 mt-2 inline-block">
                  Rezolva prima ta problema →
                </Link>
              </Card>
            ) : (
              <div className="flex flex-col gap-2">
                {submissions.slice(0, 8).map((s) => (
                  <Link
                    key={s.id}
                    href={`/problems/${s.problem.slug}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border hover:border-indigo-500/20 transition-all"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${s.status === "accepted" ? "bg-green-400" : "bg-red-400"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[color:var(--text)] truncate">{s.problem.title}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(s.createdAt).toLocaleDateString("ro-RO")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge value={s.problem.difficulty} />
                      <span className={`text-xs font-medium ${s.score === 100 ? "text-green-400" : s.score >= 50 ? "text-yellow-400" : "text-red-400"}`}>
                        {s.score}/100
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Badges */}
          <div>
            <h2 className="font-semibold text-[color:var(--text)] mb-4">Badge-uri obtinute</h2>
            {user.badges.length === 0 ? (
              <Card className="text-center py-6">
                <p className="text-slate-500 text-sm">Rezolva probleme pentru a obtine badge-uri!</p>
              </Card>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {user.badges.map((b) => (
                  <Card key={b.name} className="flex flex-col items-center gap-2 py-4 text-center">
                    <span className="text-3xl">{b.icon}</span>
                    <p className="text-xs font-medium text-[color:var(--text)]">{b.name}</p>
                    <p className="text-xs text-slate-500">{b.description}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
