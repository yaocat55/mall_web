import { Box, TextField, Typography } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudPagination from '@/components/Crud/CrudPagination';
import jobLogApi from '@/api/common/jobLog';

export default function JobLog() {
  const crud = useCrud({
    title: '定时任务执行日志',
    url: '/v1/commonJobLog/searchByPage',
    crudMethod: jobLogApi,
    defaultForm: {},
  });

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'jobId', label: '定时任务ID' },
    { prop: 'jobName', label: '定时任务名称' },
    { prop: 'beanName', label: 'bean名称' },
    { prop: 'startTime', label: '开始执行时间', render: (v) => (v ? new Date(v).toLocaleString('zh-CN') : '-') },
    { prop: 'endTime', label: '结束执行时间', render: (v) => (v ? new Date(v).toLocaleString('zh-CN') : '-') },
    { prop: 'exception', label: '异常信息' },
    {
      prop: 'runStatus',
      label: '执行状态',
      render: (v) => {
        if (v === 1) return <Typography component="span" color="primary">执行中</Typography>;
        if (v === 2) return <Typography component="span" sx={{ color: '#D29922' }}>暂停</Typography>;
        if (v === 3) return <Typography component="span" color="success.main">成功</Typography>;
        if (v === 4) return <Typography component="span" color="error">失败</Typography>;
        return '-';
      },
    },
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
        showDelete={false}
        showExport={false}
        selections={crud.selections}
        showDateRange query={crud.query} setQuery={crud.setQuery}
        renderSearch={() => (
          <TextField
            size="small"
            placeholder="输入定时任务名称搜索"
            value={crud.query.jobName || ''}
            onChange={(e) => crud.setQuery({ ...crud.query, jobName: e.target.value })}
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
