import { useEffect, useState } from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ limitCallbacks: true })
import '../App.css' // Adjusted import path

// Components - Adjusted import paths
import LoadingScreen from '../components/LoadingScreen'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import BackgroundEffects from '../components/BackgroundEffects'
import CustomCursor from '../components/CustomCursor'
import React from 'react'
import Statement from '../components/Statement'
import About from '../components/About'
import ShadwayGallery from '../components/ShadwayGallery'
import FeaturedWork from '../components/FeaturedWork'
import YashWork from '../components/YashWork'

import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'


// Lenis
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true)
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)

  const [isPhysicsReady, setIsPhysicsReady] = useState(false)
  // Immediate top-level scroll purge to prevent the browser from saving/caching the previous scroll location on reloads
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force DOM jump to top on mount
    window.scrollTo(0, 0);

    // Completely nuke the browser's cached scroll 'Y' coordinates BEFORE it refreshes
    const handleBeforeUnload = () => {
        window.scrollTo(0, 0);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, []);

  // Intersection Observer for Active Section
  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'projects', 'contact']
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.45 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  // Resize Handler
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Spotlight Effect Logic — throttled with RAF to avoid forced layout thrashing
  useEffect(() => {
    let rafId = null;
    let lastX = 0, lastY = 0;
    // Cache the DOM query so we aren't rebuilding node lists every tick
    let cachedCards = null;

    const updateSpotlight = () => {
      if (!cachedCards) {
          cachedCards = Array.from(document.querySelectorAll('.spotlight-card'));
      }
      
      cachedCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        // Only trigger layout properties if the card is actively intersecting the viewport bounding box
        if (rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0) {
            card.style.setProperty('--mouse-x', `${lastX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${lastY - rect.top}px`);
        }
      });
      rafId = null;
    };

    const handlePointerMove = (e) => {
      // CRUCIAL PERFORMANCE FIX: Completely ignore processing hover math for touch pointers (phones/tablets) 
      // otherwise we ruthlessly layout-thrash the DOM on every pixel of a scroll gesture!
      if (e.pointerType !== 'mouse') return;
      
      lastX = e.clientX;
      lastY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(updateSpotlight);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Loading Screen handling
  const handleLoadingComplete = () => {
     setIsLoading(false);
     // Delay the physics unpause until the loading screen doors physically slide open (about 0.8s into the 1.4s exit animation).
     setTimeout(() => setIsPhysicsReady(true), 800);
  }

  const staticContent = React.useMemo(() => (
    <>
      <Statement />
      <About />
      <YashWork />

      <FeaturedWork />
      <Testimonials />
    </>
  ), []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="bg-black text-white relative">
        <AnimatePresence mode="wait">
           {isLoading && (
              <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
           )}
        </AnimatePresence>

        <m.div 
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            style={{ 
               pointerEvents: isLoading ? 'none' : 'auto'
            }}
        >
            <BackgroundEffects />
            <CustomCursor />

            <Navbar
                 mobileMenuOpen={mobileMenuOpen}
                 setMobileMenuOpen={setMobileMenuOpen}
                 activeSection={activeSection}
                 isDesktop={isDesktop}
            />

            <main>
              <Hero isDesktop={isDesktop} isLoading={!isPhysicsReady} />
              {staticContent}
              <Contact activeSection={activeSection} isDesktop={isDesktop} />
              <ShadwayGallery />
              <Footer />
            </main>
          </m.div>
      </div>
    </LazyMotion>
  )
}

export default Home