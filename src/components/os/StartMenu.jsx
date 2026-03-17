import { useEffect, useRef, useState } from "react";
import { useWindowManager } from "./WindowManager";
import { Search, Power, ChevronRight, FileText, Lock, RotateCcw, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import edgeIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/tools/edge.ico';
import wordIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/office/word.ico';
import excelIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/office/excel.ico';
import powerpointIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/office/powerpoint.ico';
import outlookIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/office/outlook.ico';
import storeIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/store.ico';
import photosIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/photos.ico';
import settingsIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/tools/settings.ico';
import calculatorIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/calculator.ico';
import solitaireIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/solitaire.ico';
import paintIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/paint.ico';
import notepadIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/notepad.ico';
import calendarIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/calendar.ico';
import mailIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/mail.ico';
import terminalIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/terminal.ico';
import codeIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/office/code.ico';
import spotifyIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/groove.ico';
import moviesIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/movies.ico';

export default function StartMenu() {
  const { startMenuOpen, setStartMenuOpen, onShutdown, onRestart, openWindow, onLock } = useWindowManager();
  const menuRef = useRef(null);
  const [showPowerMenu, setShowPowerMenu] = useState(false);

  useEffect(() => {
    const clickHandler = (e) => {
         // Close if clicking outside, BUT NOT if clicking the start button (which toggles it)
         if (startMenuOpen && menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('button[title="Start"]')) {
             setStartMenuOpen(false);
         }
    }
    document.addEventListener("mousedown", clickHandler);
    return () => document.removeEventListener("mousedown", clickHandler);
  }, [startMenuOpen, setStartMenuOpen]);

  const pinnedApps = [
      { name: 'Edge', icon: edgeIcon, id: 'browser' },
      { name: 'Word', icon: wordIcon, id: 'word' },
      { name: 'Excel', icon: excelIcon, id: 'excel' },
      { name: 'PowerPoint', icon: powerpointIcon, id: 'powerpoint' },
      { name: 'Mail', icon: mailIcon, id: 'mail' },
      { name: 'Calendar', icon: calendarIcon, id: 'calendar' },
      { name: 'Store', icon: storeIcon, id: 'store' },
      { name: 'Photos', icon: photosIcon, id: 'photos' },
      { name: 'Settings', icon: settingsIcon, id: 'settings' },
      { name: 'Solitaire', icon: solitaireIcon, id: 'solitaire' },
      { name: 'Spotify', icon: spotifyIcon, id: 'spotify' },
      { name: 'Paint', icon: paintIcon, id: 'paint' },
      { name: 'Notepad', icon: notepadIcon, id: 'notepad' },
      { name: 'Calculator', icon: calculatorIcon, id: 'calculator' },
      { name: 'Terminal', icon: terminalIcon, id: 'terminal' },
      { name: 'VS Code', icon: codeIcon, id: 'vscode' },
      { name: 'Movies', icon: moviesIcon, id: 'movies' },
      { name: 'Outlook', icon: outlookIcon, id: 'outlook' },
  ];
  
  // No need to return null here, AnimatePresence handles specific mounting
  
  return (
    <motion.div 
        ref={menuRef}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0, transition: { duration: 0.25 } }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="fixed bottom-[96px] left-1/2 -translate-x-1/2 w-[90%] md:w-[640px] h-[720px] max-h-[80vh] rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col pt-8 pb-0 z-[101] text-white select-none overflow-hidden"
        style={{ 
            transformOrigin: "bottom center",
            backdropFilter: "blur(40px) saturate(150%)", 
            WebkitBackdropFilter: "blur(40px) saturate(150%)",
            background: "linear-gradient(135deg, rgba(35, 35, 35, 0.45) 0%, rgba(10, 10, 10, 0.65) 100%)"
        }}
    >
        {/* Start Menu Foreground Elements */}
        <div className="relative flex flex-col h-full w-full">
        {/* Search Bar */}
        <div className="px-8 mb-6">
            <div className="relative group rounded-full bg-[#1a1a1a] border-t border-white/5 border-b border-white/5 shadow-inner flex items-center h-10">
                <Search className="ml-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Search for apps, settings, and documents" 
                    className="w-full px-3 py-2 bg-transparent border-none focus:outline-none text-sm text-gray-200 placeholder:text-gray-500 font-normal h-full"
                    autoFocus
                />
            </div>
        </div>

        {/* Pinned Section */}
        <div className="flex-1 px-8 overflow-y-auto custom-scrollbar mb-2">
            <div className="flex justify-between items-end mb-4 px-2">
                <h3 className="font-semibold text-sm text-white/90">Pinned</h3>
                <button className="flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors text-white/80 border border-white/5 shadow-sm">
                    All apps <ChevronRight size={10} />
                </button>
            </div>
            
            <div className="grid grid-cols-6 gap-y-6 gap-x-2 pb-6">
                {pinnedApps.map((app, i) => (
                    <button 
                        key={i} 
                        className="flex flex-col items-center gap-2 p-2 rounded hover:bg-white/5 active:bg-white/10 transition-all duration-200 group relative"
                        onClick={() => {
                            if (app.id) openWindow(app.id, <div className="p-10 text-white">App Content for {app.name}</div>, app.name, <img src={app.icon} className="w-5 h-5"/>)
                            setStartMenuOpen(false);
                        }}
                    >
                        <img src={app.icon} alt={app.name} className="w-8 h-8 drop-shadow-md group-hover:scale-110 group-active:scale-95 transition-transform duration-200" />
                        <span className="text-[11px] font-medium text-center text-gray-300 group-hover:text-white line-clamp-1 w-full leading-tight">{app.name}</span>
                    </button>
                ))}
            </div>

            {/* Recommended Section */}
            <div className="p-2 -mx-2">
                 <div className="flex justify-between items-end mb-4 px-2">
                    <h3 className="font-semibold text-sm text-white/90">Recommended</h3>
                    <button className="flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors text-white/80 border border-white/5 shadow-sm">
                        More <ChevronRight size={10} />
                    </button>
                </div>
                 <div className="grid grid-cols-2 gap-1 pb-4">
                    {/* Recent Files */}
                    <button className="flex items-center gap-3 p-2 rounded hover:bg-white/5 active:bg-white/10 text-left transition-colors group">
                        <div className="w-8 h-8 bg-blue-500/10 rounded flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                            <FileText size={18} className="text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-200 group-hover:text-white">Portfolio_Project_Final</span>
                            <span className="text-[11px] text-gray-500 group-hover:text-gray-400">Recently added</span>
                        </div>
                    </button>
                     <button className="flex items-center gap-3 p-2 rounded hover:bg-white/5 active:bg-white/10 text-left transition-colors group">
                        <div className="w-8 h-8 rounded flex items-center justify-center bg-gray-700/50">
                            <img src={settingsIcon} className="w-5 h-5 opacity-90" alt="Settings" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-200 group-hover:text-white">Get Started</span>
                            <span className="text-[11px] text-gray-500 group-hover:text-gray-400">Welcome to Windows 11</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>

        {/* User bar */}
        <div className="mt-auto h-[72px] bg-black/30 border-t border-white/10 flex justify-between items-center px-8 md:px-12 -mx-0">
            <button className="flex items-center gap-3 hover:bg-white/10 p-2 pl-2 pr-4 rounded-md transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 overflow-hidden relative border border-white/10 shadow-sm flex items-center justify-center">
                     <span className="text-[10px] font-bold text-white">YP</span>
                </div>
                <span className="text-xs font-medium text-gray-200 group-hover:text-white">Yash Patil</span>
            </button>
            <div className="relative flex items-center">
                <button 
                    className={`p-2.5 rounded-md transition-colors ${showPowerMenu ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10 active:bg-white/20'}`} 
                    title="Power"
                    onClick={(e) => { e.stopPropagation(); setShowPowerMenu(!showPowerMenu); }}
                >
                    <Power size={18} />
                </button>
                
                {/* Power Context Menu */}
                 <AnimatePresence>
                     {showPowerMenu && (
                         <motion.div 
                             initial={{ opacity: 0, y: 10, scale: 0.95 }}
                             animate={{ opacity: 1, y: 0, scale: 1 }}
                             exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
                             className="absolute bottom-[110%] right-0 w-48 bg-[#1e1e1e]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50 origin-bottom-right"
                         >
                             <button 
                                 onClick={() => { setShowPowerMenu(false); if (onLock) onLock(); }}
                                 className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 text-sm font-medium"
                             >
                                 <LogOut size={16} className="text-white/80" /> Lock
                             </button>
                             <button 
                                 onClick={() => { setShowPowerMenu(false); if (onShutdown) onShutdown(); }}
                                 className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 text-sm font-medium"
                             >
                                 <Power size={16} className="text-white/80" /> Shut down
                             </button>
                             <button 
                                 onClick={() => { setShowPowerMenu(false); if (onRestart) onRestart(); }}
                                 className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 text-sm font-medium"
                             >
                                 <RotateCcw size={16} className="text-white/80" /> Restart
                             </button>
                         </motion.div>
                     )}
                 </AnimatePresence>
            </div>
        </div>
        </div>
    </motion.div>
  );
}
