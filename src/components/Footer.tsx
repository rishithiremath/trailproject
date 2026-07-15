import { Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const navLinks = ['Services', 'Pricing', 'Work', 'Contact'];
  const socialLinks = [
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Twitter, href: '#' },
  ];

  return (
    <footer className="bg-black/40 border-t border-white/[0.06] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 w-fit mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center text-white font-bold text-sm">
                NX
              </div>
              <span className="text-white font-semibold text-lg">Nexigen</span>
            </div>
            <p className="text-white/40 text-sm">
              AI-powered growth for the businesses of tomorrow.
            </p>
          </div>

          <div className="flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-white/40 text-sm">© 2025 Nexigen. All rights reserved.</p>

          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  className="text-white/60 hover:text-violet-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
