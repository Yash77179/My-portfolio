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
  { label: 'Commercial Projects', value: '24', sub: 'Fintech, Auto, SaaS' },
  { label: 'User Base Impact', value: '2.4M+', sub: 'Daily Active Users' },
  { label: 'Conversion Lift', value: '38%', sub: 'Avg. Optimization' },
  { label: 'Design Systems', value: '04', sub: 'Built from scratch' },
  { label: 'Component Library', value: '450+', sub: 'React / Tailwind' },
  { label: 'Code Commits', value: '8.5k', sub: 'Last 12 months' },
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
  const signalScrollRef = useRef(null)
  const [isSignalHovered, setIsSignalHovered] = useState(false)
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
  
  // Contact Toggle State
  const [activeContactTab, setActiveContactTab] = useState('email')
  const [contactPillStyle, setContactPillStyle] = useState({ left: 0, width: 0 })
  const contactTabRefs = useRef({})

  // Robust Infinite Scroll Logic
  useEffect(() => {
    const scrollContainer = signalScrollRef.current
    if (!scrollContainer) return

    let animationId
    const scrollSpeed = 0.8 // Subtle, premium speed

    const scroll = () => {
      if (!isSignalHovered) {
        scrollContainer.scrollLeft += scrollSpeed
      }
      
      // Seamless loop logic:
      // We have 4 sets of testimonials.
      // When we scroll past half the total width (end of set 2), we jump back to 0 (start of set 1).
      // Since Set 1+2 is identical to Set 3+4, the jump is invisible.
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0
      }
      
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationId)
  }, [isSignalHovered])

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

  useEffect(() => {
    const updatePill = () => {
      const el = contactTabRefs.current[activeContactTab]
      if (el) {
        setContactPillStyle({
          left: el.offsetLeft,
          width: el.offsetWidth
        })
      }
    }
    
    // Update on mount and resize
    const timeout = setTimeout(updatePill, 100)
    window.addEventListener('resize', updatePill)
    return () => {
      window.removeEventListener('resize', updatePill)
      clearTimeout(timeout)
    }
  }, [activeContactTab, isDesktop, mobileMenuOpen])

  // Spotlight Effect Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
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
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-100 w-[92vw] md:w-[90vw] lg:w-fit lg:max-w-[calc(100vw-10rem)]" aria-label="Primary">
        <div className="relative flex items-center justify-between md:justify-start gap-2 md:gap-4 lg:gap-8 h-20 md:h-16 lg:h-18 px-5 md:px-6 lg:px-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full overflow-hidden">
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          
          {/* Logo - Architectural Abstract */}
          <a href="#home" className="group flex items-center gap-4 shrink-0 z-50 cursor-pointer relative">
            <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full transition-all duration-500 group-hover:bg-white group-hover:border-white group-hover:text-black">
               <span className="font-serif text-sm font-bold">Y</span>
            </div>
            
            {/* Text Label */}
            <div className="hidden lg:flex flex-col gap-0.5">
              <span className="font-serif text-xs uppercase tracking-[0.2em] text-white group-hover:text-white/80 transition-colors">Yash Patil</span>
            </div>
          </a>

          {/* Desktop Menu - single line, no wrap */}
          <ul className="hidden md:flex items-center gap-2 lg:gap-6 list-none flex-nowrap min-w-0 flex-1 justify-center relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <li key={link.href} className="shrink-0">
                  <a
                    href={link.href}
                    className={`relative block px-4 py-2 font-serif text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-white/50 hover:text-white'
                      }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"></span>
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Actions */}
          <div className="hidden md:flex items-center ml-auto shrink-0 relative">
            <a
              href="/YashPatil-Resume.pdf"
              className="group inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300"
            >
              <span className="font-serif text-[0.65rem] uppercase tracking-[0.2em]">Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden ml-auto relative z-200 p-2 -mr-2 text-white ${mobileMenuOpen ? 'menu-active' : ''}`}
            aria-label="Toggle menu"
          >
            <div className="hamburger-box">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </button>

        </div>
      </nav>

      {/* Cinematic Mobile Menu Overlay - Symmetrical God Mode */}
      <div 
        className={`fixed inset-0 z-90 bg-black flex flex-col items-center justify-between pb-32 pt-20 md:hidden menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
      >
        {/* Background Grain & Symmetrical Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
          {/* Central Axis Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-linear-to-b from-transparent via-white/10 to-transparent"></div>
          {/* Central Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-purple-900/20 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
        </div>

        {/* Menu Links - Perfectly Centered & Symmetrical */}
        <nav className="relative z-10 flex-1 flex flex-col items-center justify-center gap-12 w-full">
          {navLinks.map((link, index) => (
            <div key={link.href} className="menu-link-item w-full flex justify-center">
              <a
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group relative flex flex-col items-center justify-center py-2"
              >
                {/* Symmetrical Numbering */}
                <span className="text-xs font-mono text-white/30 mb-2 tracking-widest transition-all duration-500 group-hover:text-emerald-400">
                  0{index + 1}
                </span>
                
                {/* Massive Text */}
                <span className="text-5xl sm:text-6xl font-serif uppercase tracking-wide text-transparent bg-clip-text bg-linear-to-b from-white to-white/50 group-hover:to-white transition-all duration-500">
                  {link.label}
                </span>

                {/* Center Dot Reveal */}
                <span className="absolute -bottom-4 w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
              </a>
            </div>
          ))}
        </nav>

        {/* Footer Actions - Centered */}
        <div className="relative z-10 flex flex-col items-center gap-8 w-full menu-link-item menu-footer">
          <div className="flex items-center gap-4">
            <a
              href="/YashPatil-Resume.pdf"
              className="px-8 py-3 rounded-full border border-white/20 font-serif text-xs uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
            >
              Résumé
            </a>
            <a
              href="mailto:hello@yashpatil.design"
              className="px-8 py-3 rounded-full bg-white text-black font-serif text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Contact
            </a>
          </div>
          
          <div className="flex gap-8 text-white/30">
            {['LinkedIn', 'GitHub', 'Twitter'].map((social) => (
              <a key={social} href="#" className="text-[0.6rem] uppercase tracking-[0.2em] hover:text-white transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
            {/* Animation Section */}
      <section id="home" className="w-screen h-screen flex items-center justify-center relative overflow-hidden">
        {activeSection === 'home' && (
          <div className="absolute inset-0 w-full h-full z-5" style={{ width: '100vw', height: '100vh' }}>
            <div className="w-full h-full scale-150">
              <Spline scene="https://prod.spline.design/AJmDYoypTxdLn7PY/scene.splinecode" />
            </div>
          </div>
        )}

        {/* Hero Content Overlay */}
        <div className="relative z-50 px-4 md:px-6 py-8 md:py-12 w-full h-full flex flex-col justify-between pointer-events-none">
          {/* Top left corner - Tagline */}
          <div className="hidden lg:block absolute top-20 md:top-8 lg:top-28 2xl:top-8 left-4 md:left-8 pointer-events-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-white/30"></div>
              <p className="font-serif text-xs uppercase tracking-[0.2em] text-white/80">Design Matters</p>
            </div>
          </div>

          {/* Top right corner - Location & CTA */}
          <div className="hidden lg:block absolute top-20 md:top-8 lg:top-28 2xl:top-8 right-4 md:right-8 text-right pointer-events-auto">
            <p className="font-serif text-xs text-white/60 mb-2 hidden sm:block tracking-[0.1em]">48.8645° N | 2.4448° W</p>
            <a href="#contact" className="font-serif text-xs tracking-[0.2em] text-white hover:text-white/80 transition-colors uppercase border-b border-white/30 pb-0.5 hover:border-white">Get in Touch</a>
          </div>

          {/* Top Left - YASH - Architectural Wireframe */}
          <div className="absolute top-32 sm:top-28 md:top-24 lg:top-40 2xl:top-24 left-4 md:left-8 pointer-events-auto z-20 mix-blend-difference">
            <div className="relative group/name cursor-default">
              {/* Wireframe Layer - Solid on mobile, Wireframe on Desktop */}
              <h1 className="relative z-10 text-[25vw] sm:text-[14vw] md:text-[12vw] lg:text-[14vw] font-serif italic leading-none tracking-tighter text-white lg:text-transparent lg:[-webkit-text-stroke:1px_rgba(255,255,255,0.5)] transition-all duration-700 lg:group-hover/name:text-white lg:group-hover/name:[-webkit-text-stroke:0px]">
                YASH
              </h1>
              
              {/* Echo/Ghost Layer (Desktop only) */}
              <h1 className="hidden lg:block absolute inset-0 z-0 text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[14vw] font-serif italic leading-none tracking-tighter text-white/10 opacity-0 blur-sm transition-all duration-500 group-hover/name:opacity-100 group-hover/name:translate-x-4 group-hover/name:translate-y-4">
                YASH
              </h1>

              {/* Technical Markers (Desktop only) */}
              <div className="hidden lg:block absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-white/0 transition-all duration-500 group-hover/name:border-white/50 group-hover/name:-translate-x-2 group-hover/name:-translate-y-2"></div>
              <div className="hidden lg:block absolute top-1/2 -right-8 w-12 h-px bg-white/0 transition-all duration-500 group-hover/name:bg-white/50 group-hover/name:translate-x-4"></div>
              <p className="hidden lg:block absolute -bottom-4 left-1 font-mono text-[0.6rem] tracking-[0.5em] text-white/0 group-hover/name:text-white/60 transition-all duration-500 delay-100">DESIGNER</p>
            </div>
          </div>

          {/* Bottom Right - PATIL - Architectural Wireframe */}
          <div className="absolute bottom-32 sm:bottom-28 md:bottom-24 right-4 md:right-8 text-right pointer-events-auto z-20 mix-blend-difference">
            <div className="relative group/name cursor-default">
              {/* Wireframe Layer - Solid on mobile, Wireframe on Desktop */}
              <h1 className="relative z-10 text-[25vw] sm:text-[14vw] md:text-[12vw] lg:text-[14vw] font-serif italic leading-none tracking-tighter text-white lg:text-transparent lg:[-webkit-text-stroke:1px_rgba(255,255,255,0.5)] transition-all duration-700 lg:group-hover/name:text-white lg:group-hover/name:[-webkit-text-stroke:0px]">
                PATIL
              </h1>
              
              {/* Echo/Ghost Layer (Desktop only) */}
              <h1 className="hidden lg:block absolute inset-0 z-0 text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[14vw] font-serif italic leading-none tracking-tighter text-white/10 opacity-0 blur-sm transition-all duration-500 group-hover/name:opacity-100 group-hover/name:-translate-x-4 group-hover/name:-translate-y-4">
                PATIL
              </h1>

              {/* Technical Markers (Desktop only) */}
              <div className="hidden lg:block absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-white/0 transition-all duration-500 group-hover/name:border-white/50 group-hover/name:translate-x-2 group-hover/name:translate-y-2"></div>
              <div className="hidden lg:block absolute top-1/2 -left-8 w-12 h-px bg-white/0 transition-all duration-500 group-hover/name:bg-white/50 group-hover/name:-translate-x-4"></div>
              <p className="hidden lg:block absolute -top-4 right-1 font-mono text-[0.6rem] tracking-[0.5em] text-white/0 group-hover/name:text-white/60 transition-all duration-500 delay-100">DEVELOPER</p>
            </div>
          </div>

          {/* Bottom left - Role */}
          <div className="absolute bottom-20 sm:bottom-12 md:bottom-8 left-4 md:left-8 pointer-events-auto">
            <div className="flex flex-col gap-1">
              <p className="font-serif text-xs md:text-sm tracking-[0.2em] text-white/80 uppercase">UI/UX Design</p>
              <p className="font-serif text-xs md:text-sm tracking-[0.2em] text-white/80 uppercase hidden sm:block">Digital Branding</p>
            </div>
          </div>

          {/* Bottom center - Scroll indicator (subtly nudged left for better balance with the name) */}
          <div className="absolute bottom-6 md:bottom-8 left-0 right-0 hidden md:flex justify-center pr-8">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('about')
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="group pointer-events-auto flex flex-col items-center gap-2 focus:outline-none"
              aria-label="Scroll to explore more"
            >
              <p className="font-serif text-[0.55rem] tracking-[0.35em] text-white/60 uppercase group-hover:text-white/90 transition-colors">
                Scroll
              </p>
              <div className="relative h-9 w-6 rounded-full border border-white/35 group-hover:border-white/70 transition-colors flex items-start justify-center overflow-hidden">
                <span className="scroll-dot"></span>
              </div>
              <span className="h-4 w-px bg-white/25 group-hover:h-7 transition-all duration-300"></span>
            </button>
          </div>

          {/* Bottom right corner info - Resolution info */}
          <div className="absolute bottom-20 sm:bottom-12 md:bottom-8 right-4 md:right-8 text-right pointer-events-auto hidden lg:block">
            <p className="font-serif text-xs text-white/60 uppercase tracking-widest">Desktop <span className="text-white/80">1707x898</span> Background</p>
          </div>

          {/* Center overlay - Photo with glassmorphic effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
            <div
              ref={photoRef}
              className="relative group transition-transform duration-150 ease-out"
              style={{
                transform: 'perspective(1000px) rotateX(5deg) rotateY(-5deg)',
                animation: 'float 6s ease-in-out infinite'
              }}
            >
              {/* Ambient rings */}
              <div className="absolute -inset-8 rounded-32px border border-white/10 opacity-40 group-hover:opacity-80 transition duration-300 -z-10"></div>
              <div className="absolute -inset-14 rounded-[40px] border border-white/5 opacity-20 group-hover:opacity-60 transition duration-300 -z-20"></div>
              <div className="absolute inset-0 rounded-32px blur-3xl bg-linear-to-br from-white/20 via-purple-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-80 transition duration-500 -z-20"></div>

              {/* Glassmorphic container */}
              <div className="relative p-1.5 md:p-2 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50 hover:bg-white/15 hover:border-white/30 transition-all duration-500 overflow-hidden">
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-10"></div>
                
                <img
                  src={yashPhoto}
                  alt="Yash Patil"
                  className="relative z-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-xl md:rounded-2xl object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* About — narrative + subtle motion */}
      <section id="about" className="relative bg-black text-white px-6 md:px-16 lg:px-24 py-20 md:py-28 overflow-hidden">
        {/* Ambient Background Glow for Symmetry */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none opacity-20 mix-blend-screen"></div>
        
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Narrative column */}
          <div className="lg:col-span-7 space-y-10 about-reveal-left">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-white/30"></span>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">About Me</p>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/50">
                Designing interfaces that feel inevitable, then building them so they ship.
              </h2>
            </div>
            
            <div className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed font-light">
              <p>
                I&apos;m Yash, a designer–developer who loves the space where <span className="text-white font-normal">cinematic visuals</span> meet <span className="text-white font-normal">clean product thinking</span>. I obsess over small states: hover motions, loading skeletons, the way light hits a card — all the details that make a product feel considered instead of generic.
              </p>
              <p>
                On the engineering side, I work primarily in <span className="text-white font-normal">React</span>, <span className="text-white font-normal">Tailwind</span>, and modern 3D / motion tools like <span className="text-white font-normal">Spline</span>. My goal is always the same: keep concepts tight enough for stakeholders to get excited, and execution realistic enough that engineers actually want to ship it.
              </p>
            </div>

            <div className="pt-4">
              <div className="flex flex-wrap gap-3">
                {['Interface Design', 'UI Engineering', 'Motion & Micro‑interactions', 'Brand Systems'].map((chip) => (
                  <span
                    key={chip}
                    className="group relative px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                      {chip}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 text-[0.7rem] md:text-xs uppercase tracking-[0.25em] text-white/40 pt-2 border-t border-white/5">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400/80">Open for Summer &apos;25</span>
              </span>
              <span className="w-px h-3 bg-white/20"></span>
              <span>Pune · Remote friendly</span>
            </div>
          </div>

          {/* Signal / stats column */}
          <div className="lg:col-span-5 space-y-5 about-reveal-right">
            {/* Main Stats Card - Ultra Premium */}
            <div className="spotlight-card group relative overflow-hidden p-8 border border-white/10 rounded-3xl bg-black/40 backdrop-blur-xl shadow-2xl">
              {/* Subtle Grid Background */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
              
              <div className="relative flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">Impact Metrics</p>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-emerald-400 transition-colors duration-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-emerald-400 transition-colors duration-500 delay-75"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-emerald-400 transition-colors duration-500 delay-150"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  {stats.slice(0, 4).map((stat) => (
                    <div key={stat.label} className="group/stat relative">
                      <div className="space-y-1">
                        <p className="text-2xl md:text-3xl font-light tracking-tighter text-white group-hover/stat:text-transparent group-hover/stat:bg-clip-text group-hover/stat:bg-linear-to-r group-hover/stat:from-white group-hover/stat:to-white/60 transition-all duration-300">
                          {stat.value}
                        </p>
                        <p className="text-[0.55rem] uppercase tracking-[0.2em] text-white/40 group-hover/stat:text-white/60 transition-colors">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Terminal / System Status - Refined */}
                <div className="mt-2 p-4 border border-white/5 rounded-xl bg-black/60 font-mono text-[0.6rem] text-white/40 space-y-2 shadow-inner">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-white/30">root@yash:~# status</span>
                    <span className="flex items-center gap-1.5 text-emerald-500/80">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                      ONLINE
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-1">
                    <div className="flex justify-between group/term">
                      <span>&gt; UPTIME</span>
                      <span className="text-white/60 group-hover/term:text-white transition-colors">99.9%</span>
                    </div>
                    <div className="flex justify-between group/term">
                      <span>&gt; DEPLOY</span>
                      <span className="text-white/60 group-hover/term:text-white transition-colors">V2.4.0</span>
                    </div>
                    <div className="flex justify-between group/term">
                      <span>&gt; AVAILABILITY</span>
                      <span className="text-white/60 group-hover/term:text-white transition-colors">OPEN</span>
                    </div>
                    <div className="flex justify-between group/term">
                      <span>&gt; LOCATION</span>
                      <span className="text-white/60 group-hover/term:text-white transition-colors">REMOTE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="spotlight-card group p-6 border border-white/10 rounded-3xl bg-white/2 backdrop-blur-md transition-all duration-500 hover:bg-white/4 hover:border-white/20">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40 mb-3">Currently</p>
                <p className="text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                  Exploring front‑end and product design internships where I can own small surfaces end‑to‑end.
                </p>
              </div>
              <div className="spotlight-card group p-6 border border-white/10 rounded-3xl bg-white/2 backdrop-blur-md transition-all duration-500 hover:bg-white/4 hover:border-white/20">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40 mb-3">Toolstack</p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Tailwind', 'Spline', 'Figma'].map((tool) => (
                    <span key={tool} className="px-2.5 py-1 border border-white/10 rounded-md text-[0.6rem] uppercase tracking-[0.15em] text-white/60 bg-white/5 group-hover:border-white/20 group-hover:text-white/80 transition-all">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services / How I Help */}
      <section id="services" className="relative bg-black text-white px-6 md:px-16 lg:px-24 py-20 md:py-28 border-t border-white/10 overflow-hidden">
        {/* Ambient Background Glow for Symmetry */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 about-reveal-left">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-white/30"></span>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Services</p>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/50">
                Strategy, craft, and code in one workflow.
              </h2>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                I help teams turn fuzzy product ideas into interfaces that are storyboarded, prototyped, and ready for
                engineers — without dropping the visual polish along the way.
              </p>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-4">
              {/* Available for Sprints - Editorial Pill */}
              <div className="group relative inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-[#050505] hover:border-white/20 transition-all duration-500 cursor-default min-w-[200px]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <div className="flex flex-col items-start justify-center space-y-0.5">
                  <span className="font-serif text-[0.65rem] uppercase tracking-[0.2em] text-white/90 leading-none">Available for</span>
                  <span className="font-serif text-[0.65rem] uppercase tracking-[0.2em] text-white/90 leading-none">Sprints</span>
                </div>
              </div>

              {/* Book Collaboration - Editorial Pill */}
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-between gap-4 px-6 py-3 rounded-full border border-white/10 bg-[#050505] hover:bg-white/5 hover:border-white/30 transition-all duration-500 min-w-[200px]"
              >
                <div className="flex flex-col items-start justify-center space-y-0.5">
                  <span className="font-serif text-[0.65rem] uppercase tracking-[0.2em] text-white leading-none group-hover:text-white transition-colors">Book a</span>
                  <span className="font-serif text-[0.65rem] uppercase tracking-[0.2em] text-white leading-none group-hover:text-white transition-colors">Collaboration</span>
                </div>
                <span className="text-lg text-white/70 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0">↗</span>
              </a>
            </div>
          </div>

          <div className="relative about-reveal-right">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="spotlight-card group relative flex flex-col gap-8 p-8 border border-white/10 rounded-3xl bg-[#050505] transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                >
                  {/* Noise Texture */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                  {/* Step index rail */}
                  <div className="relative flex items-start justify-between w-full">
                    <span className="text-5xl font-serif text-white/20 group-hover:text-white/30 transition-colors duration-500">
                      0{index + 1}
                    </span>
                    
                    {/* Arrow Circle - Fixed Size & No Shrink */}
                    <div className="w-12 h-12 shrink-0 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 group-hover:opacity-100 transition-opacity">
                        <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Title + copy */}
                  <div className="space-y-3 z-10">
                    <h3 className="text-2xl font-serif tracking-wide text-white group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom decorative line */}
                  <div className="mt-auto pt-4">
                    <div className="h-px w-full bg-white/10 overflow-hidden">
                      <div className="h-full w-0 bg-white/40 group-hover:w-full transition-all duration-700 ease-out"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SectionDivider />

      {/* Projects */}
      <section id="projects" className="relative bg-black px-6 md:px-16 lg:px-24 py-20 md:py-28 text-white border-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 about-reveal-left">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-white/30"></span>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Selected Work</p>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/50">
                Proof that delightful can also be performant.
              </h2>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                A few projects where I obsessed over motion, readability, and real metrics — not just Dribbble shots.
              </p>
            </div>
          </div>

          <div className="space-y-8 about-reveal-right">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="spotlight-card group relative overflow-hidden border border-white/10 rounded-3xl bg-[#050505] transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
              >
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                
                <div className="relative p-8 md:p-10 space-y-8">
                  {/* Top row: index + title + stack */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex items-start gap-6">
                      <div className="flex flex-col items-center pt-1">
                        <span className="text-xs font-mono text-white/30 group-hover:text-white/50 transition-colors">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="mt-2 h-12 w-px bg-white/10 group-hover:bg-white/30 transition-colors duration-500"></div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-3xl md:text-4xl font-serif text-white group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 border border-white/10 rounded-full text-[0.6rem] uppercase tracking-[0.2em] text-white/50 bg-white/5 group-hover:border-white/20 group-hover:text-white/70 transition-all"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="pl-0 md:pl-[3.25rem]">
                    <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-3xl group-hover:text-white/90 transition-colors">
                      {project.summary}
                    </p>
                  </div>

                  {/* Bottom row: result + CTA */}
                  <div className="pl-0 md:pl-[3.25rem] flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors"></div>
                      <p className="text-sm text-white/50 font-mono group-hover:text-white/70 transition-colors">
                        {project.result}
                      </p>
                    </div>
                    
                    <button className="group/btn relative inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-500">
                      <div className="flex flex-col items-start justify-center space-y-0.5">
                        <span className="font-serif text-[0.65rem] uppercase tracking-[0.2em] leading-none">Case</span>
                        <span className="font-serif text-[0.65rem] uppercase tracking-[0.2em] leading-none">Study</span>
                      </div>
                      <span className="text-lg leading-none group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300">↗</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider />
      {/* Experience */}
      <section id="experience" className="relative bg-black px-6 md:px-16 lg:px-24 pb-24 pt-24 text-white border-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="about-reveal-left space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/30"></span>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Experience</p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/50">
              Leading teams where design, product, and code intersect.
            </h2>
            <p className="text-sm md:text-base text-white/60 leading-relaxed">
              Roles where I owned the interface layer, but also the way it connected to product strategy and shipping
              reality.
            </p>
          </div>
          <div className="space-y-6 about-reveal-right">
            {/* Experience Item 01 */}
            <div className="spotlight-card group relative flex flex-col gap-6 p-8 border border-white/10 rounded-3xl bg-[#050505] transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
              {/* Noise Texture */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <span className="font-serif text-lg">01</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-white group-hover:text-white transition-colors">Lead Product Designer</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mt-1">Flux Mobility · 2022 — Present</p>
                  </div>
                </div>
                <div className="hidden md:block px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[0.6rem] uppercase tracking-[0.2em] text-emerald-400">
                  Current Role
                </div>
              </div>

              <div className="pl-0 md:pl-[4rem] space-y-4">
                <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                  Steering the design of a mobility OS for autonomous delivery fleets — from system maps and interface states to the components engineers plug into.
                </p>
                <ul className="space-y-2">
                  {[
                    'Directed a cross-functional squad shipping the mobility OS for autonomous delivery fleets.',
                    'Built a modular UI kit that reduced feature build time by 45% and enabled theming for OEM partners.',
                    'Created telemetry dashboards with predictive states, shortening ops escalations from 30 min to 8 min.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/50 group-hover:text-white/70 transition-colors">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 group-hover:bg-white/60"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Experience Item 02 */}
            <div className="spotlight-card group relative flex flex-col gap-6 p-8 border border-white/10 rounded-3xl bg-[#050505] transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
              {/* Noise Texture */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <span className="font-serif text-lg">02</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-white group-hover:text-white transition-colors">Senior Product Designer</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mt-1">Lumen Labs · 2019 — 2022</p>
                  </div>
                </div>
              </div>

              <div className="pl-0 md:pl-[4rem] space-y-4">
                <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                  Shaping an omni-channel retail intelligence platform, from research and journey maps to motion languages adopted across marketing and product.
                </p>
                <ul className="space-y-2">
                  {[
                    'Ran research sprints across EU and APAC to define the omni-channel retail intelligence platform.',
                    'Piloted a motion language that now powers 18+ marketing launches and the company design system.',
                    'Partnered with data science to visualize confidence intervals, making models explainable to execs.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/50 group-hover:text-white/70 transition-colors">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 group-hover:bg-white/60"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Signal */}
      <section className="relative bg-linear-to-b from-black via-[#050505] to-black px-6 md:px-16 lg:px-24 py-20 pt-24 text-white border-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="about-reveal-left space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/30"></span>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Signal</p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/50">
              A few notes from people I&apos;ve shipped with.
            </h2>
          </div>
          <div 
            ref={signalScrollRef}
            onMouseEnter={() => setIsSignalHovered(true)}
            onMouseLeave={() => setIsSignalHovered(false)}
            onTouchStart={() => setIsSignalHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsSignalHovered(false), 2000)}
            className="signal-scroll-container about-reveal-right"
          >
            <div className="signal-track">
              {/* Set 1 */}
              {testimonials.map((item, index) => (
                <blockquote
                  key={`set1-${index}`}
                  className="group relative shrink-0 w-[85vw] md:w-[500px] p-8 border border-white/10 rounded-3xl bg-[#050505] transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                >
                  {/* Noise Texture */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                  
                  <div className="relative flex flex-col justify-between h-full gap-8">
                    <div className="flex items-center gap-4 text-white/30">
                      <span className="text-xs font-mono">0{index + 1}</span>
                      <div className="h-px w-12 bg-white/10"></div>
                      <span className="text-[0.6rem] uppercase tracking-[0.2em]">Signal</span>
                    </div>
                    
                    <p className="text-xl md:text-2xl font-serif leading-relaxed text-white/90 group-hover:text-white transition-colors">
                      "{item.quote}"
                    </p>
                    
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-serif text-white/50">
                        {item.author.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-white/80">{item.author.split(' — ')[0]}</span>
                        <span className="text-[0.6rem] uppercase tracking-[0.1em] text-white/40">{item.author.split(' — ')[1]}</span>
                      </div>
                    </div>
                  </div>
                </blockquote>
              ))}
              {/* Set 2 */}
              {testimonials.map((item, index) => (
                <blockquote
                  key={`set2-${index}`}
                  className="group relative shrink-0 w-[85vw] md:w-[500px] p-8 border border-white/10 rounded-3xl bg-[#050505] transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                >
                  {/* Noise Texture */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                  
                  <div className="relative flex flex-col justify-between h-full gap-8">
                    <div className="flex items-center gap-4 text-white/30">
                      <span className="text-xs font-mono">0{index + 1}</span>
                      <div className="h-px w-12 bg-white/10"></div>
                      <span className="text-[0.6rem] uppercase tracking-[0.2em]">Signal</span>
                    </div>
                    
                    <p className="text-xl md:text-2xl font-serif leading-relaxed text-white/90 group-hover:text-white transition-colors">
                      "{item.quote}"
                    </p>
                    
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-serif text-white/50">
                        {item.author.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-white/80">{item.author.split(' — ')[0]}</span>
                        <span className="text-[0.6rem] uppercase tracking-[0.1em] text-white/40">{item.author.split(' — ')[1]}</span>
                      </div>
                    </div>
                  </div>
                </blockquote>
              ))}
              {/* Set 3 */}
              {testimonials.map((item, index) => (
                <blockquote
                  key={`set3-${index}`}
                  className="group relative shrink-0 w-[85vw] md:w-[500px] p-8 border border-white/10 rounded-3xl bg-[#050505] transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                >
                  {/* Noise Texture */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                  
                  <div className="relative flex flex-col justify-between h-full gap-8">
                    <div className="flex items-center gap-4 text-white/30">
                      <span className="text-xs font-mono">0{index + 1}</span>
                      <div className="h-px w-12 bg-white/10"></div>
                      <span className="text-[0.6rem] uppercase tracking-[0.2em]">Signal</span>
                    </div>
                    
                    <p className="text-xl md:text-2xl font-serif leading-relaxed text-white/90 group-hover:text-white transition-colors">
                      "{item.quote}"
                    </p>
                    
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-serif text-white/50">
                        {item.author.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-white/80">{item.author.split(' — ')[0]}</span>
                        <span className="text-[0.6rem] uppercase tracking-[0.1em] text-white/40">{item.author.split(' — ')[1]}</span>
                      </div>
                    </div>
                  </div>
                </blockquote>
              ))}
              {/* Set 4 */}
              {testimonials.map((item, index) => (
                <blockquote
                  key={`set4-${index}`}
                  className="group relative shrink-0 w-[85vw] md:w-[500px] p-8 border border-white/10 rounded-3xl bg-[#050505] transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                >
                  {/* Noise Texture */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                  
                  <div className="relative flex flex-col justify-between h-full gap-8">
                    <div className="flex items-center gap-4 text-white/30">
                      <span className="text-xs font-mono">0{index + 1}</span>
                      <div className="h-px w-12 bg-white/10"></div>
                      <span className="text-[0.6rem] uppercase tracking-[0.2em]">Signal</span>
                    </div>
                    
                    <p className="text-xl md:text-2xl font-serif leading-relaxed text-white/90 group-hover:text-white transition-colors">
                      "{item.quote}"
                    </p>
                    
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-serif text-white/50">
                        {item.author.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-white/80">{item.author.split(' — ')[0]}</span>
                        <span className="text-[0.6rem] uppercase tracking-[0.1em] text-white/40">{item.author.split(' — ')[1]}</span>
                      </div>
                    </div>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Contact + Spline */}
      <section id="contact" className="relative w-screen min-h-screen bg-black overflow-hidden border-white/10 flex items-center">
        {activeSection === 'contact' && isDesktop && (
          <div className="absolute inset-0">
            <Spline scene="https://prod.spline.design/NCzgzlnfe2ylzLAZ/scene.splinecode" />
          </div>
        )}

        {/* Mobile Ambient Visuals (When Spline is hidden) */}
        <div className="absolute inset-0 lg:hidden pointer-events-none overflow-hidden">
          {/* Massive Background Text Texture */}
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 text-[25vw] font-black text-white/[0.03] whitespace-nowrap select-none tracking-tighter">
            CONNECT
          </div>

          {/* Central Radar / Data Visualization */}
          <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
            {/* Core Glow */}
            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[60px] animate-pulse"></div>
            
            {/* Concentric Rings */}
            <div className="absolute inset-0 border border-white/10 rounded-full"></div>
            <div className="absolute inset-8 border border-white/5 rounded-full border-dashed animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute inset-16 border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
            <div className="absolute inset-24 border border-white/5 rounded-full opacity-50"></div>
            
            {/* Center Target */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-ping"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full"></div>
            </div>

            {/* Orbiting Data Points */}
            <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/40 rounded-full"></div>
            </div>
            <div className="absolute inset-12 animate-[spin_15s_linear_infinite_reverse]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500/60 rounded-full"></div>
            </div>
          </div>
          
          {/* Perspective Grid Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-[linear-gradient(to_bottom,transparent,black),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom opacity-50"></div>
        </div>

        {/* Softer vignette so the 3D robot stays clear */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-10 md:py-16 min-h-screen flex flex-col justify-end">
          <div className="max-w-4xl mx-auto w-full text-center space-y-8 mb-12 relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="font-serif text-[0.6rem] uppercase tracking-[0.2em] text-white/80">Open to Work</p>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white leading-[1.1]">
              Ready to build the <span className="italic text-white/50">next big thing</span> starting Summer ‘25.
            </h2>
            
            <p className="font-serif text-sm md:text-base text-white/60 max-w-2xl mx-auto leading-relaxed tracking-wide">
              I blend React, Tailwind, and motion design to ship polished UI. Currently exploring roles where I can
              prototype fast, learn from seniors, and own student-to-production hand-offs.
            </p>
          </div>
          <div className="max-w-3xl mx-auto w-full">
            <div className="group relative isolate">
              {/* Animated Gradient Border */}
              <div className="absolute -inset-px rounded-[2.5rem] md:rounded-full bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"></div>
              
              {/* Main Bar Container */}
              <div className="relative flex flex-col md:flex-row items-center justify-between p-1.5 bg-[#080808] border border-white/10 rounded-[2.5rem] md:rounded-full shadow-2xl shadow-black/80 ring-1 ring-white/5 transition-transform duration-300 hover:scale-[1.01]">
                
                {/* Left: Technical Specs (The Stack) */}
                <div className="flex items-center gap-4 px-6 py-4 md:py-0 w-full md:w-auto justify-center md:justify-start border-b md:border-b-0 border-white/5 md:border-none">
                  <div className="flex flex-col items-center md:items-start gap-1">
                    <span className="text-[0.45rem] uppercase tracking-[0.3em] text-white/30 font-mono">System Architecture</span>
                    <div className="flex items-center gap-3 text-[0.55rem] uppercase tracking-[0.15em] text-white/80 font-medium">
                      <span className="hover:text-white transition-colors cursor-default">React</span>
                      <span className="text-white/20">/</span>
                      <span className="hover:text-white transition-colors cursor-default">Three.js</span>
                      <span className="text-white/20">/</span>
                      <span className="hover:text-white transition-colors cursor-default">Figma</span>
                    </div>
                  </div>
                </div>

                {/* Right: Action Cluster (Sliding Toggle) */}
                <div className="relative flex items-center p-1.5 mt-2 md:mt-0 bg-white/5 rounded-full border border-white/5 w-full md:w-auto justify-between md:justify-start overflow-hidden">
                  
                  {/* The Sliding White Pill */}
                  <div 
                    className="absolute top-1.5 bottom-1.5 bg-white rounded-full transition-all duration-500 cubic-bezier(0.23, 1, 0.32, 1) shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    style={{ 
                      left: `${contactPillStyle.left}px`, 
                      width: `${contactPillStyle.width}px` 
                    }}
                  ></div>

                  {/* Items */}
                  {[
                    { id: 'resume', label: 'Résumé', href: '/YashPatil-Resume.pdf', external: false },
                    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com', external: true },
                    { id: 'email', label: 'Email Me', href: 'mailto:hello@yashpatil.design', external: false }
                  ].map((item) => (
                    <a
                      key={item.id}
                      ref={el => contactTabRefs.current[item.id] = el}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      onClick={() => setActiveContactTab(item.id)}
                      onMouseEnter={() => setActiveContactTab(item.id)}
                      className={`relative z-10 px-5 md:px-6 py-2.5 rounded-full text-[0.55rem] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                        activeContactTab === item.id ? 'text-black' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

              </div>
            </div>
            
            {/* Status Indicator (Floating below) */}
            <div className="mt-8 flex justify-center opacity-60 hover:opacity-100 transition-opacity duration-500">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[0.5rem] uppercase tracking-[0.2em] text-white/50">Available for Summer '25</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white px-6 md:px-16 lg:px-24 py-12 border-t border-white/10 relative overflow-hidden">
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8 relative z-10">
          <div className="space-y-6">
             <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 group cursor-pointer">
               <span className="font-serif text-lg font-bold">Y</span>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-xs uppercase tracking-[0.2em] text-white/40">
                © {new Date().getFullYear()} Yash Patil
              </p>
              <p className="font-serif text-[0.6rem] uppercase tracking-[0.2em] text-white/20">
                Designed & Built in React
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 md:gap-12">
            {['Dribbble', 'Behance', 'LinkedIn', 'GitHub'].map((social) => (
               <a key={social} href="#" className="group relative font-serif text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">
                 {social}
                 <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
               </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
