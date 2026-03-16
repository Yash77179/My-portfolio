import { useEffect, useRef } from "react";
import { useWindowManager } from "./WindowManager";
import { Search, Power } from "lucide-react";

export default function StartMenu() {
  const { startMenuOpen, setStartMenuOpen } = useWindowManager();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If clicking inside the menu or on the start button (handled in Taskbar usually, but checking here helps)
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // We rely on the Taskbar's button handler to toggle if clicked there.
        // But if we click desktop, we should close.
        // For simplicity, let's just close if it's not the menu itself.
        // Ideally we check if the target is NOT the start button. 
        // But since start button is in another component, we might conflict.
        // Let's rely on Taskbar to handle the toggle and just use a timeout or specific check?
        // Actually, the toggle in Taskbar might re-open it if we close it here on the same click.
        // Let's assume Taskbar toggle handles the click on the button.
      }
    };
    // Better: listen for clicks on window, close if not menu and not .start-button
    const clickHandler = (e) => {
         if (startMenuOpen && menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('button[title="Start"]')) {
             setStartMenuOpen(false);
         }
    }

    document.addEventListener("mousedown", clickHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [startMenuOpen, setStartMenuOpen]);

  if (!startMenuOpen) return null;

  return (
    <div 
        ref={menuRef}
        className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[640px] h-[650px] bg-[#f3f3f3]/80 dark:bg-[#202020]/80 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 dark:border-gray-700 flex flex-col p-6 animate-in slide-in-from-bottom-4 fade-in duration-200 z-[101]"
    >
        {/* Search Bar */}
        <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
                type="text" 
                placeholder="Type here to search" 
                className="w-full pl-10 pr-4 py-2.5 bg-[#fbfbfb] dark:bg-[#2c2c2c] border-b-2 border-blue-500/0 focus:border-blue-500 rounded-t-md focus:outline-none focus:bg-white transition-all text-sm text-gray-800 dark:text-gray-200 font-medium placeholder:text-gray-500"
            />
        </div>

        {/* Pinned Section */}
        <div className="flex-1 overflow-y-auto px-4 -mx-4">
            <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-200">Pinned</h3>
                <button className="text-xs bg-white/50 dark:bg-[#333] px-2 py-1 rounded shadow-sm border border-gray-200/50 dark:border-gray-600">All apps &gt;</button>
            </div>
            <div className="grid grid-cols-6 gap-y-6 gap-x-2">
                {/* Apps Grid */}
                {['Edge', 'Word', 'Excel', 'PowerPoint', 'Mail', 'Calendar', 'Store', 'Photos', 'Settings', 'Calculator', 'Spotify', 'Netflix', 'ToDo', 'News', 'Maps', 'Camera', 'Weather', 'Clock'].map((name, i) => (
                    <button key={i} className="flex flex-col items-center gap-2 p-2 rounded hover:bg-white/50 dark:hover:bg-white/5 transition-colors group">
                        <div className="w-8 h-8 bg-blue-600 rounded-sm shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center text-white text-[10px] font-bold">
                            {name[0]}
                        </div>
                        <span className="text-[11px] font-medium text-center text-gray-700 dark:text-gray-300 line-clamp-1">{name}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Recommended Section */}
        <div className="mt-8 flex-1 px-4 -mx-4">
             <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-200">Recommended</h3>
                <button className="text-xs bg-white/50 dark:bg-[#333] px-2 py-1 rounded shadow-sm border border-gray-200/50 dark:border-gray-600">More &gt;</button>
            </div>
             <div className="grid grid-cols-2 gap-2">
                {/* Recent Files */}
                <button className="flex items-center gap-3 p-2 rounded hover:bg-white/50 dark:hover:bg-white/5 text-left transition-colors">
                    <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center text-orange-600">📄</div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Resume_Final.pdf</span>
                        <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                </button>
                 <button className="flex items-center gap-3 p-2 rounded hover:bg-white/50 dark:hover:bg-white/5 text-left transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600">⚛️</div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Portfolio Project</span>
                        <span className="text-xs text-gray-500">Yesterday at 4:20 PM</span>
                    </div>
                </button>
            </div>
        </div>

        {/* User bar */}
        <div className="mt-auto pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center px-4 -mx-6 bg-[#eaeaea]/30 dark:bg-[#1a1a1a]/30 -mb-6 pb-6 rounded-b-xl">
            <div className="flex items-center gap-3 hover:bg-white/50 dark:hover:bg-white/5 p-2 rounded-md transition-colors cursor-pointer ml-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 overflow-hidden">
                    {/* Placeholder Avatar */}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Simulate User</span>
            </div>
            <button className="p-2 hover:bg-white/50 dark:hover:bg-white/5 rounded-md transition-colors mr-4 text-gray-700 dark:text-gray-300" title="Power">
                <Power size={18} />
            </button>
        </div>
    </div>
  );
}
