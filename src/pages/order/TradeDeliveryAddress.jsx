import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import tradeDeliveryAddressApi from '@/api/order/tradeDeliveryAddress';

const date = (v) => (v ? new Date(v).toLocaleString('zh-CN') : '');
const defaultForm = { id: null, tradeId: null, code: null, userId: null, userName: null, receiverName: null, receiverPhone: null, province: null, city: null, district: null, detailAddress: null, postCode: null };

export default function TradeDeliveryAddress() {
  const crud = useCrud({
    title: '订单收货地址',
    url: '/v1/tradeDeliveryAddress/searchByPage',
    crudMethod: tradeDeliveryAddressApi,
    defaultForm,
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'tradeId', label: '订单ID' },
    { prop: 'code', label: '订单编码' },
    { prop: 'userId', label: '用户ID' },
    { prop: 'userName', label: '用户名称' },
    { prop: 'receiverName', label: '收货人姓名' },
    { prop: 'receiverPhone', label: '收货人手机号' },
    { prop: 'province', label: '省份' },
    { prop: 'city', label: '城市' },
    { prop: 'district', label: '区县' },
    { prop: 'detailAddress', label: '详细地址' },
    { prop: 'postCode', label: '邮编' },
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
        onSearch={crud.toQuery} onRefresh={crud.refresh} onAdd={crud.toAdd}
        onDelete={crud.doDelete} selections={crud.selections} onExport={crud.doExport}
        showAdd={false} showDelete={false} showExport={false}
        showDateRange query={crud.query} setQuery={crud.setQuery}
        renderSearch={() => (
          <TextField
            size="small"
            placeholder="输入订单编码搜索"
            value={crud.query.code || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, code: e.target.value })}
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
        <TextField label="订单ID" value={crud.form.tradeId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, tradeId: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="订单编码" value={crud.form.code || ''}
          onChange={(e) => crud.setForm({ ...crud.form, code: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="用户ID" value={crud.form.userId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, userId: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="用户名称" value={crud.form.userName || ''}
          onChange={(e) => crud.setForm({ ...crud.form, userName: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="收货人姓名" value={crud.form.receiverName || ''}
          onChange={(e) => crud.setForm({ ...crud.form, receiverName: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="收货人手机号" value={crud.form.receiverPhone || ''}
          onChange={(e) => crud.setForm({ ...crud.form, receiverPhone: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="省份" value={crud.form.province || ''}
          onChange={(e) => crud.setForm({ ...crud.form, province: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="城市" value={crud.form.city || ''}
          onChange={(e) => crud.setForm({ ...crud.form, city: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="区县" value={crud.form.district || ''}
          onChange={(e) => crud.setForm({ ...crud.form, district: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="详细地址" value={crud.form.detailAddress || ''}
          onChange={(e) => crud.setForm({ ...crud.form, detailAddress: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="邮编" value={crud.form.postCode || ''}
          onChange={(e) => crud.setForm({ ...crud.form, postCode: e.target.value })}
          fullWidth margin="dense" size="small" />
      </CrudDialog>
    </Box>
  );
}
