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
    // Perfectly tuned sequential scrub for each word
    gsap.fromTo(
      wordsRef.current,
      { opacity: 0.1 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.2, // increased stagger for sharper sequential pop
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom", // Scrubs through the entire 250vh height
          scrub: true,
          // Removed `pin: true` to prevent breaking Framer Motion offsets in the next section.
          // Using CSS `sticky` below instead.
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
      className="w-full bg-[#050505] h-[250vh]" // Tall container for scroll distance
      id="statement-section"
      style={{ isolation: 'isolate' }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-4 md:px-12 overflow-hidden">
        <div className="max-w-[1400px] w-full flex flex-col items-center justify-center">
          <div 
            className="flex flex-col items-center justify-center text-center"
            style={{ 
              fontFamily: "'Impact', 'Anton', sans-serif", 
              textTransform: "uppercase",
              fontWeight: 900,
              color: "#eaddce", // The warm paper-white
              letterSpacing: "0.01em",
              lineHeight: 0.9,
            }}
          >
            {lines.map((line, lineIndex) => (
               <div 
                  key={lineIndex} 
                  className="flex flex-row justify-center overflow-visible w-full" 
                  style={{ fontSize: "clamp(3.5rem, 11vw, 12rem)" }}
               >
                {line.split(" ").map((word, wordIndex) => (
                  <span 
                    key={`${lineIndex}-${wordIndex}`} 
                    ref={addWordRef}
                    className="inline-block mx-[0.15em] relative"
                    style={{ willChange: 'opacity' }}
                  >
                    {word}
                    {/* The specific hollow circle floating ornament near "WITH" on line 2 */}
                    {lineIndex === 1 && word === "INTENT." && (
                      <span 
                        className="absolute hidden md:block w-[0.15em] h-[0.15em] rounded-full border-[2px] md:border-[3px]"
                        style={{ 
                          borderColor: "#eaddce", 
                          top: "-0.1em", 
                          right: "-0.45em",
                          opacity: 0.6 
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
