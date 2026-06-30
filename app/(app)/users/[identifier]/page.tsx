"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Zap, Flame, Trophy, Code2, Award, ArrowLeft, CheckCircle2, UserPlus, UserMinus, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface Badge { id: string; name: string; description: string; icon: string; }
interface SolvedProblem { id: string; title: string; slug: string; difficulty: string; grade: number; chapter: string; }
interface PublicProfile {
  id: string;
  name: string;
  username: string | null;
  xp: number;
  level: number;
  streak: number;
  joinedAt: string;
  badges: Badge[];
  solvedProblems: SolvedProblem[];
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  isSelf: boolean;
}

const diffColor: Record<string, string> = {
  easy: "text-green-400 bg-green-500/10",
  medium: "text-yellow-400 bg-yellow-500/10",
  hard: "text-red-400 bg-red-500/10",
};
const diffLabel: Record<string, string> = { easy: "Usor", medium: "Mediu", hard: "Dificil" };

export default function PublicProfilePage({ params }: { params: Promise<{ identifier: string }> }) {
  const { identifier } = use(params);
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const isGuest = status !== "loading" && !session;

  useEffect(() => {
    fetch(`/api/users/${encodeURIComponent(identifier)}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then((d) => {
        if (d) { setProfile(d); setFollowing(d.isFollowing); }
      });
  }, [identifier]);

  async function toggleFollow() {
    if (!profile) return;
    setFollowLoading(true);
    const method = following ? "DELETE" : "POST";
    await fetch(`/api/follow/${profile.id}`, { method });
    setFollowing(!following);
    setProfile(p => p ? {
      ...p,
      isFollowing: !following,
      followersCount: p.followersCount + (following ? -1 : 1),
    } : p);
    setFollowLoading(false);
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <p className="text-lg font-semibold" style={{ color: "var(--text)" }}>Utilizator negasit</p>
          <Link href="/users" className="text-sm text-indigo-400 hover:text-indigo-300">← Inapoi la cautare</Link>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center" style={{ color: "var(--text-muted)" }}>Se incarca...</div>
      </div>
    );
  }

  const displayName = profile.username ? `@${profile.username}` : profile.name;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main className="max-w-2xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
        <Link href="/users" className="flex items-center gap-1.5 text-sm hover:text-indigo-400 transition-colors w-fit" style={{ color: "var(--text-muted)" }}>
          <ArrowLeft className="w-4 h-4" /> Inapoi la cautare
        </Link>

        {/* Header card */}
        <div className="rounded-2xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
            >
              {(profile.username || profile.name || "?").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>{displayName}</h1>
                  {profile.username && <p className="text-sm" style={{ color: "var(--text-muted)" }}>{profile.name}</p>}
                </div>
                {!profile.isSelf && !isGuest && (
                  <button
                    onClick={toggleFollow}
                    disabled={followLoading}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm transition-colors shrink-0 ${
                      following
                        ? "border border-red-500/20 text-red-400 hover:bg-red-500/10"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                    }`}
                  >
                    {following ? <><UserMinus className="w-3.5 h-3.5" /> Unfollow</> : <><UserPlus className="w-3.5 h-3.5" /> Urmareste</>}
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-sm">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span style={{ color: "var(--text-muted)" }}>Nivel {profile.level}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Zap className="w-4 h-4 text-indigo-400" />
                  <span style={{ color: "var(--text-muted)" }}>{profile.xp} XP</span>
                </div>
                {profile.streak > 0 && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span style={{ color: "var(--text-muted)" }}>{profile.streak} zile streak</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span style={{ color: "var(--text-muted)" }}>{profile.solvedProblems.length} probleme rezolvate</span>
                </div>
              </div>
              {/* Followers */}
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <span className="font-semibold" style={{ color: "var(--text)" }}>{profile.followersCount}</span> urmăritori
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <span className="font-semibold" style={{ color: "var(--text)" }}>{profile.followingCount}</span> urmăriți
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        {profile.badges.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-indigo-400" />
              <h2 className="font-semibold text-sm" style={{ color: "var(--text)" }}>Badge-uri ({profile.badges.length})</h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {profile.badges.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                  title={b.description}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <p className="text-xs font-medium leading-tight" style={{ color: "var(--text)" }}>{b.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solved problems */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <h2 className="font-semibold text-sm" style={{ color: "var(--text)" }}>
              Probleme rezolvate ({profile.solvedProblems.length})
            </h2>
          </div>

          {profile.solvedProblems.length === 0 ? (
            <div className="rounded-xl border p-6 text-center" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Nicio problema rezolvata inca.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {profile.solvedProblems.map((p) => (
                <Link
                  key={p.id} href={`/problems/${p.slug}`}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl border hover:border-indigo-500/30 transition-all"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{p.title}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Clasa {p.grade}{p.chapter ? ` · ${p.chapter}` : ""}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ml-3 ${diffColor[p.difficulty] ?? ""}`}>
                    {diffLabel[p.difficulty] ?? p.difficulty}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
