import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import menuApi from '@/api/system/menu';

const defaultForm = { id: null, name: '', path: '', component: '', icon: '', sort: 0, hidden: false };

export default function Menu() {
  const crud = useCrud({
    title: '菜单',
    url: '/v1/menu/searchByPage',
    crudMethod: menuApi,
    defaultForm,
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'name', label: '菜单名称' },
    { prop: 'icon', label: '图标' },
    { prop: 'sort', label: '排序' },
    { prop: 'path', label: '路由地址' },
    { prop: 'component', label: '组件路径' },
    { prop: 'isLink', label: '外链', render: (v) => (v ? '是' : '否') },
    { prop: 'hidden', label: '可见', render: (v) => (v ? '否' : '是') },
    { prop: 'createTime', label: '创建日期', render: (v) => (v ? new Date(v).toLocaleDateString() : '') },
  ];

  const renderForm = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <TextField label="名称" value={crud.form.name || ''} onChange={(e) => crud.setForm({ ...crud.form, name: e.target.value })} size="small" />
      <TextField label="路径" value={crud.form.path || ''} onChange={(e) => crud.setForm({ ...crud.form, path: e.target.value })} size="small" />
      <TextField label="组件" value={crud.form.component || ''} onChange={(e) => crud.setForm({ ...crud.form, component: e.target.value })} size="small" />
      <TextField label="图标" value={crud.form.icon || ''} onChange={(e) => crud.setForm({ ...crud.form, icon: e.target.value })} size="small" />
      <TextField label="排序" type="number" value={crud.form.sort ?? ''} onChange={(e) => crud.setForm({ ...crud.form, sort: e.target.value })} size="small" />
    </Box>
  );

  const renderSearch = () => (
    <TextField
      size="small"
      placeholder="输入菜单名称搜索"
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
