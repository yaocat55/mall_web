import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import mallProductApi from '@/api/mall/product';

const defaultForm = {
  id: null, name: '', categoryId: '', brandId: '', unitId: '',
  quantity: '', price: '', productGroupId: '', status: '',
};

export default function Product() {
  const crud = useCrud({
    title: '商品',
    url: '/v1/product/searchByPage',
    crudMethod: mallProductApi,
    defaultForm,
  });

  const columns = [
    { label: '系统编号', prop: 'id' },
    { label: '商品组ID', prop: 'productGroupId' },
    { label: '商品名称', prop: 'name' },
    { label: '分类', prop: 'categoryName' },
    { label: '单位', prop: 'unitName' },
    { label: '品牌', prop: 'brandName' },
    { label: '规格', prop: 'model' },
    { label: '数量', prop: 'quantity' },
    { label: '价格', prop: 'price' },
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
          <>
            <TextField
              size="small"
              placeholder="商品组ID"
              value={crud.query.productGroupId || ''}
              onChange={(e) => crud.setQuery({ ...crud.query, productGroupId: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()}
              sx={{ width: 120 }}
            />
            <TextField
              size="small"
              placeholder="品牌ID"
              value={crud.query.brandId || ''}
              onChange={(e) => crud.setQuery({ ...crud.query, brandId: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()}
              sx={{ width: 120, ml: 1 }}
            />
            <TextField
              size="small"
              placeholder="系统编号"
              value={crud.query.id || ''}
              onChange={(e) => crud.setQuery({ ...crud.query, id: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()}
              sx={{ width: 120, ml: 1 }}
            />
            <TextField
              size="small"
              placeholder="商品名称"
              value={crud.query.name || ''}
              onChange={(e) => crud.setQuery({ ...crud.query, name: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()}
              sx={{ width: 140, ml: 1 }}
            />
          </>
        )}
      />
      <CrudTable columns={columns} data={crud.data} loading={crud.loading}
        selections={crud.selections} onSelectionChange={crud.setSelections}
        onEdit={crud.toEdit} onDelete={crud.doDelete} />
      <CrudPagination pageNo={crud.pageNo} pageSize={crud.pageSize} totalCount={crud.totalCount}
        onPageChange={crud.setPageNo} onSizeChange={crud.setPageSize} />
      <CrudDialog open={crud.dialogOpen} title={crud.dialogTitle}
        onClose={crud.cancelCU} onSubmit={handleSubmit} submitting={crud.submitting}>
        <TextField fullWidth label="商品名称" value={crud.form.name || ''}
          onChange={(e) => crud.setForm({ ...crud.form, name: e.target.value })} required sx={{ minWidth: 300 }} />
        <TextField fullWidth label="分类ID" value={crud.form.categoryId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, categoryId: e.target.value })} sx={{ minWidth: 300 }} />
        <TextField fullWidth label="品牌ID" value={crud.form.brandId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, brandId: e.target.value })} sx={{ minWidth: 300 }} />
        <TextField fullWidth label="单位ID" value={crud.form.unitId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, unitId: e.target.value })} sx={{ minWidth: 300 }} />
        <TextField fullWidth label="库存数量" value={crud.form.quantity || ''} type="number"
          onChange={(e) => crud.setForm({ ...crud.form, quantity: e.target.value })} sx={{ minWidth: 300 }} />
        <TextField fullWidth label="价格" value={crud.form.price || ''} type="number"
          onChange={(e) => crud.setForm({ ...crud.form, price: e.target.value })} sx={{ minWidth: 300 }} />
        <TextField fullWidth label="商品组ID" value={crud.form.productGroupId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, productGroupId: e.target.value })} sx={{ minWidth: 300 }} />
        <TextField fullWidth label="状态" value={crud.form.status || ''}
          onChange={(e) => crud.setForm({ ...crud.form, status: e.target.value })} sx={{ minWidth: 300 }} />
      </CrudDialog>
    </Box>
  );
}
