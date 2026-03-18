import React from 'react';
import Globe from './ui/Globe';
import { MarqueeDemo } from './ui/marquee-demo';

const AboutContent = () => {
    return (
        <div className="h-full w-full bg-[#080808] rounded-[2rem] md:rounded-2xl relative overflow-hidden flex flex-col md:flex-row shadow-2xl">
            {/* Left: The Visual / Atmospheric Side */}
            <div className="w-full md:w-2/5 relative h-56 md:h-full bg-[#050505] overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                {/* Globe/Earth Animation - Primary Visual */}
                <div className="absolute inset-0 flex items-center justify-center opacity-50 pointer-events-none z-0"><Globe /></div>
                
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />

                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                        <div className="w-12 h-1 bg-white mb-4 shadow-[0_0_10px_white]"></div>
                        <p className="text-xs text-white/90 tracking-[0.2em] uppercase font-semibold drop-shadow-md">
                            Global Reach
                        </p>
                </div>
            </div>

            {/* Right: The Narrative Side */}
            <div className="w-full md:w-3/5 p-6 md:p-16 pb-4 md:pb-10 flex flex-col relative bg-[#080808] pointer-events-none text-left flex-1">
                
                <div className="flex-1 flex flex-col justify-center mt-2 md:mt-8">
                    <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            <p className="text-neutral-400 text-xs tracking-[0.2em] uppercase font-medium">available for hire</p>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-medium tracking-tighter text-white leading-[1.1]">
                            code that <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-200 italic font-light">hits different.</span>
                        </h3>
                    </div>
                    
                    <p className="text-sm md:text-base text-neutral-400 mb-8 leading-relaxed max-w-sm font-light">
                        i'm yash. full-stack dev blending hard-core logic with killer aesthetics. i build digital experiences that are fast, scalable, and stupidly good-looking.
                    </p>
                </div>

                {/* Edge-to-edge Marquee Container */}
                <div className="mt-auto -mx-6 md:-mx-16 w-[calc(100%+3rem)] md:w-[calc(100%+8rem)] overflow-hidden pt-4 border-t border-white/5">
                    <MarqueeDemo />
                </div>
            </div>
        </div>
    );
};

export default AboutContent;
