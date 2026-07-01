import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 334,
    title: "Dreapta",
    slug: "dreapta",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/334/dreapta",
    description: `## Cerinta

Se dau coordonatele a doua puncte distincte. Determina daca dreapta care le uneste este orizontala, verticala sau oblica.

## Date de intrare

Patru numere intregi $x_1$, $y_1$, $x_2$, $y_2$ ($-1000 \\leq x_i, y_i \\leq 1000$).

## Date de iesire

\`orizontala\`, \`verticala\` sau \`oblica\`.

## Exemplu

**Input:**
\`\`\`
-1 2 4 -3
\`\`\`

**Output:**
\`\`\`
oblica
\`\`\``,
    testCases: [
      { input: "-1 2 4 -3", output: "oblica", points: 34, isPublic: true },
      { input: "0 5 10 5", output: "orizontala", points: 33, isPublic: false },
      { input: "3 0 3 7", output: "verticala", points: 33, isPublic: false },
    ],
  },
  {
    pbinfoId: 3207,
    title: "Cercuri",
    slug: "cercuri",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3207/cercuri",
    description: `## Cerinta

Se dau doua cercuri prin raza si coordonatele centrului. Determina numarul de puncte de intersectie (0, 1 sau 2) sau "infinit" daca sunt identice.

## Date de intrare

Sase numere reale: $r_1$, $x_1$, $y_1$, $r_2$, $x_2$, $y_2$.

## Date de iesire

0, 1, 2 sau "infinit".

## Exemple

**Input:**
\`\`\`
4 2 -2
2 -3 1
\`\`\`

**Output:**
\`\`\`
2
\`\`\``,
    testCases: [
      { input: "4 2 -2\n2 -3 1", output: "2", points: 50, isPublic: true },
      { input: "8 0 5\n2 0 -5", output: "1", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 382,
    title: "AproapeK",
    slug: "aproape-k",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/382/aproape-k",
    description: `## Cerinta

Se dau doua numere naturale nenule $n$ si $k$. Determina multiplul lui $k$ cel mai apropiat de $n$. Daca doua sunt egal departate, se afiseaza cel mai mic.

## Date de intrare

Doua numere naturale $n$ si $k$ ($1 \\leq k \\leq n \\leq 10^6$).

## Date de iesire

Multiplul lui $k$ cel mai apropiat de $n$.

## Exemplu

**Input:**
\`\`\`
18 5
\`\`\`

**Output:**
\`\`\`
20
\`\`\``,
    testCases: [
      { input: "18 5", output: "20", points: 50, isPublic: true },
      { input: "15 5", output: "15", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 450,
    title: "minicalc",
    slug: "minicalc",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/450/minicalc",
    description: `## Cerinta

Se citesc trei numere naturale $a$, $b$, $c$. In functie de $c$, efectueaza operatia: $c=1$: $a+b$; $c=2$: $a-b$; $c=3$: $a \\cdot b$; $c=4$: $a \\div b$; $c=5$: $a \\mod b$. Se garanteaza $a \\geq b$ si $b \\neq 0$.

## Date de intrare

Trei numere naturale $a$, $b$, $c$ ($a, b < 32676$, $c \\in \\{1,2,3,4,5\\}$).

## Date de iesire

Rezultatul operatiei.

## Exemplu

**Input:**
\`\`\`
4 2 3
\`\`\`

**Output:**
\`\`\`
8
\`\`\``,
    testCases: [
      { input: "4 2 3", output: "8", points: 34, isPublic: true },
      { input: "10 3 5", output: "1", points: 33, isPublic: false },
      { input: "10 3 4", output: "3", points: 33, isPublic: false },
    ],
  },
  {
    pbinfoId: 449,
    title: "nrcif",
    slug: "nrcif",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/449/nrcif",
    description: `## Cerinta

Determina numarul de cifre ale unui numar natural cu cel mult 3 cifre.

## Date de intrare

Un numar natural cu cel mult 3 cifre.

## Date de iesire

Numarul de cifre.

## Exemplu

**Input:**
\`\`\`
397
\`\`\`

**Output:**
\`\`\`
3
\`\`\``,
    testCases: [
      { input: "397", output: "3", points: 34, isPublic: true },
      { input: "42", output: "2", points: 33, isPublic: false },
      { input: "7", output: "1", points: 33, isPublic: false },
    ],
  },
  {
    pbinfoId: 446,
    title: "cifmax3",
    slug: "cifmax3",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/446/cifmax3",
    description: `## Cerinta

Identifica si afiseaza cea mai mare cifra dintr-un numar natural de exact 3 cifre.

## Date de intrare

Un numar natural de exact 3 cifre ($100 \\leq n \\leq 999$).

## Date de iesire

Cea mai mare cifra.

## Exemplu

**Input:**
\`\`\`
187
\`\`\`

**Output:**
\`\`\`
8
\`\`\``,
    testCases: [
      { input: "187", output: "8", points: 50, isPublic: true },
      { input: "999", output: "9", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 447,
    title: "cifmid",
    slug: "cifmid",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/447/cifmid",
    description: `## Cerinta

Se citeste un numar natural de exact 3 cifre distincte. Afiseaza cifra cu valoare intermediara (nu cea mai mica, nu cea mai mare).

## Date de intrare

Un numar natural cu exact 3 cifre distincte ($100 \\leq n \\leq 999$).

## Date de iesire

Cifra intermediara.

## Exemplu

**Input:**
\`\`\`
397
\`\`\`

**Output:**
\`\`\`
7
\`\`\`

**Explicatie:** Cifrele sunt 3, 9, 7. Min=3, max=9, mijloc=7.`,
    testCases: [
      { input: "397", output: "7", points: 50, isPublic: true },
      { input: "132", output: "2", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2696,
    title: "CifP_CifI",
    slug: "cifp-cifi",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/2696/cifp-cifi",
    description: `## Cerinta

Se dau doua numere de exact 2 cifre. Daca au aceeasi paritate (ambele pare sau ambele impare), afiseaza numarul total de cifre pare din ambele numere. Altfel, afiseaza numarul total de cifre impare.

## Date de intrare

Doua numere naturale de 2 cifre ($10 \\leq a \\leq b \\leq 100$).

## Date de iesire

Numarul de cifre pare sau impare.

## Exemplu

**Input:**
\`\`\`
78 18
\`\`\`

**Output:**
\`\`\`
2
\`\`\``,
    testCases: [
      { input: "78 18", output: "2", points: 50, isPublic: true },
      { input: "78 19", output: "3", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2694,
    title: "MinMax2",
    slug: "minmax2",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/2694/minmax2",
    description: `## Cerinta

Se dau doua numere naturale cu exact 3 cifre fiecare. Afiseaza cel mai mare si cel mai mic numar de 2 cifre format dintr-o cifra din primul si una din al doilea numar.

## Date de intrare

Doua numere naturale cu 3 cifre ($100 \\leq a, b \\leq 999$).

## Date de iesire

Cel mai mare si cel mai mic numar de 2 cifre, separate prin spatiu.

## Exemplu

**Input:**
\`\`\`
123 912
\`\`\`

**Output:**
\`\`\`
93 11
\`\`\``,
    testCases: [
      { input: "123 912", output: "93 11", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 4498,
    title: "maxx3",
    slug: "maxx3",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4498/maxx3",
    description: `## Cerinta

Se dau doua numere naturale cu exact 3 cifre. Afiseaza 3 numere: (1) cel mai mare numar format din cifrele sutelor celor doua numere; (2) similar pentru zeci; (3) similar pentru unitati.

## Date de intrare

Doua numere naturale cu 3 cifre ($100 \\leq n, m \\leq 999$).

## Date de iesire

Trei numere separate prin spatii.

## Exemplu

**Input:**
\`\`\`
342 871
\`\`\`

**Output:**
\`\`\`
83 74 21
\`\`\``,
    testCases: [
      { input: "342 871", output: "83 74 21", points: 100, isPublic: true },
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
