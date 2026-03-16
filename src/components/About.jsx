import React from 'react';
import { ContainerScroll } from './ui/container-scroll-animation';
import Globe from './ui/Globe';

const About = () => {
    return (
        <section id="about" className="relative bg-[#050505] text-white pt-32 pb-20 overflow-visible min-h-screen">
            {/* Background Texture - Subtle Grain */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            {/* Background Decorative Layer - Fixed/Sticky Wrapper */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
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
                    <div className="flex flex-col items-center justify-center mb-10 pointer-events-none relative z-10">
                        <span className="text-[10rem] md:text-[15rem] font-bold text-white/5 leading-none absolute -top-20 md:-top-32 select-none">
                            01
                        </span>
                        <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-white relative z-10">
                            The Architect
                        </h2>
                    </div>
                }
            >
                {/* Minimalist "Manifesto" Layout */}
                <div className="h-full w-full bg-[#080808] rounded-2xl relative overflow-hidden flex flex-col md:flex-row shadow-2xl">
                    
                    {/* Left: The Visual / Atmospheric Side */}
                    <div className="w-full md:w-2/5 relative h-64 md:h-full bg-[#050505] overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                        <Globe />
                        
                        {/* Overlay Text */}
                        <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
                             <div className="w-12 h-1 bg-white mb-4"></div>
                             <p className="text-xs text-white/60 tracking-[0.2em] uppercase">
                                 Global Reach
                             </p>
                        </div>
                    </div>

                    {/* Right: The Narrative Side */}
                    <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center relative bg-[#080808]">
                        
                        <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
                            {/* Decorative architectural lines */}
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.5">
                                <line x1="0" y1="0" x2="100" y2="100" />
                                <line x1="100" y1="0" x2="0" y2="100" />
                                <circle cx="50" cy="50" r="40" />
                            </svg>
                        </div>

                        <div className="space-y-12 relative z-10">
                            <div>
                                <h3 className="text-2xl md:text-4xl leading-tight text-white/90 mb-6">
                                    I don't just write code. <br/>
                                    <span className="text-zinc-500 italic">I engineer clarity.</span>
                                </h3>
                                <p className="text-lg md:text-xl font-light leading-relaxed text-zinc-400 max-w-lg">
                                    In a digital world cluttered with noise, I build <span className="text-white border-b border-white/20 pb-0.5">silence</span>. My work is defined not by what I add, but by what I refuse to compromise on: speed, fluidity, and purpose.
                                </p>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="flex items-baseline gap-4 group cursor-default">
                                    <span className="text-xs text-emerald-500">01.</span>
                                    <div>
                                        <h4 className="text-sm uppercase tracking-widest text-white mb-1 group-hover:text-emerald-400 transition-colors">Precision</h4>
                                        <p className="text-xs text-zinc-500">Pixel-perfect implementation of complex designs.</p>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-4 group cursor-default">
                                    <span className="text-xs text-emerald-500">02.</span>
                                    <div>
                                        <h4 className="text-sm uppercase tracking-widest text-white mb-1 group-hover:text-emerald-400 transition-colors">Motion</h4>
                                        <p className="text-xs text-zinc-500">Physics-based interactions that feel tangible.</p>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-4 group cursor-default">
                                    <span className="text-xs text-emerald-500">03.</span>
                                    <div>
                                        <h4 className="text-sm uppercase tracking-widest text-white mb-1 group-hover:text-emerald-400 transition-colors">Scale</h4>
                                        <p className="text-xs text-zinc-500">Architecture built for global performance.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5 flex justify-between items-end">
                                <div>
                                    <p className="italic text-2xl text-white/40">Yash Patil</p>
                                </div>
                                <div className="text-right">
                                     <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Est. 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContainerScroll>
        </section>
    );
};

export default About;
