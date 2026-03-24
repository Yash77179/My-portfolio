import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerScroll } from './ui/container-scroll-animation';
import AboutContent from './AboutContent';
import { Play } from 'lucide-react';
import yashVideo from '../assets/yash.webm';
import tabletWebm from '../assets/tablet/tablet.webm';
import { GlassButton } from './ui/glass-button';

const About = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);

    // Pause video when off-screen, resume when visible
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Resume on tab re-focus
        const handleVisibility = () => {
            if (document.visibilityState === 'visible' && video && !video.paused) {
                video.play().catch(() => {});
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);

        // Pause/play based on viewport intersection
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { rootMargin: '200px 0px' } // Start playing 200px before entering viewport
        );
        observer.observe(video);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
            observer.disconnect();
        };
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
                            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
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
                        <span className="text-[10rem] md:text-[15rem] font-bold text-white/15 leading-none absolute -top-20 md:-top-32 select-none">
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
                         <video 
                            src={tabletWebm} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="w-full h-full object-cover"
                         />
                     </div>

                     {/* Ultra-Premium Static Overlay */}
                     <div 
                        onClick={handleLaunchOS}
                        className="absolute inset-0 z-[9999] cursor-pointer flex flex-col items-center justify-between py-10 md:py-16 px-6"
                        style={{ pointerEvents: 'auto' }}
                     >
                        {/* Soft, permanent vignette to ensure perfect text contrast over the video */}
                        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

                        {/* Top Label - Permanently Visible */}
                        <div className="relative z-10 w-full flex justify-center">
                            <span className="text-[0.6rem] md:text-xs uppercase tracking-[0.5em] text-white/50 font-medium">
                                Interactive Session — 01
                            </span>
                        </div>
                        
                        {/* Center Layout - Permanently Visible */}
                        <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
                            
                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-light text-white text-center tracking-tight drop-shadow-2xl mb-12">
                                Step inside the <span className="font-serif italic text-[#c8b598] mr-2">experience.</span>
                            </h3>

                            <GlassButton
                                size="default"
                                contentClassName="flex items-center gap-3 text-white/90 drop-shadow-md"
                            >
                                <span className="text-xs font-semibold tracking-[0.15em] uppercase">Initialize System</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </GlassButton>
                        </div>

                        {/* Bottom Label - Permanently Visible */}
                        <div className="relative z-10 w-full flex justify-center">
                            <span className="text-[0.6rem] md:text-xs uppercase tracking-[0.5em] text-white/30 font-medium">
                                Yash.OS Architecture
                            </span>
                        </div>
                     </div>
                </div>
            </ContainerScroll>
        </section>
    );
};

export default About;
