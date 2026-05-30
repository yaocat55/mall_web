import { create } from 'zustand';
import Cookies from 'js-cookie';

const useSettingsStore = create((set) => ({
  title: '商城后台管理系统',
  tagsView: true,
  fixedHeader: true,
  sidebarLogo: true,
  showSettings: false,
  showFooter: true,
  footerTxt: '©2024 B2C商城后台管理系统 <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License 2.0</a>',
  caseNumber: '',
  theme: Cookies.get('theme') || '',

  changeSetting: (key, value) => set({ [key]: value }),
}));

export default useSettingsStore;
