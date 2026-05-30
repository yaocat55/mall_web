import { Box, TextField, Switch, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useState, useCallback } from 'react';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import userApi from '@/api/system/user';

const defaultForm = { id: null, userName: '', nickName: '', phone: '', email: '', deptId: '', validStatus: 1 };

export default function User() {
  const crud = useCrud({
    title: '用户',
    url: '/v1/user/searchByPage',
    crudMethod: userApi,
    defaultForm,
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingRow, setPendingRow] = useState(null);
  const [pendingValue, setPendingValue] = useState(false);

  const changeEnabled = useCallback((row, value) => {
    setPendingRow(row);
    setPendingValue(value);
    setConfirmOpen(true);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!pendingRow) return;
    try {
      await userApi.edit({ ...pendingRow, validStatus: pendingValue });
      crud.refresh();
    } catch {
      // handled by interceptor
    } finally {
      setConfirmOpen(false);
      setPendingRow(null);
    }
  }, [pendingRow, pendingValue, crud]);

  const columns = [
    { prop: 'id', label: 'ID' },
    { prop: 'userName', label: '用户名' },
    { prop: 'nickName', label: '昵称' },
    { prop: 'phone', label: '电话' },
    { prop: 'email', label: '邮箱' },
    { prop: 'deptId', label: '部门ID' },
    {
      prop: 'validStatus',
      label: '状态',
      render: (v, row) => (
        <Switch
          checked={!!v}
          onChange={(e) => changeEnabled(row, e.target.checked)}
          size="small"
        />
      ),
    },
    { prop: 'createTime', label: '创建日期', render: (v) => (v ? new Date(v).toLocaleDateString() : '') },
  ];

  const renderForm = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <TextField label="用户名" value={crud.form.userName || ''} onChange={(e) => crud.setForm({ ...crud.form, userName: e.target.value })} size="small" />
      <TextField label="昵称" value={crud.form.nickName || ''} onChange={(e) => crud.setForm({ ...crud.form, nickName: e.target.value })} size="small" />
      <TextField label="电话" value={crud.form.phone || ''} onChange={(e) => crud.setForm({ ...crud.form, phone: e.target.value })} size="small" />
      <TextField label="邮箱" value={crud.form.email || ''} onChange={(e) => crud.setForm({ ...crud.form, email: e.target.value })} size="small" />
      <TextField label="部门ID" value={crud.form.deptId || ''} onChange={(e) => crud.setForm({ ...crud.form, deptId: e.target.value })} size="small" />
      <TextField label="状态" value={crud.form.validStatus || ''} onChange={(e) => crud.setForm({ ...crud.form, validStatus: e.target.value })} size="small" />
    </Box>
  );

  const renderSearch = () => (
    <TextField
      size="small"
      placeholder="输入名称或者邮箱搜索"
      value={crud.query.blurry || ''}
      onChange={(e) => crud.setQuery({ ...crud.query, blurry: e.target.value })}
      onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()}
      sx={{ width: 200, '& .MuiOutlinedInput-root': { bgcolor: '#21262D' } }}
    />
  );

  return (
    <Box>
      <CrudToolbar
        renderSearch={renderSearch}
        onSearch={() => crud.toQuery()}
        onRefresh={() => crud.resetQuery()}
        onAdd={crud.toAdd}
        onDelete={(ids) => crud.doDelete(ids)}
        selections={crud.selections}
        showDateRange query={crud.query} setQuery={crud.setQuery}
      />
      <CrudTable
        columns={columns}
        data={crud.data}
        loading={crud.loading}
        selections={crud.selections}
        onSelectionChange={crud.setSelections}
        onEdit={crud.toEdit}
        onDelete={(ids) => crud.doDelete(ids)}
      />
      <CrudPagination
        pageNo={crud.pageNo}
        pageSize={crud.pageSize}
        totalCount={crud.totalCount}
        onPageChange={crud.setPageNo}
        onSizeChange={crud.setPageSize}
      />
      <CrudDialog
        open={crud.dialogOpen}
        title={crud.dialogTitle}
        onClose={crud.cancelCU}
        onSubmit={crud.addStatus > crud.STATUS.NORMAL ? crud.doAdd : crud.doEdit}
        submitting={crud.submitting}
      >
        {renderForm()}
      </CrudDialog>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} PaperProps={{ sx: { bgcolor: '#1C2128', color: '#E6EDF3' } }}>
        <DialogTitle>提示</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#8B949E' }}>确认要修改状态吗？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} sx={{ color: '#8B949E' }}>取消</Button>
          <Button onClick={handleConfirm} sx={{ color: '#58A6FF' }}>确定</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
