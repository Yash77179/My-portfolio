import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

const Contact = ({ activeSection, isDesktop }) => {
    const [activeContactTab, setActiveContactTab] = useState('email')
    const [contactPillStyle, setContactPillStyle] = useState({ left: 0, width: 0 })
    const contactTabRefs = useRef({})

    useEffect(() => {
        const updatePill = () => {
            const el = contactTabRefs.current[activeContactTab]
            if (el) {
                setContactPillStyle({
                    left: el.offsetLeft,
                    width: el.offsetWidth
                })
            }
        }

        // Update on mount and resize
        const timeout = setTimeout(updatePill, 100)
        window.addEventListener('resize', updatePill)
        return () => {
            window.removeEventListener('resize', updatePill)
            clearTimeout(timeout)
        }
    }, [activeContactTab, isDesktop])

    return (
        <section id="contact" className="relative w-screen min-h-screen bg-black overflow-hidden border-white/10 flex items-center">
            {activeSection === 'contact' && isDesktop && (
                <div className="absolute inset-0">
                    <Spline scene="https://prod.spline.design/NCzgzlnfe2ylzLAZ/scene.splinecode" />
                </div>
            )}

            {/* Mobile Ambient Visuals (When Spline is hidden) */}
            <div className="absolute inset-0 lg:hidden pointer-events-none overflow-hidden">
                {/* Massive Background Text Texture */}
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 text-[25vw] font-black text-white/[0.03] whitespace-nowrap select-none tracking-tighter">
                    CONNECT
                </div>

                {/* Central Radar / Data Visualization */}
                <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
                    {/* Core Glow */}
                    <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[60px] animate-pulse"></div>

                    {/* Concentric Rings */}
                    <div className="absolute inset-0 border border-white/10 rounded-full"></div>
                    <div className="absolute inset-8 border border-white/5 rounded-full border-dashed animate-[spin_60s_linear_infinite]"></div>
                    <div className="absolute inset-16 border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
                    <div className="absolute inset-24 border border-white/5 rounded-full opacity-50"></div>

                    {/* Center Target */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-ping"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full"></div>
                    </div>

                    {/* Orbiting Data Points */}
                    <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                    </div>
                    <div className="absolute inset-12 animate-[spin_15s_linear_infinite_reverse]">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500/60 rounded-full"></div>
                    </div>
                </div>

                {/* Perspective Grid Floor */}
                <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-[linear-gradient(to_bottom,transparent,black),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom opacity-50"></div>
            </div>

            {/* Softer vignette so the 3D robot stays clear */}
            <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/80 via-black/40 to-transparent"></div>
            <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-10 md:py-16 min-h-screen flex flex-col justify-end">
                <div className="max-w-4xl mx-auto w-full text-center space-y-8 mb-12 relative z-10">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/80">Open to Work</p>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.1]">
                        Ready to build the <span className="italic text-white/50">next big thing</span> starting Summer ‘25.
                    </h2>

                    <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto leading-relaxed tracking-wide">
                        I blend React, Tailwind, and motion design to ship polished UI. Currently exploring roles where I can
                        prototype fast, learn from seniors, and own student-to-production hand-offs.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto w-full">
                    <div className="group relative isolate">
                        {/* Animated Gradient Border */}
                        <div className="absolute -inset-px rounded-[2.5rem] md:rounded-full bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"></div>

                        {/* Main Bar Container */}
                        <div className="relative flex flex-col md:flex-row items-center justify-between p-1.5 bg-[#080808] border border-white/10 rounded-[2.5rem] md:rounded-full shadow-2xl shadow-black/80 ring-1 ring-white/5 transition-transform duration-300 hover:scale-[1.01]">

                            {/* Left: Technical Specs (The Stack) */}
                            <div className="flex items-center gap-4 px-6 py-4 md:py-0 w-full md:w-auto justify-center md:justify-start border-b md:border-b-0 border-white/5 md:border-none">
                                <div className="flex flex-col items-center md:items-start gap-1">
                                    <span className="text-[0.45rem] uppercase tracking-[0.3em] text-white/30">System Architecture</span>
                                    <div className="flex items-center gap-3 text-[0.55rem] uppercase tracking-[0.15em] text-white/80 font-medium">
                                        <span className="hover:text-white transition-colors cursor-default">React</span>
                                        <span className="text-white/20">/</span>
                                        <span className="hover:text-white transition-colors cursor-default">Three.js</span>
                                        <span className="text-white/20">/</span>
                                        <span className="hover:text-white transition-colors cursor-default">Figma</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Action Cluster (Sliding Toggle) */}
                            <div className="relative flex items-center p-1.5 mt-2 md:mt-0 bg-white/5 rounded-full border border-white/5 w-full md:w-auto justify-between md:justify-start overflow-hidden">

                                {/* The Sliding White Pill */}
                                <div
                                    className="absolute top-1.5 bottom-1.5 bg-white rounded-full transition-all duration-500 cubic-bezier(0.23, 1, 0.32, 1) shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                    style={{
                                        left: `${contactPillStyle.left}px`,
                                        width: `${contactPillStyle.width}px`
                                    }}
                                ></div>

                                {/* Items */}
                                {[
                                    { id: 'resume', label: 'Résumé', href: '/YashPatil-Resume.pdf', external: false },
                                    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com', external: true },
                                    { id: 'email', label: 'Email Me', href: 'mailto:hello@yashpatil.design', external: false }
                                ].map((item) => (
                                    <a
                                        key={item.id}
                                        ref={el => contactTabRefs.current[item.id] = el}
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        rel={item.external ? "noreferrer" : undefined}
                                        onClick={() => setActiveContactTab(item.id)}
                                        onMouseEnter={() => setActiveContactTab(item.id)}
                                        className={`relative z-10 px-5 md:px-6 py-2.5 rounded-full text-[0.55rem] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${activeContactTab === item.id ? 'text-black' : 'text-white/50 hover:text-white'
                                            }`}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* Status Indicator (Floating below) */}
                    <div className="mt-8 flex justify-center opacity-60 hover:opacity-100 transition-opacity duration-500">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-[0.5rem] uppercase tracking-[0.2em] text-white/50">Available for Summer '25</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
