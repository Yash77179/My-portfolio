import React from 'react';
import { StaggerTestimonials } from './ui/stagger-testimonials';
import SectionDivider from './SectionDivider';

const Testimonials = () => {
    return (
        <section id="testimonials" className="relative bg-[#050505] text-white py-24 overflow-hidden min-h-[800px] flex flex-col justify-center">
             {/* Background Effects */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
             <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
             
             <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 flex flex-col items-center">
                <div className="mb-16 text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-emerald-400 uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Client Feedback
                    </div>
                    <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight">
                        Trusted by <span className="italic text-emerald-500">visionaries</span>.
                    </h2>
                    <p className="text-lg text-zinc-400 font-light max-w-xl mx-auto">
                        I partner with founders and product teams who refuse to settle for "good enough".
                    </p>
                </div>

                <StaggerTestimonials />
             </div>
             <SectionDivider />
        </section>
    );
};

export default Testimonials;
