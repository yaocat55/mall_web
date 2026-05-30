import { create } from 'zustand';

const useMenuStore = create((set) => ({
  menuTree: [],
  setMenuTree: (tree) => set({ menuTree: tree }),
}));

export default useMenuStore;
