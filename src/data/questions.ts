export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  category: 'hosila' | 'integral';
  difficulty: 'oson' | 'o\'rta' | 'qiyin';
}

export const questions: Question[] = [
  // OSON (Easy) - 20 questions
  { id: 1, text: "\\frac{d}{dx}(x^2)", options: ["2x", "x", "x^2", "2"], correctIndex: 0, category: 'hosila', difficulty: 'oson' },
  { id: 2, text: "\\frac{d}{dx}(5x)", options: ["5", "x", "5x", "0"], correctIndex: 0, category: 'hosila', difficulty: 'oson' },
  { id: 3, text: "\\int 1 dx", options: ["x + C", "1 + C", "0 + C", "x^2 + C"], correctIndex: 0, category: 'integral', difficulty: 'oson' },
  { id: 4, text: "\\frac{d}{dx}(\\sin x)", options: ["\\cos x", "-\\cos x", "\\sin x", "0"], correctIndex: 0, category: 'hosila', difficulty: 'oson' },
  { id: 5, text: "\\int x dx", options: ["\\frac{x^2}{2} + C", "x^2 + C", "1 + C", "x + C"], correctIndex: 0, category: 'integral', difficulty: 'oson' },
  { id: 6, text: "\\frac{d}{dx}(e^x)", options: ["e^x", "xe^{x-1}", "1", "0"], correctIndex: 0, category: 'hosila', difficulty: 'oson' },
  { id: 7, text: "\\int \\cos x dx", options: ["\\sin x + C", "-\\sin x + C", "\\cos x + C", "x + C"], correctIndex: 0, category: 'integral', difficulty: 'oson' },
  { id: 8, text: "\\frac{d}{dx}(\\ln x)", options: ["\\frac{1}{x}", "x", "e^x", "1"], correctIndex: 0, category: 'hosila', difficulty: 'oson' },
  { id: 9, text: "\\int e^x dx", options: ["e^x + C", "xe^x + C", "\\frac{e^x}{x} + C", "e^{x+1} + C"], correctIndex: 0, category: 'integral', difficulty: 'oson' },
  { id: 10, text: "\\frac{d}{dx}(x^3)", options: ["3x^2", "2x^3", "x^2", "3x"], correctIndex: 0, category: 'hosila', difficulty: 'oson' },
  { id: 11, text: "\\int \\sin x dx", options: ["-\\cos x + C", "\\cos x + C", "\\sin x + C", "x + C"], correctIndex: 0, category: 'integral', difficulty: 'oson' },
  { id: 12, text: "\\frac{d}{dx}(10)", options: ["0", "1", "10", "x"], correctIndex: 0, category: 'hosila', difficulty: 'oson' },
  { id: 13, text: "\\int x^2 dx", options: ["\\frac{x^3}{3} + C", "x^3 + C", "2x + C", "x^2 + C"], correctIndex: 0, category: 'integral', difficulty: 'oson' },
  { id: 14, text: "\\frac{d}{dx}(\\sqrt{x})", options: ["\\frac{1}{2\\sqrt{x}}", "\\sqrt{x}", "2\\sqrt{x}", "\\frac{1}{x}"], correctIndex: 0, category: 'hosila', difficulty: 'oson' },
  { id: 15, text: "\\int \\frac{1}{x} dx", options: ["\\ln|x| + C", "e^x + C", "x + C", "1 + C"], correctIndex: 0, category: 'integral', difficulty: 'oson' },
  { id: 16, text: "\\frac{d}{dx}(x^2 + x)", options: ["2x + 1", "x + 1", "2x", "x^2"], correctIndex: 0, category: 'hosila', difficulty: 'oson' },
  { id: 17, text: "\\int (x+1) dx", options: ["\\frac{x^2}{2} + x + C", "x^2 + x + C", "x + C", "1 + C"], correctIndex: 0, category: 'integral', difficulty: 'oson' },
  { id: 18, text: "\\frac{d}{dx}(\\cos x)", options: ["-\\sin x", "\\sin x", "\\cos x", "0"], correctIndex: 0, category: 'hosila', difficulty: 'oson' },
  { id: 19, text: "\\int 5 dx", options: ["5x + C", "5 + C", "x + C", "0 + C"], correctIndex: 0, category: 'integral', difficulty: 'oson' },
  { id: 20, text: "\\frac{d}{dx}(x^4)", options: ["4x^3", "3x^4", "x^3", "4x"], correctIndex: 0, category: 'hosila', difficulty: 'oson' },

  // O'RTA (Medium) - 20 questions
  { id: 21, text: "\\frac{d}{dx}(\\sin(2x))", options: ["2\\cos(2x)", "\\cos(2x)", "-2\\cos(2x)", "2\\sin(2x)"], correctIndex: 0, category: 'hosila', difficulty: 'o\'rta' },
  { id: 22, text: "\\int \\cos(3x) dx", options: ["\\frac{1}{3}\\sin(3x) + C", "3\\sin(3x) + C", "-\\frac{1}{3}\\sin(3x) + C", "\\sin(3x) + C"], correctIndex: 0, category: 'integral', difficulty: 'o\'rta' },
  { id: 23, text: "\\frac{d}{dx}(x \\ln x)", options: ["\\ln x + 1", "\\ln x", "1", "\\frac{1}{x}"], correctIndex: 0, category: 'hosila', difficulty: 'o\'rta' },
  { id: 24, text: "\\int e^{2x} dx", options: ["\\frac{1}{2}e^{2x} + C", "2e^{2x} + C", "e^{2x} + C", "e^x + C"], correctIndex: 0, category: 'integral', difficulty: 'o\'rta' },
  { id: 25, text: "\\frac{d}{dx}(\\tan x)", options: ["\\sec^2 x", "\\cos^2 x", "1", "\\sin^2 x"], correctIndex: 0, category: 'hosila', difficulty: 'o\'rta' },
  { id: 26, text: "\\int \\frac{1}{1+x^2} dx", options: ["\\arctan x + C", "\\arcsin x + C", "\\ln(1+x^2) + C", "x + C"], correctIndex: 0, category: 'integral', difficulty: 'o\'rta' },
  { id: 27, text: "\\frac{d}{dx}(\\sqrt{x^2+1})", options: ["\\frac{x}{\\sqrt{x^2+1}}", "\\frac{1}{\\sqrt{x^2+1}}", "x\\sqrt{x^2+1}", "2x"], correctIndex: 0, category: 'hosila', difficulty: 'o\'rta' },
  { id: 28, text: "\\int \\sin^2 x dx", options: ["\\frac{x}{2} - \\frac{\\sin 2x}{4} + C", "\\frac{\\sin^3 x}{3} + C", "x + C", "-\\cos^2 x + C"], correctIndex: 0, category: 'integral', difficulty: 'o\'rta' },
  { id: 29, text: "\\frac{d}{dx}(\\frac{e^x}{x})", options: ["\\frac{e^x(x-1)}{x^2}", "\\frac{e^x}{x}", "\\frac{e^x}{x^2}", "e^x"], correctIndex: 0, category: 'hosila', difficulty: 'o\'rta' },
  { id: 30, text: "\\int \\ln x dx", options: ["x\\ln x - x + C", "\\frac{1}{x} + C", "x\\ln x + C", "x^2 + C"], correctIndex: 0, category: 'integral', difficulty: 'o\'rta' },
  { id: 31, text: "\\frac{d}{dx}(\\cos^2 x)", options: ["-2\\sin x \\cos x", "2\\cos x", "-2\\sin x", "\\sin^2 x"], correctIndex: 0, category: 'hosila', difficulty: 'o\'rta' },
  { id: 32, text: "\\int x e^{x^2} dx", options: ["\\frac{1}{2}e^{x^2} + C", "e^{x^2} + C", "2e^{x^2} + C", "xe^{x^2} + C"], correctIndex: 0, category: 'integral', difficulty: 'o\'rta' },
  { id: 33, text: "\\frac{d}{dx}(\\arcsin x)", options: ["\\frac{1}{\\sqrt{1-x^2}}", "\\frac{1}{1+x^2}", "-\\frac{1}{\\sqrt{1-x^2}}", "\\cos x"], correctIndex: 0, category: 'hosila', difficulty: 'o\'rta' },
  { id: 34, text: "\\int \\frac{x}{x^2+1} dx", options: ["\\frac{1}{2}\\ln(x^2+1) + C", "\\ln(x^2+1) + C", "\\arctan x + C", "x^2 + C"], correctIndex: 0, category: 'integral', difficulty: 'o\'rta' },
  { id: 35, text: "\\frac{d}{dx}(\\ln(\\cos x))", options: ["-\\tan x", "\\tan x", "\\cot x", "-\\cot x"], correctIndex: 0, category: 'hosila', difficulty: 'o\'rta' },
  { id: 36, text: "\\int_0^1 x^3 dx", options: ["\\frac{1}{4}", "1", "\\frac{1}{3}", "0"], correctIndex: 0, category: 'integral', difficulty: 'o\'rta' },
  { id: 37, text: "\\frac{d}{dx}(5^x)", options: ["5^x \\ln 5", "x 5^{x-1}", "5^x", "\\frac{5^x}{\\ln 5}"], correctIndex: 0, category: 'hosila', difficulty: 'o\'rta' },
  { id: 38, text: "\\int \\frac{dx}{\\sqrt{1-x^2}}", options: ["\\arcsin x + C", "\\arccos x + C", "\\arctan x + C", "\\ln x + C"], correctIndex: 0, category: 'integral', difficulty: 'o\'rta' },
  { id: 39, text: "\\frac{d}{dx}(\\frac{1}{x^2+1})", options: ["-\\frac{2x}{(x^2+1)^2}", "\\frac{2x}{x^2+1}", "\\frac{1}{(x^2+1)^2}", "0"], correctIndex: 0, category: 'hosila', difficulty: 'o\'rta' },
  { id: 40, text: "\\int \\tan x dx", options: ["-\\ln|\\cos x| + C", "\\ln|\\sin x| + C", "\\sec^2 x + C", "\\tan^2 x + C"], correctIndex: 0, category: 'integral', difficulty: 'o\'rta' },

  // QIYIN (Hard) - 20 questions
  { id: 41, text: "\\frac{d}{dx}(x^x)", options: ["x^x(1 + \\ln x)", "x \\cdot x^{x-1}", "x^x \\ln x", "x^x"], correctIndex: 0, category: 'hosila', difficulty: 'qiyin' },
  { id: 42, text: "\\int x^2 e^x dx", options: ["e^x(x^2 - 2x + 2) + C", "e^x(x^2 + 2x + 2) + C", "x^2 e^x + C", "e^x(x^2 - 2x) + C"], correctIndex: 0, category: 'integral', difficulty: 'qiyin' },
  { id: 43, text: "\\frac{d}{dx}(\\ln(\\ln(\\ln x)))", options: ["\\frac{1}{x \\ln x \\ln(\\ln x)}", "\\frac{1}{\\ln(\\ln x)}", "\\frac{1}{x}", "\\frac{1}{x^3}"], correctIndex: 0, category: 'hosila', difficulty: 'qiyin' },
  { id: 44, text: "\\int \\frac{dx}{x^2-a^2}", options: ["\\frac{1}{2a}\\ln|\\frac{x-a}{x+a}| + C", "\\frac{1}{a}\\arctan\\frac{x}{a} + C", "\\ln|x^2-a^2| + C", "\\frac{1}{2a}\\ln|\\frac{x+a}{x-a}| + C"], correctIndex: 0, category: 'integral', difficulty: 'qiyin' },
  { id: 45, text: "\\frac{d}{dx}(\\arctan(\\frac{2x}{1-x^2}))", options: ["\\frac{2}{1+x^2}", "\\frac{1}{1+x^2}", "\\frac{2}{1-x^2}", "1"], correctIndex: 0, category: 'hosila', difficulty: 'qiyin' },
  { id: 46, text: "\\int \\sqrt{a^2-x^2} dx", options: ["\\frac{x}{2}\\sqrt{a^2-x^2} + \\frac{a^2}{2}\\arcsin\\frac{x}{a} + C", "\\frac{a^2}{2}\\arcsin\\frac{x}{a} + C", "x\\sqrt{a^2-x^2} + C", "\\frac{x^2}{2} + C"], correctIndex: 0, category: 'integral', difficulty: 'qiyin' },
  { id: 47, text: "\\frac{d}{dx}(\\int_0^{x^2} e^{t^2} dt)", options: ["2x e^{x^4}", "e^{x^4}", "2x e^{x^2}", "e^{x^2}"], correctIndex: 0, category: 'hosila', difficulty: 'qiyin' },
  { id: 48, text: "\\int \\frac{dx}{\\sin x}", options: ["\\ln|\\tan\\frac{x}{2}| + C", "\\ln|\\sin x| + C", "-\\ln|\\cos x| + C", "\\csc x + C"], correctIndex: 0, category: 'integral', difficulty: 'qiyin' },
  { id: 49, text: "\\frac{d}{dx}(x^{\\sin x})", options: ["x^{\\sin x}(\\cos x \\ln x + \\frac{\\sin x}{x})", "x^{\\sin x} \\cos x", "\\sin x \\cdot x^{\\sin x - 1}", "x^{\\sin x}"], correctIndex: 0, category: 'hosila', difficulty: 'qiyin' },
  { id: 50, text: "\\int e^x \\sin x dx", options: ["\\frac{e^x}{2}(\\sin x - \\cos x) + C", "\\frac{e^x}{2}(\\sin x + \\cos x) + C", "e^x \\cos x + C", "-e^x \\cos x + C"], correctIndex: 0, category: 'integral', difficulty: 'qiyin' },
  { id: 51, text: "\\frac{d}{dx}(\\ln(x + \\sqrt{x^2+a^2}))", options: ["\\frac{1}{\\sqrt{x^2+a^2}}", "\\frac{1}{x+\\sqrt{x^2+a^2}}", "\\sqrt{x^2+a^2}", "1"], correctIndex: 0, category: 'hosila', difficulty: 'qiyin' },
  { id: 52, text: "\\int \\frac{dx}{x\\sqrt{x^2-1}}", options: ["\\text{arcsec } x + C", "\\text{arcsin } x + C", "\\ln|x| + C", "\\frac{1}{x} + C"], correctIndex: 0, category: 'integral', difficulty: 'qiyin' },
  { id: 53, text: "\\frac{d}{dx}(\\frac{\\arcsin x}{\\sqrt{1-x^2}})", options: ["\\frac{\\sqrt{1-x^2} + x\\arcsin x}{(1-x^2)\\sqrt{1-x^2}}", "\\frac{1}{1-x^2}", "\\frac{x}{1-x^2}", "1"], correctIndex: 0, category: 'hosila', difficulty: 'qiyin' },
  { id: 54, text: "\\int \\frac{x^2 dx}{\\sqrt{a^2-x^2}}", options: ["\\frac{a^2}{2}\\arcsin\\frac{x}{a} - \\frac{x}{2}\\sqrt{a^2-x^2} + C", "\\frac{a^2}{2}\\arcsin\\frac{x}{a} + C", "-\\sqrt{a^2-x^2} + C", "x^2 + C"], correctIndex: 0, category: 'integral', difficulty: 'qiyin' },
  { id: 55, text: "\\frac{d}{dx}(\\sinh^{-1} x)", options: ["\\frac{1}{\\sqrt{x^2+1}}", "\\frac{1}{\\sqrt{x^2-1}}", "\\frac{1}{1-x^2}", "\\cosh x"], correctIndex: 0, category: 'hosila', difficulty: 'qiyin' },
  { id: 56, text: "\\int \\frac{dx}{x^2+2x+5}", options: ["\\frac{1}{2}\\arctan\\frac{x+1}{2} + C", "\\arctan(x+1) + C", "\\ln|x^2+2x+5| + C", "x + C"], correctIndex: 0, category: 'integral', difficulty: 'qiyin' },
  { id: 57, text: "\\frac{d}{dx}(\\cos(\\sin(\\ln x)))", options: ["-\\sin(\\sin(\\ln x)) \\cos(\\ln x) \\frac{1}{x}", "-\\sin(\\sin(\\ln x))", "\\cos(\\sin(\\ln x))", "0"], correctIndex: 0, category: 'hosila', difficulty: 'qiyin' },
  { id: 58, text: "\\int \\frac{dx}{1+\\sin x}", options: ["\\tan x - \\sec x + C", "\\tan x + \\sec x + C", "\\ln|1+\\sin x| + C", "x + C"], correctIndex: 0, category: 'integral', difficulty: 'qiyin' },
  { id: 59, text: "\\frac{d}{dx}(e^{e^x})", options: ["e^{e^x} e^x", "e^{e^x}", "e^x", "(e^x)^2"], correctIndex: 0, category: 'hosila', difficulty: 'qiyin' },
  { id: 60, text: "\\int \\frac{dx}{(x^2+a^2)^{3/2}}", options: ["\\frac{x}{a^2\\sqrt{x^2+a^2}} + C", "\\frac{1}{a^2\\sqrt{x^2+a^2}} + C", "\\frac{x}{\\sqrt{x^2+a^2}} + C", "x^2 + C"], correctIndex: 0, category: 'integral', difficulty: 'qiyin' },
];
