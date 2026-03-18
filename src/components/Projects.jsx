import React from 'react';
import { projects } from '../data/portfolioData';
import SectionDivider from './SectionDivider';

const Projects = () => {
    return (
        <>
            <section id="projects" className="relative bg-black px-6 md:px-16 lg:px-24 py-20 md:py-28 text-white border-white/10">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                <div className="max-w-6xl mx-auto space-y-10">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 about-reveal-left">
                        <div className="space-y-4 max-w-2xl">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-white/30"></span>
                                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Selected Work</p>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/50">
                                Proof that delightful can also be performant.
                            </h2>
                            <p className="text-sm md:text-base text-white/60 leading-relaxed">
                                A few projects where I obsessed over motion, readability, and real metrics — not just Dribbble shots.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8 about-reveal-right">
                        {projects.map((project, index) => (
                            <article
                                key={project.title}
                                className="spotlight-card group relative overflow-hidden border border-white/10 rounded-3xl bg-[#050505] transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                            >
                                {/* Noise Texture */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

                                <div className="relative p-8 md:p-10 space-y-8">
                                    {/* Top row: index + title + stack */}
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                        <div className="flex items-start gap-6">
                                            <div className="flex flex-col items-center pt-1">
                                                <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <div className="mt-2 h-12 w-px bg-white/10 group-hover:bg-white/30 transition-colors duration-500"></div>
                                            </div>
                                            <div className="space-y-3">
                                                <h3 className="text-3xl md:text-4xl text-white group-hover:text-white transition-colors">
                                                    {project.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.stack.map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-3 py-1 border border-white/10 rounded-full text-[0.6rem] uppercase tracking-[0.2em] text-white/50 bg-white/5 group-hover:border-white/20 group-hover:text-white/70 transition-all"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <div className="pl-0 md:pl-[3.25rem]">
                                        <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-3xl group-hover:text-white/90 transition-colors">
                                            {project.summary}
                                        </p>
                                    </div>

                                    {/* Bottom row: result + CTA */}
                                    <div className="pl-0 md:pl-[3.25rem] flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors"></div>
                                            <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                                                {project.result}
                                            </p>
                                        </div>

                                        <button className="group/btn relative inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-500">
                                            <div className="flex flex-col items-start justify-center space-y-0.5">
                                                <span className="text-[0.65rem] uppercase tracking-[0.2em] leading-none">Case</span>
                                                <span className="text-[0.65rem] uppercase tracking-[0.2em] leading-none">Study</span>
                                            </div>
                                            <span className="text-lg leading-none group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300">↗</span>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <SectionDivider />
        </>
    );
};

export default Projects;
