import React from 'react';

const Experience = () => {
    return (
        <section id="experience" className="relative bg-black px-6 md:px-16 lg:px-24 pb-24 pt-24 text-white border-white/10">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <div className="max-w-6xl mx-auto space-y-10">
                <div className="about-reveal-left space-y-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-white/30"></span>
                        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Experience</p>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/50">
                        Leading teams where design, product, and code intersect.
                    </h2>
                    <p className="text-sm md:text-base text-white/60 leading-relaxed">
                        Roles where I owned the interface layer, but also the way it connected to product strategy and shipping
                        reality.
                    </p>
                </div>
                <div className="space-y-6 about-reveal-right">
                    {/* Experience Item 01 */}
                    <div className="spotlight-card group relative flex flex-col gap-6 p-8 border border-white/10 rounded-3xl bg-[#050505] transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
                        {/* Noise Texture */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                                    <span className="text-lg">01</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl text-white group-hover:text-white transition-colors">Lead Product Designer</h3>
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mt-1">Flux Mobility · 2022 — Present</p>
                                </div>
                            </div>
                            <div className="hidden md:block px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[0.6rem] uppercase tracking-[0.2em] text-emerald-400">
                                Current Role
                            </div>
                        </div>

                        <div className="pl-0 md:pl-[4rem] space-y-4">
                            <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                                Steering the design of a mobility OS for autonomous delivery fleets — from system maps and interface states to the components engineers plug into.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    'Directed a cross-functional squad shipping the mobility OS for autonomous delivery fleets.',
                                    'Built a modular UI kit that reduced feature build time by 45% and enabled theming for OEM partners.',
                                    'Created telemetry dashboards with predictive states, shortening ops escalations from 30 min to 8 min.'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-white/50 group-hover:text-white/70 transition-colors">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 group-hover:bg-white/60"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Experience Item 02 */}
                    <div className="spotlight-card group relative flex flex-col gap-6 p-8 border border-white/10 rounded-3xl bg-[#050505] transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
                        {/* Noise Texture */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                                    <span className="text-lg">02</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl text-white group-hover:text-white transition-colors">Senior Product Designer</h3>
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mt-1">Lumen Labs · 2019 — 2022</p>
                                </div>
                            </div>
                        </div>

                        <div className="pl-0 md:pl-[4rem] space-y-4">
                            <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                                Shaping an omni-channel retail intelligence platform, from research and journey maps to motion languages adopted across marketing and product.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    'Ran research sprints across EU and APAC to define the omni-channel retail intelligence platform.',
                                    'Piloted a motion language that now powers 18+ marketing launches and the company design system.',
                                    'Partnered with data science to visualize confidence intervals, making models explainable to execs.'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-white/50 group-hover:text-white/70 transition-colors">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 group-hover:bg-white/60"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
