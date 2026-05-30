import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import roleApi from '@/api/system/role';

const defaultForm = { id: null, name: '', remark: '', dataScope: '', level: 3 };

export default function Role() {
  const crud = useCrud({
    title: '角色',
    url: '/v1/role/searchByPage',
    crudMethod: roleApi,
    defaultForm,
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'name', label: '名称' },
    { prop: 'dataScope', label: '数据权限' },
    { prop: 'level', label: '角色级别' },
    { prop: 'remark', label: '描述' },
    { prop: 'createTime', label: '创建日期', render: (v) => (v ? new Date(v).toLocaleDateString() : '') },
  ];

  const renderForm = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <TextField label="名称" value={crud.form.name || ''} onChange={(e) => crud.setForm({ ...crud.form, name: e.target.value })} size="small" />
      <TextField label="描述" value={crud.form.remark || ''} onChange={(e) => crud.setForm({ ...crud.form, remark: e.target.value })} size="small" multiline />
      <TextField label="数据范围" value={crud.form.dataScope || ''} onChange={(e) => crud.setForm({ ...crud.form, dataScope: e.target.value })} size="small" />
    </Box>
  );

  const renderSearch = () => (
    <TextField
      size="small"
      placeholder="输入角色名称搜索"
      value={crud.query.name || ''}
      onChange={(e) => crud.setQuery({ ...crud.query, name: e.target.value })}
      onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()}
      sx={{ width: 200, '& .MuiOutlinedInput-root': { bgcolor: '#21262D' } }}
    />
  );

  return (
    <Box>
      <CrudToolbar
        renderSearch={renderSearch}
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
