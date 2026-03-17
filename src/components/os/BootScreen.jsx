import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootScreen({ onComplete }) {
  const [phase, setPhase] = useState('booting'); // 'booting' -> 'welcome'

  useEffect(() => {
    // Simulated boot time (3 seconds)
    const bootTimer = setTimeout(() => {
        setPhase('welcome');
    }, 2800);

    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    if (phase === 'welcome') {
        const welcomeTimer = setTimeout(() => {
            onComplete();
        }, 3200); // Wait 3s on welcome screen
        return () => clearTimeout(welcomeTimer);
    }
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[10000] text-white overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {phase === 'booting' && (
            <motion.div 
                key="boot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8 } }}
                className="flex flex-col items-center justify-center"
            >
                {/* Windows 11 Logo Style*/}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-24 scale-150 transform drop-shadow-[0_0_15px_rgba(0,120,212,0.4)]"
                >
                    <div className="grid grid-cols-2 gap-1 w-24 h-24 p-0">
                        <div className="bg-[#0078d4] w-11 h-11 rounded-sm"></div>
                        <div className="bg-[#0078d4] w-11 h-11 rounded-sm"></div>
                        <div className="bg-[#0078d4] w-11 h-11 rounded-sm"></div>
                        <div className="bg-[#0078d4] w-11 h-11 rounded-sm"></div>
                    </div>
                </motion.div>

                {/* Modern Circular Spinner */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="relative w-12 h-12 mt-12"
                >
                    <div className="w-10 h-10 border-[3px] border-white/10 border-t-[#0078d4] rounded-full animate-spin mx-auto drop-shadow-md"></div>
                </motion.div>
            </motion.div>
        )}

        {phase === 'welcome' && (
            <motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)", transition: { duration: 1.5, ease: "easeIn" } }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="flex flex-col items-center justify-center relative w-full h-full"
            >
                {/* Beautiful dynamic animated background gradient for the welcome screen */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0c2540] via-black to-[#09182a] animate-pulse object-cover mix-blend-screen opacity-60"></div>

                <div className="relative z-10 flex flex-col items-center justify-center gap-8 translate-y-[-5%]">
                    {/* User Profile Avatar */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="w-36 h-36 md:w-44 md:h-44 rounded-full border border-white/10 shadow-[0_0_60px_rgba(0,120,212,0.25)] overflow-hidden flex items-center justify-center bg-gradient-to-tr from-cyan-600/80 to-purple-700/80 backdrop-blur-xl relative"
                    >
                        <div className="absolute inset-0 bg-white/5 rounded-full" />
                        <span className="text-5xl md:text-6xl font-bold text-white tracking-widest drop-shadow-md">YP</span>
                    </motion.div>
                    
                    {/* Name and Loading State */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-center flex flex-col items-center"
                    >
                        <h1 className="text-3xl md:text-4xl font-semibold mb-8 tracking-wide drop-shadow-lg">Yash Patil</h1>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="w-8 h-8 border-[3px] border-white/20 border-t-white rounded-full animate-spin"></div>
                            <span className="text-lg md:text-xl text-white/80 font-light tracking-wide mt-2">Welcome</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
