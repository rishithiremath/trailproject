import { motion } from 'framer-motion';
import { Video, Monitor, Sparkles, Zap, User, Mic } from 'lucide-react';
import SplitText from '../components/SplitText';
import BlurIn from '../components/BlurIn';

const services = [
  {
    icon: Video,
    title: 'Viral Videos & Reels',
    description:
      'We record, edit, and post short-form content engineered to go viral and grow your audience organically.',
  },
  {
    icon: Monitor,
    title: 'Ultra-Clean Websites',
    description:
      'Minimalist, blazing-fast, conversion-optimised websites built to make your brand look world-class.',
  },
  {
    icon: Sparkles,
    title: 'AI Studio Posts & Ads',
    description:
      'Send us your product photo. We generate studio-quality creatives and run Instagram ads that convert.',
  },
  {
    icon: Zap,
    title: 'Business Automations (n8n)',
    description:
      'We map and automate your repetitive workflows with n8n so your team focuses purely on creative, high-value work.',
  },
  {
    icon: User,
    title: 'Personal Brand Building',
    description:
      'We build and grow your personal presence across platforms, positioning you as the undeniable authority in your space.',
  },
  {
    icon: Mic,
    title: 'AI Voice Agents',
    description:
      '24/7 AI agents that answer calls, book meetings, capture leads, and handle customer queries — completely automatically.',
  },
];

export default function Services() {
  return (
    <motion.section
      id="services"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SplitText className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Everything Your Business Needs to Win Online
          </SplitText>
          <BlurIn delay={0.3}>
            <p className="text-white/60 text-lg">
              Six AI-powered services. One agency. Zero excuses.
            </p>
          </BlurIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                whileHover={{
                  scale: 1.03,
                  borderColor: 'rgba(124,58,237,0.6)',
                  boxShadow: '0 0 30px rgba(124,58,237,0.2)',
                }}
                className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-[20px] rounded-2xl p-6 transition-all duration-200"
              >
                <div className="bg-violet-500/10 border border-violet-500/20 p-3 rounded-xl w-fit">
                  <Icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mt-4">{service.title}</h3>
                <p className="text-white/60 text-sm mt-2 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
