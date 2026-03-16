import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ContainerScroll } from './ui/container-scroll-animation';
import Globe from './ui/Globe';
import AboutContent from './AboutContent';
import Desktop from './os/Desktop';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, Maximize2 } from 'lucide-react';

const About = () => {
    const [showOS, setShowOS] = useState(false);

    // Lock body scroll when OS is open
    useEffect(() => {
        if (showOS) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Small timeout to prevent immediate jumps if necessary, 
            // but usually unset is fine.
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showOS]);

    return (
        <section id="about" className="relative bg-[#050505] text-white pt-32 pb-20 overflow-visible min-h-screen">
            {/* Launch OS Overlay - Using Portal to escape 3D transforms */}
            {createPortal(
                <AnimatePresence>
                    {showOS && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] bg-black isolate"
                            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
                        >
                            <Desktop onShutdown={() => setShowOS(false)} />
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

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
                {/* Wrap content + Button */}
                <div className="relative w-full h-full group">
                     <AboutContent />
                     
                     {/* ALWAYS VISIBLE Floating Action Button - FIXED POSITION on screen when sticky */}
                     <div 
                        className="absolute bottom-6 right-6 z-50 pointer-events-auto"
                     >
                         <button 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                e.preventDefault();
                                setShowOS(true); 
                            }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:bg-white hover:text-black hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-3 group/btn cursor-pointer"
                            title="Launch Windows 11"
                            type="button"
                         >
                            <Play size={24} className="fill-current" />
                            <span className="font-bold text-sm whitespace-nowrap">Open OS</span>
                         </button>
                     </div>

                     {/* Full Overlay (Hover Effect) */}
                     <div 
                        className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm rounded-2xl cursor-pointer z-40" 
                        onClick={() => setShowOS(true)}
                     >
                        <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Windows 11 Experience</h3>
                            <div className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all scale-100 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2 mx-auto w-fit">
                                <Maximize2 size={18} />
                                Tap to Launch OS
                            </div>
                        </div>
                     </div>
                </div>
            </ContainerScroll>
        </section>
    );
};

export default About;
