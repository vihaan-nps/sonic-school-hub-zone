
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ChatTab = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Sonic', message: 'Hey everyone! Ready to juice and jam?', time: '10:30 AM' },
    { id: 2, user: 'Tails', message: 'Always ready for an adventure!', time: '10:32 AM' },
    { id: 3, user: 'Knuckles', message: 'Let\'s do this thing!', time: '10:35 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader>
        <CardTitle className="sonic-text-gradient text-2xl">💨 Sonic Chat Zone</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((msg) => (
            <div key={msg.id} className="p-3 rounded-lg bg-gradient-to-r from-sonic-lightblue/20 to-sonic-electric/20 border border-sonic-blue/30">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sonic-blue">{msg.user}</span>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
              <p className="text-gray-700">{msg.message}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message... Gotta go fast!"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="sonic-gradient text-white">
            Send 🚀
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
