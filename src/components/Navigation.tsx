
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const tabs = [
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'games', label: 'Games', icon: '🎮' },
    { id: 'art', label: 'Art', icon: '🎨' },
    { id: 'projects', label: 'Projects', icon: '📋' },
    { id: 'animations', label: 'Animations', icon: '✨' },
    { id: 'login', label: 'Login', icon: '🔐' }
  ];

  return (
    <Card className="mb-6 p-4 sonic-gradient shadow-lg">
      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'secondary' : 'ghost'}
            className={`tab-hover ${
              activeTab === tab.id 
                ? 'bg-white text-sonic-blue shadow-md' 
                : 'text-white hover:bg-white/20'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-lg mr-2">{tab.icon}</span>
            {tab.label}
          </Button>
        ))}
      </div>
    </Card>
  );
};
