import { Box, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import useCrud from '@/hooks/useCrud';
import CrudToolbar from '@/components/Crud/CrudToolbar';
import CrudTable from '@/components/Crud/CrudTable';
import CrudPagination from '@/components/Crud/CrudPagination';
import refundApi from '@/api/aftersale/refund';

const date = (v) => (v ? new Date(v).toLocaleString('zh-CN') : '');

export default function Refund() {
  const crud = useCrud({
    title: '退货单',
    url: '/v1/refund/searchByPage',
    crudMethod: refundApi,
    defaultForm: {},
    sortField: ['create_time,desc'],
  });

  const [previewUrl, setPreviewUrl] = useState('');

  const columns = [
    { prop: 'id', label: '系统编号' },
    { prop: 'tradeId', label: '订单ID' },
    { prop: 'tradeCode', label: '订单编码' },
    { prop: 'productId', label: '商品ID' },
    { prop: 'name', label: '商品名称' },
    { prop: 'model', label: '规格' },
    { prop: 'quantity', label: '数量' },
    {
      prop: 'coverUrl',
      label: '封面图片',
      render: (v) =>
        v ? (
          <Box
            component="img"
            src={v}
            onClick={() => setPreviewUrl(v)}
            onError={(e) => { e.target.style.display = 'none'; }}
            sx={{
              width: 60,
              height: 60,
              objectFit: 'cover',
              borderRadius: 1,
              cursor: 'pointer',
              border: '1px solid #30363D',
              '&:hover': { borderColor: '#58A6FF' },
            }}
          />
        ) : '-',
    },
    { prop: 'totalAmount', label: '总金额' },
    { prop: 'refundAmount', label: '退款金额' },
    { prop: 'refundType', label: '退货类型', render: (v) => ({ 10: '退货退款', 20: '换货' })[v] || v },
    { prop: 'auditStatus', label: '审核状态', render: (v) => ({ 10: '待审核', 20: '已同意', 30: '已拒绝' })[v] || v },
    { prop: 'refundStatus', label: '退货状态', render: (v) => ({ 10: '进行中', 20: '已拒绝', 30: '已完成', 40: '已取消' })[v] || v },
    { prop: 'rejectedReason', label: '拒绝原因' },
    { prop: 'createUserId', label: '创建人ID' },
    { prop: 'createUserName', label: '创建人名称' },
    { prop: 'createTime', label: '创建日期', render: date },
  ];

  return (
    <Box sx={{ p: 1 }}>
      <CrudToolbar
        showAdd={false}
        showExport={false}
        onSearch={crud.toQuery}
        onRefresh={crud.resetQuery}
        onDelete={crud.doDelete}
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
        onDelete={crud.doDelete}
      />
      <CrudPagination
        pageNo={crud.pageNo}
        pageSize={crud.pageSize}
        totalCount={crud.totalCount}
        onPageChange={crud.setPageNo}
        onSizeChange={crud.setPageSize}
      />
      <Dialog open={!!previewUrl} onClose={() => setPreviewUrl('')} maxWidth="md"
        PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none' } }}>
        <IconButton onClick={() => setPreviewUrl('')}
          sx={{ position: 'absolute', right: 8, top: 8, color: '#fff', bgcolor: 'rgba(0,0,0,0.5)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
          <CloseIcon />
        </IconButton>
        <Box component="img" src={previewUrl}
          sx={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: 1 }} />
      </Dialog>
    </Box>
  );
}
