import { Drawer, List, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAppStore from '@/store/appStore';
import useMenuStore from '@/store/menuStore';
import Logo from './Logo';
import SidebarItem from './SidebarItem';

const DRAWER_WIDTH = 220;
const COLLAPSED_WIDTH = 64;

export default function Sidebar({ drawerWidth, isMobile }) {
  const { sidebar, closeSideBar } = useAppStore();
  const menuTree = useMenuStore((state) => state.menuTree);
  const navigate = useNavigate();
  const opened = sidebar.opened;

  const menuItems = [
    { path: '/dashboard', meta: { title: '首页', icon: 'index' } },
    ...menuTree,
  ];

  const handleLeafClick = (path) => {
    navigate(path.startsWith('/') ? path : `/${path}`);
    if (isMobile) closeSideBar({ withoutAnimation: false });
  };

  const sideBg = 'linear-gradient(180deg, #1c2235 0%, #1e2438 40%, #1b2232 100%)';

  const drawerContent = (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: sideBg,
      borderRight: '1px solid rgba(255,255,255,0.05)',
    }}>
      <Logo collapsed={!opened} />
      <List sx={{ flexGrow: 1, overflow: 'auto', px: 1, py: 0.5 }}>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            basePath={item.path}
            collapsed={!opened}
            onLeafClick={handleLeafClick}
            depth={0}
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
        PaperProps={{ sx: { width: DRAWER_WIDTH, background: sideBg, backgroundImage: 'none' } }}
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
      }}
    >
      {drawerContent}
    </Box>
  );
}
