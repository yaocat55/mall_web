import { Box, TextField, Dialog } from '@mui/material';
import { useState } from 'react';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import mallIndexCarouselImageApi from '@/api/mall/indexCarouselImage';

const defaultForm = { id: null, name: '', url: '', sort: '', status: '' };

export default function IndexCarouselImage() {
  const crud = useCrud({
    title: '轮播图',
    url: '/v1/indexCarouselImage/searchByPage',
    crudMethod: mallIndexCarouselImageApi,
    defaultForm,
  });

  const [previewUrl, setPreviewUrl] = useState('');

  const columns = [
    { label: '系统编号', prop: 'id' },
    { label: '排序', prop: 'sort' },
    { label: '轮播图片', prop: 'url', render: (v) => v ? (
      <Box component="img" src={v} alt="" sx={{ width: '100%', maxHeight: 100, cursor: 'pointer', objectFit: 'contain' }}
        onClick={() => setPreviewUrl(v)} />
    ) : '-' },
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
            placeholder="输入轮播图名称搜索"
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
        <TextField fullWidth label="轮播图名称" value={crud.form.name || ''}
          onChange={(e) => crud.setForm({ ...crud.form, name: e.target.value })} required sx={{ minWidth: 300 }} />
        <TextField fullWidth label="图片地址" value={crud.form.url || ''}
          onChange={(e) => crud.setForm({ ...crud.form, url: e.target.value })} sx={{ minWidth: 300 }} />
        <TextField fullWidth label="排序" value={crud.form.sort || ''}
          onChange={(e) => crud.setForm({ ...crud.form, sort: e.target.value })} sx={{ minWidth: 300 }} />
        <TextField fullWidth label="状态" value={crud.form.status || ''}
          onChange={(e) => crud.setForm({ ...crud.form, status: e.target.value })} sx={{ minWidth: 300 }} />
      </CrudDialog>
      <Dialog open={!!previewUrl} onClose={() => setPreviewUrl('')} maxWidth="md">
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box component="img" src={previewUrl} alt="" sx={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain' }} />
        </Box>
      </Dialog>
    </Box>
  );
}
