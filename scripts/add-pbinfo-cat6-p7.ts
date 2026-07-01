import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.resolve(__dirname, "../dev.db")}`;
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const problems = [
  {
    pbinfoId: 176,
    title: "picioare1",
    slug: "picioare1",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/176/picioare1",
    description: `## Cerinta

Intr-o curte sunt gaini si oi. Se cunoaste numarul de capete $C$ si numarul de picioare $P$. Determina numarul de gaini $G$ si numarul de oi $O$.

## Date de intrare

Doua numere naturale $C$ (capete) si $P$ (picioare) ($0 < C, P < 1.000.000.000$).

## Date de iesire

Doua numere $G$ si $O$ separate prin spatiu.

## Exemplu

**Input:**
\`\`\`
5 14
\`\`\`

**Output:**
\`\`\`
3 2
\`\`\`

**Explicatie:** $G + O = 5$, $2G + 4O = 14$ → $O = (P - 2C)/2 = 2$, $G = 3$.`,
    testCases: [
      { input: "5 14", output: "3 2", points: 50, isPublic: true },
      { input: "10 30", output: "5 5", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2671,
    title: "EleviSiBanci",
    slug: "elevisibanci",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2671/elevisibanci",
    description: `## Cerinta

Intr-o clasa, daca elevii se aseaza cate $n$ pe banca, raman $e$ elevi in picioare. Daca se aseaza cate $m$ pe banca, raman $b$ banci goale. Determina numarul de elevi si de banci.

## Date de intrare

Patru numere naturale $n$, $m$, $e$, $b$ pe o singura linie.

## Date de iesire

Doua numere: numarul de elevi si numarul de banci.

## Exemplu

**Input:**
\`\`\`
2 3 5 5
\`\`\`

**Output:**
\`\`\`
45
20
\`\`\`

**Explicatie:** $B = (e + m \\cdot b)/(m - n) = 20$ banci, elevi $= n \\cdot B + e = 45$.`,
    testCases: [
      { input: "2 3 5 5", output: "45\n20", points: 100, isPublic: true },
    ],
  },
  {
    pbinfoId: 2501,
    title: "sum_cons_impare",
    slug: "sum-cons-impare",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2501/sum-cons-impare",
    description: `## Cerinta

Se citeste un numar natural impar $n$. Calculeaza suma $1 + 3 + 5 + \\ldots + n$.

## Date de intrare

Un numar natural impar $n$ (cel mult 8 cifre).

## Date de iesire

Valoarea sumei.

## Exemplu

**Input:**
\`\`\`
5
\`\`\`

**Output:**
\`\`\`
9
\`\`\`

**Explicatie:** $1 + 3 + 5 = 9$. Formula: $\\left(\\frac{n+1}{2}\\right)^2$.`,
    testCases: [
      { input: "5", output: "9", points: 50, isPublic: true },
      { input: "1", output: "1", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 173,
    title: "medie1",
    slug: "medie1",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/173/medie1",
    description: `## Cerinta

Se dau trei note $x$, $y$, $z$. Calculeaza media aritmetica cu exact 2 zecimale, fara rotunjire.

## Date de intrare

Trei numere naturale $x$, $y$, $z$ ($0 \\leq x, y, z \\leq 10$).

## Date de iesire

Media aritmetica cu 2 zecimale exacte.

## Exemple

**Input:**
\`\`\`
9 9 7
\`\`\`

**Output:**
\`\`\`
8.33
\`\`\``,
    testCases: [
      { input: "9 9 7", output: "8.33", points: 50, isPublic: true },
      { input: "9 8 7", output: "8.00", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 460,
    title: "Timp",
    slug: "timp-pb460",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/460/timp",
    description: `## Cerinta

Se da ora curenta $h_1:m_1$ si un numar de minute $x$. Determina ora $h_2:m_2$ dupa $x$ minute.

## Date de intrare

Trei numere: $h_1$, $m_1$, $x$ ($0 \\leq h_1 \\leq 23$, $0 \\leq m_1 \\leq 59$, $0 \\leq x \\leq 10000$).

## Date de iesire

Doua numere $h_2$ si $m_2$ separate prin spatiu.

## Exemplu

**Input:**
\`\`\`
7 11 90
\`\`\`

**Output:**
\`\`\`
8 41
\`\`\``,
    testCases: [
      { input: "7 11 90", output: "8 41", points: 50, isPublic: true },
      { input: "23 30 60", output: "0 30", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2199,
    title: "AfCar",
    slug: "afcar",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2199/afcar",
    description: `## Cerinta

Se citeste un caracter. Afiseaza codul sau ASCII.

## Date de intrare

Un caracter cu cod ASCII intre 33 si 126.

## Date de iesire

Codul ASCII al caracterului.

## Exemplu

**Input:**
\`\`\`
A
\`\`\`

**Output:**
\`\`\`
65
\`\`\``,
    testCases: [
      { input: "A", output: "65", points: 50, isPublic: true },
      { input: "a", output: "97", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 2200,
    title: "Uppercase",
    slug: "uppercase-pb2200",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/2200/uppercase",
    description: `## Cerinta

Se citeste o litera mica. Afiseaza litera mare corespunzatoare.

## Date de intrare

Un caracter litera mica ('a'...'z').

## Date de iesire

Litera mare corespunzatoare.

## Exemplu

**Input:**
\`\`\`
t
\`\`\`

**Output:**
\`\`\`
T
\`\`\``,
    testCases: [
      { input: "t", output: "T", points: 50, isPublic: true },
      { input: "z", output: "Z", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 461,
    title: "Timp1",
    slug: "timp1",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/461/timp1",
    description: `## Cerinta

Se da ora curenta $h_1:m_1$ si un interval $x$ ore si $y$ minute. Determina ora $h_2:m_2$ dupa acest interval.

## Date de intrare

Patru numere: $h_1$, $m_1$, $x$, $y$ ($0 \\leq h_1 \\leq 23$, $0 \\leq m_1, y \\leq 59$, $0 \\leq x \\leq 10000$).

## Date de iesire

Doua numere $h_2$ si $m_2$ separate prin spatiu.

## Exemplu

**Input:**
\`\`\`
7 11 5 34
\`\`\`

**Output:**
\`\`\`
12 45
\`\`\``,
    testCases: [
      { input: "7 11 5 34", output: "12 45", points: 50, isPublic: true },
      { input: "23 0 1 0", output: "0 0", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3135,
    title: "PatratMagic5",
    slug: "patratmagic5",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3135/patratmagic5",
    description: `## Cerinta

Se da $n$, latura unui patrat magic (care contine numerele de la 1 la $n^2$). Determina constanta magica (suma egala a fiecarei linii, coloane si diagonale).

## Date de intrare

Un numar natural $n$ ($3 \\leq n \\leq 1290$).

## Date de iesire

Constanta magica.

## Exemplu

**Input:**
\`\`\`
3
\`\`\`

**Output:**
\`\`\`
15
\`\`\`

**Formula:** $C = n \\cdot (n^2 + 1) / 2$`,
    testCases: [
      { input: "3", output: "15", points: 50, isPublic: true },
      { input: "4", output: "34", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 1807,
    title: "PoligonulConvex",
    slug: "poligonulconvex",
    difficulty: "medium",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/1807/poligonulconvex",
    description: `## Cerinta

Se da $n$, numarul de laturi ale unui poligon convex. Determina numarul de diagonale si suma masurilor unghiurilor (in grade).

## Date de intrare

Un numar natural $n$ (numarul de laturi).

## Date de iesire

Doua linii: numarul de diagonale, respectiv suma unghiurilor.

## Exemplu

**Input:**
\`\`\`
3
\`\`\`

**Output:**
\`\`\`
0
180
\`\`\`

**Formule:** Diagonale: $n(n-3)/2$. Suma unghiuri: $(n-2) \\cdot 180$.`,
    testCases: [
      { input: "3", output: "0\n180", points: 50, isPublic: true },
      { input: "6", output: "9\n720", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 3458,
    title: "sin_cos",
    slug: "sin-cos",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/3458/sin-cos",
    description: `## Cerinta

Se da un unghi $x$ in grade sexagesimale. Afiseaza $\\sin(x)$ si $\\cos(x)$ cu cel putin 3 zecimale.

## Date de intrare

Un numar natural $x$ ($1 \\leq x \\leq 180$).

## Date de iesire

$\\sin(x)$ si $\\cos(x)$ separate prin spatiu.

## Exemplu

**Input:**
\`\`\`
30
\`\`\`

**Output:**
\`\`\`
0.499 0.866
\`\`\`

**Nota:** Converteste gradele in radiani: $rad = x \\cdot \\pi / 180$.`,
    testCases: [
      { input: "30", output: "0.499 0.866", points: 50, isPublic: true },
      { input: "90", output: "1.000 0.000", points: 50, isPublic: false },
    ],
  },
  {
    pbinfoId: 1,
    title: "sum",
    slug: "sum-pb1",
    difficulty: "easy",
    category: "basic",
    grade: 9,
    chapter: "Operatori si expresii",
    sourceUrl: "https://www.pbinfo.ro/probleme/1/sum",
    description: `## Cerinta

Citeste doua numere intregi si afiseaza suma lor.

## Date de intrare

Doua numere intregi separate prin spatiu ($|a|, |b| < 1.000.000.000$).

## Date de iesire

Suma celor doua numere.

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
      { input: "-5 3", output: "-2", points: 50, isPublic: false },
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
