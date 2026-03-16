import { useState, useEffect } from "react";
import { useWindowManager } from "./WindowManager";
import { FolderOpen, Settings, Chrome, Terminal, Send, Search } from "lucide-react";


export default function Taskbar() {
  const { startMenuOpen, setStartMenuOpen, activeWindowId, windows, openWindow, toggleMinimize, bringToFront } = useWindowManager();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps = [
    { 
        title: "File Explorer", 
        icon: <FolderOpen size={20} className="text-yellow-500" />, 
        appId: "explorer", 
        content: <div className="p-4">File Explorer Content</div> 
    },
    { 
        title: "Browser", 
        icon: <Chrome size={20} className="text-blue-500" />, 
        appId: "browser", 
        content: <div className="p-4">Browser Content</div> 
    },
    { 
        title: "Terminal", 
        icon: <Terminal size={20} className="text-gray-500 dark:text-gray-400" />, 
        appId: "terminal", 
        content: <div className="bg-black text-green-500 font-mono h-full p-2 text-sm">C:\Users\Visitor&gt; npm install windows-11-portfolio<br/><br/>Installing...<br/>Done!</div> 
    },
    { 
        title: "Mail", 
        icon: <Send size={20} className="text-blue-400" />, 
        appId: "mail", 
        content: <div className="p-4">Mail Content</div> 
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#f3f3f3]/85 dark:bg-[#202020]/85 backdrop-blur-xl border-t border-white/40 dark:border-white/10 flex items-center justify-between px-4 z-[100] shadow-sm">
      
      {/* Start Button & Pinned Apps */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 h-full px-2">
         <button
            className={`p-2.5 rounded-md transition-all duration-200 hover:bg-white/60 active:bg-white/40 dark:hover:bg-white/10 ${startMenuOpen ? 'bg-white/60 dark:bg-white/10' : ''}`}
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            title="Start"
        >
            <div className="w-5 h-5 grid grid-cols-2 gap-[2px] p-[1px]">
                <div className="bg-[#00a2ed] rounded-[1px]"></div>
                <div className="bg-[#00a2ed] rounded-[1px]"></div>
                <div className="bg-[#00a2ed] rounded-[1px]"></div>
                <div className="bg-[#00a2ed] rounded-[1px]"></div>
            </div>
        </button>

        <div className="w-[1px] h-6 bg-gray-400/30 mx-1"></div>

        {/* Search */}
        <button className="p-2.5 rounded-md hover:bg-white/60 dark:hover:bg-white/10 transition-all text-gray-600 dark:text-gray-300">
            <Search size={18} />
        </button>

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
                    className={`relative p-2.5 rounded-md transition-all duration-200 hover:bg-white/60 dark:hover:bg-white/10 group ${isActive ? 'bg-white/70 dark:bg-white/10 shadow-sm' : ''} ${isOpen ? 'after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-0.5 after:rounded-full after:bg-gray-500 after:transition-all hover:after:w-4' : ''}`}
                    title={app.title}
                >
                   <div className={`${isActive ? 'scale-110' : 'scale-100'} transition-transform duration-200`}>
                       {app.icon}
                   </div>
                </button>
            )
         })}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-4 px-2 hover:bg-white/40 dark:hover:bg-white/5 rounded-md p-1 transition-colors cursor-default">
         <div className="flex flex-col items-end leading-none text-xs text-gray-800 dark:text-gray-200 font-medium">
            <span>{currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
            <span>{currentTime.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}</span>
         </div>
      </div>
    </div>
  );
}
