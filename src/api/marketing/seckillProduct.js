import request from '@/utils/request';

export function getPage(params) {
  const data = params;
  return request({
    url: '/v1/seckillProduct/searchByPage',
    method: 'post',
    data,
  });
}

export function getDetail(id) {
  return request({
    url: 'v1/seckillProduct/findById?id=' + id,
    method: 'get',
  });
}

export function add(data) {
  return request({
    url: 'v1/seckillProduct/insert',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: 'v1/seckillProduct/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'v1/seckillProduct/update',
    method: 'post',
    data,
  });
}

export default { add, edit, del, getDetail, getPage };
