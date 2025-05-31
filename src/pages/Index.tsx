
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { ChatTab } from '@/components/tabs/ChatTab';
import { GamesTab } from '@/components/tabs/GamesTab';
import { ArtTab } from '@/components/tabs/ArtTab';
import { ProjectsTab } from '@/components/tabs/ProjectsTab';
import { AnimationsTab } from '@/components/tabs/AnimationsTab';
import { LoginTab } from '@/components/tabs/LoginTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chat');

  const renderTabContent = () => {
    switch (activeTab) {
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
        return <ChatTab />;
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

export default Index;
