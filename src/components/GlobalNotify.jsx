import { useState, useEffect, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function GlobalNotify() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [severity, setSeverity] = useState('error');

  const handleEvent = useCallback((e) => {
    setMsg(e.detail.message);
    setSeverity(e.detail.type || 'error');
    setOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener('global-notify', handleEvent);
    return () => window.removeEventListener('global-notify', handleEvent);
  }, [handleEvent]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={severity}
        variant="filled"
        sx={{ minWidth: 280, '& .MuiAlert-icon': { alignItems: 'center' } }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}
