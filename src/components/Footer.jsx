import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);
    const nameRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Initial staggered reveal of all footer text elements
            gsap.from(".footer-item", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 80%",
                }
            });

            // Parallax effect for the giant name background
            gsap.fromTo(nameRef.current, 
                { y: "20%" },
                {
                    y: "-20%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-black text-white relative overflow-hidden flex flex-col justify-between min-h-screen border-t border-white/10 selection:bg-white selection:text-black">
            
            {/* Main Content Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 border-b border-white/10 lg:border-none relative z-10">
                {/* Left Section - Brand & Tagline - Spans 5 columns */}
                <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-black/50 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent">
                    <div className="space-y-12">
                        {/* Logo / Icon */}
                        <div className="flex items-center footer-item">
                            <div className="w-10 h-10 flex items-center justify-center bg-white text-black font-bold text-xl rounded-full mr-3">
                                Y
                            </div>
                            <span className="text-xl flex items-center">
                                <span className="font-bold text-white tracking-tighter mr-2">YASH</span>
                                <span className="font-light text-transparent tracking-tighter" style={{ WebkitTextStroke: '0.5px white' }}>PATIL</span>
                            </span>
                        </div>

                        {/* Heavy Tagline */}
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[0.9] mt-12 max-w-lg footer-item tracking-tight">
                            Transform your vision,<br /> <span className="text-white/40 italic">elevate your brand.</span>
                        </h2>
                    </div>

                    {/* Bottom copyright */}
                    <div className="mt-12 lg:mt-auto pt-12 footer-item">
                        <p className="text-white/40 text-xs tracking-[0.2em] uppercase">
                            � 2026 Yash Patil. All Rights Reserved.
                        </p>
                    </div>
                </div>

                {/* Right Section - Links Grid - Spans 7 columns */}
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 bg-black/50 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent">
                    {/* Column 1 - Sitemap */}
                    <div className="p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col gap-8 hover:bg-white/[0.02] transition-colors duration-500">
                        <h3 className="text-xs tracking-[0.2em] text-white/40 footer-item uppercase">Sitemap</h3>
                        <ul className="flex flex-col gap-4 text-white text-xl md:text-2xl tracking-wide">
                            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                <li key={item} className="footer-item">
                                    <a href={`#${item.toLowerCase()}`} className="block hover:text-white/60 transition-transform hover:translate-x-2 duration-300">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2 - Socials */}
                    <div className="p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col gap-8 hover:bg-white/[0.02] transition-colors duration-500">
                        <h3 className="text-xs tracking-[0.2em] text-white/40 footer-item uppercase">Socials</h3>
                        <ul className="flex flex-col gap-4 text-white text-xl md:text-2xl tracking-wide">
                            {['LinkedIn', 'GitHub', 'Behance', 'Dribbble'].map((item) => (
                                <li key={item} className="footer-item">
                                    <a href="#" className="group flex items-center gap-2 hover:text-white/60 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 - Resources */}
                    <div className="p-8 md:p-12 lg:p-16 border-b md:border-b-0 border-white/10 flex flex-col gap-8 hover:bg-white/[0.02] transition-colors duration-500">
                        <h3 className="text-xs tracking-[0.2em] text-white/40 footer-item uppercase">Resources</h3>
                        <ul className="flex flex-col gap-4 text-white text-xl md:text-2xl tracking-wide">
                            {['Resume', 'Case Studies', 'Components', 'Privacy'].map((item) => (
                                <li key={item} className="footer-item">
                                    <a href="#" className="block hover:text-white/60 transition-transform hover:translate-x-2 duration-300">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Giant Background Text Container - Absolute Center Bottom */}
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-end justify-center pointer-events-none select-none overflow-hidden z-0">
                {/* The text itself - perfectly centered and scaled */}
                <h1 
                    ref={nameRef}
                    className="text-[13vw] lg:text-[15.5vw] font-black text-white/[0.03] leading-[0.75] tracking-tighter whitespace-nowrap translate-y-[20%]"
                    style={{ willChange: 'transform' }}
                >
                    YASH PATIL
                </h1>
            </div>
            
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-1"></div>
        </footer>
    );
};

export default Footer;
