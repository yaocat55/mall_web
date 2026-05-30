import { Box, Card, CardContent, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { getOnlineUsers } from '@/api/monitor/online';
import CrudTable from '@/components/Crud/CrudTable';

export default function Online() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOnlineUsers()
      .then((res) => {
        setData(res.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { label: '用户名', prop: 'userName' },
    { label: 'IP', prop: 'ip' },
    {
      label: '登录时间',
      prop: 'loginTime',
      render: (v) => (v ? new Date(v).toLocaleString('zh-CN') : '-'),
    },
    { label: '部门', prop: 'dept' },
  ];

  return (
    <Box sx={{ p: 1 }}>
      <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: '#E6EDF3' }}>
            在线用户
          </Typography>
          <CrudTable
            columns={columns}
            data={data}
            loading={loading}
            selections={[]}
            showSelect={false}
            showActions={false}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
