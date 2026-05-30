import { Box } from '@mui/material';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudDialog from '@/components/Crud/CrudDialog';
import CrudPagination from '@/components/Crud/CrudPagination';
import deployHistoryApi from '@/api/mnt/deployHistory';

export default function DeployHistory() {
  const crud = useCrud({
    title: '部署历史',
    url: 'api/deployHistory',
    crudMethod: deployHistoryApi,
    defaultForm: {},
  });

  const columns = [
    { label: 'ID', prop: 'id' },
    { label: '应用名称', prop: 'appName' },
    { label: '部署时间', prop: 'deployDate' },
    {
      label: '创建时间',
      prop: 'createTime',
      render: (v) => (v ? new Date(v).toLocaleString('zh-CN') : '-'),
    },
  ];

  const handleSubmit = () => {};

  return (
    <Box sx={{ p: 1 }}>
      <CrudToolbar
        onSearch={crud.toQuery}
        onRefresh={crud.refresh}
        onAdd={crud.toAdd}
        onDelete={crud.doDelete}
        selections={crud.selections}
        showAdd={false}
        showDelete={false}
        showExport={false}
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
        showSelect={false}
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
      />
    </Box>
  );
}
