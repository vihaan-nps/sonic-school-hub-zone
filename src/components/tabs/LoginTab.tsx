
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const LoginTab = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const handleLogin = () => {
    if (username && password) {
      setCurrentUser(username);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setUsername('');
    setPassword('');
  };

  if (isLoggedIn) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="border-sonic-blue/30">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-sonic-blue to-sonic-electric rounded-full flex items-center justify-center">
              <span className="text-3xl">👋</span>
            </div>
            <CardTitle className="sonic-text-gradient text-2xl">Welcome back!</CardTitle>
            <CardDescription>Hey there, {currentUser}! Ready for some speed?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center bg-sonic-lightblue/10">
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-sm font-medium">Level 15</div>
                <div className="text-xs text-gray-600">Speed Runner</div>
              </Card>
              <Card className="p-4 text-center bg-sonic-electric/10">
                <div className="text-2xl mb-2">💎</div>
                <div className="text-sm font-medium">1,247</div>
                <div className="text-xs text-gray-600">Rings Collected</div>
              </Card>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Today's Activity</span>
                <span className="text-sonic-blue">8 projects viewed</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Messages</span>
                <span className="text-sonic-blue">3 new</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Art Uploads</span>
                <span className="text-sonic-blue">2 this week</span>
              </div>
            </div>

            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="w-full border-sonic-red text-sonic-red hover:bg-sonic-red hover:text-white"
            >
              🚪 Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-sonic-blue/30">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 speed-ring bg-sonic-blue flex items-center justify-center">
            <span className="text-3xl text-white">🔐</span>
          </div>
          <CardTitle className="sonic-text-gradient text-2xl">Join the Speed Zone!</CardTitle>
          <CardDescription>Log in to access all Sonic features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your speed name..."
              className="border-sonic-blue/30 focus:border-sonic-blue"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Super secret code..."
              className="border-sonic-blue/30 focus:border-sonic-blue"
            />
          </div>

          <Button 
            onClick={handleLogin} 
            className="w-full sonic-gradient text-white"
            disabled={!username || !password}
          >
            🚀 Login & Go Fast!
          </Button>

          <div className="text-center space-y-2">
            <Button variant="ghost" className="text-sonic-blue text-sm">
              Forgot your rings? Reset password
            </Button>
            <div className="text-sm text-gray-600">
              New to the zone?{' '}
              <Button variant="ghost" className="text-sonic-blue p-0 h-auto">
                Sign up here!
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-sonic-lightblue/10 rounded-lg">
            <h4 className="font-medium text-sonic-blue mb-2">🌟 Member Benefits:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Save your artwork and projects</li>
              <li>• Join multiplayer games</li>
              <li>• Access exclusive animations</li>
              <li>• Participate in tournaments</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
