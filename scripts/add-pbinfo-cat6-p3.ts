import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 2617,
    title: "Taieturi",
    slug: "taieturi",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2617/taieturi",
    description: `## Cerinta

Se da o foaie de dimensiuni $N \\times M$. Taiem foaia in bucati de $1 \\times 1$, fiecare taietura mergand complet dintr-o parte in alta (vertical sau orizontal). Determina numarul minim de taieturi necesare.

## Date de intrare

Doua numere naturale nenule $N$ si $M$ ($1 \\leq N, M \\leq 1.000.000.000$).

## Date de iesire

Numarul $S$ de taieturi necesare.

## Exemplu

**Input:**
\`\`\`
2 3
\`\`\`

**Output:**
\`\`\`
5
\`\`\`

**Explicatie:** $S = N \\cdot M - 1 = 2 \\cdot 3 - 1 = 5$`,
    testCases: [
      { input: "2 3", output: "5", points: 50, isPublic: true },
      { input: "1 1", output: "0", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2938,
    title: "Albina",
    slug: "albina",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2938/albina",
    description: `## Cerinta

Un fagure hexagonal creste zilnic. In ziua 1 exista 1 celula cu nectar. In fiecare zi urmatoare se completeaza un strat de celule in jurul celor existente. Determina numarul de celule cu nectar dupa $n$ zile.

## Date de intrare

Un numar natural $n$ ($1 \\leq n \\leq 1.000.000$).

## Date de iesire

Numarul $C$ de celule cu nectar dupa $n$ zile.

## Exemplu

**Input:**
\`\`\`
4
\`\`\`

**Output:**
\`\`\`
37
\`\`\`

**Explicatie:** Formula: $C = 3n^2 - 3n + 1$. Pentru $n=4$: $3 \\cdot 16 - 12 + 1 = 37$.`,
    testCases: [
      { input: "4", output: "37", points: 50, isPublic: true },
      { input: "1", output: "1", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2377,
    title: "Pisici",
    slug: "pisici",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2377/pisici",
    description: `## Cerinta

Se stie ca $n$ pisici mananca $n$ soareci in $n$ minute. In cat timp mananca $m$ pisici $m$ soareci?

## Date de intrare

Doua numere naturale $n$ si $m$ ($1 \\leq n, m \\leq 100.000.000.000$).

## Date de iesire

Numarul $T$ de minute.

## Exemplu

**Input:**
\`\`\`
3 100
\`\`\`

**Output:**
\`\`\`
3
\`\`\`

**Explicatie:** Fiecare pisica mananca 1 soarece in $n$ minute, deci $m$ pisici mananca $m$ soareci tot in $n$ minute.`,
    testCases: [
      { input: "3 100", output: "3", points: 50, isPublic: true },
      { input: "5 1", output: "5", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 4185,
    title: "Varsta",
    slug: "varsta",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/4185/varsta",
    description: `## Cerinta

Gigel are varsta $a$ ani, iar tatal sau are varsta $b$ ani. Dupa cati ani $x$ raportul varsta lui Gigel / varsta tatalui devine $c/d$? Afiseaza $x$ cu exact 2 zecimale, fara rotunjire. $x$ poate fi negativ.

## Date de intrare

Patru numere intregi $a$, $b$, $c$, $d$ ($1 \\leq a, b, c, d \\leq 1.000.000$).

## Date de iesire

Numarul $x$ cu 2 zecimale exacte.

## Exemple

**Input:**
\`\`\`
5 25 1 2
\`\`\`

**Output:**
\`\`\`
15.00
\`\`\``,
    testCases: [
      { input: "5 25 1 2", output: "15.00", points: 50, isPublic: true },
      { input: "20 50 1 5", output: "-12.50", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 102,
    title: "cifre",
    slug: "cifre-pb102",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/102/cifre",
    description: `## Cerinta

Se da un numar natural $n$. Calculeaza suma dintre cifra zecilor si cifra unitatilor.

## Date de intrare

Un numar natural $n$ ($9 < n < 1.000.000.000$).

## Date de iesire

Suma cifrei zecilor si cifrei unitatilor.

## Exemplu

**Input:**
\`\`\`
2012
\`\`\`

**Output:**
\`\`\`
3
\`\`\`

**Explicatie:** Cifra zecilor = 1, cifra unitatilor = 2, suma = 3.`,
    testCases: [
      { input: "2012", output: "3", points: 50, isPublic: true },
      { input: "99", output: "18", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2599,
    title: "a16",
    slug: "a16",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2599/a16",
    description: `## Cerinta

Calculeaza $a^{16}$ folosind cat mai putine inmultiri (prin ridicare la patrat succesiva).

## Date de intrare

Un numar natural $a$ ($0 \\leq a \\leq 9$).

## Date de iesire

Valoarea $a^{16}$.

## Exemplu

**Input:**
\`\`\`
2
\`\`\`

**Output:**
\`\`\`
65536
\`\`\``,
    testCases: [
      { input: "2", output: "65536", points: 50, isPublic: true },
      { input: "3", output: "43046721", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 1282,
    title: "radical",
    slug: "radical",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/1282/radical",
    description: `## Cerinta

Afla radacina patrata a unui numar natural $n$ care este patrat perfect.

## Date de intrare

Un numar natural $n$ ($1 \\leq n \\leq 1000$, $n$ este patrat perfect).

## Date de iesire

Radacina patrata $r$ a lui $n$.

## Exemplu

**Input:**
\`\`\`
9
\`\`\`

**Output:**
\`\`\`
3
\`\`\``,
    testCases: [
      { input: "9", output: "3", points: 50, isPublic: true },
      { input: "100", output: "10", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 1343,
    title: "radical1",
    slug: "radical1",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/1343/radical1",
    description: `## Cerinta

Se da un numar real $n$. Afiseaza radacina sa patrata.

## Date de intrare

Un numar real $n$ ($1 \\leq n \\leq 1000$).

## Date de iesire

Radacina patrata a lui $n$, cu zecimale (tip double).

## Exemplu

**Input:**
\`\`\`
5
\`\`\`

**Output:**
\`\`\`
2.23607
\`\`\``,
    testCases: [
      { input: "5", output: "2.23607", points: 50, isPublic: true },
      { input: "4", output: "2.00000", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2602,
    title: "ultimacifraapartiiintregi",
    slug: "ultimacifraapartiiintregi",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2602/ultimacifraapartiiintregi",
    description: `## Cerinta

Se citeste un numar real $a$ (tip double). Afiseaza ultima cifra a partii intregi a valorii citite.

## Date de intrare

Un numar real $a$ ($1 \\leq a \\leq 1000$).

## Date de iesire

Ultima cifra a partii intregi.

## Exemplu

**Input:**
\`\`\`
123.45
\`\`\`

**Output:**
\`\`\`
3
\`\`\`

**Explicatie:** Partea intreaga este 123, ultima cifra este 3.`,
    testCases: [
      { input: "123.45", output: "3", points: 50, isPublic: true },
      { input: "9.99", output: "9", points: 50, isPublic: false },
    ],
  },
];

async function main() {
  const maxProblem = await prisma.problem.findFirst({ orderBy: { number: "desc" } });
  let nextNumber = (maxProblem?.number ?? 0) + 1;

  for (const p of problems) {
    const existing = await prisma.problem.findUnique({ where: { slug: p.slug } });
    if (existing) {
      console.log(`Skip: ${p.title}`);
      continue;
    }

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
