import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import mallCategoryApi from '@/api/mall/category';

const defaultForm = { id: null, name: '', parentId: '', sort: '' };

export default function Category() {
  const crud = useCrud({
    title: '分类',
    url: '/v1/category/searchByPage',
    crudMethod: mallCategoryApi,
    defaultForm,
  });

  const columns = [
    { label: '系统编号', prop: 'id' },
    { label: '分类名称', prop: 'name' },
    { label: '父分类ID', prop: 'parentId' },
    { label: '层级', prop: 'level' },
    { label: '是否叶子节点', prop: 'isLeaf', render: (v) => (v === 1 ? '是' : '否') },
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
            placeholder="输入分类名称搜索"
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
        <TextField fullWidth label="分类名称" value={crud.form.name || ''}
          onChange={(e) => crud.setForm({ ...crud.form, name: e.target.value })} required sx={{ minWidth: 300 }} />
        <TextField fullWidth label="父分类ID" value={crud.form.parentId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, parentId: e.target.value })} sx={{ minWidth: 300 }} />
        <TextField fullWidth label="排序" value={crud.form.sort || ''} type="number"
          onChange={(e) => crud.setForm({ ...crud.form, sort: e.target.value })} sx={{ minWidth: 300 }} />
      </CrudDialog>
    </Box>
  );
}
