import { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import BlurIn from '../components/BlurIn';
import SplitText from '../components/SplitText';
import GradualBlur from '../components/GradualBlur';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tubesLoaded, setTubesLoaded] = useState(false);

  useEffect(() => {
    const loadTubes = async () => {
      try {
        const module = await import(
          'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
        );

        if (canvasRef.current && module.default) {
          module.default(canvasRef.current, {
            tubes: {
              colors: ['#7C3AED', '#4F46E5', '#a855f7'],
              lights: {
                intensity: 200,
                colors: ['#7C3AED', '#4F46E5', '#c084fc', '#818cf8'],
              },
            },
          });
          setTubesLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load tubes effect:', error);
      }
    };

    loadTubes();
  }, []);

  const randomizeColors = () => {
    if (tubesLoaded && canvasRef.current) {
      const colors = [
        ['#7C3AED', '#4F46E5', '#a855f7'],
        ['#06b6d4', '#3b82f6', '#8b5cf6'],
        ['#f43f5e', '#ec4899', '#a855f7'],
      ];
      const randomIndex = Math.floor(Math.random() * colors.length);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.15), transparent)',
        }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <canvas
        ref={canvasRef}
        className="absolute right-0 top-0 h-full w-[70%] ml-[200px] origin-left"
        style={{ transform: 'scaleX(1.2)', zIndex: 0 }}
        onClick={randomizeColors}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center gap-6">
        <BlurIn delay={0}>
          <div className="border border-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full inline-flex items-center gap-2 w-fit">
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span className="text-sm text-white/80">AI-Powered Growth Agency</span>
          </div>
        </BlurIn>

        <SplitText
          baseDelay={0.2}
          className="text-5xl lg:text-7xl font-bold leading-tight text-white max-w-2xl"
        >
          Your Entire Growth Stack, Powered by AI.
        </SplitText>

        <BlurIn delay={0.5}>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl">
            Nexigen handles your content, websites, AI posts, automations, personal brand, and
            voice agents — so you focus on growing your business.
          </p>
        </BlurIn>

        <BlurIn delay={0.7}>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="bg-white text-black rounded-full px-6 py-3 font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]">
              Book a Free Call
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white rounded-full px-6 py-3 border border-white/20 hover:scale-105 transition-transform">
              See Our Work
            </button>
          </div>
        </BlurIn>
      </div>

      <GradualBlur />
    </section>
  );
}
