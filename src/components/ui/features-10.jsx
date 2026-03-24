import { cn } from '@/lib/utils'
import { PixelCanvas } from '@/components/ui/pixel-canvas'

export function Features({ project }) {
    if (!project) return null;

    return (
        <section className="w-full relative pt-4 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
                
                {/* ── Box 1: Outcome (Massive Horizontal Space) ── */}
                <div className="lg:col-span-8 group relative border border-white/10 bg-[#050505] hover:bg-white/[0.02] p-8 md:p-14 transition-colors duration-700 min-h-[360px] flex flex-col justify-center overflow-hidden">
                    <PixelCanvas gap={8} speed={40} colors={["#ffffffaa", "#00e5ffaa", "#38bdf8aa", "#e0f2feaa", "#a5f3fcaa"]} variant="default" className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
                    <CardDecorator />
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-1000 hidden md:block z-10">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                    
                    <span className="text-[0.65rem] uppercase tracking-[0.3em] font-medium text-white/30 block mb-10">
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
                    <span className="relative z-10 text-[0.65rem] uppercase tracking-[0.3em] font-medium text-white/30 block text-right">
                        02. Timeline
                    </span>
                    
                    <div className="mt-auto text-right group-hover:-translate-y-2 transition-transform duration-700">
                        <span className="block text-white/40 text-[0.65rem] uppercase tracking-widest mb-4">Delivered</span>
                        <span className="text-8xl md:text-9xl font-light text-white tracking-tighter leading-none block">
                            2028
                        </span>
                    </div>
                </div>

                {/* ── Box 3: Technologies (Expansive Tag Grid) ── */}
                <div className="lg:col-span-6 group relative border border-white/10 bg-[#050505] hover:bg-white/[0.02] p-8 md:p-14 transition-colors duration-700 min-h-[360px] flex flex-col overflow-hidden">
                    <PixelCanvas gap={8} speed={40} colors={["#ffffffaa", "#00e5ffaa", "#38bdf8aa", "#e0f2feaa", "#a5f3fcaa"]} variant="default" className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
                    <CardDecorator />
                    <span className="relative z-10 text-[0.65rem] uppercase tracking-[0.3em] font-medium text-white/30 block mb-12">
                        03. Engineering Stack
                    </span>

                    <div className="flex flex-wrap gap-x-4 gap-y-4 md:gap-y-6 mt-auto">
                        {project.stack && project.stack.map((tech) => (
                            <div 
                                key={tech} 
                                className="px-5 py-3 border border-white/[0.05] group-hover:border-white/20 text-[0.65rem] md:text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-all duration-500 bg-transparent flex items-center gap-3"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/90"></span>
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
                        {["Experience Architecture", "Interactive WebGL", "Motion Systems", "System Engineering"].map((focus, i) => (
                            <div key={focus} className="flex items-center justify-between border-b border-white/5 hover:border-white/20 pb-4 transition-colors duration-500 cursor-default">
                                <span className="text-lg md:text-2xl font-light text-white/80 tracking-wide">{focus}</span>
                                <span className="text-xs font-medium text-white/30">0{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}

const CardDecorator = () => (
    <>
        <span className="border-white/30 absolute -left-px -top-px block size-3 border-l-2 border-t-2 z-20"></span>
        <span className="border-white/30 absolute -right-px -top-px block size-3 border-r-2 border-t-2 z-20"></span>
        <span className="border-white/30 absolute -bottom-px -left-px block size-3 border-b-2 border-l-2 z-20"></span>
        <span className="border-white/30 absolute -bottom-px -right-px block size-3 border-b-2 border-r-2 z-20"></span>
    </>
)
