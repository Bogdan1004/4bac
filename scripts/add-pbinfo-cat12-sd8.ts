import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 4899,
    title: "minn3",
    slug: "minn3",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4899/minn3",
    description: `## Cerinta

Se dau doua numere naturale cu exact 3 cifre fiecare. Afiseaza 3 numere: (1) cel mai mic numar format din cifrele sutelor; (2) similar pentru zeci; (3) similar pentru unitati.

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
38 47 12
\`\`\``,
    testCases: [
      { input: "342 871", output: "38 47 12", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 4338,
    title: "MinMaxSumIF",
    slug: "minmaxsumif",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4338/minmaxsumif",
    description: `## Cerinta

Se dau doua numere naturale $a$ si $b$ cu cel putin 2 cifre fiecare. Daca au aceeasi cifra a zecilor: afiseaza suma lor. Altfel: afiseaza numarul cu cifra zecilor mai mare.

## Date de intrare

Doua numere naturale $a$ si $b$ ($10 \\leq a, b \\leq 10^9$).

## Date de iesire

Suma sau numarul cu cifra zecilor mai mare.

## Exemple

**Input:**
\`\`\`
123 912
\`\`\`

**Output:**
\`\`\`
123
\`\`\``,
    testCases: [
      { input: "123 912", output: "123", points: 50, isPublic: true },
      { input: "2023 27", output: "2050", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 4510,
    title: "paritate_9",
    slug: "paritate-9",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4510/paritate-9",
    description: `## Cerinta

Se dau doua numere naturale $n$ si $m$ cu exact 2 cifre. Daca au aceeasi paritate: afiseaza suma tuturor cifrelor. Altfel: afiseaza produsul tuturor cifrelor.

## Date de intrare

Doua numere naturale de 2 cifre ($10 \\leq n, m \\leq 99$).

## Date de iesire

Suma sau produsul cifrelor.

## Exemple

**Input:**
\`\`\`
32 80
\`\`\`

**Output:**
\`\`\`
13
\`\`\``,
    testCases: [
      { input: "32 80", output: "13", points: 50, isPublic: true },
      { input: "32 81", output: "48", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2606,
    title: "luniramase",
    slug: "luniramase",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/2606/luniramase",
    description: `## Cerinta

Se citeste un numar $l$ (1-11) reprezentand o luna. Afiseaza lunile ramase dupa aceasta in acel an, fiecare pe un rand, cu initiala mare.

## Date de intrare

Un numar natural $l$ ($1 \\leq l \\leq 11$).

## Date de iesire

Lunile ramase, fiecare pe o linie.

## Exemplu

**Input:**
\`\`\`
9
\`\`\`

**Output:**
\`\`\`
Octombrie
Noiembrie
Decembrie
\`\`\``,
    testCases: [
      { input: "9", output: "Octombrie\nNoiembrie\nDecembrie", points: 50, isPublic: true },
      { input: "11", output: "Decembrie", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 793,
    title: "SumProd",
    slug: "sumprod",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/793/sumprod",
    description: `## Cerinta

Se dau trei numere naturale $a$, $b$, $c$. Determina valoarea maxima obtinuta prin inmultirea a doua dintre ele si adunarea cu al treilea.

## Date de intrare

Trei numere naturale $a$, $b$, $c$ ($0 \\leq a, b, c \\leq 1000$).

## Date de iesire

Valoarea maxima.

## Exemplu

**Input:**
\`\`\`
3 2 4
\`\`\`

**Output:**
\`\`\`
14
\`\`\`

**Explicatie:** $\\max(3 \\cdot 4+2, 3 \\cdot 2+4, 2 \\cdot 4+3) = \\max(14, 10, 11) = 14$`,
    testCases: [
      { input: "3 2 4", output: "14", points: 50, isPublic: true },
      { input: "1 1 1", output: "2", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 4506,
    title: "SumProd1",
    slug: "sumprod1",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4506/sumprod1",
    description: `## Cerinta

Se dau trei numere intregi $a$, $b$, $c$. Determina valoarea maxima obtinuta prin inmultirea a doua dintre ele si adunarea cu al treilea.

## Date de intrare

Trei numere intregi $a$, $b$, $c$ ($-1000 \\leq a, b, c \\leq 1000$).

## Date de iesire

Valoarea maxima.

## Exemplu

**Input:**
\`\`\`
-3 2 4
\`\`\`

**Output:**
\`\`\`
5
\`\`\`

**Explicatie:** $\\max(2 \\cdot 4+(-3), (-3) \\cdot 2+4, (-3) \\cdot 4+2) = \\max(5, -2, -10) = 5$`,
    testCases: [
      { input: "-3 2 4", output: "5", points: 50, isPublic: true },
      { input: "3 2 4", output: "14", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 448,
    title: "ciford",
    slug: "ciford",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/448/ciford",
    description: `## Cerinta

Se citeste un numar natural de exact 3 cifre. Afiseaza cifrele in ordine crescatoare, separate prin spatiu.

## Date de intrare

Un numar natural de exact 3 cifre ($100 \\leq n \\leq 999$).

## Date de iesire

Cifrele in ordine crescatoare, separate prin spatiu.

## Exemplu

**Input:**
\`\`\`
101
\`\`\`

**Output:**
\`\`\`
0 1 1
\`\`\``,
    testCases: [
      { input: "101", output: "0 1 1", points: 50, isPublic: true },
      { input: "321", output: "1 2 3", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 453,
    title: "distincte1",
    slug: "distincte1",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/453/distincte1",
    description: `## Cerinta

Se dau trei numere naturale. Determina cate valori distincte apar.

## Date de intrare

Trei numere naturale ($0 \\leq a, b, c \\leq 10^9$).

## Date de iesire

Numarul de valori distincte.

## Exemplu

**Input:**
\`\`\`
100 41 100
\`\`\`

**Output:**
\`\`\`
2
\`\`\``,
    testCases: [
      { input: "100 41 100", output: "2", points: 34, isPublic: true },
      { input: "1 2 3", output: "3", points: 33, isPublic: false },
      { input: "5 5 5", output: "1", points: 33, isPublic: false },
    ],
  },
  {
    pbinfoId: 1740,
    title: "Suma_B_Numere",
    slug: "suma-b-numere",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/1740/suma-b-numere",
    description: `## Cerinta

Verifica daca numarul $a$ poate fi exprimat ca suma a $b$ numere naturale consecutive.

## Date de intrare

Doua numere naturale $a$ si $b$ ($1 \\leq a \\leq 10^8$, $1 \\leq b \\leq 25000$).

## Date de iesire

\`DA\` sau \`NU\`.

## Exemplu

**Input:**
\`\`\`
12 3
\`\`\`

**Output:**
\`\`\`
DA
\`\`\`

**Explicatie:** $12 = 3 + 4 + 5$.`,
    testCases: [
      { input: "12 3", output: "DA", points: 50, isPublic: true },
      { input: "10 4", output: "NU", points: 50, isPublic: false },
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
