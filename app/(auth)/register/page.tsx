"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Code2, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/lib/theme";

export default function RegisterPage() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Eroare la inregistrare.");
      setLoading(false);
      return;
    }
    await signIn("credentials", { email, password, redirect: false });
    router.push("/problems");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* ── Animated background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-10 -left-20 w-[480px] h-[480px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle at center, #6366f1 0%, #8b5cf6 60%, transparent 100%)",
            opacity: 0.18,
            animation: "orb-float-1 16s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-20 -right-16 w-[420px] h-[420px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle at center, #3b82f6 0%, #06b6d4 60%, transparent 100%)",
            opacity: 0.15,
            animation: "orb-float-2 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle at center, #a855f7 0%, #ec4899 60%, transparent 100%)",
            opacity: 0.12,
            animation: "orb-float-3 12s ease-in-out infinite",
          }}
        />
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
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>Creeaza-ti contul gratuit</p>
        </div>

        <div
          className="rounded-2xl border p-7 backdrop-blur-md"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              id="name" label="Nume" placeholder="Ion Popescu"
              value={name} onChange={(e) => setName(e.target.value)} required
            />
            <Input
              id="email" label="Email" type="email" placeholder="elev@exemplu.ro"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
            <Input
              id="password" label="Parola" type="password" placeholder="Minim 6 caractere"
              value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required
            />
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--text-muted)" }}>Rol</label>
              <div className="grid grid-cols-2 gap-2">
                {(["student", "teacher"] as const).map(r => (
                  <button
                    key={r} type="button" onClick={() => setRole(r)}
                    className={`py-2 rounded-xl text-sm font-medium border transition-all ${
                      role === r ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-400" : "border-transparent hover:border-indigo-500/20"
                    }`}
                    style={{ color: role === r ? undefined : "var(--text-muted)", background: role === r ? undefined : "var(--bg-hover)" }}
                  >
                    {r === "student" ? "Elev" : "Profesor"}
                  </button>
                ))}
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <Button type="submit" loading={loading} className="w-full mt-1">
              {loading ? "Se inregistreaza..." : "Creeaza cont"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm mt-4" style={{ color: "var(--text-muted)" }}>
          Ai deja cont?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Intra in cont
          </Link>
        </p>
      </div>
    </div>
  );
}
