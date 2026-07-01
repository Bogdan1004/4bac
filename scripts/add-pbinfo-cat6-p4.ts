import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 2603,
    title: "primacifraapartiizecimale",
    slug: "primacifraapartiizecimale",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2603/primacifraapartiizecimale",
    description: `## Cerinta

Se citeste un numar real $a$ (tip double). Afiseaza prima cifra de dupa virgula.

## Date de intrare

Un numar real $a$ ($1 \\leq a \\leq 1000$).

## Date de iesire

Prima cifra zecimala a lui $a$.

## Exemplu

**Input:**
\`\`\`
123.45
\`\`\`

**Output:**
\`\`\`
4
\`\`\`

**Explicatie:** Prima cifra dupa virgula este 4.`,
    testCases: [
      { input: "123.45", output: "4", points: 50, isPublic: true },
      { input: "9.7", output: "7", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2600,
    title: "expatr",
    slug: "expatr",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2600/expatr",
    description: `## Cerinta

Se da un numar natural $a$. Calculeaza si afiseaza partea intreaga a expresiei:

$$\\frac{3(a^2 + a^4)}{a^2 + a^4 + \\sqrt{a^2 + a^4}} + \\sqrt{a^2 + a^4}$$

## Date de intrare

Un numar natural $a$ ($1 \\leq a \\leq 100$).

## Date de iesire

Partea intreaga a rezultatului.

## Exemplu

**Input:**
\`\`\`
2
\`\`\`

**Output:**
\`\`\`
6
\`\`\``,
    testCases: [
      { input: "2", output: "6", points: 50, isPublic: true },
      { input: "1", output: "2", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2593,
    title: "Unghiuri Adiacente",
    slug: "unghiuri-adiacente",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2593/unghiuri-adiacente",
    description: `## Cerinta

Un segment are un punct comun cu o dreapta, formand doua unghiuri adiacente. Se da masura unghiului $x$ (in grade). Determina cel de-al doilea unghi $y$.

## Date de intrare

Un numar natural $x$ ($1 \\leq x \\leq 179$).

## Date de iesire

Masura unghiului $y = 180 - x$.

## Exemplu

**Input:**
\`\`\`
25
\`\`\`

**Output:**
\`\`\`
155
\`\`\``,
    testCases: [
      { input: "25", output: "155", points: 50, isPublic: true },
      { input: "90", output: "90", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3803,
    title: "AriePoligonRegulat",
    slug: "ariepoligonregulat",
    difficulty: "hard",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3803/ariepoligonregulat",
    description: `## Cerinta

Calculati aria unui poligon regulat cu $n$ laturi de lungime $l$, afisata cu exact 2 zecimale, fara rotunjire.

## Date de intrare

Doua numere: $n$ (numarul de laturi, $3 \\leq n \\leq 360$) si $l$ (lungimea laturii, $1 \\leq l < 1000$).

## Date de iesire

Aria poligonului cu 2 zecimale exacte.

## Exemple

**Input:**
\`\`\`
4 3
\`\`\`

**Output:**
\`\`\`
9.00
\`\`\`

**Formula:** $A = \\frac{n \\cdot l^2}{4 \\cdot \\tan(\\pi/n)}$`,
    testCases: [
      { input: "4 3", output: "9.00", points: 50, isPublic: true },
      { input: "6 3", output: "23.38", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 4041,
    title: "Multime Gauss",
    slug: "multime-gauss",
    difficulty: "hard",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/4041/multime-gauss",
    description: `## Cerinta

Numerele naturale sunt impartite in multimi: $M_1 = \\{1\\}$, $M_2 = \\{2, 3\\}$, $M_3 = \\{4, 5, 6\\}$, etc. Multimea $M_k$ contine $k$ elemente. Dat $n$, gaseste multimea $m$ din care face parte.

## Date de intrare

Un numar natural $n$ ($1 \\leq n \\leq 2 \\cdot 10^9$).

## Date de iesire

Indicele $m$ al multimii care contine pe $n$.

## Exemplu

**Input:**
\`\`\`
7
\`\`\`

**Output:**
\`\`\`
4
\`\`\`

**Explicatie:** $M_4 = \\{7, 8, 9, 10\\}$. Formula: cel mai mic $m$ cu $m(m+1)/2 \\geq n$.`,
    testCases: [
      { input: "7", output: "4", points: 50, isPublic: true },
      { input: "1", output: "1", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3812,
    title: "Inaltimi2",
    slug: "inaltimi2",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3812/inaltimi2",
    description: `## Cerinta

Se dau lungimile laturilor $a$, $b$, $c$ ale unui triunghi. Calculati lungimile celor 3 inaltimi cu 2 zecimale exacte. Daca triunghiul este invalid, afisati "Imposibil".

## Date de intrare

Trei numere naturale $a$, $b$, $c$ ($1 \\leq a, b, c \\leq 1000$).

## Date de iesire

Cele 3 inaltimi cu 2 zecimale, sau "Imposibil".

## Exemple

**Input:**
\`\`\`
3 4 5
\`\`\`

**Output:**
\`\`\`
3.00 2.40 4.00
\`\`\``,
    testCases: [
      { input: "3 4 5", output: "3.00 2.40 4.00", points: 50, isPublic: true },
      { input: "4 5 10", output: "Imposibil", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3811,
    title: "Bisectoare1",
    slug: "bisectoare1",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3811/bisectoare1",
    description: `## Cerinta

Se dau lungimile laturilor $a$ (BC), $b$ (AC), $c$ (AB) ale unui triunghi. Calculati lungimile bisectoarelor din C, A, B cu 2 zecimale exacte. Daca triunghiul este invalid, afisati "Imposibil".

## Date de intrare

Trei numere naturale $a$, $b$, $c$ ($1 \\leq a, b, c \\leq 1000$).

## Date de iesire

Cele 3 bisectoare cu 2 zecimale, sau "Imposibil".

## Exemple

**Input:**
\`\`\`
3 5 4
\`\`\`

**Output:**
\`\`\`
4.21 2.42 3.35
\`\`\``,
    testCases: [
      { input: "3 5 4", output: "4.21 2.42 3.35", points: 50, isPublic: true },
      { input: "4 5 10", output: "Imposibil", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3810,
    title: "Sfera",
    slug: "sfera",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3810/sfera",
    description: `## Cerinta

Se da raza $r$ a unei sfere. Calculati aria si volumul cu 2 zecimale exacte.

## Date de intrare

Un numar intreg $r$ ($1 \\leq r \\leq 1000$).

## Date de iesire

Aria si volumul sferei separate prin spatiu, cu 2 zecimale exacte.

## Exemplu

**Input:**
\`\`\`
5
\`\`\`

**Output:**
\`\`\`
314.15 523.59
\`\`\`

**Formule:** $A = 4\\pi r^2$, $V = \\frac{4}{3}\\pi r^3$`,
    testCases: [
      { input: "5", output: "314.15 523.59", points: 50, isPublic: true },
      { input: "1", output: "12.56 4.18", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3813,
    title: "Unghiuri",
    slug: "unghiuri-triunghi",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3813/unghiuri",
    description: `## Cerinta

Se dau lungimile laturilor AB, BC, AC ale unui triunghi. Calculati masurile unghiurilor A, B, C cu 2 zecimale exacte. Daca triunghiul este invalid, afisati "Imposibil".

## Date de intrare

Trei numere naturale AB, BC, AC ($1 \\leq AB, BC, AC \\leq 1000$).

## Date de iesire

Unghiurile A, B, C cu 2 zecimale, sau "Imposibil".

## Exemple

**Input:**
\`\`\`
7 8 6
\`\`\`

**Output:**
\`\`\`
75.52 46.56 57.91
\`\`\``,
    testCases: [
      { input: "7 8 6", output: "75.52 46.56 57.91", points: 50, isPublic: true },
      { input: "4 5 10", output: "Imposibil", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3814,
    title: "AriePatrulaterInscriptibil",
    slug: "ariepatrulaterinscriptibil",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3814/ariepatrulateriinscriptibil",
    description: `## Cerinta

Se dau lungimile laturilor AB, BC, CD, AD ale unui patrulater inscriptibil. Calculati aria cu exact 3 zecimale (formula lui Brahmagupta).

## Date de intrare

Patru numere naturale ($1 \\leq AB, BC, CD, AD \\leq 1000$).

## Date de iesire

Aria patrulaterului cu 3 zecimale exacte.

## Exemplu

**Input:**
\`\`\`
13 14 3 13
\`\`\`

**Output:**
\`\`\`
100.123
\`\`\`

**Formula:** $A = \\sqrt{(s-a)(s-b)(s-c)(s-d)}$ unde $s = (a+b+c+d)/2$.`,
    testCases: [
      { input: "13 14 3 13", output: "100.123", points: 100, isPublic: true },
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
