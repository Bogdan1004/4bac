import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 3805,
    title: "RazaCercCircumscris",
    slug: "razacerccircumscris",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3805/razacerccircumscris",
    description: `## Cerinta

Se dau lungimile laturilor $a$, $b$, $c$ ale unui triunghi. Aflati raza cercului circumscris, cu 2 zecimale exacte. Daca triunghiul e invalid, afisati "Imposibil".

## Date de intrare

Trei numere naturale $a$, $b$, $c$ ($1 \\leq a, b, c \\leq 1000$).

## Date de iesire

Raza $R$ cu 2 zecimale, sau "Imposibil".

## Exemple

**Input:**
\`\`\`
3 4 5
\`\`\`

**Output:**
\`\`\`
2.50
\`\`\`

**Formula:** $R = \\frac{a \\cdot b \\cdot c}{4 \\cdot S}$ unde $S$ este aria triunghiului.`,
    testCases: [
      { input: "3 4 5", output: "2.50", points: 50, isPublic: true },
      { input: "4 5 10", output: "Imposibil", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3925,
    title: "rest1",
    slug: "rest1",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3925/rest1",
    description: `## Cerinta

Se dau $n$, $c$ si $r$. Gaseste cel mai mic numar natural $m > n$ cu proprietatea ca $m \\mod c = r$.

## Date de intrare

Trei numere naturale $n$, $c$, $r$ ($1 \\leq n \\leq 10^{12}$, $0 \\leq r < c \\leq 10^{12}$).

## Date de iesire

Cel mai mic $m > n$ cu $m \\mod c = r$.

## Exemplu

**Input:**
\`\`\`
30 7 1
\`\`\`

**Output:**
\`\`\`
36
\`\`\``,
    testCases: [
      { input: "30 7 1", output: "36", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 3806,
    title: "Mediane",
    slug: "mediane",
    difficulty: "hard",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3806/mediane",
    description: `## Cerinta

Se dau lungimile laturilor $a$ (BC), $b$ (AC), $c$ (AB) ale unui triunghi. Calculati lungimile medianelor din A, B, C cu 2 zecimale exacte. Daca triunghiul e invalid, afisati "Imposibil".

## Date de intrare

Trei numere naturale $a$, $b$, $c$ ($1 \\leq a, b, c \\leq 1000$).

## Date de iesire

Cele 3 mediane cu 2 zecimale, sau "Imposibil".

## Exemple

**Input:**
\`\`\`
3 4 5
\`\`\`

**Output:**
\`\`\`
4.27 3.60 2.50
\`\`\`

**Formula:** $m_a = \\frac{1}{2}\\sqrt{2b^2 + 2c^2 - a^2}$`,
    testCases: [
      { input: "3 4 5", output: "4.27 3.60 2.50", points: 50, isPublic: true },
      { input: "4 5 10", output: "Imposibil", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 252,
    title: "U2Impare",
    slug: "u2impare",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/252/u2impare",
    description: `## Cerinta

Se da $n$. Determina cele mai mari doua numere impare strict mai mici decat $n$.

## Date de intrare

Un numar natural $n$ ($4 \\leq n \\leq 10^9$).

## Date de iesire

Doua numere impare in ordine crescatoare, separate prin spatiu.

## Exemplu

**Input:**
\`\`\`
8
\`\`\`

**Output:**
\`\`\`
5 7
\`\`\``,
    testCases: [
      { input: "8", output: "5 7", points: 50, isPublic: true },
      { input: "10", output: "7 9", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 253,
    title: "U2Pare",
    slug: "u2pare",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/253/u2pare",
    description: `## Cerinta

Se da $n$. Determina cele mai mici doua numere pare strict mai mari decat $n$.

## Date de intrare

Un numar natural $n$ ($1 \\leq n \\leq 10^9$).

## Date de iesire

Doua numere pare in ordine crescatoare, separate prin spatiu.

## Exemplu

**Input:**
\`\`\`
8
\`\`\`

**Output:**
\`\`\`
10 12
\`\`\``,
    testCases: [
      { input: "8", output: "10 12", points: 50, isPublic: true },
      { input: "5", output: "6 8", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 179,
    title: "triunghi",
    slug: "triunghi",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/179/triunghi",
    description: `## Cerinta

Verifica daca trei numere reale pot fi lungimile laturilor unui triunghi.

## Date de intrare

Trei numere reale $a$, $b$, $c$ ($0 \\leq a, b, c \\leq 1000$).

## Date de iesire

\`da\` sau \`nu\`.

## Exemple

**Input:**
\`\`\`
3 4 5
\`\`\`

**Output:**
\`\`\`
da
\`\`\``,
    testCases: [
      { input: "3 4 5", output: "da", points: 50, isPublic: true },
      { input: "1 4 5", output: "nu", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2765,
    title: "CheckColor",
    slug: "checkcolor",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/2765/checkcolor",
    description: `## Cerinta

Se dau trei valori R, G, B. Daca oricare e in afara [0, 255]: afiseaza "NU E CULOARE". Altfel, daca diferenta dintre oricare doua valori e $\\leq 10$: afiseaza "GRI". Altfel: "CULOARE".

## Date de intrare

Trei numere intregi R, G, B ($-1000 \\leq R, G, B \\leq 1000$).

## Date de iesire

\`NU E CULOARE\`, \`GRI\` sau \`CULOARE\`.

## Exemple

**Input:**
\`\`\`
118 119 120
\`\`\`

**Output:**
\`\`\`
GRI
\`\`\``,
    testCases: [
      { input: "118 119 120", output: "GRI", points: 34, isPublic: true },
      { input: "0 128 256", output: "NU E CULOARE", points: 33, isPublic: false },
      { input: "118 128 255", output: "CULOARE", points: 33, isPublic: false },
    ],
  },
  {
    pbinfoId: 1358,
    title: "Minciuna",
    slug: "minciuna",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/1358/minciuna",
    description: `## Cerinta

Andrei sustine ca a ascuns biletele intre paginile $x$ si $y$ ale unui manual. Determina daca e posibil. Paginile unui manual sunt pe fete opuse: pentru a ascunde ceva intre doua pagini, $x$ trebuie sa fie impar si $y = x + 1$.

## Date de intrare

Doua numere naturale $x$ si $y$ ($1 \\leq x, y \\leq 1000$).

## Date de iesire

\`Andrei e mai responsabil\` sau \`minciuna\`.

## Exemplu

**Input:**
\`\`\`
49 50
\`\`\`

**Output:**
\`\`\`
minciuna
\`\`\``,
    testCases: [
      { input: "49 50", output: "minciuna", points: 50, isPublic: true },
      { input: "3 4", output: "Andrei e mai responsabil", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 1301,
    title: "isoscel",
    slug: "isoscel",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/1301/isoscel",
    description: `## Cerinta

Se dau trei numere reale. Verifica daca formeaza laturile unui triunghi isoscel (exact doua laturi egale; echilateralul NU este isoscel).

## Date de intrare

Trei numere reale $a$, $b$, $c$.

## Date de iesire

\`Formeaza triunghi isoscel\`, \`Nu formeaza triunghi isoscel\` (daca e oarecare sau echilateral), sau \`Nu formeaza triunghi\`.

## Exemplu

**Input:**
\`\`\`
5 7.5 5
\`\`\`

**Output:**
\`\`\`
Formeaza triunghi isoscel
\`\`\``,
    testCases: [
      { input: "5 7.5 5", output: "Formeaza triunghi isoscel", points: 34, isPublic: true },
      { input: "3 4 5", output: "Nu formeaza triunghi isoscel", points: 33, isPublic: false },
      { input: "1 4 5", output: "Nu formeaza triunghi", points: 33, isPublic: false },
    ],
  },
  {
    pbinfoId: 333,
    title: "triunghi1",
    slug: "triunghi1",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/333/triunghi1",
    description: `## Cerinta

Se dau trei numere reale. Verifica daca pot fi laturile unui triunghi. Daca da, determina tipul: ascutitunghic, dreptunghic sau obtuzunghic.

## Date de intrare

Trei numere reale $a$, $b$, $c$ ($0 \\leq a, b, c \\leq 100$).

## Date de iesire

\`nu este triunghi\`, \`triunghi ascutitunghic\`, \`triunghi dreptunghic\` sau \`triunghi obtuzunghic\`.

## Exemple

**Input:**
\`\`\`
3 5 4
\`\`\`

**Output:**
\`\`\`
triunghi dreptunghic
\`\`\``,
    testCases: [
      { input: "3 5 4", output: "triunghi dreptunghic", points: 34, isPublic: true },
      { input: "5 1 4", output: "nu este triunghi", points: 33, isPublic: false },
      { input: "3 3 3", output: "triunghi ascutitunghic", points: 33, isPublic: false },
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
