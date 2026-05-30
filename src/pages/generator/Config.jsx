import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import genConfigApi from '@/api/generator/genConfig';

export default function GenConfig() {
  const crud = useCrud({
    title: '生成配置',
    url: 'api/genConfig',
    crudMethod: genConfigApi,
    defaultForm: { id: null, tableName: '', author: '', pack: '', moduleName: '', prefix: '' },
  });

  const columns = [
    { prop: 'id', label: 'ID' },
    { prop: 'tableName', label: '表名' },
    { prop: 'author', label: '作者' },
    { prop: 'pack', label: '包名' },
    { prop: 'moduleName', label: '模块名' },
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
          label="表名"
          value={crud.form.tableName || ''}
          onChange={(e) => crud.setForm({ ...crud.form, tableName: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="作者"
          value={crud.form.author || ''}
          onChange={(e) => crud.setForm({ ...crud.form, author: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="包名"
          value={crud.form.pack || ''}
          onChange={(e) => crud.setForm({ ...crud.form, pack: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="模块名"
          value={crud.form.moduleName || ''}
          onChange={(e) => crud.setForm({ ...crud.form, moduleName: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="前缀"
          value={crud.form.prefix || ''}
          onChange={(e) => crud.setForm({ ...crud.form, prefix: e.target.value })}
          fullWidth
          margin="dense"
        />
      </CrudDialog>
    </Box>
  );
}
