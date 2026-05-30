import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import seckillProductApi from '@/api/marketing/seckillProduct';

const date = (v) => (v ? new Date(v).toLocaleString('zh-CN') : '');
const defaultForm = { id: null, name: null };

export default function Seckill() {
  const crud = useCrud({
    title: '秒杀商品',
    url: '/v1/seckillProduct/searchByPage',
    crudMethod: seckillProductApi,
    defaultForm,
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'productId', label: '商品ID' },
    { prop: 'name', label: '商品名称' },
    { prop: 'categoryName', label: '分类' },
    { prop: 'unitName', label: '单位' },
    { prop: 'brandName', label: '品牌' },
    { prop: 'model', label: '规格' },
    { prop: 'costPrice', label: '原价' },
    { prop: 'price', label: '秒杀价' },
    { prop: 'withHoldQuantity', label: '预扣库存' },
    { prop: 'remainQuantity', label: '实际剩余库存' },
    { prop: 'startTime', label: '秒杀开始时间', render: date },
    { prop: 'endTime', label: '秒杀结束时间', render: date },
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
        showDateRange query={crud.query} setQuery={crud.setQuery}
        renderSearch={() => (
          <TextField size="small" placeholder="输入商品名称搜索"
            value={crud.query.name || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, name: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()} sx={{ width: 200 }} />
        )} />
      <CrudTable columns={columns} data={crud.data} loading={crud.loading}
        selections={crud.selections} onSelectionChange={crud.setSelections}
        onEdit={crud.toEdit} onDelete={crud.doDelete} />
      <CrudPagination pageNo={crud.pageNo} pageSize={crud.pageSize} totalCount={crud.totalCount}
        onPageChange={crud.setPageNo} onSizeChange={crud.setPageSize} />
      <CrudDialog open={crud.dialogOpen} title={crud.dialogTitle}
        onClose={crud.cancelCU} onSubmit={handleSubmit} submitting={crud.submitting}>
        <TextField label="商品ID" value={crud.form.productId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, productId: e.target.value })}
          fullWidth margin="dense" />
        <TextField label="秒杀价" type="number" value={crud.form.price ?? ''}
          onChange={(e) => crud.setForm({ ...crud.form, price: Number(e.target.value) })}
          fullWidth margin="dense" />
        <TextField label="预扣库存" type="number" value={crud.form.withHoldQuantity ?? ''}
          onChange={(e) => crud.setForm({ ...crud.form, withHoldQuantity: Number(e.target.value) })}
          fullWidth margin="dense" />
        <TextField label="实际剩余库存" type="number" value={crud.form.remainQuantity ?? ''}
          onChange={(e) => crud.setForm({ ...crud.form, remainQuantity: Number(e.target.value) })}
          fullWidth margin="dense" />
        <TextField label="秒杀开始时间" value={crud.form.startTime || ''}
          onChange={(e) => crud.setForm({ ...crud.form, startTime: e.target.value })}
          fullWidth margin="dense" />
        <TextField label="秒杀结束时间" value={crud.form.endTime || ''}
          onChange={(e) => crud.setForm({ ...crud.form, endTime: e.target.value })}
          fullWidth margin="dense" />
      </CrudDialog>
    </Box>
  );
}
