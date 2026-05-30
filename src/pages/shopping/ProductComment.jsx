import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import productCommentApi from '@/api/shopping/productComment';

const date = (v) => (v ? new Date(v).toLocaleString('zh-CN') : '');
const defaultForm = { id: null, parentId: null, productId: null, userId: null, content: null, rating: null };

export default function ProductComment() {
  const crud = useCrud({
    title: '商品评论',
    url: '/v1/productComment/searchByPage',
    crudMethod: productCommentApi,
    defaultForm,
    sortField: ['create_time,desc'],
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'parentId', label: '父评论ID' },
    { prop: 'productId', label: '商品ID' },
    { prop: 'userId', label: '用户ID' },
    { prop: 'content', label: '评论内容' },
    { prop: 'rating', label: '评分' },
    { prop: 'createUserId', label: '创建人ID' },
    { prop: 'createUserName', label: '创建人名称' },
    { prop: 'createTime', label: '创建日期', render: date },
  ];

  const handleSubmit = () => {
    if (crud.addStatus === crud.STATUS.PREPARED) crud.doAdd();
    else if (crud.editStatus === crud.STATUS.PREPARED) crud.doEdit();
  };

  return (
    <Box sx={{ p: 1 }}>
      <CrudToolbar
        showExport={false}
        onSearch={crud.toQuery}
        onRefresh={crud.resetQuery}
        onAdd={crud.toAdd}
        onDelete={crud.doDelete}
        selections={crud.selections}
        showDateRange query={crud.query} setQuery={crud.setQuery}
        renderSearch={() => (
          <TextField
            size="small"
            placeholder="输入关键字搜索"
            value={crud.query.keyword || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, keyword: e.target.value })}
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
        <TextField label="父评论ID" value={crud.form.parentId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, parentId: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="商品ID" value={crud.form.productId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, productId: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="用户ID" value={crud.form.userId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, userId: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="评论内容" value={crud.form.content || ''}
          onChange={(e) => crud.setForm({ ...crud.form, content: e.target.value })}
          fullWidth margin="dense" size="small" multiline minRows={3} />
        <TextField label="评分" type="number" value={crud.form.rating ?? ''}
          onChange={(e) => crud.setForm({ ...crud.form, rating: Number(e.target.value) })}
          fullWidth margin="dense" size="small" />
      </CrudDialog>
    </Box>
  );
}
