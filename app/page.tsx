"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Code2, Zap, Trophy, Flame, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const features = [
  { icon: Code2, title: "Editor C++ integrat", desc: "Monaco Editor (VS Code) direct in browser, cu syntax highlighting si autocomplete." },
  { icon: Zap, title: "Evaluare automata", desc: "Codul tau este compilat si testat pe cazuri reale. Primesti scor si feedback instant." },
  { icon: Trophy, title: "Clasament & XP", desc: "Castiga puncte de experienta, urca in nivel si concureaza cu colegii." },
  { icon: Flame, title: "Streak zilnic", desc: "Rezolva cel putin o problema in fiecare zi si mentine-ti streak-ul activ." },
];

const difficulties = [
  { label: "Usor", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", count: "2 probleme" },
  { label: "Mediu", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", count: "2 probleme" },
  { label: "Greu", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", count: "2 probleme" },
];

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-indigo-300 text-sm mb-8">
            <Flame className="w-3.5 h-3.5" />
            Pregatire bacalaureat informatica
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight" style={{ color: "var(--text)" }}>
            Invata C++ rezolvand
            <span className="text-indigo-400"> probleme reale</span>
          </h1>
          <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            O platforma interactiva pentru elevii de liceu. Scrie cod, primesti feedback instant si concureaza cu colegii.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/problems"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25"
            >
              {session ? "Continua sa rezolvi" : "Incepe sa rezolvi"} <ArrowRight className="w-4 h-4" />
            </Link>
            {!session && (
              <Link
                href="/register"
                className="px-6 py-3 rounded-xl font-medium transition-all border hover:border-indigo-500/30"
                style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
              >
                Creeaza cont gratuit
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y py-6" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-12 flex-wrap">
          {[
            { label: "Probleme disponibile", value: "16+" },
            { label: "Teste automate", value: "100%" },
            { label: "Compilator C++17", value: "Online" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold" style={{ color: "var(--text)" }}>{s.value}</div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center mb-12" style={{ color: "var(--text)" }}>
          Tot ce ai nevoie intr-un singur loc
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border p-5 flex flex-col gap-3 hover:border-indigo-500/30 transition-all"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="font-semibold text-sm" style={{ color: "var(--text)" }}>{title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Difficulty overview */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div
          className="rounded-2xl border p-8 flex flex-col sm:flex-row items-center gap-8"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>Probleme pe niveluri</h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              De la sume simple la algoritmi avansati. Fiecare problema are teste ascunse — nu poti trisa!
            </p>
            <ul className="flex flex-col gap-2">
              {["Algoritmi de baza (sortare, cautare)", "Matematica (CMMDC, numere prime)", "Programare dinamica (Kadane, LCS)"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 w-full sm:w-auto">
            {difficulties.map((d) => (
              <div key={d.label} className={`flex items-center justify-between gap-6 px-4 py-2.5 rounded-lg border ${d.bg}`}>
                <span className={`font-medium text-sm ${d.color}`}>{d.label}</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-5xl mx-auto px-6 pb-20 w-full">
        <div
          className="rounded-2xl border p-8 flex flex-col sm:flex-row items-center gap-8"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>Contact</h2>
            <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
              Ai o intrebare, o problema de raportat sau vrei sa propui o colaborare?
              Scrie-ne oricand si iti raspundem cat mai curand.
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Pentru <span style={{ color: "var(--text)" }} className="font-medium">sedinte individuale de aprofundare a materiei</span>, trimite-ne un email la{" "}
              <a href="mailto:contact@4bac.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">contact@4bac.com</a>{" "}
              cu numele tau, clasa si capitolele la care doresti ajutor.
            </p>
          </div>
          <a
            href="mailto:contact@4bac.com"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shrink-0"
          >
            <Mail className="w-4 h-4" />
            contact@4bac.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-auto py-8 px-6" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-sm" style={{ color: "var(--text)" }}>4bac</span>
          </div>
          <p className="text-xs text-center max-w-md" style={{ color: "var(--text-muted)" }}>
            Platforma gratuita de pregatire pentru bacalaureatul de informatica. Probleme de algoritmică C++,
            evaluare automata, clasament si asistent AI — totul intr-un singur loc pentru elevii romani.
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 4bac · Toate drepturile rezervate
          </p>
        </div>
      </footer>
    </div>
  );
}
