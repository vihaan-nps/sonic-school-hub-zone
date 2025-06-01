
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { saveScore, getHighScores, generateRandomPosition } from '@/utils/gameUtils';

interface Ring {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

export const RingCollector = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [rings, setRings] = useState<Ring[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const ringIdRef = useRef(0);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    setRings([]);
    ringIdRef.current = 0;
    spawnRing();
  };

  const spawnRing = () => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const newRing: Ring = {
        id: ringIdRef.current++,
        x: generateRandomPosition(rect.width - 40),
        y: generateRandomPosition(rect.height - 40),
        collected: false
      };
      setRings(prev => [...prev, newRing]);
    }
  };

  const collectRing = (ringId: number) => {
    setRings(prev => prev.filter(ring => ring.id !== ringId));
    setScore(prev => prev + 100);
    spawnRing();
  };

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            saveScore('ring-collector', score);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const ringSpawner = setInterval(() => {
        if (Math.random() < 0.3) {
          spawnRing();
        }
      }, 1500);

      return () => {
        clearInterval(timer);
        clearInterval(ringSpawner);
      };
    }
  }, [gameState, score]);

  const highScores = getHighScores('ring-collector');

  if (gameState === 'menu') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="sonic-text-gradient text-3xl">💍 Ring Collector</CardTitle>
          <p className="text-gray-600">Collect as many rings as possible in 30 seconds!</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Button onClick={startGame} className="sonic-gradient text-white text-lg px-8 py-3">
              Start Collecting! ⚡
            </Button>
          </div>
          <div className="bg-sonic-lightblue/10 p-4 rounded-lg">
            <h4 className="font-bold mb-2">How to Play:</h4>
            <p className="text-sm">• Click or tap the golden rings to collect them</p>
            <p className="text-sm">• Each ring is worth 100 points</p>
            <p className="text-sm">• Collect as many as you can before time runs out!</p>
          </div>
          {highScores.length > 0 && (
            <div className="bg-sonic-electric/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">🏆 High Scores:</h4>
              {highScores.slice(0, 5).map((score, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{score.player}</span>
                  <span>{score.score}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-sonic-blue text-3xl">Time's Up!</CardTitle>
          <p className="text-xl">Final Score: {score}</p>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <Button onClick={startGame} className="sonic-gradient text-white mr-4">
            Play Again ⚡
          </Button>
          <Button onClick={() => setGameState('menu')} variant="outline">
            Back to Menu
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between mb-4">
          <div className="text-xl font-bold">Score: {score}</div>
          <div className="text-xl font-bold text-sonic-red">Time: {timeLeft}s</div>
        </div>
        
        <div 
          ref={gameAreaRef}
          className="relative w-full h-96 bg-gradient-to-br from-sonic-lightblue to-sonic-electric rounded-lg overflow-hidden cursor-pointer"
        >
          {rings.map(ring => (
            <div
              key={ring.id}
              className="absolute w-10 h-10 bg-sonic-gold rounded-full flex items-center justify-center text-white font-bold cursor-pointer animate-pulse hover:scale-110 transition-transform"
              style={{ left: `${ring.x}px`, top: `${ring.y}px` }}
              onClick={() => collectRing(ring.id)}
            >
              💍
            </div>
          ))}
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-white/20 text-6xl font-bold">CLICK THE RINGS!</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
