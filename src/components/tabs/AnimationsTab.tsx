
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const AnimationsTab = () => {
  const animations = [
    {
      id: 1,
      title: 'Sonic Spin Dash',
      description: 'Classic spin dash charging animation',
      type: 'Sprite Animation',
      duration: '2s loop'
    },
    {
      id: 2,
      title: 'Ring Collection',
      description: 'Sparkling ring collection effect',
      type: 'Particle Effect',
      duration: '1.5s'
    },
    {
      id: 3,
      title: 'Speed Boost',
      description: 'Blue streak speed lines animation',
      type: 'Motion Graphics',
      duration: '3s'
    },
    {
      id: 4,
      title: 'Chaos Emerald Glow',
      description: 'Mystical emerald power animation',
      type: 'Glow Effect',
      duration: '4s loop'
    }
  ];

  return (
    <div>
      <h2 className="sonic-text-gradient text-3xl font-bold mb-6 text-center">✨ Animation Studio</h2>
      
      <div className="mb-6 text-center">
        <Button className="sonic-gradient text-white mr-4 mb-2">
          🎬 Create Animation
        </Button>
        <Button variant="outline" className="border-sonic-blue text-sonic-blue mb-2">
          📚 Animation Tutorials
        </Button>
      </div>

      {/* Demo Animations Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-sonic-blue">🎪 Live Demos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 speed-ring flex items-center justify-center bg-sonic-blue text-white text-2xl">
              💫
            </div>
            <p className="text-sm text-gray-600">Spinning Ring</p>
          </Card>
          
          <Card className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 animate-bounce-sonic bg-sonic-electric rounded-full flex items-center justify-center text-white text-2xl">
              ⚡
            </div>
            <p className="text-sm text-gray-600">Speed Bounce</p>
          </Card>
          
          <Card className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-sonic-blue to-sonic-gold rounded-full flex items-center justify-center text-white text-2xl animate-pulse">
              💎
            </div>
            <p className="text-sm text-gray-600">Emerald Pulse</p>
          </Card>
        </div>
      </div>

      {/* Animation Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {animations.map((animation) => (
          <Card key={animation.id} className="tab-hover border-sonic-blue/30 hover:border-sonic-blue">
            <CardHeader>
              <div className="w-full h-32 bg-gradient-to-br from-sonic-blue/20 to-sonic-electric/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <span className="text-4xl animate-bounce-sonic">🎬</span>
                <div className="absolute top-2 right-2 text-xs bg-sonic-gold text-sonic-darkblue px-2 py-1 rounded">
                  {animation.duration}
                </div>
              </div>
              <CardTitle className="text-sonic-blue">{animation.title}</CardTitle>
              <CardDescription>{animation.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs bg-sonic-lightblue/20 px-2 py-1 rounded">
                  {animation.type}
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="sonic-gradient text-white flex-1">
                  ▶️ Preview
                </Button>
                <Button size="sm" variant="outline" className="border-sonic-blue text-sonic-blue">
                  📥 Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Animation Tools Section */}
      <div className="mt-8">
        <Card className="bg-gradient-to-r from-sonic-blue/10 to-sonic-electric/10">
          <CardHeader>
            <CardTitle className="text-sonic-blue text-center">🛠️ Animation Tools</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="border-sonic-blue text-sonic-blue">
                🎨 Sprite Editor
              </Button>
              <Button variant="outline" className="border-sonic-blue text-sonic-blue">
                ⏱️ Timeline Editor
              </Button>
              <Button variant="outline" className="border-sonic-blue text-sonic-blue">
                🎪 Effects Library
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
