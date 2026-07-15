import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SplitText from '../components/SplitText';

const plans = [
  {
    name: 'Starter',
    price: '₹25,000',
    period: '/mo',
    features: [
      '8 Reels/month (filmed, edited, posted)',
      'Basic website up to 5 pages',
      '12 AI product posts + basic Instagram ads',
      '1 n8n automation workflow',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '₹55,000',
    period: '/mo',
    badge: 'Most Popular',
    features: [
      '20 Reels/month + full social management',
      'Premium website unlimited pages',
      '30 AI posts + full ad campaign management',
      'Up to 5 n8n automation workflows',
      'Personal brand strategy + content posting',
      'AI Voice Agent (basic)',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Full Stack',
    price: '₹1,00,000',
    period: '/mo',
    features: [
      'Everything in Growth',
      'Unlimited content and automations',
      'Dedicated account manager',
      'White-label reporting',
      'Advanced AI Voice Agent (custom trained on your business)',
      'Priority support + weekly strategy calls',
    ],
    cta: "Let's Talk",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <>
      <style>{`
        @keyframes borderGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(124, 58, 237, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(124, 58, 237, 0.8);
          }
        }
        .glow-border {
          animation: borderGlow 2s ease-in-out infinite alternate;
        }
      `}</style>

      <motion.section
        id="pricing"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SplitText className="text-4xl lg:text-5xl font-bold text-white">
              Simple Pricing. Serious Results.
            </SplitText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                className={`relative bg-white/[0.03] backdrop-blur-[20px] rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'border-2 border-violet-500 glow-border'
                    : 'border border-white/[0.06]'
                }`}
              >
                {plan.badge && (
                  <div className="absolute top-4 right-4 bg-violet-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {plan.badge}
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/60 ml-2">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full rounded-full py-3 font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-violet-600 text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
