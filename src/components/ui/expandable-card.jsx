"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  ...props
}) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef(null);
  const id = React.useId();

  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setActive(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    if (active) {
       document.body.style.overflow = "hidden";
    } else {
       document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [active]);

  const expandAnimation = (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#020202]/95 h-full w-full z-[99999]"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100000] p-4 sm:p-auto pointer-events-none">
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className={cn(
                "w-full sm:w-[95%] max-w-4xl h-[85vh] flex flex-col overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl rounded-2xl pointer-events-auto",
                classNameExpanded,
              )}
              {...props}
            >
              <div className="relative w-full h-56 md:h-72 shrink-0 overflow-hidden bg-[#050505]">
                  <motion.div layoutId={`image-${title}-${id}`} className="absolute inset-0">
                    <img
                      src={src}
                      alt={title}
                      className="w-full h-full object-cover filter grayscale opacity-40 mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
                  </motion.div>
                  
                  {/* Expanded Header Overlapping Bottom of Image */}
                  <div className="absolute bottom-6 left-6 md:left-10 z-20 pr-20">
                      <motion.p
                        layoutId={`description-${description}-${id}`}
                        className="text-[#c8b598]/70 text-[0.65rem] md:text-xs uppercase tracking-widest font-mono mb-2 md:mb-3 flex items-center gap-3"
                      >
                        <span className="w-8 h-px bg-[#c8b598]/40 block"></span>
                        {description}
                      </motion.p>
                      <motion.h3
                        layoutId={`title-${title}-${id}`}
                        className="font-light text-white tracking-tight text-3xl md:text-5xl"
                      >
                        {title}
                      </motion.h3>
                  </div>

                  <motion.button
                    aria-label="Close card"
                    layoutId={`button-${title}-${id}`}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                    onClick={() => setActive(false)}
                  >
                     <X size={18} strokeWidth={1.5} />
                  </motion.button>
              </div>

              {/* Scrolling Content Area Inside Fixed Window */}
              <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 md:py-10 bg-[#0a0a0a]">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-white/60 text-base lg:text-lg leading-relaxed font-light flex flex-col gap-6 max-w-3xl"
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {typeof document !== "undefined" ? createPortal(expandAnimation, document.body) : expandAnimation}

      <motion.div
        role="dialog"
        aria-labelledby={`card-title-${id}`}
        aria-modal="true"
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        className={cn(
          "group/card flex flex-col md:flex-row bg-[#080808] cursor-pointer border border-white/10 hover:border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden relative rounded-xl w-full",
          className,
        )}
      >
        <motion.div layoutId={`image-${title}-${id}`} className="shrink-0 relative w-full md:w-56 h-48 md:h-auto overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover object-center filter grayscale opacity-40 group-hover/card:opacity-90 group-hover/card:scale-105 transition-all duration-700"
          />
        </motion.div>
        
        <div className="flex flex-col justify-center p-6 md:p-10 w-full relative z-20">
          <motion.p
            layoutId={`description-${description}-${id}`}
            className="text-[#c8b598]/60 text-[0.65rem] tracking-[0.2em] uppercase font-medium mb-3 flex items-center gap-3"
          >
            <span className="w-4 h-px bg-[#c8b598]/30 block"></span>
            {description}
          </motion.p>
          <motion.h3
            layoutId={`title-${title}-${id}`}
            className="text-white text-2xl lg:text-3xl font-light tracking-tight group-hover/card:text-[#c8b598] transition-colors duration-700"
          >
            {title}
          </motion.h3>
          
          <div className="mt-8 flex items-center gap-2 overflow-hidden w-fit">
              <span className="text-[#c8b598]/50 text-xs tracking-widest uppercase font-mono group-hover/card:text-[#c8b598] transition-colors duration-500">
                  Explore Module
              </span>
              <motion.div
                layoutId={`button-${title}-${id}`}
                className="w-0 overflow-hidden opacity-0 group-hover/card:w-5 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all duration-500 text-[#c8b598]"
              >
                  →
              </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
