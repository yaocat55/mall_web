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
