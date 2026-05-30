import { Box, TextField } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudPagination from '@/components/Crud/CrudPagination';
import smsRecordApi from '@/api/common/smsRecord';

export default function SmsRecord() {
  const crud = useCrud({
    title: '短信发送记录',
    url: '/v1/commonSmsRecord/searchByPage',
    crudMethod: smsRecordApi,
    defaultForm: { id: null, phone: null, smsCode: null, expireSecond: null, sendTime: null },
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'phone', label: '手机号' },
    { prop: 'smsCode', label: '验证码' },
    { prop: 'expireSecond', label: '有效期' },
    { prop: 'sendTime', label: '发送时间' },
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
        showEdit={false}
        showDelete={false}
        showExport={false}
        selections={crud.selections}
        showDateRange query={crud.query} setQuery={crud.setQuery}
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
        showActions={false}
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
