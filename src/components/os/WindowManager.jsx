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
    const newWindow = { id: appId, component, title, icon, minimized: false };
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
     setWindows(prev => prev.map(w => {
        if(w.id === appId) {
            // If currently active and not minimized, minimize it.
            // If minimized, restore it.
            const newMinimized = !w.minimized;
            if (!newMinimized) bringToFront(appId);
            return { ...w, minimized: newMinimized };
        }
        return w;
     }));
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
        bringToFront,
        zIndices,
        onShutdown
    }}>
      {children}
    </WindowManagerContext.Provider>
  );
};
