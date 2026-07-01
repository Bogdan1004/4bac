import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 939,
    title: "sum00",
    slug: "sum00",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/939/sum00",
    description: `## Cerinta

Citeste doua numere naturale **a** si **b** si afiseaza suma lor.

## Date de intrare

Pe prima linie se afla doua numere naturale $a$ si $b$ ($a, b < 1.000.000.000$).

## Date de iesire

Se afiseaza un singur numar natural, suma $a + b$.

## Exemplu

**Input:**
\`\`\`
12 23
\`\`\`

**Output:**
\`\`\`
35
\`\`\``,
    testCases: [
      { input: "12 23", output: "35", points: 50, isPublic: true },
      { input: "0 0", output: "0", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 941,
    title: "Urare",
    slug: "urare-pbinfo",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/941/urare",
    description: `## Cerinta

Afiseaza pe ecran o urare pentru cei dragi!

Orice urare va fi considerata corecta.

## Date de intrare

Nu se citesc date de intrare.

## Date de iesire

Se afiseaza pe ecran o urare.

## Exemplu

**Input:**
\`\`\`

\`\`\`

**Output:**
\`\`\`
Sarbatori fericite!
\`\`\``,
    testCases: [
      { input: "", output: "Sarbatori fericite!", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 1258,
    title: "scadere2",
    slug: "scadere2",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/1258/scadere2",
    description: `## Cerinta

Se dau doua numere naturale. Calculati diferenta lor.

## Date de intrare

Pe prima linie se afla doua numere naturale $a$ si $b$ ($a, b < 2.000.000.000$).

## Date de iesire

Se afiseaza diferenta $a - b$.

## Exemplu

**Input:**
\`\`\`
5 3
\`\`\`

**Output:**
\`\`\`
2
\`\`\``,
    testCases: [
      { input: "5 3", output: "2", points: 50, isPublic: true },
      { input: "1000000000 999999999", output: "1", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 1260,
    title: "asii",
    slug: "asii",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/1260/asii",
    description: `## Cerinta

Se citesc doua numere naturale. Afisati suma, diferenta, produsul si catul lor, in aceasta ordine, separate prin cate un spatiu.

## Date de intrare

Pe prima linie se afla doua numere naturale $a$ si $b$ ($a, b < 500$).

## Date de iesire

Se afiseaza pe aceeasi linie: $a+b$, $a-b$, $a \\cdot b$, $a \\div b$, separate prin spatii.

## Exemplu

**Input:**
\`\`\`
15 3
\`\`\`

**Output:**
\`\`\`
18 12 45 5
\`\`\``,
    testCases: [
      { input: "15 3", output: "18 12 45 5", points: 50, isPublic: true },
      { input: "10 2", output: "12 8 20 5", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 1273,
    title: "uciv",
    slug: "uciv",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/1273/uciv",
    description: `## Cerinta

Se dau doua numere naturale $x$ si $y$. Calculati ultima cifra a sumei lor.

## Date de intrare

Pe prima linie se afla doua numere naturale $x$ si $y$ ($1 \\leq x, y < 1.000.000$).

## Date de iesire

Se afiseaza ultima cifra a sumei $x + y$.

## Exemplu

**Input:**
\`\`\`
25 78
\`\`\`

**Output:**
\`\`\`
3
\`\`\`

**Explicatie:** $(25 + 78) \\% 10 = 103 \\% 10 = 3$`,
    testCases: [
      { input: "25 78", output: "3", points: 50, isPublic: true },
      { input: "5 5", output: "0", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 813,
    title: "Globuri",
    slug: "globuri",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/813/globuri",
    description: `## Cerinta

Intr-un brad sunt **a** globuri albe, de doua ori mai multe globuri rosii, iar globuri verzi cu 3 mai putine decat numarul de globuri rosii. Calculati numarul total de globuri din brad.

## Date de intrare

Pe prima linie se afla un numar natural $a$ ($2 \\leq a \\leq 1000$), numarul de globuri albe.

## Date de iesire

Se afiseaza numarul total de globuri.

## Exemplu

**Input:**
\`\`\`
7
\`\`\`

**Output:**
\`\`\`
32
\`\`\`

**Explicatie:** 7 albe + 14 rosii + 11 verzi = 32`,
    testCases: [
      { input: "7", output: "32", points: 50, isPublic: true },
      { input: "2", output: "11", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3178,
    title: "Copii2",
    slug: "copii2",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3178/copii2",
    description: `## Cerinta

Calculati numarul total de pagini citite de **F** fete si **B** baieti in **n** zile, stiind ca fiecare fata citeste 3 pagini/zi iar fiecare baiat citeste 2 pagini/zi.

## Date de intrare

Pe prima linie se afla trei numere naturale $F$, $B$, $n$ ($1 \\leq F, B, n \\leq 1000$).

## Date de iesire

Se afiseaza numarul total de pagini citite.

## Exemplu

**Input:**
\`\`\`
7 5 3
\`\`\`

**Output:**
\`\`\`
93
\`\`\`

**Explicatie:** $(7 \\cdot 3 + 5 \\cdot 2) \\cdot 3 = 31 \\cdot 3 = 93$`,
    testCases: [
      { input: "7 5 3", output: "93", points: 50, isPublic: true },
      { input: "1 1 1", output: "5", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2240,
    title: "Animale",
    slug: "animale",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2240/animale",
    description: `## Cerinta

Intr-o curte sunt **C** caini. Pisicile sunt de doua ori mai multe decat cainii, iar gainile sunt de doua ori mai multe decat pisicile. Calculati numarul total de animale din curte.

## Date de intrare

Pe prima linie se afla un numar natural $C$ ($2 \\leq C \\leq 1000$), numarul de caini.

## Date de iesire

Se afiseaza numarul total de animale.

## Exemplu

**Input:**
\`\`\`
3
\`\`\`

**Output:**
\`\`\`
21
\`\`\`

**Explicatie:** 3 caini + 6 pisici + 12 gaini = 21`,
    testCases: [
      { input: "3", output: "21", points: 50, isPublic: true },
      { input: "2", output: "14", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3179,
    title: "Parc2",
    slug: "parc2",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3179/parc2",
    description: `## Cerinta

Intr-un parc sunt **n** alei. Pe fiecare alee sunt **n** arbori. Fiecare arbore are **n** crengi. Pe fiecare creanga sunt **n** cuiburi. In fiecare cuib sunt **n** pasari. Cate pasari sunt in parc?

## Date de intrare

Pe prima linie se afla un numar natural $n$ ($1 \\leq n \\leq 50$).

## Date de iesire

Se afiseaza numarul total de pasari din parc.

## Exemplu

**Input:**
\`\`\`
3
\`\`\`

**Output:**
\`\`\`
243
\`\`\`

**Explicatie:** $3^5 = 243$`,
    testCases: [
      { input: "3", output: "243", points: 50, isPublic: true },
      { input: "2", output: "32", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2263,
    title: "Camioane",
    slug: "camioane",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2263/camioane",
    description: `## Cerinta

O firma dispune de doua tipuri de camioane. Tipul 1: **n** camioane, fiecare transporta **t1** tone/zi. Tipul 2: **m** camioane, fiecare transporta **t2** tone/zi. Calculati tonajul total transportat in **z** zile.

## Date de intrare

Pe prima linie se afla cinci numere naturale: $t1$, $t2$, $n$, $m$, $z$ unde:
- $2 \\leq t1, t2 \\leq 100$
- $2 \\leq n, m \\leq 100$
- $2 \\leq z \\leq 30$

## Date de iesire

Se afiseaza tonajul total transportat in $z$ zile.

## Exemplu

**Input:**
\`\`\`
3 5 4 2 5
\`\`\`

**Output:**
\`\`\`
110
\`\`\`

**Explicatie:** $(4 \\cdot 3 + 2 \\cdot 5) \\cdot 5 = 22 \\cdot 5 = 110$`,
    testCases: [
      { input: "3 5 4 2 5", output: "110", points: 50, isPublic: true },
      { input: "10 10 10 10 10", output: "2000", points: 50, isPublic: false },
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
