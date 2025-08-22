import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, BookOpen, Clock, Mail, ArrowUp } from 'lucide-react';

// A personal portfolio site for arXiVius, with an updated background shader effect.

// Custom SVG components for the cursors
const CursorDefaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFF" stroke="#000" strokeWidth="1.5" d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"></path></svg>
);

const CursorButtonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFF" stroke="#000" strokeWidth="1.5" strokeLinejoin="round" d="M10 11V8.99c0-.88.59-1.64 1.44-1.86h.05A1.99 1.99 0 0 1 14 9.05V12v-2c0-.88.6-1.65 1.46-1.87h.05A1.98 1.98 0 0 1 18 10.06V13v-1.94a2 2 0 0 1 1.51-1.94h0A2 2 0 0 1 22 11.06V14c0 .6-.08 1.27-.21 1.97a7.96 7.96 0 0 1-7.55 6.48 54.98 54.98 0 0 1-4.48 0 7.96 7.96 0 0 1-7.55-6.48C2.08 15.27 2 14.59 2 14v-1.49c0-1.11.9-2.01 2.01-2.01h0a2 2 0 0 1 2.01 2.03l-.01.97v-10c0-1.1.9-2 2-2h0a2 2 0 0 1 2 2V11Z"></path></svg>
);

// New Logo SVG provided by the user
const NewLogoIcon = () => (
  // Updated logo size to be bigger
  <svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-9 transition-all duration-300">
    <path d="M37.2551 1.61586C38.1803 0.653384 39.4368 0.112671 40.7452 0.112671C46.6318 0.112671 52.1793 0.112674 57.6424 0.112685C68.6302 0.112708 74.1324 13.9329 66.3629 22.0156L49.4389 39.6217C48.662 40.43 47.3335 39.8575 47.3335 38.7144V23.2076L49.2893 21.1729C50.8432 19.5564 49.7427 16.7923 47.5451 16.7923H22.6667L37.2551 1.61586Z" fill="url(#paint0_linear_5464_1221)"></path>
    <path d="M32.7449 38.3842C31.8198 39.3467 30.5633 39.8874 29.2549 39.8874C23.3683 39.8874 17.8208 39.8874 12.3577 39.8874C1.36983 39.8873 -4.13236 26.0672 3.63721 17.9844L20.5612 0.378369C21.3381 -0.429908 22.6666 0.142547 22.6666 1.28562L22.6667 16.7923L20.7108 18.8271C19.1569 20.4437 20.2574 23.2077 22.455 23.2077L47.3335 23.2076L32.7449 38.3842Z" fill="url(#paint1_linear_5464_1221)"></path>
    <defs>
    <linearGradient id="paint0_linear_5464_1221" x1="59" y1="2" x2="16" y2="40" gradientUnits="userSpaceOnUse">
    <stop stopColor="#59FFB1"></stop>
    <stop offset="0.510529" stopColor="#009CCC"></stop>
    <stop offset="1" stopColor="#3A04FF"></stop>
    </linearGradient>
    <linearGradient id="paint1_linear_5464_1221" x1="59" y1="2" x2="16" y2="40" gradientUnits="userSpaceOnUse">
    <stop stopColor="#59FFB1"></stop>
    <stop offset="0.510529" stopColor="#009CCC"></stop>
    <stop offset="1" stopColor="#3A04FF"></stop>
    </linearGradient>
    </defs>
  </svg>
);

// A reusable card component for projects.
const ProjectCard = ({ icon, title, description, url, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay }}
      className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl backdrop-blur-sm transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 cursor-default"
    >
      <div className="text-blue-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 mb-4">{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-400 font-medium group">
        View Project
        <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
};

// Main App component for the portfolio.
export default function App() {
  const [isBeyondHero, setIsBeyondHero] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const heroRef = useRef(null);
  const themeClasses = 'dark bg-[#080A11] text-white';

  useEffect(() => {
    const handleScroll = () => {
      // Check if scroll is beyond the hero section to show the navbar
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        setIsBeyondHero(window.scrollY > heroHeight - 100);
      }
      // Check if scroll is far enough down to show the "Back to Top" button
      if (window.scrollY > 400) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen font-sans antialiased relative overflow-hidden ${themeClasses} transition-colors duration-500`}>
      
      {/* Embedded styles for custom cursors */}
      <style>
        {`
          body {
            cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" stroke="black" stroke-width="1.5" d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"></path></svg>'), auto;
          }
          a, button {
            cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" stroke="black" stroke-width="1.5" stroke-linejoin="round" d="M10 11V8.99c0-.88.59-1.64 1.44-1.86h.05A1.99 1.99 0 0 1 14 9.05V12v-2c0-.88.6-1.65 1.46-1.87h.05A1.98 1.98 0 0 1 18 10.06V13v-1.94a2 2 0 0 1 1.51-1.94h0A2 2 0 0 1 22 11.06V14c0 .6-.08 1.27-.21 1.97a7.96 7.96 0 0 1-7.55 6.48 54.98 54.98 0 0 1-4.48 0 7.96 7.96 0 0 1-7.55-6.48C2.08 15.27 2 14.59 2 14v-1.49c0-1.11.9-2.01 2.01-2.01h0a2 2 0 0 1 2.01 2.03l-.01.97v-10c0-1.1.9-2 2-2h0a2 2 0 0 1 2 2V11Z"></path></svg>'), pointer;
          }
          a:hover {
            cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" stroke="black" stroke-width="1.5" stroke-linejoin="round" d="M10 11V8.99c0-.88.59-1.64 1.44-1.86h.05A1.99 1.99 0 0 1 14 9.05V12v-2c0-.88.6-1.65 1.46-1.87h.05A1.98 1.98 0 0 1 18 10.06V13v-1.94a2 2 0 0 1 1.51-1.94h0A2 2 0 0 1 22 11.06V14c0 .6-.08 1.27-.21 1.97a7.96 7.96 0 0 1-7.55 6.48 54.98 54.98 0 0 1-4.48 0 7.96 7.96 0 0 1-7.55-6.48C2.08 15.27 2 14.59 2 14v-1.49c0-1.11.9-2.01 2.01-2.01h0a2 2 0 0 1 2.01 2.03l-.01.97v-10c0-1.1.9-2 2-2h0a2 2 0 0 1 2 2V11Z"></path></svg>'), pointer;
          }
        `}
      </style>
      
      {/* Container for the radial gradient that fills the top space */}
      <div className="absolute top-0 left-0 w-full h-96 -z-10 bg-[radial-gradient(ellipse_at_top,transparent_0%,#3A04FF/10_50%,transparent_80%)]"></div>
      
      {/* Floating background shader with motion */}
      <motion.div
        initial={{ scale: 1, x: '-50%', y: '-50%' }}
        animate={{
          scale: [1, 1.05, 1],
          x: ['-50%', '-52%', '-50%'],
          y: ['-50%', '-48%', '-50%'],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full mix-blend-screen opacity-5 backdrop-blur-lg -z-20"
      ></motion.div>

      {/* Floating Navbar with animation */}
      <AnimatePresence>
        {!isBeyondHero && (
          <motion.nav
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="sticky top-4 z-50 flex justify-center w-full"
          >
            <a
              href="#"
              onClick={handleLogoClick}
              // Increased padding for a larger navbar container
              className="backdrop-blur-lg bg-gray-900/50 border border-gray-800 rounded-full flex items-center px-6 py-4 cursor-pointer transition-all duration-300 hover:border-blue-500/50"
            >
              <NewLogoIcon />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-8 md:py-16 max-w-7xl relative z-10">
        
        {/* Hero Section */}
        <section ref={heroRef} className="text-center mt-16 md:mt-24 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Updated heading and subtext to be more Gen-Z yet professional */}
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
              Hey, I'm <span className="italic font-serif underline decoration-blue-500 decoration-4 underline-offset-8">arXiVius</span>.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              I build web experiences that hit different, blending clean design with rock-solid code.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.scrollTo({ top: document.getElementById('projects').offsetTop, behavior: 'smooth' })}
                className="py-3 px-8 text-lg font-medium rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                See My Work
              </button>
              <a href="mailto:johnnyalbrent@gmail.com" className="py-3 px-8 text-lg font-medium rounded-full border border-gray-700 text-white hover:bg-gray-800 transition-colors">
                Contact Me
              </a>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-500">
    My latest{" "}
    <span className="italic underline decoration-pink-500 decoration-4 underline-offset-4 font-unbounded">
      projects
    </span>
  </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              icon={<Code size={48} />}
              title="Codra"
              description="A versatile multitool for programmers, featuring code snippets, converters, and other utilities."
              url="https://arxivius.github.io/codra."
              delay={0.1}
            />
            <ProjectCard
              icon={<BookOpen size={48} />}
              title="Wiki"
              description="A simple and elegant search engine and reader for Wikipedia content, designed for a focused experience."
              url="https://arxivius.github.io/wiki."
              delay={0.2}
            />
            <ProjectCard
              icon={<Clock size={48} />}
              title="Pomo"
              description="A clean and minimal Pomodoro timer to help boost productivity and maintain focus during work sessions."
              url="https://arxivius.github.io/pomo/"
              delay={0.3}
            />
          </div>
        </section>
        
        {/* Contact CTA Section */}
        <section className="text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="p-10 bg-slate-800/30 border border-slate-700/50 rounded-3xl shadow-xl shadow-blue-500/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Let's connect.
            </h2>
            {/* Updated subtext */}
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Always down to chat about new opportunities, collabs, or just cool stuff.
            </p>
            <a href="mailto:johnnyalbrent@gmail.com" className="py-3 px-8 text-lg font-medium rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <Mail className="inline-block mr-2" size={20} /> Say Hello
            </a>
          </motion.div>
        </section>

      </main>

      {/* Back to Top button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-gray-900/50 border border-gray-800 text-white shadow-lg backdrop-blur-lg hover:border-blue-500/50 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 border-t border-gray-800">
        <p className="text-sm">
          Made with <span className="text-red-500">❤️</span> by <a href="https://github.com/arxivius/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-blue-500 transition-colors">arXiVius</a>
        </p>
      </footer>
    </div>
  );
}