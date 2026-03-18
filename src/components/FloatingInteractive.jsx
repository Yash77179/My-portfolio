import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const FloatingInteractive = () => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for the tilt
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    // Rotate up to 15 degrees based on mouse position
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        // Reset to flat when mouse leaves
        x.set(0);
        y.set(0);
    };

    // Live Clock for that dynamic "dashboard" feel
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative group perspective-[1000px] pointer-events-auto z-40">
            {/* Glowing orb behind the card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <motion.div
                ref={ref}
                onPointerMove={handleMouseMove}
                onPointerLeave={handleMouseLeave}
                onPointerCancel={handleMouseLeave}
                style={{ 
                    rotateX, 
                    rotateY, 
                    transformStyle: "preserve-3d" 
                }}
                className="relative w-[22rem] h-[28rem] rounded-[2rem] bg-black/40 backdrop-blur-xl border border-white/10 p-8 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-300"
            >
                {/* 3D Glossy Reflection overlay */}
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/50 opacity-20 rounded-[2rem] pointer-events-none" 
                    style={{ transform: "translateZ(1px)" }} 
                />

                {/* Noise filter - increased contrast for that gritty aesthetic */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-screen" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />

                {/* Header at highest 3D elevation */}
                <div style={{ transform: "translateZ(60px)" }} className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse shadow-[0_0_12px_#00ffcc]" />
                        <span className="text-[0.6rem] uppercase tracking-widest text-[#00ffcc] font-bold font-mono">System Live</span>
                    </div>
                    <span className="text-sm font-mono text-white/70 tracking-widest font-bold">
                        {time.toLocaleTimeString([], { hour12: false })}
                    </span>
                </div>

                {/* Main Content pushed forward */}
                <div style={{ transform: "translateZ(80px)" }} className="flex-1 flex flex-col justify-center mt-8 relative">
                    {/* Add a subtle highlight behind the text */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-24 bg-blue-500/20 blur-[40px] rounded-full pointer-events-none -z-10" />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-6xl font-light tracking-tighter text-white mb-2 leading-[0.8] drop-shadow-lg">
                            creative<br/>
                            <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">visionary.</span>
                        </h2>
                    </motion.div>
                    
                    <p className="text-sm text-neutral-300 font-medium leading-relaxed mt-6 max-w-[95%]">
                        sculpting pixels into interactive masterpieces. no boring templates, just raw logic merged with aesthetic supremacy.
                    </p>
                </div>

                {/* Footer Badges */}
                <div style={{ transform: "translateZ(50px)" }} className="flex gap-2 mt-6 flex-wrap">
                    {['WEBGL', 'REACT', 'GSAP', 'SYS'].map(tech => (
                        <div key={tech} className="px-3 py-1 rounded-full border border-white/10 text-[0.6rem] tracking-[0.2em] text-white/60 bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-none">
                            {tech}
                        </div>
                    ))}
                </div>
                
                {/* Spinning decorative orbit element in background */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 border border-white/5 rounded-full animate-[spin_15s_linear_infinite] pointer-events-none" style={{ transform: "translateZ(10px)" }}>
                    <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_cyan]" />
                    <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-purple-400 rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_20px_purple]" />
                </div>
            </motion.div>
        </div>
    );
};

export default FloatingInteractive;
