import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from './WindowManager';
import { ChevronDown, ChevronUp, BellOff } from 'lucide-react';

export default function CalendarFlyout() {
    const { calendarOpen, setCalendarOpen } = useWindowManager();
    const flyoutRef = useRef(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const clickHandler = (e) => {
             // Close if clicking outside calendar OR taskbar time button
             if (calendarOpen && flyoutRef.current && !flyoutRef.current.contains(e.target) && !e.target.closest('button[title="CalendarToggle"]')) {
                 setCalendarOpen(false);
             }
        }
        document.addEventListener("mousedown", clickHandler);
        return () => document.removeEventListener("mousedown", clickHandler);
    }, [calendarOpen, setCalendarOpen]);

    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    // Simple mock calendar logic for current month
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const today = new Date().getDate();

    const days = [];
    for(let i=0; i<firstDayIndex; i++) days.push(null);
    for(let i=1; i<=daysInMonth; i++) days.push(i);

    return (
        <motion.div 
            ref={flyoutRef}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0, transition: { duration: 0.25 } }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-[96px] right-4 md:right-8 w-[360px] max-h-[85vh] rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col z-[101] text-white select-none overflow-hidden"
            style={{ 
                transformOrigin: "bottom right",
                backdropFilter: "blur(40px) saturate(150%)", 
                WebkitBackdropFilter: "blur(40px) saturate(150%)",
                background: "linear-gradient(135deg, rgba(35, 35, 35, 0.45) 0%, rgba(10, 10, 10, 0.65) 100%)",
                boxShadow: "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 2px 0 rgba(255, 255, 255, 0.05)"
            }}
        >
            <div className="flex flex-col h-full w-full p-4 relative z-10 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-hide">
                {/* Notifications Area */}
                <div className="bg-black/20 rounded-2xl p-4 flex flex-col transition-all border border-transparent hover:border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-medium text-white/90">Notifications</span>
                        <button className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white cursor-pointer group">
                            <BellOff size={14} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center py-6">
                        <span className="text-xs text-white/50 bg-black/30 px-3 py-1.5 rounded-full border border-white/5">No new notifications</span>
                    </div>
                </div>

                {/* Calendar Area */}
                <div className="bg-black/20 rounded-2xl p-4 flex flex-col flex-1 transition-all border border-transparent hover:border-white/10">
                     <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
                        <span className="text-sm font-medium text-white/90 drop-shadow-md">
                            {currentDate.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}
                        </span>
                        <button className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white cursor-pointer">
                            <ChevronDown size={14} />
                        </button>
                     </div>
                     
                     <div className="flex justify-between items-center mb-4 px-1">
                        <span className="text-sm font-semibold text-white/90">
                            {currentDate.toLocaleDateString([], { month: 'long', year: 'numeric' })}
                        </span>
                        <div className="flex gap-1">
                            <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white/70 hover:text-white" onClick={()=>setCurrentDate(new Date(year, month-1, 1))}><ChevronUp size={14} /></button>
                            <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white/70 hover:text-white" onClick={()=>setCurrentDate(new Date(year, month+1, 1))}><ChevronDown size={14} /></button>
                        </div>
                     </div>

                     <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {daysOfWeek.map(d => <div key={d} className="text-[11px] font-semibold text-white/50 py-1">{d}</div>)}
                     </div>
                     <div className="grid grid-cols-7 gap-1 text-center">
                        {days.map((d, i) => (
                            <div 
                                key={i} 
                                className={`
                                    w-9 h-9 flex items-center justify-center text-[13px] rounded-full mx-auto
                                    ${d === null ? '' : 'hover:bg-white/10 cursor-pointer transition-colors hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:ring-1 hover:ring-white/20'}
                                    ${d === today && month === new Date().getMonth() && year === new Date().getFullYear() ? 'bg-cyan-500 text-white font-bold shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:bg-cyan-400' : 'text-white/90'}
                                `}
                            >
                                {d}
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </motion.div>
    );
}
