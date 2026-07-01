import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 1625,
    title: "ec2",
    slug: "ec2",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/1625/ec2",
    description: `## Cerinta

Se dau coeficientii $a$, $b$, $c$ ai ecuatiei de gradul 2: $ax^2 + bx + c = 0$. Determina solutiile reale.

## Date de intrare

Trei numere intregi $a$, $b$, $c$ ($-100 \\leq a, b, c \\leq 100$, $a \\neq 0$).

## Date de iesire

Solutiile reale cu 2 zecimale, sau "Nu are solutii reale".

## Exemple

**Input:**
\`\`\`
1 -5 6
\`\`\`

**Output:**
\`\`\`
x1 = 3.00
x2 = 2.00
\`\`\``,
    testCases: [
      { input: "1 -5 6", output: "x1 = 3.00\nx2 = 2.00", points: 34, isPublic: true },
      { input: "1 -2 1", output: "x1 = x2 = 1.00", points: 33, isPublic: false },
      { input: "1 0 1", output: "Nu are solutii reale", points: 33, isPublic: false },
    ],
  },
  {
    pbinfoId: 1002,
    title: "Paginare",
    slug: "paginare",
    difficulty: "hard",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/1002/paginare",
    description: `## Cerinta

O carte are $n$ pagini numerotate de la 1 la $n$. Determina cate cifre sunt folosite in total pentru numerotare.

## Date de intrare

Un numar natural $n$ ($1 \\leq n \\leq 10^{18}$).

## Date de iesire

Numarul total de cifre folosite.

## Exemple

**Input:**
\`\`\`
12
\`\`\`

**Output:**
\`\`\`
15
\`\`\`

**Explicatie:** 1-9: 9 cifre, 10-12: 6 cifre. Total = 15.`,
    testCases: [
      { input: "12", output: "15", points: 50, isPublic: true },
      { input: "100", output: "192", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2908,
    title: "planta",
    slug: "planta",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Structura de decizie",
    sourceUrl: "https://www.pbinfo.ro/probleme/2908/planta",
    description: `## Cerinta

O planta creste $a$ cm pe zi si se ofileste $b$ cm pe noapte. Dupa cate zile atinge inaltimea de $h$ cm? (Daca inainte de sfarsitul noptii atinge $h$, se considera ziua respectiva.)

## Date de intrare

Trei numere naturale $a$, $b$, $h$ ($1 \\leq b < a \\leq 100$, $1 \\leq h \\leq 10^6$).

## Date de iesire

Numarul de zile.

## Exemple

**Input:**
\`\`\`
5 3 10
\`\`\`

**Output:**
\`\`\`
3
\`\`\`

**Explicatie:** Dupa ziua 1: 5 cm. Dupa noaptea 1: 2 cm. Dupa ziua 2: 7 cm. Dupa noaptea 2: 4 cm. Dupa ziua 3: 9... astept, $4+5=9$. Hmm, dupa ziua 3: 4+5=9 (inca nu 10). Dupa noaptea 3: 6. Dupa ziua 4: 11 >= 10.`,
    testCases: [
      { input: "5 3 10", output: "4", points: 50, isPublic: true },
      { input: "10 1 10", output: "1", points: 50, isPublic: false },
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
