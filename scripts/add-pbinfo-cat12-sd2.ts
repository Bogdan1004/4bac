import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 559,
    title: "5numere",
    slug: "5numere",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/559/5numere",
    description: `## Cerinta

Se dau 5 numere naturale distincte. Determina suma celor mai mari 3 dintre ele.

## Date de intrare

Cinci numere naturale distincte ($1 \\leq a_i \\leq 10000$).

## Date de iesire

Suma celor mai mari 3 numere.

## Exemplu

**Input:**
\`\`\`
1 5 2 3 100
\`\`\`

**Output:**
\`\`\`
108
\`\`\`

**Explicatie:** Cele mai mari 3 sunt 5, 100, 3 → 5+3+100=108.`,
    testCases: [
      { input: "1 5 2 3 100", output: "108", points: 50, isPublic: true },
      { input: "10 20 30 40 50", output: "120", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 9,
    title: "maxmin",
    slug: "maxmin",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/9/maxmin",
    description: `## Cerinta

Se dau 3 numere naturale. Calculeaza diferenta dintre cel mai mare si cel mai mic.

## Date de intrare

Trei numere naturale separate prin spatii (valori < $10^9$).

## Date de iesire

Diferenta dintre maxim si minim.

## Exemplu

**Input:**
\`\`\`
10 7 2
\`\`\`

**Output:**
\`\`\`
8
\`\`\``,
    testCases: [
      { input: "10 7 2", output: "8", points: 50, isPublic: true },
      { input: "5 5 5", output: "0", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 452,
    title: "cifimp",
    slug: "cifimp",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/452/cifimp",
    description: `## Cerinta

Se citeste un numar natural cu exact 3 cifre. Determina cate cifre impare are.

## Date de intrare

Un numar natural cu exact 3 cifre ($100 \\leq n \\leq 999$).

## Date de iesire

Numarul de cifre impare.

## Exemplu

**Input:**
\`\`\`
323
\`\`\`

**Output:**
\`\`\`
2
\`\`\``,
    testCases: [
      { input: "323", output: "2", points: 50, isPublic: true },
      { input: "246", output: "0", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 4861,
    title: "pal3",
    slug: "pal3",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4861/pal3",
    description: `## Cerinta

Verifica daca un numar natural de 3 cifre este palindrom (prima cifra = ultima cifra).

## Date de intrare

Un numar natural $n$ ($100 \\leq n \\leq 999$).

## Date de iesire

\`DA\` daca este palindrom, \`NU\` altfel.

## Exemple

**Input:**
\`\`\`
535
\`\`\`

**Output:**
\`\`\`
DA
\`\`\``,
    testCases: [
      { input: "535", output: "DA", points: 50, isPublic: true },
      { input: "123", output: "NU", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 4862,
    title: "2n",
    slug: "2n-pb4862",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4862/2n",
    description: `## Cerinta

Se da un numar natural cu exact 8 cifre $n$. Verifica daca primele 4 cifre sunt egale cu ultimele 4 cifre.

## Date de intrare

Un numar natural $n$ cu exact 8 cifre ($10000000 \\leq n \\leq 99999999$).

## Date de iesire

\`DA\` daca primele 4 cifre = ultimele 4 cifre, \`NU\` altfel.

## Exemple

**Input:**
\`\`\`
81278127
\`\`\`

**Output:**
\`\`\`
DA
\`\`\``,
    testCases: [
      { input: "81278127", output: "DA", points: 50, isPublic: true },
      { input: "12344321", output: "NU", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 4897,
    title: "Pal1234",
    slug: "pal1234",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4897/pal1234",
    description: `## Cerinta

Verifica daca un numar natural cu maxim 4 cifre este palindrom.

## Date de intrare

Un numar natural $n$ ($0 \\leq n \\leq 9999$).

## Date de iesire

\`DA\` daca este palindrom, \`NU\` altfel.

## Exemple

**Input:**
\`\`\`
5335
\`\`\`

**Output:**
\`\`\`
DA
\`\`\``,
    testCases: [
      { input: "5335", output: "DA", points: 50, isPublic: true },
      { input: "123", output: "NU", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3063,
    title: "luna",
    slug: "luna",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3063/luna",
    description: `## Cerinta

Se citeste un numar $n$ ($1 \\leq n \\leq 12$). Afiseaza numele lunii calendaristice corespunzatoare.

## Date de intrare

Un numar natural $n$ ($1 \\leq n \\leq 12$).

## Date de iesire

Numele lunii cu litere mici.

## Exemplu

**Input:**
\`\`\`
3
\`\`\`

**Output:**
\`\`\`
martie
\`\`\``,
    testCases: [
      { input: "3", output: "martie", points: 25, isPublic: true },
      { input: "12", output: "decembrie", points: 25, isPublic: false },
      { input: "1", output: "ianuarie", points: 25, isPublic: false },
      { input: "7", output: "iulie", points: 25, isPublic: false },
    ],
  },
  {
    pbinfoId: 3211,
    title: "Cumparaturi1",
    slug: "cumparaturi1",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3211/cumparaturi1",
    description: `## Cerinta

Gigel are $S$ lei si vrea sa cheltuiasca integral pe ciocolate ($c$ lei/buc) sau napolitane ($n$ lei/buc). Afiseaza ce poate cumpara.

## Date de intrare

Trei numere naturale $S$, $c$, $n$ ($1 \\leq S, c, n \\leq 10^9$).

## Date de iesire

\`CN\` (ambele), \`C\` (doar ciocolate), \`N\` (doar napolitane), \`nimic\`.

## Exemplu

**Input:**
\`\`\`
15 4 3
\`\`\`

**Output:**
\`\`\`
N
\`\`\``,
    testCases: [
      { input: "15 4 3", output: "N", points: 34, isPublic: true },
      { input: "12 4 3", output: "CN", points: 33, isPublic: false },
      { input: "7 4 3", output: "nimic", points: 33, isPublic: false },
    ],
  },
  {
    pbinfoId: 3212,
    title: "Cumparaturi2",
    slug: "cumparaturi2",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/3212/cumparaturi2",
    description: `## Cerinta

Gigel are $S$ lei. Poate cumpara o drona ($d$ lei), un robot ($r$ lei) sau o masina ($m$ lei), unde $d > r > m$. Afiseaza cel mai scump obiect pe care il poate cumpara.

## Date de intrare

Patru numere naturale $S$, $d$, $r$, $m$ ($1 \\leq m < r < d$, $1 \\leq S \\leq 10^9$).

## Date de iesire

\`drona\`, \`robot\`, \`masina\` sau \`nimic\`.

## Exemplu

**Input:**
\`\`\`
175 200 150 100
\`\`\`

**Output:**
\`\`\`
robot
\`\`\``,
    testCases: [
      { input: "175 200 150 100", output: "robot", points: 34, isPublic: true },
      { input: "250 200 150 100", output: "drona", points: 33, isPublic: false },
      { input: "50 200 150 100", output: "nimic", points: 33, isPublic: false },
    ],
  },
  {
    pbinfoId: 4898,
    title: "Stana",
    slug: "stana",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/4898/stana",
    description: `## Cerinta

Se distribuie $m$ oi la $n$ ciobani. Daca impartirea e egala afiseaza catul. Daca nu, afiseaza maximul si minimul de oi pe cioban. Daca $n > m$, afiseaza "Sunt prea multi ciobani".

## Date de intrare

Doua numere naturale $n$ (ciobani) si $m$ (oi) ($1 \\leq n, m \\leq 10^9$).

## Date de iesire

O valoare, doua valori, sau mesajul specificat.

## Exemple

**Input:**
\`\`\`
3 5
\`\`\`

**Output:**
\`\`\`
2 1
\`\`\``,
    testCases: [
      { input: "3 5", output: "2 1", points: 34, isPublic: true },
      { input: "4 20", output: "5", points: 33, isPublic: false },
      { input: "5 3", output: "Sunt prea multi ciobani", points: 33, isPublic: false },
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
