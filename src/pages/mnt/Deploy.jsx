import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import deployApi from '@/api/mnt/deploy';

export default function Deploy() {
  const crud = useCrud({
    title: '部署',
    url: '/v1/deploy/searchByPage',
    crudMethod: deployApi,
    defaultForm: { id: null, appId: '', serverId: '' },
  });

  const columns = [
    { label: 'ID', prop: 'id' },
    { label: '应用ID', prop: 'appId' },
    { label: '服务器ID', prop: 'serverId' },
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
            label="应用ID"
            value={crud.form.appId || ''}
            onChange={(e) =>
              crud.setForm({ ...crud.form, appId: e.target.value })
            }
            fullWidth
          />
          <TextField
            size="small"
            label="服务器ID"
            value={crud.form.serverId || ''}
            onChange={(e) =>
              crud.setForm({ ...crud.form, serverId: e.target.value })
            }
            fullWidth
          />
        </Box>
      </CrudDialog>
    </Box>
  );
}
