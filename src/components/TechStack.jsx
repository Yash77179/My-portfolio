import React, { useRef } from "react";
import { LogoCloud } from "./ui/logo-cloud-2";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const containerRef = useRef(null);
  
  const techLogos = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg", alt: "MySQL" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg", alt: "MongoDB" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg", alt: "Flutter" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", alt: "React" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", alt: "TypeScript" },
    { src: "https://svgl.app/library/expressjs.svg", alt: "Express", invert: true },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg", alt: "PostgreSQL" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", alt: "C++" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", alt: "Python" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg", alt: "C" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", alt: "Java" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", alt: "Firebase" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", alt: "Git" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg", alt: "GitHub", invert: true },
  ];

  useGSAP(() => {
    // Pin the visual component, letting the document flow continue. 
    // We increase the 'end' heavily because we need it to stay locked while the invisible spacer (and the Tablet) slide over it.
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=300%", // Stay pinned for a long time
      pin: true,
      pinSpacing: false, // Essential for overlapping curtain effect
      scrub: 1,
    });
  }, { scope: containerRef });

  return (
    <>
      <div 
        ref={containerRef} 
        className="w-full h-screen bg-black flex flex-col justify-center relative overflow-hidden" 
        id="tech-stack"
      >
        {/* Essential Film Grain only - No blue orbs, pure black aesthetic */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay z-0" />
        
        {/* Subtle top/bottom fading only to blend with adjacent dark blocks */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#010101] to-transparent pointer-events-none z-0" />
        
        <section className="relative flex w-full z-10 mx-auto justify-center">
            
            {/* Extreme Editorial Typography Layout */}
            <div className="w-full flex justify-center items-center mb-16 md:mb-24 z-10 relative px-4">
                
                <div className="flex flex-col relative w-fit mr-12 md:mr-24 lg:mr-32">
                    
                    {/* Massive Background Number Motif aligned with text flow */}
                    <span className="text-[14rem] md:text-[20rem] lg:text-[28rem] font-bold text-white/5 leading-none absolute -top-12 md:-top-20 lg:-top-32 -left-6 md:-left-12 lg:-left-20 select-none z-0 pointer-events-none tracking-tighter">
                        01
                    </span>

                    <span className="text-[0.65rem] lg:text-sm uppercase tracking-[0.5em] text-[#c8b598]/80 font-medium mb-6 relative z-10 ml-1">
                        Core Architecture
                    </span>

                    <h2 className="text-white text-7xl md:text-[8rem] lg:text-[11rem] font-medium tracking-tighter leading-[0.85] relative z-10 text-left drop-shadow-2xl">
                        tech<br />
                        <span className="font-serif italic font-light opacity-90 pl-16 md:pl-28 lg:pl-44 text-white/80 tracking-normal">stack.</span>
                    </h2>
                </div>
            </div>
            
            {/* The Logo Grid - Stretches perfectly edge to edge */}
            <LogoCloud logos={techLogos} className="w-full border-y border-white/[0.05] bg-black" />
            
        </section>
      </div>

      {/* 
        MAGIC SCROLL PAUSE:
        Because pinSpacing is false, this invisible div immediately slides into view when TechStack pins.
        Since it's transparent, it creates a visual "pause" where the user can scroll for 120vh admiring the TechStack 
        *before* the Tablet section comes up to overlap it!
      */}
      <div className="w-full h-[120vh] bg-transparent pointer-events-none" />
    </>
  );
}
