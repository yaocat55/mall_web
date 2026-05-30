import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import productViewRecordApi from '@/api/shopping/productViewRecord';

const date = (v) => (v ? new Date(v).toLocaleString('zh-CN') : '');
const defaultForm = { id: null, userId: null, productId: null };

export default function ProductViewRecord() {
  const crud = useCrud({
    title: '商品浏览记录',
    url: '/v1/productViewRecord/searchByPage',
    crudMethod: productViewRecordApi,
    defaultForm,
    sortField: ['create_time,desc'],
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'userId', label: '用户ID' },
    { prop: 'userName', label: '用户名称' },
    { prop: 'productId', label: '商品ID' },
    { prop: 'productName', label: '商品名称' },
    { prop: 'model', label: '规格' },
    { prop: 'price', label: '单价' },
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
        <TextField label="用户ID" value={crud.form.userId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, userId: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="商品ID" value={crud.form.productId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, productId: e.target.value })}
          fullWidth margin="dense" size="small" />
      </CrudDialog>
    </Box>
  );
}
