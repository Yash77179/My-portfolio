import { useCallback, useRef, useState, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const ENHANCED_PROJECTS = projects.map((p, i) => ({
  ...p,
  number: String(i + 1).padStart(2, "0"),
}));

const ProjectCard = memo(function ProjectCard({ project, index, titleRef, infoRef }) {
  return (
    <div
      className="relative w-screen h-screen shrink-0 overflow-hidden flex flex-col justify-end bg-black"
      style={{ contain: "layout style paint" }}
    >
      {/* Background Image - Picsum for placeholder */}
      <img
        src={`https://picsum.photos/1920/1080?random=${index + 42}`}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover scale-[1.02] opacity-80"
        style={{ transform: "translateZ(0)" }}
      />

      {/* Elegant Gradient Overlays for Readability */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Massive Background Number */}
      <div
        className="absolute -top-10 -left-10 md:top-4 md:left-4 lg:top-12 lg:left-12 font-light tracking-tighter text-white z-0 select-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 20vw, 18rem)", lineHeight: 0.8, opacity: 0.04 }}
      >
        {project.number}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-12 md:pb-20 lg:pb-24 flex flex-col h-full justify-end">
        <div className="max-w-5xl">
          <h2
            ref={titleRef}
            className="font-light tracking-tight leading-[0.9] mb-8 text-white"
            style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
          >
            {project.title}
          </h2>

          <div ref={infoRef} className="flex flex-col gap-6">
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light tracking-wide leading-relaxed max-w-3xl">
              {project.summary}
            </p>

            <div className="flex items-center gap-4 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
              <p className="text-sm md:text-base text-white/70 font-medium tracking-wide uppercase">{project.result}</p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="px-5 py-2 rounded-full text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-white/90 bg-black/40"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigational Arrow at Exact Bottom Right Corner */}
      <div className="absolute right-8 bottom-12 md:right-16 md:bottom-20 z-20 flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-pointer pointer-events-none hidden md:flex">
        <span className="text-[0.6rem] uppercase tracking-[0.4em] font-light text-white rotate-90 translate-y-4">Next</span>
        <svg 
          width="50" 
          height="50" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="1" 
          className="mt-6"
        >
          <path d="M5 12H19M19 12L12 5M19 12L12 19" />
        </svg>
      </div>
    </div>
  );
});

export default function YashWork() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const titleRefs = useRef([]);
  const infoRefs = useRef([]);

  useGSAP(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      titleRefs.current.forEach((t) => { if (t) gsap.set(t, { opacity: 1 }); });
      infoRefs.current.forEach((info) => { if (info) gsap.set(info, { opacity: 1 }); });
      return;
    }

    const numCards = ENHANCED_PROJECTS.length;
    const isMobile = window.innerWidth < 768;
    const totalTravel = (numCards - 1) * window.innerWidth;

    titleRefs.current.forEach((title, i) => {
      if (!title) return;
      gsap.set(title, { yPercent: i === 0 ? 0 : 40, opacity: i === 0 ? 1 : 0 });
    });
    infoRefs.current.forEach((info, i) => {
      if (!info) return;
      gsap.set(info, { yPercent: i === 0 ? 0 : 30, opacity: i === 0 ? 1 : 0 });
    });

    const moveFraction = 0.85;
    const pinTotal = totalTravel / moveFraction;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${pinTotal}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(track, { x: -totalTravel, ease: "none", duration: 1 }, 0);

    for (let i = 1; i < numCards; i++) {
      const title = titleRefs.current[i];
      const info = infoRefs.current[i];
      const entryProgress = (i - 0.6) / (numCards - 1);

      if (title) {
        tl.to(title, { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.25 }, entryProgress);
      }
      if (info) {
        tl.to(info, { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.25 }, entryProgress + 0.05);
      }
    }

    return () => {
      tl.kill();
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden relative bg-black"
      id="projects-gallery"
      style={{ height: "100vh" }}
    >
      {/* Top Left Label */}
      <div className="absolute top-10 left-6 md:top-14 md:left-16 z-30 mix-blend-difference pointer-events-none">
        <div className="flex items-center gap-6">
          <p className="text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.4em] text-white/70 font-light">Selected Work</p>
          <span className="h-px w-12 md:w-20 bg-white/30" />
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex h-full w-max will-change-transform"
      >
        {ENHANCED_PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            titleRef={(el) => { if (el) titleRefs.current[i] = el; }}
            infoRef={(el) => { if (el) infoRefs.current[i] = el; }}
          />
        ))}
      </div>
    </section>
  );
}
