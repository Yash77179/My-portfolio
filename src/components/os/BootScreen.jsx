import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function BootScreen({ onComplete }) {
  const [phase, setPhase] = useState('booting'); // 'booting' -> 'locked' -> 'login'
  const [time, setTime] = useState(new Date());
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (phase === 'booting') {
        const bootTimer = setTimeout(() => {
            setPhase('locked');
        }, 3000); // 3 seconds hardware boot
        return () => clearTimeout(bootTimer);
    }
  }, [phase]);

  const handleUnlock = () => {
      if (phase === 'locked') setPhase('login');
  };

  const handleLogin = () => {
      setIsLoggingIn(true);
      setTimeout(() => {
          onComplete();
      }, 1500); // 1.5s simulated login validation
  };

  return (
    <div 
        className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[10000] text-white overflow-hidden select-none"
        onClick={handleUnlock} // Any click unlocks
    >
      <AnimatePresence mode="wait">
        {/* Phase 1: Motherboard Boot / Windows Loading */}
        {phase === 'booting' && (
            <motion.div 
                key="boot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="flex flex-col items-center justify-center w-full h-full bg-black"
            >
                {/* Authentic Windows 11 Boot Logo */}
                <div className="mb-24 scale-125 transform">
                    <div className="grid grid-cols-2 gap-1 w-20 h-20 p-0">
                        <div className="bg-[#0078d4] w-9 h-9"></div>
                        <div className="bg-[#0078d4] w-9 h-9"></div>
                        <div className="bg-[#0078d4] w-9 h-9"></div>
                        <div className="bg-[#0078d4] w-9 h-9"></div>
                    </div>
                </div>

                {/* PC Boot Spinner */}
                <div className="absolute bottom-24 relative w-10 h-10 mt-12">
                    <div className="w-8 h-8 border-[3px] border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
                </div>
            </motion.div>
        )}

        {/* Phase 2 & 3: Lock Screen / Login Screen */}
        {(phase === 'locked' || phase === 'login') && (
            <motion.div
                key="lockscreen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8 } }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center justify-center relative w-full h-full"
            >
                {/* Windows 11 Bloom Wallpaper */}
                <div 
                    className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ${phase === 'login' ? 'blur-2xl scale-110 brightness-75' : 'blur-none scale-100 brightness-100'}`}
                    style={{ backgroundImage: `url('https://4kwallpapers.com/images/wallpapers/windows-11-dark-mode-blue-stock-official-3840x2160-5630.jpg')` }}
                ></div>

                {/* Lock Screen Clock - Only shows when locked */}
                <AnimatePresence>
                    {phase === 'locked' && (
                        <motion.div 
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-[15%] flex flex-col items-center z-10"
                        >
                            <h1 className="text-7xl md:text-8xl font-medium tracking-tight drop-shadow-lg mb-2">
                                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                            </h1>
                            <p className="text-xl md:text-2xl font-semibold opacity-90 drop-shadow-md">
                                {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Login Prompt - Only shows when user clicks to unlock */}
                <AnimatePresence>
                    {phase === 'login' && (
                        <motion.div 
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="z-10 flex flex-col items-center gap-6"
                        >
                            {/* User Avatar */}
                            <div className="w-40 h-40 rounded-full shadow-2xl overflow-hidden flex items-center justify-center bg-zinc-800/80 border-2 border-white/10 relative">
                                <span className="text-6xl font-semibold text-white">YP</span>
                            </div>
                            
                            <h2 className="text-3xl font-semibold tracking-wide drop-shadow-md">Yash Patil</h2>

                            {isLoggingIn ? (
                                <div className="flex flex-col items-center justify-center gap-4 mt-4">
                                    <div className="w-8 h-8 border-[3px] border-white/20 border-t-white rounded-full animate-spin"></div>
                                    <span className="text-sm text-white/80 font-medium">Welcome</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4 mt-2">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleLogin(); }}
                                        className="px-10 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-md border border-white/20 shadow-lg transition-all active:scale-95 font-medium tracking-wide text-sm"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
