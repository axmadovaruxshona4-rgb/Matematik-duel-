import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, 'public')));

// Question Database (60 questions)
const questionPool = [
  // Hosila (Derivatives)
  { q: "d/dx (x²)", a: "2x", b: "x", c: "2", d: "x³", correct: 0 },
  { q: "d/dx (sin x)", a: "cos x", b: "-cos x", c: "sin x", d: "1", correct: 0 },
  { q: "d/dx (cos x)", a: "-sin x", b: "sin x", c: "cos x", d: "0", correct: 0 },
  { q: "d/dx (ln x)", a: "1/x", b: "x", c: "e^x", d: "ln(x²)", correct: 0 },
  { q: "d/dx (e^x)", a: "e^x", b: "xe^{x-1}", c: "ln x", d: "1", correct: 0 },
  { q: "d/dx (x³ + 2x)", a: "3x² + 2", b: "3x + 2", c: "x² + 2", d: "3x³", correct: 0 },
  { q: "d/dx (5x⁴)", a: "20x³", b: "5x³", c: "20x⁴", d: "x⁵", correct: 0 },
  { q: "d/dx (tan x)", a: "sec² x", b: "cos² x", c: "sin² x", d: "cot x", correct: 0 },
  { q: "d/dx (7)", a: "0", b: "7", c: "1", d: "x", correct: 0 },
  { q: "d/dx (√x)", a: "1/(2√x)", b: "2√x", c: "x^{1/2}", d: "1/x", correct: 0 },
  { q: "d/dx (x⁻¹)", a: "-x⁻²", b: "x⁻²", c: "ln x", d: "-1", correct: 0 },
  { q: "d/dx (log₁₀ x)", a: "1/(x ln 10)", b: "1/x", c: "ln 10 / x", d: "10/x", correct: 0 },
  { q: "d/dx (arcsin x)", a: "1/√(1-x²)", b: "1/(1+x²)", c: "cos x", d: "-1/√(1-x²)", correct: 0 },
  { q: "d/dx (arctan x)", a: "1/(1+x²)", b: "1/√(1-x²)", c: "sec² x", d: "1/x", correct: 0 },
  { q: "d/dx (3x² - 5x + 8)", a: "6x - 5", b: "3x - 5", c: "6x + 8", d: "x² - 5", correct: 0 },
  { q: "d/dx (sin(2x))", a: "2cos(2x)", b: "cos(2x)", c: "-2cos(2x)", d: "2sin(2x)", correct: 0 },
  { q: "d/dx (e^{2x})", a: "2e^{2x}", b: "e^{2x}", c: "2x e^{2x-1}", d: "ln(2x)", correct: 0 },
  { q: "d/dx (ln(x²))", a: "2/x", b: "1/x²", c: "2x", d: "ln(2x)", correct: 0 },
  { q: "d/dx (x ln x)", a: "ln x + 1", b: "ln x", c: "1", d: "x/x", correct: 0 },
  { q: "d/dx (sin² x)", a: "sin(2x)", b: "2sin x", c: "2cos x", d: "cos² x", correct: 0 },
  { q: "d/dx (x³ - 4x² + x)", a: "3x² - 8x + 1", b: "3x² - 4x + 1", c: "x² - 8x", d: "3x³ - 8x²", correct: 0 },
  { q: "d/dx (1/x²)", a: "-2/x³", b: "2/x³", c: "-1/x", d: "ln(x²)", correct: 0 },
  { q: "d/dx (cos(3x))", a: "-3sin(3x)", b: "3sin(3x)", c: "-sin(3x)", d: "cos(3x)", correct: 0 },
  { q: "d/dx (2^x)", a: "2^x ln 2", b: "x 2^{x-1}", c: "2^x", d: "ln 2", correct: 0 },
  { q: "d/dx (cot x)", a: "-csc² x", b: "sec² x", c: "tan x", d: "-sin² x", correct: 0 },
  { q: "d/dx (x² e^x)", a: "e^x(x² + 2x)", b: "2x e^x", c: "x² e^x", d: "e^x(x + 2)", correct: 0 },
  { q: "d/dx (ln(sin x))", a: "cot x", b: "tan x", c: "1/sin x", d: "cos x", correct: 0 },
  { q: "d/dx (√(x² + 1))", a: "x/√(x² + 1)", b: "1/√(x² + 1)", c: "2x", d: "x", correct: 0 },
  { q: "d/dx (x/(x+1))", a: "1/(x+1)²", b: "1/(x+1)", c: "x/(x+1)²", d: "0", correct: 0 },
  { q: "d/dx (sin(x²))", a: "2x cos(x²)", b: "cos(x²)", c: "2sin x", d: "-2x cos(x²)", correct: 0 },

  // Integral
  { q: "∫ x dx", a: "x²/2 + C", b: "x² + C", c: "1 + C", d: "x³/3 + C", correct: 0 },
  { q: "∫ sin x dx", a: "-cos x + C", b: "cos x + C", c: "sin x + C", d: "1 + C", correct: 0 },
  { q: "∫ cos x dx", a: "sin x + C", b: "-sin x + C", c: "cos x + C", d: "x + C", correct: 0 },
  { q: "∫ 1/x dx", a: "ln|x| + C", b: "e^x + C", c: "x + C", d: "-1/x² + C", correct: 0 },
  { q: "∫ e^x dx", a: "e^x + C", b: "ln x + C", c: "xe^x + C", d: "e^{x+1} + C", correct: 0 },
  { q: "∫ 3x² dx", a: "x³ + C", b: "3x³ + C", c: "6x + C", d: "x² + C", correct: 0 },
  { q: "∫ 5 dx", a: "5x + C", b: "5 + C", c: "x⁵ + C", d: "0 + C", correct: 0 },
  { q: "∫ x³ dx", a: "x⁴/4 + C", b: "x⁴ + C", c: "3x² + C", d: "x³/3 + C", correct: 0 },
  { q: "∫ sec² x dx", a: "tan x + C", b: "cot x + C", c: "sin x + C", d: "sec x + C", correct: 0 },
  { q: "∫ 1/√(1-x²) dx", a: "arcsin x + C", b: "arctan x + C", c: "ln x + C", d: "cos x + C", correct: 0 },
  { q: "∫ 1/(1+x²) dx", a: "arctan x + C", b: "arcsin x + C", c: "ln x + C", d: "tan x + C", correct: 0 },
  { q: "∫ (x + 1) dx", a: "x²/2 + x + C", b: "x² + x + C", c: "1 + C", d: "x + C", correct: 0 },
  { q: "∫ e^{2x} dx", a: "e^{2x}/2 + C", b: "2e^{2x} + C", c: "e^{2x} + C", d: "e^x + C", correct: 0 },
  { q: "∫ sin(2x) dx", a: "-cos(2x)/2 + C", b: "cos(2x)/2 + C", c: "-2cos(2x) + C", d: "sin x + C", correct: 0 },
  { q: "∫ 1/x² dx", a: "-1/x + C", b: "1/x + C", c: "ln(x²) + C", d: "-2/x³ + C", correct: 0 },
  { q: "∫ √x dx", a: "2/3 x^{3/2} + C", b: "x^{3/2} + C", c: "1/(2√x) + C", d: "x/2 + C", correct: 0 },
  { q: "∫ (2x - 3) dx", a: "x² - 3x + C", b: "2x² - 3x + C", c: "x² + C", d: "2 + C", correct: 0 },
  { q: "∫ 1/(x+1) dx", a: "ln|x+1| + C", b: "ln x + 1 + C", c: "e^{x+1} + C", d: "x + C", correct: 0 },
  { q: "∫ x e^{x²} dx", a: "e^{x²}/2 + C", b: "e^{x²} + C", c: "2e^{x²} + C", d: "x e^{x²} + C", correct: 0 },
  { q: "∫ tan x dx", a: "-ln|cos x| + C", b: "sec² x + C", c: "ln|sin x| + C", d: "tan² x / 2 + C", correct: 0 },
  { q: "∫ (3x² + 2x + 1) dx", a: "x³ + x² + x + C", b: "3x³ + 2x² + x + C", c: "6x + 2 + C", d: "x³ + x² + C", correct: 0 },
  { q: "∫ 4/x dx", a: "4ln|x| + C", b: "ln|4x| + C", c: "4/x² + C", d: "x⁴ + C", correct: 0 },
  { q: "∫ sin(x/2) dx", a: "-2cos(x/2) + C", b: "-cos(x/2)/2 + C", c: "2cos(x/2) + C", d: "sin(x/2) + C", correct: 0 },
  { q: "∫ (e^x + sin x) dx", a: "e^x - cos x + C", b: "e^x + cos x + C", c: "e^x + sin x + C", d: "ln x + cos x + C", correct: 0 },
  { q: "∫ x⁻² dx", a: "-x⁻¹ + C", b: "x⁻¹ + C", c: "-2x⁻³ + C", d: "ln|x| + C", correct: 0 },
  { q: "∫ 2^x dx", a: "2^x / ln 2 + C", b: "2^x ln 2 + C", c: "2^{x+1} + C", d: "x 2^{x-1} + C", correct: 0 },
  { q: "∫ (1 - x²) dx", a: "x - x³/3 + C", b: "x - x² + C", c: "-2x + C", d: "x³ + C", correct: 0 },
  { q: "∫ 1/cos² x dx", a: "tan x + C", b: "sec x + C", c: "sin x + C", d: "-tan x + C", correct: 0 },
  { q: "∫ (x³ - 1) dx", a: "x⁴/4 - x + C", b: "x⁴ - x + C", c: "3x² + C", d: "x³/3 + C", correct: 0 },
  { q: "∫ 2x/(x²+1) dx", a: "ln(x²+1) + C", b: "2ln(x²+1) + C", c: "arctan x + C", d: "x² + C", correct: 0 }
];

// Game State
let gameState = {
  phase: 'lobby', // lobby, playing, scoreboard, result
  group1: { code: '', name: '1-Guruh', score: 0, students: [] },
  group2: { code: '', name: '2-Guruh', score: 0, students: [] },
  questions: [],
  currentQuestionIndex: -1,
  timer: 45,
  answers: {}, // studentId -> { answerIndex, isCorrect }
  stats: { A: 0, B: 0, C: 0, D: 0 }
};

let timerInterval = null;

function generateCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function resetGame() {
  gameState.phase = 'lobby';
  gameState.group1.code = generateCode();
  gameState.group2.code = generateCode();
  // Ensure codes are different
  while (gameState.group1.code === gameState.group2.code) {
    gameState.group2.code = generateCode();
  }
  gameState.group1.score = 0;
  gameState.group1.students = [];
  gameState.group2.score = 0;
  gameState.group2.students = [];
  gameState.questions = [...questionPool].sort(() => Math.random() - 0.5).slice(0, 15);
  gameState.currentQuestionIndex = -1;
  gameState.timer = 45;
  gameState.answers = {};
  gameState.stats = { A: 0, B: 0, C: 0, D: 0 };
  if (timerInterval) clearInterval(timerInterval);
}

resetGame();

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  // Send initial state
  socket.emit('init', gameState);

  // Host Actions
  socket.on('start-game', () => {
    if (gameState.phase === 'lobby') {
      nextQuestion();
    }
  });

  socket.on('next-question', () => {
    if (gameState.phase === 'scoreboard') {
      nextQuestion();
    }
  });

  socket.on('restart-game', () => {
    resetGame();
    io.emit('game-reset', gameState);
  });

  socket.on('stop-game', () => {
    gameState.phase = 'result';
    if (timerInterval) clearInterval(timerInterval);
    io.emit('game-over', gameState);
  });

  // Student Actions
  socket.on('join-game', ({ name, code }) => {
    let group = null;
    if (code === gameState.group1.code) group = gameState.group1;
    else if (code === gameState.group2.code) group = gameState.group2;

    if (group) {
      const student = { id: socket.id, name };
      group.students.push(student);
      socket.emit('join-success', { groupName: group.name, studentName: name });
      io.emit('student-joined', gameState);
    } else {
      socket.emit('join-error', 'Noto‘g‘ri guruh kodi!');
    }
  });

  socket.on('submit-answer', (answerIndex) => {
    if (gameState.phase !== 'playing') return;
    if (gameState.answers[socket.id]) return; // Already answered

    const question = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = answerIndex === question.correct;
    
    gameState.answers[socket.id] = { answerIndex, isCorrect };

    // Update stats
    const optionLabel = ['A', 'B', 'C', 'D'][answerIndex];
    gameState.stats[optionLabel]++;

    // Update group score
    let group = null;
    if (gameState.group1.students.find(s => s.id === socket.id)) group = gameState.group1;
    else if (gameState.group2.students.find(s => s.id === socket.id)) group = gameState.group2;

    if (group && isCorrect) {
      group.score += 5;
    }

    socket.emit('answer-received', { isCorrect });
    io.emit('stats-update', gameState.stats);
  });

  socket.on('disconnect', () => {
    // Remove student from groups
    gameState.group1.students = gameState.group1.students.filter(s => s.id !== socket.id);
    gameState.group2.students = gameState.group2.students.filter(s => s.id !== socket.id);
    io.emit('student-left', gameState);
  });
});

function nextQuestion() {
  gameState.currentQuestionIndex++;
  if (gameState.currentQuestionIndex >= gameState.questions.length) {
    gameState.phase = 'result';
    io.emit('game-over', gameState);
    return;
  }

  gameState.phase = 'playing';
  gameState.timer = 45;
  gameState.answers = {};
  gameState.stats = { A: 0, B: 0, C: 0, D: 0 };

  // Shuffle options for the current question
  const q = gameState.questions[gameState.currentQuestionIndex];
  const options = [
    { text: q.a, index: 0 },
    { text: q.b, index: 1 },
    { text: q.c, index: 2 },
    { text: q.d, index: 3 }
  ].sort(() => Math.random() - 0.5);

  const shuffledQuestion = {
    q: q.q,
    options: options.map(o => o.text),
    correctIndex: options.findIndex(o => o.index === q.correct)
  };

  // Temporarily store correct index for server-side check
  gameState.questions[gameState.currentQuestionIndex].shuffledCorrect = shuffledQuestion.correctIndex;

  io.emit('new-question', { 
    question: shuffledQuestion, 
    index: gameState.currentQuestionIndex + 1,
    total: gameState.questions.length
  });

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    gameState.timer--;
    io.emit('timer-update', gameState.timer);
    if (gameState.timer <= 0) {
      clearInterval(timerInterval);
      showScoreboard();
    }
  }, 1000);
}

function showScoreboard() {
  gameState.phase = 'scoreboard';
  io.emit('show-scoreboard', gameState);
}

const PORT = 3000;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
