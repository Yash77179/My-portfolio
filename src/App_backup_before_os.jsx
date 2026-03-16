import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Components
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ShadwayGallery from './components/ShadwayGallery'
import FeaturedWork from './components/FeaturedWork'
import Services from './components/Services'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackgroundEffects from './components/BackgroundEffects'
import CustomCursor from './components/CustomCursor'

// Lenis
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true)
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
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

  return (
    <div className="bg-black text-white relative">
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div 
            key="main-app"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
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
                <Hero isDesktop={isDesktop} />
                <About />
                <ShadwayGallery />
                <Services />
                <Projects />
                <Experience />
                <FeaturedWork />
                <Testimonials />
                <Contact activeSection={activeSection} isDesktop={isDesktop} />
              </main>

              <Footer />
          </motion.div>
      )}
    </div>
  )
}

export default App
