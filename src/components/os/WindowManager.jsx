import { createContext, useContext, useState, useEffect } from 'react';
import useWindowStore from './useWindowStore'; // ADDED: Zustand store

const WindowManagerContext = createContext();

export const useWindowManager = () => useContext(WindowManagerContext);

export const WindowManagerProvider = ({ children, onShutdown, onRestart, onLock }) => {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // Added searchOpen state
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  // MODIFIED: Z-index management via Zustand store
  const zIndices = useWindowStore(state => state.zIndices);
  const bringToFrontZ = useWindowStore(state => state.bringToFrontZ);
  const removeWindowGeometry = useWindowStore(state => state.removeWindowGeometry);

  // Get initial restored window IDs once on mount
  const [restoredWindowIds] = useState(() => {
     try {
         return JSON.parse(sessionStorage.getItem('open_window_ids') || '[]');
     } catch(e) { return []; }
  });

  // Track windows state in session storage for reload retention
  useEffect(() => {
      const ids = windows.map(w => w.id);
      sessionStorage.setItem('open_window_ids', JSON.stringify(ids));
  }, [windows]);

  // Wrapped setters to ensure only one of startMenu, search, calendar is open at a time
  const _setStartMenuOpen = (value) => {
    setStartMenuOpen(value);
    if (value) {
      setSearchOpen(false);
      setCalendarOpen(false);
    }
  };

  const _setSearchOpen = (value) => {
    setSearchOpen(value);
    if (value) {
      setStartMenuOpen(false);
      setCalendarOpen(false);
    }
  };

  const _setCalendarOpen = (value) => {
    setCalendarOpen(value);
    if (value) {
      setStartMenuOpen(false);
      setSearchOpen(false);
    }
  };

  const bringToFront = (appId) => {
      // MODIFIED: Use Zustand for z-index management
      bringToFrontZ(appId);
      setActiveWindowId(appId);
      // Ensure it's not minimized
      setWindows(prev => prev.map(w => w.id === appId ? { ...w, minimized: false } : w));
  };

  const openWindow = (appId, component, title, icon) => {
    setWindows(prev => {
        const existing = prev.find((w) => w.id === appId);
        if (existing) {
            return prev.map(w => w.id === appId ? { ...w, minimized: false } : w);
        }
        return [...prev, { id: appId, component, title, icon, minimized: false, maximized: false }];
    });
    
    bringToFront(appId);
    _setStartMenuOpen(false); 
    _setCalendarOpen(false); 
    _setSearchOpen(false); 
  };

  const closeWindow = (appId) => {
    setWindows(prev => prev.filter((w) => w.id !== appId));
    // ADDED: Note - intentionally not calling removeWindowGeometry(appId) so position persists!
    if (activeWindowId === appId) {
      setActiveWindowId(null);
    }
  };

  const toggleMinimize = (appId) => {
    const w = windows.find(w => w.id === appId);
    if (!w) return;

    if (w.minimized) {
        // If minimized, restore it
        bringToFront(appId);
    } else {
        // If visible
        if (activeWindowId === appId) {
            // If active, minimize it
            setWindows(prev => prev.map(win => win.id === appId ? { ...win, minimized: true } : win));
            setActiveWindowId(null);
        } else {
            // If backgrounded, bring to front
            bringToFront(appId);
        }
    }
  };

  const toggleMaximize = (appId) => {
    setWindows(prev => prev.map(w => 
      w.id === appId ? { ...w, maximized: !w.maximized } : w
    ));
    bringToFront(appId);
  };

  return (
    <WindowManagerContext.Provider value={{ 
        windows, 
        activeWindowId, 
        startMenuOpen, 
        setStartMenuOpen: _setStartMenuOpen, // Export wrapped setter
        calendarOpen,
        setCalendarOpen: _setCalendarOpen, // Export wrapped setter
        searchOpen, // Export searchOpen state
        setSearchOpen: _setSearchOpen, // Export wrapped setter
        openWindow, 
        closeWindow, 
        toggleMinimize, 
        toggleMaximize,
        restoredWindowIds,
        bringToFront,
        zIndices,
        onShutdown,
        onRestart,
        onLock
    }}>
      {children}
    </WindowManagerContext.Provider>
  );
};
