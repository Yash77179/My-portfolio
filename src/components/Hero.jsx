import React, { useRef } from 'react';
import Silk from './Silk';
import Lanyard from './Lanyard';

const Hero = React.memo(({ isDesktop }) => {
    const photoRef = useRef(null);

    return (
        <section id="home" className="w-screen h-screen flex items-center justify-center relative overflow-hidden">
            {isDesktop && (
                <div className="absolute inset-0 w-full h-full z-0" style={{ width: '100vw', height: '100vh', background: '#000000' }}>
                    <div className="w-full h-full opacity-60"> {/* Reduced opacity for subtleties */}
                        <Silk
                            color="#1B6A73" // Premium Bluish-Green (Deep Teal)
                            scale={1.2} // Zoomed in a little (decreased scale = larger waves)
                            speed={1.2}
                            noiseIntensity={1.0}
                        />
                    </div>
                </div>
            )}
            
            {/* 3D Lanyard Interactive Element */}
            {/* The physics engine drag-math relies on the camera staying near [0,0,30].
                We zoom in by decreasing fov from 20 to 12, and shift it layout-wise via Tailwind translate! 
            */}
            <div className="absolute inset-0 z-70 w-full h-full pointer-events-none flex items-center justify-center overflow-visible">
                {/* CSS scale can artificially enlarge it without breaking internal ThreeJS math */}
                <div className="w-full h-full pointer-events-auto transform translate-x-[15vw] -translate-y-[2vh] lg:translate-x-[22vw] lg:-translate-y-[4vh] xl:-translate-y-[6vh]">
                    <Lanyard position={[0, 0, 30]} gravity={[0, -40, 0]} fov={11.5} transparent={true} />
                </div>
            </div>

            {/* Hero Content Overlay */}
            <div className="relative z-50 px-4 md:px-6 py-8 md:py-12 w-full h-full flex flex-col justify-between pointer-events-none">
                {/* Top left corner - Empty */}
                <div className="hidden lg:block absolute top-20 md:top-8 lg:top-28 2xl:top-8 left-4 md:left-8">
                    {/* Elements Removed */}
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
