import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SpiralAnimation } from "./ui/spiral-animation";

const LoadingScreen = ({ onComplete }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [hideCanvas, setHideCanvas] = useState(false);

    useEffect(() => {
        // Start the scatter effect after 3.5 seconds
        const exitTimer = setTimeout(() => {
            setIsExiting(true);
        }, 3500); 

        // Crossfade to the bare matte panels right as scatter ends
        const hideTimer = setTimeout(() => {
            setHideCanvas(true);
        }, 4700);

        // Finally, trigger the panels to elegantly split open
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 5000); 

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(hideTimer);
            clearTimeout(completeTimer);
        }
    }, [onComplete]);

    return (
        <motion.div
            key="loader-container"
            className="fixed inset-0 z-[9999] pointer-events-none flex flex-col"
            exit={{ opacity: 1 }} // Prevent wrapper from fading, let children animate
        >
            {/* Minimal line separating the halves - Fades out just before opening */}
            <motion.div 
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.05] z-50"
            />

            {/* Matte Panel Top */}
            <motion.div 
                className="relative w-full h-1/2 bg-[#080808] z-40 flex items-end justify-between px-8 pb-6"
                exit={{ y: "-100%", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } }}
            >
                <div className="text-[10px] tracking-[0.4em] font-mono text-white/20">
                    S-01
                </div>
                 <div className="text-[10px] tracking-[0.4em] font-mono text-white/20">
                    AWAKEN
                </div>
            </motion.div>
            
            {/* Matte Panel Bottom */}
            <motion.div 
                className="relative w-full h-1/2 bg-[#080808] z-40 flex items-start justify-between px-8 pt-6"
                exit={{ y: "100%", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } }}
            >
                <div className="text-[10px] tracking-[0.4em] font-mono text-white/10">
                    SYS.READY
                </div>
            </motion.div>

            {/* Stars Canvas Overlay */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: hideCanvas ? 0 : 1 }}
                transition={{ duration: hideCanvas ? 0.4 : 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-[60]"
            >
                <SpiralAnimation isExiting={isExiting} />
            </motion.div>

        </motion.div>
    );
};

export default LoadingScreen;
