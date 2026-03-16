import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BootScreen({ onComplete }) {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Simulated boot time (3 seconds)
    const timer = setTimeout(() => {
        setLoadingComplete(true);
        onComplete();
    }, 3000); // 3 seconds total boot

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[10000] text-white">
      {/* Windows 11 Logo Style*/}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, type: 'spring' }}
        className="mb-24 scale-150 transform"
      >
        <div className="grid grid-cols-2 gap-1 w-24 h-24 p-0">
            <div className="bg-[#0078d4] w-11 h-11"></div>
            <div className="bg-[#0078d4] w-11 h-11"></div>
            <div className="bg-[#0078d4] w-11 h-11"></div>
            <div className="bg-[#0078d4] w-11 h-11"></div>
        </div>
      </motion.div>

      {/* Modern Circular Spinner */}
      <div className="relative w-12 h-12">
        <div className="w-10 h-10 border-[3px] border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
