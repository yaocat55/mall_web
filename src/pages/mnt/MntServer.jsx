import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import serverDeployApi from '@/api/mnt/serverDeploy';

export default function MntServer() {
  const crud = useCrud({
    title: '服务器',
    url: '/v1/serverDeploy/searchByPage',
    crudMethod: serverDeployApi,
    defaultForm: {
      id: null,
      name: '',
      ip: '',
      port: 22,
      account: '',
      password: '',
    },
  });

  const columns = [
    { label: 'ID', prop: 'id' },
    { label: '名称', prop: 'name' },
    { label: 'IP', prop: 'ip' },
    { label: '端口', prop: 'port' },
    { label: '账号', prop: 'account' },
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
            label="IP"
            value={crud.form.ip || ''}
            onChange={(e) => crud.setForm({ ...crud.form, ip: e.target.value })}
            fullWidth
          />
          <TextField
            size="small"
            label="端口"
            type="number"
            value={crud.form.port ?? ''}
            onChange={(e) =>
              crud.setForm({ ...crud.form, port: Number(e.target.value) })
            }
            fullWidth
          />
          <TextField
            size="small"
            label="账号"
            value={crud.form.account || ''}
            onChange={(e) =>
              crud.setForm({ ...crud.form, account: e.target.value })
            }
            fullWidth
          />
          <TextField
            size="small"
            label="密码"
            type="password"
            value={crud.form.password || ''}
            onChange={(e) =>
              crud.setForm({ ...crud.form, password: e.target.value })
            }
            fullWidth
          />
        </Box>
      </CrudDialog>
    </Box>
  );
}
