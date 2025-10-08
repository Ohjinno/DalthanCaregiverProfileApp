
'use client';

import { motion } from 'framer-motion';

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function LoadingDots({ size = 'md', color = '#26A69A' }: LoadingDotsProps) {
  const dotSize = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
  
  const bounceTransition = {
    y: {
      duration: 0.6,
      ease: "easeOut",
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  };

  return (
    <div className="flex justify-center items-center space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="rounded-full"
          style={{
            backgroundColor: color,
            width: dotSize,
            height: dotSize,
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            ...bounceTransition,
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );
}
