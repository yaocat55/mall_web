import { Box, TextField, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import couponApi from '@/api/marketing/coupon';

const date = (v) => (v ? new Date(v).toLocaleString('zh-CN') : '');
const defaultForm = { id: null, name: null, type: null, photoUrl: null, receiveStartTime: null, receiveEndTime: null, useStartTime: null, useEndTime: null, quantity: null, offMoney: null, discount: null, minMoney: null, minProductCount: null, limitCountOneDay: null, validStatus: null };

export default function Coupon() {
  const crud = useCrud({
    title: '优惠券',
    url: '/v1/coupon/searchByPage',
    crudMethod: couponApi,
    defaultForm,
  });

  const [previewUrl, setPreviewUrl] = useState('');

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'name', label: '优惠券名称' },
    { prop: 'type', label: '类型' },
    {
      prop: 'photoUrl',
      label: '图片',
      render: (v) =>
        v ? (
          <Box
            component="img"
            src={v}
            onClick={() => setPreviewUrl(v)}
            onError={(e) => { e.target.style.display = 'none'; }}
            sx={{
              width: 60,
              height: 60,
              objectFit: 'cover',
              borderRadius: 1,
              cursor: 'pointer',
              border: '1px solid #30363D',
              '&:hover': { borderColor: '#58A6FF' },
            }}
          />
        ) : '-',
    },
    { prop: 'receiveStartTime', label: '领券开始时间', render: date },
    { prop: 'receiveEndTime', label: '领券结束时间', render: date },
    { prop: 'useStartTime', label: '使用开始时间', render: date },
    { prop: 'useEndTime', label: '使用结束时间', render: date },
    { prop: 'quantity', label: '优惠券数量' },
    { prop: 'offMoney', label: '优惠金额' },
    { prop: 'discount', label: '折扣' },
    { prop: 'minMoney', label: '最低使用金额' },
    { prop: 'minProductCount', label: '最少商品件数' },
    { prop: 'limitCountOneDay', label: '每日限额' },
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
          <TextField size="small" placeholder="搜索名称..."
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
        <TextField label="优惠券名称" value={crud.form.name || ''}
          onChange={(e) => crud.setForm({ ...crud.form, name: e.target.value })}
          fullWidth margin="dense" />
        <TextField label="类型" value={crud.form.type || ''}
          onChange={(e) => crud.setForm({ ...crud.form, type: e.target.value })}
          fullWidth margin="dense" />
        <TextField label="图片URL" value={crud.form.photoUrl || ''}
          onChange={(e) => crud.setForm({ ...crud.form, photoUrl: e.target.value })}
          fullWidth margin="dense" />
        <TextField label="领券开始时间" value={crud.form.receiveStartTime || ''}
          onChange={(e) => crud.setForm({ ...crud.form, receiveStartTime: e.target.value })}
          fullWidth margin="dense" />
        <TextField label="领券结束时间" value={crud.form.receiveEndTime || ''}
          onChange={(e) => crud.setForm({ ...crud.form, receiveEndTime: e.target.value })}
          fullWidth margin="dense" />
        <TextField label="使用开始时间" value={crud.form.useStartTime || ''}
          onChange={(e) => crud.setForm({ ...crud.form, useStartTime: e.target.value })}
          fullWidth margin="dense" />
        <TextField label="使用结束时间" value={crud.form.useEndTime || ''}
          onChange={(e) => crud.setForm({ ...crud.form, useEndTime: e.target.value })}
          fullWidth margin="dense" />
        <TextField label="优惠券数量" type="number" value={crud.form.quantity ?? ''}
          onChange={(e) => crud.setForm({ ...crud.form, quantity: Number(e.target.value) })}
          fullWidth margin="dense" />
        <TextField label="优惠金额" type="number" value={crud.form.offMoney ?? ''}
          onChange={(e) => crud.setForm({ ...crud.form, offMoney: Number(e.target.value) })}
          fullWidth margin="dense" />
        <TextField label="折扣" type="number" value={crud.form.discount ?? ''}
          onChange={(e) => crud.setForm({ ...crud.form, discount: Number(e.target.value) })}
          fullWidth margin="dense" />
        <TextField label="最低使用金额" type="number" value={crud.form.minMoney ?? ''}
          onChange={(e) => crud.setForm({ ...crud.form, minMoney: Number(e.target.value) })}
          fullWidth margin="dense" />
        <TextField label="最少商品件数" type="number" value={crud.form.minProductCount ?? ''}
          onChange={(e) => crud.setForm({ ...crud.form, minProductCount: Number(e.target.value) })}
          fullWidth margin="dense" />
        <TextField label="每日限额" type="number" value={crud.form.limitCountOneDay ?? ''}
          onChange={(e) => crud.setForm({ ...crud.form, limitCountOneDay: Number(e.target.value) })}
          fullWidth margin="dense" />
        <TextField label="有效状态" value={crud.form.validStatus || ''}
          onChange={(e) => crud.setForm({ ...crud.form, validStatus: e.target.value })}
          fullWidth margin="dense" />
      </CrudDialog>
      <Dialog open={!!previewUrl} onClose={() => setPreviewUrl('')} maxWidth="md"
        PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none' } }}>
        <IconButton onClick={() => setPreviewUrl('')}
          sx={{ position: 'absolute', right: 8, top: 8, color: '#fff', bgcolor: 'rgba(0,0,0,0.5)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
          <CloseIcon />
        </IconButton>
        <Box component="img" src={previewUrl}
          sx={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: 1 }} />
      </Dialog>
    </Box>
  );
}
