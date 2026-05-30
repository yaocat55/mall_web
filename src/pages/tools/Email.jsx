import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import emailApi from '@/api/tools/email';

export default function Email() {
  const crud = useCrud({
    title: '邮件工具',
    url: 'api/email',
    crudMethod: emailApi,
    defaultForm: { id: null, to: '', subject: '', content: '' },
  });

  const columns = [
    { prop: 'id', label: 'ID' },
    { prop: 'to', label: '收件人' },
    { prop: 'subject', label: '主题' },
    { prop: 'content', label: '内容' },
    { prop: 'createTime', label: '创建时间', render: (v) => v ? new Date(v).toLocaleString('zh-CN') : '-' },
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
        renderSearch={() => (
          <TextField
            size="small"
            placeholder="搜索..."
            value={crud.query.keyword || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, keyword: e.target.value })}
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
          label="收件人"
          value={crud.form.to || ''}
          onChange={(e) => crud.setForm({ ...crud.form, to: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="主题"
          value={crud.form.subject || ''}
          onChange={(e) => crud.setForm({ ...crud.form, subject: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="内容"
          value={crud.form.content || ''}
          onChange={(e) => crud.setForm({ ...crud.form, content: e.target.value })}
          fullWidth
          margin="dense"
          multiline
          rows={4}
        />
      </CrudDialog>
    </Box>
  );
}
