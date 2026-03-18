import { useEffect, useState } from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import '../App.css' // Adjusted import path

// Components - Adjusted import paths
import LoadingScreen from '../components/LoadingScreen'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import BackgroundEffects from '../components/BackgroundEffects'
import CustomCursor from '../components/CustomCursor'
import React, { Suspense } from 'react'

const About = React.lazy(() => import('../components/About'))
const ShadwayGallery = React.lazy(() => import('../components/ShadwayGallery'))
const FeaturedWork = React.lazy(() => import('../components/FeaturedWork'))
const Services = React.lazy(() => import('../components/Services'))
const Projects = React.lazy(() => import('../components/Projects'))
const Experience = React.lazy(() => import('../components/Experience'))
const Testimonials = React.lazy(() => import('../components/Testimonials'))
const Contact = React.lazy(() => import('../components/Contact'))
const Footer = React.lazy(() => import('../components/Footer'))


// Lenis
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true)
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)

  const [isPhysicsReady, setIsPhysicsReady] = useState(false)

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Intersection Observer for Active Section
  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'projects', 'experience', 'contact']
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

  // Spotlight Effect Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return
      const cards = document.querySelectorAll('.spotlight-card')
      cards.forEach(card => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Loading Screen handling
  const handleLoadingComplete = () => {
     setIsLoading(false);
     // Delay the physics unpause until the loading screen doors physically slide open (about 0.8s into the 1.4s exit animation).
     setTimeout(() => setIsPhysicsReady(true), 800);
  }

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
              <Suspense fallback={<div className="min-h-screen"></div>}>
                <About />
              </Suspense>
              <Suspense fallback={<div className="min-h-screen"></div>}>
                <ShadwayGallery />
              </Suspense>
              <Suspense fallback={<div className="min-h-screen"></div>}>
                <Services />
              </Suspense>
              <Suspense fallback={<div className="min-h-screen"></div>}>
                <Projects />
              </Suspense>
              <Suspense fallback={<div className="min-h-screen"></div>}>
                <Experience />
              </Suspense>
              <Suspense fallback={<div className="min-h-screen"></div>}>
                <FeaturedWork />
              </Suspense>
              <Suspense fallback={<div className="min-h-screen"></div>}>
                <Testimonials />
              </Suspense>
              <Suspense fallback={<div className="min-h-screen"></div>}>
                <Contact activeSection={activeSection} isDesktop={isDesktop} />
              </Suspense>
              <Suspense fallback={<div className="min-h-screen"></div>}>
                <Footer />
              </Suspense>
            </main>
          </m.div>
      </div>
    </LazyMotion>
  )
}

export default Home