import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import tradeApi from '@/api/order/trade';

const date = (v) => (v ? new Date(v).toLocaleString('zh-CN') : '');
const defaultForm = { id: null, name: null };

export default function Trade() {
  const crud = useCrud({
    title: '订单',
    url: '/v1/trade/searchByPage',
    crudMethod: tradeApi,
    defaultForm,
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'code', label: '订单编码' },
    { prop: 'userId', label: '用户ID' },
    { prop: 'userName', label: '用户名称' },
    { prop: 'totalAmount', label: '总金额' },
    { prop: 'paymentAmount', label: '付款金额' },
    { prop: 'orderTime', label: '下单时间', render: date },
    { prop: 'orderStatus', label: '订单状态', render: (v) => ({ 1: '下单', 2: '支付', 3: '完成', 4: '取消' })[v] || v },
    { prop: 'payStatus', label: '支付状态', render: (v) => ({ 1: '待支付', 2: '已支付', 3: '退款' })[v] || v },
    { prop: 'remark', label: '备注' },
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
        showAdd={false}
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
        <TextField label="订单编码" value={crud.form.code || ''}
          onChange={(e) => crud.setForm({ ...crud.form, code: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="用户ID" value={crud.form.userId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, userId: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="总金额" value={crud.form.totalAmount || ''}
          onChange={(e) => crud.setForm({ ...crud.form, totalAmount: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="付款金额" value={crud.form.paymentAmount || ''}
          onChange={(e) => crud.setForm({ ...crud.form, paymentAmount: e.target.value })}
          fullWidth margin="dense" size="small" />
        <TextField label="备注" value={crud.form.remark || ''}
          onChange={(e) => crud.setForm({ ...crud.form, remark: e.target.value })}
          fullWidth margin="dense" size="small" />
      </CrudDialog>
    </Box>
  );
}
