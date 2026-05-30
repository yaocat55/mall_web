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
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: '100vh',
          minWidth: 0,
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
