import { useState, useEffect } from "react";
import { useWindowManager } from "./WindowManager";
import { FolderOpen, Settings, Chrome, Terminal, Send, Search, CloudSun, Wifi, Volume2, BatteryMedium, ChevronUp, Mic } from "lucide-react";

// Icons
import startIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/tools/start.ico';
import searchIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/tools/search.ico';
import explorerIcon from '../../assets/windows11iconsV1/windows11iconsV1/folders/explorer.ico';
import edgeIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/tools/edge.ico';
import terminalIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/terminal.ico';
import mailIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/mail.ico';
import storeIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/store.ico';

import FileExplorer from './apps/FileExplorer';

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
        icon: <img src={explorerIcon} alt="Explorer" className="w-[26px] h-[26px]" />, 
        appId: "explorer", 
        content: <FileExplorer /> 
    },
    { 
        title: "Edge", 
        icon: <img src={edgeIcon} alt="Edge" className="w-[26px] h-[26px]" />, 
        appId: "browser", 
        content: <div className="p-4">Browser Content</div> 
    },
    {
        title: "Microsoft Store",
        icon: <img src={storeIcon} alt="Store" className="w-[26px] h-[26px]" />,
        appId: "store",
        content: <div className="p-4">Store Content</div>
    },
    { 
        title: "Terminal", 
        icon: <img src={terminalIcon} alt="Terminal" className="w-[26px] h-[26px]" />,
        appId: "terminal", 
        content: <div className="bg-black text-green-500 font-mono h-full p-2 text-sm">C:\Users\Visitor&gt; npm install windows-11-portfolio<br/><br/>Installing...<br/>Done!</div> 
    },
    { 
        title: "Mail", 
        icon: <img src={mailIcon} alt="Mail" className="w-[26px] h-[26px]" />,
        appId: "mail", 
        content: <div className="p-4">Mail Content</div> 
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#202020]/95 backdrop-blur-2xl border-t border-white/5 flex items-center justify-between px-3 z-[100] select-none text-white">
      
      {/* 1. Left: Widgets (Weather) */}
      <div className="flex-1 flex justify-start items-center">
          <button className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded-md transition-colors group">
              <CloudSun size={20} className="text-yellow-100 group-hover:text-yellow-200" />
              <div className="flex flex-col items-start leading-none">
                  <span className="text-xs font-medium text-gray-200">26°C</span>
                  <span className="text-[10px] text-gray-400 group-hover:text-gray-300">Mostly cloudy</span>
              </div>
          </button>
      </div>

      {/* 2. Center: Pinned Apps & Start */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 h-full px-2" style={{ width: 'max-content' }}>
        {/* Start Button */}
         <button
            className={`p-2 rounded-md transition-all duration-200 hover:bg-white/10 active:bg-white/5 ${startMenuOpen ? 'bg-white/10' : ''}`}
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            title="Start"
        >
            <img src={startIcon} alt="Start" className="w-7 h-7 drop-shadow transition-transform active:scale-90" />
        </button>

        {/* Search Bar - Expanded */}
        <div className="relative group mx-1">
             <div className="flex items-center bg-[#353535] group-hover:bg-[#3f3f3f] transition-colors rounded-full px-3 py-1.5 w-48 border-t border-white/5 shadow-inner cursor-text">
                <Search size={14} className="text-gray-400 mr-2" />
                <span className="text-[13px] text-gray-400 font-normal">Search</span>
                
                {/* Visual Flair in Search Bar (Right Side) */}
                <div className="ml-auto flex items-center">
                     <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 opacity-80" title="Bing Chat"></div>
                </div>
             </div>
        </div>
        
        {/* Task View (Optional Placeholder) */}
         <button className="p-2 rounded-md hover:bg-white/10 transition-all group" title="Task View">
            {/* Simple geometric representation of Task View */}
            <div className="w-5 h-5 grid grid-cols-2 gap-[2px]">
                <div className="bg-gray-400 group-hover:bg-white rounded-[1px] opacity-60"></div>
                <div className="bg-gray-400 group-hover:bg-white rounded-[1px] opacity-90"></div>
                <div className="bg-gray-400 group-hover:bg-white rounded-[1px] opacity-90"></div>
                <div className="bg-gray-400 group-hover:bg-white rounded-[1px] opacity-60"></div>
            </div>
         </button>


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
                    className={`relative p-2 rounded-md transition-all duration-200 hover:bg-white/10 group ${isActive ? 'bg-white/5' : ''} ${isOpen ? 'after:content-[""] after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-0.5 after:rounded-full after:bg-gray-400 after:transition-all hover:after:w-3' : ''}`}
                    title={app.title}
                >
                   <div className={`${isActive ? 'scale-100' : 'scale-100'} transition-transform duration-200 active:scale-90 opacity-90 group-hover:opacity-100`}>
                       {app.icon}
                   </div>
                </button>
            )
         })}
      </div>

      {/* 3. Right: System Tray */}
      <div className="flex-1 flex justify-end items-center gap-1">
          {/* Tray Overflow */}
          <button className="p-1 hover:bg-white/10 rounded-sm hover:bg-opacity-10">
              <ChevronUp size={16} className="text-gray-300" />
          </button>

          <span className="text-xs text-gray-300 px-1 hover:bg-white/10 rounded-sm cursor-pointer p-1">ENG IN</span>

          {/* Quick Settings Group */}
          <button className="flex items-center gap-3 px-2 py-1 hover:bg-white/10 rounded-md transition-colors" title="Internet, Sound, Battery">
              <Wifi size={16} className="text-gray-200" />
              <Volume2 size={16} className="text-gray-200" />
              <BatteryMedium size={16} className="text-gray-200" />
          </button>

          {/* Clock */}
          <button 
            className="flex flex-col items-end leading-none px-2 py-0.5 hover:bg-white/10 rounded-md transition-colors text-right ml-1"
            title={currentTime.toLocaleDateString()}
          >
              <span className="text-xs font-medium text-gray-100 mb-[1px]">
                {currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase()}
              </span>
              <span className="text-[10px] text-gray-300">
                {currentTime.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}
              </span>
          </button>
          
          {/* Notification/Bell */}
          <button className="h-full w-2 flex justify-end items-end ml-1 group" title="Notifications">
             {/* Invisible area normally */}
          </button>
          
          <div className="w-1 h-full border-l border-white/10 ml-1"></div> {/* Show desktop sliver */}
      </div>
    </div>
  );
}
