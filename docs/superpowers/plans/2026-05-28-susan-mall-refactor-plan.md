# 商城管理后台 React 重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Vue 2.x + Element UI 商城管理后台完整重构为 React 18 + Vite + MUI，暗黑浅蓝主题

**Architecture:** Zustand 管理全局状态，React Router v6 动态路由，useCrud Hook 封装 CRUD 模式，MUI 暗黑主题统一视觉，Axios 拦截器处理认证/错误

**Tech Stack:** React 18, Vite 5, MUI v6, Zustand, React Router v6, ECharts 5, Axios, js-cookie

---

## Phase 1: 项目初始化与主题配置

### Task 1: 初始化 Vite + React 项目

**Files:**
- Create: `D:\github_project\mall\mall_web\package.json`
- Create: `D:\github_project\mall\mall_web\vite.config.js`
- Create: `D:\github_project\mall\mall_web\index.html`
- Create: `D:\github_project\mall\mall_web\src\main.jsx`
- Create: `D:\github_project\mall\mall_web\src\App.jsx`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "susan-mall-web-react",
  "version": "3.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@mui/icons-material": "^6.0.0",
    "@mui/material": "^6.0.0",
    "@emotion/react": "^11.13.0",
    "@emotion/styled": "^11.13.0",
    "axios": "^1.7.0",
    "echarts": "^5.5.0",
    "echarts-for-react": "^3.0.2",
    "js-cookie": "^3.0.5",
    "jsencrypt": "^3.3.2",
    "qs": "^6.12.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.26.0",
    "zustand": "^4.5.0",
    "screenfull": "^6.0.2",
    "nprogress": "^0.2.0",
    "clipboard": "^2.0.11"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: 创建 vite.config.js**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8013,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8011',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'v1/api'),
      },
      '/v1': {
        target: 'http://localhost:8011',
        changeOrigin: true,
      },
    },
  },
});
```

- [ ] **Step 3: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>苏三商城后台管理系统</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: 创建 src/main.jsx**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from './theme/darkTheme';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

- [ ] **Step 5: 创建 src/App.jsx**

```jsx
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
```

- [ ] **Step 6: 安装依赖**

```bash
cd D:\github_project\mall\mall_web && npm install
```

- [ ] **Step 7: 验证项目启动**

```bash
npm run dev
```

---

### Task 2: 配置 MUI 暗黑主题

**Files:**
- Create: `D:\github_project\mall\mall_web\src\theme\darkTheme.js`

- [ ] **Step 1: 创建暗黑主题文件**

```js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0D1117',
      paper: '#161B22',
    },
    primary: {
      main: '#58A6FF',
      light: '#79B8FF',
      dark: '#3B82F6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8B949E',
    },
    text: {
      primary: '#E6EDF3',
      secondary: '#8B949E',
    },
    divider: '#30363D',
    action: {
      hover: 'rgba(88, 166, 255, 0.08)',
      selected: 'rgba(88, 166, 255, 0.16)',
    },
  },
  typography: {
    fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#30363D #0D1117',
          '&::-webkit-scrollbar': {
            width: 6,
            height: 6,
          },
          '&::-webkit-scrollbar-track': {
            background: '#0D1117',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#30363D',
            borderRadius: 3,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: 'linear-gradient(135deg, #58A6FF 0%, #3B82F6 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #79B8FF 0%, #58A6FF 100%)',
          },
        },
      },
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: '#161B22',
          },
          '&:nth-of-type(even)': {
            backgroundColor: '#1A1F2B',
          },
          '&:hover': {
            backgroundColor: 'rgba(88, 166, 255, 0.08) !important',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#21262D',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: '#1C2333',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiChip: {
      styleOverrides: {
        filled: {
          backgroundColor: '#21262D',
        },
      },
    },
  },
});

export default darkTheme;
```

- [ ] **Step 2: 验证主题生效**

启动 `npm run dev`，确认页面背景为深色 #0D1117

---

## Phase 2: 核心基础设施

### Task 3: Axios 请求模块

**Files:**
- Create: `D:\github_project\mall\mall_web\src\utils\auth.js`
- Create: `D:\github_project\mall\mall_web\src\utils\request.js`

- [ ] **Step 1: 创建 auth.js**

```js
import Cookies from 'js-cookie';

const TokenKey = 'SUSAN-TOEKN';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token, rememberMe) {
  return Cookies.set(TokenKey, token, rememberMe ? { expires: 1 } : undefined);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
```

- [ ] **Step 2: 创建 request.js**

```js
import axios from 'axios';
import { getToken, removeToken } from './auth';
import Cookies from 'js-cookie';

const service = axios.create({
  baseURL: import.meta.env.PROD ? import.meta.env.VITE_BASE_API : '/',
  timeout: 1200000,
});

service.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = 'Basic@' + token;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
}, (error) => Promise.reject(error));

service.interceptors.response.use((response) => {
  if (response.data instanceof Blob) {
    const temp = response.headers['content-disposition'].split(';')[1].split('filename=')[1];
    const fileName = decodeURIComponent(temp);
    const url = window.URL.createObjectURL(response.data);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = fileName;
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    return;
  }
  const { code, message } = response.data;
  if (code === 200) {
    return response.data;
  }
  if (code === 401) {
    removeToken();
    Cookies.set('point', 401);
    window.location.reload();
    return Promise.reject(message);
  }
  if (code === 403) {
    window.location.href = '/401';
    return Promise.reject(message);
  }
  const errorMsg = message || '接口请求失败';
  // 使用 window dispatchEvent 触发全局消息通知，避免直接依赖组件
  window.dispatchEvent(new CustomEvent('global-notify', {
    detail: { type: 'error', message: errorMsg },
  }));
  return Promise.reject(message);
}, (error) => {
  const msg = error?.message || '网络请求超时';
  window.dispatchEvent(new CustomEvent('global-notify', {
    detail: { type: 'error', message: msg },
  }));
  return Promise.reject(error);
});

export default service;
```

- [ ] **Step 3: 创建全局通知组件占位**

创建 `src/utils/notify.js`:

```js
import { enqueueSnackbar } from 'notistack';

export function notify(title, type = 'info') {
  enqueueSnackbar(title, { variant: type });
}
```

由于 MUI 需要 SnackbarProvider 上下文，我们先注册 window 事件。后续在 Layout 组件中监听 `global-notify` 事件并用 MUI Snackbar 显示。

---

### Task 4: Zustand 状态管理

**Files:**
- Create: `D:\github_project\mall\mall_web\src\store\authStore.js`
- Create: `D:\github_project\mall\mall_web\src\store\appStore.js`
- Create: `D:\github_project\mall\mall_web\src\store\settingsStore.js`

- [ ] **Step 1: 创建 authStore.js**

```js
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
```

- [ ] **Step 2: 创建 appStore.js**

```js
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
```

- [ ] **Step 3: 创建 settingsStore.js**

```js
import { create } from 'zustand';
import Cookies from 'js-cookie';

const useSettingsStore = create((set) => ({
  title: '商城后台管理系统',
  tagsView: true,
  fixedHeader: true,
  sidebarLogo: true,
  showSettings: false,
  showFooter: true,
  footerTxt: '©2024 Java突击队 <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License 2.0</a>',
  caseNumber: '',
  theme: Cookies.get('theme') || '',

  changeSetting: (key, value) => set({ [key]: value }),
}));

export default useSettingsStore;
```

---

### Task 5: 路由系统

**Files:**
- Create: `D:\github_project\mall\mall_web\src\router\index.jsx`
- Create: `D:\github_project\mall\mall_web\src\router\utils.js`
- Create: `D:\github_project\mall\mall_web\src\router\Loadable.jsx`
- Create: `D:\github_project\mall\mall_web\src\pages\features\NotFound.jsx`
- Create: `D:\github_project\mall\mall_web\src\pages\features\Unauthorized.jsx`
- Create: `D:\github_project\mall\mall_web\src\pages\features\Redirect.jsx`

- [ ] **Step 1: 创建路由工具函数 utils.js**

```js
import { Navigate } from 'react-router-dom';

export function filterAsyncRouter(routes, lastRouter = false, isRewrite = false) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { path: route.path, meta: route.meta };
    if (route.component) {
      if (route.component === 'Layout') {
        tmp.element = <Navigate to={route.redirect || route.children?.[0]?.path || '/'} replace />;
      } else {
        tmp.element = <Navigate to={route.path} replace />;
      }
    }
    if (route.redirect) {
      tmp.children = [{ path: '', element: <Navigate to={route.redirect} replace /> }];
    }
    if (route.children) {
      tmp.children = filterAsyncRouter(route.children, false, isRewrite);
    }
    if (route.path === '/' && !lastRouter) {
      tmp.index = true;
      delete tmp.path;
    }
    res.push(tmp);
  });
  if (lastRouter) {
    res.push({ path: '*', element: <Navigate to="/404" replace />, hidden: true });
  }
  return res;
}
```

- [ ] **Step 2: 创建 Loadable.jsx 懒加载组件**

```jsx
import { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <CircularProgress size={32} sx={{ color: '#58A6FF' }} />
  </Box>
);

export function Loadable(importFunc) {
  const Component = lazy(importFunc);
  return (props) => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
}
```

- [ ] **Step 3: 创建 404, 401, Redirect 页面**

```jsx
// src/pages/features/NotFound.jsx
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#0D1117">
      <Typography variant="h1" color="text.secondary" fontWeight={700}>404</Typography>
      <Typography variant="h5" color="text.secondary" sx={{ mt: 1 }}>页面不存在</Typography>
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate('/')}>返回首页</Button>
    </Box>
  );
}
```

```jsx
// src/pages/features/Unauthorized.jsx
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#0D1117">
      <Typography variant="h1" color="text.secondary" fontWeight={700}>401</Typography>
      <Typography variant="h5" color="text.secondary" sx={{ mt: 1 }}>无权限访问</Typography>
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate('/')}>返回首页</Button>
    </Box>
  );
}
```

```jsx
// src/pages/features/Redirect.jsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Redirect() {
  const { path } = useParams();
  const navigate = useNavigate();
  useEffect(() => { navigate('/' + (path || ''), { replace: true }); }, [path, navigate]);
  return null;
}
```

- [ ] **Step 4: 创建静态路由配置 index.jsx**

```jsx
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import useAuthStore from '@/store/authStore';
import { buildMenus } from '@/api/system/menu';
import { filterAsyncRouter } from './utils';
import { Loadable } from './Loadable';

NProgress.configure({ showSpinner: false });

const Login = Loadable(() => import('@/pages/Login'));
const Dashboard = Loadable(() => import('@/pages/Dashboard'));
const NotFound = Loadable(() => import('@/pages/features/NotFound'));
const Unauthorized = Loadable(() => import('@/pages/features/Unauthorized'));
const Redirect = Loadable(() => import('@/pages/features/Redirect'));
const Layout = Loadable(() => import('@/components/Layout'));
const PersonalCenter = Loadable(() => import('@/pages/system/user/Center'));

const staticRoutes = [
  { path: '/login', element: <Login />, meta: { title: '登录' } },
  { path: '/404', element: <NotFound /> },
  { path: '/401', element: <Unauthorized /> },
  { path: '/redirect/:path*', element: <Layout><Redirect /></Layout> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard />, meta: { title: '首页', icon: 'index' } },
    ],
  },
  {
    path: '/user/center',
    element: <Layout />,
    children: [
      { path: 'center', element: <PersonalCenter />, meta: { title: '个人中心' } },
    ],
  },
  { path: '*', element: <NotFound /> },
];

// Append Navigate import
import { Navigate } from 'react-router-dom';

function AuthGuard({ children }) {
  const token = getToken();
  const location = useLocation();
  if (!token && location.pathname !== '/login') {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }
  return children;
}

function useDynamicRoutes() {
  const [dynamicRoutes, setDynamicRoutes] = useState([]);
  const { token, roles, loadMenus, getInfo, setLoadMenus, logout } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!token) return;
    if (roles.length === 0) {
      getInfo().then(() => {
        loadDynamicMenus();
      }).catch(() => {
        logout().then(() => window.location.reload());
      });
    } else {
      loadDynamicMenus();
    }
  }, [token]);

  const loadDynamicMenus = async () => {
    const res = await buildMenus();
    const data = res.data;
    const rewriteRoutes = filterAsyncRouter(JSON.parse(JSON.stringify(data)), false, true);
    rewriteRoutes.push({ path: '*', element: <Navigate to="/404" replace />, hidden: true });
    setDynamicRoutes(rewriteRoutes);
  };

  return dynamicRoutes;
}

export default function AppRouter() {
  const dynamicRoutes = useDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];
  const element = useRoutes(allRoutes);

  useEffect(() => {
    NProgress.start();
    return () => NProgress.done();
  }, [location]);

  return <AuthGuard>{element}</AuthGuard>;
}
```

**注意**: 这个路由系统文件需要后续迭代完善。当前先建立框架结构，后续逐步打通动态路由流程。

---

## Phase 3: Layout 框架

### Task 6: 创建 Layout 核心框架

**Files:**
- Create: `D:\github_project\mall\mall_web\src\components\Layout\index.jsx`
- Create: `D:\github_project\mall\mall_web\src\components\Layout\AppMain.jsx`

- [ ] **Step 1: 创建 Layout/index.jsx**

```jsx
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import useAppStore from '@/store/appStore';
import useSettingsStore from '@/store/settingsStore';

const DRAWER_WIDTH = 220;
const COLLAPSED_WIDTH = 64;

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { sidebar, closeSideBar, setDevice } = useAppStore();
  const { fixedHeader } = useSettingsStore();
  const [drawerWidth, setDrawerWidth] = useState(DRAWER_WIDTH);

  useEffect(() => {
    setDevice(isMobile ? 'mobile' : 'desktop');
  }, [isMobile, setDevice]);

  const handleToggle = () => {
    const newOpened = !sidebar.opened;
    setDrawerWidth(newOpened ? DRAWER_WIDTH : COLLAPSED_WIDTH);
    useAppStore.getState().toggleSideBar();
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#0D1117' }}>
      <Sidebar drawerWidth={drawerWidth} isMobile={isMobile} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isMobile ? 0 : `${COLLAPSED_WIDTH}px`,
          transition: 'margin-left 0.28s',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            ...(fixedHeader ? {
              position: 'sticky',
              top: 0,
              zIndex: 9,
            } : {}),
          }}
        >
          <Navbar onToggle={handleToggle} />
        </Box>
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {children || <Outlet />}
        </Box>
      </Box>
    </Box>
  );
}
```

- [ ] **Step 2: 创建 AppMain.jsx**

```jsx
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function AppMain() {
  return (
    <Box sx={{ p: 2, minHeight: 'calc(100vh - 100px)' }}>
      <Outlet />
    </Box>
  );
}
```

---

### Task 7: Sidebar 侧边栏

**Files:**
- Create: `D:\github_project\mall\mall_web\src\components\Layout\Sidebar.jsx`
- Create: `D:\github_project\mall\mall_web\src\components\Layout\SidebarItem.jsx`
- Create: `D:\github_project\mall\mall_web\src\components\Layout\Logo.jsx`

- [ ] **Step 1: 创建 Sidebar.jsx**

```jsx
import { Drawer, List, Box, useMediaQuery, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import useAppStore from '@/store/appStore';
import useAuthStore from '@/store/authStore';
import Logo from './Logo';
import SidebarItem from './SidebarItem';

const DRAWER_WIDTH = 220;
const COLLAPSED_WIDTH = 64;

export default function Sidebar({ isMobile }) {
  const theme = useTheme();
  const { sidebar, closeSideBar } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  const opened = sidebar.opened;

  const menuItems = [
    { path: '/dashboard', meta: { title: '首页', icon: 'Dashboard' } },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#161B22' }}>
      <Logo collapsed={!opened} />
      <List sx={{ flexGrow: 1, overflow: 'auto', px: 0.5 }}>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            basePath={item.path}
            collapsed={!opened}
            active={location.pathname === item.path}
            onClick={() => {
              navigate(item.path);
              if (isMobile) closeSideBar({ withoutAnimation: false });
            }}
          />
        ))}
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        open={opened}
        onClose={() => closeSideBar({ withoutAnimation: false })}
        PaperProps={{ sx: { width: DRAWER_WIDTH, bgcolor: '#161B22' } }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        width: opened ? DRAWER_WIDTH : COLLAPSED_WIDTH,
        transition: 'width 0.28s',
        overflow: 'hidden',
        flexShrink: 0,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 10,
      }}
    >
      {drawerContent}
    </Box>
  );
}
```

- [ ] **Step 2: 创建 SidebarItem.jsx**

```jsx
import { ListItemButton, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import { useState } from 'react';
import {
  Dashboard, Store, ShoppingCart, LocalOffer, Receipt,
  People, Security, Settings, Monitor, Storage, Build,
  Email, Payment, Terrain, Photo, Category, ViewCarousel,
} from '@mui/icons-material';

const iconMap = {
  index: Dashboard,
  store: Store,
  shopping: ShoppingCart,
  coupon: LocalOffer,
  order: Receipt,
  user: People,
  security: Security,
  system: Settings,
  monitor: Monitor,
  storage: Storage,
  build: Build,
  email: Email,
  alipay: Payment,
  swagger: Terrain,
  photo: Photo,
  category: Category,
  carousel: ViewCarousel,
};

export default function SidebarItem({ item, basePath, collapsed, active, onClick }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const Icon = iconMap[item.meta?.icon] || Dashboard;

  if (hasChildren) {
    return (
      <>
        <ListItemButton
          onClick={() => setOpen(!open)}
          sx={{
            borderRadius: 1,
            mb: 0.3,
            minHeight: 44,
            justifyContent: collapsed ? 'center' : 'initial',
            px: collapsed ? 1.5 : 2,
            color: '#8B949E',
            '&:hover': { color: '#58A6FF', bgcolor: 'rgba(88,166,255,0.08)' },
          }}
        >
          <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, color: 'inherit', justifyContent: 'center' }}>
            <Icon fontSize="small" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary={item.meta?.title} sx={{ '& .MuiListItemText-primary': { fontSize: 14 } }} />}
        </ListItemButton>
        <Collapse in={open}>
          <List disablePadding>
            {item.children.filter(c => !c.hidden).map((child) => (
              <SidebarItem
                key={child.path}
                item={child}
                basePath={`${basePath}/${child.path}`}
                collapsed={collapsed}
                active={false}
                onClick={onClick}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        borderRadius: 1,
        mb: 0.3,
        minHeight: 44,
        pl: collapsed ? 1.5 : item.path.includes('/') ? 4 : 2,
        pr: collapsed ? 1.5 : 2,
        justifyContent: collapsed ? 'center' : 'initial',
        color: active ? '#58A6FF' : '#8B949E',
        bgcolor: active ? 'rgba(88,166,255,0.12)' : 'transparent',
        '&:hover': {
          color: '#58A6FF',
          bgcolor: active ? 'rgba(88,166,255,0.16)' : 'rgba(88,166,255,0.08)',
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, color: 'inherit', justifyContent: 'center' }}>
        <Icon fontSize="small" />
      </ListItemIcon>
      {!collapsed && <ListItemText primary={item.meta?.title} sx={{ '& .MuiListItemText-primary': { fontSize: 14 } }} />}
    </ListItemButton>
  );
}
```

- [ ] **Step 3: 创建 Logo.jsx**

```jsx
import { Box, Typography } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';

export default function Logo({ collapsed }) {
  return (
    <Box
      sx={{
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        px: collapsed ? 0 : 2,
        borderBottom: '1px solid #30363D',
      }}
    >
      <StoreIcon sx={{ color: '#58A6FF', fontSize: 28 }} />
      {!collapsed && (
        <Typography
          variant="h6"
          noWrap
          sx={{
            ml: 1,
            fontSize: 14,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #58A6FF, #3B82F6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          苏三商城
        </Typography>
      )}
    </Box>
  );
}
```

---

### Task 8: Navbar 顶部导航栏

**Files:**
- Create: `D:\github_project\mall\mall_web\src\components\Layout\Navbar.jsx`

- [ ] **Step 1: 创建 Navbar.jsx**

```jsx
import { AppBar, Toolbar, IconButton, Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SettingsIcon from '@mui/icons-material/Settings';
import useAuthStore from '@/store/authStore';
import useSettingsStore from '@/store/settingsStore';
import screenfull from 'screenfull';
import defaultAvatar from '@/assets/images/avatar.png';

export default function Navbar({ onToggle }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { changeSetting } = useSettingsStore();

  const handleLogout = async () => {
    setAnchorEl(null);
    await logout();
    window.location.reload();
  };

  const handleFullscreen = () => {
    if (screenfull.isEnabled) screenfull.toggle();
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: '#161B22',
        backgroundImage: 'none',
        boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
        height: 50,
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: '50px !important', px: 1 }}>
        <IconButton onClick={onToggle} sx={{ mr: 1, color: '#8B949E' }}>
          <MenuIcon fontSize="small" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton onClick={handleFullscreen} sx={{ color: '#8B949E', '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' } }}>
          <FullscreenIcon fontSize="small" />
        </IconButton>

        <IconButton
          onClick={() => changeSetting('showSettings', true)}
          sx={{ color: '#8B949E', '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' } }}
        >
          <SettingsIcon fontSize="small" />
        </IconButton>

        <Box sx={{ ml: 1 }} onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar src={defaultAvatar} sx={{ width: 32, height: 32, cursor: 'pointer' }} />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          slotProps={{ paper: { sx: { bgcolor: '#1C2333', minWidth: 140 } } }}
        >
          <MenuItem onClick={() => { setAnchorEl(null); navigate('/user/center'); }}>
            <Typography variant="body2">个人中心</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography variant="body2">退出登录</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
```

---

## Phase 4: CRUD 系统

### Task 9: useCrud Hook

**Files:**
- Create: `D:\github_project\mall\mall_web\src\hooks\useCrud.js`

- [ ] **Step 1: 创建 useCrud.js**

```js
import { useState, useCallback, useRef } from 'react';
import request from '@/utils/request';

const STATUS = { NORMAL: 0, PREPARED: 1, PROCESSING: 2 };

export default function useCrud(options) {
  const {
    title = '',
    url = '',
    crudMethod = {},
    defaultForm = {},
    idField = 'id',
    sortField = ['id,desc'],
    queryOnCreated = true,
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState([]);
  const [query, setQuery] = useState({});
  const [form, setForm] = useState({ ...defaultForm });
  const [addStatus, setAddStatus] = useState(STATUS.NORMAL);
  const [editStatus, setEditStatus] = useState(STATUS.NORMAL);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const defaultQuery = useRef({});

  const getQueryParams = useCallback(() => {
    const params = { pageNo, pageSize, sortField };
    Object.entries(query).forEach(([k, v]) => {
      if (v !== null && v !== '' && v !== undefined) params[k] = v;
    });
    return params;
  }, [pageNo, pageSize, query]);

  const refresh = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await request({ url, method: 'post', data: getQueryParams() });
      setData(res.data?.data || []);
      setTotalCount(res.data?.totalCount || 0);
    } catch (e) {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [url, getQueryParams]);

  const toQuery = useCallback(() => {
    setPageNo(1);
    // trigger refresh in useEffect
  }, []);

  const resetForm = useCallback((data) => {
    setForm(data ? { ...data } : { ...defaultForm });
  }, [defaultForm]);

  const toAdd = useCallback(() => {
    resetForm();
    setAddStatus(STATUS.PREPARED);
  }, [resetForm]);

  const toEdit = useCallback((row) => {
    resetForm(row);
    setEditStatus(STATUS.PREPARED);
  }, [resetForm]);

  const cancelCU = useCallback(() => {
    setAddStatus(STATUS.NORMAL);
    setEditStatus(STATUS.NORMAL);
    resetForm();
  }, [resetForm]);

  const doAdd = useCallback(async () => {
    if (!crudMethod.add) return;
    setAddStatus(STATUS.PROCESSING);
    try {
      await crudMethod.add(form);
      setAddStatus(STATUS.NORMAL);
      resetForm();
      refresh();
      return true;
    } catch {
      setAddStatus(STATUS.PREPARED);
      return false;
    }
  }, [crudMethod, form, resetForm, refresh]);

  const doEdit = useCallback(async () => {
    if (!crudMethod.edit) return;
    setEditStatus(STATUS.PROCESSING);
    try {
      await crudMethod.edit(form);
      setEditStatus(STATUS.NORMAL);
      resetForm();
      refresh();
      return true;
    } catch {
      setEditStatus(STATUS.PREPARED);
      return false;
    }
  }, [crudMethod, form, resetForm, refresh]);

  const doDelete = useCallback(async (ids) => {
    if (!crudMethod.del) return;
    const idList = Array.isArray(ids) ? ids : [ids];
    try {
      await crudMethod.del(idList);
      if (data.length === idList.length && pageNo > 1) {
        setPageNo((p) => p - 1);
      }
      refresh();
      setSelections([]);
    } catch { /* handled by request interceptor */ }
  }, [crudMethod, data.length, pageNo, refresh]);

  const dialogOpen = addStatus > STATUS.NORMAL || editStatus > STATUS.NORMAL;
  const dialogTitle = addStatus > STATUS.NORMAL ? `新增${title}` : `编辑${title}`;
  const submitting = addStatus === STATUS.PROCESSING || editStatus === STATUS.PROCESSING;

  // Auto-refresh on query/page change
  const queryKey = JSON.stringify({ pageNo, pageSize, ...query, sortField });
  const queryRef = useRef(queryKey);
  const initialized = useRef(false);

  if (queryKey !== queryRef.current) {
    queryRef.current = queryKey;
    if (initialized.current || queryOnCreated) {
      setTimeout(refresh, 0);
    }
  }
  if (!initialized.current && queryOnCreated) {
    initialized.current = true;
    setTimeout(refresh, 0);
  }

  return {
    data, loading, selections, form, query,
    pageNo, pageSize, totalCount,
    dialogOpen, dialogTitle, submitting,
    addStatus, editStatus,
    setQuery, setForm, setSelections, setPageNo, setPageSize,
    toQuery, refresh, toAdd, toEdit, toDelete, cancelCU,
    doAdd, doEdit, doDelete,
    STATUS,
  };
}

export { STATUS };
```

---

### Task 10: CrudToolbar 搜索工具栏组件

**Files:**
- Create: `D:\github_project\mall\mall_web\src\components\Crud\CrudToolbar.jsx`

- [ ] **Step 1: 创建 CrudToolbar.jsx**

```jsx
import { Box, TextField, Button, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';

export default function CrudToolbar({
  onSearch, onRefresh, onAdd, onDelete, onExport,
  showAdd = true, showDelete = true, showExport = true,
  selections = [], searchPlaceholder = '输入关键字搜索',
  renderSearch,
  renderExtra,
}) {
  const [searchValue, setSearchValue] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = () => {
    onSearch?.(searchValue);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
        <Tooltip title="搜索">
          <IconButton size="small" onClick={() => setShowSearch(!showSearch)}
            sx={{ color: showSearch ? '#58A6FF' : '#8B949E' }}>
            <SearchIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {showSearch && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            {renderSearch ? renderSearch() : (
              <TextField
                size="small"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                sx={{ width: 200, '& .MuiOutlinedInput-root': { bgcolor: '#21262D' } }}
              />
            )}
            <Button size="small" variant="contained" onClick={handleSearch}>搜索</Button>
            <Button size="small" onClick={() => { setSearchValue(''); onRefresh?.(); }}
              sx={{ color: '#8B949E' }}>重置</Button>
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {showAdd && (
          <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={onAdd}>新增</Button>
        )}
        {showDelete && (
          <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />}
            disabled={selections.length === 0} onClick={() => onDelete?.(selections)}>删除</Button>
        )}
        {showExport && (
          <Button size="small" variant="outlined" startIcon={<DownloadIcon />}
            onClick={onExport} sx={{ borderColor: '#30363D', color: '#8B949E' }}>导出</Button>
        )}
        {renderExtra && renderExtra()}
      </Box>
    </Box>
  );
}
```

---

### Task 11: CrudDialog 表单弹窗组件

**Files:**
- Create: `D:\github_project\mall\mall_web\src\components\Crud\CrudDialog.jsx`

- [ ] **Step 1: 创建 CrudDialog.jsx**

```jsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function CrudDialog({ open, title, onClose, onSubmit, submitting, children, maxWidth = 'sm' }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth
      slotProps={{ paper: { sx: { bgcolor: '#1C2333' } } }}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ color: '#E6EDF3', fontSize: 16 }}>{title}</DialogTitle>
        <DialogContent dividers sx={{ borderColor: '#30363D' }}>
          {children}
        </DialogContent>
        <DialogActions sx={{ p: 1.5 }}>
          <Button onClick={onClose} sx={{ color: '#8B949E' }}>取消</Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? '提交中...' : '确认'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
```

---

### Task 12: CrudPagination 分页组件

**Files:**
- Create: `D:\github_project\mall\mall_web\src\components\Crud\CrudPagination.jsx`

- [ ] **Step 1: 创建 CrudPagination.jsx**

```jsx
import { Box, Pagination, FormControl, Select, MenuItem, Typography } from '@mui/material';

export default function CrudPagination({ pageNo, pageSize, totalCount, onPageChange, onSizeChange }) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5, mt: 2 }}>
      <Typography variant="body2" color="text.secondary">共 {totalCount} 条</Typography>
      <FormControl size="small">
        <Select value={pageSize} onChange={(e) => onSizeChange?.(e.target.value)}
          sx={{ '& .MuiSelect-select': { py: 0.5 } }}>
          {[10, 20, 50, 100].map((n) => (
            <MenuItem key={n} value={n}>{n}条/页</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Pagination
        count={totalPages}
        page={pageNo}
        onChange={(_, p) => onPageChange?.(p)}
        size="small"
        siblingCount={1}
        showFirstButton
        showLastButton
        sx={{ '& .MuiPaginationItem-root': { color: '#8B949E' } }}
      />
    </Box>
  );
}
```

---

### Task 13: CrudTable 通用表格组件

**Files:**
- Create: `D:\github_project\mall\mall_web\src\components\Crud\CrudTable.jsx`

- [ ] **Step 1: 创建 CrudTable.jsx**

```jsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Box, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function CrudTable({
  columns, data, loading, selections, idField = 'id',
  onSelectionChange, onEdit, onDelete,
  showSelect = true, showActions = true, rowKey,
}) {
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectionChange?.(data.filter(row => {
        if (row[idField] === 1) return false;
        return true;
      }));
    } else {
      onSelectionChange?.([]);
    }
  };

  const handleSelectOne = (row) => {
    const selected = selections.find((s) => s[idField] === row[idField]);
    if (selected) {
      onSelectionChange?.(selections.filter((s) => s[idField] !== row[idField]));
    } else {
      onSelectionChange?.([...selections, row]);
    }
  };

  const isSelected = (row) => selections.some((s) => s[idField] === row[idField]);
  const allSelectable = data.filter((r) => r[idField] !== 1);
  const allSelected = allSelectable.length > 0 && allSelectable.every((r) => isSelected(r));
  const someSelected = selections.length > 0 && !allSelected;

  return (
    <TableContainer sx={{ bgcolor: 'transparent' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {showSelect && (
              <TableCell padding="checkbox" sx={{ bgcolor: '#21262D' }}>
                <Checkbox
                  size="small"
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleSelectAll}
                  sx={{ color: '#8B949E', '&.Mui-checked': { color: '#58A6FF' } }}
                />
              </TableCell>
            )}
            {columns.map((col) => (
              <TableCell key={col.prop || col.label} sx={{ bgcolor: '#21262D', color: '#E6EDF3', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>
                {col.label}
              </TableCell>
            ))}
            {showActions && (
              <TableCell sx={{ bgcolor: '#21262D', color: '#E6EDF3', fontWeight: 600, fontSize: 13, textAlign: 'center' }}>
                操作
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length + (showSelect ? 1 : 0) + (showActions ? 1 : 0)} align="center" sx={{ py: 6 }}>
                <CircularProgress size={28} sx={{ color: '#58A6FF' }} />
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (showSelect ? 1 : 0) + (showActions ? 1 : 0)} align="center" sx={{ py: 6, color: '#8B949E' }}>
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => (
              <TableRow key={row[idField] || idx} hover>
                {showSelect && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      size="small"
                      checked={isSelected(row)}
                      disabled={row[idField] === 1}
                      onChange={() => handleSelectOne(row)}
                      sx={{ color: '#8B949E', '&.Mui-checked': { color: '#58A6FF' } }}
                    />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.prop || col.label} sx={{ fontSize: 13, color: '#E6EDF3' }}>
                    {col.render ? col.render(row[col.prop], row) : row[col.prop]}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell align="center">
                    <Tooltip title="编辑"><IconButton size="small" onClick={() => onEdit?.(row)}
                      sx={{ color: '#58A6FF', '&:hover': { bgcolor: 'rgba(88,166,255,0.12)' } }}>
                      <EditIcon fontSize="small" />
                    </IconButton></Tooltip>
                    <Tooltip title="删除"><IconButton size="small" onClick={() => onDelete?.([row])}
                      sx={{ color: '#F85149', '&:hover': { bgcolor: 'rgba(248,81,73,0.12)' } }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton></Tooltip>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
```

---

## Phase 5: 登录页与仪表盘

### Task 14: 登录页

**Files:**
- Create: `D:\github_project\mall\mall_web\src\pages\Login.jsx`
- Create: `D:\github_project\mall\mall_web\src\api\login.js`
- Create: `D:\github_project\mall\mall_web\src\utils\rsaEncrypt.js`

- [ ] **Step 1: 创建 API login.js**

```js
import request from '@/utils/request';

export function login(username, password, code, uuid) {
  return request({
    url: '/v1/web/user/login',
    method: 'post',
    data: { username, password, code, uuid },
  });
}

export function getInfo() {
  return request({ url: '/v1/web/user/info', method: 'get' });
}

export function getCodeImg() {
  return request({ url: '/v1/web/user/code', method: 'get' });
}

export function logout() {
  return request({ url: '/v1/web/user/logout', method: 'post' });
}
```

- [ ] **Step 2: 创建 rsaEncrypt.js**

```js
import JSEncrypt from 'jsencrypt';

const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKoR8mX0rGKL4zgXaT4yXKMbLJyvZfq1G8aJfq+QGhFJW/MbYK0aIqF0QmNkZjxAhFwe6XvR0FQhZYHBJGQhv+8CAwEAAQ==';

export function encrypt(text) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  return encryptor.encrypt(text);
}
```

- [ ] **Step 3: 创建 Login.jsx**

```jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Card, TextField, Button, Checkbox, FormControlLabel, Typography, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Cookies from 'js-cookie';
import qs from 'qs';
import { encrypt } from '@/utils/rsaEncrypt';
import { getCodeImg } from '@/api/login';
import useAuthStore from '@/store/authStore';
import useSettingsStore from '@/store/settingsStore';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  const { showFooter, footerTxt, caseNumber } = useSettingsStore();

  const [form, setForm] = useState({ username: 'admin', password: '123456', code: '', uuid: '', rememberMe: false });
  const [codeUrl, setCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [cookiePass, setCookiePass] = useState('');
  const [errors, setErrors] = useState({});

  const redirect = qs.parse(location.search, { ignoreQueryPrefix: true }).redirect || '/';

  const fetchCode = async () => {
    try {
      const res = await getCodeImg();
      setCodeUrl(res.data.img);
      setForm((f) => ({ ...f, uuid: res.data.uuid }));
    } catch {}
  };

  useEffect(() => {
    fetchCode();
    const username = Cookies.get('username') || '';
    const password = Cookies.get('password') || '';
    const rememberMe = Cookies.get('rememberMe');
    setCookiePass(password);
    setForm({
      username: username || 'admin',
      password: password || '123456',
      code: '',
      uuid: '',
      rememberMe: rememberMe === 'true',
    });
    if (Cookies.get('point')) {
      // Will be handled via snackbar
      Cookies.remove('point');
    }
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.username) errs.username = '用户名不能为空';
    if (!form.password) errs.password = '密码不能为空';
    if (!form.code) errs.code = '验证码不能为空';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    let password = form.password;
    if (password !== cookiePass) {
      password = encrypt(password);
    }
    if (form.rememberMe) {
      Cookies.set('username', form.username, { expires: 1 });
      Cookies.set('password', password, { expires: 1 });
      Cookies.set('rememberMe', 'true', { expires: 1 });
    } else {
      Cookies.remove('username');
      Cookies.remove('password');
      Cookies.remove('rememberMe');
    }
    try {
      await login({ ...form, password });
      navigate(redirect, { replace: true });
    } catch {
      fetchCode();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)',
        position: 'relative',
      }}
    >
      <Card sx={{ width: 385, p: 3, bgcolor: '#161B22', border: '1px solid #30363D' }}>
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 600, color: '#E6EDF3' }}>
          商城后台管理系统
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            placeholder="账号"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            error={!!errors.username}
            helperText={errors.username}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: '#8B949E', fontSize: 18 }} /></InputAdornment>,
            }}
          />
          <TextField
            fullWidth
            type="password"
            placeholder="密码"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: '#8B949E', fontSize: 18 }} /></InputAdornment>,
            }}
          />
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              placeholder="验证码"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              error={!!errors.code}
              helperText={errors.code}
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><VpnKeyIcon sx={{ color: '#8B949E', fontSize: 18 }} /></InputAdornment>,
              }}
            />
            <Box onClick={fetchCode} sx={{ cursor: 'pointer', height: 40, borderRadius: 1, overflow: 'hidden', border: '1px solid #30363D' }}>
              {codeUrl && <img src={codeUrl} alt="验证码" style={{ height: '100%' }} />}
            </Box>
          </Box>
          <FormControlLabel
            control={<Checkbox checked={form.rememberMe} onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
              sx={{ color: '#8B949E', '&.Mui-checked': { color: '#58A6FF' } }} />}
            label="记住我"
            sx={{ mb: 2, color: '#8B949E', fontSize: 13 }}
          />
          <Button type="submit" variant="contained" fullWidth disabled={loading}
            sx={{ height: 40, fontWeight: 600 }}>
            {loading ? '登录中...' : '登 录'}
          </Button>
        </Box>
      </Card>
      {showFooter && (
        <Box sx={{ position: 'absolute', bottom: 16, color: '#8B949E', fontSize: 12, textAlign: 'center' }}>
          <span dangerouslySetInnerHTML={{ __html: footerTxt }} />
          {caseNumber && <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" style={{ color: '#8B949E' }}>{caseNumber}</a>}
        </Box>
      )}
    </Box>
  );
}
```

---

### Task 15: 首页仪表盘

**Files:**
- Create: `D:\github_project\mall\mall_web\src\pages\Dashboard.jsx`
- Create: `D:\github_project\mall\mall_web\src\api\data.js`

- [ ] **Step 1: 创建 API data.js**

```js
import request from '@/utils/request';

export function initData(url, params) {
  return request({ url, method: 'post', data: params });
}

export function download(url, params) {
  return request({ url, method: 'post', data: params, responseType: 'blob' });
}
```

- [ ] **Step 2: 创建 Dashboard.jsx（ECharts 面板）**

```jsx
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const lineData = {
  newVisitis: { expected: [100, 120, 161, 134, 105, 160, 165], actual: [120, 82, 91, 154, 162, 140, 145] },
  messages: { expected: [200, 192, 120, 144, 160, 130, 140], actual: [180, 160, 151, 106, 145, 150, 130] },
  purchases: { expected: [80, 100, 121, 104, 105, 90, 100], actual: [120, 90, 100, 138, 142, 130, 130] },
  shoppings: { expected: [130, 140, 141, 142, 145, 150, 160], actual: [120, 82, 91, 154, 162, 140, 130] },
};

const statCards = [
  { label: '访问量', value: '12,345', icon: <TrendingUpIcon />, color: '#58A6FF' },
  { label: '消息', value: '2,340', icon: <PeopleIcon />, color: '#3FB950' },
  { label: '订单', value: '856', icon: <ShoppingCartIcon />, color: '#D29922' },
  { label: '交易额', value: '¥56,789', icon: <AttachMoneyIcon />, color: '#F85149' },
];

export default function Dashboard() {
  const [chartType, setChartType] = useState('newVisitis');
  const d = lineData[chartType];

  const lineOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['预期', '实际'], textStyle: { color: '#8B949E' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], axisLine: { lineStyle: { color: '#30363D' } } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#21262D' } } },
    series: [
      { name: '预期', type: 'line', data: d.expected, smooth: true, lineStyle: { color: '#58A6FF' }, itemStyle: { color: '#58A6FF' } },
      { name: '实际', type: 'line', data: d.actual, smooth: true, lineStyle: { color: '#3FB950' }, itemStyle: { color: '#3FB950' } },
    ],
  };

  const pieOption = {
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie', radius: ['40%', '70%'],
      data: [
        { value: 335, name: '订单' }, { value: 310, name: '用户' }, { value: 234, name: '商品' }, { value: 135, name: '其他' },
      ],
      label: { color: '#8B949E' },
    }],
  };

  const barOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], axisLine: { lineStyle: { color: '#30363D' } } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#21262D' } } },
    series: [{ type: 'bar', data: [120, 200, 150, 80, 70], itemStyle: { color: '#58A6FF', borderRadius: [4, 4, 0, 0] } }],
  };

  const radarOption = {
    radar: { indicator: [{ name: '销售' }, { name: '管理' }, { name: '技术' }, { name: '客服' }, { name: '研发' }] },
    series: [{ type: 'radar', data: [{ value: [80, 90, 70, 85, 95], areaStyle: { color: 'rgba(88,166,255,0.2)' } }], itemStyle: { color: '#58A6FF' } }],
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {statCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '16px !important' }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: card.color + '20', color: card.color }}>
                  {card.icon}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">{card.label}</Typography>
                  <Typography variant="h6" fontWeight={700} color="text.primary">{card.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        {Object.keys(lineData).map((k) => (
          <Box key={k} onClick={() => setChartType(k)}
            sx={{ px: 1.5, py: 0.5, fontSize: 12, borderRadius: 1, cursor: 'pointer',
              bgcolor: chartType === k ? 'rgba(88,166,255,0.16)' : 'transparent',
              color: chartType === k ? '#58A6FF' : '#8B949E',
              border: `1px solid ${chartType === k ? '#58A6FF' : '#30363D'}` }}>
            {k === 'newVisitis' ? '访问量' : k === 'messages' ? '消息' : k === 'purchases' ? '交易' : '购物'}
          </Box>
        ))}
      </Box>

      <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D', mb: 2 }}>
        <CardContent><ReactECharts option={lineOption} style={{ height: 350 }} /></CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D' }}>
            <CardContent><Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>雷达图</Typography>
              <ReactECharts option={radarOption} style={{ height: 280 }} /></CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D' }}>
            <CardContent><Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>饼图</Typography>
              <ReactECharts option={pieOption} style={{ height: 280 }} /></CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D' }}>
            <CardContent><Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>柱状图</Typography>
              <ReactECharts option={barOption} style={{ height: 280 }} /></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
```

---

## Phase 6-18: 业务模块页面

### 通用 CRUD 页面模板

以下所有 CRUD 页面遵循统一模板。以 Brand（品牌管理）为例：

```jsx
// 文件: src/pages/mall/Brand.jsx
import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import mallBrandApi from '@/api/mall/brand';

const defaultForm = { id: null, name: '' };

export default function Brand() {
  const crud = useCrud({
    title: '品牌',
    url: '/v1/brand/searchByPage',
    crudMethod: mallBrandApi,
    defaultForm,
  });

  const columns = [
    { label: '系统编号', prop: 'id' },
    { label: '品牌名称', prop: 'name' },
    { label: '创建人ID', prop: 'createUserId' },
    { label: '创建人名称', prop: 'createUserName' },
    { label: '创建日期', prop: 'createTime', render: (v) => v ? new Date(v).toLocaleString('zh-CN') : '-' },
  ];

  const handleSubmit = () => {
    if (crud.addStatus === crud.STATUS.PREPARED) crud.doAdd();
    else if (crud.editStatus === crud.STATUS.PREPARED) crud.doEdit();
  };

  return (
    <Box sx={{ p: 1 }}>
      <CrudToolbar
        onSearch={crud.toQuery}
        onRefresh={crud.refresh}
        onAdd={crud.toAdd}
        onDelete={crud.doDelete}
        selections={crud.selections}
        renderSearch={() => (
          <TextField
            size="small"
            placeholder="输入品牌名称搜索"
            value={crud.query.name || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, name: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()}
            sx={{ width: 200 }}
          />
        )}
      />

      <CrudTable
        columns={columns}
        data={crud.data}
        loading={crud.loading}
        selections={crud.selections}
        onSelectionChange={crud.setSelections}
        onEdit={crud.toEdit}
        onDelete={crud.doDelete}
      />

      <CrudPagination
        pageNo={crud.pageNo}
        pageSize={crud.pageSize}
        totalCount={crud.totalCount}
        onPageChange={crud.setPageNo}
        onSizeChange={crud.setPageSize}
      />

      <CrudDialog
        open={crud.dialogOpen}
        title={crud.dialogTitle}
        onClose={crud.cancelCU}
        onSubmit={handleSubmit}
        submitting={crud.submitting}
      >
        <TextField
          fullWidth
          label="品牌名称"
          value={crud.form.name || ''}
          onChange={(e) => crud.setForm({ ...crud.form, name: e.target.value })}
          required
          sx={{ minWidth: 300 }}
        />
      </CrudDialog>
    </Box>
  );
}
```

### Task 16: Mall 商城管理模块 (11 个页面 API + 页面)

**API Files to Create:**
- `src/api/mall/brand.js`
- `src/api/mall/category.js`
- `src/api/mall/product.js`
- `src/api/mall/attribute.js`
- `src/api/mall/attributeValue.js`
- `src/api/mall/unit.js`
- `src/api/mall/productGroup.js`
- `src/api/mall/indexCarouselImage.js`
- `src/api/mall/indexNotice.js`
- `src/api/mall/indexProduct.js`

每个 API 文件格式（以 brand.js 为例）：

```js
import request from '@/utils/request';

export function getPage(params) {
  return request({ url: '/v1/brand/searchByPage', method: 'post', data: params });
}

export function add(data) {
  return request({ url: 'v1/brand/insert', method: 'post', data });
}

export function del(ids) {
  return request({ url: 'v1/brand/deleteByIds', method: 'post', data: ids });
}

export function edit(data) {
  return request({ url: 'v1/brand/update', method: 'post', data });
}

export default { getPage, add, edit, del };
```

**Pages to Create (按 CRUD 模板):**

- [ ] `src/pages/mall/Brand.jsx` — 品牌管理，字段: id, name, createUserId, createUserName, createTime。表单: name。API: `/v1/brand`
- [ ] `src/pages/mall/Category.jsx` — 分类管理，树形选择。字段: id, name, parentId, leavel, sort, createTime。表单: name, parentId(树形), sort
- [ ] `src/pages/mall/Product.jsx` — 商品管理。字段: id, name, categoryId, brandId, unitId, quantity, price, productGroupId, status, createTime。表单: 多字段含分类树形选择、品牌下拉、单位下拉
- [ ] `src/pages/mall/Attribute.jsx` — 属性管理。字段: id, name, productGroupId, sort, createTime。表单: name, productGroupId
- [ ] `src/pages/mall/AttributeValue.jsx` — 属性值管理。字段: id, attributeId, name, sort, createTime
- [ ] `src/pages/mall/Unit.jsx` — 单位管理。字段: id, name, createTime。表单: name
- [ ] `src/pages/mall/ProductGroup.jsx` — 商品组管理。字段: id, name, status, createTime。表单: name, status(switch)
- [ ] `src/pages/mall/IndexCarouselImage.jsx` — 轮播图管理。字段: id, name, url, status, sort, createTime。表单含图片上传
- [ ] `src/pages/mall/IndexNotice.jsx` — 公告管理。字段: id, title, content, status, createTime。表单含富文本
- [ ] `src/pages/mall/IndexProduct.jsx` — 首页推荐商品。字段: id, productId, sort, createTime。表单: productId, sort

### Task 17: Marketing 营销管理 (4 个页面 API + 页面)

**API Files:**
- `src/api/marketing/coupon.js`
- `src/api/marketing/couponUserProvide.js`
- `src/api/marketing/couponUserReceive.js`
- `src/api/marketing/seckillProduct.js`

**Pages:**
- [ ] `src/pages/marketing/Coupon.jsx` — 优惠券管理。字段: id, name, type, totalCount, leftCount, value, minPoint, startTime, endTime。表单含日期选择器
- [ ] `src/pages/marketing/CouponUserProvide.jsx` — 用户发放记录。字段: id, userId, couponId, status, createTime
- [ ] `src/pages/marketing/CouponUserReceive.jsx` — 用户领取记录。字段: id, userId, couponId, status, createTime
- [ ] `src/pages/marketing/Seckill.jsx` — 秒杀管理。字段: id, productId, seckillPrice, stockCount, startDate, endDate, status。表单含商品选择弹窗

### Task 18: Order 订单管理 (2 个页面)

**API Files:**
- `src/api/order/trade.js`
- `src/api/order/tradeDeliveryAddress.js`

**Pages:**
- [ ] `src/pages/order/Trade.jsx` — 交易订单。字段: id, orderSn, userId, actualPrice, payType, status, payTime, createTime
- [ ] `src/pages/order/TradeDeliveryAddress.jsx` — 订单收货地址。字段: id, tradeId, consignee, phone, address, createTime

### Task 19: Shopping 购物相关 (5 个页面)

**API Files:**
- `src/api/shopping/deliveryAddress.js`
- `src/api/shopping/productComment.js`
- `src/api/shopping/productFavorites.js`
- `src/api/shopping/productViewRecord.js`
- `src/api/shopping/shoppingCart.js`

**Pages:**
- [ ] `src/pages/shopping/DeliveryAddress.jsx`
- [ ] `src/pages/shopping/ProductComment.jsx`
- [ ] `src/pages/shopping/ProductFavorites.jsx`
- [ ] `src/pages/shopping/ProductViewRecord.jsx`
- [ ] `src/pages/shopping/ShoppingCart.jsx`

### Task 20: Aftersale 售后 (1 个页面)

**API Files:**
- `src/api/aftersale/refund.js`

**Pages:**
- [ ] `src/pages/aftersale/Refund.jsx` — 退款管理。字段: id, tradeId, userId, refundAmount, status, reason, createTime

### Task 21: System 系统管理 (7 个页面)

**API Files:**
- `src/api/system/user.js`
- `src/api/system/role.js`
- `src/api/system/menu.js`
- `src/api/system/dept.js`
- `src/api/system/dict.js`
- `src/api/system/dictDetail.js`
- `src/api/system/job.js`
- `src/api/system/timing.js`

**Pages:**
- [ ] `src/pages/system/User.jsx` — 用户管理。左侧部门树 + 右侧用户表格。字段: userId, userName, nickName, phone, email, deptId, validStatus, createTime
- [ ] `src/pages/system/Role.jsx` — 角色管理。字段: id, name, remark, dataScope, createTime。表单含菜单权限树形选择
- [ ] `src/pages/system/Menu.jsx` — 菜单管理（树形表格）。字段: id, name, path, component, icon, sort, hidden, createTime。表单含图标选择器
- [ ] `src/pages/system/Dept.jsx` — 部门管理（树形表格）。字段: id, name, parentId, sort, createTime
- [ ] `src/pages/system/Dict.jsx` — 字典管理。字段: id, name, description, createTime
- [ ] `src/pages/system/DictDetail.jsx` — 字典详情。字段: id, dictId, label, value, sort, createTime
- [ ] `src/pages/system/Job.jsx` — 岗位管理。字段: id, name, sort, createTime
- [ ] `src/pages/system/Timing.jsx` — 定时任务管理。字段: id, beanName, methodName, params, cron, status, createTime
- [ ] `src/pages/system/UserCenter.jsx` — 个人中心（信息修改 + 密码修改 + 邮箱修改）

### Task 22: Monitor 监控 (4 个页面)

**API Files:**
- `src/api/monitor/log.js`
- `src/api/monitor/online.js`

**Pages:**
- [ ] `src/pages/monitor/Online.jsx` — 在线用户
- [ ] `src/pages/monitor/Server.jsx` — 服务器监控（系统信息面板）
- [ ] `src/pages/monitor/Sql.jsx` — SQL 监控（Iframe）
- [ ] `src/pages/monitor/Log.jsx` — 操作日志。字段: id, username, ip, method, params, time, createTime
- [ ] `src/pages/monitor/ErrorLog.jsx` — 错误日志
- [ ] `src/pages/monitor/LogSearch.jsx` — 日志搜索（Elasticsearch）

### Task 23: Mnt 运维管理 (5 个页面)

**API Files:**
- `src/api/mnt/app.js`
- `src/api/mnt/database.js`
- `src/api/mnt/deploy.js`
- `src/api/mnt/deployHistory.js`
- `src/api/mnt/serverDeploy.js`
- `src/api/mnt/connect.js`

**Pages:**
- [ ] `src/pages/mnt/App.jsx` — 应用管理
- [ ] `src/pages/mnt/Database.jsx` — 数据库管理
- [ ] `src/pages/mnt/Deploy.jsx` — 部署管理
- [ ] `src/pages/mnt/DeployHistory.jsx` — 部署历史
- [ ] `src/pages/mnt/Server.jsx` — 服务器管理

### Task 24: Tools 工具 (6 个页面)

**API Files:**
- `src/api/tools/alipay.js`
- `src/api/tools/email.js`
- `src/api/tools/localStorage.js`
- `src/api/tools/qiniu.js`

**Pages:**
- [ ] `src/pages/tools/Email.jsx` — 邮件工具
- [ ] `src/pages/tools/AliPay.jsx` — 支付宝配置
- [ ] `src/pages/tools/Storage/Local.jsx` — 本地存储管理
- [ ] `src/pages/tools/Storage/Qiniu.jsx` — 七牛云存储管理
- [ ] `src/pages/tools/Swagger.jsx` — Swagger 文档（Iframe）

### Task 25: Common 通用管理 (6 个页面)

**API Files:**
- `src/api/common/area.js`
- `src/api/common/job.js`
- `src/api/common/jobLog.js`
- `src/api/common/notify.js`
- `src/api/common/photo.js`
- `src/api/common/photoGroup.js`
- `src/api/common/sensitiveWord.js`
- `src/api/common/smsRecord.js`

**Pages:**
- [ ] `src/pages/common/Area.jsx` — 地区管理（树形）
- [ ] `src/pages/common/Job.jsx` — 通用任务
- [ ] `src/pages/common/JobLog.jsx` — 任务日志
- [ ] `src/pages/common/Notify.jsx` — 通知管理
- [ ] `src/pages/common/Photo.jsx` — 图片管理（图片列表 + 分组）
- [ ] `src/pages/common/SensitiveWord.jsx` — 敏感词管理
- [ ] `src/pages/common/SmsRecord.jsx` — 短信记录

### Task 26: Generator 代码生成 (3 个页面)

**API Files:**
- `src/api/generator/generator.js`
- `src/api/generator/genConfig.js`

**Pages:**
- [ ] `src/pages/generator/Index.jsx` — 代码生成器主页（表格 + 预览）
- [ ] `src/pages/generator/Config.jsx` — 代码生成器配置
- [ ] `src/pages/generator/Preview.jsx` — 代码预览

---

## Phase 19: 路由整合与完整流程打通

### Task 27: 路由系统完善

- [ ] 更新 `src/router/index.jsx`，整合所有静态路由 + 动态路由加载
- [ ] 实现路由守卫（AuthGuard 完善），支持 redirect 参数
- [ ] 实现 401/403 错误页面展示
- [ ] 加载 NProgress 路由过渡动画

### Task 28: 最终验证

- [ ] 启动项目，确认 Login → Dashboard → 各模块 CRUD 完整链路可用
- [ ] 确认暗黑主题统一（无白色背景残留）
- [ ] 确认所有 API 请求路径、参数、响应格式与原项目一致
- [ ] 确认路由动态加载（菜单 API → 动态路由注册）
