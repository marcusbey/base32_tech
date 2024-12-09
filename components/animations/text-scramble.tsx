"use client";

import { useEffect, useState } from "react";

const characters = "!<>-_\\/[]{}—=+*^?#________";

interface TextScrambleProps {
  text: string;
  isActive: boolean;
  onComplete?: () => void;
  className?: string;
}

export function TextScramble({ text, isActive, onComplete, className = "" }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let iteration = 0;
    const maxIterations = 10;
    
    const interval = setInterval(() => {
      setDisplayText(current => {
        const newText = text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("");

        if (iteration >= text.length) {
          clearInterval(interval);
          onComplete?.();
        }

        return newText;
      });

      iteration += 1/3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, isActive, onComplete]);

  return <span className={className}>{displayText}</span>;
}
