import React from 'react';
import Globe from './ui/Globe';

const AboutContent = () => {
    return (
        <div className="h-full w-full bg-[#080808] rounded-2xl relative overflow-hidden flex flex-col md:flex-row shadow-2xl">
            {/* Left: The Visual / Atmospheric Side */}
            {/* Changed from h-64 to h-96 for better mobile image visibility. Added 'relative' for positioning. */}
            <div className="w-full md:w-2/5 relative h-96 md:h-full bg-[#050505] overflow-hidden border-b md:border-b-0 md:border-r border-white/5 group-image">
                {/* 
                    Replace the src below with your own image url.
                    Using object-top to prioritize faces/upper body in portrait shots.
                    Remove 'grayscale' if you want color.
                */}
                <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                    alt="Profile"
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale hover:grayscale-0"
                />
                
                {/* Optional: Keep Globe as overlay or remove it. For now, replacing it to solve 'image cropped' issue by giving full control via img tag. */}
                {/* <div className="absolute inset-0 opacity-50 mix-blend-screen"><Globe /></div> */}
                
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

                {/* Overlay Text */}
                <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
                        <div className="w-12 h-1 bg-white mb-4 shadow-[0_0_10px_white]"></div>
                        <p className="text-xs text-white/90 tracking-[0.2em] uppercase font-semibold drop-shadow-md">
                            Global Reach
                        </p>
                </div>
            </div>

            {/* Right: The Narrative Side */}
            <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center relative bg-[#080808]">
                
                <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
                    {/* Decorative architectural lines */}
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.5">
                        <line x1="0" y1="0" x2="100" y2="100" />
                        <line x1="100" y1="0" x2="0" y2="100" />
                        <circle cx="50" cy="50" r="40" />
                    </svg>
                </div>

                <h3 className="text-2xl md:text-3xl font-light mb-6 text-white/90">
                    Designing <span className="text-white font-semibold">Digital Ecosystems</span>
                </h3>
                
                <p className="text-base md:text-lg text-neutral-400 mb-8 leading-relaxed">
                    I am a full-stack developer with a passion for building beautiful, functional, and scalable web applications. 
                    Merging technical precision with creative flair to craft immersive digital experiences.
                </p>

                <div className="flex flex-wrap gap-3">
                    {['React', 'Node.js', 'Three.js', 'TypeScript'].map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-full text-xs border border-white/10 text-white/60 bg-white/5">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutContent;
