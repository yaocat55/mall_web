import { Box, Card, CardContent, Typography } from '@mui/material';

export default function Swagger() {
  return (
    <Box sx={{ p: 1, height: 'calc(100vh - 120px)' }}>
      <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D', height: '100%' }}>
        <CardContent sx={{ height: '100%' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#E6EDF3' }}>Swagger API文档</Typography>
          <Box component="iframe" src="/doc.html" title="Swagger"
            sx={{ width: '100%', height: 'calc(100% - 40px)', border: 'none' }} />
        </CardContent>
      </Card>
    </Box>
  );
}
