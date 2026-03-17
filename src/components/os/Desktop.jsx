import { useState, useEffect } from 'react';
import { WindowManagerProvider, useWindowManager } from './WindowManager';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import SearchMenu from './SearchMenu';
import CalendarFlyout from './CalendarFlyout';
import { Window } from './Window';
import BootScreen from './BootScreen';
import { AnimatePresence, motion } from 'framer-motion';
import { Github } from 'lucide-react';

// Icons
import userIcon from '../../assets/windows11iconsV1/windows11iconsV1/folders/user.ico';
import codeIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/office/code.ico';
import desktopIcon from '../../assets/windows11iconsV1/windows11iconsV1/folders/desktop.ico';
import mailIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/mail.ico';
import terminalIcon from '../../assets/windows11iconsV1/windows11iconsV1/applications/novelty/terminal.ico';
import bgVideo from '../../assets/Effect.mp4';

// Import distinct content components to avoid circular dependencies
import AboutContent from '../AboutContent';
import Projects from '../Projects';
import Contact from '../Contact';
import Experience from '../Experience';

// A simple wrapper to contain full-page sections
const AppWrapper = ({ children }) => (
    <div className="h-full w-full overflow-y-auto bg-[#050505] text-white relative">
        {children}
    </div>
);

const DesktopContent = ({ onShutdown }) => {
    const { windows, openWindow, startMenuOpen, searchOpen, calendarOpen, restoredWindowIds } = useWindowManager();

    const desktopIcons = [
        { 
            id: 'about', 
            title: 'About Me', 
            icon: <img src={userIcon} alt="About" className="w-12 h-12" />, 
            component: <AppWrapper><div className="p-10"><AboutContent /></div></AppWrapper> 
        },
        { 
            id: 'projects', 
            title: 'My Projects', 
            icon: <img src={codeIcon} alt="Projects" className="w-12 h-12" />, 
            component: <AppWrapper><Projects /></AppWrapper> 
        },
        { 
            id: 'experience', 
            title: 'Experience', 
            icon: <img src={desktopIcon} alt="Experience" className="w-12 h-12" />, 
            component: <AppWrapper><Experience /></AppWrapper>
        },
        { 
            id: 'contact', 
            title: 'Contact', 
            icon: <img src={mailIcon} alt="Contact" className="w-12 h-12" />, 
            component: <AppWrapper><Contact /></AppWrapper> 
        },
        { 
            id: 'github', 
            title: 'GitHub', 
            icon: <Github className="text-white fill-black w-10 h-10 p-1 bg-black/50 rounded-lg" />, 
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
            icon: <img src={terminalIcon} alt="Terminal" className="w-12 h-12" />, 
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
        },
    ];

    useEffect(() => {
        // Auto restore desktop apps layout on load
        desktopIcons.forEach(item => {
            if (restoredWindowIds && restoredWindowIds.includes(item.id)) {
                openWindow(item.id, item.component, item.title, item.icon);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restoredWindowIds]);

    return (
        <div className="fixed inset-0 h-screen w-screen overflow-hidden select-none animate-in fade-in zoom-in-95 duration-1000">
            {/* Animated Video Background */}
            <video 
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                autoPlay 
                loop 
                muted 
                playsInline
            >
                <source src={bgVideo} type="video/mp4" />
                {/* Fallback to static image if video fails in some browsers */}
                <img src="https://4kwallpapers.com/images/wallpapers/windows-11-dark-mode-blue-stock-official-3840x2160-5630.jpg" alt="Windows 11 Background" className="w-full h-full object-cover" />
            </video>

            {/* Overlay for tint if needed */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />

            {/* Desktop Content Layer wrapper */}
            <div className="absolute inset-0 z-20">

            {/* Desktop Icons Grid */}
            <div className="absolute top-4 left-4 flex flex-col gap-6 flex-wrap content-start h-[calc(100vh-60px)] z-0">
                {desktopIcons.map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => openWindow(item.id, item.component, item.title, item.icon)}
                        onTouchEnd={() => openWindow(item.id, item.component, item.title, item.icon)} 
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
                    <Window 
                        key={w.id} 
                        id={w.id} 
                        title={w.title} 
                            icon={w.icon}
                        >
                            {w.component}
                        </Window>
                ))}
            </AnimatePresence>

            {/* UI Overlays */}
            <AnimatePresence>
                {startMenuOpen && <StartMenu />}
                {searchOpen && <SearchMenu />}
                {calendarOpen && <CalendarFlyout />}
            </AnimatePresence>
            <Taskbar />
            </div>
        </div>
    );
};

export default function Desktop({ onShutdown }) {
    const [osState, setOsState] = useState(() => {
        const state = sessionStorage.getItem('os_boot_state');
        // If we hard reload while on desktop, keep desktop.
        if (state === 'desktop') return 'desktop';
        
        // If we reload while locked or booting, it implies a fresh hardware boot (clear open apps)
        sessionStorage.removeItem('open_window_ids');
        sessionStorage.setItem('os_boot_state', 'booting');
        return 'booting';
    });
    const [bootKey, setBootKey] = useState(0);

    const handleRestart = () => {
        sessionStorage.removeItem('os_boot_state');
        sessionStorage.removeItem('open_window_ids');
        setOsState('booting');
        setBootKey(prev => prev + 1);
    };

    const handleShutdown = () => {
        sessionStorage.removeItem('os_boot_state');
        sessionStorage.removeItem('open_window_ids');
        if (onShutdown) onShutdown();
    };

    const handleLock = () => {
        sessionStorage.setItem('os_boot_state', 'locked');
        setOsState('locked');
    };

    const handleBootComplete = () => {
        sessionStorage.setItem('os_boot_state', 'desktop');
        setOsState('desktop');
    };

    return (
        <WindowManagerProvider key={`wm-${bootKey}`} onShutdown={handleShutdown} onRestart={handleRestart} onLock={handleLock}>
            <AnimatePresence>
                {osState !== 'desktop' && (
                    <motion.div
                        key={`boot-${bootKey}`}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        className="fixed inset-0 z-[10000]"
                    >
                        <BootScreen 
                            initialPhase={osState === 'locked' ? 'locked' : 'booting'}
                            onComplete={handleBootComplete} 
                            onShutdown={handleShutdown} 
                            onRestart={handleRestart} 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            
            {osState !== 'booting' && (
                <motion.div
                    key="desktop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-full w-full"
                >
                    <DesktopContent onShutdown={handleShutdown} />
                </motion.div>
            )}
        </WindowManagerProvider>
    );
}
