import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import alipayApi from '@/api/tools/alipay';

export default function AliPay() {
  const crud = useCrud({
    title: '支付宝',
    url: 'api/aliPay',
    crudMethod: alipayApi,
    defaultForm: { id: null, appId: '', privateKey: '', publicKey: '' },
  });

  const columns = [
    { prop: 'id', label: 'ID' },
    { prop: 'appId', label: 'AppID' },
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
          label="AppID"
          value={crud.form.appId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, appId: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="私钥"
          value={crud.form.privateKey || ''}
          onChange={(e) => crud.setForm({ ...crud.form, privateKey: e.target.value })}
          fullWidth
          margin="dense"
          multiline
        />
        <TextField
          label="公钥"
          value={crud.form.publicKey || ''}
          onChange={(e) => crud.setForm({ ...crud.form, publicKey: e.target.value })}
          fullWidth
          margin="dense"
          multiline
        />
      </CrudDialog>
    </Box>
  );
}
