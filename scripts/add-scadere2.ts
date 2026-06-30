import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.resolve(__dirname, "../dev.db"));

const id = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let s = "c";
  for (let i = 0; i < 24; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
};

const existing = db.prepare("SELECT id FROM Problem WHERE slug = ?").get("scadere2") as { id: string } | undefined;
if (existing) {
  console.log("Problema scadere2 deja exista.");
  process.exit(0);
}

const problemId = id();
db.prepare(`
  INSERT INTO Problem (id, title, slug, description, difficulty, category, grade, chapter, sourceUrl, timeLimit, memoryLimit, createdAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
`).run(
  problemId,
  "Scadere2",
  "scadere2",
  `## Cerinta

Se dau doua numere naturale **a** si **b**, fiecare avand cel mult 1000 de cifre. Sa se calculeze si sa se afiseze **|a - b|** (valoarea absoluta a diferentei).

## Date de intrare

Pe prima linie se afla numarul **a**, pe a doua linie numarul **b** (numere naturale cu cel mult 1000 cifre fiecare).

## Date de iesire

Se va afisa diferenta absoluta |a - b|, fara zerouri nesemnificative.

## Restrictii

- $0 \\leq a, b$ (numere naturale cu cel mult 1000 cifre)
- Numerele pot fi prea mari pentru tipurile standard (int, long long)

## Exemplu

**Input:**
\`\`\`
5
3
\`\`\`

**Output:**
\`\`\`
2
\`\`\`

**Input:**
\`\`\`
100
200
\`\`\`

**Output:**
\`\`\`
100
\`\`\``,
  "medium",
  "strings",
  9,
  "Numere mari",
  "https://www.pbinfo.ro/probleme/1258/scadere2",
  1000,
  65536,
);

const testCases = [
  { input: "5\n3", output: "2", points: 20, isPublic: true },
  { input: "3\n5", output: "2", points: 20, isPublic: true },
  { input: "100\n200", output: "100", points: 20, isPublic: false },
  { input: "1000000000000\n999999999999", output: "1", points: 20, isPublic: false },
  { input: "0\n0", output: "0", points: 20, isPublic: false },
];

const insertTC = db.prepare(`
  INSERT INTO TestCase (id, problemId, input, output, points, isPublic)
  VALUES (?, ?, ?, ?, ?, ?)
`);

for (const tc of testCases) {
  insertTC.run(id(), problemId, tc.input, tc.output, tc.points, tc.isPublic ? 1 : 0);
}

console.log("Problema scadere2 adaugata cu succes (ID:", problemId, ")");
db.close();
