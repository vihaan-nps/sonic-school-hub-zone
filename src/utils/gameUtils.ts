
export interface GameScore {
  player: string;
  score: number;
  timestamp: Date;
}

export const saveScore = (gameType: string, score: number, player: string = 'Anonymous') => {
  const scores = getHighScores(gameType);
  scores.push({ player, score, timestamp: new Date() });
  scores.sort((a, b) => b.score - a.score);
  scores.splice(10); // Keep only top 10
  localStorage.setItem(`sonic-${gameType}-scores`, JSON.stringify(scores));
};

export const getHighScores = (gameType: string): GameScore[] => {
  const stored = localStorage.getItem(`sonic-${gameType}-scores`);
  return stored ? JSON.parse(stored) : [];
};

export const generateRandomPosition = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const checkCollision = (
  obj1: { x: number; y: number; width: number; height: number },
  obj2: { x: number; y: number; width: number; height: number }
): boolean => {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
};
