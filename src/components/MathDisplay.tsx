import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathDisplayProps {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ formula, displayMode = false, className = "" }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(formula, containerRef.current, {
        throwOnError: false,
        displayMode,
      });
    }
  }, [formula, displayMode]);

  return <span ref={containerRef} className={className} />;
};

export default MathDisplay;
