import { ListItemButton, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Dashboard, Store, ShoppingCart, LocalOffer, Receipt,
  People, Security, Settings, Monitor, Storage, Build,
  Email, Payment, Terrain, Photo, Category, ViewCarousel,
  ExpandMore,
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

export default function SidebarItem({ item, basePath, collapsed, onLeafClick, depth = 0 }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  if (item.hidden) return null;

  const hasChildren = item.children && item.children.length > 0;
  const Icon = iconMap[item.meta?.icon] || Dashboard;
  const fullPath = basePath.startsWith('/') ? basePath : `/${basePath}`;
  const isActive = location.pathname === fullPath;

  if (hasChildren) {
    return (
      <>
        <ListItemButton
          onClick={() => setOpen(!open)}
          sx={{
            minHeight: 40,
            borderRadius: 1.5,
            mb: 0.3,
            color: open ? '#c8d6e5' : '#8B949E',
            background: open
              ? 'linear-gradient(135deg, rgba(88,166,255,0.08) 0%, rgba(88,166,255,0.03) 100%)'
              : 'transparent',
            '&:hover': {
              color: '#E6EDF3',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: 'inherit', justifyContent: 'center' }}>
            <Icon sx={{ fontSize: 20 }} />
          </ListItemIcon>
          {!collapsed && (
            <>
              <ListItemText primary={item.meta?.title}
                sx={{ '& .MuiListItemText-primary': { fontSize: 14, fontWeight: 500 } }} />
              <ExpandMore
                sx={{
                  fontSize: 16,
                  opacity: 0.4,
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              />
            </>
          )}
        </ListItemButton>
        <Collapse in={open} timeout={200} unmountOnExit>
          <List disablePadding sx={{ pl: collapsed ? 0 : 1.5, mb: 0.5 }}>
            {item.children.filter(c => !c.hidden).map((child) => (
              <SidebarItem
                key={child.path}
                item={child}
                basePath={`${basePath}/${child.path.replace(/^\//, '')}`}
                collapsed={collapsed}
                onLeafClick={onLeafClick}
                depth={depth + 1}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemButton
      onClick={() => onLeafClick && onLeafClick(fullPath)}
      sx={{
        borderRadius: 1.5,
        mb: 0.3,
        minHeight: 40,
        position: 'relative',
        color: isActive ? '#E6EDF3' : '#8B949E',
        background: isActive
          ? 'linear-gradient(135deg, rgba(88,166,255,0.12) 0%, rgba(88,166,255,0.06) 100%)'
          : 'transparent',
        '&:hover': {
          color: '#E6EDF3',
          background: isActive
            ? 'linear-gradient(135deg, rgba(88,166,255,0.16) 0%, rgba(88,166,255,0.08) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
        },
        '&::before': isActive ? {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 8,
          bottom: 8,
          width: 3,
          borderRadius: '0 3px 3px 0',
          background: 'linear-gradient(180deg, #58A6FF 0%, #3B82F6 100%)',
        } : undefined,
      }}
    >
      <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: 'inherit', justifyContent: 'center' }}>
        <Icon sx={{ fontSize: 20 }} />
      </ListItemIcon>
      {!collapsed && (
        <ListItemText primary={item.meta?.title}
          sx={{ '& .MuiListItemText-primary': { fontSize: 13 } }} />
      )}
    </ListItemButton>
  );
}
