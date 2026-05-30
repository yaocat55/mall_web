import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import appApi from '@/api/mnt/app';

export default function App() {
  const crud = useCrud({
    title: '应用',
    url: '/v1/app/searchByPage',
    crudMethod: appApi,
    defaultForm: {
      id: null,
      name: '',
      port: 8080,
      uploadPath: '',
      deployPath: '',
      backupPath: '',
      startScript: '',
      deployScript: '',
    },
  });

  const columns = [
    { label: 'ID', prop: 'id' },
    { label: '名称', prop: 'name' },
    { label: '端口', prop: 'port' },
    { label: '上传路径', prop: 'uploadPath' },
    { label: '部署路径', prop: 'deployPath' },
    {
      label: '创建时间',
      prop: 'createTime',
      render: (v) => (v ? new Date(v).toLocaleString('zh-CN') : '-'),
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
        selections={crud.selections}
        renderSearch={() => (
          <TextField
            size="small"
            placeholder="搜索..."
            value={crud.query.keyword || ''}
            onChange={(e) =>
              crud.setQuery({ ...crud.query, keyword: e.target.value })
            }
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            size="small"
            label="名称"
            value={crud.form.name || ''}
            onChange={(e) => crud.setForm({ ...crud.form, name: e.target.value })}
            fullWidth
          />
          <TextField
            size="small"
            label="端口"
            type="number"
            value={crud.form.port ?? ''}
            onChange={(e) => crud.setForm({ ...crud.form, port: Number(e.target.value) })}
            fullWidth
          />
          <TextField
            size="small"
            label="上传路径"
            value={crud.form.uploadPath || ''}
            onChange={(e) =>
              crud.setForm({ ...crud.form, uploadPath: e.target.value })
            }
            fullWidth
          />
          <TextField
            size="small"
            label="部署路径"
            value={crud.form.deployPath || ''}
            onChange={(e) =>
              crud.setForm({ ...crud.form, deployPath: e.target.value })
            }
            fullWidth
          />
          <TextField
            size="small"
            label="备份路径"
            value={crud.form.backupPath || ''}
            onChange={(e) =>
              crud.setForm({ ...crud.form, backupPath: e.target.value })
            }
            fullWidth
          />
          <TextField
            size="small"
            label="启动脚本"
            value={crud.form.startScript || ''}
            onChange={(e) =>
              crud.setForm({ ...crud.form, startScript: e.target.value })
            }
            fullWidth
          />
          <TextField
            size="small"
            label="部署脚本"
            value={crud.form.deployScript || ''}
            onChange={(e) =>
              crud.setForm({ ...crud.form, deployScript: e.target.value })
            }
            fullWidth
          />
        </Box>
      </CrudDialog>
    </Box>
  );
}
