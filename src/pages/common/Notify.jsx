import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudPagination from '@/components/Crud/CrudPagination';
import notifyApi from '@/api/common/notify';

export default function Notify() {
  const crud = useCrud({
    title: '通知',
    url: '/v1/commonNotify/searchByPage',
    crudMethod: notifyApi,
    defaultForm: { id: null, name: null },
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'title', label: '标题' },
    { prop: 'content', label: '内容', render: (v) => v ? <Box component="span" dangerouslySetInnerHTML={{ __html: v }} sx={{ '& a': { color: '#58A6FF' } }} /> : '' },
    { prop: 'linkUrl', label: '跳转地址' },
    {
      prop: 'type',
      label: '通知类型',
      render: (v) => (v === 1 ? 'excel导出' : '未暂停'),
    },
    {
      prop: 'readStatus',
      label: '阅读状态',
      render: (v) => (v === 1 ? '已读' : '未读'),
    },
    { prop: 'createUserId', label: '创建人ID' },
    { prop: 'createUserName', label: '创建人名称' },
    { prop: 'createTime', label: '创建日期', render: (v) => (v ? new Date(v).toLocaleString('zh-CN') : '-') },
  ];

  return (
    <Box sx={{ p: 1 }}>
      <CrudToolbar
        onSearch={crud.toQuery}
        onRefresh={crud.refresh}
        onAdd={crud.toAdd}
        onDelete={crud.doDelete}
        onExport={crud.doExport}
        showAdd={false}
        selections={crud.selections}
        showDateRange query={crud.query} setQuery={crud.setQuery}
        renderSearch={() => (
          <TextField
            size="small"
            placeholder="输入标题搜索"
            value={crud.query.title || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, title: e.target.value })}
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
    </Box>
  );
}
