export function xpForLevel(level: number) {
  return level * 100;
}

export function levelFromXp(xp: number) {
  let level = 1;
  let remaining = xp;
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level++;
  }
  return level;
}

export function xpForProblem(difficulty: string, score: number, maxScore: number) {
  const base = { easy: 20, medium: 40, hard: 80 }[difficulty] ?? 20;
  return Math.round((base * score) / maxScore);
}

export function progressToNextLevel(xp: number) {
  let level = 1;
  let remaining = xp;
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level++;
  }
  return {
    level,
    current: remaining,
    needed: xpForLevel(level),
    percent: Math.round((remaining / xpForLevel(level)) * 100),
  };
}
