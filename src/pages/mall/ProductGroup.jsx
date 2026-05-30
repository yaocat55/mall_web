import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import mallProductGroupApi from '@/api/mall/productGroup';

const defaultForm = { id: null, name: '', status: '' };

export default function ProductGroup() {
  const crud = useCrud({
    title: '商品组',
    url: '/v1/productGroup/searchByPage',
    crudMethod: mallProductGroupApi,
    defaultForm,
  });

  const columns = [
    { label: '系统编号', prop: 'id' },
    { label: '分类ID', prop: 'categoryId' },
    { label: '分类名称', prop: 'categoryName' },
    { label: '单位ID', prop: 'unitId' },
    { label: '单位名称', prop: 'unitName' },
    { label: '商品组名称', prop: 'name' },
    { label: '规格', prop: 'model' },
    { label: 'hash值', prop: 'hash' },
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
            placeholder="输入商品组名称搜索"
            value={crud.query.name || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, name: e.target.value })}
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
        <TextField fullWidth label="商品组名称" value={crud.form.name || ''}
          onChange={(e) => crud.setForm({ ...crud.form, name: e.target.value })} required sx={{ minWidth: 300 }} />
        <TextField fullWidth label="状态" value={crud.form.status || ''}
          onChange={(e) => crud.setForm({ ...crud.form, status: e.target.value })} sx={{ minWidth: 300 }} />
      </CrudDialog>
    </Box>
  );
}
