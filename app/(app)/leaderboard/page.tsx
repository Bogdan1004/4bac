"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Trophy, Flame, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface LeaderboardUser {
  id: string;
  name: string;
  username: string | null;
  xp: number;
  level: number;
  streak: number;
  _count: { submissions: number };
}

interface CurrentUserRank extends LeaderboardUser {
  rank: number;
}

const medals = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  const { data: session } = useSession();
  const [top10, setTop10] = useState<LeaderboardUser[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<CurrentUserRank | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((d) => {
        setTop10(d.top10 ?? []);
        setCurrentUserRank(d.currentUserRank ?? null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const currentUserId = (session?.user as { id?: string })?.id;

  function UserRow({ u, rank, highlight }: { u: LeaderboardUser; rank: number; highlight: boolean }) {
    const href = `/users/${u.username ?? u.id}`;
    return (
      <Link
        href={href}
        className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-all ${
          highlight
            ? "border-indigo-500/40 bg-indigo-500/5"
            : "border-transparent hover:border-indigo-500/30"
        }`}
        style={!highlight ? { background: "var(--bg-card)", borderColor: "var(--border)" } : undefined}
      >
        <span className="w-8 text-right text-sm font-bold text-slate-500">
          {rank <= 3 ? medals[rank - 1] : `#${rank}`}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium truncate" style={{ color: "var(--text)" }}>
              {u.username ? `@${u.username}` : u.name}
            </p>
            {u.username && (
              <span className="text-xs text-slate-500">{u.name}</span>
            )}
            {highlight && (
              <span className="text-xs text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">tu</span>
            )}
          </div>
          <p className="text-xs text-slate-500">Nivel {u.level}</p>
        </div>

        <div className="flex items-center gap-5 shrink-0">
          {u.streak > 0 && (
            <div className="flex items-center gap-1 text-xs text-orange-400">
              <Flame className="w-3.5 h-3.5" />
              {u.streak}
            </div>
          )}
          <div className="flex items-center gap-1 text-sm font-semibold text-indigo-300">
            <Zap className="w-3.5 h-3.5" />
            {u.xp}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-3xl mx-auto w-full px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Clasament</h1>
            <p className="text-slate-500 text-sm">Top {top10.length} elevi dupa XP total</p>
          </div>
        </div>

        {/* Top 3 podium */}
        {!loading && top10.length >= 3 && (
          <div className="flex items-end justify-center gap-4 mb-10">
            {[top10[1], top10[0], top10[2]].map((u, i) => {
              const rank = i === 0 ? 2 : i === 1 ? 1 : 3;
              const heights: Record<number, string> = { 1: "h-28", 2: "h-20", 3: "h-16" };
              return (
                <div key={u.id} className="flex flex-col items-center gap-2">
                  <span className="text-2xl">{medals[rank - 1]}</span>
                  <div className="text-sm font-medium" style={{ color: "var(--text)" }}>{u.name.split(" ")[0]}</div>
                  <div className="text-xs text-indigo-300">{u.xp} XP</div>
                  <div
                    className={`${heights[rank]} w-20 rounded-t-xl flex items-end justify-center pb-2 ${rank === 1 ? "bg-yellow-500/20 border border-yellow-500/30" : "bg-white/5 border border-white/10"}`}
                  >
                    <span className="text-lg font-bold text-slate-400">#{rank}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 text-slate-500">Se incarca...</div>
        ) : (
          <div className="flex flex-col gap-2">
            {top10.map((u, i) => (
              <UserRow key={u.id} u={u} rank={i + 1} highlight={u.id === currentUserId} />
            ))}

            {currentUserRank && (
              <>
                <div className="flex items-center gap-3 py-2 px-2">
                  <div className="flex-1 border-t" style={{ borderColor: "var(--border)" }} />
                  <span className="text-xs text-slate-500 shrink-0">pozitia ta</span>
                  <div className="flex-1 border-t" style={{ borderColor: "var(--border)" }} />
                </div>
                <UserRow u={currentUserRank} rank={currentUserRank.rank} highlight={true} />
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
