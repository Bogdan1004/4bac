import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 3816,
    title: "IntersectieGraficeFunctii",
    slug: "intersectiegraficefunctii",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3816/intersectiegraficefunctii",
    description: `## Cerinta

Fie functiile $f(x) = a_1 x + b_1$ si $g(x) = a_2 x^2 + b_2 x + c_2$. Determina punctele de intersectie.

## Date de intrare

Cinci numere intregi: $a_1$, $b_1$, $a_2$, $b_2$, $c_2$ ($-100 \\leq $ coeficienti $\\leq 100$).

## Date de iesire

Punctele de intersectie ca perechi $(x, y)$ cu 2 zecimale, sau "Nu se intersecteaza", sau "Infinit de solutii".

## Exemple

**Input:**
\`\`\`
2 0 1 0 0
\`\`\`

**Output:**
\`\`\`
(0.00, 0.00)
(2.00, 4.00)
\`\`\``,
    testCases: [
      { input: "2 0 1 0 0", output: "(0.00, 0.00)\n(2.00, 4.00)", points: 50, isPublic: true },
      { input: "0 0 1 0 1", output: "Nu se intersecteaza", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 454,
    title: "Calendar",
    slug: "calendar",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/454/calendar",
    description: `## Cerinta

Se da o data calendaristica ca an, luna si zi. Determina ziua anului (1 = 1 Ianuarie).

## Date de intrare

Trei numere naturale $an$, $luna$, $zi$.

## Date de iesire

Ziua din an.

## Exemple

**Input:**
\`\`\`
2004 3 1
\`\`\`

**Output:**
\`\`\`
61
\`\`\`

**Explicatie:** Ianuarie(31) + Februarie(29, an bisect) + 1 = 61.`,
    testCases: [
      { input: "2004 3 1", output: "61", points: 50, isPublic: true },
      { input: "2003 3 1", output: "60", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 455,
    title: "Calendar1",
    slug: "calendar1",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/455/calendar1",
    description: `## Cerinta

Se da un an si o zi din an (1-365/366). Determina data calendaristica (luna si ziua).

## Date de intrare

Doua numere naturale: $an$ si $nr$ (ziua din an).

## Date de iesire

Doua numere: $luna$ si $zi$.

## Exemple

**Input:**
\`\`\`
2004 61
\`\`\`

**Output:**
\`\`\`
3 1
\`\`\``,
    testCases: [
      { input: "2004 61", output: "3 1", points: 50, isPublic: true },
      { input: "2003 60", output: "3 1", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 480,
    title: "Sum3Cons",
    slug: "sum3cons",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/480/sum3cons",
    description: `## Cerinta

Determina daca un numar natural $n$ poate fi scris ca suma a 3 numere naturale consecutive. Daca da, afiseaza cele 3 numere.

## Date de intrare

Un numar natural $n$ ($0 < n < 10^9$).

## Date de iesire

Cele 3 numere consecutive sau "Nu exista".

## Exemple

**Input:**
\`\`\`
12
\`\`\`

**Output:**
\`\`\`
3 4 5
\`\`\`

**Explicatie:** $12 = 3+4+5$, $12 \\mod 3 = 0$ si $12/3 = 4$ (termenul din mijloc).`,
    testCases: [
      { input: "12", output: "3 4 5", points: 50, isPublic: true },
      { input: "10", output: "Nu exista", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 481,
    title: "Prod2Cons",
    slug: "prod2cons",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/481/prod2cons",
    description: `## Cerinta

Determina daca un numar natural $n$ poate fi scris ca produs a 2 numere naturale consecutive. Daca da, afiseaza cele 2 numere.

## Date de intrare

Un numar natural $n$ ($0 < n < 10^9$).

## Date de iesire

Cele 2 numere consecutive sau "Nu exista".

## Exemple

**Input:**
\`\`\`
12
\`\`\`

**Output:**
\`\`\`
3 4
\`\`\``,
    testCases: [
      { input: "12", output: "3 4", points: 50, isPublic: true },
      { input: "10", output: "Nu exista", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 1308,
    title: "CifreComune",
    slug: "cifrecomune",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/1308/cifrecomune",
    description: `## Cerinta

Se dau doua numere naturale de exact 3 cifre. Determina cate cifre comune au (pe aceeasi pozitie).

## Date de intrare

Doua numere naturale de 3 cifre ($100 \\leq a, b \\leq 999$).

## Date de iesire

Numarul de cifre comune pe aceeasi pozitie.

## Exemple

**Input:**
\`\`\`
145 245
\`\`\`

**Output:**
\`\`\`
2
\`\`\`

**Explicatie:** Zeci = 4 (la ambele), Unitati = 5 (la ambele). 2 cifre comune.`,
    testCases: [
      { input: "145 245", output: "2", points: 50, isPublic: true },
      { input: "123 456", output: "0", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 1309,
    title: "Gresie",
    slug: "gresie",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/1309/gresie",
    description: `## Cerinta

O camera dreptunghiulara are dimensiunile $L1 \\times L2$ cm. Gresiile au dimensiunea $p \\times p$ cm. Determina numarul minim de gresii intregi si decupate necesare pentru acoperirea completa.

## Date de intrare

Trei numere naturale $L1$, $L2$, $p$ ($1 \\leq p, L1, L2 \\leq 1000$).

## Date de iesire

Doua numere: numarul de gresii intregi si numarul de gresii decupate.

## Exemple

**Input:**
\`\`\`
5 3 2
\`\`\`

**Output:**
\`\`\`
2 5
\`\`\``,
    testCases: [
      { input: "5 3 2", output: "2 5", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 1310,
    title: "CifDiv",
    slug: "cifdiv",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/1310/cifdiv",
    description: `## Cerinta

Se da un numar de 3 cifre. Determina cate cifre ale sale sunt divizori ai numarului.

## Date de intrare

Un numar natural de exact 3 cifre ($100 \\leq n \\leq 999$).

## Date de iesire

Numarul de cifre care sunt divizori (cifra 0 se ignora).

## Exemple

**Input:**
\`\`\`
123
\`\`\`

**Output:**
\`\`\`
2
\`\`\`

**Explicatie:** 1 divide 123 (da), 2 divide 123 (nu, 123/2=61.5), 3 divide 123 (da, 123/3=41). 2 cifre sunt divizori.`,
    testCases: [
      { input: "123", output: "2", points: 50, isPublic: true },
      { input: "111", output: "3", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2752,
    title: "CifreZecimale",
    slug: "cifrezecimale",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/2752/cifrezecimale",
    description: `## Cerinta

Se da un numar rational $p/q$, unde $q \\in \\{2, 4, 5, 8, 10, 16, 20, 25, 40, 50, 80, 100\\}$. Afiseaza primele 2 cifre zecimale ale impartirii.

## Date de intrare

Doua numere naturale $p$ si $q$ ($1 \\leq p, q \\leq 10^6$).

## Date de iesire

Primele 2 cifre dupa virgula ale lui $p/q$.

## Exemple

**Input:**
\`\`\`
1 4
\`\`\`

**Output:**
\`\`\`
25
\`\`\`

**Explicatie:** $1/4 = 0.25$, primele 2 cifre zecimale sunt 2 si 5.`,
    testCases: [
      { input: "1 4", output: "25", points: 50, isPublic: true },
      { input: "1 8", output: "12", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 8,
    title: "maxim3",
    slug: "maxim3",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/8/maxim3",
    description: `## Cerinta

Calculeaza maximul a trei numere intregi.

## Date de intrare

Trei numere intregi separate prin spatiu ($|a|, |b|, |c| < 10^9$).

## Date de iesire

Maximul dintre cele trei.

## Exemplu

**Input:**
\`\`\`
125 68 243
\`\`\`

**Output:**
\`\`\`
243
\`\`\``,
    testCases: [
      { input: "125 68 243", output: "243", points: 34, isPublic: true },
      { input: "-5 -3 -7", output: "-3", points: 33, isPublic: false },
      { input: "0 0 0", output: "0", points: 33, isPublic: false },
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
