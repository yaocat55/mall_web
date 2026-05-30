import { Box, TextField, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import generatorApi from '@/api/generator/generator';

export default function Generator() {
  const crud = useCrud({
    title: '代码生成',
    url: 'api/generator/tables',
    crudMethod: generatorApi,
    defaultForm: {},
  });

  const handlePreview = async (row) => {
    try {
      const res = await generatorApi.preview({ tableName: row.tableName });
      const w = window.open();
      w.document.write(res.data || '');
      w.document.close();
    } catch {
      // handled by request interceptor
    }
  };

  const handleGenerate = async (row) => {
    try {
      await generatorApi.generate({ tableName: row.tableName });
    } catch {
      // handled by request interceptor
    }
  };

  const columns = [
    { prop: 'id', label: 'ID' },
    { prop: 'tableName', label: '表名' },
    { prop: 'engine', label: '引擎' },
    { prop: 'createTime', label: '创建时间', render: (v) => v ? new Date(v).toLocaleString('zh-CN') : '-' },
    {
      label: '操作',
      render: (_, row) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<VisibilityIcon fontSize="small" />}
            onClick={() => handlePreview(row)}
            sx={{ borderColor: '#30363D', color: '#58A6FF', fontSize: 12 }}
          >
            预览
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleGenerate(row)}
            sx={{ borderColor: '#30363D', color: '#8B949E', fontSize: 12 }}
          >
            生成
          </Button>
        </Box>
      ),
    },
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
        showAdd={false}
        showDelete={false}
        showExport={false}
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
        showActions={false}
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
      </CrudDialog>
    </Box>
  );
}
