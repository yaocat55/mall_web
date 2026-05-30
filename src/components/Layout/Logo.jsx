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
        background: 'linear-gradient(180deg, rgba(88,166,255,0.06) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <StoreIcon sx={{ color: '#58A6FF', fontSize: 26 }} />
      {!collapsed && (
        <Typography
          variant="h6"
          noWrap
          sx={{
            ml: 1.2,
            fontSize: 14,
            fontWeight: 700,
            color: '#c8d6e5',
            letterSpacing: 0.5,
          }}
        >
          商城管理
        </Typography>
      )}
    </Box>
  );
}
