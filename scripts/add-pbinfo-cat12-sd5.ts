import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 2987,
    title: "Buletin",
    slug: "buletin",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/2987/buletin",
    description: `## Cerinta

Se da un cod numeric personal (CNP) cu 13 cifre. Extrage anul, luna si ziua nasterii in format dubla cifra (AA LL ZZ).

## Date de intrare

Un numar natural $n$ cu exact 13 cifre.

## Date de iesire

Trei numere reprezentand AA, LL, ZZ separate prin spatii.

## Exemple

**Input:**
\`\`\`
5070521071145
\`\`\`

**Output:**
\`\`\`
07 05 21
\`\`\`

**Explicatie:** Cifrele 2-3 = an (07), cifrele 4-5 = luna (05), cifrele 6-7 = zi (21).`,
    testCases: [
      { input: "5070521071145", output: "07 05 21", points: 50, isPublic: true },
      { input: "2961103042367", output: "96 11 03", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3189,
    title: "Dirichlet",
    slug: "dirichlet",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3189/dirichlet",
    description: `## Cerinta

Avem $n$ cuiburi si $p$ pasari. Daca $n \\geq p$: afiseaza cuiburile goale. Daca $n < p$: afiseaza numarul maxim de pasari pe cuib si numarul de cuiburi cu maximul.

## Date de intrare

Doua numere naturale $n$ si $p$ ($1 \\leq n, p \\leq 10^9$).

## Date de iesire

O valoare (cuiburi goale) sau doua valori (max pasari pe cuib, cuiburi cu max).

## Exemple

**Input:**
\`\`\`
3 5
\`\`\`

**Output:**
\`\`\`
2 2
\`\`\``,
    testCases: [
      { input: "3 5", output: "2 2", points: 50, isPublic: true },
      { input: "5 3", output: "2", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2616,
    title: "Paznici1",
    slug: "paznici1",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/2616/paznici1",
    description: `## Cerinta

Un parc dreptunghiular este impartit in $n \\times m$ sectoare. Fiecare paznic sta pe o alee si poate supraveghea sectoarele invecinate. Determina numarul minim de paznici necesari.

## Date de intrare

Doua numere naturale nenule $n$ si $m$ ($1 \\leq n, m \\leq 10^6$).

## Date de iesire

Numarul minim de paznici $P$.

## Exemplu

**Input:**
\`\`\`
2 2
\`\`\`

**Output:**
\`\`\`
1
\`\`\``,
    testCases: [
      { input: "2 2", output: "1", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 3060,
    title: "melc",
    slug: "melc",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3060/melc",
    description: `## Cerinta

Un melc merge cu viteza $v$ km/h. Calculeaza in cate minute parcurge $d$ metri.

## Date de intrare

Un numar real $v$ (viteza in km/h) si un numar natural $d$ (distanta in metri, $0 < d < 10^9$).

## Date de iesire

Timpul in minute (numar intreg).

## Exemplu

**Input:**
\`\`\`
0.3 20
\`\`\`

**Output:**
\`\`\`
4
\`\`\``,
    testCases: [
      { input: "0.3 20", output: "4", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 2782,
    title: "Prada",
    slug: "prada",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/2782/prada",
    description: `## Cerinta

Doi stalpi cu inaltimile $HA$ si $HB$ sunt la distanta $D$ intre ei. Doua pasari pornesc simultan de la varfurile stalpilor cu aceeasi viteza. Determina distanta $X$ de la baza stalpului mai inalt la locul de intalnire cu soarecele (astfel incat sa ajunga simultan).

## Date de intrare

Trei numere naturale $HA$, $HB$, $D$ ($1 \\leq HA, HB, D \\leq 1000$).

## Date de iesire

Distanta $X$.

## Exemplu

**Input:**
\`\`\`
30 20 50
\`\`\`

**Output:**
\`\`\`
20
\`\`\``,
    testCases: [
      { input: "30 20 50", output: "20", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 3275,
    title: "nrSumCifMax",
    slug: "nrsumcifmax",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3275/nrsumcifmax",
    description: `## Cerinta

Se dau trei numere naturale de doua cifre. Afiseaza numerele care au suma cifrelor maxima.

## Date de intrare

Trei numere naturale de doua cifre separate prin spatii.

## Date de iesire

Numerele cu suma cifrelor maxima, in ordinea introducerii, separate prin spatii.

## Exemplu

**Input:**
\`\`\`
17 22 26
\`\`\`

**Output:**
\`\`\`
17 26
\`\`\`

**Explicatie:** 17→8, 22→4, 26→8. Maxim=8, afisam 17 si 26.`,
    testCases: [
      { input: "17 22 26", output: "17 26", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 2419,
    title: "Intalnire",
    slug: "intalnire",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/2419/intalnire",
    description: `## Cerinta

Doi prieteni se afla la pozitiile $a$ si $b$ pe axa Ox. Fiecare mutare de $k$ unitati costa $k$ unitatea de oboseala. Determina oboseala totala minima pentru ca ei sa se intalneasca.

## Date de intrare

Doua numere intregi $a$ si $b$ ($1 \\leq a, b \\leq 1000$, $a \\neq b$).

## Date de iesire

Oboseala totala minima.

## Exemplu

**Input:**
\`\`\`
3 4
\`\`\`

**Output:**
\`\`\`
1
\`\`\``,
    testCases: [
      { input: "3 4", output: "1", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 1303,
    title: "Calculator",
    slug: "calculator",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/1303/calculator",
    description: `## Cerinta

Se dau doua numere naturale $A$ si $B$ si un simbol de operatie (+, -, *, /). Calculeaza rezultatul. Pentru - si / se foloseste numarul mai mare ca prim operand. / calculeaza catul intreg.

## Date de intrare

Doua numere naturale $A$ si $B$, urmate de simbolul operatiei.

## Date de iesire

Rezultatul $R$.

## Exemplu

**Input:**
\`\`\`
10 20
+
\`\`\`

**Output:**
\`\`\`
30
\`\`\``,
    testCases: [
      { input: "10 20\n+", output: "30", points: 34, isPublic: true },
      { input: "10 20\n*", output: "200", points: 33, isPublic: false },
      { input: "10 20\n/", output: "2", points: 33, isPublic: false },
    ],
  },
  {
    pbinfoId: 2248,
    title: "coordonate",
    slug: "coordonate",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/2248/coordonate",
    description: `## Cerinta

Intr-un patrat $n \\times n$ numerele sunt asezate consecutiv de la 1 la $n^2$ pe linii. Determina: (1) valoarea $V$ de la pozitia $(x, y)$; (2) pozitia $(i, j)$ unde se afla valoarea $val$.

## Date de intrare

Patru numere: $n$, $x$, $y$, $val$ ($1 \\leq n \\leq 20000$, $1 \\leq x, y \\leq n$, $1 \\leq val \\leq n^2$).

## Date de iesire

Trei numere $V$, $i$, $j$ separate prin spatii.

## Exemplu

**Input:**
\`\`\`
4 2 3 12
\`\`\`

**Output:**
\`\`\`
7 3 4
\`\`\``,
    testCases: [
      { input: "4 2 3 12", output: "7 3 4", points: 100, isPublic: true },
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
