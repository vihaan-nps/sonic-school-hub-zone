
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const ArtTab = () => {
  const artworks = [
    {
      id: 1,
      title: 'Sonic in Green Hill',
      artist: 'Miles',
      description: 'Classic Sonic running through loops!',
      type: 'Digital Art'
    },
    {
      id: 2,
      title: 'Chaos Emerald Collection',
      artist: 'Amy',
      description: 'All seven emeralds in rainbow colors',
      type: 'Pixel Art'
    },
    {
      id: 3,
      title: 'Super Sonic Transformation',
      artist: 'Shadow',
      description: 'Epic transformation sequence',
      type: 'Animation'
    },
    {
      id: 4,
      title: 'Tails Flying High',
      artist: 'Cream',
      description: 'Tails soaring through the clouds',
      type: 'Traditional Art'
    }
  ];

  return (
    <div>
      <h2 className="sonic-text-gradient text-3xl font-bold mb-6 text-center">🎨 Art Gallery</h2>
      
      <div className="mb-6 text-center">
        <Button className="sonic-gradient text-white mr-4 mb-2">
          🖌️ Upload Art
        </Button>
        <Button variant="outline" className="border-sonic-blue text-sonic-blue mb-2">
          📝 Submit Drawing
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((art) => (
          <Card key={art.id} className="tab-hover border-sonic-blue/30 hover:border-sonic-blue">
            <CardHeader>
              <div className="w-full h-32 bg-gradient-to-br from-sonic-lightblue to-sonic-electric rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
              <CardTitle className="text-sonic-blue text-lg">{art.title}</CardTitle>
              <CardDescription>by {art.artist}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">{art.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-sonic-gold/20 text-sonic-darkblue px-2 py-1 rounded">
                  {art.type}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="text-sonic-blue">
                    ❤️ Like
                  </Button>
                  <Button size="sm" variant="ghost" className="text-sonic-blue">
                    💬 Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Card className="inline-block p-6 bg-gradient-to-r from-sonic-blue/10 to-sonic-electric/10">
          <h3 className="text-xl font-bold mb-2 text-sonic-blue">🌟 Featured Artist of the Week</h3>
          <p className="text-gray-600">Submit your best Sonic artwork for a chance to be featured!</p>
          <Button className="mt-4 sonic-gradient text-white">
            Submit Now! ✨
          </Button>
        </Card>
      </div>
    </div>
  );
};
