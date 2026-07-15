import { motion } from 'framer-motion';
import SplitText from '../components/SplitText';

const steps = [
  {
    number: '01',
    title: 'We Audit',
    description:
      'We deep-dive into your business, audience, and competitors to find every opportunity.',
  },
  {
    number: '02',
    title: 'We Build',
    description:
      'Content pipelines, AI automations, premium websites, and voice agents — all deployed for you.',
  },
  {
    number: '03',
    title: 'You Grow',
    description:
      'Watch your brand explode online while our systems run in the background. You just focus on closing.',
  },
];

export default function HowItWorks() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 relative"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.15), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <SplitText className="text-4xl lg:text-5xl font-bold text-white">
            From Zero to Growth in 3 Steps
          </SplitText>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-[2px] border-t-2 border-dashed border-violet-500/40" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
              className="flex flex-col items-center text-center flex-1 relative z-10"
            >
              <div className="w-20 h-20 rounded-full border-2 border-violet-500/40 bg-[#070612] flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-violet-400">{step.number}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
