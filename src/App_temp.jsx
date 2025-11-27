import { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import './App.css'
import yashPhoto from './assets/yash.png'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const SectionDivider = () => (
  <div className="relative w-full h-16 flex items-center justify-center bg-black">
    <div className="absolute left-0 top-0 bottom-0 hidden lg:block w-16 border-r-2 border-white/30 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.15)_10px,rgba(255,255,255,0.15)_20px)]"></div>
    <div className="absolute right-0 top-0 bottom-0 hidden lg:block w-16 border-l-2 border-white/30 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.15)_10px,rgba(255,255,255,0.15)_20px)]"></div>
    <div className="absolute left-4 lg:left-16 right-4 lg:right-16 h-0.5 bg-linear-to-r from-white/30 via-white/60 to-white/30"></div>
    <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-white/80 shadow-lg shadow-white/40"></div>
  </div>
)

const projects = [
  {
    title: 'Immersive Finance Dashboard',
    summary: 'Realtime trading cockpit with adaptive theming, sentiment signals, and L2 order flow overlays.',
    stack: ['React', 'D3', 'WebSockets'],
    result: 'Boosted analyst velocity by 34% through dense-yet-readable data viz.',
  },
  {
    title: 'Automotive AR Showroom',
    summary: 'Web-based AR configurator that lets shoppers explore trims, lighting packages, and tactile finishes.',
    stack: ['Three.js', 'Spline', 'GSAP'],
    result: 'Raised lead submissions 2.1x by blending storytelling with configurability.',
  },
  {
    title: 'SaaS Brand Operating System',
    summary: 'Design system + content engine powering multi-market launches with auto-localized assets.',
    stack: ['Figma', 'Next.js', 'Contentful'],
    result: 'Cut launch prep from 10 days to 36 hours across six regions.',
  },
]

const services = [
  {
    title: 'Product Strategy',
    description: 'North-star definition, JTBD framing, KPI trees, and multi-horizon roadmap orchestration.',
  },
  {
    title: 'Experience Design',
    description: 'End-to-end journeys, motion systems, prototyping, and usability validation with high-signal cohorts.',
  },
  {
    title: 'Creative Engineering',
    description: 'Interactive canvases, WebGL moments, performance tuning, and design-system implementation.',
  },
]

const stats = [
  { label: 'Products shipped', value: '24' },
  { label: 'Interfaces audited', value: '80+' },
  { label: 'Avg. conversion lift', value: '38%' },
  { label: 'Awards + features', value: '10' },
]

const testimonials = [
  {
    quote: 'Yash translates ambiguous ambition into interfaces that feel inevitable. Every detail carries intent.',
    author: 'Priya Nair — CPO, Lumen Labs',
  },
  {
    quote: 'He is the rare designer-engineer who can run discovery with execs in the morning and push production-ready code that night.',
    author: 'Leo Martín — Head of Product, Flux Mobility',
  },
  {
    quote: 'Working with Yash elevated our entire product vision. His ability to bridge design and engineering is unmatched.',
    author: 'Sarah Chen — Engineering Lead, TechFlow',
  },
  {
    quote: 'The attention to micro-interactions and user experience details sets Yash apart. Every pixel has purpose.',
    author: 'Marcus Rodriguez — Design Director, Creative Studio',
  },
  {
    quote: 'Yash delivered not just designs, but a complete design system that our team still uses today. Incredible work.',
    author: 'Emily Watson — Product Manager, InnovateCo',
  },
  {
    quote: 'His React implementations are clean, performant, and maintainable. A true full-stack designer.',
    author: 'David Kim — CTO, StartupHub',
  },
]

function App() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const photoRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const followerPos = useRef({ x: 0, y: 0 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(() => new Date())
  const signalScrollRef = useRef(null)
  const signalScrollStateRef = useRef({
    position: 0,
    isPaused: false,
    isUserInteracting: false,
    lastUserInteraction: 0,
  })
  const [isSignalHovered, setIsSignalHovered] = useState(false)

  useEffect(() => {
    // Custom cursor movement
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`
      }

      // Photo tilt effect based on mouse position
      if (photoRef.current) {
        const rect = photoRef.current.getBoundingClientRect()
        const photoX = rect.left + rect.width / 2
        const photoY = rect.top + rect.height / 2
        
        // Calculate rotation based on mouse distance from photo center
        const rotateX = ((e.clientY - photoY) / window.innerHeight) * 15
        const rotateY = ((e.clientX - photoX) / window.innerWidth) * -15
        
        photoRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }
    }

    // Smooth follower animation
    let animationId
    const animateFollower = () => {
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.15
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.15
      
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px)`
      }
      animationId = requestAnimationFrame(animateFollower)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animateFollower()

    // Cursor grow on link hover
    const links = document.querySelectorAll('a, button')
    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '30px'
        cursorRef.current.style.height = '30px'
      }
    }
    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '20px'
        cursorRef.current.style.height = '20px'
      }
    }

    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter)
      link.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter)
        link.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(progress)
    }

    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-scroll for Signal section - clean implementation
  useEffect(() => {
    const scrollContainer = signalScrollRef.current
    if (!scrollContainer) return

    const SCROLL_SPEED = 2 // pixels per frame
    const RESUME_DELAY = 2000 // ms after user interaction stops
    let animationId = null
    let resumeTimeout = null
    let expectedScrollLeft = 0

    // Wait for container to be ready
    const initScroll = () => {
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
      if (maxScroll <= 0) {
        setTimeout(initScroll, 100)
        return
      }

      // Initialize position
      signalScrollStateRef.current.position = scrollContainer.scrollLeft
      expectedScrollLeft = scrollContainer.scrollLeft

      // Main animation loop
      const animate = () => {
        const state = signalScrollStateRef.current
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        const halfScroll = maxScroll / 2

        // Check if we should pause
        const shouldPause = isSignalHovered || state.isUserInteracting

        if (shouldPause) {
          // Paused - sync position with actual scroll
          state.position = scrollContainer.scrollLeft
          expectedScrollLeft = scrollContainer.scrollLeft
          animationId = requestAnimationFrame(animate)
          return
        }

        // Auto-scrolling - update position
        state.position += SCROLL_SPEED

        // Loop reset at halfway point
        if (halfScroll > 0 && state.position >= halfScroll) {
          state.position = 0
          scrollContainer.scrollLeft = 0
          expectedScrollLeft = 0
        } else {
          scrollContainer.scrollLeft = state.position
          expectedScrollLeft = state.position
        }

        animationId = requestAnimationFrame(animate)
      }

      // Start animation
      animationId = requestAnimationFrame(animate)
    }

    // Detect user interactions
    const markUserInteraction = () => {
      const state = signalScrollStateRef.current
      state.isUserInteracting = true
      state.position = scrollContainer.scrollLeft
      expectedScrollLeft = scrollContainer.scrollLeft

      // Clear existing timeout
      if (resumeTimeout) {
        clearTimeout(resumeTimeout)
      }

      // Resume after delay
      resumeTimeout = setTimeout(() => {
        state.isUserInteracting = false
        state.position = scrollContainer.scrollLeft
        expectedScrollLeft = scrollContainer.scrollLeft
      }, RESUME_DELAY)
    }

    // Detect manual scroll by comparing expected vs actual
    const handleScroll = () => {
      const actualScroll = scrollContainer.scrollLeft
      const diff = Math.abs(actualScroll - expectedScrollLeft)

      // If difference is significant, user is manually scrolling
      if (diff > 2) {
        markUserInteraction()
      } else {
        // Sync expected with actual (handles edge cases)
        expectedScrollLeft = actualScroll
      }
    }

    // User interaction handlers
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > 0) {
        markUserInteraction()
      }
    }

    const handleTouchStart = () => markUserInteraction()
    const handleMouseDown = () => markUserInteraction()

    // Attach event listeners
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    scrollContainer.addEventListener('wheel', handleWheel, { passive: true })
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true })
    scrollContainer.addEventListener('mousedown', handleMouseDown)

    // Initialize after a short delay
    const initTimeout = setTimeout(initScroll, 300)

    // Cleanup
    return () => {
      clearTimeout(initTimeout)
      if (resumeTimeout) clearTimeout(resumeTimeout)
      if (animationId) cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener('scroll', handleScroll)
      scrollContainer.removeEventListener('wheel', handleWheel)
      scrollContainer.removeEventListener('touchstart', handleTouchStart)
      scrollContainer.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isSignalHovered])

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const scrollPercent = Math.round(scrollProgress * 100)

  return (
    <div className="bg-black text-white overflow-x-hidden relative">
      {/* Subtle mesh gradient background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(59,130,246,0.15), transparent 55%),
            radial-gradient(circle at 80% 15%, rgba(236,72,153,0.15), transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(16,185,129,0.12), transparent 55%),
            radial-gradient(circle at 30% 80%, rgba(168,85,247,0.14), transparent 60%)`,
          backgroundBlendMode: 'screen',
          filter: 'blur(45px)',
        }}
      ></div>
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 opacity-40 pointer-events-none grain-layer"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.1), transparent 35%), radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.12), transparent 40%), radial-gradient(1px 1px at 90% 30%, rgba(255,255,255,0.12), transparent 35%)',
          backgroundSize: '80px 80px',
          animation: 'grain 12s steps(10) infinite',
          mixBlendMode: 'screen',
        }}
      ></div>
      {/* Margins / framing accents */}
      <div className="fixed inset-0 pointer-events-none z-150">
        {/* Mobile border lines (show on screens smaller than laptop) */}
        <div className="mobile-frame-line absolute top-6 bottom-6 left-2 lg:hidden"></div>
        <div className="mobile-frame-line absolute top-6 bottom-6 right-2 lg:hidden"></div>

        {/* Left margin column with stripes (only laptop and up) */}
        <div className="absolute left-0 top-0 bottom-0 hidden lg:block w-16 border-r-2 border-white/30 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.15)_10px,rgba(255,255,255,0.15)_20px)]"></div>
        
        {/* Right margin column with stripes (only laptop and up) */}
        <div className="absolute right-0 top-0 bottom-0 hidden lg:block w-16 border-l-2 border-white/30 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.15)_10px,rgba(255,255,255,0.15)_20px)]"></div>
        
        {/* Top line */}
        <div className="absolute left-0 right-0 top-0 h-0.5 bg-white/30"></div>
        
        {/* Bottom line */}
        <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-white/30"></div>
      </div>

      {/* Custom Cursors */}
      <div ref={cursorRef} className="cursor"></div>
      <div ref={followerRef} className="cursor-follower"></div>
      
      {/* Professional Navbar */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-100 w-[94vw] md:w-[95vw] lg:w-auto md:max-w-[95vw] lg:max-w-none" aria-label="Primary">
        <div className="relative flex items-center gap-2 md:gap-3 lg:gap-8 h-14 md:h-16 lg:h-18 px-3 md:px-4 lg:px-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.45)] min-w-0">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-full border border-white/30 text-white text-sm uppercase tracking-[0.3em] flex items-center justify-center">
              YP
            </div>
            <p className="text-white/70 text-xs uppercase tracking-[0.35em] hidden lg:block">Portfolio</p>
          </div>

          {/* Desktop Menu - single line, no wrap */}
          <ul className="hidden md:flex items-center gap-1 md:gap-1.5 lg:gap-4 list-none flex-nowrap min-w-0 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <li key={link.href} className="shrink-0">
                  <a
                    href={link.href}
                    className="relative block px-1.5 md:px-2 lg:px-4 py-2 text-[0.6rem] md:text-[0.65rem] lg:text-sm font-semibold uppercase tracking-[0.25em] md:tracking-[0.3em] lg:tracking-[0.4em] text-white/80 hover:text-white transition-colors whitespace-nowrap"
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-2px w-2/3 rounded-full transition-all duration-300 ${
                        isActive ? 'scale-x-100 bg-white' : 'scale-x-0 bg-white/40'
                      }`}
                    ></span>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Actions */}
          <div className="hidden md:flex items-center ml-auto shrink-0">
            <a
              href="/YashPatil-Resume.pdf"
              className="text-[0.6rem] md:text-[0.65rem] lg:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] lg:tracking-[0.4em] text-white/70 hover:text-white transition-colors whitespace-nowrap px-1.5 md:px-2 lg:px-0"
            >
              Résumé
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 shrink-0 ml-auto"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
