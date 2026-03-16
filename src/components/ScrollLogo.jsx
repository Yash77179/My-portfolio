import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollLogo = () => {
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState({ height: 800, width: 1200 });

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setWindowDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxScroll = isMobile ? 300 : 500;

    // Use raw numbers for transforms so they translate automatically to pixels!
    const yTarget = isMobile ? 24 : 32; // padding offset
    const xTarget = isMobile ? 20 : 32; // padding offset
    
    const yPx = useTransform(
        scrollY, 
        [0, maxScroll], 
        [windowDimensions.height * 0.70, yTarget]
    );

    const xPx = useTransform(
        scrollY, 
        [0, maxScroll], 
        [windowDimensions.width * 0.04, xTarget]
    );
    
    // font size uses exact matched units in both keyframes so Framer Motion can interpolate it
    const fontSize = useTransform(
        scrollY, 
        [0, maxScroll], 
        [isMobile ? "25vw" : "18vw", isMobile ? "6vw" : "2vw"]
    );
    
    const letterSpacing = useTransform(scrollY, [0, maxScroll], ["-0.03em", "0em"]);

    // Added opacity transition for safety, though keeping it 1 is fine since we just shrink 
    const opacity = useTransform(scrollY, [0, 50], [0, 1]); // Quick fade in if desired, but we want it visible immediately.
    
    // We'll map the `2vw` directly to `rem` manually at the end via CSS if we prefer, but `vw` is valid.

    return (
        <>
            {/* Invisible SVG filter for the grainy texture - subtle overlay */}
            <svg className="absolute w-0 h-0 pointer-events-none" style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="grain-filter">
                    {/* Generate fine noise */}
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" result="noise" />
                    {/* Reduce noise intensity/opacity significantly */}
                    <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.15 0" in="noise" result="softNoise" />
                    {/* Combine soft noise with the original graphic */}
                    <feComposite operator="in" in="softNoise" in2="SourceGraphic" result="texturedNoise" />
                    <feBlend mode="overlay" in="texturedNoise" in2="SourceGraphic" />
                </filter>
            </svg>

            <motion.a
                href="#home"
                className="fixed top-0 left-0 z-[100] text-white pointer-events-auto mix-blend-difference drop-shadow-md origin-top-left flex items-center justify-center m-0 p-0 no-underline whitespace-nowrap"
                style={{
                    fontFamily: "'General Sans', sans-serif",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    y: yPx,
                    x: xPx,
                    fontSize: fontSize,
                    letterSpacing,
                    lineHeight: 0.85,
                    filter: 'url(#grain-filter)' // Apply filter to the whole container
                }}
            >
                {/* Apply the filter to the text elements */}
                <span className="text-white font-bold tracking-[-0.08em] scale-[1.1] inline-block origin-left">YASH</span>
            </motion.a>
        </>
    );
};

export default ScrollLogo;