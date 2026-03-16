import React from 'react';
import { motion } from 'motion/react';

const MathBackground: React.FC = () => {
  const symbols = ['∫', 'd/dx', 'sin', 'cos', 'π', 'x²', 'Σ', '√', '∞', '∆', 'θ', 'λ'];
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950 pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-slate-800/20 font-mono text-4xl select-none"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            rotate: Math.random() * 360
          }}
          animate={{
            y: [null, Math.random() * 100 + '%'],
            rotate: [null, Math.random() * 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {symbols[i % symbols.length]}
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
    </div>
  );
};

export default MathBackground;
