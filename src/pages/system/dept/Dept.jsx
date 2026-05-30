import { Box, TextField, Switch, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useState, useCallback } from 'react';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import deptApi from '@/api/system/dept';

const defaultForm = { id: null, name: '', parentId: '', sort: 0 };

export default function Dept() {
  const crud = useCrud({
    title: '部门',
    url: '/v1/dept/searchByPage',
    crudMethod: deptApi,
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
      await deptApi.edit({ ...pendingRow, validStatus: pendingValue });
      crud.refresh();
    } catch {
      // handled by interceptor
    } finally {
      setConfirmOpen(false);
      setPendingRow(null);
    }
  }, [pendingRow, pendingValue, crud]);

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'name', label: '名称' },
    {
      prop: 'validStatus',
      label: '状态',
      render: (v, row) => (
        <Switch
          checked={!!v}
          onChange={(e) => changeEnabled(row, e.target.checked)}
          disabled={row.id === 1}
          size="small"
        />
      ),
    },
    { prop: 'createTime', label: '创建日期', render: (v) => (v ? new Date(v).toLocaleDateString() : '') },
  ];

  const renderForm = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <TextField label="名称" value={crud.form.name || ''} onChange={(e) => crud.setForm({ ...crud.form, name: e.target.value })} size="small" />
      <TextField label="父部门ID" value={crud.form.parentId || ''} onChange={(e) => crud.setForm({ ...crud.form, parentId: e.target.value })} size="small" />
      <TextField label="排序" type="number" value={crud.form.sort ?? ''} onChange={(e) => crud.setForm({ ...crud.form, sort: e.target.value })} size="small" />
    </Box>
  );

  return (
    <Box>
      <CrudToolbar
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
