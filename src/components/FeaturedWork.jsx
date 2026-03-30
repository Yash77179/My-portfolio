import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircularTestimonials from './ui/circular-testimonials';

gsap.registerPlugin(ScrollTrigger);

// Local Image Assets
import certCoursera from '../assets/certificates/1.jpg';
import certCipher from '../assets/certificates/2.jpg';
import certNptel from '../assets/certificates/3.jpg';

const certificates = [
  {
    quote: "Mastered complex networking architectures, advanced TCP/IP programming, and packet switching algorithms. This rigorous training built the exact foundation I use to engineer highly secure, scalable server backbones and flawless digital communication ecosystems.",
    name: "Computer Communications Elite Specialization",
    designation: "University of Colorado & Coursera",
    src: certCoursera,
    link: "https://coursera.org/share/65e34532c535a553be0109cfd6576887",
  },
  {
    quote: "Solved 150+ intensive logic problems through highly demanding hands-on Data Structures & Algorithms training. This drastically accelerated my algorithmic processing speed, directly empowering me to write hyper-optimized, production-grade application code.",
    name: "Data Structures & Algorithms Mastery",
    designation: "Cipher Schools",
    src: certCipher,
    link: "https://cipher-other-assets.s3.ap-south-1.amazonaws.com/certificates/TC_yashbhosale8329%40gmail.com_CS2025-14755",
  },
  {
    quote: "Analyzed network phenomena like cascading behavior, homophily, and power laws through advanced Graph Theory. This elite-level insight into sociological intelligence allows me to architect incredibly viral, responsive, and widely interconnected platforms.",
    name: "Social Networks Analysis & Graph Theory",
    designation: "NPTEL & IIT Ropar",
    src: certNptel,
    link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs65/Course/NPTEL25CS65S64750118404446871.pdf",
  },
];

const FeaturedWork = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=125%", // Forces the scroll to "stop for a sec" (pins for 1.25x viewport height)
            pin: true,
            pinSpacing: true,
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="featured-work" className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden" style={{ height: "100dvh" }}>
            {/* Background Texture - Subtle Grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>

            {/* Ambient massive 04 background */}
            <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-[-5%] top-[50%] md:top-[40%] -translate-y-1/2 z-0 pointer-events-none select-none text-white/[0.03] font-light" style={{ fontSize: "clamp(15rem, 40vw, 60rem)", lineHeight: 0.75, letterSpacing: "-0.05em" }}>
                04
            </div>
            
            <div className="w-full h-full max-w-[1536px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-center relative z-10 pt-24 pb-16">
                {/* Section Header */}
                <div className="w-full mb-auto">
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <span className="w-12 h-px bg-[#c8b598]/50"></span>
                        <h3 className="text-[0.65rem] uppercase tracking-[0.4em] text-[#c8b598]/80 font-medium">Validations</h3>
                    </div>
                    <h2 className="text-white text-5xl md:text-[5.5rem] lg:text-[7rem] font-light tracking-tighter leading-[0.9]">
                        Certificates <span className="font-serif italic text-white/40">&</span> Awards
                    </h2>
                </div>

                {/* Circular Certificates Slider */}
                <div className="w-full flex justify-center items-center mt-8 md:mt-16 lg:-ml-4 mb-auto">
                    <CircularTestimonials
                        testimonials={certificates}
                        autoplay={true}
                        colors={{
                            name: "#ffffff",
                            designation: "#c8b598",
                            testimony: "#a1a1aa",
                            arrowBackground: "rgba(255,255,255,0.03)",
                            arrowForeground: "#ffffff",
                            arrowHoverBackground: "rgba(255,255,255,0.1)",
                        }}
                        fontSizes={{
                            name: "clamp(1.5rem, 3vw, 2.5rem)",
                            designation: "0.85rem",
                            quote: "clamp(0.95rem, 1.2vw, 1.25rem)",
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default FeaturedWork;