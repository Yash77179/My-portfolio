import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import Silk from './Silk';
import Lanyard from './Lanyard';

const Hero = React.memo(({ isDesktop, isLoading }) => {
    const heroRef = useRef(null);
    const isInView = useInView(heroRef, { margin: "0px 0px 200px 0px" });

    return (
        <section id="home" ref={heroRef} className="w-screen h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full z-0" style={{ width: '100vw', height: '100dvh', background: '#000000' }}>
                <div className="w-full h-full opacity-60"> {/* Reduced opacity for subtleties */}
                    <Silk
                        color="#1B6A73" // Premium Bluish-Green (Deep Teal)
                        scale={1.2} // Zoomed in a little (decreased scale = larger waves)
                        speed={1.2}
                        noiseIntensity={1.0}
                        inView={isInView}
                    />
                </div>
            </div>
            
            {/* 3D Lanyard Interactive Element */}
            {/* The physics engine drag-math relies on the camera staying near [0,0,30].
                We zoom in by decreasing fov from 20 to 12, and shift it layout-wise via Tailwind translate! 
            */}
            <div className="absolute inset-0 z-70 w-full h-full pointer-events-none flex items-center justify-center overflow-visible">
                {/* CSS scale can artificially enlarge it without breaking internal ThreeJS math */}
                <div className="w-full h-full pointer-events-auto transform translate-x-[15vw] -translate-y-[2vh] lg:translate-x-[22vw] lg:-translate-y-[4vh] xl:-translate-y-[6vh]">
                    <Lanyard position={[0, 0, 30]} gravity={[0, -40, 0]} fov={11.5} transparent={true} inView={isInView} isLoading={isLoading} />
                </div>
            </div>

            {/* Hero Content Overlay */}
            <div className="relative z-50 px-4 md:px-6 py-8 md:py-12 w-full h-full flex flex-col justify-between pointer-events-none">
                {/* Left Side Editorial Aesthetic */}
                <div className="hidden lg:flex absolute top-[30%] xl:top-[35%] left-10 xl:left-20 flex-col pointer-events-none z-20 drop-shadow-lg">
                    {/* Minimalist Identity Badge */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center relative">
                            {/* Inner dot */}
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            {/* Rotating orbit */}
                            <svg className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white font-bold">Yash</span>
                            <span className="text-[0.5rem] uppercase tracking-[0.2em] text-white/50">Full Stack Dev</span>
                        </div>
                    </div>
                    
                    {/* Bold Editorial Typography */}
                    <h2 className="text-white text-5xl xl:text-[4rem] font-medium tracking-tighter leading-[0.9] -ml-1">
                        creative<br />
                        <span className="font-serif italic font-light opacity-90 pl-8 text-white/80">engineer.</span>
                    </h2>
                    
                    {/* Refined Description Statement */}
                    <p className="mt-8 text-[0.65rem] text-white/60 tracking-widest uppercase max-w-[240px] leading-loose border-l border-white/20 pl-4">
                        Forging immersive digital ecosystems with raw logic and uncompromising aesthetics.
                    </p>
                </div>

                {/* Top right corner - Empty */}
                     <div className="hidden lg:block absolute top-20 md:top-8 lg:top-28 2xl:top-8 right-4 md:right-8 text-right">
                   {/* Elements Removed */}
                </div>

                {/* Center Content Removed */}

                {/* Bottom Center Only - Scroll indicator */}
                <div className="absolute bottom-6 md:bottom-8 left-0 right-0 hidden md:flex justify-center pr-8">
                    <button
                        type="button"
                        onClick={() => {
                            const el = document.getElementById('about')
                            if (el) {
                                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                        }}
                        className="group pointer-events-auto flex flex-col items-center gap-2 focus:outline-none"
                        aria-label="Scroll to explore more"
                    >
                        <p className="text-[0.55rem] tracking-[0.35em] text-white/60 uppercase group-hover:text-white/90 transition-colors">
                            Scroll
                        </p>
                        <div className="relative h-9 w-6 rounded-full border border-white/35 group-hover:border-white/70 transition-colors flex items-start justify-center overflow-hidden">
                            <span className="scroll-dot"></span>
                        </div>
                        <span className="h-4 w-px bg-white/25 group-hover:h-7 transition-all duration-300"></span>
                    </button>
                </div>

                {/* Bottom right corner info - Resolution info */}
                <div className="absolute bottom-20 sm:bottom-12 md:bottom-8 right-4 md:right-8 text-right hidden lg:block">
                    <p className="text-xs text-white/60 uppercase tracking-widest">Desktop <span className="text-white/80">1707x898</span> Background</p>
                </div>


            </div>
        </section>
    );
});

export default Hero;
