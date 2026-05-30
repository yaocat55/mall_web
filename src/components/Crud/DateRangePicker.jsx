import { Box, Chip } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FMT = 'YYYY-MM-DD HH:mm:ss';

function today() { return dayjs().startOf('day'); }

const shortcuts = [
  { label: '今天', get: () => [today(), dayjs().endOf('day')] },
  { label: '昨天', get: () => [today().subtract(1, 'day'), today().subtract(1, 'day').endOf('day')] },
  { label: '本周', get: () => [today().startOf('week'), dayjs().endOf('day')] },
  { label: '本月', get: () => [today().startOf('month'), dayjs().endOf('day')] },
  { label: '最近30天', get: () => [today().subtract(30, 'day'), dayjs().endOf('day')] },
];

export default function DateRangePicker({ value = [], onChange, size = 'small' }) {
  const startVal = value[0] ? dayjs(value[0]) : null;
  const endVal = value[1] ? dayjs(value[1]) : null;

  const handleStart = (v) => onChange?.([v ? v.format(FMT) : '', value[1] || '']);
  const handleEnd = (v) => onChange?.([value[0] || '', v ? v.format(FMT) : '']);
  const handleShortcut = (s) => onChange?.(s.get().map((d) => d.format(FMT)));
  const handleClear = () => onChange?.([]);

  const slotProps = {
    textField: {
      size,
      sx: {
        width: 185,
        '& .MuiOutlinedInput-root': { bgcolor: '#21262D', fontSize: 13 },
        '& input': { color: '#E6EDF3' },
        '& .MuiSvgIcon-root': { color: '#8B949E' },
      },
    },
    layout: { sx: { bgcolor: '#161B22', '& .MuiTypography-root, & .MuiPickersDay-root': { color: '#E6EDF3' } } },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
        <DateTimePicker
          value={startVal}
          onChange={handleStart}
          slotProps={slotProps}
          format="YYYY-MM-DD HH:mm"
          ampm={false}
        />
        <Box sx={{ color: '#8B949E', fontSize: 12, mx: 0.25 }}>:</Box>
        <DateTimePicker
          value={endVal}
          onChange={handleEnd}
          slotProps={slotProps}
          format="YYYY-MM-DD HH:mm"
          ampm={false}
        />
        {shortcuts.map((s) => (
          <Chip
            key={s.label}
            label={s.label}
            size="small"
            onClick={() => handleShortcut(s)}
            sx={{ color: '#8B949E', bgcolor: '#21262D', fontSize: 11, cursor: 'pointer', '&:hover': { color: '#E6EDF3', bgcolor: '#30363D' } }}
          />
        ))}
        {(value[0] || value[1]) && (
          <Chip label="清除" size="small" onDelete={handleClear} onClick={handleClear}
            sx={{ color: '#F85149', bgcolor: '#21262D', fontSize: 11, cursor: 'pointer' }} />
        )}
      </Box>
    </LocalizationProvider>
  );
}
