import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { testimonials as portfolioTestimonials } from '../../data/portfolioData';

const SQRT_5000 = Math.sqrt(5000);

// Ensure we have enough items for the effect to look good
const testimonials = [...portfolioTestimonials, ...portfolioTestimonials, ...portfolioTestimonials].map((t, i) => ({
    ...t,
    tempId: i,
    testimonial: t.quote,
    by: t.author,
    imgSrc: t.imgSrc
}));

const TestimonialCard = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out overflow-hidden",
        isCenter 
          ? "z-10 bg-emerald-500 text-black border-emerald-500 shadow-2xl shadow-emerald-500/20" 
          : "z-0 bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-emerald-500/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        opacity: Math.abs(position) > 3 ? 0 : 1, // Fade out distant cards to avoid clutter
        pointerEvents: Math.abs(position) > 3 ? 'none' : 'auto'
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-zinc-800"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by}
        className="mb-4 h-14 w-12 bg-zinc-800 object-cover object-top border border-black/10"
        style={{
          boxShadow: isCenter ? "3px 3px 0px rgba(0,0,0,0.2)" : "3px 3px 0px rgba(0,0,0,0.5)"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium leading-tight",
        isCenter ? "text-black" : "text-zinc-200"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-black/70" : "text-zinc-500"
      )}>
        - {testimonial.by.split('—')[0]}
      </p>
    </div>
  );
};

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleMove(1);
    }, 4000);
    return () => clearInterval(interval);
  }, [handleMove]);

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-visible" // Changed from overflow-hidden to allow spread
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-30">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors rounded-full",
            "bg-zinc-900 border-2 border-zinc-800 text-white hover:bg-emerald-500 hover:text-black hover:border-emerald-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors rounded-full",
            "bg-zinc-900 border-2 border-zinc-800 text-white hover:bg-emerald-500 hover:text-black hover:border-emerald-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
