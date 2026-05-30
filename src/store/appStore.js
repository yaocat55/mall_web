import { create } from 'zustand';

const useAppStore = create((set) => ({
  sidebar: { opened: true, withoutAnimation: false },
  device: 'desktop',

  toggleSideBar: () =>
    set((state) => ({
      sidebar: { ...state.sidebar, opened: !state.sidebar.opened },
    })),

  closeSideBar: ({ withoutAnimation }) =>
    set({ sidebar: { opened: false, withoutAnimation } }),

  setDevice: (device) => set({ device }),
}));

export default useAppStore;
