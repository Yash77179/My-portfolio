// ADDED: Zustand global window geometry store with localStorage persistence
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWindowStore = create(
    persist(
        (set) => ({
            // Per-window geometry: { [id]: { x, y, width, height } }
            windowGeometries: {},

            // Per-window preMaxState: { [id]: { x, y, width, height } | null }
            windowPreMaxStates: {},

            // Z-index tracking
            zIndices: {},

            // --- Actions ---

            setWindowGeometry: (id, geometry) => set(state => ({
                windowGeometries: {
                    ...state.windowGeometries,
                    [id]: { ...state.windowGeometries[id], ...geometry }
                }
            })),

            setPreMaxState: (id, val) => set(state => ({
                windowPreMaxStates: {
                    ...state.windowPreMaxStates,
                    [id]: val
                }
            })),

            bringToFrontZ: (id) => set(state => {
                const maxZ = Math.max(0, ...Object.values(state.zIndices));
                return {
                    zIndices: { ...state.zIndices, [id]: maxZ + 1 }
                };
            }),

            removeWindowGeometry: (id) => set(state => {
                const newGeos = { ...state.windowGeometries };
                delete newGeos[id];
                const newPreMax = { ...state.windowPreMaxStates };
                delete newPreMax[id];
                const newZ = { ...state.zIndices };
                delete newZ[id];
                return {
                    windowGeometries: newGeos,
                    windowPreMaxStates: newPreMax,
                    zIndices: newZ,
                };
            }),
        }),
        {
            name: 'window-layout-storage',
            partialize: (state) => ({
                windowGeometries: state.windowGeometries,
                windowPreMaxStates: state.windowPreMaxStates,
                zIndices: state.zIndices,
            }),
        }
    )
);

export default useWindowStore;
