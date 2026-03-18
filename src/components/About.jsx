import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerScroll } from './ui/container-scroll-animation';
import AboutContent from './AboutContent';
import { Play } from 'lucide-react';
import yashVideo from '../assets/yash.webm';

const About = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);

    // Force-resume background video when tab returns from being backgrounded
    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === 'visible' && videoRef.current) {
                videoRef.current.play().catch(() => {});
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    const handleLaunchOS = (e) => {
        if (e && e.nativeEvent) {
             e.nativeEvent.stopImmediatePropagation();
        }

        const launch = () => {
             navigate('/os');
        };

        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().then(launch).catch(launch);
        } else {
            launch();
        }
    };

    return (
        <section id="about" className="relative bg-[#050505] text-white pt-32 pb-20 overflow-visible min-h-screen">
            
            {/* Ambient Background Video Wrapper - Applies to Mobile & Desktop natively */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <div 
                    className="sticky top-0 w-full h-screen"
                    style={{ zIndex: 0 }}
                >
                    {/* Top & Bottom seamless gradient melts into black background */}
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent z-10"></div>
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>

                    {/* Animated WebM Video Background */}
                    <div className="absolute inset-0 opacity-40">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            src={yashVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
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
                {/* 3D Rotated Glass Card Shell */}
                <div className="relative w-full h-full group overflow-hidden rounded-[2rem] md:rounded-2xl">
                     
                     <div className="w-full h-full pointer-events-none">
                         <AboutContent />
                     </div>

                     {/* Interactive Hover OS Launcher Overlay */}
                     <div 
                        onClick={handleLaunchOS}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 z-[9999] cursor-pointer"
                        style={{ pointerEvents: 'auto' }}
                     >
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
