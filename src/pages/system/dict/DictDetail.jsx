import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import dictDetailApi from '@/api/system/dictDetail';

const defaultForm = { id: null, dictId: '', label: '', value: '', sort: 0 };

export default function DictDetail() {
  const crud = useCrud({
    title: '字典详情',
    url: '/v1/dictDetail/searchByPage',
    crudMethod: dictDetailApi,
    defaultForm,
  });

  const columns = [
    { prop: 'id', label: 'ID' },
    { prop: 'dictId', label: '字典ID' },
    { prop: 'label', label: '字典标签' },
    { prop: 'value', label: '字典值' },
    { prop: 'sort', label: '排序' },
    { prop: 'createTime', label: '创建日期', render: (v) => (v ? new Date(v).toLocaleDateString() : '') },
  ];

  const renderForm = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <TextField label="字典ID" value={crud.form.dictId || ''} onChange={(e) => crud.setForm({ ...crud.form, dictId: e.target.value })} size="small" />
      <TextField label="字典标签" value={crud.form.label || ''} onChange={(e) => crud.setForm({ ...crud.form, label: e.target.value })} size="small" />
      <TextField label="字典值" value={crud.form.value || ''} onChange={(e) => crud.setForm({ ...crud.form, value: e.target.value })} size="small" />
      <TextField label="排序" type="number" value={crud.form.sort ?? ''} onChange={(e) => crud.setForm({ ...crud.form, sort: e.target.value })} size="small" />
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
