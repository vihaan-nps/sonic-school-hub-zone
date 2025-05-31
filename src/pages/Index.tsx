
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { ChatTab } from '@/components/tabs/ChatTab';
import { GamesTab } from '@/components/tabs/GamesTab';
import { ArtTab } from '@/components/tabs/ArtTab';
import { ProjectsTab } from '@/components/tabs/ProjectsTab';
import { AnimationsTab } from '@/components/tabs/AnimationsTab';
import { LoginTab } from '@/components/tabs/LoginTab';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'chat':
        return <ChatTab />;
      case 'games':
        return <GamesTab />;
      case 'art':
        return <ArtTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'animations':
        return <AnimationsTab />;
      case 'login':
        return <LoginTab />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4">
            <span className="sonic-text-gradient">SONIC</span>
            <span className="text-sonic-gold"> ZONE</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Gotta go fast with your school friends! 💨
          </p>
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="speed-ring w-8 h-8 bg-sonic-gold"></div>
            <div className="speed-ring w-6 h-6 bg-sonic-blue" style={{ animationDelay: '0.2s' }}></div>
            <div className="speed-ring w-4 h-4 bg-sonic-electric" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <span>Powered by</span>
            <span className="speed-ring w-4 h-4 bg-sonic-blue"></span>
            <span className="sonic-text-gradient font-bold">Sonic Speed</span>
            <span>⚡</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <Card className="relative overflow-hidden sonic-gradient">
        <CardContent className="p-12 text-center text-white">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="/lovable-uploads/769d78fa-c90a-42f6-a398-c286d8e8e437.png" 
              alt="Sonic collage" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-6">Welcome to the Sonic Zone!</h2>
            <p className="text-xl mb-8 opacity-90">
              The ultimate hangout spot for Sonic fans and school friends. 
              Chat, play games, share art, and explore together!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => setActiveTab('chat')} 
                className="bg-white text-sonic-blue hover:bg-gray-100"
              >
                💬 Start Chatting
              </Button>
              <Button 
                onClick={() => setActiveTab('games')} 
                className="bg-sonic-gold text-white hover:bg-yellow-500"
              >
                🎮 Play Games
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Games Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="tab-hover overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600 relative">
            <img 
              src="/lovable-uploads/48693bec-7099-4740-bbb0-8937878906a3.png" 
              alt="Sonic gameplay" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">Classic Sonic</h3>
              <p className="text-sm opacity-90">Retro gameplay at its finest</p>
            </div>
          </div>
        </Card>

        <Card className="tab-hover overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-blue-600 to-cyan-600 relative">
            <img 
              src="/lovable-uploads/708e8066-0127-4725-8906-7e4433204d33.png" 
              alt="Modern Sonic" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">Modern Adventure</h3>
              <p className="text-sm opacity-90">High-speed modern gaming</p>
            </div>
          </div>
        </Card>

        <Card className="tab-hover overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-green-600 to-blue-600 relative">
            <img 
              src="/lovable-uploads/eab89be5-62e4-4e5f-8d19-29c6d5969c39.png" 
              alt="Green Hill Zone" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">Green Hill Zone</h3>
              <p className="text-sm opacity-90">The iconic first level</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Art Gallery Preview */}
      <Card className="overflow-hidden">
        <CardContent className="p-8">
          <h3 className="text-3xl font-bold text-center mb-8 sonic-text-gradient">
            🎨 Community Art Gallery
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-lg overflow-hidden tab-hover">
              <img 
                src="/lovable-uploads/352d3d18-907f-4170-a845-467b6f391dd7.png" 
                alt="Sonic artwork" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold">Sonic in the Night</p>
                <p className="text-sm opacity-90">By Community Artist</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden tab-hover">
              <img 
                src="/lovable-uploads/3026bfc7-5721-4fdb-9a57-1cc82126a173.png" 
                alt="Robotnik artwork" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold">Dr. Robotnik's Machine</p>
                <p className="text-sm opacity-90">By Community Artist</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <Button 
              onClick={() => setActiveTab('art')} 
              className="sonic-gradient text-white"
            >
              View Full Gallery 🖼️
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-6 tab-hover">
          <div className="text-3xl font-bold text-sonic-blue">42</div>
          <div className="text-gray-600">Active Users</div>
        </Card>
        <Card className="text-center p-6 tab-hover">
          <div className="text-3xl font-bold text-sonic-electric">127</div>
          <div className="text-gray-600">Messages Today</div>
        </Card>
        <Card className="text-center p-6 tab-hover">
          <div className="text-3xl font-bold text-sonic-gold">8</div>
          <div className="text-gray-600">Games Available</div>
        </Card>
        <Card className="text-center p-6 tab-hover">
          <div className="text-3xl font-bold text-sonic-red">∞</div>
          <div className="text-gray-600">Fun Level</div>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="text-center p-8 bg-gradient-to-r from-sonic-lightblue/20 to-sonic-electric/20">
        <h3 className="text-2xl font-bold mb-4 sonic-text-gradient">Ready to Join the Adventure?</h3>
        <p className="text-gray-600 mb-6">
          Connect with your school friends, share your creativity, and experience the speed of Sonic!
        </p>
        <Button 
          onClick={() => setActiveTab('login')} 
          className="sonic-gradient text-white text-lg px-8 py-3"
        >
          Get Started Now! ⚡
        </Button>
      </Card>
    </div>
  );
};

export default Index;
