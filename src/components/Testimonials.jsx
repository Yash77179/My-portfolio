import React from 'react';
import { TestimonialsSection } from './ui/testimonial-v2';

const Testimonials = () => {
    return (
        <section id="testimonials" className="relative bg-[#050505] text-white py-12 lg:py-24 overflow-hidden min-h-[800px] flex flex-col justify-center">
            {/* Ambient Noise overlay to match the surrounding portfolio aesthetic */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            <TestimonialsSection />
             
        </section>
    );
};

export default Testimonials;
