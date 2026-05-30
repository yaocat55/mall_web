import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Box, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function CrudTable({
  columns, data, loading, selections, idField = 'id',
  onSelectionChange, onEdit, onDelete,
  showSelect = true, showActions = true,
}) {
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const selectable = data.filter(row => row[idField] !== 1);
      onSelectionChange?.(selectable);
    } else {
      onSelectionChange?.([]);
    }
  };

  const handleSelectOne = (row) => {
    const selected = (selections || []).find((s) => s[idField] === row[idField]);
    if (selected) {
      onSelectionChange?.((selections || []).filter((s) => s[idField] !== row[idField]));
    } else {
      onSelectionChange?.([...(selections || []), row]);
    }
  };

  const isSelected = (row) => (selections || []).some((s) => s[idField] === row[idField]);
  const allSelectable = data.filter((r) => r[idField] !== 1);
  const allSelected = allSelectable.length > 0 && allSelectable.every((r) => isSelected(r));
  const someSelected = (selections || []).length > 0 && !allSelected;

  return (
    <TableContainer sx={{ bgcolor: 'transparent' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {showSelect && (
              <TableCell padding="checkbox" sx={{ bgcolor: '#21262D' }}>
                <Checkbox
                  size="small"
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleSelectAll}
                  sx={{ color: '#8B949E', '&.Mui-checked': { color: '#58A6FF' } }}
                />
              </TableCell>
            )}
            {columns.map((col) => (
              <TableCell key={col.prop || col.label} sx={{ bgcolor: '#21262D', color: '#E6EDF3', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>
                {col.label}
              </TableCell>
            ))}
            {showActions && (
              <TableCell sx={{ bgcolor: '#21262D', color: '#E6EDF3', fontWeight: 600, fontSize: 13, textAlign: 'center', width: 100 }}>
                操作
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length + (showSelect ? 1 : 0) + (showActions ? 1 : 0)} align="center" sx={{ py: 6 }}>
                <CircularProgress size={28} sx={{ color: '#58A6FF' }} />
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (showSelect ? 1 : 0) + (showActions ? 1 : 0)} align="center" sx={{ py: 6, color: '#8B949E' }}>
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => (
              <TableRow key={row[idField] || idx} hover>
                {showSelect && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      size="small"
                      checked={isSelected(row)}
                      disabled={row[idField] === 1}
                      onChange={() => handleSelectOne(row)}
                      sx={{ color: '#8B949E', '&.Mui-checked': { color: '#58A6FF' } }}
                    />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.prop || col.label} sx={{ fontSize: 13, color: '#E6EDF3' }}>
                    {col.render ? col.render(row[col.prop], row) ?? '' : row[col.prop] ?? ''}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell align="center">
                    <Tooltip title="编辑"><IconButton size="small" onClick={() => onEdit?.(row)}
                      sx={{ color: '#58A6FF', '&:hover': { bgcolor: 'rgba(88,166,255,0.12)' } }}>
                      <EditIcon fontSize="small" />
                    </IconButton></Tooltip>
                    <Tooltip title="删除"><IconButton size="small" onClick={() => onDelete?.([row])}
                      sx={{ color: '#F85149', '&:hover': { bgcolor: 'rgba(248,81,73,0.12)' } }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton></Tooltip>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
