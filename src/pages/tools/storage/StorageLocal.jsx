import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import localStorageApi from '@/api/tools/localStorage';

export default function StorageLocal() {
  const crud = useCrud({
    title: '本地存储',
    url: '/v1/localStorage/searchByPage',
    crudMethod: localStorageApi,
    defaultForm: { id: null, name: '', size: 0 },
  });

  const columns = [
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: '名称' },
    { prop: 'size', label: '大小' },
    { prop: 'createTime', label: '创建时间', render: (v) => v ? new Date(v).toLocaleString('zh-CN') : '-' },
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
        onExport={crud.doExport}
        selections={crud.selections}
        renderSearch={() => (
          <TextField
            size="small"
            placeholder="搜索..."
            value={crud.query.keyword || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, keyword: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()}
            sx={{ width: 200 }}
          />
        )}
      />
      <CrudTable
        columns={columns}
        data={crud.data}
        loading={crud.loading}
        selections={crud.selections}
        onSelectionChange={crud.setSelections}
        onEdit={crud.toEdit}
        onDelete={crud.doDelete}
      />
      <CrudPagination
        pageNo={crud.pageNo}
        pageSize={crud.pageSize}
        totalCount={crud.totalCount}
        onPageChange={crud.setPageNo}
        onSizeChange={crud.setPageSize}
      />
      <CrudDialog
        open={crud.dialogOpen}
        title={crud.dialogTitle}
        onClose={crud.cancelCU}
        onSubmit={handleSubmit}
        submitting={crud.submitting}
      >
        <TextField
          label="名称"
          value={crud.form.name || ''}
          onChange={(e) => crud.setForm({ ...crud.form, name: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="大小"
          type="number"
          value={crud.form.size || 0}
          onChange={(e) => crud.setForm({ ...crud.form, size: e.target.value })}
          fullWidth
          margin="dense"
        />
      </CrudDialog>
    </Box>
  );
}
