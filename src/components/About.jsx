import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ContainerScroll } from './ui/container-scroll-animation';
import AboutContent from './AboutContent';
import { Play } from 'lucide-react';

const About = () => {

    const handleLaunchOS = () => {
        // Must request fullscreen synchronously during the exact click gesture
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => {});
        }
        
        // Force a synchronous URL update that React Router will intercept
        // This is necessary because `navigate()` delays execution to the next React render cycle,
        // which drops the user interaction token required for the Fullscreen API.
        window.history.pushState({}, '', '/os');
        window.dispatchEvent(new Event('popstate'));
    };

    return (
        <section id="about" className="relative bg-[#050505] text-white pt-32 pb-20 overflow-visible min-h-screen">
            {/* Background Texture - Subtle Grain */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            {/* Background Decorative Layer - Fixed/Sticky Wrapper (Hidden on Mobile for Performance) */}
            <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none">
                <div 
                    className="sticky top-0 w-full h-[120vh] overflow-hidden"
                    style={{
                        zIndex: 0,
                    }}
                >
                    {/* Gradient Overlay for smooth fade */}
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent z-10"></div>
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>

                    {/* Image 3 (Back) - spins clockwise */}
                    <div className="absolute inset-0 animate-spin-slow opacity-30">
                        <div
                            className="absolute top-1/2 left-1/2 w-[2000px] h-[2000px] -translate-x-1/2 -translate-y-1/2"
                        >
                            <img
                                src="https://framerusercontent.com/images/oqZEqzDEgSLygmUDuZAYNh2XQ9U.png?scale-down-to=2048"
                                alt=""
                                className="w-full h-full object-cover" 
                            />
                        </div>
                    </div>

                    {/* Image 2 (Middle) - spins counter-clockwise */}
                    <div className="absolute inset-0 animate-spin-slow-reverse opacity-40">
                        <div
                            className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2"
                        >
                            <img
                                src="https://framerusercontent.com/images/UbucGYsHDAUHfaGZNjwyCzViw8.png?scale-down-to=1024"
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Image 1 (Front) - spins clockwise */}
                    <div className="absolute inset-0 animate-spin-slow opacity-50">
                        <div
                            className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2"
                        >
                            <img
                                src="https://framerusercontent.com/images/Ans5PAxtJfg3CwxlrPMSshx2Pqc.png"
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ContainerScroll
                titleComponent={
                    <div className="flex flex-col items-center justify-center mb-10 relative z-10">
                        <span className="text-[10rem] md:text-[15rem] font-bold text-white/5 leading-none absolute -top-20 md:-top-32 select-none">
                            01
                        </span>
                        <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-white relative z-10">
                            The Architect
                        </h2>
                    </div>
                }
            >
                {/* The actual clickable target covering the whole Card bounds. */}
                <div 
                    className="relative w-full h-full group overflow-hidden rounded-2xl"
                >
                     <div className="w-full h-full pointer-events-none">
                         <AboutContent />
                     </div>

                     {/* Hover overlay - specifically clickable */}
                     <div 
                        onClick={handleLaunchOS}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md z-[9999] cursor-pointer"
                        style={{ pointerEvents: 'auto' }}
                     >
                        {/* Vignette effect */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
                        
                        <div className="text-center transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col items-center justify-center h-full w-full relative z-10">
                            
                            <h3 className="text-3xl md:text-6xl font-bold tracking-tighter text-white mb-4 drop-shadow-2xl">
                                enter the<br className="md:hidden" /> <span className="font-serif italic font-light text-cyan-300">experience.</span>
                            </h3>

                            <p className="text-white/60 text-[0.6rem] md:text-sm tracking-[0.3em] uppercase mb-8 md:mb-10 font-medium">
                                Interactive OS Portfolio
                            </p>

                            <button className="relative px-6 md:px-8 py-3 md:py-4 bg-white text-black hover:bg-neutral-200 hover:scale-105 transition-all duration-300 rounded-full font-bold uppercase tracking-[0.2em] text-[0.65rem] md:text-xs flex items-center gap-2 md:gap-3 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]">
                                <Play size={16} className="fill-black" />
                                Launch System
                            </button>
                        </div>
                     </div>
                </div>
            </ContainerScroll>
        </section>
    );
};

export default About;
