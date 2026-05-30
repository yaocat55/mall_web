import { Box, Pagination, FormControl, Select, MenuItem, Typography } from '@mui/material';

export default function CrudPagination({ pageNo, pageSize, totalCount, onPageChange, onSizeChange }) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5, mt: 2 }}>
      <Typography variant="body2" color="text.secondary">共 {totalCount} 条</Typography>
      <FormControl size="small">
        <Select value={pageSize} onChange={(e) => onSizeChange?.(e.target.value)}
          sx={{ '& .MuiSelect-select': { py: 0.5 } }}>
          {[10, 20, 50, 100].map((n) => (
            <MenuItem key={n} value={n}>{n}条/页</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Pagination
        count={totalPages}
        page={pageNo}
        onChange={(_, p) => onPageChange?.(p)}
        size="small"
        siblingCount={1}
        showFirstButton
        showLastButton
        sx={{ '& .MuiPaginationItem-root': { color: '#8B949E' } }}
      />
    </Box>
  );
}
