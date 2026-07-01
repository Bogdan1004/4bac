import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 4721,
    title: "veselTri",
    slug: "veseltri",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4721/veseltri",
    description: `## Cerinta

Se da un triunghi numeric unde linia $i$ contine numerele $1, 2, ..., i, ..., 2, 1$. Raspunde la doua tipuri de cerinte: (1) cate numere sunt pe linia $n$; (2) de cate ori apare numarul $k$ pana la linia $n$.

## Date de intrare

Trei numere: $c$ (cerinta 1 sau 2), $n$ (linia), $k$ (numarul cautat).

## Date de iesire

Un numar $S$.

## Exemple

**Input:**
\`\`\`
1 5 3
\`\`\`

**Output:**
\`\`\`
9
\`\`\``,
    testCases: [
      { input: "1 5 3", output: "9", points: 50, isPublic: true },
      { input: "2 5 3", output: "5", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 7,
    title: "maxim2",
    slug: "maxim2",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/7/maxim2",
    description: `## Cerinta

Calculeaza maximul a doua numere intregi.

## Date de intrare

Doua numere intregi separate prin spatiu ($|a|, |b| < 10^9$).

## Date de iesire

Maximul dintre cele doua.

## Exemplu

**Input:**
\`\`\`
125 68
\`\`\`

**Output:**
\`\`\`
125
\`\`\``,
    testCases: [
      { input: "125 68", output: "125", points: 50, isPublic: true },
      { input: "-5 -3", output: "-3", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3480,
    title: "9lan",
    slug: "9lan",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3480/9lan",
    description: `## Cerinta

Calculeaza ultima cifra a lui $9^n$.

## Date de intrare

Un numar natural $n$ ($0 \\leq n \\leq 100.000$).

## Date de iesire

Ultima cifra a lui $9^n$.

## Exemplu

**Input:**
\`\`\`
6
\`\`\`

**Output:**
\`\`\`
1
\`\`\`

**Explicatie:** $9^6 = 531441$, ultima cifra este 1.`,
    testCases: [
      { input: "6", output: "1", points: 50, isPublic: true },
      { input: "1", output: "9", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3479,
    title: "2lan",
    slug: "2lan",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3479/2lan",
    description: `## Cerinta

Calculeaza ultima cifra a lui $2^n$.

## Date de intrare

Un numar natural $n$ ($0 \\leq n \\leq 100.000$).

## Date de iesire

Ultima cifra a lui $2^n$.

## Exemplu

**Input:**
\`\`\`
6
\`\`\`

**Output:**
\`\`\`
4
\`\`\`

**Explicatie:** $2^6 = 64$, ultima cifra este 4. Ciclul ultimelor cifre ale puterilor lui 2 este 2, 4, 8, 6 (perioda 4).`,
    testCases: [
      { input: "6", output: "4", points: 50, isPublic: true },
      { input: "0", output: "1", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 178,
    title: "patratPerfect",
    slug: "patratperfect",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/178/patratperfect",
    description: `## Cerinta

Verifica daca un numar natural $n$ este patrat perfect.

## Date de intrare

Un numar natural $n$ ($n < 2.000.000.000$).

## Date de iesire

\`da\` daca $n$ este patrat perfect, \`nu\` altfel.

## Exemplu

**Input:**
\`\`\`
25
\`\`\`

**Output:**
\`\`\`
da
\`\`\``,
    testCases: [
      { input: "25", output: "da", points: 50, isPublic: true },
      { input: "26", output: "nu", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 4520,
    title: "intersecSets",
    slug: "intersecssets",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4520/intersecssets",
    description: `## Cerinta

Se dau doua multimi de numere naturale consecutive: $[a, b]$ si $[c, d]$. Determina intersectia lor.

## Date de intrare

Patru numere naturale $a$, $b$, $c$, $d$ ($a \\leq b$, $c \\leq d$, $1 \\leq a, b, c, d \\leq 10^6$).

## Date de iesire

Doua numere $x$ si $y$ (capetele intersectiei), sau \`-1 -1\` daca multimile sunt disjuncte.

## Exemple

**Input:**
\`\`\`
2 11 8 15
\`\`\`

**Output:**
\`\`\`
8 11
\`\`\``,
    testCases: [
      { input: "2 11 8 15", output: "8 11", points: 50, isPublic: true },
      { input: "22 111 200 300", output: "-1 -1", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 1464,
    title: "Sir7",
    slug: "sir7",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/1464/sir7",
    description: `## Cerinta

Se genereaza un sir pornind de la cifra $P$: fiecare termen urmator se obtine adaugand cifra $P$ la termenul precedent si sarand peste numerele care contin cifra $P$. Gaseste al $K$-lea termen.

## Date de intrare

Doua numere: $P$ ($1 \\leq P \\leq 9$) si $K$ ($2 \\leq K \\leq 10^9$).

## Date de iesire

Al $K$-lea termen al sirului.

## Exemplu

**Input:**
\`\`\`
9 10
\`\`\`

**Output:**
\`\`\`
139
\`\`\``,
    testCases: [
      { input: "9 10", output: "139", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 451,
    title: "calcul",
    slug: "calcul",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/451/calcul",
    description: `## Cerinta

Se citeste un numar natural $n$ cu cel mult 2 cifre. Daca $n \\leq 15$: afiseaza $n^2$. Daca $16 \\leq n \\leq 30$: afiseaza suma cifrelor. Daca $n > 30$: afiseaza produsul cifrelor.

## Date de intrare

Un numar natural $n$ ($0 \\leq n \\leq 99$).

## Date de iesire

Valoarea calculata conform conditiei.

## Exemplu

**Input:**
\`\`\`
12
\`\`\`

**Output:**
\`\`\`
144
\`\`\``,
    testCases: [
      { input: "12", output: "144", points: 34, isPublic: true },
      { input: "25", output: "7", points: 33, isPublic: false },
      { input: "37", output: "21", points: 33, isPublic: false },
    ],
  },
  {
    pbinfoId: 4513,
    title: "HarapAlb1",
    slug: "harapalb1",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4513/harapalb1",
    description: `## Cerinta

Se da un numar natural $n$ cu maxim 3 cifre. Daca are 1 cifra: afiseaza $n^2$. Daca are 2 cifre: afiseaza suma cifrelor. Daca are 3 cifre: afiseaza cifra din mijloc.

## Date de intrare

Un numar natural $n$ ($0 \\leq n \\leq 999$).

## Date de iesire

Valoarea calculata.

## Exemple

**Input:**
\`\`\`
7
\`\`\`

**Output:**
\`\`\`
49
\`\`\``,
    testCases: [
      { input: "7", output: "49", points: 34, isPublic: true },
      { input: "75", output: "12", points: 33, isPublic: false },
      { input: "475", output: "7", points: 33, isPublic: false },
    ],
  },
];

async function main() {
  const maxProblem = await prisma.problem.findFirst({ orderBy: { number: "desc" } });
  let nextNumber = (maxProblem?.number ?? 0) + 1;

  for (const p of problems) {
    const existing = await prisma.problem.findUnique({ where: { slug: p.slug } });
    if (existing) { console.log(`Skip: ${p.title}`); continue; }

    const problem = await prisma.problem.create({
      data: {
        number: nextNumber++,
        title: p.title,
        slug: p.slug,
        description: p.description,
        difficulty: p.difficulty,
        category: p.category,
        grade: p.grade,
        chapter: p.chapter,
        sourceUrl: p.sourceUrl,
      },
    });

    await prisma.testCase.createMany({
      data: p.testCases.map((tc) => ({
        problemId: problem.id,
        input: tc.input,
        output: tc.output,
        points: tc.points,
        isPublic: tc.isPublic,
      })),
    });

    console.log(`Added: ${p.title}`);
  }

  console.log("Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
