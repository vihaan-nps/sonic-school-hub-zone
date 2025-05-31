
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const GamesTab = () => {
  const games = [
    {
      id: 1,
      title: 'Sonic Speed Run',
      description: 'Race through Green Hill Zone!',
      difficulty: 'Easy',
      players: '1-4',
      image: '/lovable-uploads/dc10a630-9dd6-48fd-b3d5-ee3ce390fdb0.png'
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
      
      {/* Featured Game Banner */}
      <Card className="mb-8 overflow-hidden">
        <div className="relative h-64 bg-gradient-to-r from-sonic-blue to-sonic-electric">
          <img 
            src="/lovable-uploads/dc10a630-9dd6-48fd-b3d5-ee3ce390fdb0.png" 
            alt="Sonic vs Shadow Racing" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-3xl font-bold mb-2">🏁 Sonic vs Shadow Racing</h3>
            <p className="text-lg opacity-90 mb-4">The ultimate speed showdown!</p>
            <Button className="bg-sonic-gold text-sonic-darkblue hover:bg-yellow-500">
              Play Now! ⚡
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Card key={game.id} className="tab-hover border-sonic-blue/30 hover:border-sonic-blue">
            {game.image && (
              <div className="h-32 overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
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
