import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ChevronRight, Code2, CheckCircle2, ArrowLeft, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { prisma } from "@/lib/prisma";

// Curriculum mirrors learn/page.tsx — minimal copy for server-side lookup
const curriculum = [
  {
    grade: 9,
    chapters: [
      { title: "Notiuni introductive C++", topics: ["Structura unui program", "Variabile si tipuri de date", "Citire/scriere (cin/cout)", "Operatori aritmetici si logici"] },
      { title: "Structuri de control", topics: ["if/else, switch", "Bucle: for, while, do-while", "break si continue", "Structuri imbricate"] },
      { title: "Algoritmi elementari", topics: ["Suma cifrelor unui numar", "Verificare numar prim", "CMMDC si CMMMC (Euclid)", "Descompunere in factori primi"] },
      { title: "Prelucrarea cifrelor", topics: ["Extragerea cifrelor", "Numar palindrom", "Cifrele pare/impare", "Suma, produsul cifrelor"] },
      { title: "Siruri unidimensionale (vectori)", topics: ["Declarare si parcurgere", "Minim, maxim, suma", "Numarare elemente", "Citire/scriere vectori"] },
      { title: "Siruri bidimensionale (matrici)", topics: ["Declarare si initializare", "Parcurgere pe linii/coloane", "Diagonale", "Operatii pe matrici"] },
      { title: "Subprograme (functii)", topics: ["Declarare si apel", "Parametri si valori returnate", "Variabile locale vs globale", "Functii recursive simple"] },
      { title: "Siruri de caractere", topics: ["Tipul char si string", "Lungime, concatenare", "Comparare siruri", "Cautare caracter"] },
      { title: "Fisiere text", topics: ["Deschidere si inchidere", "Citire/scriere din fisier", "fstream, ifstream, ofstream", "Prelucrare fisiere"] },
    ],
  },
  {
    grade: 10,
    chapters: [
      { title: "Metode de sortare", topics: ["Sortare prin selectie", "Sortare prin insertie", "Bubble sort", "STL sort()"] },
      { title: "Cautare binara", topics: ["Principiul cautarii binare", "Implementare iterativa", "lower_bound/upper_bound", "Aplicatii practice"] },
      { title: "Complexitate algoritmica", topics: ["Notiunea O(n)", "Analiza bucle", "Comparatie algoritmi", "Spatiu vs timp"] },
      { title: "Recursivitate", topics: ["Cazul de baza si recursiv", "Factorial, Fibonacci", "Turn Hanoi", "Tail recursion"] },
      { title: "Divide et impera", topics: ["Strategia divide et impera", "MergeSort", "QuickSort", "Cautare binara recursiva"] },
      { title: "Backtracking", topics: ["Principiu si implementare", "Permutari si combinari", "Problema reginelor", "Labirint"] },
      { title: "Stive si cozi", topics: ["Structura stack (LIFO)", "Structura queue (FIFO)", "Aplicatii stive", "Aplicatii cozi"] },
      { title: "Liste liniare", topics: ["Liste simplu inlantuite", "Inserare si stergere", "Liste dublu inlantuite", "STL list"] },
    ],
  },
  {
    grade: 11,
    chapters: [
      { title: "Programare dinamica", topics: ["Subsir crescator maxim (LIS)", "Subsir comun maxim (LCS)", "Problema rucsacului", "Kadane (subsir suma maxima)"] },
      { title: "Greedy", topics: ["Principiul greedy", "Selectie activitati", "Problema benzinariilor", "Huffman coding"] },
      { title: "Grafuri — introducere", topics: ["Definitii si reprezentari", "Lista de adiacenta", "Matrice de adiacenta", "Tipuri de grafuri"] },
      { title: "Parcurgeri grafuri", topics: ["BFS (latime)", "DFS (adancime)", "Componente conexe", "Sortare topologica"] },
      { title: "Arbori", topics: ["Definitie si proprietati", "DFS pe arbori", "LCA (cel mai mic stramos comun)", "Arbori binari"] },
      { title: "Grafuri ponderate", topics: ["Dijkstra", "Bellman-Ford", "Floyd-Warshall", "Drumuri minime"] },
      { title: "Arbori de acoperire minima", topics: ["Kruskal", "Prim", "Union-Find", "Aplicatii MST"] },
    ],
  },
  {
    grade: 12,
    chapters: [
      { title: "Structuri de date avansate", topics: ["Arbori de segment", "Arbori indexati (BIT/Fenwick)", "Trie", "Heap"] },
      { title: "Algoritmi avansati pe grafuri", topics: ["Componente tare conexe (Tarjan)", "Punti si puncte de articulatie", "Fluxuri maxime", "Bipartit matching"] },
      { title: "Tehnici avansate de DP", topics: ["DP pe arbori", "DP cu bitmask", "DP pe intervale", "Optimizari DP"] },
      { title: "Geometrie computationala", topics: ["Infasurare convexa", "Intersectie segmente", "Arie poligon", "Point in polygon"] },
      { title: "Tehnici avansate", topics: ["Square root decomposition", "Algoritm Mo", "Persistent data structures", "Hashing"] },
    ],
  },
];

function toSlug(s: string) {
  return s.toLowerCase()
    .replace(/[șş]/g, "s").replace(/[țţ]/g, "t")
    .replace(/[ăâ]/g, "a").replace(/[î]/g, "i")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

interface PageProps {
  params: Promise<{ grade: string; chapter: string }>;
}

export default async function LessonPage({ params }: PageProps) {
  const { grade: gradeParam, chapter: chapterSlug } = await params;
  const grade = parseInt(gradeParam, 10);

  const gradeData = curriculum.find((g) => g.grade === grade);
  if (!gradeData) notFound();

  const chapter = gradeData.chapters.find((ch) => toSlug(ch.title) === chapterSlug);
  if (!chapter) notFound();

  const problems = await prisma.problem.findMany({
    where: { grade, chapter: chapter.title, isPublished: true },
    select: { id: true, title: true, slug: true, difficulty: true },
    orderBy: { createdAt: "asc" },
  });

  const difficultyLabel: Record<string, string> = {
    easy: "Usor",
    medium: "Mediu",
    hard: "Dificil",
  };
  const difficultyColor: Record<string, string> = {
    easy: "text-green-400 bg-green-500/10",
    medium: "text-yellow-400 bg-yellow-500/10",
    hard: "text-red-400 bg-red-500/10",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main className="max-w-3xl mx-auto w-full px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/learn" className="hover:text-indigo-400 transition-colors">Invatare</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/learn?grade=${grade}`} className="hover:text-indigo-400 transition-colors">
            Clasa a {grade}-a
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: "var(--text)" }}>{chapter.title}</span>
        </div>

        {/* Chapter header */}
        <div
          className="rounded-2xl border p-6 mb-6"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-1" style={{ color: "var(--text)" }}>{chapter.title}</h1>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Clasa a {grade}-a</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium mb-3" style={{ color: "var(--text)" }}>Subiecte acoperite:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {chapter.topics.map((topic) => (
                <li key={topic} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                  <CheckCircle2 className="w-4 h-4 text-indigo-400/70 shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Coming soon notice */}
        <div
          className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 mb-6 flex items-start gap-3"
        >
          <Clock className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Lectia teoretica pentru acest capitol este in curs de scriere. Intre timp, exerseaza cu problemele de mai jos!
          </p>
        </div>

        {/* Problems */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <h2 className="font-semibold text-sm" style={{ color: "var(--text)" }}>
              Probleme din acest capitol ({problems.length})
            </h2>
          </div>

          {problems.length === 0 ? (
            <div
              className="rounded-xl border p-6 text-center"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <p className="text-sm text-slate-500">Nu exista inca probleme pentru acest capitol.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {problems.map((p: { id: string; title: string; slug: string; difficulty: string }) => (
                <Link
                  key={p.id}
                  href={`/problems/${p.slug}`}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border hover:border-indigo-500/30 transition-all"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{p.title}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[p.difficulty] ?? ""}`}>
                    {difficultyLabel[p.difficulty] ?? p.difficulty}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/learn"
          className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 mt-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Inapoi la sectiunea de invatare
        </Link>
      </main>
    </div>
  );
}
