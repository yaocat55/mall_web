import { Box, TextField, Button, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import DateRangePicker from './DateRangePicker';

export default function CrudToolbar({
  onSearch, onRefresh, onAdd, onDelete, onExport,
  showAdd = true, showDelete = true, showExport = true,
  showDateRange = false,
  selections = [], searchPlaceholder = '输入关键字搜索',
  query, setQuery,
  renderSearch,
  renderExtra,
}) {
  const [showSearch, setShowSearch] = useState(true);

  const betweenTime = query?.betweenTime || [];

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
        <Tooltip title="搜索">
          <IconButton size="small" onClick={() => setShowSearch(!showSearch)}
            sx={{ color: showSearch ? '#58A6FF' : '#8B949E' }}>
            <SearchIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {showSearch && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            {renderSearch ? renderSearch() : (
              <TextField
                size="small"
                placeholder={searchPlaceholder}
                onKeyDown={(e) => e.key === 'Enter' && onSearch?.()}
                sx={{ width: 200, '& .MuiOutlinedInput-root': { bgcolor: '#21262D' } }}
              />
            )}
            {showDateRange && setQuery && (
              <DateRangePicker
                value={betweenTime}
                onChange={(v) => setQuery({ ...query, betweenTime: v.length ? v : undefined })}
              />
            )}
            <Button size="small" variant="contained" onClick={onSearch}>搜索</Button>
            <Button size="small" onClick={onRefresh}
              sx={{ color: '#8B949E' }}>重置</Button>
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {showAdd && (
          <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={onAdd}>新增</Button>
        )}
        {showDelete && (
          <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />}
            disabled={!selections || selections.length === 0} onClick={() => onDelete?.(selections)}>删除</Button>
        )}
        {showExport && (
          <Button size="small" variant="outlined" startIcon={<DownloadIcon />}
            onClick={onExport} sx={{ borderColor: '#30363D', color: '#8B949E' }}>导出</Button>
        )}
        {renderExtra && renderExtra()}
      </Box>
    </Box>
  );
}
