import { useCallback, useRef, useState, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../data/portfolioData";
import ProjectOverlay from "./ProjectOverlay";

gsap.registerPlugin(ScrollTrigger);

const ENHANCED_PROJECTS = projects.map((p, i) => ({
  ...p,
  number: String(i + 1).padStart(2, "0"),
}));

const ProjectCard = memo(function ProjectCard({ project, index, titleRef, infoRef, onClick }) {
  return (
    <div
      onClick={() => onClick(index)}
      className="relative w-screen h-[100dvh] shrink-0 overflow-hidden flex flex-col justify-center items-center bg-[#020202] cursor-pointer px-1 py-4 md:p-8 lg:p-12 pb-24"
      style={{ contain: "layout style paint" }}
    >
      <div className="relative w-full h-full overflow-hidden border border-white/10 flex flex-col justify-end bg-black group md:rounded-none rounded-sm transition-colors duration-700 hover:border-white/20">
        
        {/* Corner Decorators */}
        <span className="border-[#c8b598]/60 absolute -left-px -top-px block size-4 md:size-6 border-l-2 border-t-2 z-20 pointer-events-none"></span>
        <span className="border-[#c8b598]/60 absolute -right-px -top-px block size-4 md:size-6 border-r-2 border-t-2 z-20 pointer-events-none"></span>
        <span className="border-[#c8b598]/60 absolute -bottom-px -left-px block size-4 md:size-6 border-b-2 border-l-2 z-20 pointer-events-none"></span>
        <span className="border-[#c8b598]/60 absolute -bottom-px -right-px block size-4 md:size-6 border-b-2 border-r-2 z-20 pointer-events-none"></span>

        {/* Background Image */}
        <img
          src={project.image || `https://picsum.photos/1920/1080?random=${index + 42}`}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-[1.02]"
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
          style={{ fontSize: "clamp(6rem, 15vw, 14rem)", lineHeight: 0.8, opacity: 0.04 }}
        >
          {project.number}
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 pb-10 md:pb-16 lg:pb-20 flex flex-col h-full justify-end pointer-events-none">
          <div className="max-w-5xl pointer-events-auto">
            <h2
              ref={titleRef}
              className="font-light tracking-tight leading-[0.9] mb-6 md:mb-8 text-white relative lg:-left-2"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              {project.title}
            </h2>

            <div ref={infoRef} className="flex flex-col gap-6">
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-light tracking-wide leading-relaxed max-w-3xl">
                {project.summary}
              </p>

              <div className="flex items-center gap-4 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
                <p className="text-[0.7rem] md:text-xs text-white/70 font-medium tracking-[0.1em] uppercase">{project.result}</p>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-6">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] text-white/90 bg-black/40"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function YashWork() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const titleRefs = useRef([]);
  const infoRefs = useRef([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

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
    const pinPadding = window.innerHeight * 0.4; // Adds extra scroll distance at start
    const pinTotal = totalTravel / moveFraction + pinPadding;

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

    // We use xPercent to mathematically guarantee it ends precisely on the last card, immune to screen resizing
    const xMovePercent = -100 * ((numCards - 1) / numCards);

    // Animate track (starts after 0.2 'delay' in scrub so it stays pinned temporarily)
    tl.to({}, { duration: 0.1 });
    tl.to(track, { xPercent: xMovePercent, ease: "none", duration: 0.9 }, 0.1);

    for (let i = 1; i < numCards; i++) {
      const title = titleRefs.current[i];
      const info = infoRefs.current[i];
      const entryProgress = (i - 0.6) / (numCards - 1) * 0.9 + 0.1;

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
      style={{ height: "100dvh", touchAction: "pan-y" }}
    >
      {/* Premium Architectural Header - Top Right (Safe Zone) */}
      <div className="absolute top-28 right-6 md:top-32 md:right-12 lg:right-16 z-30 pointer-events-none flex flex-col justify-start items-end text-right">
        {/* Ambient massive 03 background */}
        <div className="absolute top-[-10%] right-0 z-0 pointer-events-none select-none text-white/[0.03] font-light" style={{ fontSize: "clamp(12rem, 30vw, 35rem)", lineHeight: 0.75, letterSpacing: "-0.05em" }}>
            03
        </div>
        
        <div className="relative z-10 flex flex-col items-end pointer-events-none">
            <div className="flex items-center gap-4 mb-2 md:mb-4 pointer-events-none">
                <h3 className="text-[0.65rem] uppercase tracking-[0.4em] text-[#c8b598]/80 font-medium select-none">Portfolio</h3>
                <span className="w-12 h-px bg-[#c8b598]/50"></span>
            </div>
            <h2 className="text-white text-4xl md:text-6xl lg:text-[7rem] font-light tracking-tighter leading-[0.9] pointer-events-none select-none">
                Selected <br className="hidden md:block" /> <span className="font-serif italic text-white/40">Work</span>
            </h2>
        </div>
      </div>
      
      {/* Navigational Arrow restored at Bottom Right to instruct users to scroll vertically */}
      <div className="absolute right-6 bottom-6 md:right-12 md:bottom-10 lg:right-16 z-30 flex items-center gap-4 opacity-70 pointer-events-none mix-blend-difference">
        <span className="h-px w-8 md:w-16 bg-white/30" />
        <span className="text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.4em] font-light text-white/70 tracking-widest">Scroll</span>
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
            onClick={setActiveProjectIndex}
            titleRef={(el) => { if (el) titleRefs.current[i] = el; }}
            infoRef={(el) => { if (el) infoRefs.current[i] = el; }}
          />
        ))}
      </div>
      
      <ProjectOverlay 
        activeProjectIndex={activeProjectIndex} 
        onClose={() => setActiveProjectIndex(null)} 
        projects={ENHANCED_PROJECTS} 
      />
    </section>
  );
}
