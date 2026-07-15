import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import SplitText from '../components/SplitText';
import BlurIn from '../components/BlurIn';

interface StatCardProps {
  value: string;
  label: string;
  delay: number;
  rotation: string;
}

function StatCard({ value, label, delay, rotation }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const isPercentage = value.includes('%');
    const isMultiplier = value.includes('x');
    const isTime = value.includes('hrs');

    let targetValue = 0;
    let suffix = '';

    if (isPercentage) {
      targetValue = parseInt(value);
      suffix = '%';
    } else if (isMultiplier) {
      targetValue = parseInt(value);
      suffix = 'x';
    } else if (isTime) {
      targetValue = parseInt(value);
      suffix = 'hrs';
    }

    const duration = 1500;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const easeOut = 1 - Math.pow(1 - step / steps, 3);
      current = easeOut * targetValue;

      if (step >= steps) {
        current = targetValue;
        clearInterval(timer);
      }

      setDisplayValue(Math.round(current) + suffix);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      animate={{
        y: [0, -10, 0],
        rotate: [rotation, rotation, rotation],
      }}
      style={{ rotate: rotation }}
      className="bg-white/[0.03] border border-violet-500/40 backdrop-blur-[20px] rounded-2xl p-8 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
      whileHover={{ scale: 1.03 }}
    >
      <div
        className="text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-white bg-clip-text text-transparent"
        style={{
          transition: 'background 0.3s',
        }}
      >
        {displayValue}
      </div>
      <p className="text-white/60 text-sm">{label}</p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SplitText className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Real Results. Not Promises.
          </SplitText>
          <BlurIn delay={0.3}>
            <p className="text-white/60 text-lg">
              Nexigen clients don't just grow — they dominate.
            </p>
          </BlurIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <StatCard value="10x" label="Average content reach increase" delay={0} rotation="-2deg" />
          <StatCard
            value="48hrs"
            label="Average website turnaround"
            delay={0.5}
            rotation="1deg"
          />
          <StatCard
            value="100%"
            label="Month-1 client renewal rate"
            delay={1}
            rotation="-1deg"
          />
        </div>
      </div>
    </motion.section>
  );
}
