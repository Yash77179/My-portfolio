import React, { useEffect, useRef } from 'react';

const BackgroundEffects = ({ cursorRef, followerRef }) => {
    // Mobile frame lines
    return (
        <>
            <div className="bg-black text-white overflow-x-hidden relative">
                {/* Subtle mesh gradient background */}
                <div
                    aria-hidden="true"
                    className="fixed inset-0 -z-10 pointer-events-none"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(59,130,246,0.15), transparent 55%),
              radial-gradient(circle at 80% 15%, rgba(236,72,153,0.15), transparent 60%),
              radial-gradient(circle at 70% 70%, rgba(16,185,129,0.12), transparent 55%),
              radial-gradient(circle at 30% 80%, rgba(168,85,247,0.14), transparent 60%)`,
                    }}
                ></div>
                <div
                    aria-hidden="true"
                    className="fixed inset-0 -z-10 opacity-20 pointer-events-none grain-layer hidden md:block"
                    style={{
                        backgroundImage:
                            'radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.1), transparent 35%), radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.12), transparent 40%), radial-gradient(1px 1px at 90% 30%, rgba(255,255,255,0.12), transparent 35%)',
                        backgroundSize: '80px 80px',
                        animation: 'grain 12s steps(10) infinite',
                    }}
                ></div>

                {/* Margins / framing accents */}
                <div className="fixed inset-0 pointer-events-none z-150">
                    {/* Mobile border lines (show on screens smaller than laptop) */}
                    <div className="mobile-frame-line absolute top-6 bottom-6 left-2 lg:hidden"></div>
                    <div className="mobile-frame-line absolute top-6 bottom-6 right-2 lg:hidden"></div>

                    {/* Top line */}
                    <div className="absolute left-0 right-0 top-0 h-0.5 bg-white/30"></div>

                    {/* Bottom line */}
                    <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-white/30"></div>
                </div>
            </div>
        </>
    );
};

export default BackgroundEffects;
