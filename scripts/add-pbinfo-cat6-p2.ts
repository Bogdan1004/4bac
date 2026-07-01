import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 814,
    title: "triplul",
    slug: "triplul",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/814/triplul",
    description: `## Cerinta

Se dau doua numere naturale $x$ si $y$. Determina ce valoare, adunata la $x$, produce triplul lui $y$.

## Date de intrare

Doua numere naturale $x$ si $y$ ($1 \\leq x, y \\leq 100.000.000$).

## Date de iesire

Se afiseaza valoarea $v$ astfel incat $v + x = 3 \\cdot y$.

## Exemplu

**Input:**
\`\`\`
5 12
\`\`\`

**Output:**
\`\`\`
31
\`\`\`

**Explicatie:** $31 + 5 = 36 = 3 \\cdot 12$`,
    testCases: [
      { input: "5 12", output: "31", points: 50, isPublic: true },
      { input: "10 5", output: "5", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3210,
    title: "Cumparaturi",
    slug: "cumparaturi",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3210/cumparaturi",
    description: `## Cerinta

Gigel are $S$ lei si vrea sa cumpere cutii cu bomboane, fiecare costand $B$ lei. Determina cate cutii poate cumpara si cati lei ii mai lipsesc pentru a cumpara inca o cutie.

## Date de intrare

Doua numere naturale $B$ si $S$ ($1 \\leq B, S \\leq 1.000.000.000$).

## Date de iesire

Doua numere: $C$ (cutiile cumparate) si $P$ (banii necesari pentru inca o cutie).

## Exemplu

**Input:**
\`\`\`
4 9
\`\`\`

**Output:**
\`\`\`
2 3
\`\`\`

**Explicatie:** Cu 9 lei cumpara 2 cutii (8 lei), raman 1 leu. Pentru a 3-a cutie mai are nevoie de 3 lei.`,
    testCases: [
      { input: "4 9", output: "2 3", points: 50, isPublic: true },
      { input: "5 10", output: "2 0", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3978,
    title: "sabc",
    slug: "sabc",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3978/sabc",
    description: `## Cerinta

Se dau trei numere naturale $a$, $b$, $c$ cu $a \\leq b \\leq c$. Calculati:
- suma numerelor de la $a$ la $b$
- suma numerelor de la $b$ la $c$
- suma numerelor de la $a$ la $c$

## Date de intrare

Trei numere naturale $a$, $b$, $c$ ($1 \\leq a \\leq b \\leq c \\leq 10.000$).

## Date de iesire

Trei sume separate prin spatii.

## Exemplu

**Input:**
\`\`\`
3 10 20
\`\`\`

**Output:**
\`\`\`
52 165 207
\`\`\``,
    testCases: [
      { input: "3 10 20", output: "52 165 207", points: 50, isPublic: true },
      { input: "1 2 3", output: "3 5 6", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3180,
    title: "Marte1",
    slug: "marte1",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3180/marte1",
    description: `## Cerinta

Pe planeta Marte exista 3 tipuri de monede cu valorile $a$, $b$, $c$ lei martieni. Marțianul Iggle detine $n$ monede de tipul 1, $m$ de tipul 2 si $p$ de tipul 3. Calculati suma totala.

## Date de intrare

- Prima linie: $a$, $b$, $c$ (valorile monedelor, $1 \\leq a,b,c \\leq 1000$)
- A doua linie: $n$, $m$, $p$ (cantitatile, $1 \\leq n,m,p \\leq 10000$)

## Date de iesire

Suma totala de lei martieni.

## Exemplu

**Input:**
\`\`\`
2 3 7
4 2 2
\`\`\`

**Output:**
\`\`\`
28
\`\`\`

**Explicatie:** $4 \\cdot 2 + 2 \\cdot 3 + 2 \\cdot 7 = 8 + 6 + 14 = 28$`,
    testCases: [
      { input: "2 3 7\n4 2 2", output: "28", points: 50, isPublic: true },
      { input: "1 1 1\n1 1 1", output: "3", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3182,
    title: "Marte2",
    slug: "marte2",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3182/marte2",
    description: `## Cerinta

Pe planeta Marte un an martian dureaza $z$ zile. Marțianul Iggle a trait $n$ zile. Cate lumanari va avea tortul lui Iggle (cati ani martieni a implinit)?

## Date de intrare

Doua numere naturale $z$ si $n$ ($1 \\leq z \\leq 1.000$, $1 \\leq n \\leq 1.000.000.000$).

## Date de iesire

Numarul de ani martieni impliniti.

## Exemplu

**Input:**
\`\`\`
7 56
\`\`\`

**Output:**
\`\`\`
8
\`\`\`

**Explicatie:** $56 \\div 7 = 8$ ani`,
    testCases: [
      { input: "7 56", output: "8", points: 50, isPublic: true },
      { input: "365 730", output: "2", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3181,
    title: "Marte3",
    slug: "marte3",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3181/marte3",
    description: `## Cerinta

Pe planeta Marte un an dureaza $x$ zile, iar o zi dureaza $y$ ore. In fiecare ora lui Iggle ii creste o antena. Dupa cat timp va avea $n$ antene?

## Date de intrare

Trei numere naturale $x$, $y$, $n$ ($1 \\leq x,y \\leq 1.000$, $1 \\leq n \\leq 1.000.000.000$).

## Date de iesire

Trei numere pe linii separate: $a$ (ani), $z$ (zile), $h$ (ore).

## Exemplu

**Input:**
\`\`\`
5 3 100
\`\`\`

**Output:**
\`\`\`
6
3
1
\`\`\`

**Explicatie:** Un an = $5 \\cdot 3 = 15$ ore. $100 = 6 \\cdot 15 + 10$, $10 = 3 \\cdot 3 + 1$.`,
    testCases: [
      { input: "5 3 100", output: "6\n3\n1", points: 50, isPublic: true },
      { input: "2 2 8", output: "2\n0\n0", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 815,
    title: "Lazi",
    slug: "lazi",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/815/lazi",
    description: `## Cerinta

Cate cutii cubice de latura $l$ pot fi suprapuse intr-o incapere de inaltime $h$?

## Date de intrare

Doua numere naturale $l$ si $h$ ($1 \\leq l, h \\leq 1.000.000$).

## Date de iesire

Numarul maxim de cutii care pot fi suprapuse.

## Exemplu

**Input:**
\`\`\`
2 7
\`\`\`

**Output:**
\`\`\`
3
\`\`\`

**Explicatie:** $\\lfloor 7 / 2 \\rfloor = 3$ cutii`,
    testCases: [
      { input: "2 7", output: "3", points: 50, isPublic: true },
      { input: "3 9", output: "3", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 175,
    title: "picioare",
    slug: "picioare",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/175/picioare",
    description: `## Cerinta

Intr-o curte sunt $G$ gaini si $O$ oi. Determina numarul total de capete si numarul total de picioare.

## Date de intrare

Doua numere naturale $G$ si $O$ ($0 < G, O < 1.000.000$).

## Date de iesire

Doua numere: $C$ (capete) si $P$ (picioare), separate prin spatiu.

## Exemplu

**Input:**
\`\`\`
3 2
\`\`\`

**Output:**
\`\`\`
5 14
\`\`\`

**Explicatie:** $3 + 2 = 5$ capete; $3 \\cdot 2 + 2 \\cdot 4 = 14$ picioare`,
    testCases: [
      { input: "3 2", output: "5 14", points: 50, isPublic: true },
      { input: "1 1", output: "2 6", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2061,
    title: "Tren Japonez",
    slug: "tren-japonez",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2061/tren-japonez",
    description: `## Cerinta

Un tren are $n$ vagoane si transporta $m$ unitati de marfa distribuite egal. Calculati incarcatura din fiecare vagon.

## Date de intrare

Doua numere naturale $n$ si $m$ ($1 \\leq n \\leq m \\leq 1.000.000$, $m \\% n = 0$).

## Date de iesire

Incarcatura pe vagon.

## Exemplu

**Input:**
\`\`\`
3 6
\`\`\`

**Output:**
\`\`\`
2
\`\`\``,
    testCases: [
      { input: "3 6", output: "2", points: 50, isPublic: true },
      { input: "4 20", output: "5", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2201,
    title: "Salut",
    slug: "salut-pbinfo",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2201/salut",
    description: `## Cerinta

Intr-un grup de $n$ prieteni, fiecare persoana da mana cu toate celelalte. Cate strangeri de mana au loc?

## Date de intrare

Un numar intreg $n$ ($1 \\leq n \\leq 1.000.000.000$).

## Date de iesire

Numarul total de strangeri de mana.

## Exemplu

**Input:**
\`\`\`
3
\`\`\`

**Output:**
\`\`\`
3
\`\`\`

**Explicatie:** $C(3,2) = \\frac{3 \\cdot 2}{2} = 3$`,
    testCases: [
      { input: "3", output: "3", points: 50, isPublic: true },
      { input: "4", output: "6", points: 50, isPublic: false },
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
