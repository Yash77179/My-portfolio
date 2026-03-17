import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, ArrowLeft, Wifi, Accessibility, Moon, Lock } from 'lucide-react';

import startupSoundFile from '../../assets/startup-sound.mp3';
import nightSkyImg from '../../assets/nightsky.jpg';
import logGif from '../../assets/myLog.gif';

export default function BootScreen({ initialPhase = 'booting', onComplete, onShutdown, onRestart }) {
  const [phase, setPhase] = useState(initialPhase); // 'booting' -> 'locked' -> 'login' -> 'sleep'
  const [time, setTime] = useState(new Date());
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [powerMenuOpen, setPowerMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const hasPlayedSound = useRef(false);

  useEffect(() => {
    if (initialPhase === 'locked') {
        hasPlayedSound.current = true;
    }
  }, [initialPhase]);

  useEffect(() => {
    // Attempt to silently "prime" the audio element on mount 
    // to unlock it for later playback without explicit user gesture
    if (audioRef.current) {
        audioRef.current.volume = 0;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Sucessfully started silent playback, pause it and reset for real playback later
                if(audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    audioRef.current.volume = 0.5;
                }
            }).catch(e => {
                // Normal browser autoplay block, wait for the lock screen gesture
                console.warn("Silent audio prime blocked:", e);
                if (audioRef.current) audioRef.current.volume = 0.5;
            });
        }
    }

    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
        clearInterval(timer);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };
  }, []);

  useEffect(() => {
    if (phase === 'booting') {
        const bootTimer = setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.volume = 0.5;
                audioRef.current.currentTime = 0;
                audioRef.current.play()
                    .then(() => { hasPlayedSound.current = true; })
                    .catch(e => console.warn("Audio autoplay blocked by browser:", e));
            }
            setPhase('locked');
        }, 5000); // 5 seconds hardware boot - shorter helps bypass 6s gesture timeout
        return () => clearTimeout(bootTimer);
    }
  }, [phase]);

  const tryPlayFallbackSound = () => {
      // If the sound was blocked by the browser during boot, play it on first interaction
      if (audioRef.current && audioRef.current.paused && !hasPlayedSound.current) {
          audioRef.current.volume = 0.5;
          audioRef.current.play()
              .then(() => { hasPlayedSound.current = true; })
              .catch(e => console.warn(e));
      }
  };

  useEffect(() => {
     // Global key listener for spacebar to unlock or wake from sleep
     const handleKeyDown = (e) => {
         // Try to unlock audio context on any key press
         if (audioRef.current && audioRef.current.paused && phase === 'booting') {
            audioRef.current.volume = 0;
            audioRef.current.play().then(() => audioRef.current.pause()).catch(err=>console.log(err));
         }

         if (phase === 'sleep') {
             e.preventDefault();
             setPhase('locked');
             return;
         }
         if (e.code === 'Space' && phase === 'locked') {
             e.preventDefault();
             tryPlayFallbackSound();
             setPhase('login');
         }
     };
     window.addEventListener('keydown', handleKeyDown);
     return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase]);

  // Click anywhere handler
  const handleScreenClick = () => {
      // Try to unlock audio context on any click
      if (audioRef.current && audioRef.current.paused && phase === 'booting') {
          audioRef.current.volume = 0;
          audioRef.current.play().then(() => audioRef.current.pause()).catch(err=>console.log(err));
      }

      if (powerMenuOpen) {
          setPowerMenuOpen(false);
          return;
      }
      if (phase === 'sleep') {
          setPhase('locked');
          return;
      }
      if (phase === 'locked') {
          tryPlayFallbackSound();
          setPhase('login');
      }
  };

  const handleLogin = () => {
      setIsLoggingIn(true);
      setTimeout(() => {
          onComplete();
      }, 1500); // 1.5s simulated login validation
  };

  const handleAction = (e, action) => {
      e.stopPropagation();
      setPowerMenuOpen(false);
      
      switch (action) {
          case 'lock':
              setPhase('locked');
              break;
          case 'sleep':
              setPhase('sleep');
              break;
          case 'shutdown':
              if (onShutdown) onShutdown();
              break;
          case 'restart':
              if (onRestart) onRestart();
              break;
          default:
              break;
      }
  };

  if (phase === 'sleep') {
      return (
          <div 
            className="fixed inset-0 bg-black z-[10000] cursor-default" 
            onClick={handleScreenClick}
          />
      );
  }

  return (
    <div 
        className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[10000] text-white overflow-hidden select-none"
        onClick={handleScreenClick}
    >
      <audio ref={audioRef} src={startupSoundFile} preload="auto" />

      {/* Boot Phase Background: Night Sky - Lower Opacity */}
      <div 
          className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 pointer-events-none ${phase === 'booting' ? 'opacity-[0.25]' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${nightSkyImg})` }}
      ></div>

      {/* Matte Dark Vignette Overlay for Booting */}
      <div className={`absolute inset-0 z-0 bg-black/40 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] transition-opacity duration-1000 ${phase === 'booting' ? 'opacity-100' : 'opacity-0'}`} />

      <AnimatePresence mode="wait">
        {/* Phase 1: Motherboard Boot / Windows Loading */}
        {phase === 'booting' && (
            <motion.div 
                key="boot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="flex flex-col items-center justify-center w-full h-full relative z-10"
            >
                {/* Classic Pure Matte Blue Windows Logo */}
                <div className="mb-32">
                    <div className="grid grid-cols-2 gap-[4px] w-36 h-36 p-0 drop-shadow-lg">
                        <div className="bg-[#0078D4] rounded-[2px] w-full h-full"></div>
                        <div className="bg-[#0078D4] rounded-[2px] w-full h-full"></div>
                        <div className="bg-[#0078D4] rounded-[2px] w-full h-full"></div>
                        <div className="bg-[#0078D4] rounded-[2px] w-full h-full"></div>
                    </div>
                </div>

                {/* Elegant Minimal Loader */}
                <div className="absolute bottom-32 w-16 h-16 mt-12">
                    {/* Modern Dotted Spinner without trails */}
                    <div className="w-10 h-10 border-[4px] border-white/20 border-t-white rounded-full animate-spin mx-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
                </div>
            </motion.div>
        )}

        {/* Phase 2 & 3: Lock Screen / Login Screen */}
        {(phase === 'locked' || phase === 'login') && (
            <motion.div
                key="lockscreen"
                initial={{ y: "100%", opacity: 0.5 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8 } }}
                transition={{ type: "spring", damping: 20, stiffness: 80, mass: 1 }}
                className="flex flex-col items-center justify-center absolute inset-0 w-full h-full z-10"
            >
                {/* Lock/Login Phase Background: Cinematic Mountains */}
                <div 
                    className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 pointer-events-none ${phase === 'login' ? 'blur-xl scale-110 brightness-75' : 'blur-none scale-100 brightness-100'}`}
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542451542907-6cf80ff362d6?q=80&w=2621&auto=format&fit=crop')` }}
                ></div>
                {/* Matte Dark Vignette Overlay for Lockscreen */}
                <div className="absolute inset-0 z-0 bg-black/40 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
                {/* Lock Screen Clock - Only shows when locked */}
                <AnimatePresence>
                    {phase === 'locked' && (
                        <motion.div 
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -150, opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                            className="absolute top-[12%] flex flex-col items-center z-10"
                        >
                            <h1 className="text-8xl md:text-9xl font-semibold tracking-tight shadow-black drop-shadow-2xl mb-4">
                                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                            </h1>
                            <p className="text-2xl md:text-3xl font-medium opacity-100 shadow-black drop-shadow-xl">
                                {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Lock Screen Prompt - Bouncing Text at the Bottom */}
                 <AnimatePresence>
                    {phase === 'locked' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                            className="absolute bottom-[20%] z-10"
                        >
                           <p className="text-base md:text-lg font-medium opacity-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-pulse tracking-wide hover:opacity-80 transition-opacity">
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
                            <div className="w-48 h-48 md:w-60 md:h-60 rounded-full shadow-2xl overflow-hidden flex items-center justify-center bg-zinc-800/80 border border-white/10 relative">
                                <img src={logGif} alt="Yash Patil" className="w-full h-full object-cover" />
                            </div>
                            
                            {/* Name and State */}
                            <h2 className="text-4xl md:text-5xl font-semibold tracking-wide drop-shadow-xl mt-4">Yash Patil</h2>

                            {isLoggingIn ? (
                                <div className="flex flex-col items-center justify-center gap-6 mt-6">
                                    <div className="w-12 h-12 border-[4px] border-white/20 border-t-[#0078D4] rounded-full animate-spin"></div>
                                    <span className="text-xl text-white/90 font-medium tracking-wide">Welcome</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-6 mt-6">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleLogin(); }}
                                        className="px-14 py-3 bg-white/10 hover:bg-white/20 border border-white/20 focus:ring-2 focus:ring-white/30 rounded-md transition-all active:scale-95 text-lg font-medium tracking-wide text-white drop-shadow-sm backdrop-blur-md"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Back Arrow for Login screen */}
                <AnimatePresence>
                    {phase === 'login' && (
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onClick={(e) => { e.stopPropagation(); setPhase('locked'); }}
                            className="absolute top-12 left-8 md:top-[50%] md:left-12 p-4 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full shadow-xl transition-colors cursor-pointer z-20"
                            title="Go Back"
                        >
                           <ArrowLeft size={24} className="text-white drop-shadow-md" />
                        </motion.button>
                     )}
                </AnimatePresence>

                {/* Exact Windows 11 Bottom Right Info & Power Controls */}
                <div className="absolute bottom-6 right-6 z-20 flex items-center gap-5 drop-shadow-md pr-2">
                     <span className="text-sm font-semibold opacity-90 cursor-default tracking-wide mr-1">ENG</span>
                     
                     <button className="hover:text-cyan-400 transition-colors cursor-pointer" title="Network">
                        <Wifi size={18} strokeWidth={2.5} />
                     </button>
                     
                     <button className="hover:text-cyan-400 transition-colors cursor-pointer" title="Accessibility">
                        <Accessibility size={20} strokeWidth={2.5} />
                     </button>
                     
                     <div className="relative">
                         <button 
                            onClick={(e) => { e.stopPropagation(); setPowerMenuOpen(!powerMenuOpen); }}
                            className={`transition-colors cursor-pointer p-1.5 rounded-full ${powerMenuOpen ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white'}`}
                            title="Power"
                         >
                            <Power size={22} strokeWidth={2.5} />
                         </button>

                         {/* Power Context Menu */}
                         <AnimatePresence>
                             {powerMenuOpen && (
                                 <motion.div 
                                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                     animate={{ opacity: 1, y: 0, scale: 1 }}
                                     exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
                                     className="absolute bottom-full right-0 mb-3 w-48 bg-[#1e1e1e]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50 origin-bottom-right"
                                 >
                                     <button 
                                         onClick={(e) => handleAction(e, 'lock')}
                                         className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 text-sm font-medium"
                                     >
                                         <Lock size={16} className="text-white/80" /> Lock
                                     </button>
                                     <button 
                                         onClick={(e) => handleAction(e, 'sleep')}
                                         className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 text-sm font-medium"
                                     >
                                         <Moon size={16} className="text-white/80" /> Sleep
                                     </button>
                                     <button 
                                         onClick={(e) => handleAction(e, 'shutdown')}
                                         className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 text-sm font-medium"
                                     >
                                         <Power size={16} className="text-white/80" /> Shut down
                                     </button>
                                     <button 
                                         onClick={(e) => handleAction(e, 'restart')}
                                         className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 text-sm font-medium"
                                     >
                                         <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                                            <polyline points="1 4 1 10 7 10"></polyline>
                                            <polyline points="23 20 23 14 17 14"></polyline>
                                            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                                         </svg> Restart
                                     </button>
                                 </motion.div>
                             )}
                         </AnimatePresence>
                     </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
