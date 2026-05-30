import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function AppMain() {
  return (
    <Box sx={{ p: 2, minHeight: 'calc(100vh - 100px)' }}>
      <Outlet />
    </Box>
  );
}
