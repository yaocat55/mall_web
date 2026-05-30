import { Box, TextField, MenuItem } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import sensitiveWordApi from '@/api/common/sensitiveWord';

export default function SensitiveWord() {
  const crud = useCrud({
    title: '敏感词',
    url: '/v1/commonSensitiveWord/searchByPage',
    crudMethod: sensitiveWordApi,
    defaultForm: { id: null, word: '', type: 1 },
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'word', label: '名称' },
    {
      prop: 'type',
      label: '类型',
      render: (v) => {
        if (v === 1) return '政治';
        if (v === 2) return '暴力';
        return '色情';
      },
    },
    { prop: 'createTime', label: '创建日期', render: (v) => (v ? new Date(v).toLocaleString('zh-CN') : '-') },
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
        showDateRange query={crud.query} setQuery={crud.setQuery}
        renderSearch={() => (
          <TextField
            size="small"
            placeholder="输入名称搜索"
            value={crud.query.word || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, word: e.target.value })}
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
          select
          label="类型"
          value={crud.form.type || 1}
          onChange={(e) => crud.setForm({ ...crud.form, type: e.target.value })}
          fullWidth
          margin="dense"
        >
          <MenuItem value={1}>政治</MenuItem>
          <MenuItem value={2}>暴力</MenuItem>
          <MenuItem value={3}>色情</MenuItem>
        </TextField>
        <TextField
          label="敏感词"
          value={crud.form.word || ''}
          onChange={(e) => crud.setForm({ ...crud.form, word: e.target.value })}
          fullWidth
          margin="dense"
        />
      </CrudDialog>
    </Box>
  );
}
