
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const GamesTab = () => {
  const games = [
    {
      id: 1,
      title: 'Sonic Speed Run',
      description: 'Race through Green Hill Zone!',
      difficulty: 'Easy',
      players: '1-4'
    },
    {
      id: 2,
      title: 'Ring Collector',
      description: 'Collect as many rings as possible!',
      difficulty: 'Medium',
      players: '1'
    },
    {
      id: 3,
      title: 'Chaos Emerald Hunt',
      description: 'Find all seven Chaos Emeralds!',
      difficulty: 'Hard',
      players: '1-2'
    },
    {
      id: 4,
      title: 'Sonic Quiz',
      description: 'Test your Sonic knowledge!',
      difficulty: 'Medium',
      players: '1+'
    }
  ];

  return (
    <div>
      <h2 className="sonic-text-gradient text-3xl font-bold mb-6 text-center">🎮 Game Zone</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Card key={game.id} className="tab-hover border-sonic-blue/30 hover:border-sonic-blue">
            <CardHeader>
              <CardTitle className="text-sonic-blue">{game.title}</CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm bg-sonic-lightblue/20 px-2 py-1 rounded">
                  {game.difficulty}
                </span>
                <span className="text-sm text-gray-600">👥 {game.players} players</span>
              </div>
              <Button className="w-full sonic-gradient text-white">
                Play Now! ⚡
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <div className="speed-ring w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl">💎</span>
        </div>
        <p className="text-gray-600">More games coming soon! Gotta go fast! 💨</p>
      </div>
    </div>
  );
};
