import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Square, X, Copy } from 'lucide-react';
import { useWindowManager } from './WindowManager';

export const Window = ({ children, id, title, icon }) => {
  const { closeWindow, activeWindowId, bringToFront, toggleMinimize, toggleMaximize, windows, startMenuOpen, setStartMenuOpen } = useWindowManager();
  const isActive = activeWindowId === id;
  const windowState = windows.find((w) => w.id === id);
  const isMaximized = windowState?.maximized;

  // Window animations
  const initial = { opacity: 0, scale: 0.95, y: 20 };
  const animate = { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    width: isMaximized ? '100vw' : '800px',
    height: isMaximized ? '100vh' : '500px',
    top: isMaximized ? 0 : 80,
    left: isMaximized ? 0 : 80,
    borderRadius: isMaximized ? 0 : '1rem',
  };
  const exit = { opacity: 0, scale: 0.95 };

  return (
    <motion.div
        drag={!isMaximized}
        dragMomentum={false}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{ duration: 0.2 }}
        onDragStart={() => {
            bringToFront(id);
            setStartMenuOpen(false);
        }}
        onClick={() => bringToFront(id)}
        className={`absolute flex flex-col overflow-hidden transition-shadow duration-200 border border-white/10 ${isActive ? 'shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-50 ring-1 ring-white/20' : 'z-0 shadow-lg'} ${!isMaximized ? 'rounded-2xl' : ''}`}
        style={{ 
            zIndex: isActive ? 50 : 10,
            backdropFilter: "blur(40px) saturate(150%)", 
            WebkitBackdropFilter: "blur(40px) saturate(150%)",
            background: "linear-gradient(135deg, rgba(20, 20, 20, 0.5) 0%, rgba(5, 5, 5, 0.7) 100%)",
            boxShadow: "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 2px 0 rgba(255, 255, 255, 0.05)"
        }}
    >
        {/* Window Content container rendering above the glass layers */}
        <div className="relative flex flex-col h-full w-full">
        {/* Title Bar */}
        <div 
            className="h-10 min-h-[40px] bg-white/5 flex items-center justify-between select-none cursor-default border-b border-white/10" 
            onDoubleClick={() => toggleMaximize(id)}
             onPointerDownCapture={(e) => {
                // Prevent drag if clicking buttons
                if (e.target.closest('button')) {
                    e.stopPropagation(); 
                }
            }}
        >
            <div className="flex items-center gap-3 px-3 flex-1 h-full drag-handle">
                {icon && <span className="flex items-center justify-center w-5 h-5">{icon}</span>}
                <span className="text-[12px] text-white/90 font-medium leading-none mt-0.5">{title}</span>
            </div>
            
            <div className="flex items-center h-full">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleMinimize(id); }}
                  className="h-full w-[46px] flex items-center justify-center hover:bg-white/10 transition-colors group"
                  title="Minimize"
                >
                    <Minus size={16} className="text-white/80 group-hover:text-white stroke-[1.5]" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
                  className="h-full w-[46px] flex items-center justify-center hover:bg-white/10 transition-colors group"
                  title={isMaximized ? "Restore" : "Maximize"}
                >
                    {isMaximized ? (
                        <Copy size={13} className="text-white/80 group-hover:text-white stroke-[2] rotate-90" /> 
                    ) : (
                        <Square size={13} className="text-white/80 group-hover:text-white stroke-[2]" />
                    )}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                  className="h-full w-[46px] flex items-center justify-center hover:bg-red-500/80 hover:text-white transition-colors group"
                   title="Close"
                >
                    <X size={16} className="text-white/80 group-hover:text-white stroke-[1.5]" />
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-black/40 overflow-hidden relative">
            {children || (
                <div className="p-4 text-white/90">
                    <h1 className="text-2xl font-bold mb-4">Welcome to {title}</h1>
                    <p>This is a simulated window for {title}.</p>
                </div>
            )}
        </div>
        </div>
    </motion.div>
  );
};
