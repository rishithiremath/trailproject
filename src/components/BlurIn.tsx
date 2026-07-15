import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BlurInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function BlurIn({ children, delay = 0, className = '' }: BlurInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
