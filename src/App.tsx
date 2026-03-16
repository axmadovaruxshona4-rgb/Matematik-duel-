import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, Play, RotateCcw, Info, Pause, SkipForward, Users, CheckCircle2, XCircle } from 'lucide-react';
import { questions, Question } from './data/questions';
import MathDisplay from './components/MathDisplay';
import MathBackground from './components/MathBackground';
import { cn } from './lib/utils';

type GamePhase = 'home' | 'difficulty' | 'playing' | 'gameOver' | 'rules';
type Difficulty = 'oson' | 'o\'rta' | 'qiyin';

interface GroupState {
  name: string;
  score: number;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
}

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('home');
  const [difficulty, setDifficulty] = useState<Difficulty>('oson');
  const [group1, setGroup1] = useState<GroupState>({ name: '1-Guruh', score: 0, selectedAnswer: null, isCorrect: null });
  const [group2, setGroup2] = useState<GroupState>({ name: '2-Guruh', score: 0, selectedAnswer: null, isCorrect: null });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [timer, setTimer] = useState(45);
  const [isPaused, setIsPaused] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const playSound = (type: 'correct' | 'wrong' | 'click') => {
    console.log(`Playing ${type} sound`);
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const startGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    const filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);
    const shuffled = shuffleArray(filteredQuestions).map(q => {
      const originalCorrectOption = q.options[q.correctIndex];
      const shuffledOptions = shuffleArray([...q.options]);
      return {
        ...q,
        options: shuffledOptions,
        correctIndex: shuffledOptions.indexOf(originalCorrectOption)
      };
    }).slice(0, 15);

    setGameQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setGroup1(prev => ({ ...prev, score: 0, selectedAnswer: null, isCorrect: null }));
    setGroup2(prev => ({ ...prev, score: 0, selectedAnswer: null, isCorrect: null }));
    setTimer(45);
    setShowResult(false);
    setIsPaused(false);
    setPhase('playing');
  };

  const checkAnswers = useCallback(() => {
    if (showResult) return;
    
    const currentQ = gameQuestions[currentQuestionIndex];
    const g1Correct = group1.selectedAnswer === currentQ.correctIndex;
    const g2Correct = group2.selectedAnswer === currentQ.correctIndex;

    setGroup1(prev => ({
      ...prev,
      isCorrect: prev.selectedAnswer !== null ? g1Correct : null,
      score: prev.selectedAnswer !== null ? (g1Correct ? prev.score + 5 : prev.score - 5) : prev.score
    }));

    setGroup2(prev => ({
      ...prev,
      isCorrect: prev.selectedAnswer !== null ? g2Correct : null,
      score: prev.selectedAnswer !== null ? (g2Correct ? prev.score + 5 : prev.score - 5) : prev.score
    }));

    if (g1Correct || g2Correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      playSound('correct');
    } else {
      playSound('wrong');
    }

    setShowResult(true);
    setIsPaused(true);
  }, [gameQuestions, currentQuestionIndex, group1.selectedAnswer, group2.selectedAnswer, showResult]);

  useEffect(() => {
    if (phase === 'playing' && !isPaused && timer > 0 && !showResult) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && !showResult) {
      checkAnswers();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, isPaused, timer, showResult, checkAnswers]);

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < gameQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimer(45);
      setGroup1(prev => ({ ...prev, selectedAnswer: null, isCorrect: null }));
      setGroup2(prev => ({ ...prev, selectedAnswer: null, isCorrect: null }));
      setShowResult(false);
      setIsPaused(false);
    } else {
      setPhase('gameOver');
    }
  };

  const handleSelect = (groupNum: 1 | 2, index: number) => {
    if (showResult || isPaused) return;
    playSound('click');
    if (groupNum === 1) {
      setGroup1(prev => ({ ...prev, selectedAnswer: index }));
    } else {
      setGroup2(prev => ({ ...prev, selectedAnswer: index }));
    }
  };

  const resetGame = () => {
    setPhase('home');
    setGroup1({ name: '1-Guruh', score: 0, selectedAnswer: null, isCorrect: null });
    setGroup2({ name: '2-Guruh', score: 0, selectedAnswer: null, isCorrect: null });
  };

  return (
    <div className="min-h-screen text-slate-50 font-sans selection:bg-emerald-500/30">
      <MathBackground />
      
      <AnimatePresence mode="wait">
        {phase === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                MATEMATIK DUEL
              </h1>
              <p className="text-xl text-slate-400 mt-2 font-medium">Bilimlar Bellashuvi</p>
            </motion.div>

            <div className="w-full max-w-2xl bg-slate-900/80 p-10 rounded-3xl border border-slate-800 backdrop-blur-2xl shadow-2xl">
              <div className="flex justify-center mb-6">
                <div className="bg-emerald-500/10 text-emerald-400 px-4 py-1 rounded-full text-sm font-bold border border-emerald-500/20 uppercase tracking-widest">
                  Multiplayer Rejimi
                </div>
              </div>
              
              <div className="space-y-6 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">1-Guruh Nomi</label>
                    <input 
                      type="text" 
                      value={group1.name}
                      onChange={(e) => setGroup1(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-lg font-bold"
                      placeholder="Guruh 1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">2-Guruh Nomi</label>
                    <input 
                      type="text" 
                      value={group2.name}
                      onChange={(e) => setGroup2(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-lg font-bold"
                      placeholder="Guruh 2"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-4">
                <button 
                  onClick={() => setPhase('difficulty')}
                  className="group relative flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-5 rounded-2xl transition-all active:scale-95 overflow-hidden"
                >
                  <Play size={24} fill="currentColor" />
                  <span className="text-xl">O‘yinni boshlash</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPhase('rules')}
                    className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-4 rounded-2xl transition-all"
                  >
                    <Info size={20} />
                    <span>Qoidalar</span>
                  </button>
                  <button 
                    onClick={resetGame}
                    className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-4 rounded-2xl transition-all"
                  >
                    <RotateCcw size={20} />
                    <span>Qayta boshlash</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'difficulty' && (
          <motion.div 
            key="difficulty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center min-h-screen p-6"
          >
            <div className="w-full max-w-md bg-slate-900/80 p-10 rounded-3xl border border-slate-800 backdrop-blur-2xl shadow-2xl text-center">
              <h2 className="text-3xl font-bold mb-8">Qiyinlik darajasini tanlang</h2>
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => startGame('oson')}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-bold py-5 rounded-2xl transition-all text-xl"
                >
                  Oson
                </button>
                <button 
                  onClick={() => startGame('o\'rta')}
                  className="bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 font-bold py-5 rounded-2xl transition-all text-xl"
                >
                  O‘rta
                </button>
                <button 
                  onClick={() => startGame('qiyin')}
                  className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/50 text-rose-400 font-bold py-5 rounded-2xl transition-all text-xl"
                >
                  Qiyin
                </button>
              </div>
              <button 
                onClick={() => setPhase('home')}
                className="mt-8 text-slate-500 hover:text-slate-300 transition-colors font-medium"
              >
                Orqaga qaytish
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'rules' && (
          <motion.div 
            key="rules"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center min-h-screen p-6"
          >
            <div className="w-full max-w-2xl bg-slate-900/80 p-10 rounded-3xl border border-slate-800 backdrop-blur-2xl shadow-2xl">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Info className="text-emerald-400" />
                O‘yin Qoidalari
              </h2>
              <ul className="space-y-4 text-lg text-slate-300">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">1</span>
                  Har bir savol uchun 45 sekund vaqt beriladi.
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">2</span>
                  To‘g‘ri javob uchun +5 ball, noto‘g‘ri javob uchun -5 ball.
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</span>
                  Ikkala guruh ham bir vaqtning o‘zida javob tanlashi mumkin.
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">4</span>
                  O‘yin 15 ta savoldan iborat bo‘ladi.
                </li>
              </ul>
              <button 
                onClick={() => setPhase('home')}
                className="mt-10 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-2xl transition-all"
              >
                Tushunarli
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'playing' && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col min-h-screen"
          >
            {/* Scoreboard */}
            <div className="fixed top-0 left-0 right-0 p-4 z-50">
              <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 items-center">
                <div className={cn(
                  "bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl border-l-4 border-emerald-500 transition-all shadow-lg",
                  group1.selectedAnswer !== null && !showResult && "ring-2 ring-emerald-500/50"
                )}>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{group1.name}</p>
                  <p className="text-2xl font-black text-emerald-400">{group1.score} <span className="text-sm font-normal text-slate-500">ball</span></p>
                </div>

                <div className="flex flex-col items-center justify-center gap-1">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center border-4 text-2xl font-black shadow-xl transition-all",
                    timer <= 10 ? "border-rose-500 text-rose-500 animate-pulse" : "border-emerald-500 text-emerald-500"
                  )}>
                    {timer}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Savol {currentQuestionIndex + 1}/15</p>
                </div>

                <div className={cn(
                  "bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl border-r-4 border-cyan-500 text-right transition-all shadow-lg",
                  group2.selectedAnswer !== null && !showResult && "ring-2 ring-cyan-500/50"
                )}>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{group2.name}</p>
                  <p className="text-2xl font-black text-cyan-400">{group2.score} <span className="text-sm font-normal text-slate-500">ball</span></p>
                </div>
              </div>
            </div>

            {/* Main Game Area */}
            <div className="flex-grow flex flex-col items-center justify-center p-6 pt-32 pb-24">
              <div className="w-full max-w-5xl space-y-8">
                {/* Question Card */}
                <motion.div 
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-900/60 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-slate-800 text-center shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                    <motion.div 
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 45, ease: "linear" }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                  <div className="mb-4 inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                    {gameQuestions[currentQuestionIndex].category}
                  </div>
                  <div className="text-4xl md:text-6xl font-medium text-white">
                    <MathDisplay formula={gameQuestions[currentQuestionIndex].text} displayMode />
                  </div>
                </motion.div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gameQuestions[currentQuestionIndex].options.map((option, idx) => {
                    const isCorrect = idx === gameQuestions[currentQuestionIndex].correctIndex;
                    const g1Selected = group1.selectedAnswer === idx;
                    const g2Selected = group2.selectedAnswer === idx;

                    return (
                      <div key={idx} className="relative group">
                        {/* Group 1 Selection Indicator */}
                        <div className={cn(
                          "absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center transition-all duration-300 z-10 shadow-lg",
                          g1Selected ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        )}>
                          <Users size={16} className="text-slate-950" />
                        </div>

                        {/* Group 2 Selection Indicator */}
                        <div className={cn(
                          "absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center transition-all duration-300 z-10 shadow-lg",
                          g2Selected ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        )}>
                          <Users size={16} className="text-slate-950" />
                        </div>

                        <button
                          onClick={() => {/* Handled by split screen logic or simple click */}}
                          className="w-full h-full"
                        >
                          <div className="flex h-full">
                            {/* Left side for Group 1 */}
                            <div 
                              onClick={(e) => { e.stopPropagation(); handleSelect(1, idx); }}
                              className={cn(
                                "flex-1 p-6 rounded-l-2xl border-y border-l transition-all flex items-center justify-center text-xl md:text-2xl font-medium cursor-pointer",
                                !showResult ? (
                                  g1Selected 
                                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" 
                                    : "bg-slate-900/40 border-slate-800 hover:bg-slate-800/60"
                                ) : (
                                  isCorrect 
                                    ? "bg-emerald-500 border-emerald-400 text-slate-950" 
                                    : g1Selected ? "bg-rose-500/20 border-rose-500 text-rose-500" : "bg-slate-900/40 border-slate-800 opacity-50"
                                )
                              )}
                            >
                              <MathDisplay formula={option} />
                            </div>
                            
                            {/* Right side for Group 2 */}
                            <div 
                              onClick={(e) => { e.stopPropagation(); handleSelect(2, idx); }}
                              className={cn(
                                "flex-1 p-6 rounded-r-2xl border-y border-r transition-all flex items-center justify-center text-xl md:text-2xl font-medium cursor-pointer",
                                !showResult ? (
                                  g2Selected 
                                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" 
                                    : "bg-slate-900/40 border-slate-800 hover:bg-slate-800/60"
                                ) : (
                                  isCorrect 
                                    ? "bg-emerald-500 border-emerald-400 text-slate-950" 
                                    : g2Selected ? "bg-rose-500/20 border-rose-500 text-rose-500" : "bg-slate-900/40 border-slate-800 opacity-50"
                                )
                              )}
                            >
                              <MathDisplay formula={option} />
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 to-transparent">
              <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all"
                  >
                    {isPaused ? <Play size={24} /> : <Pause size={24} />}
                  </button>
                  <button 
                    onClick={resetGame}
                    className="p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all"
                  >
                    <RotateCcw size={24} />
                  </button>
                </div>

                <div className="text-slate-500 font-bold uppercase tracking-widest">
                  Savol: {currentQuestionIndex + 1} / {gameQuestions.length}
                </div>

                <button 
                  onClick={showResult ? nextQuestion : checkAnswers}
                  className={cn(
                    "flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-xl",
                    showResult ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400" : "bg-slate-800 text-white hover:bg-slate-700"
                  )}
                >
                  {showResult ? (
                    <>
                      <span>Keyingi savol</span>
                      <SkipForward size={20} />
                    </>
                  ) : (
                    <span>Tekshirish</span>
                  )}
                </button>
              </div>
            </div>

            {/* Feedback Overlay */}
            <AnimatePresence>
              {showResult && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="fixed inset-0 pointer-events-none flex items-center justify-center z-40"
                >
                  <div className="flex gap-20">
                    {group1.selectedAnswer !== null && (
                      <div className={cn(
                        "p-8 rounded-full bg-slate-900/90 border-4 shadow-2xl flex items-center justify-center",
                        group1.isCorrect ? "border-emerald-500 text-emerald-500" : "border-rose-500 text-rose-500"
                      )}>
                        {group1.isCorrect ? <CheckCircle2 size={80} /> : <XCircle size={80} />}
                      </div>
                    )}
                    {group2.selectedAnswer !== null && (
                      <div className={cn(
                        "p-8 rounded-full bg-slate-900/90 border-4 shadow-2xl flex items-center justify-center",
                        group2.isCorrect ? "border-emerald-500 text-emerald-500" : "border-rose-500 text-rose-500"
                      )}>
                        {group2.isCorrect ? <CheckCircle2 size={80} /> : <XCircle size={80} />}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase === 'gameOver' && (
          <motion.div 
            key="gameOver"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
          >
            <div className="w-full max-w-3xl bg-slate-900/80 p-12 rounded-[3rem] border border-slate-800 backdrop-blur-2xl shadow-2xl relative">
              <Trophy size={80} className="text-yellow-400 mx-auto mb-6" />
              <h2 className="text-5xl font-black mb-2">O‘yin Tugadi!</h2>
              <p className="text-slate-400 text-xl mb-12">Natijalar e‘lon qilinmoqda...</p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className={cn(
                  "p-8 rounded-3xl border-2 transition-all",
                  group1.score > group2.score ? "bg-emerald-500/10 border-emerald-500" : "bg-slate-800/50 border-slate-700"
                )}>
                  {group1.score > group2.score && <div className="text-4xl mb-2">👑</div>}
                  <h3 className="text-2xl font-bold mb-1">{group1.name}</h3>
                  <p className="text-4xl font-black text-emerald-400">{group1.score}</p>
                  <p className="text-sm text-slate-500 uppercase tracking-widest mt-2">Ball</p>
                </div>

                <div className={cn(
                  "p-8 rounded-3xl border-2 transition-all",
                  group2.score > group1.score ? "bg-cyan-500/10 border-cyan-500" : "bg-slate-800/50 border-slate-700"
                )}>
                  {group2.score > group1.score && <div className="text-4xl mb-2">👑</div>}
                  <h3 className="text-2xl font-bold mb-1">{group2.name}</h3>
                  <p className="text-4xl font-black text-cyan-400">{group2.score}</p>
                  <p className="text-sm text-slate-500 uppercase tracking-widest mt-2">Ball</p>
                </div>
              </div>

              <div className="mb-12 p-6 bg-slate-800/50 rounded-2xl italic text-slate-300">
                {group1.score === group2.score ? (
                  "Do‘stlik g‘alaba qozondi! 🤝"
                ) : (
                  <>
                    G‘olib: <span className="font-bold text-white">{group1.score > group2.score ? group1.name : group2.name}</span>!
                    <br />
                    <span className="text-sm mt-2 block opacity-60">
                      {group1.score > group2.score ? group2.name : group1.name} uchun: "Xonadan haydaldingiz 😄"
                    </span>
                  </>
                )}
              </div>

              <button 
                onClick={resetGame}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-5 rounded-2xl transition-all text-xl"
              >
                Asosiy sahifaga qaytish
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
