import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 4360,
    title: "Trixie1",
    slug: "trixie1",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4360/trixie1",
    description: `## Cerinta

Se dau doua numere naturale de 3 cifre $a$ si $b$. Determina daca sunt anagrame (formate din aceleasi cifre).

## Date de intrare

Doua numere naturale $a$ si $b$ ($100 \\leq a \\leq b \\leq 999$).

## Date de iesire

\`DA\` daca sunt anagrame, \`NU\` in caz contrar.

## Exemple

**Input:**
\`\`\`
341 134
\`\`\`

**Output:**
\`\`\`
DA
\`\`\``,
    testCases: [
      { input: "341 134", output: "DA", points: 50, isPublic: true },
      { input: "223 332", output: "NU", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 109,
    title: "Paritate",
    slug: "paritate",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/109/paritate",
    description: `## Cerinta

Se citeste un numar natural $n$. Afiseaza daca este par sau impar.

## Date de intrare

Un numar natural $n$ ($0 < n < 1.000.000.000$).

## Date de iesire

\`n este par\` sau \`n este impar\`.

## Exemplu

**Input:**
\`\`\`
2012
\`\`\`

**Output:**
\`\`\`
2012 este par
\`\`\``,
    testCases: [
      { input: "2012", output: "2012 este par", points: 50, isPublic: true },
      { input: "7", output: "7 este impar", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 105,
    title: "max2",
    slug: "max2",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/105/max2",
    description: `## Cerinta

Determina maximul a doua numere intregi.

## Date de intrare

Doua numere intregi ($|a|, |b| < 2.000.000.000$).

## Date de iesire

Cel mai mare dintre cele doua numere.

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
      { input: "-5 3", output: "3", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 816,
    title: "Sticle",
    slug: "sticle",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/816/sticle",
    description: `## Cerinta

Un vas are $y$ litri. Avem sticle de $x$ litri. Cate sticle trebuie deschise pentru a umple vasul?

## Date de intrare

Doua numere naturale $x$ si $y$ ($1 \\leq x, y \\leq 1.000.000$).

## Date de iesire

Numarul de sticle necesare.

## Exemplu

**Input:**
\`\`\`
5 8
\`\`\`

**Output:**
\`\`\`
2
\`\`\`

**Explicatie:** Doua sticle de 5L (total 10L) sunt suficiente pentru 8L.`,
    testCases: [
      { input: "5 8", output: "2", points: 50, isPublic: true },
      { input: "3 9", output: "3", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 832,
    title: "Nota",
    slug: "nota",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/832/nota",
    description: `## Cerinta

Se citeste nota $n$ a unui elev ($1 \\leq n \\leq 10$). Afiseaza daca este corigent sau promovat.

## Date de intrare

Un numar natural $n$ ($1 \\leq n \\leq 10$).

## Date de iesire

\`corigent\` daca $n < 5$, \`promovat\` altfel.

## Exemplu

**Input:**
\`\`\`
5
\`\`\`

**Output:**
\`\`\`
promovat
\`\`\``,
    testCases: [
      { input: "5", output: "promovat", points: 50, isPublic: true },
      { input: "4", output: "corigent", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 469,
    title: "Interval2",
    slug: "interval2",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/469/interval2",
    description: `## Cerinta

Verifica daca numarul $x$ apartine intervalului $[a, b]$.

## Date de intrare

Trei numere naturale $a$, $b$, $x$ ($0 \\leq a \\leq b$, $0 \\leq x \\leq 1000$).

## Date de iesire

\`DA\` daca $x \\in [a, b]$, \`NU\` altfel.

## Exemplu

**Input:**
\`\`\`
4 9 8
\`\`\`

**Output:**
\`\`\`
DA
\`\`\``,
    testCases: [
      { input: "4 9 8", output: "DA", points: 50, isPublic: true },
      { input: "4 9 10", output: "NU", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3185,
    title: "Concurs1",
    slug: "concurs1",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3185/concurs1",
    description: `## Cerinta

Gigel are $n$ ani. Un concurs este destinat copiilor cu varste intre $a$ si $b$ ani (inclusiv). Determina daca Gigel poate participa.

## Date de intrare

Trei numere naturale $a$, $b$, $n$ ($1 \\leq a \\leq b$, $1 \\leq n \\leq 1000$).

## Date de iesire

\`DA\` daca $a \\leq n \\leq b$, \`NU\` altfel.

## Exemplu

**Input:**
\`\`\`
4 9 8
\`\`\`

**Output:**
\`\`\`
DA
\`\`\``,
    testCases: [
      { input: "4 9 8", output: "DA", points: 50, isPublic: true },
      { input: "4 9 10", output: "NU", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 106,
    title: "minim3",
    slug: "minim3",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/106/minim3",
    description: `## Cerinta

Calculeaza minimul a trei numere intregi.

## Date de intrare

Trei numere intregi separate prin spatii ($|a|, |b|, |c| < 1.000.000.000$).

## Date de iesire

Cel mai mic dintre cele trei numere.

## Exemplu

**Input:**
\`\`\`
125 68 200
\`\`\`

**Output:**
\`\`\`
68
\`\`\``,
    testCases: [
      { input: "125 68 200", output: "68", points: 50, isPublic: true },
      { input: "-1 0 1", output: "-1", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 4339,
    title: "pare_impare",
    slug: "pare-impare",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4339/pare-impare",
    description: `## Cerinta

Se citesc 3 numere intregi. Afiseaza \`pare\` daca cel putin doua sunt pare, \`impare\` altfel.

## Date de intrare

Trei numere intregi (valori absolute < $10^9$).

## Date de iesire

\`pare\` sau \`impare\`.

## Exemple

**Input:**
\`\`\`
125 68 200
\`\`\`

**Output:**
\`\`\`
pare
\`\`\``,
    testCases: [
      { input: "125 68 200", output: "pare", points: 50, isPublic: true },
      { input: "125 681 2001", output: "impare", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 833,
    title: "Varste copii",
    slug: "varste-copii",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/833/varste-copii",
    description: `## Cerinta

Se dau varstele $a$ si $b$ ale doi copii. Afiseaza care copil este mai mare si cu cat, sau daca au varste egale.

## Date de intrare

Doua numere naturale $a$ si $b$ ($1 \\leq a, b \\leq 100$).

## Date de iesire

\`Primul copil este mai mare cu x ani\`, \`Al doilea copil este mai mare cu x ani\`, sau \`Copiii au varste egale\`.

## Exemplu

**Input:**
\`\`\`
5 8
\`\`\`

**Output:**
\`\`\`
Al doilea copil este mai mare cu 3 ani
\`\`\``,
    testCases: [
      { input: "5 8", output: "Al doilea copil este mai mare cu 3 ani", points: 34, isPublic: true },
      { input: "10 3", output: "Primul copil este mai mare cu 7 ani", points: 33, isPublic: false },
      { input: "5 5", output: "Copiii au varste egale", points: 33, isPublic: false },
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
