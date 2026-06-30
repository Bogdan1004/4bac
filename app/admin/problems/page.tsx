"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, Pencil, X, Check, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface TestCaseForm {
  input: string;
  output: string;
  points: number;
  isPublic: boolean;
}

interface ProblemForm {
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  category: string;
  grade: number;
  chapter: string;
  sourceUrl: string;
  timeLimit: number;
  memoryLimit: number;
  testCases: TestCaseForm[];
}

interface ProblemRow {
  id: string;
  number: number;
  title: string;
  slug: string;
  difficulty: string;
  grade: number;
  chapter: string;
  sourceUrl: string;
  _count: { testCases: number };
}

const emptyForm = (): ProblemForm => ({
  title: "",
  slug: "",
  description: "",
  difficulty: "easy",
  category: "math",
  grade: 9,
  chapter: "",
  sourceUrl: "",
  timeLimit: 1000,
  memoryLimit: 65536,
  testCases: [{ input: "", output: "", points: 10, isPublic: true }],
});

function autoSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminProblemsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [problems, setProblems] = useState<ProblemRow[]>([]);
  const [form, setForm] = useState<ProblemForm>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ProblemForm>>({});
  const [editSaving, setEditSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && (session?.user as { role?: string })?.role !== "admin") {
      router.push("/problems");
    }
  }, [status, session, router]);

  function loadProblems() {
    fetch("/api/problems").then((r) => r.json()).then(setProblems);
  }

  useEffect(() => { loadProblems(); }, []);

  function updateForm(field: keyof ProblemForm, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function addTestCase() {
    setForm((prev) => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", output: "", points: 10, isPublic: false }],
    }));
  }

  function removeTestCase(i: number) {
    setForm((prev) => ({ ...prev, testCases: prev.testCases.filter((_, idx) => idx !== i) }));
  }

  function updateTestCase(i: number, field: keyof TestCaseForm, value: unknown) {
    setForm((prev) => ({
      ...prev,
      testCases: prev.testCases.map((tc, idx) => (idx === i ? { ...tc, [field]: value } : tc)),
    }));
  }

  async function handleSave() {
    setSaving(true); setError(""); setSuccess("");
    const res = await fetch("/api/problems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? "Eroare");
    } else {
      setSuccess("Problema adaugata cu succes!");
      setForm(emptyForm()); setShowForm(false);
      loadProblems();
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Stergi aceasta problema? Actiunea este ireversibila.")) return;
    setDeleting(slug);
    await fetch(`/api/problems/${slug}`, { method: "DELETE" });
    setDeleting(null);
    loadProblems();
  }

  function startEdit(p: ProblemRow) {
    setEditingSlug(p.slug);
    setEditForm({
      title: p.title,
      difficulty: p.difficulty,
      grade: p.grade,
      chapter: p.chapter,
      sourceUrl: p.sourceUrl,
    });
  }

  async function saveEdit(slug: string) {
    setEditSaving(true);
    const res = await fetch(`/api/problems/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditSaving(false);
    if (res.ok) { setEditingSlug(null); loadProblems(); }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main className="max-w-4xl mx-auto w-full px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Admin — Probleme</h1>
            <div className="flex gap-3 mt-1">
              <Link href="/admin/proposals" className="text-xs text-indigo-400 hover:text-indigo-300">Propuneri elevi →</Link>
            </div>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4" />
            Problema noua
          </Button>
        </div>

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">{success}</div>
        )}

        {/* Add form */}
        {showForm && (
          <Card className="mb-8 flex flex-col gap-4">
            <h2 className="font-semibold" style={{ color: "var(--text)" }}>Adauga problema</h2>

            <Input
              label="Titlu"
              value={form.title}
              onChange={(e) => { updateForm("title", e.target.value); updateForm("slug", autoSlug(e.target.value)); }}
              placeholder="ex: Suma a doua numere"
            />
            <Input label="Slug (URL)" value={form.slug} onChange={(e) => updateForm("slug", e.target.value)} />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium block mb-1" style={{ color: "var(--text-muted)" }}>Dificultate</label>
                <select value={form.difficulty} onChange={(e) => updateForm("difficulty", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
                  style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <option value="easy">Usor</option>
                  <option value="medium">Mediu</option>
                  <option value="hard">Greu</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1" style={{ color: "var(--text-muted)" }}>Categorie</label>
                <select value={form.category} onChange={(e) => updateForm("category", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
                  style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <option value="math">Matematica</option>
                  <option value="arrays">Siruri</option>
                  <option value="strings">Stringuri</option>
                  <option value="sorting">Sortare</option>
                  <option value="dp">Programare dinamica</option>
                  <option value="graphs">Grafuri</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium block mb-1" style={{ color: "var(--text-muted)" }}>Clasa</label>
                <select value={form.grade} onChange={(e) => updateForm("grade", parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
                  style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}>
                  {[9,10,11,12].map(g => <option key={g} value={g}>Clasa a {g}-a</option>)}
                </select>
              </div>
              <Input label="Capitol" value={form.chapter} onChange={(e) => updateForm("chapter", e.target.value)} placeholder="ex: Sortare" />
            </div>

            <Input
              label="Link sursa originala (optional)"
              value={form.sourceUrl}
              onChange={(e) => updateForm("sourceUrl", e.target.value)}
              placeholder="https://www.pbinfo.ro/probleme/..."
            />

            <div>
              <label className="text-sm font-medium block mb-1" style={{ color: "var(--text-muted)" }}>Descriere (Markdown)</label>
              <textarea
                value={form.description} onChange={(e) => updateForm("description", e.target.value)}
                rows={8}
                className="w-full px-3 py-2 rounded-lg text-sm border outline-none font-mono resize-y"
                style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}
                placeholder="## Cerinta&#10;&#10;..."
              />
            </div>

            {/* Test cases */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Cazuri de test</label>
                <button onClick={addTestCase} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Adauga
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {form.testCases.map((tc, i) => (
                  <div key={i} className="rounded-lg border p-3" style={{ background: "var(--bg-hover)", borderColor: "var(--border)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>Test {i + 1}</span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: "var(--text-muted)" }}>
                          <input type="checkbox" checked={tc.isPublic} onChange={(e) => updateTestCase(i, "isPublic", e.target.checked)} />
                          Vizibil elevilor
                        </label>
                        {form.testCases.length > 1 && (
                          <button onClick={() => removeTestCase(i)} className="text-red-500 hover:text-red-400">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Input</p>
                        <textarea value={tc.input} onChange={(e) => updateTestCase(i, "input", e.target.value)} rows={3}
                          className="w-full px-2 py-1.5 rounded text-xs border outline-none font-mono resize-none"
                          style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text)" }} />
                      </div>
                      <div>
                        <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Output asteptat</p>
                        <textarea value={tc.output} onChange={(e) => updateTestCase(i, "output", e.target.value)} rows={3}
                          className="w-full px-2 py-1.5 rounded text-xs border outline-none font-mono resize-none"
                          style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text)" }} />
                      </div>
                    </div>
                    <div className="mt-2">
                      <Input label="Puncte" type="number" value={tc.points}
                        onChange={(e) => updateTestCase(i, "points", parseInt(e.target.value) || 0)}
                        className="w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
            <div className="flex gap-3">
              <Button onClick={handleSave} loading={saving}>Salveaza problema</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)}>Anuleaza</Button>
            </div>
          </Card>
        )}

        {/* Problems list */}
        <div className="flex flex-col gap-2">
          {problems.map((p) => (
            <div key={p.id} className="rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              {editingSlug === p.slug ? (
                <div className="p-4 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Titlu</label>
                      <input value={editForm.title ?? ""} onChange={e => setEditForm(f => ({...f, title: e.target.value}))}
                        className="w-full px-3 py-1.5 rounded-lg text-sm border outline-none"
                        style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }} />
                    </div>
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Capitol</label>
                      <input value={editForm.chapter ?? ""} onChange={e => setEditForm(f => ({...f, chapter: e.target.value}))}
                        className="w-full px-3 py-1.5 rounded-lg text-sm border outline-none"
                        style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Dificultate</label>
                      <select value={editForm.difficulty ?? "easy"} onChange={e => setEditForm(f => ({...f, difficulty: e.target.value}))}
                        className="w-full px-3 py-1.5 rounded-lg text-sm border outline-none"
                        style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}>
                        <option value="easy">Usor</option>
                        <option value="medium">Mediu</option>
                        <option value="hard">Greu</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Clasa</label>
                      <select value={editForm.grade ?? 9} onChange={e => setEditForm(f => ({...f, grade: parseInt(e.target.value)}))}
                        className="w-full px-3 py-1.5 rounded-lg text-sm border outline-none"
                        style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}>
                        {[9,10,11,12].map(g => <option key={g} value={g}>Clasa a {g}-a</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Link sursa originala</label>
                    <input value={editForm.sourceUrl ?? ""} onChange={e => setEditForm(f => ({...f, sourceUrl: e.target.value}))}
                      placeholder="https://www.pbinfo.ro/..."
                      className="w-full px-3 py-1.5 rounded-lg text-sm border outline-none"
                      style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }} />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(p.slug)} disabled={editSaving}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
                      <Check className="w-3.5 h-3.5" /> {editSaving ? "Salvez..." : "Salveaza"}
                    </button>
                    <button onClick={() => setEditingSlug(null)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border transition-colors"
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                      <X className="w-3.5 h-3.5" /> Anuleaza
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                      <span className="font-mono text-xs mr-1.5" style={{ color: "var(--text-muted)" }}>#{p.number}</span>
                      {p.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {p._count.testCases} teste · Clasa a {p.grade}-a{p.chapter ? ` · ${p.chapter}` : ""}
                    </p>
                    {p.sourceUrl && (
                      <a href={p.sourceUrl} target="_blank" rel="noopener"
                        className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 mt-0.5 w-fit">
                        <ExternalLink className="w-3 h-3" /> sursa originala
                      </a>
                    )}
                  </div>
                  <Badge value={p.difficulty} />
                  <Link href={`/problems/${p.slug}`} className="text-xs text-indigo-400 hover:text-indigo-300 shrink-0">
                    Vezi
                  </Link>
                  <button onClick={() => startEdit(p)}
                    className="p-1.5 rounded-lg hover:bg-indigo-500/10 text-indigo-400 transition-colors shrink-0">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(p.slug)} disabled={deleting === p.slug}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
