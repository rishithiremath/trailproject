import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface SplitTextProps {
  children: string;
  baseDelay?: number;
  className?: string;
}

export default function SplitText({ children, baseDelay = 0, className = '' }: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const words = children.split(' ');

  return (
    <div ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: 40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: baseDelay + wordIndex * 0.08,
            }}
          >
            {word === 'AI.' ? <span className="italic font-serif">{word}</span> : word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
