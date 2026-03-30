import React from 'react';

const Footer = () => {
    return (
        <footer className="relative w-full bg-black overflow-hidden selection:bg-white selection:text-black">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4"
            />
            {/* Gradient fade to black at the top to blend with the page */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-[1] pointer-events-none" />
            
            {/* Subtle gradient at the bottom so text stays legible, NO solid black block */}
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black via-black/40 to-transparent z-[1] pointer-events-none" />

            {/* Bottom Grid Links directly over video */}
            <div className="relative z-10 w-full min-h-[500px] lg:min-h-[60vh] flex flex-col justify-end pb-12 pt-32">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 w-full relative z-20">
                    {/* Brand */}
                    <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-end">
                        <p className="text-white/60 text-xs tracking-[0.2em] uppercase mt-12 md:mt-24 font-medium drop-shadow-md">
                            © 2026. All Rights Reserved.
                        </p>
                    </div>

                    {/* Sitemap */}
                    <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
                        <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-8 font-semibold drop-shadow-md">Sitemap</h3>
                        <ul className="flex flex-col gap-5 text-white/90 text-[16px] tracking-wide font-light">
                            {['Home', 'About', 'Projects', 'Contact'].map(item => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-300 drop-shadow-md">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
                        <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-8 font-semibold drop-shadow-md">Socials</h3>
                        <ul className="flex flex-col gap-5 text-white/90 text-[16px] tracking-wide font-light">
                            {['LinkedIn', 'GitHub', 'Behance', 'Dribbble'].map(item => (
                                <li key={item}>
                                    <a href="#" className="hover:text-white transition-colors duration-300 drop-shadow-md">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="p-8 md:p-12 border-b md:border-b-0 border-white/10">
                        <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-8 font-semibold drop-shadow-md">Resources</h3>
                        <ul className="flex flex-col gap-5 text-white/90 text-[16px] tracking-wide font-light">
                            {['Resume', 'Case Studies', 'Components', 'Privacy'].map(item => (
                                <li key={item}>
                                    <a href="#" className="hover:text-white transition-colors duration-300 drop-shadow-md">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Giant Background Text Container - Absolute Center Bottom */}
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-end justify-center pointer-events-none select-none overflow-hidden z-[5]">
                <h1 className="text-[13vw] lg:text-[15.5vw] font-black text-white/[0.05] leading-[0.75] tracking-tighter whitespace-nowrap translate-y-[10%] drop-shadow-2xl">
                    YASH PATIL
                </h1>
            </div>
        </footer>
    );
};

export default Footer;
