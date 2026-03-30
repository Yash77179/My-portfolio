import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Features } from '@/components/ui/features-10';
import OverlayShadwayGallery from '@/components/OverlayShadwayGallery';

const LOREM_IPSUM = [
  "From the onset, the ambition was clear: craft an experience that transcends utility. We deconstructed the core user journey, removing friction points to unearth a seamless flow. It wasn't just about placing elements on a screen; it was about orchestrating a rhythmic interaction between the user and the system.",
  "Through rigorous prototyping and numerous iterations, we landed on a visual language that speaks in whispers rather than shouts. The typography was selected to provide maximum legibility while maintaining a sophisticated, editorial aura. Every micro-interaction is deliberately tuned to offer tactile, instant feedback.",
  "The technical architecture mirrors the design's elegance. By decoupling the presentation layer and utilizing a headless approach, performance is snappy. Animations are hardware-accelerated, ensuring that the visual narrative flows like a cinematic sequence, completely uninterrupted."
];

function PremiumProjectContent({
  project,
  index,
  onNavigate,
  animateIn,
  totalProjects
}) {
  const contentRef = useRef(null);
  const heroTextRef = useRef(null);
  const hasAnimated = useRef(false);

  const prevIndex = index > 0 ? index - 1 : null;
  const nextIndex = index < totalProjects - 1 ? index + 1 : null;

  useEffect(() => {
    if (!animateIn || hasAnimated.current) return;
    hasAnimated.current = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (contentRef.current) gsap.set(contentRef.current.querySelectorAll("[data-reveal]"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Hero text massive entrance
      gsap.fromTo(
        heroTextRef.current.querySelectorAll('.hero-anim'),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.1, delay: 0.4 }
      );

      // Scroll content entrance
      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll("[data-reveal]");
        gsap.fromTo(items,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.6 }
        );
      }
    });

    return () => ctx.revert();
  }, [animateIn]);

  return (
    <div style={{ opacity: animateIn ? 1 : 0, transition: "opacity 0.6s ease" }} className="w-full bg-black min-h-screen text-white">

      {/* ── Premium Hero Area ── */}
      <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden flex flex-col justify-end bg-black">
        {/* Deep immersive image */}
        <div className="absolute inset-0 w-full h-full scale-[1.03] origin-center">
          <img
            src={project.image || `https://picsum.photos/1920/1080?random=${index + 99}`}
            alt={project.title}
            className="w-full h-full object-cover opacity-70"
          />
        </div>

        {/* Signature Yash gradient to top */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 100%)" }} />
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)" }} />

        {/* Ambient massive number background */}
        <div className="absolute bottom-10 right-10 z-0 pointer-events-none select-none text-white/5 font-light" style={{ fontSize: "clamp(12rem, 30vw, 25rem)", lineHeight: 0.75, letterSpacing: "-0.05em" }}>
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Hero Title & Info */}
        <div ref={heroTextRef} className="relative z-20 w-full px-6 md:px-16 lg:px-24 pb-16 md:pb-24 max-w-7xl">
          <div className="overflow-hidden mb-6">
            <h1 className="hero-anim font-light tracking-tight text-white leading-[0.9]" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}>
              {project.title}
            </h1>
          </div>

          <div className="overflow-hidden">
            <div className="hero-anim flex flex-col md:flex-row md:items-start lg:items-center gap-8 md:gap-12 mt-8">
              <div className="flex flex-col gap-6 shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
                    <p className="text-sm tracking-[0.2em] text-white/70 uppercase">Design & Engineering</p>
                  </div>
                  {project.link && (
                     <a 
                       href={project.link} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="pointer-events-auto inline-flex items-center justify-center gap-4 px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white hover:border-white/40 text-[0.65rem] font-semibold tracking-[0.25em] uppercase transition-all duration-300 group w-max"
                     >
                         <span>{project.title.toLowerCase().includes('exanor') ? 'View on Play Store' : 'Launch Project'}</span>
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                             <path d="M7 17L17 7M17 7H7M17 7V17" />
                         </svg>
                     </a>
                  )}
              </div>
              
              <div className="hidden lg:block w-12 h-px bg-white/20" />
              <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 max-w-xl leading-relaxed">
                {project.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fluid Editorial Content ── */}
      <div ref={contentRef} id="premium-content" className="w-full relative z-20 bg-black">
        <div className="w-full mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 max-w-[120rem]">

          <div data-reveal className="w-full relative">
            <h3 className="text-[0.65rem] uppercase tracking-[0.4em] text-white/40 mb-12 flex items-center gap-6">
              <span className="w-12 h-px bg-white/20"></span>
              Project Overview
            </h3>

            <Features project={project} />
          </div>

        </div>

        {/* ── Shadway 3D Photo Gallery ── */}
        <div className="w-full">
          <div className="w-full px-6 md:px-12 lg:px-16 max-w-[120rem] mx-auto mb-6">
            <h3 className="text-[0.65rem] uppercase tracking-[0.4em] text-white/40 flex items-center gap-6">
              <span className="w-12 h-px bg-white/20"></span>
              Screenshots
            </h3>
          </div>
          <OverlayShadwayGallery project={project} />
        </div>

        {/* ── Immersive Visual Gallery ── */}
        <div className="w-full pb-32 md:pb-48">
          <div data-reveal className="w-full px-6 md:px-16 lg:px-24 mb-12 md:mb-16">
            <div className="w-full relative overflow-hidden bg-[#050505] border border-white/10 group hover:border-white/20 hover:bg-white/[0.02] transition-colors duration-700">
              <CardDecorator />
              {project.galleryVideo ? (
                <div className="w-full aspect-video flex items-center justify-center bg-black">
                  <video
                    src={project.galleryVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain opacity-100"
                  />
                </div>
              ) : (
                <div className="w-full h-[60vh] md:h-[80vh]">
                  <img
                    src={`https://picsum.photos/1920/1080?random=${index + 100}`}
                    alt="Full showcase"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-[1.02]"
                  />
                </div>
              )}
            </div>
          </div>


          <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-16 lg:px-24">
            {/* Left Media (Video 2 or Image) */}
            <div className="w-full h-[60vh] md:h-[70vh] lg:h-[85vh] relative overflow-hidden bg-[#050505] border border-white/10 group shadow-2xl flex items-center justify-center p-6 md:p-8 lg:p-10 transition-colors duration-700 hover:border-white/20 hover:bg-white/[0.02]">
              <CardDecorator />
              <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              
              {project.galleryVideo2 ? (
                <video
                  src={project.galleryVideo2}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-auto max-w-full object-contain shadow-[0_20px_80px_rgba(0,0,0,0.8)] border border-white/10 transition-transform duration-1000 group-hover:scale-[1.02]"
                />
              ) : (
                <img
                  src={`https://picsum.photos/1000/1200?random=${index + 200}`}
                  alt="Detail view 1"
                  className="h-full w-full object-cover border border-white/10 opacity-90 transition-transform duration-1000 group-hover:scale-[1.02]"
                />
              )}
            </div>

            {/* Right Media (Video 3 or Image) */}
            <div className="w-full h-[60vh] md:h-[70vh] lg:h-[85vh] relative overflow-hidden bg-[#050505] border border-white/10 group shadow-2xl flex items-center justify-center p-6 md:p-8 lg:p-10 transition-colors duration-700 hover:border-white/20 hover:bg-white/[0.02]">
              <CardDecorator />
              <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              {project.galleryVideo3 ? (
                <video
                  src={project.galleryVideo3}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-auto max-w-full object-contain shadow-[0_20px_80px_rgba(0,0,0,0.8)] border border-white/10 transition-transform duration-1000 group-hover:scale-[1.02]"
                />
              ) : (
                <img
                  src={`https://picsum.photos/1000/1200?random=${index + 300}`}
                  alt="Detail view 2"
                  className="h-full w-full object-cover border border-white/10 opacity-90 transition-transform duration-1000 group-hover:scale-[1.02]"
                />
              )}
            </div>
          </div>
        </div>

        {/* ── Majestic Navigation Footer ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[40vh] border-t border-white/10 bg-[#050505]">
          {/* Previous Slot */}
          <div
            data-reveal
            className={`relative flex flex-col items-center justify-center p-12 group transition-all duration-700 ${prevIndex !== null ? 'cursor-pointer hover:bg-white/[0.03]' : 'opacity-10 cursor-default'}`}
            onClick={() => prevIndex !== null && onNavigate(prevIndex)}
          >
            {prevIndex !== null && (
              <>
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/40 mb-4 group-hover:text-white transition-colors duration-500">Back Project</p>
                <h4 className="text-3xl md:text-5xl font-light tracking-tight text-white/40 group-hover:text-white transition-colors duration-500">
                  {String(prevIndex + 1).padStart(2, '0')}
                </h4>
                <div className="mt-8 transform -rotate-180 group-hover:-translate-x-2 transition-transform duration-500 text-white/20 group-hover:text-white">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                  </svg>
                </div>
              </>
            )}
          </div>

          {/* Next Slot */}
          <div
            data-reveal
            className={`relative flex flex-col items-center justify-center p-12 group border-t md:border-t-0 md:border-l border-white/10 transition-all duration-700 ${nextIndex !== null ? 'cursor-pointer hover:bg-white/[0.03]' : 'opacity-10 cursor-default'}`}
            onClick={() => nextIndex !== null && onNavigate(nextIndex)}
          >
            {nextIndex !== null && (
              <>
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/40 mb-4 group-hover:text-white transition-colors duration-500">Next Project</p>
                <h4 className="text-3xl md:text-5xl font-light tracking-tight text-white/40 group-hover:text-white transition-colors duration-500">
                  {String(nextIndex + 1).padStart(2, '0')}
                </h4>
                <div className="mt-8 group-hover:translate-x-2 transition-transform duration-500 text-white/20 group-hover:text-white">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

const CardDecorator = () => (
    <>
        <span className="border-[#c8b598]/40 absolute -left-px -top-px block size-3 border-l-2 border-t-2 z-20 pointer-events-none"></span>
        <span className="border-[#c8b598]/40 absolute -right-px -top-px block size-3 border-r-2 border-t-2 z-20 pointer-events-none"></span>
        <span className="border-[#c8b598]/40 absolute -bottom-px -left-px block size-3 border-b-2 border-l-2 z-20 pointer-events-none"></span>
        <span className="border-[#c8b598]/40 absolute -bottom-px -right-px block size-3 border-b-2 border-r-2 z-20 pointer-events-none"></span>
    </>
);

// ─── Overlay shell ───

export default function ProjectOverlay({
  activeProjectIndex,
  onClose,
  projects,
}) {
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [isInDom, setIsInDom] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(null);
  const isClosingRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeProjectIndex === null || isClosingRef.current) return;
    setDisplayedIndex(activeProjectIndex);
    setIsInDom(true);
  }, [activeProjectIndex]);

  useEffect(() => {
    if (!isInDom || !overlayRef.current) return;

    // Prevent body completely
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Disable lenis
    document.documentElement.setAttribute('data-lenis-prevent', 'true');

    // Dramatic cinematic open from bottom
    gsap.fromTo(
      overlayRef.current,
      {
        autoAlpha: 1,
        yPercent: 100,
        scale: 0.9,
        borderRadius: "40px",
        transformOrigin: "bottom center"
      },
      {
        yPercent: 0,
        scale: 1,
        borderRadius: "0px",
        duration: 1.2,
        ease: "expo.inOut"
      }
    );

    if (closeBtnRef.current) {
      gsap.fromTo(
        closeBtnRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );
    }
  }, [isInDom]);

  useEffect(() => {
    if (overlayRef.current && displayedIndex !== null) {
      overlayRef.current.scrollTop = 0;
    }
  }, [displayedIndex]);

  function doClose() {
    if (isClosingRef.current || !overlayRef.current) return;
    isClosingRef.current = true;
    gsap.killTweensOf(overlayRef.current);
    if (closeBtnRef.current) {
      gsap.to(closeBtnRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power3.in"
      });
    }

    gsap.to(overlayRef.current, {
      yPercent: 100,
      scale: 0.9,
      borderRadius: "40px",
      duration: 1.0,
      ease: "power4.inOut",
      onComplete: () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.removeAttribute('data-lenis-prevent');
        isClosingRef.current = false;
        setIsInDom(false);
        setDisplayedIndex(null);
        if (onClose) onClose();
      },
    });
  }

  if (!isInDom || !mounted) return null;

  const project = displayedIndex !== null ? projects[displayedIndex] : null;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 99998 }}>
      <div
        ref={overlayRef}
        className="project-overlay pointer-events-auto"
        data-lenis-prevent="true"
        onScroll={(e) => {
          const content = document.getElementById('premium-content');
          if (content) {
            const rect = content.getBoundingClientRect();
            const triggerOffset = window.innerHeight * 0.4;
            const scrolled = Math.max(0, triggerOffset - rect.top);
            const total = rect.height - window.innerHeight * 0.4;
            const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
            const track = document.getElementById('comet-track');
            if (track) {
              track.style.height = `${p * 100}%`;
            }
          }
        }}
        style={{
          opacity: 0,
          visibility: "hidden", // Completely physically prevents stutter in frame 1 before GSAP kicks in
          position: "absolute",
          inset: 0,
          background: "#030303",
          overflowY: "auto",
          overflowX: "hidden",
          overscrollBehavior: "contain",
          transformOrigin: "bottom center",
          cursor: "none"
        }}
      >
        {project && (
          <PremiumProjectContent
            key={displayedIndex}
            index={displayedIndex}
            totalProjects={projects.length}
            project={project}
            onNavigate={(newIndex) => { setDisplayedIndex(newIndex); }}
            animateIn={true}
          />
        )}
      </div>

      {/* ── Fixed Pinned Close Button (Outside Animated Parent) ── */}
      <div className="pointer-events-auto">
        <button
          ref={closeBtnRef}
          onClick={doClose}
          style={{ opacity: 0, transform: "scale(0.8)", position: "fixed", top: "2rem", right: "2rem", zIndex: 99999, cursor: "none" }}
          className="flex items-center gap-4 px-8 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 backdrop-blur-2xl transition-all duration-300 group active:scale-95"
        >
          <span className="text-[0.7rem] uppercase tracking-[0.25em] font-medium text-white/50 group-hover:text-white transition-colors">Close</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/40 group-hover:text-white transition-colors">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
}
