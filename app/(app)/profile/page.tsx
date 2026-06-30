"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock, Award, Check, X, Loader2, Code2, Lock as LockIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  earned: boolean;
}

interface SolvedProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  grade: number;
  chapter: string;
}

interface UserProfile {
  id: string;
  name: string;
  username: string | null;
  email: string;
  xp: number;
  level: number;
  streak: number;
  badges: { id: string; name: string; description: string; icon: string }[];
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{label}</label>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 rounded-lg text-sm border outline-none transition-all focus:border-indigo-500 ${props.className ?? ""}`}
      style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
    />
  );
}

type SaveState = "idle" | "saving" | "ok" | "error";

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <section
      className="rounded-2xl border p-6 flex flex-col gap-5"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-indigo-400" />
        <h2 className="text-base font-semibold" style={{ color: "var(--text)" }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

const diffColor: Record<string, string> = {
  easy: "text-green-400 bg-green-500/10",
  medium: "text-yellow-400 bg-yellow-500/10",
  hard: "text-red-400 bg-red-500/10",
};
const diffLabel: Record<string, string> = { easy: "Usor", medium: "Mediu", hard: "Dificil" };

export default function ProfilePage() {
  const { update, status } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [solvedProblems, setSolvedProblems] = useState<SolvedProblem[]>([]);
  const [allBadges, setAllBadges] = useState<Badge[]>([]);

  // Info form
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [infoState, setInfoState] = useState<SaveState>("idle");
  const [infoMsg, setInfoMsg] = useState("");

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwState, setPwState] = useState<SaveState>("idle");
  const [pwMsg, setPwMsg] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    fetch("/api/user/me")
      .then((r) => r.json())
      .then((d: UserProfile) => {
        setProfile(d);
        setName(d.name ?? "");
        setUsername(d.username ?? "");
        setEmail(d.email ?? "");
      });
    fetch("/api/user/solved")
      .then((r) => r.json())
      .then((d) => {
        setSolvedProblems(d.solvedProblems ?? []);
        setAllBadges(d.allBadges ?? []);
      });
  }, []);

  async function patchProfile(body: object) {
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let data: Record<string, string> = {};
    try { data = JSON.parse(text); } catch {
      return { ok: false, data: { error: "Eroare neasteptata de server." } };
    }
    return { ok: res.ok, data };
  }

  async function saveInfo(e: React.FormEvent) {
    e.preventDefault();
    setInfoState("saving");
    setInfoMsg("");
    const { ok, data } = await patchProfile({ name, username, email });
    if (!ok) {
      setInfoState("error");
      setInfoMsg(data.error ?? "Eroare la salvare.");
    } else {
      setInfoState("ok");
      setInfoMsg(data.message ?? "Modificarile au fost salvate.");
      if (data.name) {
        setProfile((p) => p ? { ...p, name: data.name, username: data.username ?? null, email: data.email } : p);
        await update(); // refresh JWT so Navbar reflects new username immediately
      }
    }
    setTimeout(() => setInfoState("idle"), 3000);
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setPwState("error"); setPwMsg("Parolele nu coincid."); return; }
    setPwState("saving");
    setPwMsg("");
    const { ok, data } = await patchProfile({ currentPassword, newPassword });
    if (!ok) {
      setPwState("error");
      setPwMsg(data.error ?? "Eroare la schimbarea parolei.");
    } else {
      setPwState("ok");
      setPwMsg("Parola a fost schimbata cu succes.");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    }
    setTimeout(() => setPwState("idle"), 3000);
  }

  if (!profile) {
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
      <main className="max-w-2xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
        {/* Avatar + title */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            {(profile.username || profile.name).charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Contul meu</h1>
            <p className="text-sm text-slate-500">Nivel {profile.level} · {profile.xp} XP</p>
          </div>
        </div>

        {/* Info */}
        <Section title="Informatii personale" icon={User}>
          <form onSubmit={saveInfo} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nume">
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Numele tau" required />
              </Field>
              <Field label="Username">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">@</span>
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" className="pl-7" />
                </div>
              </Field>
            </div>
            <Field label="Email">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplu.ro" required />
            </Field>
            <div className="flex items-center gap-3 pt-1">
              <button type="submit" disabled={infoState === "saving"}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-50">
                {infoState === "saving" && <Loader2 className="w-4 h-4 animate-spin" />}
                Salveaza
              </button>
              {infoState === "ok" && <span className="flex items-center gap-1 text-sm text-emerald-400"><Check className="w-4 h-4" /> {infoMsg}</span>}
              {infoState === "error" && <span className="flex items-center gap-1 text-sm text-red-400"><X className="w-4 h-4" /> {infoMsg}</span>}
            </div>
          </form>
        </Section>

        {/* Password */}
        <Section title="Schimba parola" icon={Lock}>
          <form onSubmit={savePassword} className="flex flex-col gap-4">
            <Field label="Parola curenta">
              <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" required />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Parola noua">
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="min. 6 caractere" required />
              </Field>
              <Field label="Confirma parola noua">
                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required />
              </Field>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button type="submit" disabled={pwState === "saving"}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-50">
                {pwState === "saving" && <Loader2 className="w-4 h-4 animate-spin" />}
                Schimba parola
              </button>
              {pwState === "ok" && <span className="flex items-center gap-1 text-sm text-emerald-400"><Check className="w-4 h-4" /> {pwMsg}</span>}
              {pwState === "error" && <span className="flex items-center gap-1 text-sm text-red-400"><X className="w-4 h-4" /> {pwMsg}</span>}
            </div>
          </form>
        </Section>

        {/* Solved problems */}
        <Section title={`Probleme rezolvate (${solvedProblems.length})`} icon={Code2}>
          {solvedProblems.length === 0 ? (
            <p className="text-sm text-slate-500 py-2">Nu ai rezolvat nicio problema inca.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {solvedProblems.map((p) => (
                <Link
                  key={p.id}
                  href={`/problems/${p.slug}`}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl border hover:border-indigo-500/30 transition-all"
                  style={{ background: "var(--bg)", borderColor: "var(--border)" }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{p.title}</p>
                    <p className="text-xs text-slate-500">Clasa {p.grade}{p.chapter ? ` · ${p.chapter}` : ""}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ml-3 ${diffColor[p.difficulty] ?? ""}`}>
                    {diffLabel[p.difficulty] ?? p.difficulty}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Section>

        {/* All badges */}
        <Section title="Badge-uri" icon={Award}>
          {allBadges.length === 0 ? (
            <p className="text-sm text-slate-500 py-2">Nu exista badge-uri definite inca.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allBadges.map((b) => (
                <div
                  key={b.id}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all ${
                    b.earned ? "" : "opacity-45 grayscale"
                  }`}
                  style={{ borderColor: b.earned ? "var(--accent)" : "var(--border)", background: "var(--bg)" }}
                >
                  <div className="relative">
                    <span className="text-3xl">{b.icon}</span>
                    {!b.earned && (
                      <LockIcon className="w-3.5 h-3.5 text-slate-400 absolute -bottom-1 -right-1" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{b.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{b.description}</p>
                  </div>
                  {b.earned && (
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Obtinut</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>
      </main>
    </div>
  );
}
