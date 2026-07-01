import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 3817,
    title: "ArieTrapez",
    slug: "arietrapez",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3817/arietrapez",
    description: `## Cerinta

Se dau lungimile laturilor AB, BC, CD, AD ale unui trapez ABCD (AB || CD). Calculati aria cu 2 zecimale exacte. Daca trapezul este invalid, afisati "Imposibil".

## Date de intrare

Patru numere naturale AB, BC, CD, AD ($1 \\leq AB, BC, CD, AD \\leq 1000$).

## Date de iesire

Aria trapezului cu 2 zecimale, sau "Imposibil".

## Exemplu

**Input:**
\`\`\`
6 4 8 3
\`\`\`

**Output:**
\`\`\`
20.33
\`\`\``,
    testCases: [
      { input: "6 4 8 3", output: "20.33", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 182,
    title: "cub",
    slug: "cub",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/182/cub",
    description: `## Cerinta

Se da latura $L$ a unui cub. Calculati aria totala si volumul.

## Date de intrare

Un numar natural $L$ ($1 \\leq L \\leq 1000$).

## Date de iesire

Doua numere separate prin spatiu: aria totala $S$ si volumul $V$.

## Exemplu

**Input:**
\`\`\`
5
\`\`\`

**Output:**
\`\`\`
150 125
\`\`\`

**Explicatie:** $S = 6 \\cdot L^2 = 150$, $V = L^3 = 125$.`,
    testCases: [
      { input: "5", output: "150 125", points: 50, isPublic: true },
      { input: "1", output: "6 1", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3070,
    title: "dreptunghi",
    slug: "dreptunghi",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3070/dreptunghi",
    description: `## Cerinta

Se dau laturile $a$ si $b$ ale unui dreptunghi. Calculati perimetrul $P$, aria $A$ si patratul diagonalei $D$.

## Date de intrare

Doua numere naturale $a$ si $b$.

## Date de iesire

Trei numere $P$, $A$, $D$ separate prin spatii.

## Exemplu

**Input:**
\`\`\`
3 4
\`\`\`

**Output:**
\`\`\`
14 12 25
\`\`\`

**Explicatie:** $P=14$, $A=12$, $D=3^2+4^2=25$.`,
    testCases: [
      { input: "3 4", output: "14 12 25", points: 50, isPublic: true },
      { input: "5 5", output: "20 25 50", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3551,
    title: "InaltimeTriunghi",
    slug: "inaltimetriunghi",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3551/inaltimetriunghi",
    description: `## Cerinta

Intr-un triunghi dreptunghic se da cateta $c_1$, cateta $c_2$ si ipotenuza $i$. Determina inaltimea $h$ dusa din unghiul drept pe ipotenuza, afisata cu exact 2 zecimale.

## Date de intrare

Trei numere naturale $c_1$, $c_2$, $i$ ($1 \\leq c_1, c_2, i \\leq 1000$).

## Date de iesire

Inaltimea $h$ cu 2 zecimale exacte.

## Exemplu

**Input:**
\`\`\`
3 4 5
\`\`\`

**Output:**
\`\`\`
2.40
\`\`\`

**Formula:** $h = \\frac{c_1 \\cdot c_2}{i}$`,
    testCases: [
      { input: "3 4 5", output: "2.40", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 2889,
    title: "Disc",
    slug: "disc",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2889/disc",
    description: `## Cerinta

Se da raza $r$ a unui cerc. Calculati aria si perimetrul discului.

## Date de intrare

Un numar real $r$ ($2 \\leq r \\leq 1000$).

## Date de iesire

Aria si perimetrul cercului separate prin spatiu (eroare maxim 0.01).

## Exemplu

**Input:**
\`\`\`
5
\`\`\`

**Output:**
\`\`\`
78.539816 31.415927
\`\`\`

**Formule:** $A = \\pi r^2$, $P = 2\\pi r$`,
    testCases: [
      { input: "5", output: "78.539816 31.415927", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 3825,
    title: "Radius",
    slug: "radius",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3825/radius",
    description: `## Cerinta

Se da un poligon regulat cu $n$ laturi si latura de lungime $a$. Calculati distanta de la centru la oricare varf (raza cercului circumscris), cu 2 zecimale exacte.

## Date de intrare

Doua numere: $n$ ($3 \\leq n \\leq 360$) si $a$ ($1 \\leq a \\leq 1000$).

## Date de iesire

Raza $r$ cu 2 zecimale exacte.

## Exemple

**Input:**
\`\`\`
6 3
\`\`\`

**Output:**
\`\`\`
3.00
\`\`\`

**Formula:** $r = \\frac{a}{2 \\cdot \\sin(\\pi/n)}$`,
    testCases: [
      { input: "6 3", output: "3.00", points: 50, isPublic: true },
      { input: "4 2", output: "1.41", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 103,
    title: "Curte",
    slug: "curte",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/103/curte",
    description: `## Cerinta

Se dau dimensiunile $a$ si $b$ ale unei curti dreptunghiulare. Determina aria curtii si lungimea gardului (perimetrul).

## Date de intrare

Doua numere naturale $a$ si $b$ ($0 < a, b < 10000$).

## Date de iesire

Doua numere separate prin spatiu: aria si perimetrul.

## Exemplu

**Input:**
\`\`\`
20 12
\`\`\`

**Output:**
\`\`\`
240 64
\`\`\``,
    testCases: [
      { input: "20 12", output: "240 64", points: 50, isPublic: true },
      { input: "5 5", output: "25 20", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 1333,
    title: "trapez",
    slug: "trapez-pb1333",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/1333/trapez",
    description: `## Cerinta

Se da un trapez isoscel cu baza mare $B$, baza mica $b$ si laturile oblice $l$. Calculati diagonala.

## Date de intrare

Trei numere reale $B$, $b$, $l$ ($0 < B, b, l < 1000$).

## Date de iesire

Diagonala trapezului (eroare maxim 0.01).

## Exemplu

**Input:**
\`\`\`
6 2 5
\`\`\`

**Output:**
\`\`\`
6.08276
\`\`\``,
    testCases: [
      { input: "6 2 5", output: "6.08276", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 1334,
    title: "romb",
    slug: "romb",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/1334/romb",
    description: `## Cerinta

Se dau diagonalele $d_1$ si $d_2$ ale unui romb. Calculati perimetrul si aria.

## Date de intrare

Doua numere reale $d_1$ si $d_2$ ($0 < d_1, d_2 < 100$).

## Date de iesire

Perimetrul si aria separate prin spatiu (eroare maxim 0.01).

## Exemplu

**Input:**
\`\`\`
2 4
\`\`\`

**Output:**
\`\`\`
8.94427 4
\`\`\`

**Formule:** $P = 4 \\cdot \\sqrt{(d_1/2)^2 + (d_2/2)^2}$, $A = d_1 \\cdot d_2 / 2$`,
    testCases: [
      { input: "2 4", output: "8.94427 4", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 3901,
    title: "LaturaTriunghi",
    slug: "laturatriunghi",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3901/laturatriunghi",
    description: `## Cerinta

Se dau doua laturi $a$, $b$ ale unui triunghi si unghiul $u$ (in grade) dintre ele. Determinati lungimea celei de-a treia laturi $c$, cu cel putin 2 zecimale exacte.

## Date de intrare

Trei numere naturale $a$, $b$, $u$ ($1 \\leq a, b \\leq 1000$, $1 \\leq u \\leq 179$).

## Date de iesire

Latura $c$ cu 2 zecimale exacte (eroare < 0.01).

## Exemplu

**Input:**
\`\`\`
22 29 40
\`\`\`

**Output:**
\`\`\`
18.64
\`\`\`

**Formula:** Teorema cosinusului: $c^2 = a^2 + b^2 - 2ab\\cos(u)$`,
    testCases: [
      { input: "22 29 40", output: "18.64", points: 100, isPublic: true },
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
