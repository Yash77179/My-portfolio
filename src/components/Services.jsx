import React from 'react';
import { services } from '../data/portfolioData';

const Services = () => {
    return (
        <section id="services" className="relative bg-black text-white px-6 md:px-16 lg:px-24 py-20 md:py-28 border-t border-white/10 overflow-hidden">
            {/* Ambient Background Glow for Symmetry */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 about-reveal-left">
                    <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-white/30"></span>
                            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Services</p>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/50">
                            Strategy, craft, and code in one workflow.
                        </h2>
                        <p className="text-sm md:text-base text-white/60 leading-relaxed">
                            I help teams turn fuzzy product ideas into interfaces that are storyboarded, prototyped, and ready for
                            engineers — without dropping the visual polish along the way.
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-4">
                        {/* Available for Sprints - Editorial Pill */}
                        <div className="group relative inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-[#050505] hover:border-white/20 transition-all duration-500 cursor-default min-w-[200px]">
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <div className="flex flex-col items-start justify-center space-y-0.5">
                                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/90 leading-none">Available for</span>
                                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/90 leading-none">Sprints</span>
                            </div>
                        </div>

                        {/* Book Collaboration - Editorial Pill */}
                        <a
                            href="#contact"
                            className="group relative inline-flex items-center justify-between gap-4 px-6 py-3 rounded-full border border-white/10 bg-[#050505] hover:bg-white/5 hover:border-white/30 transition-all duration-500 min-w-[200px]"
                        >
                            <div className="flex flex-col items-start justify-center space-y-0.5">
                                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white leading-none group-hover:text-white transition-colors">Book a</span>
                                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white leading-none group-hover:text-white transition-colors">Collaboration</span>
                            </div>
                            <span className="text-lg text-white/70 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0">↗</span>
                        </a>
                    </div>
                </div>

                <div className="relative about-reveal-right">
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((service, index) => (
                            <div
                                key={service.title}
                                className="spotlight-card group relative flex flex-col gap-8 p-8 border border-white/10 rounded-3xl bg-[#050505] transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                            >
                                {/* Noise Texture */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

                                {/* Step index rail */}
                                <div className="relative flex items-start justify-between w-full">
                                    <span className="text-5xl text-white/20 group-hover:text-white/30 transition-colors duration-500">
                                        0{index + 1}
                                    </span>

                                    {/* Arrow Circle - Fixed Size & No Shrink */}
                                    <div className="w-12 h-12 shrink-0 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 group-hover:opacity-100 transition-opacity">
                                            <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title + copy */}
                                <div className="space-y-3 z-10">
                                    <h3 className="text-2xl tracking-wide text-white group-hover:text-white transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Bottom decorative line */}
                                <div className="mt-auto pt-4">
                                    <div className="h-px w-full bg-white/10 overflow-hidden">
                                        <div className="h-full w-0 bg-white/40 group-hover:w-full transition-all duration-700 ease-out"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
