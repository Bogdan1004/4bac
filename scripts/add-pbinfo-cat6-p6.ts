import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 3609,
    title: "countmod10",
    slug: "countmod10",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3609/countmod10",
    description: `## Cerinta

Determina cate numere naturale divizibile cu 10 se afla in intervalul $[a, b]$.

## Date de intrare

Doua numere naturale $a$ si $b$ ($1 \\leq a \\leq b \\leq 1.000.000.000$).

## Date de iesire

Numarul de multipli de 10 din $[a, b]$.

## Exemplu

**Input:**
\`\`\`
19 90
\`\`\`

**Output:**
\`\`\`
8
\`\`\`

**Explicatie:** Multiplii de 10 sunt: 20, 30, 40, 50, 60, 70, 80, 90.`,
    testCases: [
      { input: "19 90", output: "8", points: 50, isPublic: true },
      { input: "1 10", output: "1", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3928,
    title: "abcd",
    slug: "abcd",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3928/abcd",
    description: `## Cerinta

Se dau patru numere naturale $a < b < c < d$. Determina cate numere naturale divizibile cu 3 se afla in reuniunea $[a,b] \\cup [c,d]$.

## Date de intrare

Patru numere naturale $a$, $b$, $c$, $d$ ($2 \\leq a < b < c < d \\leq 2.000.000.000$).

## Date de iesire

Numarul de multipli de 3 din $[a,b] \\cup [c,d]$.

## Exemplu

**Input:**
\`\`\`
2 7 10 18
\`\`\`

**Output:**
\`\`\`
5
\`\`\`

**Explicatie:** Multiplii de 3: {3, 6, 12, 15, 18}.`,
    testCases: [
      { input: "2 7 10 18", output: "5", points: 50, isPublic: true },
      { input: "1 3 7 9", output: "3", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 169,
    title: "sumcif",
    slug: "sumcif",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/169/sumcif",
    description: `## Cerinta

Se citeste un numar natural cu exact 3 cifre. Calculeaza suma cifrelor sale.

## Date de intrare

Un numar natural $n$ cu exact 3 cifre ($100 \\leq n \\leq 999$).

## Date de iesire

Suma cifrelor lui $n$.

## Exemplu

**Input:**
\`\`\`
752
\`\`\`

**Output:**
\`\`\`
14
\`\`\`

**Explicatie:** $7 + 5 + 2 = 14$`,
    testCases: [
      { input: "752", output: "14", points: 50, isPublic: true },
      { input: "100", output: "1", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2601,
    title: "sumapatratecifre",
    slug: "sumapatratecifre",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2601/sumapatratecifre",
    description: `## Cerinta

Se citeste un numar natural cu exact 3 cifre. Calculeaza suma patratelor cifrelor sale.

## Date de intrare

Un numar natural $a$ ($100 \\leq a \\leq 999$).

## Date de iesire

Suma patratelor cifrelor lui $a$.

## Exemplu

**Input:**
\`\`\`
221
\`\`\`

**Output:**
\`\`\`
9
\`\`\`

**Explicatie:** $2^2 + 2^2 + 1^2 = 4 + 4 + 1 = 9$`,
    testCases: [
      { input: "221", output: "9", points: 50, isPublic: true },
      { input: "123", output: "14", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2264,
    title: "sumacifre2",
    slug: "sumacifre2",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2264/sumacifre2",
    description: `## Cerinta

Se citeste un numar natural cu exact 2 cifre. Calculeaza suma cifrelor sale.

## Date de intrare

Un numar natural cu exact 2 cifre ($10 \\leq n \\leq 99$).

## Date de iesire

Suma cifrelor lui $n$.

## Exemplu

**Input:**
\`\`\`
75
\`\`\`

**Output:**
\`\`\`
12
\`\`\`

**Explicatie:** $7 + 5 = 12$`,
    testCases: [
      { input: "75", output: "12", points: 50, isPublic: true },
      { input: "11", output: "2", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 467,
    title: "Numar",
    slug: "numar-pb467",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/467/numar",
    description: `## Cerinta

Se da un numar natural cu 3 cifre. Calculeaza produsul dintre cifra unitatilor si cifra sutelor.

## Date de intrare

Un numar natural $n$ ($100 \\leq n \\leq 999$).

## Date de iesire

Produsul $P$ al cifrei unitatilor cu cifra sutelor.

## Exemplu

**Input:**
\`\`\`
745
\`\`\`

**Output:**
\`\`\`
35
\`\`\`

**Explicatie:** Cifra sutelor = 7, cifra unitatilor = 5, $P = 7 \\cdot 5 = 35$.`,
    testCases: [
      { input: "745", output: "35", points: 50, isPublic: true },
      { input: "213", output: "3", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 468,
    title: "Numar1",
    slug: "numar1-pb468",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/468/numar1",
    description: `## Cerinta

Se da un numar natural cu 3 cifre $n$. Calculeaza patratul numarului format din cifra sutelor si cifra unitatilor.

## Date de intrare

Un numar natural $n$ ($100 \\leq n \\leq 999$).

## Date de iesire

Patratul $P$ al numarului format din cifra sutelor si cifra unitatilor.

## Exemplu

**Input:**
\`\`\`
745
\`\`\`

**Output:**
\`\`\`
5625
\`\`\`

**Explicatie:** Din 745 extragem cifra sutelor (7) si unitatilor (5) → numarul 75. $75^2 = 5625$.`,
    testCases: [
      { input: "745", output: "5625", points: 50, isPublic: true },
      { input: "213", output: "169", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 209,
    title: "ElimCif",
    slug: "elimcif",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/209/elimcif",
    description: `## Cerinta

Se citeste un numar natural cu exact 3 cifre. Elimina cifra din mijloc (cifra zecilor) si afiseaza numarul ramas.

## Date de intrare

Un numar natural $n$ ($99 < n < 1000$).

## Date de iesire

Numarul $m$ obtinut prin eliminarea cifrei zecilor.

## Exemplu

**Input:**
\`\`\`
201
\`\`\`

**Output:**
\`\`\`
21
\`\`\`

**Explicatie:** Din 201 eliminam cifra zecilor (0) → ramane 21.`,
    testCases: [
      { input: "201", output: "21", points: 50, isPublic: true },
      { input: "745", output: "75", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2604,
    title: "schimbarecifre",
    slug: "schimbarecifre",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2604/schimbarecifre",
    description: `## Cerinta

Se citeste un numar natural cu 2 cifre $a$. Schimba intre ele cele 2 cifre si afiseaza patratul noului numar.

## Date de intrare

Un numar natural $a$ ($10 \\leq a \\leq 99$).

## Date de iesire

Patratul numarului obtinut prin inversarea cifrelor.

## Exemplu

**Input:**
\`\`\`
70
\`\`\`

**Output:**
\`\`\`
49
\`\`\`

**Explicatie:** 70 inversat → 07 = 7. $7^2 = 49$.`,
    testCases: [
      { input: "70", output: "49", points: 50, isPublic: true },
      { input: "12", output: "441", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3611,
    title: "sumacifperm",
    slug: "sumacifperm",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3611/sumacifperm",
    description: `## Cerinta

Se da un numar natural cu 3 cifre distincte $n$. Calculeaza suma tuturor numerelor de 3 cifre obtinute prin permutarea cifrelor lui $n$.

## Date de intrare

Un numar natural $n$ ($102 \\leq n \\leq 987$, cifrele sunt distincte).

## Date de iesire

Suma tuturor permutarilor cifrelor lui $n$.

## Exemplu

**Input:**
\`\`\`
123
\`\`\`

**Output:**
\`\`\`
1332
\`\`\`

**Explicatie:** Permutarile sunt 123, 132, 213, 231, 312, 321. Suma = 1332.`,
    testCases: [
      { input: "123", output: "1332", points: 50, isPublic: true },
      { input: "124", output: "1554", points: 50, isPublic: false },
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
