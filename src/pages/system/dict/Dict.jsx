import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import dictApi from '@/api/system/dict';

const defaultForm = { id: null, dictName: '', dictDescription: '' };

export default function Dict() {
  const crud = useCrud({
    title: '字典',
    url: '/v1/dict/searchByPage',
    crudMethod: dictApi,
    defaultForm,
  });

  const columns = [
    { prop: 'id', label: 'ID' },
    { prop: 'dictName', label: '名称' },
    { prop: 'dictDescription', label: '描述' },
    { prop: 'createTime', label: '创建日期', render: (v) => (v ? new Date(v).toLocaleDateString() : '') },
  ];

  const renderForm = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <TextField label="名称" value={crud.form.dictName || ''} onChange={(e) => crud.setForm({ ...crud.form, dictName: e.target.value })} size="small" />
      <TextField label="描述" value={crud.form.dictDescription || ''} onChange={(e) => crud.setForm({ ...crud.form, dictDescription: e.target.value })} size="small" multiline />
    </Box>
  );

  return (
    <Box>
      <CrudToolbar
        onSearch={() => crud.toQuery()}
        onRefresh={() => crud.resetQuery()}
        onAdd={crud.toAdd}
        onDelete={(ids) => crud.doDelete(ids)}
        selections={crud.selections}
        showDateRange query={crud.query} setQuery={crud.setQuery}
      />
      <CrudTable
        columns={columns}
        data={crud.data}
        loading={crud.loading}
        selections={crud.selections}
        onSelectionChange={crud.setSelections}
        onEdit={crud.toEdit}
        onDelete={(ids) => crud.doDelete(ids)}
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
        onSubmit={crud.addStatus > crud.STATUS.NORMAL ? crud.doAdd : crud.doEdit}
        submitting={crud.submitting}
      >
        {renderForm()}
      </CrudDialog>
    </Box>
  );
}
