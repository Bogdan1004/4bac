import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 1311,
    title: "CifEgale",
    slug: "cifegale",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/1311/cifegale",
    description: `## Cerinta

Verifica daca un numar de 3 cifre are toate cifrele egale.

## Date de intrare

Un numar natural ($100 \\leq n \\leq 999$).

## Date de iesire

\`da\` daca toate cifrele sunt egale, \`nu\` altfel.

## Exemple

**Input:**
\`\`\`
333
\`\`\`

**Output:**
\`\`\`
da
\`\`\``,
    testCases: [
      { input: "333", output: "da", points: 50, isPublic: true },
      { input: "323", output: "nu", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3610,
    title: "urm00",
    slug: "urm00",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3610/urm00",
    description: `## Cerinta

Gaseste cel mai mic numar natural $\\geq n$ care se termina in doua zerouri (ultimele doua cifre sunt 00).

## Date de intrare

Un numar natural $n$ ($1 \\leq n \\leq 999.999.999$).

## Date de iesire

Cel mai mic multiplu de 100 mai mare sau egal cu $n$.

## Exemple

**Input:**
\`\`\`
3476
\`\`\`

**Output:**
\`\`\`
3500
\`\`\``,
    testCases: [
      { input: "3476", output: "3500", points: 50, isPublic: true },
      { input: "4500", output: "4500", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 167,
    title: "Semn",
    slug: "semn",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/167/semn",
    description: `## Cerinta

Determina semnul unui numar intreg $n$.

## Date de intrare

Un numar intreg $n$ ($-10^9 < n < 10^9$).

## Date de iesire

\`pozitiv\`, \`negativ\` sau \`nul\`.

## Exemplu

**Input:**
\`\`\`
2012
\`\`\`

**Output:**
\`\`\`
pozitiv
\`\`\``,
    testCases: [
      { input: "2012", output: "pozitiv", points: 34, isPublic: true },
      { input: "-5", output: "negativ", points: 33, isPublic: false },
      { input: "0", output: "nul", points: 33, isPublic: false },
    ],
  },
  {
    pbinfoId: 4499,
    title: "LaziPP",
    slug: "lazipp",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4499/lazipp",
    description: `## Cerinta

Se da o cutie paralelipipedica cu dimensiunile $a$, $b$, $c$ cm si o incapere cu inaltimea $h$ metri. Cutiile pot fi rotite. Determina numarul maxim de cutii care pot fi suprapuse.

## Date de intrare

Patru numere naturale $a$, $b$, $c$ (in cm) si $h$ (in m) ($1 \\leq a, b, c, h \\leq 100$).

## Date de iesire

Numarul maxim de cutii suprapuse.

## Exemplu

**Input:**
\`\`\`
4 3 6 1
\`\`\`

**Output:**
\`\`\`
33
\`\`\``,
    testCases: [
      { input: "4 3 6 1", output: "33", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 4518,
    title: "HarapAlb2",
    slug: "harapalb2",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4518/harapalb2",
    description: `## Cerinta

Se da un numar natural $N$ si un cod $r$ (1 sau 2). Rotunjeste $N$ la zeci ($r=1$) sau la sute ($r=2$).

## Date de intrare

Doua numere: $N$ ($0 \\leq N \\leq 10^9$) si $r$ (1 sau 2).

## Date de iesire

Valoarea rotunjita.

## Exemple

**Input:**
\`\`\`
2015 1
\`\`\`

**Output:**
\`\`\`
2020
\`\`\``,
    testCases: [
      { input: "2015 1", output: "2020", points: 50, isPublic: true },
      { input: "2015 2", output: "2000", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 4521,
    title: "HarapAlb3",
    slug: "harapalb3",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4521/harapalb3",
    description: `## Cerinta

Se da un numar natural cu exact 4 cifre $N$. Determina cel mai mare numar format din doua cifre vecine ale lui $N$.

## Date de intrare

Un numar natural $N$ ($1000 \\leq N \\leq 9999$).

## Date de iesire

Cel mai mare numar de doua cifre consecutive.

## Exemplu

**Input:**
\`\`\`
1548
\`\`\`

**Output:**
\`\`\`
84
\`\`\`

**Explicatie:** Perechile de cifre vecine sunt: 15, 54, 48. Cel mai mare numar format este 84 (din cifrele 8 si 4, combinatia maxima).`,
    testCases: [
      { input: "1548", output: "84", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 168,
    title: "Semn1",
    slug: "semn1",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/168/semn1",
    description: `## Cerinta

Verifica daca doua numere intregi nenule au acelasi semn.

## Date de intrare

Doua numere intregi nenule $a$ si $b$ ($-10^9 < a, b < 10^9$, $a, b \\neq 0$).

## Date de iesire

\`da\` daca au acelasi semn, \`nu\` altfel.

## Exemplu

**Input:**
\`\`\`
-3 14
\`\`\`

**Output:**
\`\`\`
nu
\`\`\``,
    testCases: [
      { input: "-3 14", output: "nu", points: 50, isPublic: true },
      { input: "5 10", output: "da", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 177,
    title: "bisect",
    slug: "bisect",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/177/bisect",
    description: `## Cerinta

Verifica daca un an calendaristic este bisect. Un an este bisect daca este divizibil cu 4 si nu cu 100, sau este divizibil cu 400.

## Date de intrare

Un numar natural $n$ ($0 < n < 5000$).

## Date de iesire

\`bisect\` sau \`nebisect\`.

## Exemple

**Input:**
\`\`\`
2000
\`\`\`

**Output:**
\`\`\`
bisect
\`\`\``,
    testCases: [
      { input: "2000", output: "bisect", points: 34, isPublic: true },
      { input: "1900", output: "nebisect", points: 33, isPublic: false },
      { input: "2024", output: "bisect", points: 33, isPublic: false },
    ],
  },
  {
    pbinfoId: 4034,
    title: "Canada",
    slug: "canada",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4034/canada",
    description: `## Cerinta

$a$% din populatia Canadei vorbeste engleza si $b$% vorbeste franceza. Determina procentul minim care vorbeste cu siguranta ambele limbi (principiul includerii-excluderii).

## Date de intrare

Doua numere naturale $a$ si $b$ ($1 \\leq a, b \\leq 100$, $a + b > 100$).

## Date de iesire

Procentul $c = a + b - 100$.

## Exemplu

**Input:**
\`\`\`
80 90
\`\`\`

**Output:**
\`\`\`
70
\`\`\``,
    testCases: [
      { input: "80 90", output: "70", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 4718,
    title: "TriunghiCif",
    slug: "triunghicif",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4718/triunghicif",
    description: `## Cerinta

Se construieste un triunghi cu cifrele 1-9 repetate ciclic (pe linia $i$ sunt $i$ cifre consecutive ciclice). Aflati a $C$-a cifra de pe linia $L$.

## Date de intrare

Doua numere naturale $L$ si $C$ ($1 \\leq C \\leq L \\leq 30.000$).

## Date de iesire

Cifra ceruta de pe pozitia $(L, C)$.

## Exemple

**Input:**
\`\`\`
3 1
\`\`\`

**Output:**
\`\`\`
4
\`\`\``,
    testCases: [
      { input: "3 1", output: "4", points: 50, isPublic: true },
      { input: "6 3", output: "9", points: 50, isPublic: false },
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
