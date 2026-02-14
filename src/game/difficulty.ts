export function getDifficulty(score: number) {
  return {
    catSpeed: 220 + Math.min(score * 0.4, 80),
    enemySpeed: 220 + Math.min(score * 0.5, 100),
    catSpawnRate: Math.max(1.1 - score * 0.01, 0.5),
    enemySpawnRate: score >= 20 ? Math.max(4 - score * 0.02, 1.5) : null,
  }
}
