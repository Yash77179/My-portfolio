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
    height: isMaximized ? 'calc(100vh - 48px)' : '500px', // Subtract taskbar height (48px)
    top: isMaximized ? 0 : 80, // 20 * 4 = 80px
    left: isMaximized ? 0 : 80,
    borderRadius: isMaximized ? 0 : '0.75rem', // xl
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
        className={`absolute flex flex-col overflow-hidden transition-shadow duration-200 bg-white dark:bg-[#202020] border border-gray-200 dark:border-gray-700 ${isActive ? 'shadow-2xl z-50 ring-1 ring-white/10' : 'z-0 opacity-90 shadow-lg'} ${!isMaximized ? 'rounded-xl' : ''}`}
        style={{ zIndex: isActive ? 50 : 10 }}
    >
        {/* Title Bar */}
        <div 
            className="h-10 min-h-[40px] bg-[#f3f3f3] dark:bg-[#202020] flex items-center justify-between select-none cursor-default border-b border-gray-200/50 dark:border-black/50" 
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
                <span className="text-[12px] text-gray-800 dark:text-gray-100 font-medium leading-none mt-0.5">{title}</span>
            </div>
            
            <div className="flex items-center h-full">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleMinimize(id); }}
                  className="h-full w-[46px] flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                  title="Minimize"
                >
                    <Minus size={16} className="text-gray-800 dark:text-gray-100 opacity-60 group-hover:opacity-100 stroke-[1.5]" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
                  className="h-full w-[46px] flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                  title={isMaximized ? "Restore" : "Maximize"}
                >
                    {isMaximized ? (
                        <Copy size={13} className="text-gray-800 dark:text-gray-100 opacity-60 group-hover:opacity-100 stroke-[2] rotate-90" /> 
                    ) : (
                        <Square size={13} className="text-gray-800 dark:text-gray-100 opacity-60 group-hover:opacity-100 stroke-[2]" />
                    )}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                  className="h-full w-[46px] flex items-center justify-center hover:bg-[#c42b1c] hover:text-white transition-colors group"
                   title="Close"
                >
                    <X size={16} className="text-gray-800 dark:text-gray-100 group-hover:text-white opacity-80 group-hover:opacity-100 stroke-[1.5]" />
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-[#191919] overflow-auto relative">
            {children || (
                <div className="p-4 text-gray-800 dark:text-gray-200">
                    <h1 className="text-2xl font-bold mb-4">Welcome to {title}</h1>
                    <p>This is a simulated window for {title}.</p>
                </div>
            )}
        </div>
    </motion.div>
  );
};
