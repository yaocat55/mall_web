import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import couponUserProvideApi from '@/api/marketing/couponUserProvide';

const date = (v) => (v ? new Date(v).toLocaleString('zh-CN') : '');
const defaultForm = { id: null, couponId: null, productId: null, userId: null, validStatus: null };

export default function CouponUserProvide() {
  const crud = useCrud({
    title: '优惠券发放',
    url: '/v1/couponUserProvide/searchByPage',
    crudMethod: couponUserProvideApi,
    defaultForm,
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'couponId', label: '优惠券ID' },
    { prop: 'couponName', label: '优惠券名称' },
    { prop: 'userId', label: '用户ID' },
    { prop: 'userName', label: '用户名称' },
    { prop: 'productId', label: '商品ID' },
    { prop: 'productName', label: '商品名称' },
    { prop: 'model', label: '规格' },
    { prop: 'validStatus', label: '有效状态' },
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
      <CrudToolbar onSearch={crud.toQuery} onRefresh={crud.refresh} onAdd={crud.toAdd}
        onDelete={crud.doDelete} selections={crud.selections} onExport={crud.doExport}
        showExport={false}
        showDateRange query={crud.query} setQuery={crud.setQuery}
        renderSearch={() => (
          <TextField size="small" placeholder="输入优惠券ID搜索"
            value={crud.query.couponId || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, couponId: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()} sx={{ width: 200 }} />
        )} />
      <CrudTable columns={columns} data={crud.data} loading={crud.loading}
        selections={crud.selections} onSelectionChange={crud.setSelections}
        onEdit={crud.toEdit} onDelete={crud.doDelete} />
      <CrudPagination pageNo={crud.pageNo} pageSize={crud.pageSize} totalCount={crud.totalCount}
        onPageChange={crud.setPageNo} onSizeChange={crud.setPageSize} />
      <CrudDialog open={crud.dialogOpen} title={crud.dialogTitle}
        onClose={crud.cancelCU} onSubmit={handleSubmit} submitting={crud.submitting}>
        <TextField label="优惠券ID" value={crud.form.couponId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, couponId: e.target.value })}
          fullWidth margin="dense" />
        <TextField label="商品ID" value={crud.form.productId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, productId: e.target.value })}
          fullWidth margin="dense" />
        <TextField label="用户ID" value={crud.form.userId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, userId: e.target.value })}
          fullWidth margin="dense" />
        <TextField label="有效状态" value={crud.form.validStatus || ''}
          onChange={(e) => crud.setForm({ ...crud.form, validStatus: e.target.value })}
          fullWidth margin="dense" />
      </CrudDialog>
    </Box>
  );
}
