import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import areaApi from '@/api/common/area';

export default function Area() {
  const crud = useCrud({
    title: '地区',
    url: '/v1/commonArea/searchByPage',
    crudMethod: areaApi,
    defaultForm: { id: null, parentId: null, name: null, pinyin: null, fullName: null, code: null, level: null },
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'parentId', label: '上一级ID' },
    { prop: 'name', label: '名称' },
    { prop: 'pinyin', label: '拼音' },
    { prop: 'fullName', label: '名称' },
    { prop: 'code', label: '行政编码' },
    { prop: 'level', label: '级别' },
    { prop: 'createUserId', label: '创建人ID' },
    { prop: 'createUserName', label: '创建人名称' },
    { prop: 'createTime', label: '创建日期', render: (v) => (v ? new Date(v).toLocaleString('zh-CN') : '-') },
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
        showAdd={false}
        showEdit={false}
        showDelete={false}
        showExport={false}
        selections={crud.selections}
        showDateRange query={crud.query} setQuery={crud.setQuery}
        renderSearch={() => (
          <>
            <TextField
              size="small"
              placeholder="输入名称搜索"
              value={crud.query.name || ''}
              onChange={(e) => crud.setQuery({ ...crud.query, name: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()}
              sx={{ width: 200, mr: 1 }}
            />
            <TextField
              size="small"
              placeholder="输入上级ID搜索"
              value={crud.query.parentId || ''}
              onChange={(e) => crud.setQuery({ ...crud.query, parentId: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && crud.toQuery()}
              sx={{ width: 200 }}
            />
          </>
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
        showActions={false}
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
          label="上一级ID"
          value={crud.form.parentId || ''}
          onChange={(e) => crud.setForm({ ...crud.form, parentId: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="名称"
          value={crud.form.name || ''}
          onChange={(e) => crud.setForm({ ...crud.form, name: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="拼音"
          value={crud.form.pinyin || ''}
          onChange={(e) => crud.setForm({ ...crud.form, pinyin: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="名称"
          value={crud.form.fullName || ''}
          onChange={(e) => crud.setForm({ ...crud.form, fullName: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="行政编码"
          value={crud.form.code || ''}
          onChange={(e) => crud.setForm({ ...crud.form, code: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="级别"
          value={crud.form.level || ''}
          onChange={(e) => crud.setForm({ ...crud.form, level: e.target.value })}
          fullWidth
          margin="dense"
        />
      </CrudDialog>
    </Box>
  );
}
