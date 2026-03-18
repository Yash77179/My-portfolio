import { useEffect, useRef } from "react";
import { useWindowManager } from "./WindowManager";
import { Search, ChevronRight, Settings, Image as ImageIcon, Camera, Notebook, Video, Wand2 } from "lucide-react";
import { motion } from "framer-motion";

// Apps Icons
import edgeIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/tools/edge.ico';
import wordIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/office/word.ico';
import storeIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/store.ico';
import photosIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/photos.ico';
import terminalIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/terminal.ico';
import codeIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/office/code.ico';
import explorerIcon from '../../assets/windows11iconsV1/windows11iconsV1/folders/explorer.ico';

export default function SearchMenu() {
  const { searchOpen, setSearchOpen, openWindow } = useWindowManager();
  const menuRef = useRef(null);

  useEffect(() => {
    const clickHandler = (e) => {
         // Close if clicking outside, BUT NOT if clicking the search button (which toggles it)
         if (searchOpen && menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('button[title="Start"]') && !e.target.closest('button > span:contains("Search")')) {
             setSearchOpen(false);
         }
    }
    document.addEventListener("mousedown", clickHandler);
    return () => document.removeEventListener("mousedown", clickHandler);
  }, [searchOpen, setSearchOpen]);

  const recentApps = [
      { name: 'Edge', icon: edgeIcon, id: 'browser', type: 'App' },
      { name: 'Terminal', icon: terminalIcon, id: 'terminal', type: 'App' },
      { name: 'VS Code', icon: codeIcon, id: 'vscode', type: 'App' },
      { name: 'File Explorer', icon: explorerIcon, id: 'explorer', type: 'App' },
      { name: 'Exanor Store App', icon: storeIcon, id: 'store', type: 'App' },
      { name: 'Photos', icon: photosIcon, id: 'photos', type: 'App' },
  ];

  const topApps = [
      { name: 'Edge', icon: edgeIcon, id: 'browser' },
      { name: 'VS Code', icon: codeIcon, id: 'vscode' },
      { name: 'File Explorer', icon: explorerIcon, id: 'explorer' },
      { name: 'Terminal', icon: terminalIcon, id: 'terminal' },
  ];

  // If this renders, searchOpen is true anyway, just standard AnimatePresence behavior
  return (
    <motion.div 
        ref={menuRef}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0, transition: { duration: 0.25 } }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="fixed bottom-[96px] left-1/2 -translate-x-1/2 w-[90%] md:w-[760px] h-[720px] max-h-[85vh] rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col pt-8 pb-0 z-[100000] text-white select-none overflow-hidden"
        style={{ 
            transformOrigin: "bottom center",
            backdropFilter: "blur(40px) saturate(150%)", 
            WebkitBackdropFilter: "blur(40px) saturate(150%)",
            background: "linear-gradient(135deg, rgba(35, 35, 35, 0.45) 0%, rgba(10, 10, 10, 0.65) 100%)"
        }}
    >
        {/* Search Bar Context */}
        <div className="px-8 mb-6">
            <div className="relative group rounded-full bg-[#1a1a1a] border-t border-white/5 border-b border-white/5 shadow-inner flex items-center h-12">
                <Search className="ml-5 text-cyan-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Type here to search" 
                    className="w-full px-4 py-2 bg-transparent border-none focus:outline-none text-[15px] text-white placeholder:text-gray-400 font-medium h-full"
                    autoFocus
                />
            </div>
            
            <div className="flex gap-6 mt-4 px-2">
                <button className="text-sm font-semibold border-b-2 border-cyan-400 pb-1 text-white">All</button>
                <button className="text-sm font-medium border-b-2 border-transparent hover:border-white/20 pb-1 text-white/70 hover:text-white transition-all">Apps</button>
                <button className="text-sm font-medium border-b-2 border-transparent hover:border-white/20 pb-1 text-white/70 hover:text-white transition-all">Documents</button>
                <button className="text-sm font-medium border-b-2 border-transparent hover:border-white/20 pb-1 text-white/70 hover:text-white transition-all">Web</button>
                <button className="text-sm font-medium border-b-2 border-transparent hover:border-white/20 pb-1 text-white/70 hover:text-white transition-all">More</button>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col md:flex-row divide-x divide-white/5">
            {/* Left Column: Recent */}
            <div className="w-full md:w-[280px] p-6 pt-2">
                <h3 className="font-semibold text-[13px] text-white/90 mb-4 px-2">Recent</h3>
                <div className="flex flex-col gap-1">
                    {recentApps.map((app, i) => (
                        <button 
                            key={i}
                            className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors w-full text-left"
                            onClick={() => {
                                if (app.id) openWindow(app.id, <div className="p-10 text-white">App Content for {app.name}</div>, app.name, <img src={app.icon} className="w-5 h-5"/>)
                                setSearchOpen(false);
                            }}
                        >
                            <img src={app.icon} alt={app.name} className="w-6 h-6 object-contain" />
                            <div className="flex flex-col">
                                <span className="text-[13px] font-medium text-gray-200">{app.name}</span>
                                <span className="text-[11px] text-gray-500">{app.type}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Column: Dynamic Content */}
            <div className="flex-1 p-6 pt-2 flex flex-col gap-6">
                <div className="flex justify-between items-center text-[13px] text-white/80 font-medium px-2">
                    <span>Today • {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric'})}</span>
                </div>

                {/* Bing Search Image Mockup */}
                <div className="h-40 rounded-xl bg-gradient-to-br from-blue-900 to-[#121212] flex items-end p-4 relative overflow-hidden group hover:ring-1 hover:ring-white/20 transition-all cursor-pointer shadow-lg">
                    <div className="absolute inset-0 bg-cover bg-center brightness-75 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542451542907-6cf80ff362d6?q=80&w=600&auto=format&fit=crop')" }}></div>
                    <div className="relative z-10 w-full">
                        <span className="text-[10px] font-bold tracking-wider text-white/80 uppercase bg-black/40 px-2 py-0.5 rounded backdrop-blur-md mb-2 inline-block">Image of the day</span>
                        <h4 className="font-semibold text-lg text-white leading-tight drop-shadow-md">Beautiful Mountain View</h4>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Top Apps */}
                    <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                        <h3 className="font-semibold text-[13px] text-white/90">Top apps</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {topApps.map((app, i) => (
                                <button key={i} className="flex flex-col items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors group">
                                    <img src={app.icon} alt={app.name} className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="text-[11px] text-white/80 text-center leading-tight w-full truncate">{app.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AI Tools */}
                    <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                        <h3 className="font-semibold text-[13px] text-white/90">AI Tools</h3>
                        <div className="grid grid-cols-2 gap-3">
                             <button className="flex flex-col items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors group">
                                <Wand2 className="w-7 h-7 text-purple-400 group-hover:scale-110 transition-transform duration-200" />
                                <span className="text-[11px] text-white/80 text-center leading-tight">Create with AI</span>
                            </button>
                             <button className="flex flex-col items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors group">
                                <Search className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                                <span className="text-[11px] text-white/80 text-center leading-tight">Search with AI</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Trending Searches */}
                <div className="bg-white/5 rounded-xl border border-white/5 p-4">
                    <h3 className="font-semibold text-[13px] text-white/90 mb-3 flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                        Trending searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {['technology news today', 'weather forecast', 'react development', 'ai advancements'].map(term => (
                            <button key={term} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full px-3 py-1.5 transition-colors text-[12px] text-white/80 overflow-hidden">
                                <Search size={12} className="text-white/40 flex-shrink-0" />
                                <span className="truncate">{term}</span>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    </motion.div>
  );
}
