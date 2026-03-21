// src/components/ShadwayGallery.jsx
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import InfiniteGallery from './ui/3d-gallery-photography';

gsap.registerPlugin(ScrollTrigger);

export default function ShadwayGallery() {
    const containerRef = useRef(null);
    const scrollProgress = useRef(0);
    const [isNearViewport, setIsNearViewport] = useState(false);

    // Track whether the gallery is near the viewport to pause/resume the 3D Canvas
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsNearViewport(entry.isIntersecting),
            { rootMargin: '400px 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const sampleImages = [
        { src: 'https://images.unsplash.com/photo-1741332966416-414d8a5b8887?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8', alt: 'Image 1' },
        { src: 'https://images.unsplash.com/photo-1754769440490-2eb64d715775?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 2' },
        { src: 'https://images.unsplash.com/photo-1758640920659-0bb864175983?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 3' },
        { src: 'https://plus.unsplash.com/premium_photo-1758367454070-731d3cc11774?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 4' },
        { src: 'https://images.unsplash.com/photo-1746023841657-e5cd7cc90d2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 5' },
        { src: 'https://images.unsplash.com/photo-1741715661559-6149723ea89a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 6' },
        { src: 'https://images.unsplash.com/photo-1725878746053-407492aa4034?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 7' },
        { src: 'https://images.unsplash.com/photo-1752588975168-d2d7965a6d64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2M3x8fGVufDB8fHx8fA%3D%3D', alt: 'Image 8' },
    ];

    useGSAP(() => {
        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=4000", // Increased duration for smoother/longer scroll
            pin: true,
            scrub: 1, // Smooth scrubbing
            pinType: "fixed", // Force fixed coordinate pinning natively for Lenis compatibility
            onUpdate: (self) => {
                // Directly update the ref without causing a re-render
                scrollProgress.current = self.progress;
            }
        });
        
        return () => {
            if (trigger) trigger.kill();
        }
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
            {/* Gallery */}
            <InfiniteGallery
                images={sampleImages}
                speed={1.0}
                visibleCount={8}
                scrollProgress={scrollProgress}
                className="w-full h-full"
                inView={isNearViewport}
            />
        </section>
    );
}
