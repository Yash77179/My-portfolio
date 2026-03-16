import { motion } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';
import { useWindowManager } from './WindowManager.jsx';

export const Window = ({ id, title, icon }) => {
  const { closeWindow, activeWindowId, bringToFront, toggleMinimize, startMenuOpen, setStartMenuOpen } = useWindowManager();
  const isActive = activeWindowId === id;

  // Window animations
  const initial = { opacity: 0, scale: 0.95, y: 20 };
  const animate = { opacity: 1, scale: 1, y: 0 };
  const exit = { opacity: 0, scale: 0.95 };

  return (
    <motion.div
        drag
        dragMomentum={false}
        initial={initial}
        animate={animate}
        exit={exit}
        onDragStart={() => {
            bringToFront(id);
            setStartMenuOpen(false);
        }}
        onClick={() => bringToFront(id)}
        className={`absolute top-20 left-20 w-[800px] h-[500px] bg-white dark:bg-[#202020] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-shadow duration-200 ${isActive ? 'shadow-black/20 z-50 ring-1 ring-blue-500/20' : 'z-0 opacity-90'}`}
        style={{ zIndex: isActive ? 50 : 10 }}
    >
        {/* Title Bar */}
        <div className="h-10 bg-gray-50 dark:bg-[#2c2c2c] flex items-center justify-between px-3 select-none cursor-default" onDoubleClick={() => toggleMinimize(id)}>
            <div className="flex items-center gap-2">
                {icon && <span className="text-xl">{icon}</span>}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{title}</span>
            </div>
            
            <div className="flex items-center gap-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleMinimize(id); }}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                >
                    <Minus size={14} className="text-gray-500 dark:text-gray-400" />
                </button>
                <button 
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                >
                    <Square size={12} className="text-gray-500 dark:text-gray-400" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                  className="p-1.5 hover:bg-red-500 hover:text-white rounded-md transition-colors group"
                >
                    <X size={14} className="text-gray-500 dark:text-gray-400 group-hover:text-white" />
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-[#1e1e1e] overflow-auto relative rounded-b-xl">
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
