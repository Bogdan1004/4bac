"use client";

import { useEffect, useState, use, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  ChevronLeft, Play, CheckCircle2, XCircle, Clock, Cpu,
  Zap, Eye, EyeOff, Terminal, ChevronDown, ChevronUp, Send,
  Lock, User, ExternalLink
} from "lucide-react";

function extractSiteName(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const known: Record<string, string> = {
      "pbinfo.ro": "PBinfo",
      "infoarena.ro": "Infoarena",
      "nerdarena.ro": "NerdArena",
      "kilonova.ro": "Kilonova",
      "codeforces.com": "Codeforces",
      "leetcode.com": "LeetCode",
    };
    if (known[host]) return known[host];
    const label = host.split(".")[0];
    return label.charAt(0).toUpperCase() + label.slice(1);
  } catch {
    return url;
  }
}
import { CodeEditor } from "@/components/editor/CodeEditor";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MarkdownContent } from "@/components/problems/MarkdownContent";
import { ChatAssistant } from "@/components/problems/ChatAssistant";

const DEFAULT_CODE = "";

interface TestCase { id: string; input: string; output: string; points: number; isPublic: boolean; }
interface Problem {
  id: string; number: number; title: string; slug: string; description: string;
  difficulty: string; category: string; grade: number; chapter: string;
  sourceUrl: string; timeLimit: number; memoryLimit: number;
  testCases: TestCase[]; _count: { submissions: number };
}
interface TestResult { passed: boolean; input: string; output: string; expected: string; error: string | null; }
interface SubmissionResult {
  status: string; score: number; passedTests: number; totalTests: number;
  execTime: number; earnedXp: number; results: TestResult[];
}
interface Solution {
  id: string; code: string; createdAt: string;
  user: { name: string; username: string | null };
}

export default function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: session, status } = useSession();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "results" | "solutions">("description");
  const [showTestCases, setShowTestCases] = useState(false);
  const [expandedTest, setExpandedTest] = useState<number | null>(null);
  const [hasPerfect, setHasPerfect] = useState(false);
  const [solutions, setSolutions] = useState<Solution[] | null>(null);
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null);

  // Terminal state
  const [termInput, setTermInput] = useState("");
  const [termOutput, setTermOutput] = useState<{ type: "info"|"ok"|"err"|"out"; text: string }[]>([]);
  const [running, setRunning] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const termRef = useRef<HTMLDivElement>(null);

  const isGuest = status !== "loading" && !session;

  useEffect(() => {
    fetch(`/api/problems/${slug}`).then((r) => r.json()).then(setProblem);
  }, [slug]);

  // Check if user already has a 100p submission for this problem
  useEffect(() => {
    if (!slug || !session) return;
    fetch(`/api/problems/${slug}/solutions`)
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d) setHasPerfect(true); });
  }, [slug, session]);

  // Fetch solutions when tab is opened
  useEffect(() => {
    if (activeTab === "solutions" && hasPerfect && solutions === null) {
      fetch(`/api/problems/${slug}/solutions`)
        .then((r) => r.json())
        .then(setSolutions);
    }
  }, [activeTab, hasPerfect, solutions, slug]);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [termOutput]);

  async function handleSubmit() {
    if (!problem || !session) return;
    setSubmitting(true);
    setResult(null);
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId: problem.id, code }),
    });
    const data = await res.json();
    setResult(data);
    setActiveTab("results");
    setSubmitting(false);
    if (data.score === 100) {
      setHasPerfect(true);
      setSolutions(null); // will refetch if tab opened
    }
  }

  async function handleRun() {
    setRunning(true);
    setTermOutput((prev) => [
      ...prev,
      { type: "info", text: `$ g++ -O2 -std=c++17 main.cpp && ./a.out` },
    ]);
    const res = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, input: termInput }),
    });
    const data = await res.json();
    setRunning(false);
    if (data.error) {
      setTermOutput((prev) => [...prev, { type: "err", text: data.error }]);
    } else {
      setTermOutput((prev) => [
        ...prev,
        { type: "out", text: data.output || "(output gol)" },
        { type: "info", text: `Timp executie: ${data.time}ms` },
      ]);
    }
  }

  function clearTerminal() {
    setTermOutput([]);
  }

  if (!problem) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center" style={{ color: "var(--text-muted)" }}>Se incarca...</div>
      </div>
    );
  }

  const scoreColor = result
    ? result.score === 100 ? "text-green-400"
    : result.score >= 50 ? "text-yellow-400"
    : "text-red-400"
    : "";

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "var(--bg)" }}>
      <Navbar />
      <div className="flex flex-col lg:flex-row flex-1 min-h-0 max-w-[1400px] mx-auto w-full">

        {/* ── Left panel: problem ── */}
        <div
          className="lg:w-[44%] lg:overflow-y-auto border-r"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="p-5">
            <Link
              href="/problems"
              className="flex items-center gap-1 text-sm mb-5 transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <ChevronLeft className="w-4 h-4" /> Inapoi la probleme
            </Link>

            <div className="flex items-start justify-between gap-3 mb-3">
              <h1 className="text-xl font-bold leading-tight" style={{ color: "var(--text)" }}>
                <span className="font-mono text-base font-normal mr-2 opacity-50">#{problem.number}</span>
                {problem.title}
              </h1>
              <Badge value={problem.difficulty} className="shrink-0 mt-0.5" />
            </div>

            <div className="flex items-center flex-wrap gap-3 mb-5">
              {problem.chapter && (
                <span className="text-xs px-2 py-0.5 rounded-full border" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                  {problem.chapter}
                </span>
              )}
              <span className="text-xs px-2 py-0.5 rounded-full border" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                Clasa a {problem.grade}-a
              </span>
              <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                <Clock className="w-3 h-3" /> {problem.timeLimit}ms
              </span>
              <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                <Cpu className="w-3 h-3" /> {problem.memoryLimit}MB
              </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-5 border-b" style={{ borderColor: "var(--border)" }}>
              <button
                onClick={() => setActiveTab("description")}
                className={`px-4 py-2 text-sm font-medium transition-all -mb-px border-b-2 ${activeTab === "description" ? "border-indigo-500 text-indigo-400" : "border-transparent"}`}
                style={{ color: activeTab === "description" ? undefined : "var(--text-muted)" }}
              >
                Cerinta
              </button>
              <button
                onClick={() => setActiveTab("results")}
                className={`px-4 py-2 text-sm font-medium transition-all -mb-px border-b-2 flex items-center gap-1.5 ${activeTab === "results" ? "border-indigo-500 text-indigo-400" : "border-transparent"}`}
                style={{ color: activeTab === "results" ? undefined : "var(--text-muted)" }}
              >
                Rezultate
                {result && <span className={`text-xs font-bold ${scoreColor}`}>{result.score}/100</span>}
              </button>
              {!isGuest && (
                <button
                  onClick={() => setActiveTab("solutions")}
                  disabled={!hasPerfect}
                  className={`px-4 py-2 text-sm font-medium transition-all -mb-px border-b-2 flex items-center gap-1.5 ${
                    activeTab === "solutions" ? "border-indigo-500 text-indigo-400" : "border-transparent"
                  } disabled:opacity-40`}
                  style={{ color: activeTab === "solutions" ? undefined : "var(--text-muted)" }}
                  title={!hasPerfect ? "Rezolva problema cu 100p pentru a debloca solutiile" : undefined}
                >
                  {!hasPerfect && <Lock className="w-3 h-3" />}
                  Solutii
                </button>
              )}
            </div>

            {/* Description tab */}
            {activeTab === "description" && (
              <div>
                <MarkdownContent content={problem.description} />
                {problem.testCases.length > 0 && (
                  <div className="mt-5">
                    <button
                      onClick={() => setShowTestCases(!showTestCases)}
                      className="flex items-center gap-2 text-sm mb-3 transition-colors hover:text-indigo-400"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {showTestCases ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      Exemple ({problem.testCases.length} vizibile)
                      {showTestCases ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    {showTestCases && (
                      <div className="flex flex-col gap-3">
                        {problem.testCases.map((tc, i) => (
                          <div key={tc.id} className="rounded-xl border p-3" style={{ background: "var(--bg-hover)", borderColor: "var(--border)" }}>
                            <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Exemplu {i + 1}</p>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Input</p>
                                <pre className="text-xs font-mono rounded p-2" style={{ background: "var(--bg-card)", color: "var(--text)" }}>{tc.input}</pre>
                              </div>
                              <div>
                                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Output</p>
                                <pre className="text-xs font-mono rounded p-2" style={{ background: "var(--bg-card)", color: "var(--text)" }}>{tc.output}</pre>
                              </div>
                            </div>
                            {/* Load into terminal */}
                            <button
                              onClick={() => { setTermInput(tc.input); setShowTerminal(true); }}
                              className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                            >
                              <Terminal className="w-3 h-3" /> Testeaza in terminal
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {problem.sourceUrl && (
                  <a
                    href={problem.sourceUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border mt-5 text-sm hover:border-indigo-500/30 transition-colors w-fit"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--bg-hover)" }}
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                    Problemă preluată de la{" "}
                    <span className="text-indigo-400 ml-1">{extractSiteName(problem.sourceUrl)}</span>
                  </a>
                )}
              </div>
            )}

            {/* Results tab */}
            {activeTab === "results" && result && (
              <div className="flex flex-col gap-3">
                {/* Summary */}
                <div className="rounded-xl border p-4" style={{ background: "var(--bg-hover)", borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    {result.status === "accepted"
                      ? <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                      : <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                    <div>
                      <p className={`font-semibold ${result.status === "accepted" ? "text-green-400" : "text-red-400"}`}>
                        {result.status === "accepted" ? "Acceptat — toate testele trecute!" :
                         result.status === "compile_error" ? "Eroare de compilare" :
                         result.status === "wrong_answer" ? "Raspuns incorect" : "Eroare la executie"}
                      </p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {result.passedTests}/{result.totalTests} teste &middot; {result.execTime}ms
                      </p>
                    </div>
                    {result.earnedXp > 0 && (
                      <div className="ml-auto flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-2.5 py-1">
                        <Zap className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-indigo-300 text-sm font-medium">+{result.earnedXp} XP</span>
                      </div>
                    )}
                  </div>
                  {/* Score bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                      <span>Punctaj</span><span>{result.score}/100</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-card)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${result.score}%`,
                          background: result.score === 100 ? "#22c55e" : result.score >= 50 ? "#f59e0b" : "#ef4444",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Per-test details */}
                <div className="flex flex-col gap-2">
                  {result.results.map((r, i) => (
                    <div
                      key={i}
                      className="rounded-xl border overflow-hidden"
                      style={{ borderColor: r.passed ? "#22c55e33" : "#ef444433", background: "var(--bg-card)" }}
                    >
                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm"
                        onClick={() => setExpandedTest(expandedTest === i ? null : i)}
                      >
                        {r.passed
                          ? <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                          : <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                        <span className="font-medium" style={{ color: "var(--text)" }}>Test {i + 1}</span>
                        <span className={`text-xs ml-auto ${r.passed ? "text-green-400" : "text-red-400"}`}>
                          {r.passed ? "Trecut" : r.error ? "Eroare" : "Raspuns gresit"}
                        </span>
                        {expandedTest === i
                          ? <ChevronUp className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--text-muted)" }} />
                          : <ChevronDown className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--text-muted)" }} />}
                      </button>

                      {expandedTest === i && (
                        <div className="px-4 pb-4 border-t" style={{ borderColor: "var(--border)" }}>
                          {/* Input — always shown */}
                          <div className="mt-3 mb-3">
                            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Input</p>
                            <pre
                              className="text-xs font-mono rounded-lg p-2 border max-h-24 overflow-auto"
                              style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}
                            >{r.input || "(gol)"}</pre>
                          </div>

                          {r.error ? (
                            <div>
                              <p className="text-xs mb-1 text-red-400">Eroare:</p>
                              <pre className="terminal err text-xs max-h-32 overflow-auto">{r.error}</pre>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Output primit</p>
                                <pre
                                  className="text-xs font-mono rounded-lg p-2 border max-h-24 overflow-auto"
                                  style={{
                                    background: r.passed ? "rgba(34,197,94,0.05)" : "rgba(239,68,68,0.05)",
                                    borderColor: r.passed ? "#22c55e33" : "#ef444433",
                                    color: "var(--text)",
                                  }}
                                >{r.output || "(gol)"}</pre>
                              </div>
                              <div>
                                <p className="text-xs mb-1 text-green-500">Output asteptat</p>
                                <pre
                                  className="text-xs font-mono rounded-lg p-2 border max-h-24 overflow-auto"
                                  style={{
                                    background: "rgba(34,197,94,0.05)",
                                    borderColor: "#22c55e33",
                                    color: "var(--text)",
                                  }}
                                >{r.expected}</pre>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "results" && !result && (
              <div className="text-center py-10" style={{ color: "var(--text-muted)" }}>
                <p className="text-sm">Trimite o solutie pentru a vedea rezultatele.</p>
              </div>
            )}

            {/* Solutions tab */}
            {activeTab === "solutions" && (
              <div className="flex flex-col gap-3">
                <div
                  className="flex items-center gap-3 rounded-xl border p-3"
                  style={{ background: "rgba(34,197,94,0.05)", borderColor: "#22c55e33" }}
                >
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Ai obtinut 100p! Poti vedea solutiile de 100p ale altor elevi.
                  </p>
                </div>

                {solutions === null ? (
                  <div className="text-center py-6" style={{ color: "var(--text-muted)" }}>Se incarca...</div>
                ) : solutions.length === 0 ? (
                  <div className="text-center py-6 text-sm" style={{ color: "var(--text-muted)" }}>
                    Nicio alta solutie de 100p disponibila momentan.
                  </div>
                ) : (
                  solutions.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-xl border overflow-hidden"
                      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                    >
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 text-sm"
                        onClick={() => setExpandedSolution(expandedSolution === s.id ? null : s.id)}
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-indigo-400" />
                          <span className="font-medium" style={{ color: "var(--text)" }}>
                            {s.user.username ? `@${s.user.username}` : s.user.name}
                          </span>
                          <span className="text-xs text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded">100p</span>
                        </div>
                        {expandedSolution === s.id
                          ? <ChevronUp className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                          : <ChevronDown className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />}
                      </button>
                      {expandedSolution === s.id && (
                        <div className="border-t" style={{ borderColor: "var(--border)" }}>
                          <pre
                            className="text-xs font-mono p-4 overflow-auto max-h-96"
                            style={{ background: "#1e1e1e", color: "#d4d4d4" }}
                          >{s.code}</pre>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Right panel: editor + terminal ── */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Toolbar */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-b shrink-0"
            style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
          >
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20 font-mono text-xs">
                C++17
              </span>
              <button
                onClick={() => setShowTerminal(!showTerminal)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all ${
                  showTerminal ? "bg-indigo-500/15 text-indigo-300" : "hover:bg-black/10"
                }`}
                style={{ color: showTerminal ? undefined : "var(--text-muted)" }}
              >
                <Terminal className="w-3.5 h-3.5" />
                Terminal
              </button>
            </div>
            {isGuest ? (
              <Link
                href="/register"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                Conecteaza-te pentru a trimite
              </Link>
            ) : (
              <Button onClick={handleSubmit} loading={submitting}>
                <Play className="w-4 h-4" />
                {submitting ? "Se evalueaza..." : "Trimite solutia"}
              </Button>
            )}
          </div>

          {/* Editor — fills all space between toolbar and terminal */}
          <div className="flex-1 min-h-0 p-3 pb-2 flex flex-col">
            <CodeEditor value={code} onChange={setCode} />
          </div>

          {/* AI Chat assistant */}
          {problem && (
            <ChatAssistant
              problemTitle={problem.title}
              problemDescription={problem.description}
              disabled={isGuest}
            />
          )}

          {/* Terminal panel */}
          {showTerminal && (
            <div
              className="border-t shrink-0 animate-slide-up"
              style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
            >
              <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-medium text-green-400">Terminal debug</span>
                </div>
                <button onClick={clearTerminal} className="text-xs hover:text-red-400" style={{ color: "var(--text-muted)" }}>
                  Sterge
                </button>
              </div>

              {/* Output */}
              <div
                ref={termRef}
                className="terminal text-xs mx-3 mt-2"
                style={{ height: "100px", overflowY: "auto" }}
              >
                {termOutput.length === 0 ? (
                  <span className="info">// Ruleaza codul si vei vedea output-ul aici</span>
                ) : (
                  termOutput.map((line, i) => (
                    <div key={i} className={line.type === "err" ? "err" : line.type === "info" ? "info" : line.type === "ok" ? "ok" : ""}>
                      {line.text}
                    </div>
                  ))
                )}
              </div>

              {/* Input + run */}
              <div className="flex gap-2 p-3">
                <textarea
                  value={termInput}
                  onChange={(e) => setTermInput(e.target.value)}
                  placeholder="Input (stdin)..."
                  rows={2}
                  className="flex-1 px-3 py-1.5 rounded-lg text-xs font-mono border resize-none outline-none"
                  style={{
                    background: "var(--bg-hover)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                />
                <Button onClick={handleRun} loading={running} className="self-end">
                  <Send className="w-4 h-4" />
                  Ruleaza
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
