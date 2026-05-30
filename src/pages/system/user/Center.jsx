import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import useAuthStore from '@/store/authStore';
import { updatePass } from '@/api/system/user';

export default function Center() {
  const { user } = useAuthStore();
  const [passForm, setPassForm] = useState({ oldPass: '', newPass: '', confirmPass: '' });

  const handleUpdatePass = async () => {
    if (passForm.newPass !== passForm.confirmPass) return;
    try {
      await updatePass(passForm);
      alert('密码修改成功');
    } catch {}
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600 }}>
      <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D', mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: '#E6EDF3' }}>个人信息</Typography>
          <Typography color="text.secondary">用户名: {user}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ bgcolor: '#161B22', border: '1px solid #30363D' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: '#E6EDF3' }}>修改密码</Typography>
          <TextField fullWidth type="password" label="旧密码" value={passForm.oldPass}
            onChange={(e) => setPassForm({ ...passForm, oldPass: e.target.value })} sx={{ mb: 1.5 }} />
          <TextField fullWidth type="password" label="新密码" value={passForm.newPass}
            onChange={(e) => setPassForm({ ...passForm, newPass: e.target.value })} sx={{ mb: 1.5 }} />
          <TextField fullWidth type="password" label="确认密码" value={passForm.confirmPass}
            onChange={(e) => setPassForm({ ...passForm, confirmPass: e.target.value })} sx={{ mb: 2 }} />
          <Button variant="contained" onClick={handleUpdatePass}>修改密码</Button>
        </CardContent>
      </Card>
    </Box>
  );
}
