import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    title: "Suma a două numere",
    slug: "suma-doua-numere",
    difficulty: "easy",
    category: "math",
    grade: 9,
    chapter: "Algoritmi elementari",
    description: `## Cerinta

Citeste doua numere intregi **a** si **b** si afiseaza suma lor.

## Date de intrare

Pe prima linie se afla doua numere intregi $a$ si $b$ ($-10^9 \\leq a, b \\leq 10^9$).

## Date de iesire

Se afiseaza un singur numar intreg, suma $a + b$.

## Exemplu

**Input:**
\`\`\`
3 5
\`\`\`

**Output:**
\`\`\`
8
\`\`\``,
    testCases: [
      { input: "3 5", output: "8", points: 20, isPublic: true },
      { input: "-1 1", output: "0", points: 20, isPublic: true },
      { input: "1000000000 -1000000000", output: "0", points: 20, isPublic: false },
      { input: "0 0", output: "0", points: 20, isPublic: false },
      { input: "-500 300", output: "-200", points: 20, isPublic: false },
    ],
  },
  {
    title: "Numarul maxim din sir",
    slug: "maxim-sir",
    difficulty: "easy",
    category: "arrays",
    grade: 9,
    chapter: "Siruri unidimensionale",
    description: `## Cerinta

Se da un sir de **n** numere intregi. Gaseste si afiseaza valoarea maxima din sir.

## Date de intrare

- Prima linie: numarul $n$ ($1 \\leq n \\leq 100\\ 000$)
- A doua linie: $n$ numere intregi $a_i$ ($-10^9 \\leq a_i \\leq 10^9$)

## Date de iesire

Se afiseaza maximul din sir.

## Exemplu

**Input:**
\`\`\`
5
3 1 4 1 5
\`\`\`

**Output:**
\`\`\`
5
\`\`\``,
    testCases: [
      { input: "5\n3 1 4 1 5", output: "5", points: 20, isPublic: true },
      { input: "1\n42", output: "42", points: 20, isPublic: true },
      { input: "3\n-5 -2 -10", output: "-2", points: 20, isPublic: false },
      { input: "4\n0 0 0 0", output: "0", points: 20, isPublic: false },
      { input: "6\n100 200 150 300 250 50", output: "300", points: 20, isPublic: false },
    ],
  },
  {
    title: "Verificare numar palindrom",
    slug: "palindrom",
    difficulty: "easy",
    category: "strings",
    grade: 9,
    chapter: "Prelucrarea cifrelor",
    description: `## Cerinta

Un numar este **palindrom** daca se citeste la fel de la stanga la dreapta si de la dreapta la stanga (ex: 121, 1331).

Se da un numar intreg $n$. Verifica daca este palindrom.

## Date de intrare

Pe prima linie se afla un numar intreg pozitiv $n$ ($1 \\leq n \\leq 10^9$).

## Date de iesire

Afiseaza \`DA\` daca numarul este palindrom, \`NU\` altfel.

## Exemplu

**Input:**
\`\`\`
121
\`\`\`

**Output:**
\`\`\`
DA
\`\`\``,
    testCases: [
      { input: "121", output: "DA", points: 20, isPublic: true },
      { input: "123", output: "NU", points: 20, isPublic: true },
      { input: "1", output: "DA", points: 20, isPublic: false },
      { input: "1001", output: "DA", points: 20, isPublic: false },
      { input: "12321", output: "DA", points: 20, isPublic: false },
    ],
  },
  {
    title: "Cel mai mare divizor comun",
    slug: "cmmdc",
    difficulty: "medium",
    category: "math",
    grade: 9,
    chapter: "Algoritmi elementari",
    description: `## Cerinta

Calculeaza cel mai mare divizor comun (CMMDC) al doua numere naturale $a$ si $b$.

## Date de intrare

Pe prima linie se afla doua numere naturale $a$ si $b$ ($1 \\leq a, b \\leq 10^{18}$).

## Date de iesire

Se afiseaza CMMDC-ul celor doua numere.

## Exemplu

**Input:**
\`\`\`
12 8
\`\`\`

**Output:**
\`\`\`
4
\`\`\`

## Hint

Foloseste **algoritmul lui Euclid**: $\\text{cmmdc}(a, b) = \\text{cmmdc}(b, a \\mod b)$`,
    testCases: [
      { input: "12 8", output: "4", points: 20, isPublic: true },
      { input: "100 75", output: "25", points: 20, isPublic: true },
      { input: "7 13", output: "1", points: 20, isPublic: false },
      { input: "1000000000000000000 500000000000000000", output: "500000000000000000", points: 20, isPublic: false },
      { input: "36 48", output: "12", points: 20, isPublic: false },
    ],
  },
  {
    title: "Sortare prin selectie",
    slug: "sortare-selectie",
    difficulty: "medium",
    category: "sorting",
    grade: 10,
    chapter: "Metode de sortare",
    description: `## Cerinta

Implementeaza sortarea prin selectie si sorteaza un sir de $n$ numere in ordine crescatoare.

## Date de intrare

- Prima linie: $n$ ($1 \\leq n \\leq 1\\ 000$)
- A doua linie: $n$ numere intregi $a_i$ ($-10^6 \\leq a_i \\leq 10^6$)

## Date de iesire

Se afiseaza sirul sortat, elementele separate prin spatii.

## Exemplu

**Input:**
\`\`\`
5
64 25 12 22 11
\`\`\`

**Output:**
\`\`\`
11 12 22 25 64
\`\`\``,
    testCases: [
      { input: "5\n64 25 12 22 11", output: "11 12 22 25 64", points: 20, isPublic: true },
      { input: "3\n3 1 2", output: "1 2 3", points: 20, isPublic: true },
      { input: "1\n42", output: "42", points: 20, isPublic: false },
      { input: "4\n-3 -1 -4 -2", output: "-4 -3 -2 -1", points: 20, isPublic: false },
      { input: "5\n5 4 3 2 1", output: "1 2 3 4 5", points: 20, isPublic: false },
    ],
  },
  {
    title: "Subsir de suma maxima (Kadane)",
    slug: "kadane",
    difficulty: "hard",
    category: "dp",
    grade: 11,
    chapter: "Programare dinamica",
    description: `## Cerinta

Se da un sir de $n$ numere intregi. Gaseste suma maxima a unui subsir **contiguu** nevid.

## Date de intrare

- Prima linie: $n$ ($1 \\leq n \\leq 100\\ 000$)
- A doua linie: $n$ numere intregi $a_i$ ($-10^4 \\leq a_i \\leq 10^4$)

## Date de iesire

Se afiseaza suma maxima.

## Exemplu

**Input:**
\`\`\`
9
-2 1 -3 4 -1 2 1 -5 4
\`\`\`

**Output:**
\`\`\`
6
\`\`\`

*Subsirul [4, -1, 2, 1] are suma 6.*`,
    testCases: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6", points: 20, isPublic: true },
      { input: "5\n1 2 3 4 5", output: "15", points: 20, isPublic: true },
      { input: "4\n-1 -2 -3 -4", output: "-1", points: 20, isPublic: false },
      { input: "1\n-5", output: "-5", points: 20, isPublic: false },
      { input: "8\n5 -3 5 -2 5 -3 5 -2", output: "15", points: 20, isPublic: false },
    ],
  },
];

async function main() {
  // Admin user
  const adminHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@4bac.ro" },
    update: {},
    create: {
      email: "admin@4bac.ro",
      name: "Admin",
      passwordHash: adminHash,
      role: "admin",
      xp: 9999,
      level: 10,
    },
  });

  // Demo student
  const studentHash = await bcrypt.hash("student123", 10);
  await prisma.user.upsert({
    where: { email: "student@4bac.ro" },
    update: {},
    create: {
      email: "student@4bac.ro",
      name: "Elev Demo",
      passwordHash: studentHash,
      xp: 120,
      level: 2,
      streak: 3,
    },
  });

  // Problems
  for (const p of problems) {
    const existing = await prisma.problem.findUnique({ where: { slug: p.slug } });
    if (existing) {
      console.log(`Skip existing: ${p.title}`);
      continue;
    }

    const problem = await prisma.problem.create({
      data: {
        title: p.title,
        slug: p.slug,
        description: p.description,
        difficulty: p.difficulty,
        category: p.category,
        grade: (p as { grade?: number }).grade ?? 9,
        chapter: (p as { chapter?: string }).chapter ?? "",
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

    console.log(`Created: ${p.title}`);
  }

  // Badges
  const badges = [
    { name: "Prima problema", description: "Ai rezolvat prima problema!", icon: "🎯", condition: '{"solved":1}' },
    { name: "Pe val", description: "5 probleme rezolvate", icon: "🌊", condition: '{"solved":5}' },
    { name: "Maratonist", description: "Streak de 7 zile", icon: "🔥", condition: '{"streak":7}' },
    { name: "Matematician", description: "3 probleme de matematica", icon: "🔢", condition: '{"category":"math","count":3}' },
    { name: "Perfectionist", description: "100% la o problema hard", icon: "💎", condition: '{"perfect":true,"difficulty":"hard"}' },
  ];

  for (const b of badges) {
    await prisma.badge.upsert({
      where: { name: b.name },
      update: {},
      create: b,
    });
  }

  console.log("Seed complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
