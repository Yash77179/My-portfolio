import exanorImg from '../assets/exanor_billboard.png';
import exanorVideo from '../assets/exanor/1.webm';
import exanorVideo2 from '../assets/exanor/2.webm';

export const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
]

export const projects = [
    {
        title: 'Exanor',
        image: exanorImg,
        galleryVideo: exanorVideo,
        galleryVideo2: exanorVideo2,
        summary: 'AI-powered billing & accounting software with a hyperlocal delivery platform — end-to-end from invoicing to last-mile logistics.',
        stack: ['Flutter', 'React', 'Node.js', 'Firebase', 'Express'],
        result: 'Serving 500+ businesses with automated invoicing, inventory sync, and real-time delivery tracking.',
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

export const services = [
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

export const stats = [
    { label: 'Commercial Projects', value: '24', sub: 'Fintech, Auto, SaaS' },
    { label: 'User Base Impact', value: '2.4M+', sub: 'Daily Active Users' },
    { label: 'Conversion Lift', value: '38%', sub: 'Avg. Optimization' },
    { label: 'Design Systems', value: '04', sub: 'Built from scratch' },
    { label: 'Component Library', value: '450+', sub: 'React / Tailwind' },
    { label: 'Code Commits', value: '8.5k', sub: 'Last 12 months' },
]

export const testimonials = [
    {
        quote: 'Yash translates ambiguous ambition into interfaces that feel inevitable. Every detail carries intent.',
        author: 'Priya Nair — CPO, Lumen Labs',
        imgSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
        quote: 'He is the rare designer-engineer who can run discovery with execs in the morning and push production-ready code that night.',
        author: 'Leo Martín — Head of Product, Flux Mobility',
        imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
        quote: 'Working with Yash elevated our entire product vision. His ability to bridge design and engineering is unmatched.',
        author: 'Sarah Chen — Engineering Lead, TechFlow',
        imgSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
        quote: 'The attention to micro-interactions and user experience details sets Yash apart. Every pixel has purpose.',
        author: 'Marcus Rodriguez — Design Director, Creative Studio',
        imgSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
        quote: 'Yash delivered not just designs, but a complete design system that our team still uses today. Incredible work.',
        author: 'Emily Watson — Product Manager, InnovateCo',
        imgSrc: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
        quote: 'His React implementations are clean, performant, and maintainable. A true full-stack designer.',
        author: 'David Kim — CTO, StartupHub',
        imgSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop'
    },
]
