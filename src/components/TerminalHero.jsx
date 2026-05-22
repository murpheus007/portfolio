import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ASCII_ART = `
 ███╗   ███╗██╗   ██╗██████╗ ██████╗ ██╗  ██╗███████╗██╗   ██╗███████╗
 ████╗ ████║██║   ██║██╔══██╗██╔══██╗██║  ██║██╔════╝██║   ██║██╔════╝
 ██╔████╔██║██║   ██║██████╔╝██████╔╝███████║█████╗  ██║   ██║███████╗
 ██║╚██╔╝██║██║   ██║██╔══██╗██╔═══╝ ██╔══██║██╔══╝  ██║   ██║╚════██║
 ██║ ╚═╝ ██║╚██████╔╝██║  ██║██║     ██║  ██║███████╗╚██████╔╝███████║
 ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝`;

const TerminalHero = () => {
  const [lines, setLines] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const terminalData = [
      { type: 'input', content: 'whoami' },
      { type: 'output', content: 'Murpheus' },
      { type: 'input', content: 'cat role.txt' },
      { type: 'output', content: 'Fullstack Developer & Digital Architect' },
      { type: 'input', content: 'ls projects/' },
      {
        type: 'output',
        content:
          'streambolt/  birdeye/  deriverse/  genievirtualtalk/  chainstellar/  aceagent/',
      },
      { type: 'input', content: 'clear', delay: 1500 },
    ];

    let currentLineIndex = 0;

    const typeCharacter = (text, index, callback) => {
      if (!isMounted) return;
      if (index <= text.length) {
        setCurrentInput(text.slice(0, index));
        const speed = Math.random() * 40 + 30;
        setTimeout(() => typeCharacter(text, index + 1, callback), speed);
      } else {
        setTimeout(callback, 300);
      }
    };

    const runTerminal = () => {
      if (!isMounted) return;
      setHasStarted(true);

      if (currentLineIndex < terminalData.length) {
        const line = terminalData[currentLineIndex];

        if (line.type === 'input') {
          typeCharacter(line.content, 0, () => {
            if (!isMounted) return;
            if (line.content === 'clear') {
              setLines([]);
            } else {
              setLines(prev => [...prev, line]);
            }
            setCurrentInput('');
            currentLineIndex++;
            runTerminal();
          });
        } else {
          const delay = line.delay || 500;
          setTimeout(() => {
            if (!isMounted) return;
            setLines(prev => [...prev, line]);
            currentLineIndex++;
            runTerminal();
          }, delay);
        }
      } else {
        if (isMounted) {
          setShowPrompt(true);
          setTimeout(() => {
            if (!isMounted) return;
            setLines([]);
            setShowPrompt(false);
            currentLineIndex = 0;
            runTerminal();
          }, 6000);
        }
      }
    };

    // Delay start slightly for entrance animation
    const startTimeout = setTimeout(() => {
      runTerminal();
    }, 800);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, currentInput]);

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-4xl"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-blue/5 border border-accent-blue/20 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-text-muted uppercase tracking-widest">
              Available for Work
            </span>
          </div>
        </motion.div>

        {/* Terminal window */}
        <div className="bg-canvas/60 border border-border-subtle rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm dark:shadow-[0_0_80px_rgba(0,212,255,0.15)]">
          {/* Title bar */}
          <div className="bg-text-dim/[0.06] px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-500/60 hover:bg-green-500 transition-colors" />
            </div>
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
              murpheus@terminal
            </span>
            <div className="w-12" />
          </div>

          {/* Terminal body */}
          <div
            className="p-6 sm:p-8 font-mono text-sm overflow-y-auto"
            ref={containerRef}
            style={{ minHeight: '500px' }}
          >
            {/* ASCII art + tagline */}
            <div className="mb-8">
              <pre className="text-accent-blue font-bold leading-[1.15] mb-4 whitespace-pre overflow-x-auto text-[8px] sm:text-[10px] md:text-xs select-none">
                {ASCII_ART}
              </pre>

              <div className="text-accent-blue/60 text-xs mb-3 font-mono">
                {'// full-stack developer & digital architect'}
              </div>

              <p className="text-text-muted max-w-lg text-base leading-relaxed">
                I build systems that think, interfaces that move, and products that last.
              </p>
            </div>

            {/* Terminal lines */}
            <div className="space-y-1.5 mb-8">
              {lines.map((line, i) => (
                <div key={i}>
                  {line.type === 'input' ? (
                    <div className="flex gap-2 text-accent-blue">
                      <span className="text-accent-blue/60">❯</span>
                      <span>{line.content}</span>
                    </div>
                  ) : (
                    <div className="text-text-muted pl-5 border-l border-text-dim/10 ml-[5px]">
                      {line.content}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing cursor */}
              {!showPrompt && currentInput && (
                <div className="flex gap-2 text-accent-blue">
                  <span className="text-accent-blue/60">❯</span>
                  <span>{currentInput}</span>
                  <span className="w-2 h-5 bg-accent-blue animate-pulse" />
                </div>
              )}

              {/* Initial cursor before typing starts */}
              {!showPrompt && !currentInput && lines.length === 0 && hasStarted && (
                <div className="flex gap-2 text-accent-blue">
                  <span className="text-accent-blue/60">❯</span>
                  <span className="w-2 h-5 bg-accent-blue animate-pulse" />
                </div>
              )}

              {/* Idle prompt */}
              {showPrompt && (
                <div className="flex gap-2 text-accent-blue items-center">
                  <span className="text-accent-blue/60">❯</span>
                  <span className="w-2 h-5 bg-accent-blue animate-pulse" />
                </div>
              )}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="px-6 py-2.5 bg-accent-blue text-canvas font-bold rounded-lg hover:bg-white transition-all duration-300 text-sm hover:shadow-lg hover:shadow-accent-blue/20"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 border border-accent-blue/40 text-accent-blue font-bold rounded-lg hover:bg-accent-blue/10 transition-all duration-300 text-sm"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TerminalHero;
