import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import request from '@/utils/request';

export default function Server() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    request({ url: '/v1/server', method: 'get' }).then((res) =>
      setInfo(res.data || {})
    );
  }, []);

  return (
    <Box sx={{ p: 1 }}>
      <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: '#E6EDF3' }}>
            服务器监控
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(info).map(([k, v]) => (
              <Grid item xs={12} sm={6} md={4} key={k}>
                <Typography color="text.secondary">{k}</Typography>
                <Typography color="text.primary">{String(v)}</Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
