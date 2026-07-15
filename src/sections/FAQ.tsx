import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SplitText from '../components/SplitText';
import BlurIn from '../components/BlurIn';

const faqs = [
  {
    question: 'Do I need to be tech-savvy to work with Nexigen?',
    answer:
      'Not at all. We handle everything end-to-end — strategy, execution, and tech. You just tell us your goals and we deliver.',
  },
  {
    question: 'How quickly will I see results?',
    answer:
      'Most clients see measurable improvements in content reach and leads within the first 30 days. Automation and AI agents go live within the first week.',
  },
  {
    question: "Can you handle everything if I'm starting from zero?",
    answer:
      "Yes — we've launched complete digital presences from scratch. Website, social media, automations, ads, all of it.",
  },
  {
    question: 'What exactly does the AI Voice Agent do?',
    answer:
      'It answers inbound calls, qualifies leads, books meetings into your calendar, and logs customer details — 24/7 with no human needed.',
  },
  {
    question: 'Do you work with international clients?',
    answer:
      'Absolutely. We work with clients globally. All services are delivered remotely with async communication and weekly calls.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <SplitText className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Got Questions?
          </SplitText>
          <BlurIn delay={0.3}>
            <p className="text-white/60 text-lg">
              Everything you need to know before getting started.
            </p>
          </BlurIn>
        </div>

        <div className="space-y-4 mt-12">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-[20px] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-white font-semibold">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <ChevronDown className="w-5 h-5 text-violet-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
