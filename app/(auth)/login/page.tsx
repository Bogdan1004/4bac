"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Code2, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/lib/theme";

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError("Email sau parola incorecta.");
    } else {
      router.push("/");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* ── Animated background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orb 1 — indigo/violet, top-left */}
        <div
          className="absolute -top-10 -left-20 w-[480px] h-[480px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle at center, #6366f1 0%, #8b5cf6 60%, transparent 100%)",
            opacity: 0.18,
            animation: "orb-float-1 16s ease-in-out infinite",
          }}
        />
        {/* Orb 2 — blue/cyan, bottom-right */}
        <div
          className="absolute -bottom-20 -right-16 w-[420px] h-[420px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle at center, #3b82f6 0%, #06b6d4 60%, transparent 100%)",
            opacity: 0.15,
            animation: "orb-float-2 20s ease-in-out infinite",
          }}
        />
        {/* Orb 3 — pink/purple, center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle at center, #a855f7 0%, #ec4899 60%, transparent 100%)",
            opacity: 0.12,
            animation: "orb-float-3 12s ease-in-out infinite",
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)",
            backgroundSize: "36px 36px",
            opacity: 0.5,
          }}
        />
      </div>

      {/* ── Theme toggle ── */}
      <button
        onClick={toggle}
        className="fixed top-5 right-5 p-2 rounded-xl border transition-all hover:scale-105 z-20"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-muted)" }}
        title={theme === "dark" ? "Tema clara" : "Tema intunecata"}
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* ── Card ── */}
      <div className="w-full max-w-sm animate-slide-up relative z-10">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-xl mb-2"
            style={{ color: "var(--text)" }}
          >
            <Code2 className="w-5 h-5 text-indigo-400" />
            4bac
          </Link>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>Bine ai revenit!</p>
        </div>

        <div
          className="rounded-2xl border p-7 backdrop-blur-md"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              id="email" label="Email" type="email" placeholder="elev@exemplu.ro"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
            <Input
              id="password" label="Parola" type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} required
            />
            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <Button type="submit" loading={loading} className="w-full mt-1">
              {loading ? "Se conecteaza..." : "Intra in cont"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm mt-4" style={{ color: "var(--text-muted)" }}>
          Nu ai cont?{" "}
          <Link href="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Inregistreaza-te
          </Link>
        </p>
        <p className="text-center text-sm mt-2">
          <Link href="/problems" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Continua ca Guest →
          </Link>
        </p>
      </div>
    </div>
  );
}
