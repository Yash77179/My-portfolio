import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

// --- Data ---
const testimonials = [
  {
    text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our business functions improved with a user-friendly design and positive customer feedback.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props) => {
  return (
    <div className={`flex-1 flex justify-center w-full ${props.className || ''}`}>
      <motion.ul
        animate={{
          translateY: ["0%", "-50%"],
        }}
        transition={{
          duration: (props.duration || 10) * 3,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-8 pb-8 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(6).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileFocus={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-xl max-w-[320px] md:max-w-[460px] w-full bg-[#050505] transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2" 
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-white/60 leading-relaxed font-normal m-0 transition-colors duration-300 text-[15px]">
                      {text}
                    </p>
                    <footer className="flex flex-col gap-3 mt-8">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-white/30 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-white transition-colors duration-300 text-sm">
                          {name}
                        </cite>
                        <span className="text-xs leading-5 tracking-wide text-white/40 mt-0.5 transition-colors duration-300 uppercase">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-24 relative overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="w-full max-w-[1800px] px-4 md:px-12 z-10 mx-auto relative"
      >
        {/* Ambient massive 05 background */}
        <div className="absolute top-[2%] left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none text-white/[0.03] font-light" style={{ fontSize: "clamp(15rem, 40vw, 60rem)", lineHeight: 0.75, letterSpacing: "-0.05em" }}>
            05
        </div>

        <div className="flex flex-col items-center justify-center max-w-[840px] mx-auto mb-16 relative z-10">
          <div className="flex items-center gap-4 mb-4 md:mb-6">
              <span className="w-12 h-px bg-[#c8b598]/50"></span>
              <h3 className="text-[0.65rem] uppercase tracking-[0.4em] text-[#c8b598]/80 font-medium">Testimonials</h3>
              <span className="w-12 h-px bg-[#c8b598]/50"></span>
          </div>
          <h2 className="text-white text-5xl md:text-[5.5rem] lg:text-[7rem] font-light tracking-tighter leading-[0.9] text-center">
              Client <span className="font-serif italic text-white/40">Feedback</span>
          </h2>
          <p className="text-center mt-8 text-white/50 text-xs md:text-sm font-light tracking-[0.2em] max-w-xl mx-auto uppercase">
            Partnering with founders who refuse to settle for "good enough".
          </p>
        </div>

        <div 
          className="flex justify-between w-full gap-4 md:gap-8 lg:gap-12 mt-16 px-2 md:px-8 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[850px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:flex" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:flex" duration={17} />
        </div>
      </motion.div>
    </section>
  );
};
