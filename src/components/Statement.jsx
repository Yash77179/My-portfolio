import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Statement = () => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  const lines = [
    "IGNORE THE NOISE.",
    "DESIGN WITH INTENT.",
    "BUILD WITH PRECISION.",
    "MAKE IT MATTER."
  ];

  useGSAP(() => {
    // Reverted to the completely flawless, rock-solid opacity/blur text reveal
    gsap.fromTo(
      wordsRef.current,
      { 
        opacity: 0.05, 
        y: 20,
        filter: "blur(8px)",
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        ease: "none", 
        stagger: 0.2, 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom", 
          scrub: true, // Exact and snappy native scroll
        }
      }
    );
  }, { scope: containerRef });

  // Clear array on render
  wordsRef.current = [];
  const addWordRef = (el) => {
    if (el && !wordsRef.current.includes(el)) {
      wordsRef.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="w-full h-[250vh] relative bg-[#010101]" 
      id="statement-section"
      style={{ isolation: 'isolate' }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-4 md:px-12 overflow-hidden bg-[#010101]">
        
        {/* ========================================================
            LIMITLESS AESTHETIC: Pure Static Structural Void
            ======================================================== */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            {/* Extremely faint architectural static grid. Peak premium brutalism. */}
            <div 
              className="absolute inset-0 opacity-[0.02]" 
              style={{ 
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
                backgroundSize: '100px 100px',
                backgroundPosition: 'center center'
              }}
            />
            {/* Flawless static centerlines anchoring the void */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.03] -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.03] -translate-y-1/2"></div>

            {/* Dense film grain for supreme physical "static" texture */}
            <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>
            
            {/* Perfect framing vignette tightening the light entirely around the text */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#010101_85%)]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-transparent to-[#010101] opacity-90"></div>
            
            {/* Cinematic Static Viewport Brackets */}
            <div className="absolute inset-6 md:inset-10 border border-white/[0.03] pointer-events-none">
              <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#eaddce]/30"></div>
              <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#eaddce]/30"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#eaddce]/30"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#eaddce]/30"></div>
            </div>
        </div>

        {/* =======================
            CORE LAYOUT
            ======================= */}
        <div className="max-w-[1400px] w-full flex flex-col items-center justify-center relative z-10">
          
          <div 
            className="flex flex-col items-center justify-center text-center w-full"
            style={{ 
              fontFamily: "'Impact', 'Anton', sans-serif", 
              textTransform: "uppercase",
              fontWeight: 900,
              color: "#eaddce", // Flawless warm paper-white
              letterSpacing: "0.02em",
              lineHeight: 0.88,
              textShadow: "0 40px 80px rgba(0,0,0,0.9)" // Insane volumetric drop-shadow
            }}
          >
            {lines.map((line, lineIndex) => (
               <div 
                  key={lineIndex} 
                  className="flex flex-row justify-center overflow-visible w-full mb-2 md:mb-4" 
                  style={{ fontSize: "clamp(3.5rem, 11vw, 12rem)" }}
               >
                {line.split(" ").map((word, wordIndex) => (
                  <span 
                    key={`${lineIndex}-${wordIndex}`} 
                    ref={addWordRef} 
                    className="inline-block mx-[0.12em] relative"
                    style={{ willChange: 'opacity, filter, transform' }}
                  >
                    {word}
                    {/* The iconic hollow circle ornament, perfectly balanced and static */}
                    {lineIndex === 1 && word === "INTENT." && (
                      <span 
                        className="absolute hidden md:block w-[0.1em] h-[0.1em] rounded-full border-[1.5px]"
                        style={{ 
                          borderColor: "rgba(234, 221, 206, 0.4)", // Perfectly dim matching warm white
                          top: "-0.05em", 
                          right: "-0.35em",
                          backdropFilter: "blur(4px)" // Tiny glassmorphic touch
                        }}
                      />
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Statement;
