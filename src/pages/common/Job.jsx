import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import jobApi from '@/api/common/job';

export default function Job() {
  const crud = useCrud({
    title: '定时任务',
    url: '/v1/commonJob/searchByPage',
    crudMethod: jobApi,
    defaultForm: { id: null, jobName: null, beanName: null, cronExpression: null, methodName: null, params: null, remark: null, pauseStatus: null },
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'jobName', label: '定时任务名称' },
    { prop: 'beanName', label: 'bean名称' },
    { prop: 'methodName', label: '方法名称' },
    { prop: 'cronExpression', label: 'cron表达式' },
    { prop: 'params', label: '参数' },
    { prop: 'remark', label: '备注' },
    {
      prop: 'pauseStatus',
      label: '暂停状态',
      render: (v) => (v === true ? '已暂停' : '未暂停'),
    },
    { prop: 'createUserId', label: '创建人ID' },
    { prop: 'createUserName', label: '创建人名称' },
    { prop: 'createTime', label: '创建日期', render: (v) => (v ? new Date(v).toLocaleString('zh-CN') : '-') },
  ];

  const handleSubmit = () => {
    if (crud.addStatus === crud.STATUS.PREPARED) crud.doAdd();
    else if (crud.editStatus === crud.STATUS.PREPARED) crud.doEdit();
  };

  return (
    <Box sx={{ p: 1 }}>
      <CrudToolbar
        onSearch={crud.toQuery}
        onRefresh={crud.refresh}
        onAdd={crud.toAdd}
        onDelete={crud.doDelete}
        onExport={crud.doExport}
        selections={crud.selections}
        showDateRange query={crud.query} setQuery={crud.setQuery}
        renderSearch={() => (
          <TextField
            size="small"
            placeholder="输入定时任务名称搜索"
            value={crud.query.jobName || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, jobName: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()}
            sx={{ width: 200 }}
          />
        )}
      />
      <CrudTable
        columns={columns}
        data={crud.data}
        loading={crud.loading}
        selections={crud.selections}
        onSelectionChange={crud.setSelections}
        onEdit={crud.toEdit}
        onDelete={crud.doDelete}
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
        onSubmit={handleSubmit}
        submitting={crud.submitting}
      >
        <TextField
          label="定时任务名称"
          value={crud.form.jobName || ''}
          onChange={(e) => crud.setForm({ ...crud.form, jobName: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="bean名称"
          value={crud.form.beanName || ''}
          onChange={(e) => crud.setForm({ ...crud.form, beanName: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="方法名称"
          value={crud.form.methodName || ''}
          onChange={(e) => crud.setForm({ ...crud.form, methodName: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="cron表达式"
          value={crud.form.cronExpression || ''}
          onChange={(e) => crud.setForm({ ...crud.form, cronExpression: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="参数"
          value={crud.form.params || ''}
          onChange={(e) => crud.setForm({ ...crud.form, params: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="备注"
          value={crud.form.remark || ''}
          onChange={(e) => crud.setForm({ ...crud.form, remark: e.target.value })}
          fullWidth
          margin="dense"
        />
      </CrudDialog>
    </Box>
  );
}
