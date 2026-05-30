import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';

export default function CrudDialog({ open, title, onClose, onSubmit, submitting, children, maxWidth = 'sm' }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth
      slotProps={{ paper: { sx: { bgcolor: '#1C2333', backgroundImage: 'none' } } }}>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle sx={{ color: '#E6EDF3', fontSize: 16 }}>{title}</DialogTitle>
        <DialogContent dividers sx={{ borderColor: '#30363D' }}>
          {children}
        </DialogContent>
        <DialogActions sx={{ p: 1.5 }}>
          <Button onClick={onClose} sx={{ color: '#8B949E' }}>取消</Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? '提交中...' : '确认'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
