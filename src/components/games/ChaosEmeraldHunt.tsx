
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { saveScore, getHighScores } from '@/utils/gameUtils';

interface EmeraldCard {
  id: number;
  color: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emeraldPairs = [
  { color: 'blue', emoji: '💎' },
  { color: 'red', emoji: '🔴' },
  { color: 'green', emoji: '🟢' },
  { color: 'yellow', emoji: '🟡' },
  { color: 'purple', emoji: '🟣' },
  { color: 'cyan', emoji: '🔵' }
];

export const ChaosEmeraldHunt = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [cards, setCards] = useState<EmeraldCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const shuffleCards = () => {
    const shuffled = [...emeraldPairs, ...emeraldPairs]
      .map((pair, index) => ({
        id: index,
        color: pair.color,
        emoji: pair.emoji,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
  };

  const startGame = () => {
    setGameState('playing');
    setMatches(0);
    setMoves(0);
    setTimeLeft(60);
    setFlippedCards([]);
    shuffleCards();
  };

  const flipCard = (cardId: number) => {
    if (flippedCards.length >= 2 || flippedCards.includes(cardId)) return;
    
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      
      setTimeout(() => {
        const [first, second] = newFlipped;
        const firstCard = cards.find(c => c.id === first);
        const secondCard = cards.find(c => c.id === second);
        
        if (firstCard?.color === secondCard?.color) {
          setCards(prev => prev.map(card => 
            (card.id === first || card.id === second) 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(prev => prev + 1);
          
          if (matches + 1 === emeraldPairs.length) {
            const score = Math.max(1000 - (moves * 10) - ((60 - timeLeft) * 5), 100);
            saveScore('chaos-emerald', score);
            setGameState('gameOver');
          }
        } else {
          setCards(prev => prev.map(card => 
            (card.id === first || card.id === second) 
              ? { ...card, isFlipped: false }
              : card
          ));
        }
        
        setFlippedCards([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState]);

  const highScores = getHighScores('chaos-emerald');

  if (gameState === 'menu') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="sonic-text-gradient text-3xl">💎 Chaos Emerald Hunt</CardTitle>
          <p className="text-gray-600">Match pairs of Chaos Emeralds to collect them all!</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Button onClick={startGame} className="sonic-gradient text-white text-lg px-8 py-3">
              Start Hunt! ⚡
            </Button>
          </div>
          <div className="bg-sonic-lightblue/10 p-4 rounded-lg">
            <h4 className="font-bold mb-2">How to Play:</h4>
            <p className="text-sm">• Click cards to flip them over</p>
            <p className="text-sm">• Match pairs of same-colored emeralds</p>
            <p className="text-sm">• Find all pairs before time runs out!</p>
            <p className="text-sm">• Fewer moves = higher score</p>
          </div>
          {highScores.length > 0 && (
            <div className="bg-sonic-electric/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">🏆 High Scores:</h4>
              {highScores.slice(0, 5).map((score, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{score.player}</span>
                  <span>{score.score}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'gameOver') {
    const finalScore = matches === emeraldPairs.length 
      ? Math.max(1000 - (moves * 10) - ((60 - timeLeft) * 5), 100)
      : 0;
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className={`text-3xl ${matches === emeraldPairs.length ? 'text-sonic-blue' : 'text-sonic-red'}`}>
            {matches === emeraldPairs.length ? 'All Emeralds Found!' : 'Time\'s Up!'}
          </CardTitle>
          <p className="text-xl">Score: {finalScore}</p>
          <p className="text-gray-600">Matches: {matches}/{emeraldPairs.length} | Moves: {moves}</p>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <Button onClick={startGame} className="sonic-gradient text-white mr-4">
            Play Again ⚡
          </Button>
          <Button onClick={() => setGameState('menu')} variant="outline">
            Back to Menu
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between mb-4">
          <div className="text-lg font-bold">Matches: {matches}/{emeraldPairs.length}</div>
          <div className="text-lg font-bold">Moves: {moves}</div>
          <div className="text-lg font-bold text-sonic-red">Time: {timeLeft}s</div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {cards.map(card => (
            <div
              key={card.id}
              className={`aspect-square bg-gradient-to-br from-sonic-blue to-sonic-electric rounded-lg flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                card.isFlipped || card.isMatched ? 'bg-white' : ''
              }`}
              onClick={() => flipCard(card.id)}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '❓'}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
