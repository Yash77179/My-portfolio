import React, { useEffect, useState } from "react";
import { m } from "framer-motion";
import loadingVideo from "../assets/loading.webm";

const LoadingScreen = ({ onComplete }) => {
    const [hideCanvas, setHideCanvas] = useState(false);
    const [triggered, setTriggered] = useState(false);

    const handleTimeUpdate = (e) => {
        const video = e.target;
        // If we have less than 1.0 second remaining in the video and haven't triggered yet
        if (!triggered && video.duration > 0 && (video.duration - video.currentTime <= 1.0)) {
            setTriggered(true);
            setHideCanvas(true);
            onComplete();
        }
    };

    // Hardware safety fallback: In case a native browser blocks autoPlay (e.g. iOS Low Power Mode)
    useEffect(() => {
        if (triggered) return;
        const failSafeTimer = setTimeout(() => {
            setHideCanvas(true);
            onComplete();
        }, 8000); 

        return () => clearTimeout(failSafeTimer);
    }, [triggered, onComplete]);

    return (
        <m.div
            key="loader-container"
            className="fixed inset-0 z-[9999] pointer-events-none flex flex-col"
            exit={{ opacity: 1 }} // Prevent wrapper from fading, let children animate
        >
            {/* Minimal line separating the halves - Fades out just before opening */}
            <m.div 
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.05] z-50"
            />

            {/* Matte Panel Top */}
            <m.div 
                className="relative w-full h-1/2 bg-[#080808] z-40 flex items-end justify-between px-8 pb-6"
                exit={{ y: "-100%", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } }}
            >
                <div className="text-[10px] tracking-[0.4em] font-mono text-white/20">
                    S-01
                </div>
                 <div className="text-[10px] tracking-[0.4em] font-mono text-white/20">
                    AWAKEN
                </div>
            </m.div>
            
            {/* Matte Panel Bottom */}
            <m.div 
                className="relative w-full h-1/2 bg-[#080808] z-40 flex items-start justify-between px-8 pt-6"
                exit={{ y: "100%", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } }}
            >
                <div className="text-[10px] tracking-[0.4em] font-mono text-white/10">
                    SYS.READY
                </div>
            </m.div>

            {/* Stars Video Overlay */}
            <m.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: hideCanvas ? 0 : 1 }}
                transition={{ duration: hideCanvas ? 0.4 : 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-[60] flex items-center justify-center"
            >
                <video 
                    className="w-full h-full object-cover"
                    src={loadingVideo} 
                    autoPlay 
                    muted 
                    playsInline 
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => {
                        if (!triggered) {
                            setTriggered(true);
                            setHideCanvas(true);
                            onComplete();
                        }
                    }}
                />
            </m.div>

        </m.div>
    );
};

export default LoadingScreen;
