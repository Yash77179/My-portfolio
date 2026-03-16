import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import IntroAnimation from './ui/scroll-morph-hero';

const FeaturedWork = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} id="featured-work" className="relative w-full h-[400vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Background Texture - Subtle Grain */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-10"></div>
                
                <IntroAnimation scrollYProgress={scrollYProgress} />
            </div>
        </section>
    );
};

export default FeaturedWork;