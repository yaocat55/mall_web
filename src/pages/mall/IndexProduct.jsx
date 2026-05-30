import { Box, TextField, Dialog } from '@mui/material';
import { useState } from 'react';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import mallIndexProductApi from '@/api/mall/indexProduct';

const defaultForm = { id: null, productId: '', sort: '' };

const TYPE_MAP = { 1: '热门商品', 2: '最新商品', 3: '秒杀商品' };

export default function IndexProduct() {
  const crud = useCrud({
    title: '推荐商品',
    url: '/v1/indexProduct/searchByPage',
    crudMethod: mallIndexProductApi,
    defaultForm,
  });

  const [previewUrl, setPreviewUrl] = useState('');

  const columns = [
    { label: '系统编号', prop: 'id' },
    { label: '商品ID', prop: 'productId' },
    { label: '商品名称', prop: 'productName' },
    { label: '规格', prop: 'model' },
    { label: '价格', prop: 'price' },
    { label: '封面', prop: 'cover', render: (v) => v ? (
      <Box component="img" src={v} alt="" sx={{ width: '100%', maxHeight: 100, cursor: 'pointer', objectFit: 'contain' }}
        onClick={() => setPreviewUrl(v)} />
    ) : '-' },
    { label: '排序', prop: 'sort' },
    { label: '商品类型', prop: 'type', render: (v) => TYPE_MAP[v] || '秒杀商品' },
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
            placeholder="输入商品ID搜索"
            value={crud.query.productId || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, productId: e.target.value })}
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
        <TextField fullWidth label="商品ID" value={crud.form.productId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, productId: e.target.value })} required sx={{ minWidth: 300 }} />
        <TextField fullWidth label="排序" value={crud.form.sort || ''}
          onChange={(e) => crud.setForm({ ...crud.form, sort: e.target.value })} sx={{ minWidth: 300 }} />
      </CrudDialog>
      <Dialog open={!!previewUrl} onClose={() => setPreviewUrl('')} maxWidth="md">
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box component="img" src={previewUrl} alt="" sx={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain' }} />
        </Box>
      </Dialog>
    </Box>
  );
}
