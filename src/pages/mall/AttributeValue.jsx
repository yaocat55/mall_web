import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import mallAttributeValueApi from '@/api/mall/attributeValue';

const defaultForm = { id: null, attributeName: '', value: '', sort: '' };

export default function AttributeValue() {
  const crud = useCrud({
    title: '属性值',
    url: '/v1/attributeValue/searchByPage',
    crudMethod: mallAttributeValueApi,
    defaultForm,
  });

  const columns = [
    { label: '系统编号', prop: 'id' },
    { label: '属性名称', prop: 'attributeName' },
    { label: '属性值', prop: 'value' },
    { label: '排序', prop: 'sort' },
    { label: '创建人ID', prop: 'createUserId' },
    { label: '创建人名称', prop: 'createUserName' },
    { label: '创建日期', prop: 'createTime', render: (v) => v ? new Date(v).toLocaleString('zh-CN') : '-' },
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
        showDateRange query={crud.query} setQuery={crud.setQuery}
        renderSearch={() => (
          <TextField
            size="small"
            placeholder="输入属性值名称搜索"
            value={crud.query.name || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, name: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()}
            sx={{ width: 200 }}
          />
        )}
      />
      <CrudTable columns={columns} data={crud.data} loading={crud.loading}
        selections={crud.selections} onSelectionChange={crud.setSelections}
        onEdit={crud.toEdit} onDelete={crud.doDelete} />
      <CrudPagination pageNo={crud.pageNo} pageSize={crud.pageSize} totalCount={crud.totalCount}
        onPageChange={crud.setPageNo} onSizeChange={crud.setPageSize} />
      <CrudDialog open={crud.dialogOpen} title={crud.dialogTitle}
        onClose={crud.cancelCU} onSubmit={handleSubmit} submitting={crud.submitting}>
        <TextField fullWidth label="属性名称" value={crud.form.attributeName || ''}
          onChange={(e) => crud.setForm({ ...crud.form, attributeName: e.target.value })} required sx={{ minWidth: 300 }} />
        <TextField fullWidth label="属性值" value={crud.form.value || ''}
          onChange={(e) => crud.setForm({ ...crud.form, value: e.target.value })} required sx={{ minWidth: 300 }} />
        <TextField fullWidth label="排序" value={crud.form.sort || ''}
          onChange={(e) => crud.setForm({ ...crud.form, sort: e.target.value })} sx={{ minWidth: 300 }} />
      </CrudDialog>
    </Box>
  );
}
