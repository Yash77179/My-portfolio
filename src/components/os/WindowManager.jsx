import { createContext, useContext, useState } from 'react';

const WindowManagerContext = createContext();

export const useWindowManager = () => useContext(WindowManagerContext);

export const WindowManagerProvider = ({ children, onShutdown }) => {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  
  // Z-index management
  const [zIndices, setZIndices] = useState({});

  const bringToFront = (appId) => {
      const maxZ = Math.max(0, ...Object.values(zIndices));
      setZIndices(prev => ({ ...prev, [appId]: maxZ + 1 }));
      setActiveWindowId(appId);
      // Ensure it's not minimized
      setWindows(prev => prev.map(w => w.id === appId ? { ...w, minimized: false } : w));
  };

  const openWindow = (appId, component, title, icon) => {
    // If minimized, restore
    const existing = windows.find((w) => w.id === appId);
    if (existing) {
      bringToFront(appId);
      setWindows(prev => prev.map(w => w.id === appId ? { ...w, minimized: false } : w));
      return;
    }
    
    // Create new
    const newWindow = { id: appId, component, title, icon, minimized: false, maximized: false };
    setWindows([...windows, newWindow]);
    bringToFront(appId);
    setStartMenuOpen(false);
  };

  const closeWindow = (appId) => {
    setWindows(prev => prev.filter((w) => w.id !== appId));
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
        setStartMenuOpen, 
        openWindow, 
        closeWindow, 
        toggleMinimize, 
        toggleMaximize,
        bringToFront,
        zIndices,
        onShutdown
    }}>
      {children}
    </WindowManagerContext.Provider>
  );
};
