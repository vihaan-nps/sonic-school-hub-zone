
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { saveScore, getHighScores, checkCollision } from '@/utils/gameUtils';
import sonicSprite from '@/assets/sonic-run.png';
import spikeSprite from '@/assets/spike.png';
export const SonicSpeedRun = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [sonicY, setSonicY] = useState(300);
  const [obstacles, setObstacles] = useState<Array<{ x: number; y: number; id: number; width: number; height: number; type: 'spike' }>>([]);
  const [isJumping, setIsJumping] = useState(false);
  const gameLoopRef = useRef<number>();
  const obstacleIdRef = useRef(0);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setSonicY(300);
    setObstacles([]);
    setIsJumping(false);
    obstacleIdRef.current = 0;
  };

  const jump = () => {
    if (!isJumping && gameState === 'playing') {
      setIsJumping(true);
      setSonicY(200);
      setTimeout(() => {
        setSonicY(300);
        setIsJumping(false);
      }, 500);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isJumping, gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = window.setInterval(() => {
        setScore(prev => prev + 10);

        setObstacles(prev => {
          const updated = prev
            .map(obs => ({ ...obs, x: obs.x - 5 }))
            .filter(obs => obs.x > -50);

          // Add new obstacle randomly
          if (Math.random() < 0.03) {
            updated.push({
              x: 800,
              y: 320,
              id: obstacleIdRef.current++,
              width: 48,
              height: 48,
              type: 'spike'
            });
          }

          // Collision detection using bounding boxes
          const sonicRect = { x: 50, y: sonicY, width: 64, height: 64 };
          const collided = updated.some(obs =>
            checkCollision(sonicRect, { x: obs.x, y: obs.y, width: obs.width, height: obs.height })
          );

          if (collided) {
            setGameState('gameOver');
            saveScore('speedrun', score);
          }

          return updated;
        });
      }, 50);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, sonicY, score]);

  const highScores = getHighScores('speedrun');

  if (gameState === 'menu') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="sonic-text-gradient text-3xl">🏃‍♂️ Sonic Speed Run</CardTitle>
          <p className="text-gray-600">Jump over obstacles and run as far as you can!</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Button onClick={startGame} className="sonic-gradient text-white text-lg px-8 py-3">
              Start Running! ⚡
            </Button>
          </div>
          <div className="bg-sonic-lightblue/10 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Controls:</h4>
            <p className="text-sm">• Press SPACEBAR or tap to jump</p>
            <p className="text-sm">• Avoid the obstacles</p>
            <p className="text-sm">• Score points by running distance</p>
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
          <CardTitle className="text-sonic-red text-3xl">Game Over!</CardTitle>
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
          <div className="text-sm text-gray-600">Press SPACEBAR to jump</div>
        </div>
        
        <div 
          className="relative w-full h-96 bg-gradient-to-b from-blue-400 to-green-400 rounded-lg overflow-hidden cursor-pointer"
          onClick={jump}
        >
          {/* Sonic */}
          <img
            src={sonicSprite}
            alt="Sonic running sprite"
            className={`absolute w-16 h-16 select-none pointer-events-none transition-all duration-300 ${isJumping ? 'animate-bounce' : 'pulse'}`}
            style={{ left: '50px', top: `${sonicY}px` }}
            loading="eager"
          />
          
          {/* Obstacles */}
          {obstacles.map(obstacle => (
            <img
              key={obstacle.id}
              src={spikeSprite}
              alt="Spike obstacle"
              className="absolute select-none pointer-events-none"
              style={{ left: `${obstacle.x}px`, top: `${obstacle.y}px`, width: `${obstacle.width}px`, height: `${obstacle.height}px` }}
              loading="lazy"
            />
          ))}
          
          {/* Ground */}
          <div className="absolute bottom-0 w-full h-16 bg-green-600"></div>
        </div>
      </CardContent>
    </Card>
  );
};
