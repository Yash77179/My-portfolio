import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Square, X, Copy } from 'lucide-react';
import { useWindowManager } from './WindowManager';
import { Rnd } from 'react-rnd';

export const Window = ({ children, id, title, icon }) => {
  const { closeWindow, activeWindowId, bringToFront, toggleMinimize, toggleMaximize, windows, startMenuOpen, setStartMenuOpen } = useWindowManager();
  const isActive = activeWindowId === id;
  const windowState = windows.find((w) => w.id === id);
  const isMaximized = windowState?.maximized;
  const isMinimized = windowState?.minimized;

  // Default position roughly centered
  const [rndState, setRndState] = useState({
      width: 800,
      height: 500,
      x: typeof window !== 'undefined' ? window.innerWidth / 2 - 400 : 80,
      y: typeof window !== 'undefined' ? window.innerHeight / 2 - 250 : 80
  });

  // Track if we just maximized to save previous state
  const [preMaxState, setPreMaxState] = useState(null);
  const [showSnapMenu, setShowSnapMenu] = useState(false);
  const [snapPreview, setSnapPreview] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const hideSnapMenuTimeout = React.useRef(null);

  const handleMouseEnterSnap = () => {
      if (hideSnapMenuTimeout.current) clearTimeout(hideSnapMenuTimeout.current);
      setShowSnapMenu(true);
  };

  const handleMouseLeaveSnap = () => {
      hideSnapMenuTimeout.current = setTimeout(() => setShowSnapMenu(false), 300);
  };

  const handleMaximize = () => {
      bringToFront(id);
      if (!isMaximized) {
          // Temporarily store the physical bounds right BEFORE the maximize to make restoring exact
          setPreMaxState({ ...rndState });
          setRndState({ width: window.innerWidth, height: window.innerHeight, x: 0, y: 0 });
          toggleMaximize(id);
      } else {
          // Window is already maximized. On restore, flip it explicitly backing towards the actual last saved local coordinate set.
          if (preMaxState) {
              setRndState(preMaxState);
          } else {
              setRndState({ width: 800, height: 500, x: 80, y: 80 });
          }
          setPreMaxState(null);
          // Calling this natively alters the global flag
          toggleMaximize(id);
      }
  };

  const snapWindow = (type) => {
      bringToFront(id);
      if (isMaximized) {
          toggleMaximize(id);
      }
      
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      if (!preMaxState && !isMaximized) setPreMaxState({...rndState});

      switch(type) {
          case 'left-half':
              setRndState({ width: vw / 2, height: vh, x: 0, y: 0 });
              break;
          case 'right-half':
              setRndState({ width: vw / 2, height: vh, x: vw / 2, y: 0 });
              break;
          case 'top-left':
              setRndState({ width: vw / 2, height: vh / 2, x: 0, y: 0 });
              break;
          case 'bottom-left':
              setRndState({ width: vw / 2, height: vh / 2, x: 0, y: vh / 2 });
              break;
          case 'top-right':
              setRndState({ width: vw / 2, height: vh / 2, x: vw / 2, y: 0 });
              break;
          case 'bottom-right':
              setRndState({ width: vw / 2, height: vh / 2, x: vw / 2, y: vh / 2 });
              break;
          default:
              break;
      }
      setShowSnapMenu(false);
  };

  // Window entry/exit animations
  const initial = { opacity: 0, scale: 0.95 };
  const animate = { opacity: isMinimized ? 0 : 1, scale: isMinimized ? 0.95 : 1, y: isMinimized ? 20 : 0 };
  const exit = { opacity: 0, scale: 0.95 };

  const snapVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: (side) => {
          let origin = "center";
          if (side === 'left-half') origin = 'left center';
          if (side === 'right-half') origin = 'right center';
          if (side === 'top-left') origin = 'left top';
          if (side === 'top-right') origin = 'right top';
          if (side === 'bottom-left') origin = 'left bottom';
          if (side === 'bottom-right') origin = 'right bottom';
          if (side === 'maximize') origin = 'top center';
          return {
              opacity: 1, 
              scale: 1,
              transformOrigin: origin,
              transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
          };
      },
      exit: { opacity: 0, scale: 0.9, transition: { duration: 0.1 } }
  };

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 1000;
  
  let attachedSides = 0;
  if (rndState.x <= 0) attachedSides++;
  if (rndState.y <= 0) attachedSides++;
  if (rndState.x + rndState.width >= vw - 1) attachedSides++;
  if (rndState.y + rndState.height >= vh - 1) attachedSides++;
  const shouldRemoveRadius = isMaximized || attachedSides >= 2;

  return (
    <>
    {/* Holographic Snap Preview Box - rendered behind the active window */}
    <AnimatePresence>
    {snapPreview && (
        <motion.div 
            variants={snapVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={snapPreview}
            className={`fixed z-[40] bg-white/10 border border-white/20 backdrop-blur-md pointer-events-none shadow-[0_0_30px_rgba(255,255,255,0.1)] ${
                snapPreview === 'maximize' ? 'top-0 left-0 right-0 bottom-0 rounded-none' :
                snapPreview === 'left-half' ? 'top-0 left-0 bottom-0 w-[50vw] rounded-r-xl' :
                snapPreview === 'right-half' ? 'top-0 right-0 bottom-0 w-[50vw] rounded-l-xl' : 
                snapPreview === 'top-left' ? 'top-0 left-0 w-[50vw] h-[50vh] rounded-br-xl' :
                snapPreview === 'top-right' ? 'top-0 right-0 w-[50vw] h-[50vh] rounded-bl-xl' :
                snapPreview === 'bottom-left' ? 'bottom-0 left-0 w-[50vw] h-[50vh] rounded-tr-xl' :
                snapPreview === 'bottom-right' ? 'bottom-0 right-0 w-[50vw] h-[50vh] rounded-tl-xl' : ''
            }`}
        />
    )}
    </AnimatePresence>
    <Rnd
        size={{ 
            width: rndState.width, 
            height: rndState.height 
        }}
        position={{ 
            x: rndState.x, 
            y: rndState.y 
        }}
        className={`!absolute ${!isInteracting ? 'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]' : ''}`}
        onDragStart={(e, d) => {
            setIsInteracting(true);
            bringToFront(id);
            setStartMenuOpen(false);
        }}
        onDrag={(e, d) => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            
            if (isMaximized) {
                // Instantly un-maximize and calculate a realistic drag offset. 
                // We use delta from initial to prevent cursor jumping
                const mouseX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? vw / 2;
                const mouseY = e.clientY ?? (e.touches && e.touches[0].clientY) ?? 50;
                const newWidth = preMaxState?.width || 800;
                
                // Keep the cursor at the same relative position on the title bar
                const relativeX = mouseX / vw;
                
                // Immediately revert to windowed mode
                setRndState({ 
                    width: newWidth,
                    height: preMaxState?.height || 500,
                    x: mouseX - (newWidth * relativeX), 
                    y: Math.max(0, mouseY - 20) 
                });
                toggleMaximize(id);
                return;
            }
            
            const threshold = 15;
            const cornerY = 150;
            const cornerX = 150;
            const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? vw / 2;
            const clientY = e.clientY ?? (e.touches && e.touches[0].clientY) ?? 50;

            if (clientY <= threshold) {
                if (clientX <= cornerX) setSnapPreview('top-left');
                else if (clientX >= vw - cornerX) setSnapPreview('top-right');
                else setSnapPreview('maximize');
            } else if (clientX <= threshold) {
                if (clientY <= cornerY) setSnapPreview('top-left');
                else if (clientY >= vh - cornerY) setSnapPreview('bottom-left');
                else setSnapPreview('left-half');
            } else if (clientX >= vw - threshold) {
                if (clientY <= cornerY) setSnapPreview('top-right');
                else if (clientY >= vh - cornerY) setSnapPreview('bottom-right');
                else setSnapPreview('right-half');
            } else {
                setSnapPreview(null);
            }
        }}
        onDragStop={(e, d) => {
            setSnapPreview(null);
            setIsInteracting(false);
            
            // Prevent disappearing into top bar
            let finalY = Math.max(0, d.y);
            let finalX = d.x;
            
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const threshold = 15;
            const cornerY = 150;
            const cornerX = 150;

            const clientX = e.clientX ?? (e.changedTouches && e.changedTouches[0].clientX) ?? vw / 2;
            const clientY = e.clientY ?? (e.changedTouches && e.changedTouches[0].clientY) ?? 50;
            
            let action = null;
            if (clientY <= threshold) {
                if (clientX <= cornerX) action = 'top-left';
                else if (clientX >= vw - cornerX) action = 'top-right';
                else action = 'maximize';
            } else if (clientX <= threshold) {
                if (clientY <= cornerY) action = 'top-left';
                else if (clientY >= vh - cornerY) action = 'bottom-left';
                else action = 'left-half';
            } else if (clientX >= vw - threshold) {
                if (clientY <= cornerY) action = 'top-right';
                else if (clientY >= vh - cornerY) action = 'bottom-right';
                else action = 'right-half';
            }

            if (action === 'maximize') {
                if (!isMaximized) {
                    handleMaximize();
                }
                return;
            } else if (action === 'left-half') {
                snapWindow('left-half');
                return;
            } else if (action === 'right-half') {
                snapWindow('right-half');
                return;
            } else if (action === 'top-left') {
                snapWindow('top-left');
                return;
            } else if (action === 'top-right') {
                snapWindow('top-right');
                return;
            } else if (action === 'bottom-left') {
                snapWindow('bottom-left');
                return;
            } else if (action === 'bottom-right') {
                snapWindow('bottom-right');
                return;
            }
            
            setRndState(prev => ({ ...prev, x: finalX, y: finalY }));
        }}
        onResizeStart={() => setIsInteracting(true)}
        onResizeStop={(e, dir, ref, delta, pos) => {
            setIsInteracting(false);
            if (!isMaximized) {
                setRndState({ width: ref.offsetWidth, height: ref.offsetHeight, x: pos.x, y: Math.max(0, pos.y) });
            }
        }}
        disableDragging={false}
        enableResizing={!isMaximized}
        resizeHandleStyles={{
            bottom: { height: '8px', bottom: '-4px', cursor: 'ns-resize' },
            bottomLeft: { width: '12px', height: '12px', bottom: '-6px', left: '-6px', cursor: 'nesw-resize' },
            bottomRight: { width: '12px', height: '12px', bottom: '-6px', right: '-6px', cursor: 'nwse-resize' },
            left: { width: '8px', left: '-4px', cursor: 'ew-resize' },
            right: { width: '8px', right: '-4px', cursor: 'ew-resize' },
            top: { height: '8px', top: '-4px', cursor: 'ns-resize' },
            topLeft: { width: '12px', height: '12px', top: '-6px', left: '-6px', cursor: 'nwse-resize' },
            topRight: { width: '12px', height: '12px', top: '-6px', right: '-6px', cursor: 'nesw-resize' }
        }}
        dragHandleClassName="drag-handle"
        minWidth={400}
        minHeight={300}
        maxWidth="100vw"
        maxHeight="100vh"
        style={{ 
            zIndex: isActive ? 50 : 10,
            pointerEvents: isMinimized ? 'none' : 'auto'
        }}
        onMouseDown={() => bringToFront(id)}
    >
        {/* Window Content container rendering inside Rnd */}
        <motion.div
            initial={initial}
            animate={animate}
            exit={exit}
            transition={{ duration: 0.2 }}
            className={`w-full h-full relative flex flex-col overflow-hidden transition-shadow duration-200 border border-white/10 ${isActive ? 'shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/20' : 'shadow-lg'} ${!shouldRemoveRadius ? 'rounded-2xl' : ''}`}
            style={{ 
                backdropFilter: "blur(40px) saturate(150%)", 
                WebkitBackdropFilter: "blur(40px) saturate(150%)",
                background: "linear-gradient(135deg, rgba(20, 20, 20, 0.5) 0%, rgba(5, 5, 5, 0.7) 100%)",
                boxShadow: "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 2px 0 rgba(255, 255, 255, 0.05)"
            }}
        >
            <div className="relative flex flex-col h-full w-full">
            {/* Title Bar */}
            <div 
                className="h-10 min-h-[40px] drag-handle bg-white/5 flex items-center justify-between select-none cursor-default border-b border-white/10" 
                onDoubleClick={handleMaximize}
                onPointerDownCapture={(e) => {
                    // Prevent drag if clicking buttons
                    if (e.target.closest('button') || e.target.closest('.snap-menu-button')) {
                        e.stopPropagation(); 
                    }
                }}
            >
                <div className="flex items-center gap-3 px-3 flex-1 h-full">
                    {icon && <span className="flex items-center justify-center w-[16px] h-[16px] flex-shrink-0 [&>img]:w-full [&>img]:h-full [&>img]:object-contain">{icon}</span>}
                    <span className="text-[12px] text-white/90 font-medium leading-none mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{title}</span>
                </div>
                
                <div className="flex items-center h-full">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleMinimize(id); }}
                      className="h-full w-[46px] flex items-center justify-center hover:bg-white/10 transition-colors group"
                      title="Minimize"
                    >
                        <Minus size={16} className="text-white/80 group-hover:text-white stroke-[1.5]" />
                    </button>
                    <div 
                        className="relative flex h-full"
                        onMouseEnter={handleMouseEnterSnap}
                        onMouseLeave={handleMouseLeaveSnap}
                    >
                        <button 
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            setShowSnapMenu(false); 
                            handleMaximize();
                        }}
                        className="snap-menu-button h-full w-[46px] flex items-center justify-center hover:bg-white/10 transition-colors group"
                        title={isMaximized ? "Restore" : "Maximize"}
                        >
                            {isMaximized ? (
                                <Copy size={13} className="text-white/80 group-hover:text-white stroke-[2] rotate-90" /> 
                            ) : (
                                <Square size={13} className="text-white/80 group-hover:text-white stroke-[2]" />
                            )}
                        </button>
                        
                        {/* Snap Assist Menu */}
                        <AnimatePresence>
                        {showSnapMenu && (
                            <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-[100%] right-0 mt-2 w-56 p-3 bg-[#1e1e1e]/95 backdrop-blur-2xl border border-white/20 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-[100] flex flex-col gap-3">
                                <div className="flex justify-between h-14 gap-2">
                                    {/* 50/50 Layout */}
                                    <div className="flex-1 flex gap-1 cursor-pointer group hover:bg-neutral-600/30 p-1 rounded transition-colors" title="Half screen">
                                        <div className="flex-1 rounded-sm bg-neutral-500/50 group-hover:bg-[#0078D4] transition-colors border border-white/10" onClick={() => snapWindow('left-half')}></div>
                                        <div className="flex-1 rounded-sm bg-neutral-500/50 group-hover:bg-[#0078D4] transition-colors border border-white/10" onClick={() => snapWindow('right-half')}></div>
                                    </div>
                                    {/* 70/30 Layout */}
                                    <div className="flex-1 flex gap-1 cursor-pointer group hover:bg-neutral-600/30 p-1 rounded transition-colors" title="Split screen">
                                        <div className="flex-[2] rounded-sm bg-neutral-500/50 group-hover:bg-[#0078D4] transition-colors border border-white/10" onClick={() => snapWindow('left-half')}></div>
                                        <div className="flex-[1] rounded-sm bg-neutral-500/50 group-hover:bg-[#0078D4] transition-colors border border-white/10" onClick={() => snapWindow('right-half')}></div>
                                    </div>
                                </div>
                                <div className="flex justify-between h-14 gap-2">
                                    {/* Tri Layout */}
                                    <div className="flex-1 flex gap-1 cursor-pointer group hover:bg-neutral-600/30 p-1 rounded transition-colors" title="Three paned">
                                        <div className="flex-[2] rounded-sm bg-neutral-500/50 group-hover:bg-[#0078D4] transition-colors border border-white/10" onClick={() => snapWindow('left-half')}></div>
                                        <div className="flex-[1] flex flex-col gap-1">
                                            <div className="flex-1 rounded-sm bg-neutral-500/50 group-hover:bg-[#0078D4] transition-colors border border-white/10" onClick={() => snapWindow('top-right')}></div>
                                            <div className="flex-1 rounded-sm bg-neutral-500/50 group-hover:bg-[#0078D4] transition-colors border border-white/10" onClick={() => snapWindow('bottom-right')}></div>
                                        </div>
                                    </div>
                                    {/* Quad Layout */}
                                    <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1 cursor-pointer group hover:bg-neutral-600/30 p-1 rounded transition-colors" title="Quarters">
                                        <div className="rounded-sm bg-neutral-500/50 group-hover:bg-[#0078D4] transition-colors border border-white/10" onClick={() => snapWindow('top-left')}></div>
                                        <div className="rounded-sm bg-neutral-500/50 group-hover:bg-[#0078D4] transition-colors border border-white/10" onClick={() => snapWindow('top-right')}></div>
                                        <div className="rounded-sm bg-neutral-500/50 group-hover:bg-[#0078D4] transition-colors border border-white/10" onClick={() => snapWindow('bottom-left')}></div>
                                        <div className="rounded-sm bg-neutral-500/50 group-hover:bg-[#0078D4] transition-colors border border-white/10" onClick={() => snapWindow('bottom-right')}></div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
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
    </Rnd>
    </>
  );
};
