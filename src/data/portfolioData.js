import exanorImg from '../assets/exanor_billboard.png';
import exanorVideo from '../assets/exanor/1.webm';
import exanorVideo2 from '../assets/exanor/2.webm';
import exanorVideo3 from '../assets/exanor/3.webm';
import recipeImg from '../assets/recipe_portal.jpg';
import recipeVideo1 from '../assets/Reciepe Sharing/1.webm';
import recipeVideo2 from '../assets/Reciepe Sharing/2.webm';
import recipeVideo3 from '../assets/Reciepe Sharing/3.webm';

export const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },

    { label: 'Contact', href: '#contact' },
]

export const projects = [
    {
        title: 'Exanor',
        image: exanorImg,
        galleryVideo: exanorVideo,
        galleryVideo2: exanorVideo2,
        galleryVideo3: exanorVideo3,
        summary: 'Exanor is a global-ready commerce & operations platform that helps businesses run retail operations digitally while selling online through an integrated marketplace. Billing, accounting, inventory, and delivery tracking function as one connected system.',
        stack: ['Flutter', 'React', 'TypeScript', 'Node.js', 'Express.js', 'Firebase', 'AWS'],
        result: 'Reduced manual billing and inventory workload by 30–40% through AI-driven automation and real-time data sync.',
        timeline: '2024',
        coreFocus: ['Ecosystem Architecture', 'Scalable Backend', 'Realtime Sync', 'AI-Powered Insights'],
        problem: 'Most businesses struggle with operational friction: billing in one place, inventory tracked elsewhere. Stock mismatches and manual reconciliation waste hours daily, leading to customer distrust when items show available but aren’t deliverable.',
        solutionList: [
            { name: 'Billing & Invoicing', desc: 'Updates system immediately; sales records stay report-ready.' },
            { name: 'Accounting Visibility', desc: 'Flows unstructured sales into rigid structured data for managers.' },
            { name: 'Live Inventory', desc: 'The single source of truth across counter, online, and storage.' },
            { name: '0% Margin Marketplace', desc: 'Sell online transparently without duplicating effort.' },
        ],
        ecosystem: [
            { app: 'Store App (Flutter)', role: 'Staff/managers billing, inventory updates, and operational control.' },
            { app: 'User App (Flutter)', role: 'Customers browsing products, placing orders, realtime tracking.' },
            { app: 'Web App (React)', role: 'Fast-access experience for ordering and QR entry.' },
            { app: 'Backend Edge (Node.js/AWS)', role: 'Central engine managing business rules, AI fraud anomaly detection, and CI/CD pipelines.' },
        ],
        aiFeatures: ['Auto Item Detection / Smart Cataloging', 'Demand Forecasting / Stock Recommendations', 'Fraud & Anomaly Detection in Billing'],
        notes: [
            'Built an AI-powered billing and inventory platform with seamless 0% commission marketplace purchases.',
            'Engineered scalable Node.js/Express architecture via AWS (EC2/S3) with JWT & RBAC secure auth.',
            'Reduced manual operation workload by up to 40% through strict real-time data processing.',
            'Unfied flutter and React experiences, establishing total consistency across the operational web.'
        ]
    },
    {
        title: 'Recipe Sharing Portal',
        image: recipeImg,
        galleryVideo: recipeVideo1,
        galleryVideo2: recipeVideo2,
        galleryVideo3: recipeVideo3,
        summary: 'A community-driven web platform where people can create, publish, discover, and save recipes in a clean, searchable experience. Designed to make home cooking easier by turning scattered cooking knowledge into a structured system.',
        stack: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Cloud Storage'],
        result: 'Structured cooking workflows, improving recipe discovery speed and user retention through saved collections.',
        timeline: '2023',
        coreFocus: ['Content Architecture', 'Search & Filtering', 'Community Trust', 'Personalized Feed'],
        problem: 'Cooking knowledge is scattered and unstructured. Traditional blogs fail with overwhelming ads and endless life stories before the actual ingredients, making efficient cooking almost impossible for everyday users.',
        solutionList: [
            { name: 'Creators Publishing', desc: 'Structured fields (ingredients, method, prep time) that display cleanly.' },
            { name: 'Smooth Discovery', desc: 'Advanced filters by cuisine, difficulty, time, and dietary limits.' },
            { name: 'Personal Collections', desc: 'Users can save and bookmark recipes they love into personalized feeds.' },
            { name: 'Trust Layer', desc: 'Ratings and comments ensure the highest quality community recipes rise to the top.' },
        ],
        ecosystem: [
            { app: 'Client Portal (React)', role: 'Smooth, magazine-like recipe presentation optimized for mobile cooking flow.' },
            { app: 'API Engine (Node.js)', role: 'Manages user interactions and standardizes unstructured recipe data.' },
            { app: 'Auth Layer (JWT)', role: 'Secures community interaction and isolates private saved recipes.' },
        ],
        notes: [
            'Built a Recipe Sharing Portal enabling structured publishing (ingredients, step-by-step instructions, servings).',
            'Designed a smooth discovery experience with complex querying and dietary search filters.',
            'Implemented user profiles with personalization features to drive return usage and long-term engagement.',
            'Developed scalable backend services managing secure content delivery as traffic grows.'
        ]
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
