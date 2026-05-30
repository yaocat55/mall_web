import request from '@/utils/request';

export function getPage(params) {
  const data = params;
  return request({
    url: '/v1/product/searchByPage',
    method: 'post',
    data,
  });
}

export function getDetail(id) {
  return request({
    url: 'v1/product/findById?id=' + id,
    method: 'get',
  });
}

export function add(data) {
  return request({
    url: 'v1/product/insert',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: 'v1/product/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'v1/product/update',
    method: 'post',
    data,
  });
}

export default { add, edit, del, getDetail, getPage };
