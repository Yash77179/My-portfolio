import { useState } from 'react';
import { WindowManagerProvider, useWindowManager } from './WindowManager';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import { Window } from './Window';
import { AnimatePresence } from 'framer-motion';
import { Folder, FileText, Code, Github, Mail, User, Monitor, Terminal } from 'lucide-react';

// Import existing components that we want to show
import About from '../About';
import Projects from '../Projects';
import Contact from '../Contact';
import Experience from '../Experience';
import Hero from '../Hero'; // Maybe use Hero as Wallpaper or something? Nah.

// A simple wrapper to contain full-page sections
const AppWrapper = ({ children }) => (
    <div className="h-full w-full overflow-y-auto bg-[#050505] text-white relative">
        {children}
    </div>
);

const DesktopContent = () => {
    const { windows, openWindow, closeWindow } = useWindowManager();

    const desktopIcons = [
        { 
            id: 'about', 
            title: 'About Me', 
            icon: <User className="text-blue-400" size={32} />, 
            component: <AppWrapper><About /></AppWrapper> 
        },
        { 
            id: 'projects', 
            title: 'My Projects', 
            icon: <Code className="text-green-500" size={32} />, 
            component: <AppWrapper><Projects /></AppWrapper> 
        },
        { 
            id: 'experience', 
            title: 'Experience', 
            icon: <Monitor className="text-purple-500" size={32} />, 
            component: <AppWrapper><Experience /></AppWrapper>
        },
        { 
            id: 'contact', 
            title: 'Contact', 
            icon: <Mail className="text-yellow-500" size={32} />, 
            component: <AppWrapper><Contact /></AppWrapper> 
        },
        { 
            id: 'github', 
            title: 'GitHub', 
            icon: <Github className="text-white fill-black" size={32} />, 
            component: (
                <div className="h-full w-full bg-[#0d1117] text-white p-4">
                    <h2 className="text-xl font-bold mb-4">My GitHub Profile</h2>
                    <p className="mb-4">Check out my code repositories!</p>
                    <a href="https://github.com/StartYourCode" target="_blank" className="text-blue-400 hover:underline">Visit Profile &rarr;</a>
                </div>
            ) 
        },
        {
            id: 'terminal',
            title: 'Terminal',
            icon: <Terminal className="text-gray-300" size={32} />,
            component: (
                 <div className="h-full w-full bg-black text-green-500 font-mono p-4 text-sm overflow-auto">
                    <p>Microsoft Windows [Version 10.0.22000.1]</p>
                    <p>(c) Microsoft Corporation. All rights reserved.</p>
                    <br/>
                    <p>C:\Users\Visitor&gt; ./welcome.exe</p>
                    <p className="mt-2 text-white">Welcome to my interactive portfolio!</p>
                    <p className="text-white">Feel free to explore the desktop icons.</p>
                    <br/>
                    <p>C:\Users\Visitor&gt; _</p>
                 </div>
            )
        }
    ];

    return (
        <div 
            className="fixed inset-0 h-screen w-screen overflow-hidden select-none bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')` }}
        >
            {/* Overlay for tint if needed */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            {/* Desktop Icons Grid */}
            <div className="absolute top-4 left-4 flex flex-col gap-6 flex-wrap content-start h-[calc(100vh-60px)] z-0">
                {desktopIcons.map((item) => (
                    <button 
                        key={item.id}
                        onDoubleClick={() => openWindow(item.id, item.component, item.title, item.icon)}
                        onTouchEnd={() => openWindow(item.id, item.component, item.title, item.icon)} // Simple touch support
                        className="w-[84px] flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 active:bg-white/20 transition-all group focus:bg-white/20 focus:outline-none ring-0 border border-transparent focus:border-white/20"
                    >
                        <div className="p-2 transition-transform duration-200 group-hover:scale-105 filter drop-shadow-lg">
                            {item.icon}
                        </div>
                        <span className="text-xs text-white font-medium text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-2 leading-tight px-1.5 py-0.5 rounded-sm group-hover:text-shadow-lg">
                            {item.title}
                        </span>
                    </button>
                ))}
            </div>

            {/* Windows Layer */}
            {/* We map windows here. AnimatePresence handles mounting/unmounting animations */}
            <AnimatePresence>
                {windows.map((w) => (
                    !w.minimized && (
                        <Window 
                            key={w.id} 
                            id={w.id} 
                            title={w.title} 
                            icon={w.icon}
                        >
                            {w.component}
                        </Window>
                    )
                ))}
            </AnimatePresence>

            {/* UI Overlays */}
            <StartMenu />
            <Taskbar />
        </div>
    );
};

export default function Desktop() {
    return (
        <WindowManagerProvider>
            <DesktopContent />
        </WindowManagerProvider>
    );
}
