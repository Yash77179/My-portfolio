import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, ArrowLeft } from 'lucide-react';

import startupSoundFile from '../../assets/startup-sound.mp3';

export default function BootScreen({ onComplete }) {
  const [phase, setPhase] = useState('booting'); // 'booting' -> 'locked' -> 'login'
  const [time, setTime] = useState(new Date());
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const audioContext = useRef(null);

  useEffect(() => {
    // Attempt to play sound immediately (browser gesture policy allowing)
    const audio = new Audio(startupSoundFile);
    audio.volume = 0.5;
    audio.play().catch(e => console.warn("Audio autoplay blocked by browser:", e));
    audioContext.current = audio;

    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
        clearInterval(timer);
        if (audioContext.current) {
            audioContext.current.pause();
        }
    };
  }, []);

  useEffect(() => {
    if (phase === 'booting') {
        const bootTimer = setTimeout(() => {
            setPhase('locked');
        }, 3000); // 3 seconds hardware boot
        return () => clearTimeout(bootTimer);
    }
  }, [phase]);

  useEffect(() => {
     // Global key listener for spacebar to unlock
     const handleKeyDown = (e) => {
         if (e.code === 'Space' && phase === 'locked') {
             e.preventDefault();
             setPhase('login');
         }
     };
     window.addEventListener('keydown', handleKeyDown);
     return () => window.removeEventListener('keydown', handleKeyDown);
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

  const handleRestart = () => {
      window.location.href = '/'; // Navigates back out of the OS to home portfolio
  };

  return (
    <div 
        className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[10000] text-white overflow-hidden select-none"
        onClick={handleUnlock} // Any click unlocks the lockscreen
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
                {/* Stunning Cinematic Windows 10 Logo */}
                <div className="mb-24 scale-150 transform filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    {/* The windows squares, tilted perfectly */}
                    <div className="grid grid-cols-2 gap-1 w-24 h-24 p-0" style={{ transform: "perspective(400px) rotateY(-18deg)" }}>
                        <div className="bg-white w-11 h-11 transform origin-bottom-right shadow-sm"></div>
                        <div className="bg-white w-11 h-11 transform origin-bottom-left shadow-sm"></div>
                        <div className="bg-white w-11 h-11 transform origin-top-right shadow-sm"></div>
                        <div className="bg-white w-11 h-11 transform origin-top-left shadow-sm"></div>
                    </div>
                </div>

                {/* Loading Dotted Spinner */}
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
                {/* Windows Cinematic Background */}
                <div 
                    className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ${phase === 'login' ? 'blur-xl scale-110 brightness-75' : 'blur-none scale-100 brightness-100'}`}
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542451542907-6cf80ff362d6?q=80&w=2621&auto=format&fit=crop')` }}
                ></div>

                {/* Lock Screen Clock - Only shows when locked */}
                <AnimatePresence>
                    {phase === 'locked' && (
                        <motion.div 
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-[12%] flex flex-col items-center z-10"
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

                {/* Lock Screen Prompt - Bouncing Text at the Bottom */}
                 <AnimatePresence>
                    {phase === 'locked' && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-[15%] z-10"
                        >
                           <p className="text-sm md:text-base font-medium opacity-80 drop-shadow-md animate-pulse tracker-wide">
                               Press Space or Click to continue
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
                            {/* Name and State */}
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
                                        className="px-8 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded border border-white/20 shadow-lg transition-all active:scale-95 font-semibold tracking-wide text-sm"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom Right System Controls (Visible in both Locked and Login) */}
                <div className="absolute bottom-8 right-8 z-20 flex gap-4">
                     {phase === 'login' && (
                         <button 
                            onClick={(e) => { e.stopPropagation(); setPhase('locked'); }}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                            title="Go Back"
                         >
                            <ArrowLeft size={24} className="text-white drop-shadow-md" />
                         </button>
                     )}
                     <button 
                        onClick={(e) => { e.stopPropagation(); handleRestart(); }}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                        title="Restart System"
                     >
                        <Power size={24} className="text-white drop-shadow-md" />
                     </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
