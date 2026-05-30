import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Card, TextField, Button, Checkbox, FormControlLabel, Typography, InputAdornment, Link } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Cookies from 'js-cookie';
import qs from 'qs';
import { encrypt } from '@/utils/rsaEncrypt';
import { getCodeImg } from '@/api/login';
import useAuthStore from '@/store/authStore';
import useSettingsStore from '@/store/settingsStore';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginAction = useAuthStore((s) => s.login);
  const { showFooter, footerTxt, caseNumber } = useSettingsStore();

  const [form, setForm] = useState({ username: 'admin', password: '123456', code: '', uuid: '', rememberMe: false });
  const [codeUrl, setCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [cookiePass, setCookiePass] = useState('');
  const [errors, setErrors] = useState({});

  const redirect = qs.parse(location.search, { ignoreQueryPrefix: true }).redirect || '/dashboard';

  const fetchCode = async () => {
    try {
      const res = await getCodeImg();
      setCodeUrl(res.data.img);
      setForm((f) => ({ ...f, uuid: res.data.uuid }));
    } catch {}
  };

  useEffect(() => {
    fetchCode();
    const username = Cookies.get('username') || '';
    const password = Cookies.get('password') || '';
    const rememberMe = Cookies.get('rememberMe');
    setCookiePass(password);
    setForm({
      username: username || 'admin',
      password: password || '123456',
      code: '',
      uuid: '',
      rememberMe: rememberMe === 'true',
    });
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.username) errs.username = '用户名不能为空';
    if (!form.password) errs.password = '密码不能为空';
    if (!form.code) errs.code = '验证码不能为空';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    let password = form.password;
    if (password !== cookiePass) {
      password = encrypt(password);
    }
    if (form.rememberMe) {
      Cookies.set('username', form.username, { expires: 1 });
      Cookies.set('password', password, { expires: 1 });
      Cookies.set('rememberMe', 'true', { expires: 1 });
    } else {
      Cookies.remove('username');
      Cookies.remove('password');
      Cookies.remove('rememberMe');
    }
    try {
      await loginAction({ ...form, password });
      navigate(redirect, { replace: true });
    } catch {
      fetchCode();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)',
        position: 'relative',
      }}
    >
      <Card sx={{ width: 385, p: 3, bgcolor: '#161B22', border: '1px solid #30363D' }}>
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 600, color: '#E6EDF3' }}>
          商城后台管理系统
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            placeholder="账号"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            error={!!errors.username}
            helperText={errors.username}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: '#8B949E', fontSize: 18 }} /></InputAdornment>,
            }}
          />
          <TextField
            fullWidth
            type="password"
            placeholder="密码"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: '#8B949E', fontSize: 18 }} /></InputAdornment>,
            }}
          />
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              placeholder="验证码"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              error={!!errors.code}
              helperText={errors.code}
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><VpnKeyIcon sx={{ color: '#8B949E', fontSize: 18 }} /></InputAdornment>,
              }}
            />
            <Box onClick={fetchCode} sx={{ cursor: 'pointer', height: 40, borderRadius: 1, overflow: 'hidden', border: '1px solid #30363D', flexShrink: 0 }}>
              {codeUrl && <Box component="img" src={codeUrl} alt="验证码" sx={{ height: '100%' }} />}
            </Box>
          </Box>
          <FormControlLabel
            control={<Checkbox checked={form.rememberMe} onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
              sx={{ color: '#8B949E', '&.Mui-checked': { color: '#58A6FF' } }} />}
            label="记住我"
            sx={{ mb: 2, color: '#8B949E', fontSize: 13 }}
          />
          <Button type="submit" variant="contained" fullWidth disabled={loading}
            sx={{ height: 40, fontWeight: 600 }}>
            {loading ? '登录中...' : '登 录'}
          </Button>
        </Box>
      </Card>
      {showFooter && (
        <Box sx={{ position: 'absolute', bottom: 16, color: '#8B949E', fontSize: 12, textAlign: 'center' }}>
          <Typography variant="caption" component="span" dangerouslySetInnerHTML={{ __html: footerTxt }} />
          {caseNumber && ' ⋅ '}
          {caseNumber && <Link href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" underline="hover" color="#8B949E">{caseNumber}</Link>}
        </Box>
      )}
    </Box>
  );
}
