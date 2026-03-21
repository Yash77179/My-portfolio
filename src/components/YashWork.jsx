import { useCallback, useRef, useState, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const CARD_THEMES = [
  {
    bg: "linear-gradient(160deg, #08081a 0%, #0e1025 50%, #050510 100%)",
    accent: "#38bdf8",
    accentSoft: "rgba(56,189,248,0.08)",
  },
  {
    bg: "linear-gradient(160deg, #0a0614 0%, #150a20 50%, #060510 100%)",
    accent: "#c084fc",
    accentSoft: "rgba(192,132,252,0.08)",
  },
  {
    bg: "linear-gradient(160deg, #0a1410 0%, #0c1e18 50%, #050a08 100%)",
    accent: "#34d399",
    accentSoft: "rgba(52,211,153,0.08)",
  },
];

const ENHANCED_PROJECTS = projects.map((p, i) => ({
  ...p,
  number: String(i + 1).padStart(2, "0"),
  theme: CARD_THEMES[i % CARD_THEMES.length],
}));

// Memoized card to prevent re-renders from hover state leaking
const ProjectCard = memo(function ProjectCard({ project, index, titleRef, infoRef }) {
  return (
    <div
      className="relative w-screen h-screen shrink-0 overflow-hidden flex flex-col justify-end"
      style={{ contain: "layout style paint" }}
    >
      {/* Solid gradient background — zero images, zero lag */}
      <div className="absolute inset-0" style={{ background: project.theme.bg }} />

      {/* Bottom accent glow */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "40%",
          background: `linear-gradient(to top, ${project.theme.accentSoft} 0%, transparent 100%)`,
        }}
      />

      {/* Card number */}
      <div
        className="absolute top-12 right-12 lg:top-20 lg:right-20 font-light tracking-widest text-white/[0.06]"
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)", zIndex: 1 }}
      >
        {project.number}
      </div>

      {/* Content area */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-10 md:pb-16 lg:pb-20">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-light tracking-tight leading-[0.9] mb-8"
          style={{
            fontSize: "clamp(3rem, 9vw, 7.5rem)",
            background: `linear-gradient(180deg, #ffffff 30%, ${project.theme.accent}90 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {project.title}
        </h2>

        {/* Info bar */}
        <div
          ref={infoRef}
          className="flex flex-col md:flex-row justify-between items-start md:items-end w-full max-w-7xl border-t pt-6 md:pt-8"
          style={{ borderColor: `${project.theme.accent}20` }}
        >
          <div className="max-w-2xl">
            <p className="text-lg md:text-xl text-white/80 mb-3 font-light tracking-tight leading-relaxed">
              {project.summary}
            </p>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: project.theme.accent,
                  boxShadow: `0 0 6px ${project.theme.accent}`,
                }}
              />
              <p className="text-sm text-white/40">{project.result}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[0.6rem] uppercase tracking-[0.2em] text-white/40"
                  style={{
                    border: `1px solid ${project.theme.accent}20`,
                    backgroundColor: `${project.theme.accent}08`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-0 shrink-0">
            <button
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black transition-colors duration-400"
            >
              <div className="flex flex-col items-start">
                <span className="text-[0.6rem] uppercase tracking-[0.2em] leading-none mb-0.5">View</span>
                <span className="text-[0.6rem] uppercase tracking-[0.2em] leading-none">Case Study</span>
              </div>
              <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </button>
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

  useGSAP(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      titleRefs.current.forEach((t) => {
        if (t) gsap.set(t, { opacity: 1 });
      });
      infoRefs.current.forEach((info) => {
        if (info) gsap.set(info, { opacity: 1 });
      });
      return;
    }

    const numCards = ENHANCED_PROJECTS.length;
    const isMobile = window.innerWidth < 768;
    const totalTravel = (numCards - 1) * window.innerWidth;

    titleRefs.current.forEach((title, i) => {
      if (!title) return;
      gsap.set(title, { yPercent: i === 0 ? 0 : 25, opacity: i === 0 ? 1 : 0 });
    });
    infoRefs.current.forEach((info, i) => {
      if (!info) return;
      gsap.set(info, { yPercent: i === 0 ? 0 : 15, opacity: i === 0 ? 1 : 0 });
    });

    const startDwell = isMobile ? 0.05 : 0.10;
    const moveFraction = isMobile ? 0.90 : 0.80;
    const endDwell = 1 - startDwell - moveFraction;
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

    tl.to({}, { duration: startDwell }, 0);
    tl.to(track, { x: -totalTravel, ease: "none", duration: moveFraction }, startDwell);
    tl.to({}, { duration: endDwell }, startDwell + moveFraction);

    for (let i = 1; i < numCards; i++) {
      const title = titleRefs.current[i];
      const info = infoRefs.current[i];
      const entryProgress = startDwell + (i - 0.6) / (numCards - 1) * moveFraction;

      if (title) {
        tl.to(title, { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.15 }, entryProgress);
      }
      if (info) {
        tl.to(info, { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.2 }, entryProgress + 0.04);
      }
    }

    // Velocity-based skew
    ScrollTrigger.create({
      id: "yash-work-skew",
      trigger: section,
      start: "top top",
      end: `+=${pinTotal}`,
      onUpdate(self) {
        const v = self.getVelocity() / 6000;
        gsap.to(track, {
          skewX: Math.max(-2, Math.min(2, v * -2)),
          ease: "power4.out",
          duration: 0.8,
          overwrite: "auto",
        });
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getById("yash-work-skew")?.kill();
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden relative"
      id="projects-gallery"
      style={{ height: "100vh", position: "relative", background: "#030303" }}
    >
      {/* Section label - Placed horizontally below the Navbar/Logo */}
      <div className="absolute top-28 left-6 md:left-12 lg:left-16 z-20">
        <div className="flex items-center gap-4">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/50 font-light">Selected Work</p>
          <span className="h-px w-12 bg-white/20" />
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex"
        style={{ height: "100vh", width: "max-content", willChange: "transform" }}
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
