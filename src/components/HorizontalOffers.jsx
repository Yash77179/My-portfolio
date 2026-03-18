import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalOffers() {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const cardRef = useRef(null);
    const [isNearViewport, setIsNearViewport] = useState(false);

    // LAZY INITIALIZATION:
    // Don't create ANY ScrollTrigger until the section is approaching the viewport.
    // This completely eliminates the 176ms forced reflow cost from page load.
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsNearViewport(true);
                    observer.disconnect(); // Only need to trigger once
                }
            },
            { rootMargin: '200px 0px' } // Start initializing 200px before it enters view
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Only create GSAP animations AFTER the section is near the viewport
    useGSAP(() => {
        if (!isNearViewport) return;

        const track = trackRef.current;
        const card = cardRef.current;
        if (!track || !card) return;

        // Pre-read dimensions ONCE — avoids repeated _getComputedProperty2 reflows
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const totalScroll = trackWidth - viewportWidth;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: `+=${totalScroll + 500}`,
                scrub: 1,
                pin: true,
                pinType: 'fixed',
                invalidateOnRefresh: true,
            }
        });

        // Phase 1: Card enlarges from tiny box in bottom-right
        tl.fromTo(card,
            { scale: 0.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' },
        );

        // Phase 2: Track slides left — force3d isolates it on the GPU compositor
        tl.to(track, {
            x: -totalScroll,
            duration: 1,
            ease: 'none',
            force3d: true,
        });

        return () => tl.kill();
    }, { scope: containerRef, dependencies: [isNearViewport] });

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen bg-[#050505] text-white overflow-hidden"
        >
            <div
                ref={trackRef}
                className="flex h-full"
                style={{ width: '300vw' }}
            >
                {/* ===== PANEL 1: Text + Enlarging Card ===== */}
                <div className="w-screen h-full flex flex-col md:flex-row flex-shrink-0 relative">
                    <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-20 relative z-10">
                        <p className="text-[10px] md:text-xs tracking-[0.25em] font-semibold uppercase mb-6 text-white/40">
                            Offers
                        </p>
                        <h2 className="text-2xl md:text-[3.2rem] leading-[1.15] font-light tracking-tight text-white/90">
                            We align business model, product strategy and organization to transform your projects into sustainable successes.
                        </h2>
                    </div>

                    <div className="absolute bottom-0 right-0 w-[85%] md:w-[48%] h-[55%] md:h-[88%]">
                        <div
                            ref={cardRef}
                            style={{ transformOrigin: 'bottom right' }}
                            className="w-full h-full bg-[#FAFAFA] text-[#111] flex flex-col justify-between p-8 md:p-14 rounded-tl-3xl border-t md:border-l border-neutral-200/60"
                        >
                            <div className="flex justify-between items-start gap-4">
                                <p className="text-sm md:text-lg max-w-sm tracking-tight leading-relaxed text-neutral-600">
                                    Analyzing a market, validating the product-market fit and test the solidity of the business model: key steps to transform a successful idea on offer.
                                </p>
                                <span className="text-red-500 text-xl md:text-2xl font-bold shrink-0">↗</span>
                            </div>
                            <div>
                                <p className="text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-2 md:mb-3">Business &amp; Product</p>
                                <h3 className="text-5xl md:text-8xl tracking-tighter font-semibold text-[#111] leading-[0.85]">Strategy</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== PANEL 2: Divider ===== */}
                <div className="w-screen h-full flex items-center justify-center flex-shrink-0">
                    <div className="w-48 h-48 md:w-72 md:h-72 border border-white/10 rounded-3xl bg-white/[0.02] flex flex-col items-center justify-center gap-6">
                        <p className="text-[9px] tracking-[0.3em] uppercase text-white/30">Offer</p>
                        <div className="w-16 h-16 md:w-20 md:h-20 border border-white/20 rounded-xl flex items-center justify-center rotate-45">
                            <div className="w-8 h-8 md:w-10 md:h-10 border border-white/40 rounded-full -rotate-45" />
                        </div>
                        <p className="text-[9px] tracking-[0.3em] uppercase text-white/30">Offer</p>
                    </div>
                </div>

                {/* ===== PANEL 3: Design Card ===== */}
                <div className="w-screen h-full flex items-center justify-center flex-shrink-0 px-4 md:px-0">
                    <div className="w-full max-w-6xl h-[75vh] bg-[#FAFAFA] text-[#111] rounded-3xl border border-neutral-200/60 p-8 md:p-16 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-4">
                            <p className="text-lg md:text-3xl max-w-2xl tracking-tight leading-snug font-light text-neutral-700">
                                Allier Design Thinking et Agilité pour développer des expériences de marque et des interfaces clients uniques, conçues pour durer et performer.
                            </p>
                            <span className="text-red-500 text-2xl md:text-3xl font-bold shrink-0">↗</span>
                        </div>
                        <div>
                            <p className="text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-3">Digital Experiences</p>
                            <h3 className="text-5xl md:text-[8rem] tracking-tighter font-semibold text-[#111] leading-none">Design</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
