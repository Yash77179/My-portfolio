import { useState, useEffect } from "react";
import { useWindowManager } from "./WindowManager";
import { FolderOpen, Settings, Chrome, Terminal, Send, Search, CloudSun, Wifi, Volume2, BatteryMedium, ChevronUp, Mic, Maximize, Minimize } from "lucide-react";

// Icons
import startIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/tools/start.ico';
import searchIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/tools/search.ico';
import explorerIcon from '../../assets/windows11iconsV1/windows11iconsV1/folders/explorer.ico';
import edgeIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/tools/edge.ico';
import terminalIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/terminal.ico';
import mailIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/mail.ico';
import storeIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/store.ico';

import { GlassEffect, GlassFilter } from '../ui/liquid-glass';
import FileExplorer from './apps/FileExplorer';

export default function Taskbar() {
  const { startMenuOpen, setStartMenuOpen, activeWindowId, windows, openWindow, toggleMinimize, bringToFront } = useWindowManager();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Listen for fullscreen changes natively
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.warn(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
  };

  const apps = [
    { 
        title: "File Explorer", 
        icon: <img src={explorerIcon} alt="Explorer" className="w-[28px] h-[28px]" />, 
        appId: "explorer", 
        content: <FileExplorer /> 
    },
    { 
        title: "Edge", 
        icon: <img src={edgeIcon} alt="Edge" className="w-[28px] h-[28px]" />, 
        appId: "browser", 
        content: <div className="p-4">Browser Content</div> 
    },
    {
        title: "Microsoft Store",
        icon: <img src={storeIcon} alt="Store" className="w-[28px] h-[28px]" />,
        appId: "store",
        content: <div className="p-4">Store Content</div>
    },
    { 
        title: "Terminal", 
        icon: <img src={terminalIcon} alt="Terminal" className="w-[28px] h-[28px]" />,
        appId: "terminal", 
        content: <div className="bg-black text-green-500 font-mono h-full p-2 text-sm">C:\Users\Visitor&gt; npm install windows-11-portfolio<br/><br/>Installing...<br/>Done!</div> 
    },
    { 
        title: "Mail", 
        icon: <img src={mailIcon} alt="Mail" className="w-[28px] h-[28px]" />,
        appId: "mail", 
        content: <div className="p-4">Mail Content</div> 
    },
  ];

  return (
    <div className="fixed bottom-4 md:bottom-6 w-full flex justify-center px-4 z-[100] select-none text-white pointer-events-none">
      <GlassFilter />
      
      <GlassEffect className="h-14 md:h-16 px-2 md:px-4 rounded-[32px] pointer-events-auto max-w-full overflow-x-auto overflow-y-hidden shadow-2xl border border-white/5 scrollbar-hide">
        <div className="flex items-center justify-between w-full gap-4 md:gap-8 h-full">
          
          {/* 1. Left: Widgets (Weather) - Hidden on mobile */}
          <div className="hidden md:flex flex-none justify-start items-center">
              <button className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-2xl transition-all duration-300 group">
                  <CloudSun size={20} className="text-cyan-300 group-hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                  <div className="flex flex-col items-start leading-none">
                      <span className="text-xs font-semibold text-white/90">26°C</span>
                      <span className="text-[10px] text-white/50">Clear</span>
                  </div>
              </button>
          </div>

          {/* 2. Center: Pinned Apps & Start */}
          <div className="flex flex-1 items-center justify-center gap-1 md:gap-2 h-full">
            {/* Start Button */}
            <button
                className={`p-2.5 rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-90 ${startMenuOpen ? 'bg-white/15 shadow-[inset_0_0_15px_rgba(255,255,255,0.1)]' : ''}`}
                onClick={() => setStartMenuOpen(!startMenuOpen)}
                title="Start"
            >
                <img src={startIcon} alt="Start" className="w-8 h-8 drop-shadow-md transition-transform hover:scale-110" />
            </button>

            {/* Search Bar - Expanded */}
            <div className="hidden sm:block relative group mx-2">
                 <div className="flex items-center bg-black/40 hover:bg-black/60 transition-all duration-300 rounded-full px-4 py-2 w-56 border border-white/10 shadow-inner cursor-text ring-1 ring-transparent hover:ring-white/20">
                    <Search size={14} className="text-white/40 mr-2 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-[13px] text-white/50 font-normal">Search...</span>
                    
                    {/* Visual Flair */}
                    <div className="ml-auto w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 opacity-80 animate-pulse"></div>
                 </div>
            </div>

            <div className="w-[1px] h-6 bg-white/10 mx-1 md:mx-2 rounded-full"></div>

             {/* Mapped Apps */}
             {apps.map((app) => {
                const windowInstance = windows.find(w => w.id === app.appId);
                const isOpen = !!windowInstance;
                const isActive = activeWindowId === app.appId && !windowInstance?.minimized;
                
                return (
                    <button
                        key={app.appId}
                        onClick={() => {
                            if (isOpen) {
                                if (isActive) {
                                    toggleMinimize(app.appId);
                                } else {
                                    bringToFront(app.appId);
                                }
                            } else {
                                openWindow(app.appId, app.content, app.title, app.icon);
                            }
                        }}
                        className={`relative p-2.5 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,2.2)] hover:bg-white/10 hover:-translate-y-1 group ${isActive ? 'bg-white/5' : ''} ${isOpen ? 'after:content-[""] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-cyan-400 after:shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`}
                        title={app.title}
                    >
                       <div className="transition-transform duration-300 active:scale-95 group-hover:scale-110 filter drop-shadow-lg">
                           {app.icon}
                       </div>
                    </button>
                )
             })}
          </div>

          {/* 3. Right: System Tray - Hidden on mobile */}
          <div className="hidden md:flex flex-none justify-end items-center gap-2">
              {/* Taskbar Overflow & Fullscreen Toggle */}
              <button onClick={toggleFullscreen} className="p-1.5 hover:bg-white/10 rounded-full hover:bg-opacity-10 transition-colors" title="Toggle Fullscreen">
                  {isFullscreen ? <Minimize size={16} className="text-white/60 hover:text-white" /> : <Maximize size={16} className="text-white/60 hover:text-white" />}
              </button>
              
              <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                  <ChevronUp size={16} className="text-white/60" />
              </button>

              {/* Quick Settings Group */}
              <button className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-2xl transition-all duration-300">
                  <Wifi size={16} className="text-white/80 hover:text-cyan-300 transition-colors" />
                  <Volume2 size={16} className="text-white/80 hover:text-cyan-300 transition-colors" />
                  <BatteryMedium size={16} className="text-white/80 hover:text-green-400 transition-colors" />
              </button>

              {/* Clock */}
              <button 
                className="flex flex-col items-end leading-none px-3 py-1.5 hover:bg-white/10 rounded-2xl transition-all duration-300"
                title={currentTime.toLocaleDateString()}
              >
                  <span className="text-xs font-bold text-white/90">
                    {currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase()}
                  </span>
                  <span className="text-[10px] text-white/50">
                    {currentTime.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}
                  </span>
              </button>
          </div>

        </div>
      </GlassEffect>
    </div>
  );
}
