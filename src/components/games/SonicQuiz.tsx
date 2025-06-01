
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { saveScore, getHighScores } from '@/utils/gameUtils';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is Sonic's top speed?",
    options: ["Speed of Sound", "Speed of Light", "Mach 1", "Supersonic"],
    correct: 0,
    explanation: "Sonic can run at the speed of sound, which is where his name comes from!"
  },
  {
    id: 2,
    question: "What color are Sonic's shoes?",
    options: ["Blue", "Red", "White", "Yellow"],
    correct: 1,
    explanation: "Sonic wears iconic red sneakers with white straps and a yellow buckle."
  },
  {
    id: 3,
    question: "Who is Sonic's two-tailed fox friend?",
    options: ["Knuckles", "Shadow", "Tails", "Amy"],
    correct: 2,
    explanation: "Miles 'Tails' Prower is Sonic's best friend and can fly with his twin tails!"
  },
  {
    id: 4,
    question: "What is the name of Sonic's nemesis?",
    options: ["Dr. Robotnik", "Metal Sonic", "Shadow", "Chaos"],
    correct: 0,
    explanation: "Dr. Ivo Robotnik, also known as Dr. Eggman, is Sonic's main villain."
  },
  {
    id: 5,
    question: "How many Chaos Emeralds are there?",
    options: ["5", "6", "7", "8"],
    correct: 2,
    explanation: "There are seven Chaos Emeralds that grant incredible power when collected!"
  }
];

export const SonicQuiz = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result' | 'gameOver'>('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const selectAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(prev => prev + 100);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      saveScore('sonic-quiz', score + (selectedAnswer === quizQuestions[currentQuestion].correct ? 100 : 0));
      setGameState('gameOver');
    }
  };

  const highScores = getHighScores('sonic-quiz');

  if (gameState === 'menu') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="sonic-text-gradient text-3xl">🧠 Sonic Quiz</CardTitle>
          <p className="text-gray-600">Test your knowledge about the Blue Blur!</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Button onClick={startGame} className="sonic-gradient text-white text-lg px-8 py-3">
              Start Quiz! ⚡
            </Button>
          </div>
          <div className="bg-sonic-lightblue/10 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Quiz Info:</h4>
            <p className="text-sm">• {quizQuestions.length} questions about Sonic</p>
            <p className="text-sm">• 100 points per correct answer</p>
            <p className="text-sm">• Learn fun facts along the way!</p>
          </div>
          {highScores.length > 0 && (
            <div className="bg-sonic-electric/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">🏆 High Scores:</h4>
              {highScores.slice(0, 5).map((score, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{score.player}</span>
                  <span>{score.score}/{quizQuestions.length * 100}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'gameOver') {
    const finalScore = score + (selectedAnswer === quizQuestions[currentQuestion]?.correct ? 100 : 0);
    const percentage = Math.round((finalScore / (quizQuestions.length * 100)) * 100);
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-sonic-blue text-3xl">Quiz Complete!</CardTitle>
          <p className="text-xl">Final Score: {finalScore}/{quizQuestions.length * 100}</p>
          <p className="text-lg text-gray-600">{percentage}% Correct</p>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="text-lg">
            {percentage >= 80 ? "🏆 Sonic Superfan!" : 
             percentage >= 60 ? "⚡ Speed Demon!" : 
             percentage >= 40 ? "🦔 Getting Faster!" : 
             "💙 Keep Learning!"}
          </div>
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

  const question = quizQuestions[currentQuestion];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Question {currentQuestion + 1}/{quizQuestions.length}</span>
          <span className="font-bold">Score: {score}</span>
        </div>
        <CardTitle className="text-xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === null ? "outline" : 
                      index === question.correct ? "default" :
                      selectedAnswer === index ? "destructive" : "outline"}
              className={`text-left justify-start p-4 h-auto ${
                selectedAnswer === null ? 'hover:bg-sonic-lightblue/20' :
                index === question.correct ? 'bg-green-500 hover:bg-green-600 text-white' :
                selectedAnswer === index ? 'bg-red-500 hover:bg-red-600 text-white' : ''
              }`}
              onClick={() => selectAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </Button>
          ))}
        </div>
        
        {showExplanation && (
          <div className="bg-sonic-lightblue/10 p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">
              {selectedAnswer === question.correct ? "✅ Correct!" : "❌ Incorrect"}
            </p>
            <p className="text-sm">{question.explanation}</p>
          </div>
        )}
        
        {showExplanation && (
          <div className="text-center">
            <Button onClick={nextQuestion} className="sonic-gradient text-white">
              {currentQuestion < quizQuestions.length - 1 ? "Next Question ➡️" : "View Results 🏁"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
