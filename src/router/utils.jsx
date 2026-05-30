import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { getPageComponent } from './componentMap';

function makeRelative(path) {
  if (!path) return path;
  return path.startsWith('/') ? path.replace(/^\//, '') : path;
}

export function filterChildren(childrenMap) {
  const children = [];
  childrenMap.forEach((el) => {
    if (el.path) el.path = makeRelative(el.path);
    if (el.redirect) el.redirect = makeRelative(el.redirect);
    if (el.children && el.children.length) {
      el.children = filterChildren(el.children);
    }
    children.push(el);
  });
  return children;
}

export function filterAsyncRouter(routes, lastRouter = false, isRewrite = false) {
  const res = [];
  routes.forEach((route) => {
    if (route.hidden) return;

    const path = isRewrite ? makeRelative(route.path) : route.path;
    const tmp = { path, meta: route.meta };

    if (route.component) {
      if (route.component === 'Layout') {
        let children = route.children;
        if (isRewrite && children) {
          children = filterChildren(children);
        }
        const childRoutes = children
          ? filterAsyncRouter(children, route, isRewrite)
          : [];
        if (childRoutes.length > 0) {
          const first = route.children?.find(c => !c.hidden);
          const firstPath = first ? makeRelative(first.path) : '';
          tmp.children = [
            { index: true, element: <Navigate to={firstPath} replace /> },
            ...childRoutes,
          ];
        } else {
          return; // Layout with no children, skip
        }
      } else {
        const Page = getPageComponent(route.component);
        if (Page) {
          tmp.element = <Suspense fallback={null}><Page /></Suspense>;
        }
      }
    }

    if (route.redirect) {
      tmp.children = [
        ...(tmp.children || []),
        { path: '', element: <Navigate to={makeRelative(route.redirect)} replace /> },
      ];
    }

    if (route.children && route.component !== 'Layout') {
      let children = route.children;
      if (isRewrite) {
        children = filterChildren(children);
      }
      tmp.children = [
        ...(tmp.children || []),
        ...filterAsyncRouter(children, route, isRewrite),
      ];
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
