import { cn } from '@/lib/utils'
import { PixelCanvas } from '@/components/ui/pixel-canvas'
import { ExpandableCard } from '@/components/ui/expandable-card'

const U_IMAGES = [
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
];

export function Features({ project }) {
    if (!project) return null;

    return (
        <section className="w-full relative pt-4 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
                
                {/* ── Box 1: Outcome (Massive Horizontal Space) ── */}
                <div className="lg:col-span-8 group relative border border-white/10 bg-[#050505] hover:bg-white/[0.02] p-8 md:p-14 transition-colors duration-700 min-h-[360px] flex flex-col justify-center overflow-hidden">
                    <PixelCanvas gap={8} speed={40} colors={["#ffffffaa", "#00e5ffaa", "#38bdf8aa", "#e0f2feaa", "#a5f3fcaa"]} variant="default" className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
                    <CardDecorator />
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity duration-1000 hidden md:block z-10 text-[#c8b598]">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                    
                    <span className="text-[0.65rem] uppercase tracking-[0.3em] font-medium text-[#c8b598]/60 block mb-10">
                        01. Outcome Definition
                    </span>
                    <p className="text-2xl md:text-4xl lg:text-5xl font-light text-white/90 leading-[1.3] tracking-wide">
                        {project.result || "Achieved unprecedented growth and scalability through meticulous systems engineering."}
                    </p>
                </div>

                {/* ── Box 2: Timeline (Architectural Date) ── */}
                <div className="lg:col-span-4 group relative border border-white/10 bg-[#050505] hover:bg-white/[0.02] p-8 md:p-14 transition-colors duration-700 min-h-[360px] flex flex-col justify-between overflow-hidden">
                    <PixelCanvas gap={8} speed={40} colors={["#ffffffaa", "#00e5ffaa", "#38bdf8aa", "#e0f2feaa", "#a5f3fcaa"]} variant="default" className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
                    <CardDecorator />
                    <span className="relative z-10 text-[0.65rem] uppercase tracking-[0.3em] font-medium text-[#c8b598]/60 block text-right">
                        02. Timeline
                    </span>
                    
                    <div className="mt-auto text-right group-hover:-translate-y-2 transition-transform duration-700">
                        <span className="block text-white/40 text-[0.65rem] uppercase tracking-widest mb-4">Delivered</span>
                        <span className="text-8xl md:text-9xl font-light text-white tracking-tighter leading-none block">
                            {project.timeline || "2028"}
                        </span>
                    </div>
                </div>

                {/* ── Box 3: Technologies (Expansive Tag Grid) ── */}
                <div className="lg:col-span-6 group relative border border-white/10 bg-[#050505] hover:bg-white/[0.02] p-8 md:p-14 transition-colors duration-700 min-h-[360px] flex flex-col overflow-hidden">
                    <PixelCanvas gap={8} speed={40} colors={["#ffffffaa", "#00e5ffaa", "#38bdf8aa", "#e0f2feaa", "#a5f3fcaa"]} variant="default" className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
                    <CardDecorator />
                    <span className="relative z-10 text-[0.65rem] uppercase tracking-[0.3em] font-medium text-[#c8b598]/60 block mb-12">
                        03. Engineering Stack
                    </span>

                    <div className="flex flex-wrap gap-x-4 gap-y-4 md:gap-y-6 mt-auto">
                        {project.stack && project.stack.map((tech) => (
                            <div 
                                key={tech} 
                                className="px-5 py-3 border border-white/[0.05] group-hover:border-white/20 text-[0.65rem] md:text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-all duration-500 bg-transparent flex items-center gap-3"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#c8b598]/40 group-hover:bg-[#c8b598]"></span>
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Box 4: Core Focus (Editorial List) ── */}
                <div className="lg:col-span-6 group relative border border-white/10 bg-[#050505] hover:bg-white/[0.02] p-8 md:p-14 transition-colors duration-700 min-h-[360px] flex flex-col overflow-hidden">
                    <PixelCanvas gap={8} speed={40} colors={["#ffffffaa", "#00e5ffaa", "#38bdf8aa", "#e0f2feaa", "#a5f3fcaa"]} variant="default" className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
                    <CardDecorator />
                    <span className="relative z-10 text-[0.65rem] uppercase tracking-[0.3em] font-medium text-white/30 block mb-12">
                        04. Core Focus
                    </span>

                    <div className="mt-auto flex flex-col gap-8 w-full md:pr-12">
                        {(project.coreFocus || ["Experience Architecture", "Interactive WebGL", "Motion Systems", "System Engineering"]).map((focus, i) => (
                            <div key={focus} className="flex items-center justify-between border-b border-white/5 hover:border-white/20 pb-4 transition-colors duration-500 cursor-default">
                                <span className="text-lg md:text-2xl font-light text-white/80 tracking-wide">{focus}</span>
                                <span className="text-xs font-medium text-white/30">0{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Optional Box 5: The Friction (Minimalist, Massive, No Paragraph) ── */}
                {project.problem && (
                    <div className="lg:col-span-12 group relative border border-white/10 bg-[#050505] p-10 md:p-20 flex flex-col justify-center items-center text-center overflow-hidden transition-colors duration-700 hover:bg-white/[0.02] min-h-[40vh]">
                        <PixelCanvas gap={8} speed={40} colors={["#ffffffaa", "#00e5ffaa", "#38bdf8aa", "#e0f2feaa", "#a5f3fcaa"]} variant="default" className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
                        <CardDecorator />
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <span className="text-[0.65rem] uppercase tracking-[0.4em] font-medium text-white/50 block mb-6 group-hover:text-white transition-colors duration-700">
                                The Operational Friction
                            </span>
                            <h4 className="text-4xl md:text-6xl font-light text-white tracking-tighter leading-[1.1] transition-transform duration-1000 group-hover:scale-[0.98]">
                                Disconnected tools destroy trust.
                            </h4>
                        </div>
                    </div>
                )}

                {/* ── Optional Box 6: The Unified Platform (Interactive Deep-dive ExpandableCards) ── */}
                {project.solutionList && (
                    <div className="lg:col-span-12 group relative border border-white/10 bg-[#050505] hover:bg-white/[0.02] transition-colors duration-700 p-8 md:p-14 overflow-hidden">
                        <PixelCanvas gap={8} speed={40} colors={["#ffffffaa", "#00e5ffaa", "#38bdf8aa", "#e0f2feaa", "#a5f3fcaa"]} variant="default" className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
                        <CardDecorator />
                        
                        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
                            <div>
                                <span className="text-[0.65rem] uppercase tracking-[0.3em] font-medium text-white/30 block mb-4">
                                    06. The Unified Platform
                                </span>
                                <h4 className="text-3xl md:text-5xl font-light text-white tracking-tight">System Infrastructure</h4>
                            </div>
                            <span className="text-white/40 text-xs font-mono tracking-widest uppercase border border-white/10 px-4 py-2 rounded-full hidden md:block group-hover:bg-white/5 transition-colors duration-500">Interactive Directory</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 w-full mb-4">
                            {project.solutionList.map((sol, idx) => (
                                <ExpandableCard
                                    key={idx}
                                    title={sol.name}
                                    src={U_IMAGES[idx % U_IMAGES.length]}
                                    description={`Core Module 0${idx+1}`}
                                    className="border-white/[0.05]"
                                >
                                    <h4 className="text-white font-medium text-2xl tracking-tight mt-6 mb-2">Technical Overview</h4>
                                    <p className="border-l border-white/20 pl-6 text-white/60 mb-8 font-light leading-relaxed">
                                        {sol.desc}
                                    </p>
                                    <p className="text-white/50 font-light leading-relaxed">
                                        This infrastructure module was engineered specifically to address deep operational fragmentation. By fundamentally restructuring how state is handled across {sol.name.toLowerCase()}, the application logic achieves absolute realtime synchronization with zero manual reconciliation overhead.
                                    </p>
                                    <h4 className="text-white font-medium text-2xl tracking-tight mt-10 mb-2">System Advantages</h4>
                                    <ul className="flex flex-col gap-4">
                                        <li className="flex items-start gap-4">
                                            <span className="text-white/20 mt-1">✦</span>
                                            <span className="text-white/50 font-light">Eliminated latency between point-of-sale systems and central database edge nodes.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <span className="text-white/20 mt-1">✦</span>
                                            <span className="text-white/50 font-light">Built-in robust fault tolerance, guaranteeing strictly consistent rollbacks on network failure.</span>
                                        </li>
                                    </ul>
                                </ExpandableCard>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Optional Box 7/8: Ecosystem & AI Split (Structural & Professional) ── */}
                {project.ecosystem && (
                    <>
                        <div className="lg:col-span-8 group relative border border-white/10 bg-[#050505] hover:bg-white/[0.02] transition-colors duration-700 p-10 md:p-16 overflow-hidden min-h-[400px] flex flex-col justify-between">
                            <PixelCanvas gap={8} speed={40} colors={["#ffffffaa", "#00e5ffaa", "#38bdf8aa", "#e0f2feaa", "#a5f3fcaa"]} variant="default" className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
                            <CardDecorator />
                            <span className="relative z-10 text-[0.65rem] uppercase tracking-[0.3em] font-medium text-white/30 block mb-12">
                                07. Architecture Stack
                            </span>
                            
                            {/* Structural Table Visual */}
                            <div className="flex flex-col relative z-10 border border-white/10 bg-[#020202] rounded-md overflow-hidden">
                                {project.ecosystem.map((sys, idx) => (
                                    <div key={idx} className="group/stack w-full border-b border-white/10 last:border-0 p-5 lg:p-6 transition-colors duration-500 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.03]">
                                        <div className="flex items-center gap-5">
                                            <div className="text-white/20 font-mono text-[0.65rem]">{String(idx+1).padStart(2, '0')}</div>
                                            <span className="text-white/80 font-light text-lg tracking-wide group-hover/stack:text-white transition-colors">{sys.app}</span>
                                        </div>
                                        <span className="text-white/40 text-sm font-light mt-3 md:mt-0 transition-colors group-hover/stack:text-white/60 text-left md:text-right max-w-sm">
                                            {sys.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col">
                            {/* AI Integration - Monochrome Inversion Tags */}
                            <div className="group relative border border-white/10 bg-[#050505] hover:bg-white/[0.02] transition-colors duration-700 p-10 md:p-14 flex-grow overflow-hidden flex flex-col justify-center h-full">
                                <PixelCanvas gap={8} speed={40} colors={["#ffffffaa", "#00e5ffaa", "#38bdf8aa", "#e0f2feaa", "#a5f3fcaa"]} variant="default" className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
                                <CardDecorator />
                                <span className="relative z-10 text-[0.65rem] uppercase tracking-[0.3em] font-medium text-white/30 block mb-10">
                                    08. Smart Core
                                </span>
                                
                                <div className="flex flex-wrap gap-2 relative z-10">
                                    {project.aiFeatures && project.aiFeatures.map((ai, idx) => (
                                        <div key={idx} className="px-4 py-2.5 border border-white/10 bg-transparent hover:bg-white text-white/50 hover:text-black transition-all duration-500 rounded-full cursor-default text-[0.65rem] uppercase tracking-widest font-medium">
                                            {ai}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </section>
    )
}

const CardDecorator = () => (
    <>
        <span className="border-[#c8b598]/40 absolute -left-px -top-px block size-3 border-l-2 border-t-2 z-20"></span>
        <span className="border-[#c8b598]/40 absolute -right-px -top-px block size-3 border-r-2 border-t-2 z-20"></span>
        <span className="border-[#c8b598]/40 absolute -bottom-px -left-px block size-3 border-b-2 border-l-2 z-20"></span>
        <span className="border-[#c8b598]/40 absolute -bottom-px -right-px block size-3 border-b-2 border-r-2 z-20"></span>
    </>
)
