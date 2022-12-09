// @ts-nocheck
import create from 'zustand';

interface LaporanStore {
    laporanList: [];
    setLaporanList: (laporanList: [] | null) => void;
}

export const useLaporanStore = create<LaporanStore>((set) => ({
    laporanList: [],
    setLaporanList: (laporanList) => set({ laporanList })
}));
