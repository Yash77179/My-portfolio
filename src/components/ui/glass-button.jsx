import * as React from "react";
import { cva } from "class-variance-authority";

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const glassButtonVariants = cva(
  "relative isolate all-unset cursor-pointer rounded-full transition-all text-white",
  {
    variants: {
      size: {
        default: "text-base font-semibold",
        sm: "text-sm font-semibold",
        lg: "text-lg font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const glassButtonTextVariants = cva(
  "glass-button-text relative block select-none tracking-tight",
  {
    variants: {
      size: {
        default: "px-6 py-3.5",
        sm: "px-4 py-2",
        lg: "px-8 py-4",
        icon: "flex h-10 w-10 items-center justify-center",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const GlassButton = React.forwardRef(
  ({ className, children, size, contentClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "glass-button-wrap cursor-pointer rounded-full group/glass",
          className
        )}
      >
        <button
          className={cn("glass-button custom-reset backdrop-blur-2xl", glassButtonVariants({ size }))}
          ref={ref}
          {...props}
        >
          <span
            className={cn(
              glassButtonTextVariants({ size }),
              contentClassName
            )}
          >
            {children}
          </span>
        </button>
        <div className="glass-button-shadow rounded-full group-hover/glass:opacity-100 opacity-0 transition-opacity duration-500"></div>
      </div>
    );
  }
);
GlassButton.displayName = "GlassButton";

export { GlassButton, glassButtonVariants };
