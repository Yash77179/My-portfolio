import { PlusIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import React from "react";

export function LogoCloud({ className, logos, ...props }) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-x border-white/[0.08]",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-white/[0.08]" />

      {logos.map((logo, index) => {
        const isRightBorderLg = (index + 1) % 5 !== 0;
        const isRightBorderMd = (index + 1) % 3 !== 0;
        const isRightBorderSm = (index + 1) % 2 !== 0;

        return (
          <LogoCard
            key={index}
            logo={logo}
            className={cn(
              "spotlight-card relative border-b border-white/[0.08] transition-colors duration-500",
              "group hover:bg-white/[0.02] overflow-visible",
              isRightBorderLg ? "lg:border-r" : "lg:border-r-0",
              isRightBorderMd ? "md:border-r" : "md:border-r-0",
              isRightBorderSm ? "border-r" : "border-r-0"
            )}
          >
            {/* Plus icon unconditionally on EVERY corner of EVERY box, with elegant, purely color-based hover */}
            <PlusIcon className="-right-3 -bottom-3 absolute z-20 size-6 text-white/10 transition-colors duration-700 group-hover:text-white/30" strokeWidth={1} />
            <PlusIcon className="-left-3 -bottom-3 absolute z-20 size-6 text-white/10 transition-colors duration-700 group-hover:text-white/30" strokeWidth={1} />
            <PlusIcon className="-right-3 -top-3 absolute z-20 size-6 text-white/10 transition-colors duration-700 group-hover:text-white/30" strokeWidth={1} />
            <PlusIcon className="-left-3 -top-3 absolute z-20 size-6 text-white/10 transition-colors duration-700 group-hover:text-white/30" strokeWidth={1} />
          </LogoCard>
        );
      })}

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-white/[0.08]" />
    </div>
  );
}

function LogoCard({ logo, className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex object-contain items-center justify-center py-12 px-8 md:py-16 md:px-12 lg:py-20 lg:px-16",
        className
      )}
      {...props}
    >
      <img
        alt={logo.alt}
        className={cn(
          "pointer-events-none select-none transition-all duration-500 ease-out group-hover:scale-110 relative z-10",
          "h-12 md:h-16 lg:h-16",
          logo.invert ? "brightness-0 invert opacity-60 group-hover:opacity-100" : "opacity-80 group-hover:opacity-100"
        )}
        height={logo.height || "auto"}
        src={logo.src}
        width={logo.width || "auto"}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling.style.display = 'block';
        }}
      />
      <span className="hidden font-medium text-white/60 uppercase tracking-widest text-xs relative z-10">{logo.alt}</span>
      {children}
    </div>
  );
}
