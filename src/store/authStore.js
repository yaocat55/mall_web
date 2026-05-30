import { create } from 'zustand';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { login, getInfo, logout } from '@/api/login';

const useAuthStore = create((set, get) => ({
  token: getToken(),
  user: {},
  roles: [],
  loadMenus: false,

  login: async (userInfo) => {
    const { username, password, code, uuid, rememberMe } = userInfo;
    const res = await login(username, password, code, uuid);
    const data = res.data;
    setToken(data.token, rememberMe);
    const userRes = await getInfo();
    const userData = userRes.data;
    set({
      token: data.token,
      user: userData.username,
      roles: userData.roles?.length ? userData.roles : ['ROLE_SYSTEM_DEFAULT'],
      loadMenus: true,
    });
  },

  getInfo: async () => {
    const res = await getInfo();
    const data = res.data;
    set({
      user: data.username,
      roles: data.roles?.length ? data.roles : ['ROLE_SYSTEM_DEFAULT'],
    });
    return data;
  },

  logout: async () => {
    try {
      await logout();
    } finally {
      set({ token: '', roles: [] });
      removeToken();
    }
  },

  setLoadMenus: (val) => set({ loadMenus: val }),
}));

export default useAuthStore;
