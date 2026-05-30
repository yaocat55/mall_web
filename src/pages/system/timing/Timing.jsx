import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import timingApi from '@/api/system/timing';

const defaultForm = { id: null, beanName: '', methodName: '', params: '', cron: '', status: 1 };

export default function Timing() {
  const crud = useCrud({
    title: '定时任务',
    url: '/v1/timing/searchByPage',
    crudMethod: timingApi,
    defaultForm,
  });

  const columns = [
    { prop: 'id', label: 'ID' },
    { prop: 'beanName', label: 'Bean名称' },
    { prop: 'methodName', label: '方法名称' },
    { prop: 'params', label: '参数' },
    { prop: 'cron', label: 'Cron表达式' },
    { prop: 'status', label: '状态' },
    { prop: 'createTime', label: '创建日期', render: (v) => (v ? new Date(v).toLocaleDateString() : '') },
  ];

  const renderForm = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <TextField label="Bean名称" value={crud.form.beanName || ''} onChange={(e) => crud.setForm({ ...crud.form, beanName: e.target.value })} size="small" />
      <TextField label="方法名称" value={crud.form.methodName || ''} onChange={(e) => crud.setForm({ ...crud.form, methodName: e.target.value })} size="small" />
      <TextField label="参数" value={crud.form.params || ''} onChange={(e) => crud.setForm({ ...crud.form, params: e.target.value })} size="small" />
      <TextField label="Cron表达式" value={crud.form.cron || ''} onChange={(e) => crud.setForm({ ...crud.form, cron: e.target.value })} size="small" />
      <TextField label="状态" value={crud.form.status ?? ''} onChange={(e) => crud.setForm({ ...crud.form, status: e.target.value })} size="small" />
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
    </Box>
  );
}
