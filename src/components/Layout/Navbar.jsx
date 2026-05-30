import { AppBar, Toolbar, IconButton, Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SettingsIcon from '@mui/icons-material/Settings';
import useAuthStore from '@/store/authStore';
import useSettingsStore from '@/store/settingsStore';
import screenfull from 'screenfull';

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
          <Avatar sx={{ width: 32, height: 32, cursor: 'pointer', bgcolor: '#58A6FF', fontSize: 14 }}>
            A
          </Avatar>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          slotProps={{ paper: { sx: { bgcolor: '#1C2333', minWidth: 140, mt: 0.5 } } }}
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
