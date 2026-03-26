// src/components/OverlayShadwayGallery.jsx
// A self-contained version of the ShadwayGallery for use inside the ProjectOverlay.
// Instead of GSAP ScrollTrigger (which conflicts with nested scrollers), this version
// uses a sticky-pinned section and reads the overlay's own onScroll directly via a shared ref.
import { useRef, useState, useEffect } from 'react';
import InfiniteGallery from './ui/3d-gallery-photography';

const modules = import.meta.glob('../assets/exanor/exanor-screenshots/*.{png,jpg,jpeg,webp}', { eager: true });
const EXANOR_IMAGES = Object.values(modules).map((mod, index) => ({
    src: mod.default,
    alt: `Exanor Screenshot ${index + 1}`
}));

const recipeModules = import.meta.glob('../assets/Reciepe Sharing/rs/*.{png,jpg,jpeg,webp}', { eager: true });
const RECIPE_IMAGES = Object.values(recipeModules).map((mod, index) => ({
    src: mod.default,
    alt: `Recipe Sharing Screenshot ${index + 1}`
}));

const SAMPLE_IMAGES = [
    { src: 'https://images.unsplash.com/photo-1741332966416-414d8a5b8887?w=600&auto=format&fit=crop&q=60', alt: 'Image 1' },
    { src: 'https://images.unsplash.com/photo-1754769440490-2eb64d715775?q=80&w=1113&auto=format&fit=crop', alt: 'Image 2' },
    { src: 'https://images.unsplash.com/photo-1758640920659-0bb864175983?w=600&auto=format&fit=crop&q=60', alt: 'Image 3' },
    { src: 'https://plus.unsplash.com/premium_photo-1758367454070-731d3cc11774?w=600&auto=format&fit=crop&q=60', alt: 'Image 4' },
    { src: 'https://images.unsplash.com/photo-1746023841657-e5cd7cc90d2c?w=600&auto=format&fit=crop&q=60', alt: 'Image 5' },
    { src: 'https://images.unsplash.com/photo-1741715661559-6149723ea89a?w=600&auto=format&fit=crop&q=60', alt: 'Image 6' },
    { src: 'https://images.unsplash.com/photo-1725878746053-407492aa4034?w=600&auto=format&fit=crop&q=60', alt: 'Image 7' },
    { src: 'https://images.unsplash.com/photo-1752588975168-d2d7965a6d64?w=600&auto=format&fit=crop&q=60', alt: 'Image 8' },
];

// The scroll-travel distance (in px) that maps 0→1 in gallery progress
const SCROLL_TRAVEL = 4000;

/**
 * OverlayShadwayGallery
 * 
 * Uses CSS sticky positioning to pin the canvas inside the overlay scroll.
 * A tall outer wrapper creates the scroll "room". 
 * The `overlayScrollRef` is a ref object whose `.current` is updated by the
 * overlay's onScroll handler with the raw scrollTop value.
 */
export default function OverlayShadwayGallery({ project }) {
    const wrapperRef = useRef(null);
    const scrollProgress = useRef(0);
    const rafRef = useRef(null);
    const [isNearViewport, setIsNearViewport] = useState(false);

    // Update scrollProgress each frame based on the extremely accurate getBoundingClientRect
    // This effortlessly avoids nested 'offsetParent' scaling issues.
    useEffect(() => {
        const tick = () => {
            const wrapper = wrapperRef.current;
            if (wrapper) {
                const rect = wrapper.getBoundingClientRect();
                
                // If rect.top is > 0, we haven't reached the top of viewport yet.
                // If rect.top is < 0, we are scrolling THROUGH the pinned sticky container.
                // We use Math.max(0, -rect.top) to track exactly how many pixels we've scrolled inside it.
                const scrolledIntoWrapper = Math.max(0, -rect.top);
                
                // Allow progress to exceed 1.0 so the 3D engine knows we are natively scrolling past it
                // and can execute a smooth simultaneous 3D exit animation.
                const progress = Math.max(0, scrolledIntoWrapper / SCROLL_TRAVEL);
                scrollProgress.current = progress;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // IntersectionObserver to pause the WebGL canvas when not visible
    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsNearViewport(entry.isIntersecting),
            { rootMargin: '200px 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    let imagesToUse = SAMPLE_IMAGES;
    if (project) {
        if (project.title === 'Exanor') imagesToUse = EXANOR_IMAGES;
        else if (project.title === 'Recipe Sharing Portal') imagesToUse = RECIPE_IMAGES;
    }

    return (
        // Tall outer wrapper — gives the overlay scroll room to "travel through" the gallery
        <div
            ref={wrapperRef}
            style={{ height: `calc(100dvh + ${SCROLL_TRAVEL}px)`, position: 'relative' }}
        >
            {/* Sticky inner — stays pinned to viewport-top while parent is in view */}
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100dvh',
                    width: '100%',
                    overflow: 'hidden',
                    background: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <InfiniteGallery
                    images={imagesToUse}
                    speed={1.0}
                    visibleCount={imagesToUse.length}
                    scrollProgress={scrollProgress}
                    className="w-full h-full"
                    inView={isNearViewport}
                />
            </div>
        </div>
    );
}
