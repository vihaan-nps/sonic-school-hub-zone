
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SonicSpeedRun } from './SonicSpeedRun';
import { RingCollector } from './RingCollector';
import { ChaosEmeraldHunt } from './ChaosEmeraldHunt';
import { SonicQuiz } from './SonicQuiz';

type GameType = 'speedrun' | 'rings' | 'emeralds' | 'quiz' | null;

export const GameLauncher = () => {
  const [activeGame, setActiveGame] = useState<GameType>(null);

  const games = [
    {
      id: 'speedrun' as GameType,
      title: 'Sonic Speed Run',
      description: 'Jump over obstacles and run as far as you can!',
      icon: '🏃‍♂️',
      difficulty: 'Easy',
      component: <SonicSpeedRun />
    },
    {
      id: 'rings' as GameType,
      title: 'Ring Collector',
      description: 'Collect as many rings as possible!',
      icon: '💍',
      difficulty: 'Medium',
      component: <RingCollector />
    },
    {
      id: 'emeralds' as GameType,
      title: 'Chaos Emerald Hunt',
      description: 'Find pairs of matching Chaos Emeralds!',
      icon: '💎',
      difficulty: 'Hard',
      component: <ChaosEmeraldHunt />
    },
    {
      id: 'quiz' as GameType,
      title: 'Sonic Quiz',
      description: 'Test your Sonic knowledge!',
      icon: '🧠',
      difficulty: 'Medium',
      component: <SonicQuiz />
    }
  ];

  if (activeGame) {
    const game = games.find(g => g.id === activeGame);
    return (
      <div>
        <div className="mb-4">
          <Button 
            onClick={() => setActiveGame(null)} 
            variant="outline"
            className="mb-4"
          >
            ← Back to Game Selection
          </Button>
        </div>
        {game?.component}
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="sonic-text-gradient text-4xl font-bold mb-4">🎮 Game Arcade</h2>
        <p className="text-xl text-gray-600">Choose your Sonic adventure!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Card key={game.id} className="tab-hover border-sonic-blue/30 hover:border-sonic-blue cursor-pointer">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">{game.icon}</div>
              <CardTitle className="text-sonic-blue text-xl">{game.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">{game.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm bg-sonic-lightblue/20 px-3 py-1 rounded-full">
                  {game.difficulty}
                </span>
                <span className="text-2xl">⚡</span>
              </div>
              <Button 
                onClick={() => setActiveGame(game.id)}
                className="w-full sonic-gradient text-white"
              >
                Play Now! 🚀
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card className="inline-block p-6 bg-gradient-to-r from-sonic-lightblue/20 to-sonic-electric/20">
          <h3 className="text-xl font-bold sonic-text-gradient mb-2">🏆 Challenge Mode Coming Soon!</h3>
          <p className="text-gray-600">Multiplayer tournaments, daily challenges, and more!</p>
        </Card>
      </div>
    </div>
  );
};
