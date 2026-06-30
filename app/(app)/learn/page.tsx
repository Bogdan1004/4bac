"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronRight, Lock, CheckCircle2, Code2, Layers, GitBranch, Cpu } from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface Chapter {
  title: string;
  slug?: string;
  topics: string[];
  problemSlug?: string;
  status: "available" | "coming";
}

function toSlug(s: string) {
  return s.toLowerCase()
    .replace(/[șş]/g, "s").replace(/[țţ]/g, "t")
    .replace(/[ăâ]/g, "a").replace(/[î]/g, "i")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

interface GradeData {
  grade: number;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  chapters: Chapter[];
}

const curriculum: GradeData[] = [
  {
    grade: 9,
    label: "Clasa a 9-a",
    description: "Fundamentele algoritmicii si programarii in C++",
    icon: <Code2 className="w-5 h-5" />,
    color: "from-blue-500/20 to-blue-600/5",
    chapters: [
      {
        title: "Notiuni introductive C++",
        topics: ["Structura unui program", "Variabile si tipuri de date", "Citire/scriere (cin/cout)", "Operatori aritmetici si logici"],
        status: "coming",
      },
      {
        title: "Structuri de control",
        topics: ["if/else, switch", "Bucle: for, while, do-while", "break si continue", "Structuri imbricate"],
        status: "coming",
      },
      {
        title: "Algoritmi elementari",
        topics: ["Suma cifrelor unui numar", "Verificare numar prim", "CMMDC si CMMMC (Euclid)", "Descompunere in factori primi"],
        status: "coming",
      },
      {
        title: "Prelucrarea cifrelor",
        topics: ["Extragerea cifrelor", "Numar palindrom", "Cifrele pare/impare", "Suma, produsul cifrelor"],
        status: "coming",
      },
      {
        title: "Siruri unidimensionale (vectori)",
        topics: ["Declarare si parcurgere", "Minim, maxim, suma", "Numarare elemente", "Citire/scriere vectori"],
        status: "coming",
      },
      {
        title: "Siruri bidimensionale (matrici)",
        topics: ["Declarare si initializare", "Parcurgere pe linii/coloane", "Diagonale", "Operatii pe matrici"],
        status: "coming",
      },
      {
        title: "Subprograme (functii)",
        topics: ["Declarare si apel", "Parametri si valori returnate", "Variabile locale vs globale", "Functii recursive simple"],
        status: "coming",
      },
      {
        title: "Siruri de caractere",
        topics: ["Tipul char si string", "Lungime, concatenare", "Comparare siruri", "Cautare caracter"],
        status: "coming",
      },
      {
        title: "Fisiere text",
        topics: ["Deschidere si inchidere", "Citire/scriere din fisier", "fstream, ifstream, ofstream", "Prelucrare fisiere"],
        status: "coming",
      },
    ],
  },
  {
    grade: 10,
    label: "Clasa a 10-a",
    description: "Algoritmi clasici, sortare, cautare si recursivitate",
    icon: <Layers className="w-5 h-5" />,
    color: "from-purple-500/20 to-purple-600/5",
    chapters: [
      {
        title: "Metode de sortare",
        topics: ["Sortare prin selectie", "Sortare prin insertie", "Bubble sort", "STL sort()"],
        status: "coming",
      },
      {
        title: "Cautare binara",
        topics: ["Principiul cautarii binare", "Implementare iterativa", "lower_bound/upper_bound", "Aplicatii practice"],
        status: "coming",
      },
      {
        title: "Complexitate algoritmica",
        topics: ["Notiunea O(n)", "Analiza bucle", "Comparatie algoritmi", "Spatiu vs timp"],
        status: "coming",
      },
      {
        title: "Recursivitate",
        topics: ["Cazul de baza si recursiv", "Factorial, Fibonacci", "Turn Hanoi", "Tail recursion"],
        status: "coming",
      },
      {
        title: "Divide et impera",
        topics: ["Strategia divide et impera", "MergeSort", "QuickSort", "Cautare binara recursiva"],
        status: "coming",
      },
      {
        title: "Backtracking",
        topics: ["Principiu si implementare", "Permutari si combinari", "Problema reginelor", "Labirint"],
        status: "coming",
      },
      {
        title: "Stive si cozi",
        topics: ["Structura stack (LIFO)", "Structura queue (FIFO)", "Aplicatii stive", "Aplicatii cozi"],
        status: "coming",
      },
      {
        title: "Liste liniare",
        topics: ["Liste simplu inlantuite", "Inserare si stergere", "Liste dublu inlantuite", "STL list"],
        status: "coming",
      },
    ],
  },
  {
    grade: 11,
    label: "Clasa a 11-a",
    description: "Programare dinamica, greedy si introducere in grafuri",
    icon: <GitBranch className="w-5 h-5" />,
    color: "from-green-500/20 to-green-600/5",
    chapters: [
      {
        title: "Programare dinamica",
        topics: ["Subsir crescator maxim (LIS)", "Subsir comun maxim (LCS)", "Problema rucsacului", "Kadane (subsir suma maxima)"],
        status: "coming",
      },
      {
        title: "Greedy",
        topics: ["Principiul greedy", "Selectie activitati", "Problema benzinariilor", "Huffman coding"],
        status: "coming",
      },
      {
        title: "Grafuri — introducere",
        topics: ["Definitii si reprezentari", "Lista de adiacenta", "Matrice de adiacenta", "Tipuri de grafuri"],
        status: "coming",
      },
      {
        title: "Parcurgeri grafuri",
        topics: ["BFS (latime)", "DFS (adancime)", "Componente conexe", "Sortare topologica"],
        status: "coming",
      },
      {
        title: "Arbori",
        topics: ["Definitie si proprietati", "DFS pe arbori", "LCA (cel mai mic stramos comun)", "Arbori binari"],
        status: "coming",
      },
      {
        title: "Grafuri ponderate",
        topics: ["Dijkstra", "Bellman-Ford", "Floyd-Warshall", "Drumuri minime"],
        status: "coming",
      },
      {
        title: "Arbori de acoperire minima",
        topics: ["Kruskal", "Prim", "Union-Find", "Aplicatii MST"],
        status: "coming",
      },
    ],
  },
  {
    grade: 12,
    label: "Clasa a 12-a",
    description: "Algoritmi avansati, structuri de date si pregatire olimpiada",
    icon: <Cpu className="w-5 h-5" />,
    color: "from-orange-500/20 to-orange-600/5",
    chapters: [
      {
        title: "Structuri de date avansate",
        topics: ["Arbori de segment", "Arbori indexati (BIT/Fenwick)", "Trie", "Heap"],
        status: "coming",
      },
      {
        title: "Algoritmi avansati pe grafuri",
        topics: ["Componente tare conexe (Tarjan)", "Punti si puncte de articulatie", "Fluxuri maxime", "Bipartit matching"],
        status: "coming",
      },
      {
        title: "Tehnici avansate de DP",
        topics: ["DP pe arbori", "DP cu bitmask", "DP pe intervale", "Optimizari DP"],
        status: "coming",
      },
      {
        title: "Geometrie computationala",
        topics: ["Infasurare convexa", "Intersectie segmente", "Arie poligon", "Point in polygon"],
        status: "coming",
      },
      {
        title: "Tehnici avansate",
        topics: ["Square root decomposition", "Algoritm Mo", "Persistent data structures", "Hashing"],
        status: "coming",
      },
    ],
  },
];

// Attach slug to each chapter at runtime so the curriculum data stays clean
const curriculumWithSlugs = curriculum.map((g) => ({
  ...g,
  chapters: g.chapters.map((ch) => ({ ...ch, slug: toSlug(ch.title) })),
}));

export default function LearnPage() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);

  const displayed = selectedGrade
    ? curriculumWithSlugs.filter((g) => g.grade === selectedGrade)
    : curriculumWithSlugs;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main className="max-w-5xl mx-auto w-full px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>Sectiunea de invatare</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Curriculum complet de informatica, clasa a 9-a pana la clasa a 12-a
          </p>
        </div>

        {/* Grade selector */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setSelectedGrade(null)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              !selectedGrade ? "bg-indigo-600 text-white border-transparent" : "hover:border-indigo-500/30"
            }`}
            style={!selectedGrade ? {} : { borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            Toate clasele
          </button>
          {curriculum.map((g) => (
            <button
              key={g.grade}
              onClick={() => setSelectedGrade(g.grade)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                selectedGrade === g.grade ? "bg-indigo-600 text-white border-transparent" : "hover:border-indigo-500/30"
              }`}
              style={selectedGrade === g.grade ? {} : { borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              Clasa {g.grade}
            </button>
          ))}
        </div>

        {/* Grades */}
        <div className="flex flex-col gap-10">
          {displayed.map((gradeData) => (
            <div key={gradeData.grade}>
              {/* Grade header */}
              <div
                className={`rounded-2xl p-5 mb-4 bg-gradient-to-r ${gradeData.color} border`}
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-400">
                    {gradeData.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg" style={{ color: "var(--text)" }}>{gradeData.label}</h2>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>{gradeData.description}</p>
                  </div>
                  <Link
                    href={`/problems?grade=${gradeData.grade}`}
                    className="ml-auto flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Probleme clasa {gradeData.grade}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Chapters grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {gradeData.chapters.map((chapter) => (
                  <div
                    key={chapter.title}
                    className={`rounded-xl border p-4 transition-all ${
                      chapter.status === "available" ? "hover:border-indigo-500/30" : "opacity-60"
                    }`}
                    style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        {chapter.status === "available"
                          ? <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                          : <Lock className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} />}
                        {chapter.status === "available" ? (
                          <Link
                            href={`/learn/${gradeData.grade}/${chapter.slug}`}
                            className="font-semibold text-sm leading-tight hover:text-indigo-400 transition-colors"
                            style={{ color: "var(--text)" }}
                          >
                            {chapter.title}
                          </Link>
                        ) : (
                          <h3 className="font-semibold text-sm leading-tight" style={{ color: "var(--text)" }}>
                            {chapter.title}
                          </h3>
                        )}
                      </div>
                      {chapter.status === "available" ? (
                        <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded-full shrink-0">
                          Disponibil
                        </span>
                      ) : (
                        <span className="text-xs px-1.5 py-0.5 rounded-full border shrink-0" style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>
                          In curand
                        </span>
                      )}
                    </div>

                    <ul className="flex flex-col gap-1 mb-3">
                      {chapter.topics.map((topic) => (
                        <li key={topic} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                          <CheckCircle2 className="w-3 h-3 text-indigo-400/60 shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>

                    {chapter.status === "available" && (
                      <Link
                        href={`/problems?grade=${gradeData.grade}&chapter=${encodeURIComponent(chapter.title)}`}
                        className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 mt-2 transition-colors"
                      >
                        <Code2 className="w-3 h-3" />
                        Rezolva probleme din acest capitol
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
