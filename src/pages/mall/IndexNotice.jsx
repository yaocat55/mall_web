import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import mallIndexNoticeApi from '@/api/mall/indexNotice';

const defaultForm = { id: null, title: '', content: '' };

export default function IndexNotice() {
  const crud = useCrud({
    title: '公告',
    url: '/v1/indexNotice/searchByPage',
    crudMethod: mallIndexNoticeApi,
    defaultForm,
  });

  const columns = [
    { label: '系统编号', prop: 'id' },
    { label: '标题', prop: 'title' },
    { label: '排序', prop: 'sort' },
    { label: '创建人ID', prop: 'createUserId' },
    { label: '创建人名称', prop: 'createUserName' },
    { label: '创建日期', prop: 'createTime', render: (v) => v ? new Date(v).toLocaleString('zh-CN') : '-' },
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
        selections={crud.selections}
        showDateRange query={crud.query} setQuery={crud.setQuery}
        renderSearch={() => (
          <TextField
            size="small"
            placeholder="输入公告标题搜索"
            value={crud.query.title || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, title: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()}
            sx={{ width: 200 }}
          />
        )}
      />
      <CrudTable columns={columns} data={crud.data} loading={crud.loading}
        selections={crud.selections} onSelectionChange={crud.setSelections}
        onEdit={crud.toEdit} onDelete={crud.doDelete} />
      <CrudPagination pageNo={crud.pageNo} pageSize={crud.pageSize} totalCount={crud.totalCount}
        onPageChange={crud.setPageNo} onSizeChange={crud.setPageSize} />
      <CrudDialog open={crud.dialogOpen} title={crud.dialogTitle}
        onClose={crud.cancelCU} onSubmit={handleSubmit} submitting={crud.submitting}>
        <TextField fullWidth label="公告标题" value={crud.form.title || ''}
          onChange={(e) => crud.setForm({ ...crud.form, title: e.target.value })} required sx={{ minWidth: 300 }} />
        <TextField fullWidth label="公告内容" value={crud.form.content || ''}
          onChange={(e) => crud.setForm({ ...crud.form, content: e.target.value })} multiline rows={4} sx={{ minWidth: 300 }} />
      </CrudDialog>
    </Box>
  );
}
