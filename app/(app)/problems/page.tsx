"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, ChevronRight, BookOpen } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/Badge";
import { useSession } from "next-auth/react";

interface Problem {
  id: string;
  number: number;
  title: string;
  slug: string;
  difficulty: string;
  category: string;
  grade: number;
  chapter: string;
  _count: { submissions: number; testCases: number };
}

const DIFFICULTIES = ["toate", "easy", "medium", "hard"];
const GRADES = [0, 9, 10, 11, 12];

const CHAPTERS_BY_GRADE: Record<number, string[]> = {
  9: [
    "Operatori si expresii", "Structura de decizie", "Structuri repetitive",
    "Algoritmi elementari", "Prelucrarea cifrelor", "Siruri unidimensionale",
    "Siruri bidimensionale", "Subprograme", "Fisiere",
  ],
  10: [
    "Metode de sortare", "Cautare binara", "Recursivitate",
    "Divide et impera", "Backtracking", "Stive si cozi",
  ],
  11: [
    "Programare dinamica", "Greedy", "Grafuri - introducere",
    "Parcurgeri grafuri (BFS/DFS)", "Arbori", "Grafuri ponderate",
  ],
  12: [
    "Algoritmi avansati pe grafuri", "Structuri de date avansate",
    "Fluxuri in retele", "Geometrie computationala", "Tehnici avansate",
  ],
};

export default function ProblemsPage() {
  const { status } = useSession();

  const [problems, setProblems] = useState<Problem[]>([]);
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState(0);
  const [chapter, setChapter] = useState("toate");
  const [difficulty, setDifficulty] = useState("toate");
  const [loading, setLoading] = useState(true);

  const chapters = grade > 0 ? ["toate", ...(CHAPTERS_BY_GRADE[grade] ?? [])] : ["toate"];

  useEffect(() => {
    setChapter("toate");
  }, [grade]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (difficulty !== "toate") params.set("difficulty", difficulty);
    if (grade > 0) params.set("grade", String(grade));
    if (chapter !== "toate") params.set("chapter", chapter);
    setLoading(true);
    fetch(`/api/problems?${params}`)
      .then((r) => r.json())
      .then((d) => { setProblems(d); setLoading(false); });
  }, [difficulty, grade, chapter]);

  const q = search.toLowerCase().replace(/^#/, "");
  const filtered = useMemo(
    () => problems.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.chapter.toLowerCase().includes(q) ||
      String(p.number).includes(q)
    ),
    [problems, q]
  );

  const grouped = useMemo(() => {
    if (grade > 0) return null;
    const g: Record<number, Problem[]> = {};
    for (const p of filtered) {
      (g[p.grade] ??= []).push(p);
    }
    return g;
  }, [filtered, grade]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Probleme</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{problems.length} probleme disponibile</p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Cauta dupa titlu, capitol sau #numar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none border focus:border-indigo-500 transition-colors"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text)" }}
          />
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-3 mb-4">
          {/* Grade filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  grade === g ? "bg-indigo-600 text-white" : "hover:bg-black/5"
                }`}
                style={{ color: grade === g ? undefined : "var(--text-muted)" }}
              >
                {g === 0 ? "Toate clasele" : `Clasa ${g}`}
              </button>
            ))}
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  difficulty === d ? "bg-indigo-600 text-white" : "hover:bg-black/5"
                }`}
                style={{ color: difficulty === d ? undefined : "var(--text-muted)" }}
              >
                {d === "toate" ? "Orice dificultate" : d === "easy" ? "Usor" : d === "medium" ? "Mediu" : "Greu"}
              </button>
            ))}
          </div>
        </div>

        {/* Chapter filter */}
        {grade > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {chapters.map((c) => (
              <button
                key={c}
                onClick={() => setChapter(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  chapter === c
                    ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                    : "border-transparent hover:border-indigo-500/20"
                }`}
                style={{ color: chapter === c ? undefined : "var(--text-muted)" }}
              >
                {c === "toate" ? "Toate capitolele" : c}
              </button>
            ))}
          </div>
        )}

        {/* Problems */}
        {loading ? (
          <div className="text-center py-16" style={{ color: "var(--text-muted)" }}>Se incarca...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16" style={{ color: "var(--text-muted)" }}>Nicio problema gasita.</div>
        ) : grade > 0 ? (
          <div className="flex flex-col gap-2">
            {filtered.map((p, i) => <ProblemRow key={p.id} problem={p} showGrade={false} />)}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {[9, 10, 11, 12].map((g) => {
              const probs = grouped?.[g];
              if (!probs?.length) return null;
              return (
                <div key={g}>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <h2 className="font-semibold text-sm" style={{ color: "var(--text)" }}>Clasa a {g}-a</h2>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}>
                      {probs.length} probleme
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {probs.map((p, i) => <ProblemRow key={p.id} problem={p} showGrade={false} />)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

function ProblemRow({ problem, showGrade }: { problem: Problem; showGrade: boolean }) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="flex items-center gap-4 px-5 py-4 rounded-xl border hover:border-indigo-500/30 transition-all group"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <span className="text-xs w-8 text-right shrink-0 font-mono tabular-nums" style={{ color: "var(--text-muted)" }}>
        #{problem.number}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate transition-colors group-hover:text-indigo-400" style={{ color: "var(--text)" }}>
          {problem.title}
        </h3>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {problem.chapter && (
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>{problem.chapter}</span>
          )}
          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
            <Clock className="w-3 h-3" />
            {problem._count.submissions} trimiteri
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {showGrade && (
          <span className="text-xs px-2 py-0.5 rounded-full border" style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>
            Cls. {problem.grade}
          </span>
        )}
        <Badge value={problem.difficulty} />
        <ChevronRight className="w-4 h-4 transition-colors group-hover:text-indigo-400" style={{ color: "var(--text-muted)" }} />
      </div>
    </Link>
  );
}
