import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SplitText from '../components/SplitText';

const testimonials = [
  {
    initials: 'RS',
    name: 'Rohan S.',
    role: 'D2C Brand Founder',
    review:
      'Nexigen built our website, automated our lead follow-ups, and grew our Instagram to 50k in 3 months. It felt like hiring a 10-person team overnight.',
  },
  {
    initials: 'PM',
    name: 'Priya M.',
    role: 'Restaurant Owner',
    review:
      'The AI posts they create from our food photos are absolutely stunning. Our Instagram engagement went up 8x in the first month alone.',
  },
  {
    initials: 'AK',
    name: 'Arjun K.',
    role: 'SaaS Founder',
    review:
      'The n8n automations they set up save us 40 hours a week. The voice agent books demos while we sleep. Nexigen is genuinely unreal.',
  },
];

export default function Testimonials() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SplitText className="text-4xl lg:text-5xl font-bold text-white">
            What Our Clients Say
          </SplitText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
              whileHover={{ scale: 1.03 }}
              className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-[20px] rounded-2xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center text-white font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-white/50 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-white/70 text-sm leading-relaxed italic">{testimonial.review}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
