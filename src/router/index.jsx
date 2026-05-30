import { useRoutes, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import useAuthStore from '@/store/authStore';
import { buildMenus } from '@/api/system/menu';
import { filterAsyncRouter, filterChildren } from './utils';
import { Loadable } from './Loadable';
import useMenuStore from '@/store/menuStore';

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
  { path: '/redirect/:path/*', element: <Redirect /> },
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

function AuthGuard({ children }) {
  const token = getToken();
  const location = useLocation();
  if (!token && location.pathname !== '/login') {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }
  return children;
}

function useDynamicRoutes(setRoutesReady) {
  const [dynamicRoutes, setDynamicRoutes] = useState([]);
  const { token, roles, getInfo, logout } = useAuthStore();

  useEffect(() => {
    if (!token) {
      setRoutesReady(true);
      return;
    }
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
    try {
      const res = await buildMenus();
      const data = res.data;
      const cloned = JSON.parse(JSON.stringify(data));
      useMenuStore.getState().setMenuTree(filterChildren(cloned));
      const rewriteRoutes = filterAsyncRouter(JSON.parse(JSON.stringify(data)), false, true);
      setDynamicRoutes(rewriteRoutes);
    } catch {
      // Dynamic menu loading may fail if API is not ready
    } finally {
      setRoutesReady(true);
    }
  };

  return dynamicRoutes;
}

export default function AppRouter() {
  const [routesReady, setRoutesReady] = useState(false);
  const dynamicRoutes = useDynamicRoutes(setRoutesReady);
  const location = useLocation();

  const mergedRoutes = useMemo(() => {
    let routes = staticRoutes.map((route) => {
      if (route.path === '/' && dynamicRoutes.length > 0) {
        return {
          ...route,
          children: [...route.children, ...dynamicRoutes],
        };
      }
      return route;
    });
    // 动态路由未加载完时不暴露 404 通配, 避免闪现
    if (!routesReady) {
      routes = routes.filter((r) => r.path !== '*');
    }
    return routes;
  }, [dynamicRoutes, routesReady]);

  const element = useRoutes(mergedRoutes);

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 150);
    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname]);

  return <AuthGuard>{element}</AuthGuard>;
}
