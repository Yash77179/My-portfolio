import React from 'react';

const SectionDivider = () => (
    <div className="relative w-full h-16 flex items-center justify-center bg-black">
        <div className="absolute left-0 top-0 bottom-0 hidden lg:block w-16 border-r-2 border-white/30 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.15)_10px,rgba(255,255,255,0.15)_20px)]"></div>
        <div className="absolute right-0 top-0 bottom-0 hidden lg:block w-16 border-l-2 border-white/30 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.15)_10px,rgba(255,255,255,0.15)_20px)]"></div>
        <div className="absolute left-4 lg:left-16 right-4 lg:right-16 h-0.5 bg-linear-to-r from-white/30 via-white/60 to-white/30"></div>
        <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-white/80 shadow-lg shadow-white/40"></div>
    </div>
);

export default SectionDivider;
